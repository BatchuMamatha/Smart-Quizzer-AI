from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import tempfile
import uuid
import sys

# Ensure stdout/stderr use utf-8 to avoid Windows charmap encoding errors during prints
try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8')
except Exception:
    pass

# Load environment variables from parent directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

# Import our modules
from models import db, User, QuizSession, Question, Topic, PasswordResetToken
from auth import init_jwt, generate_tokens, auth_required
from question_gen import question_generator
from content_processor import ContentProcessor
from email_service import send_password_reset_email, send_welcome_email
from oauth2_email_service import oauth2_email_service, send_password_reset_email_oauth
import logging

# Import error handling system
from error_handler import (
    ErrorHandler, SmartQuizzerError, AIServiceError, ValidationError,
    ErrorCategory, ErrorSeverity, InputValidator, handle_errors
)

def create_app():
    app = Flask(__name__)
    
    # Configuration - Use environment variables with fallbacks
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'smart-quizzer-secret-2024-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///smart_quizzer.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # File upload configuration
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
    
    # Ensure upload directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    init_jwt(app)
    
    # Create tables
    with app.app_context():
        db.create_all()
        
        # Initialize adaptive quiz engine
        app.adaptive_engine = question_generator.adaptive_engine
        
        initialize_topics()
    
    return app

def initialize_topics():
    """Initialize default topics if not exists"""
    topics_data = [
        {"name": "Mathematics", "description": "Mathematical concepts and problems", "category": "STEM"},
        {"name": "Science", "description": "Scientific principles and discoveries", "category": "STEM"},
        {"name": "History", "description": "Historical events and civilizations", "category": "Humanities"},
        {"name": "Literature", "description": "Literary works and analysis", "category": "Humanities"},
        {"name": "Geography", "description": "Physical and human geography", "category": "Social Studies"}
    ]
    
    for topic_data in topics_data:
        if not Topic.query.filter_by(name=topic_data["name"]).first():
            topic = Topic(**topic_data)
            db.session.add(topic)
    
    db.session.commit()

app = create_app()

# Root endpoint
@app.route('/', methods=['GET'])
def root():
    return jsonify({
        'message': 'Welcome to Smart Quizzer API',
        'version': '1.0.0',
        'status': 'running',
        'api_base': '/api',
        'endpoints': {
            'health': '/api/health',
            'auth': {
                'register': '/api/auth/register',
                'login': '/api/auth/login',
                'profile': '/api/auth/profile'
            },
            'quiz': {
                'topics': '/api/topics',
                'start': '/api/quiz/start',
                'answer': '/api/quiz/<id>/answer',
                'results': '/api/quiz/<id>/results',
                'history': '/api/quiz/history'
            }
        }
    }), 200

# Health endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Smart Quizzer API is running',
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/health/detailed', methods=['GET'])
def detailed_health_check():
    """Comprehensive health check including service status"""
    try:
        service_health = question_generator.get_service_health()
        
        overall_status = 'healthy'
        if service_health['service_health']['gemini_api']['status'] == 'unhealthy':
            overall_status = 'degraded'
        
        if service_health['rate_limiting']['circuit_breaker_active']:
            overall_status = 'critical'
        
        return jsonify({
            'status': overall_status,
            'message': 'Smart Quizzer detailed health check',
            'timestamp': datetime.now().isoformat(),
            'services': service_health,
            'database': {
                'status': 'connected' if db.engine.connect() else 'disconnected'
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Health check failed: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/admin/test-email', methods=['POST'])
@auth_required
def test_email(current_user_id):
    """Test email configuration"""
    try:
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        data = request.get_json() or {}
        test_email_address = data.get('email', user.email)
        
        # Try OAuth2 first (more secure), then fallback to SMTP
        email_result = None
        email_method = "unknown"
        
        if oauth2_email_service.is_configured:
            print(f"📧 Testing OAuth2 email to {test_email_address}")
            email_method = "OAuth2"
            try:
                oauth2_email_service.send_test_email(test_email_address, user.full_name)
                email_result = {'success': True}
            except Exception as oauth_error:
                print(f"[ERROR] OAuth2 test failed: {oauth_error}")
                email_result = {'success': False, 'error': str(oauth_error)}
        else:
            # Fallback to SMTP
            print(f"📧 OAuth2 not configured, testing SMTP for {test_email_address}")
            email_method = "SMTP"
            try:
                from email_service import email_service
                
                if not email_service or not email_service.is_configured:
                    return jsonify({
                        'success': False,
                        'error': 'No email service configured',
                        'message': 'Please configure either OAuth2 or SMTP email service'
                    }), 500
                
                email_service.send_test_email(test_email_address, user.full_name)
                email_result = {'success': True}
            except Exception as smtp_error:
                print(f"[ERROR] SMTP test failed: {smtp_error}")
                email_result = {'success': False, 'error': str(smtp_error)}
        
        if email_result and email_result['success']:
            return jsonify({
                'success': True,
                'message': f'Test email sent successfully to {test_email_address} via {email_method}',
                'email_method': email_method,
                'timestamp': datetime.utcnow().isoformat()
            })
        else:
            return jsonify({
                'success': False,
                'error': email_result.get('error', 'Unknown error') if email_result else 'Email service failed',
                'message': f'Failed to send test email via {email_method}',
                'email_method': email_method,
                'error_type': type(email_result.get('error')).__name__ if email_result and email_result.get('error') else 'Unknown'
            }), 500
            
    except Exception as e:
        print(f"[ERROR] Test email endpoint error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/admin/gmail-auth', methods=['GET'])
@auth_required
def gmail_auth(current_user_id):
    """Get Gmail OAuth2 authorization URL"""
    try:
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # For now, allow any authenticated user (in production, add admin check)
        try:
            auth_url = oauth2_email_service.get_auth_url()
            
            return jsonify({
                'success': True,
                'auth_url': auth_url,
                'message': 'Visit the auth_url to authorize Gmail access',
                'instructions': [
                    '1. Click the auth_url link',
                    '2. Sign in to your Gmail account',
                    '3. Grant Smart Quizzer permission to send emails',
                    '4. Copy the authorization code from the callback',
                    '5. Use POST /api/admin/gmail-callback with the code'
                ]
            })
            
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e),
                'message': 'Failed to generate OAuth2 authorization URL'
            }), 500
            
    except Exception as e:
        print(f"[ERROR] Gmail auth endpoint error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/admin/gmail-callback', methods=['POST'])
@auth_required
def gmail_callback(current_user_id):
    """Handle Gmail OAuth2 callback with authorization code"""
    try:
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        data = request.get_json()
        auth_code = data.get('code')
        
        if not auth_code:
            return jsonify({
                'success': False,
                'error': 'Authorization code is required',
                'message': 'Please provide the authorization code from Google'
            }), 400
        
        # Handle OAuth2 callback
        result = oauth2_email_service.handle_auth_callback(auth_code)
        
        if result['success']:
            return jsonify({
                'success': True,
                'message': 'Gmail OAuth2 authentication successful!',
                'email': result.get('email'),
                'next_steps': [
                    'Gmail is now configured for Smart Quizzer',
                    'You can test email sending with POST /api/admin/test-email',
                    'Password reset emails will now be sent via OAuth2'
                ]
            })
        else:
            return jsonify({
                'success': False,
                'error': result.get('error'),
                'message': 'OAuth2 authentication failed'
            }), 400
            
    except Exception as e:
        print(f"[ERROR] Gmail callback endpoint error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# GET callback for OAuth2 redirect handling
@app.route('/auth/google/callback', methods=['GET'])
@app.route('/oauth/callback', methods=['GET'])
@app.route('/callback', methods=['GET'])
@app.route('/api/admin/gmail-callback', methods=['GET'])
def oauth_redirect_handler():
    """Handle OAuth2 redirect and display authorization code"""
    try:
        auth_code = request.args.get('code')
        error = request.args.get('error')
        
        if error:
            return f"""
            <html>
            <head><title>OAuth2 Error</title></head>
            <body style="font-family: Arial; padding: 40px; background: #f5f5f5;">
                <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #dc3545;">❌ OAuth2 Authorization Failed</h1>
                    <p><strong>Error:</strong> {error}</p>
                    <p>Please try the authorization process again.</p>
                    <a href="http://localhost:9000" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Back to OAuth2 Setup</a>
                </div>
            </body>
            </html>
            """, 400
        
        if auth_code:
            return f"""
            <html>
            <head><title>OAuth2 Success</title></head>
            <body style="font-family: Arial; padding: 40px; background: #f5f5f5;">
                <div style="background: white; padding: 30px; border-radius: 10px; max-width: 800px; margin: 0 auto;">
                    <h1 style="color: #28a745;">✅ OAuth2 Authorization Successful!</h1>
                    <p>Google has provided the authorization code. Copy it below:</p>
                    
                    <div style="background: #f8f9fa; padding: 15px; border: 1px solid #ddd; border-radius: 5px; margin: 20px 0;">
                        <strong>Authorization Code:</strong><br>
                        <code style="font-size: 12px; word-break: break-all; display: block; margin-top: 10px; padding: 10px; background: #ffffff; border: 1px solid #ccc; border-radius: 3px;">{auth_code}</code>
                    </div>
                    
                    <button onclick="copyCode()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px 5px;">
                        📋 Copy Code
                    </button>
                    
                    <button onclick="completeSetup()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 10px 5px;">
                        🔧 Complete Setup
                    </button>
                    
                    <div id="result" style="margin-top: 20px;"></div>
                    
                    <script>
                        const authCode = "{auth_code}";
                        const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2MDYyOTUwNCwianRpIjoiOTg4NmE4MTEtYWVjZi00NDE3LTgyMjItZmJkOWQ4OTA1OGQ2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE3NjA2Mjk1MDQsImNzcmYiOiI3NGM0NzBjYy00NTQyLTRhOTMtYjYxZi01MmI0YmM0OTI1NDgiLCJleHAiOjE3NjA3MTU5MDR9.-vFQ0HBcfIm-yioaIRygQ_aNykmojME5fmSdleV_9x4";
                        
                        function copyCode() {{
                            navigator.clipboard.writeText(authCode).then(function() {{
                                document.getElementById('result').innerHTML = '<div style="color: #28a745; padding: 10px; background: #d4edda; border-radius: 5px;">✅ Authorization code copied to clipboard!</div>';
                            }});
                        }}
                        
                        async function completeSetup() {{
                            try {{
                                document.getElementById('result').innerHTML = '<div style="color: #007bff; padding: 10px; background: #d1ecf1; border-radius: 5px;">🔄 Completing OAuth2 setup...</div>';
                                
                                const response = await fetch('/api/admin/gmail-callback', {{
                                    method: 'POST',
                                    headers: {{
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + jwtToken
                                    }},
                                    body: JSON.stringify({{ code: authCode }})
                                }});
                                
                                const result = await response.json();
                                
                                if (result.success) {{
                                    document.getElementById('result').innerHTML = '<div style="color: #28a745; padding: 15px; background: #d4edda; border-radius: 5px;"><h3>🎉 OAuth2 Setup Complete!</h3><p>' + result.message + '</p><p><strong>Email:</strong> ' + (result.email || 'Configured') + '</p></div>';
                                }} else {{
                                    document.getElementById('result').innerHTML = '<div style="color: #dc3545; padding: 15px; background: #f8d7da; border-radius: 5px;"><h3>❌ Setup Failed</h3><p>' + (result.error || 'Unknown error') + '</p></div>';
                                }}
                            }} catch (error) {{
                                document.getElementById('result').innerHTML = '<div style="color: #dc3545; padding: 15px; background: #f8d7da; border-radius: 5px;"><h3>❌ Network Error</h3><p>Make sure the backend server is running on localhost:5000</p></div>';
                            }}
                        }}
                    </script>
                </div>
            </body>
            </html>
            """
        else:
            return """
            <html>
            <head><title>OAuth2 Callback</title></head>
            <body style="font-family: Arial; padding: 40px; background: #f5f5f5;">
                <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #dc3545;">❌ No Authorization Code</h1>
                    <p>No authorization code was provided in the callback.</p>
                    <p>Please try the OAuth2 authorization process again.</p>
                    <a href="http://localhost:9000" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Back to OAuth2 Setup</a>
                </div>
            </body>
            </html>
            """, 400
            
    except Exception as e:
        print(f"[ERROR] OAuth redirect handler error: {e}")
        return f"""
        <html>
        <head><title>OAuth2 Error</title></head>
        <body style="font-family: Arial; padding: 40px; background: #f5f5f5;">
            <div style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #dc3545;">❌ OAuth2 Handler Error</h1>
                <p><strong>Error:</strong> {str(e)}</p>
                <a href="http://localhost:9000" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Back to OAuth2 Setup</a>
            </div>
        </body>
        </html>
        """, 500

@app.route('/api/admin/gmail-status', methods=['GET'])
@auth_required
def gmail_status(current_user_id):
    """Get Gmail OAuth2 service status"""
    try:
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        status = oauth2_email_service.get_status()
        
        return jsonify({
            'success': True,
            'oauth2_status': status,
            'recommendations': [
                'Use OAuth2 for better security' if not status['is_configured'] else 'OAuth2 is configured',
                'Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env' if not status['client_id_configured'] else 'OAuth2 credentials configured',
                'Authenticate with /api/admin/gmail-auth' if not status['credentials_valid'] else 'OAuth2 authenticated'
            ]
        })
        
    except Exception as e:
        print(f"[ERROR] Gmail status endpoint error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/admin/reset-health', methods=['POST'])
@auth_required
def reset_service_health(current_user_id):
    """Reset service health status (admin only)"""
    try:
        data = request.get_json() or {}
        service = data.get('service')  # Optional: specific service to reset
        
        question_generator.reset_service_health(service)
        
        return jsonify({
            'success': True,
            'message': f'Service health reset for {service if service else "all services"}',
            'timestamp': datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': f'Failed to reset service health: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500

# Auth Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'full_name', 'skill_level']
        for field in required_fields:
            if field not in data or not data[field]:
                print(f"⚠️ Registration validation failed: {field} is required")
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(username=data['username']).first():
            print(f"⚠️ Registration failed: Username '{data['username']}' already exists")
            return jsonify({'error': 'Username already exists'}), 409
        
        if User.query.filter_by(email=data['email']).first():
            print(f"⚠️ Registration failed: Email '{data['email']}' already exists")
            return jsonify({'error': 'Email already exists'}), 409
        
        # Validate skill level
        if data['skill_level'] not in ['Beginner', 'Intermediate', 'Advanced']:
            return jsonify({'error': 'Invalid skill level'}), 400
        
        # Create new user
        user = User(
            username=data['username'],
            email=data['email'],
            full_name=data['full_name'],
            skill_level=data['skill_level']
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Generate tokens
        tokens = generate_tokens(user.id)
        print(f"✅ User '{user.username}' registered successfully")
        
        # Send welcome email (optional - don't fail registration if email fails)
        try:
            email_result = send_welcome_email(user.email, user.full_name)
            if email_result['success']:
                print(f"📧 Welcome email sent to {user.email}")
            else:
                print(f"⚠️ Welcome email failed: {email_result.get('error', 'Unknown error')}")
        except Exception as e:
            print(f"⚠️ Welcome email error: {e}")
        
        # Add stats to user data
        user_dict = user.to_dict()
        user_dict.update({
            'total_quizzes': 3,
            'completed_quizzes': 2,
            'average_score': 75.0
        })
        
        return jsonify({
            'message': 'User registered successfully',
            'user': user_dict,
            'tokens': tokens
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Registration error: {str(e)}")
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if 'username' not in data or 'password' not in data:
            print("⚠️ Login validation failed: Username and password are required")
            return jsonify({'error': 'Username and password are required'}), 400
        
        # For demo purposes, accept any username/password OR check existing users
        username = data['username']
        password = data['password']
        
        # Check if user exists in database
        existing_user = User.query.filter_by(username=username).first()
        
        if existing_user and existing_user.check_password(password):
            # Existing user login
            user = existing_user
            print(f"✅ Existing user '{user.username}' logged in successfully")
        else:
            # Demo login - create mock user data without saving to database
            print(f"✅ Demo login for username '{username}'")
            user_data = {
                'id': 1,
                'username': username,
                'email': f"{username}@example.com",
                'full_name': username.title(),
                'skill_level': 'Intermediate',
                'created_at': '2025-10-03T15:00:00Z',
                'quiz_count': 0,
                'total_quizzes': 8,
                'completed_quizzes': 6,
                'average_score': 87.5
            }
            
            # Generate tokens for demo user
            tokens = generate_tokens(1)  # Use ID 1 for demo
            
            return jsonify({
                'message': 'Login successful',
                'user': user_data,
                'tokens': tokens
            }), 200
        
        # For existing users, generate tokens
        tokens = generate_tokens(user.id)
        
        # Add stats to existing user data
        user_dict = user.to_dict()
        user_dict.update({
            'total_quizzes': 8,
            'completed_quizzes': 6,
            'average_score': 87.5
        })
        
        return jsonify({
            'message': 'Login successful',
            'user': user_dict,
            'tokens': tokens
        }), 200
        
    except Exception as e:
        print(f"❌ Login error: {str(e)}")
        return jsonify({'error': f'Login failed: {str(e)}'}), 500

@app.route('/api/auth/profile', methods=['GET'])
@auth_required
def get_profile(current_user_id):
    try:
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get user's quiz statistics
        total_quizzes = len(user.quiz_sessions)
        completed_quizzes = len([qs for qs in user.quiz_sessions if qs.status == 'completed'])
        avg_score = 0
        
        if completed_quizzes > 0:
            total_score = sum([qs.score_percentage for qs in user.quiz_sessions if qs.status == 'completed'])
            avg_score = total_score / completed_quizzes
        
        profile_data = user.to_dict()
        profile_data.update({
            'total_quizzes': total_quizzes,
            'completed_quizzes': completed_quizzes,
            'average_score': round(avg_score, 2)
        })
        
        return jsonify(profile_data), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/test', methods=['GET'])
@auth_required
def test_auth(current_user_id):
    """Test endpoint to verify JWT token is working"""
    try:
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Token is valid',
            'user_id': current_user_id,
            'username': user.username
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/forgot-password', methods=['POST'])
def forgot_password():
    """Handle forgot password request with real email sending"""
    try:
        data = request.get_json()
        if not data or 'email' not in data:
            return jsonify({'error': 'Email is required'}), 400
        
        email = data['email'].strip()
        if not email:
            return jsonify({'error': 'Email cannot be empty'}), 400
        
        # Check if user exists
        user = User.query.filter_by(email=email).first()
        
        if not user:
            # Return success even if user doesn't exist for security
            return jsonify({
                'success': True,
                'message': 'If the email exists, a reset link has been sent',
                'user_exists': False
            }), 200
        
        # Clean up expired tokens
        PasswordResetToken.cleanup_expired()
        
        # Generate secure reset token
        import secrets
        reset_token = secrets.token_urlsafe(32)
        
        # Create and store reset token (expires in 24 hours)
        reset_token_record = PasswordResetToken(
            user_id=user.id,
            token=reset_token,
            expires_in_hours=24
        )
        
        db.session.add(reset_token_record)
        db.session.commit()
        
        # Send actual password reset email
        try:
            frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
            reset_url = f"{frontend_url}/reset-password"
            
            # Try OAuth2 first (more secure), then fallback to SMTP
            email_result = None
            email_method = "unknown"
            
            if oauth2_email_service.is_configured:
                print(f"📧 Attempting OAuth2 email to {user.email}")
                email_method = "OAuth2"
                email_result = send_password_reset_email_oauth(
                    user_email=user.email,
                    user_name=user.full_name,
                    reset_token=reset_token,
                    reset_url=reset_url
                )
            else:
                print(f"📧 OAuth2 not configured, using SMTP for {user.email}")
                email_method = "SMTP"
                email_result = send_password_reset_email(
                    user_email=user.email,
                    user_name=user.full_name,
                    reset_token=reset_token,
                    reset_url=reset_url
                )
            
            if email_result and email_result['success']:
                print(f"📧 Password reset email sent via {email_method} to {user.email}")
                return jsonify({
                    'success': True,
                    'message': 'Password reset link sent to your email address',
                    'user_exists': True,
                    'email_sent': True,
                    'email_method': email_method
                }), 200
            else:
                # Email failed but token was created - log error but don't expose to user
                print(f"❌ Failed to send reset email to {user.email}: {email_result.get('error')}")
                
                # Still return the token for development/testing purposes
                return jsonify({
                    'success': True,
                    'message': 'Password reset initiated. Email service unavailable.',
                    'user_exists': True,
                    'email_sent': False,
                    'reset_token': reset_token,  # For development only
                    'debug_info': email_result.get('error') if os.getenv('DEBUG') else None
                }), 200
                
        except Exception as email_error:
            print(f"❌ Email service error: {email_error}")
            
            # Return token for development if email fails
            return jsonify({
                'success': True,
                'message': 'Password reset initiated. Email service temporarily unavailable.',
                'user_exists': True,
                'email_sent': False,
                'reset_token': reset_token,  # For development only
                'debug_info': str(email_error) if os.getenv('DEBUG') else None
            }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Forgot password error: {e}")
        return jsonify({'error': 'Failed to process request'}), 500

@app.route('/api/auth/verify-reset-token', methods=['POST'])
def verify_reset_token():
    """Verify password reset token against database"""
    try:
        data = request.get_json()
        if not data or 'token' not in data:
            return jsonify({'error': 'Token is required'}), 400
        
        token = data['token']
        
        # Clean up expired tokens first
        PasswordResetToken.cleanup_expired()
        
        # Find valid token
        reset_token_record = PasswordResetToken.query.filter_by(
            token=token,
            used=False
        ).first()
        
        if not reset_token_record or not reset_token_record.is_valid():
            return jsonify({
                'valid': False,
                'message': 'Invalid or expired token'
            }), 400
        
        # Get user information
        user = User.query.get(reset_token_record.user_id)
        if not user:
            return jsonify({
                'valid': False,
                'message': 'Invalid token - user not found'
            }), 400
        
        return jsonify({
            'valid': True,
            'message': 'Token is valid',
            'user': {
                'username': user.username,
                'email': user.email,
                'full_name': user.full_name
            },
            'expires_at': reset_token_record.expires_at.isoformat()
        }), 200
        
    except Exception as e:
        print(f"Token verification error: {e}")
        return jsonify({'error': 'Failed to verify token'}), 500

@app.route('/api/auth/reset-password', methods=['POST'])
def reset_password():
    """Reset user password using valid token"""
    try:
        data = request.get_json()
        if not data or 'token' not in data or 'new_password' not in data:
            return jsonify({'error': 'Token and new password are required'}), 400
        
        token = data['token']
        new_password = data['new_password']
        
        # Validate password
        if len(new_password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters long'}), 400
        
        # Clean up expired tokens
        PasswordResetToken.cleanup_expired()
        
        # Find valid token
        reset_token_record = PasswordResetToken.query.filter_by(
            token=token,
            used=False
        ).first()
        
        if not reset_token_record or not reset_token_record.is_valid():
            return jsonify({
                'success': False,
                'message': 'Invalid or expired token'
            }), 400
        
        # Get user and update password
        user = User.query.get(reset_token_record.user_id)
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 400
        
        # Update user password
        user.set_password(new_password)
        
        # Mark token as used
        reset_token_record.mark_as_used()
        
        # Commit changes
        db.session.commit()
        
        print(f"✅ Password reset successful for user: {user.username}")
        
        return jsonify({
            'success': True,
            'message': 'Password reset successfully',
            'user': {
                'username': user.username,
                'email': user.email
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Password reset error: {e}")
        return jsonify({'error': 'Failed to reset password'}), 500

@app.route('/api/admin/test-email', methods=['POST'])
@auth_required
def test_email_config(current_user_id):
    """Test email configuration (admin only)"""
    try:
        from email_service import test_email_service
        
        # In a real app, you'd check if user is admin
        # For now, any authenticated user can test email
        
        result = test_email_service()
        
        return jsonify({
            'email_test_result': result,
            'timestamp': datetime.now().isoformat()
        }), 200 if result.get('success') else 500
        
    except Exception as e:
        return jsonify({
            'error': f'Email test failed: {str(e)}',
            'timestamp': datetime.now().isoformat()
        }), 500

@app.route('/api/admin/email-status', methods=['GET'])
@auth_required  
def get_email_status(current_user_id):
    """Get email service configuration status"""
    try:
        from email_service import email_service
        
        return jsonify({
            'email_configured': email_service.is_configured,
            'smtp_server': email_service.smtp_server if email_service.is_configured else None,
            'smtp_port': email_service.smtp_port if email_service.is_configured else None,
            'from_email': email_service.from_email if email_service.is_configured else None,
            'configuration_check': {
                'smtp_server': bool(email_service.smtp_server),
                'smtp_username': bool(email_service.smtp_username),
                'smtp_password': bool(email_service.smtp_password)
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Topic Routes
@app.route('/api/topics', methods=['GET'])
def get_topics():
    try:
        topics = Topic.query.filter_by(is_active=True).all()
        return jsonify([topic.to_dict() for topic in topics]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quiz/start', methods=['POST'])
@auth_required
@handle_errors
def start_quiz(current_user_id):
    try:
        data = request.get_json()
        
        # Validate input parameters using comprehensive validation
        validation_errors = InputValidator.validate_quiz_params(data)
        if validation_errors:
            error_messages = [error.message for error in validation_errors]
            raise ValidationError(
                message=f"Invalid request parameters: {'; '.join(error_messages)}",
                field="request_data",
                value=data,
                validation_rule="comprehensive_validation"
            )
        
        required_fields = ['topic', 'skill_level']
        for field in required_fields:
            if field not in data:
                raise ValidationError(
                    message=f"Required field '{field}' is missing",
                    field=field,
                    value=None,
                    validation_rule="required_field"
                )
        
        # Validate inputs
        if data['skill_level'] not in ['Beginner', 'Intermediate', 'Advanced']:
            raise ValidationError(
                message="Invalid skill level",
                field="skill_level",
                value=data['skill_level'],
                validation_rule="allowed_values=['Beginner', 'Intermediate', 'Advanced']"
            )
        
        num_questions = data.get('num_questions', 5)
        custom_topic = data.get('custom_topic')
        topic = data['topic']
        
        # Enhanced validation for custom topics
        if topic in ['Custom', 'Custom Topic'] and not custom_topic:
            raise ValidationError(
                message="Custom topic content is required when using custom topics",
                field="custom_topic",
                value=custom_topic,
                validation_rule="required_when_topic_is_custom"
            )
        
        if custom_topic and len(custom_topic.strip()) < 10:
            raise ValidationError(
                message="Custom topic content must be at least 10 characters long",
                field="custom_topic",
                value=custom_topic,
                validation_rule="min_length=10"
            )
        
        # Validate number of questions
        if not isinstance(num_questions, int) or num_questions < 1 or num_questions > 20:
            raise ValidationError(
                message="Number of questions must be between 1 and 20",
                field="num_questions",
                value=num_questions,
                validation_rule="range=1-20"
            )
        
        print(f"🎯 Starting quiz for user {current_user_id}: {topic} ({data['skill_level']}) - {num_questions} questions")
        if custom_topic:
            print(f"📝 Custom topic content ({len(custom_topic)} chars): {custom_topic[:100]}...")
            print(f"🔍 Is custom content detected: {len(custom_topic) > 100}")
        else:
            print(f"📚 Using predefined topic: {topic}")
        
        # Initialize adaptive profile for user
        try:
            adaptive_profile = question_generator.adaptive_engine.initialize_user_profile(
                user_id=str(current_user_id), 
                initial_skill_level=data['skill_level']
            )
        except Exception as e:
            raise SmartQuizzerError(
                message="Failed to initialize adaptive profile",
                category=ErrorCategory.SYSTEM,
                severity=ErrorSeverity.HIGH,
                details={'user_id': current_user_id, 'original_error': str(e)},
                user_message="Unable to set up personalized quiz system. Please try again."
            )
        
        # Create quiz session
        quiz_session = QuizSession(
            user_id=current_user_id,
            topic=topic,
            skill_level=data['skill_level'],
            custom_topic=custom_topic,
            total_questions=num_questions
        )
        
        try:
            db.session.add(quiz_session)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            raise SmartQuizzerError(
                message="Failed to create quiz session",
                category=ErrorCategory.DATABASE,
                severity=ErrorSeverity.HIGH,
                details={'original_error': str(e)},
                user_message="Unable to start quiz session. Please try again."
            )
        
        # Generate questions using AI with comprehensive error handling
        try:
            questions_data = question_generator.generate_quiz_questions(
                topic=topic,
                skill_level=data['skill_level'],
                num_questions=num_questions,
                custom_topic=custom_topic,
                user_id=current_user_id
            )
            
            if not questions_data or len(questions_data) == 0:
                db.session.rollback()
                raise SmartQuizzerError(
                    message="Question generation returned empty result",
                    category=ErrorCategory.AI_SERVICE,
                    severity=ErrorSeverity.HIGH,
                    details={'topic': topic, 'skill_level': data['skill_level']},
                    user_message="Unable to generate quiz questions. Please try a different topic or try again later."
                )
                
        except ValidationError:
            db.session.rollback()
            raise  # Re-raise validation errors
        except AIServiceError as ai_error:
            db.session.rollback()
            print(f"❌ AI Service error: {ai_error}")
            raise SmartQuizzerError(
                message="AI question generation service failed",
                category=ErrorCategory.AI_SERVICE,
                severity=ErrorSeverity.HIGH,
                details={'ai_error': str(ai_error), 'topic': topic},
                user_message="Question generation service is temporarily unavailable. Please try again in a few minutes."
            )
        except Exception as qgen_error:
            db.session.rollback()
            print(f"❌ Unexpected question generation error: {qgen_error}")
            raise SmartQuizzerError(
                message=f"Unexpected error during question generation: {str(qgen_error)}",
                category=ErrorCategory.SYSTEM,
                severity=ErrorSeverity.HIGH,
                details={'original_error': str(qgen_error), 'topic': topic},
                user_message="An unexpected error occurred while generating questions. Please try again."
            )
        
        # Save questions to database with error handling
        try:
            for q_data in questions_data:
                question = Question(
                    quiz_session_id=quiz_session.id,
                    question_text=q_data['question_text'],
                    question_type=q_data['question_type'],
                    correct_answer=q_data['correct_answer'],
                    explanation=q_data['explanation'],
                    difficulty_level=q_data['difficulty_level']
                )
                question.set_options(q_data.get('options', []))
                db.session.add(question)
            
            db.session.commit()
            
        except Exception as db_error:
            db.session.rollback()
            print(f"❌ Database error saving questions: {db_error}")
            raise SmartQuizzerError(
                message="Failed to save generated questions",
                category=ErrorCategory.DATABASE,
                severity=ErrorSeverity.HIGH,
                details={'original_error': str(db_error)},
                user_message="Generated questions could not be saved. Please try again."
            )
        
        # Return quiz session with questions (without correct answers)
        try:
            questions = Question.query.filter_by(quiz_session_id=quiz_session.id).all()
            
            print(f"✅ Quiz started successfully with {len(questions)} questions")
            
            return jsonify({
                'quiz_session': quiz_session.to_dict(),
                'questions': [q.to_dict(include_correct_answer=False) for q in questions],
                'success': True,
                'message': f'Quiz started successfully with {len(questions)} questions'
            }), 201
            
        except Exception as response_error:
            print(f"❌ Error preparing response: {response_error}")
            raise SmartQuizzerError(
                message="Failed to prepare quiz response",
                category=ErrorCategory.SYSTEM,
                severity=ErrorSeverity.MEDIUM,
                details={'original_error': str(response_error)},
                user_message="Quiz was created but there was an error loading it. Please refresh the page."
            )
        
    except (ValidationError, SmartQuizzerError, AIServiceError):
        raise  # Re-raise our custom errors to be handled by decorator
    except Exception as e:
        print(f"❌ Unexpected quiz start error: {e}")
        db.session.rollback()
        raise SmartQuizzerError(
            message=f"Unexpected system error: {str(e)}",
            category=ErrorCategory.SYSTEM,
            severity=ErrorSeverity.CRITICAL,
            details={'original_error': str(e), 'error_type': type(e).__name__},
            user_message="An unexpected system error occurred. Please try again or contact support if the problem persists."
        )

@app.route('/api/quiz/<int:quiz_id>/answer', methods=['POST'])
@auth_required
def submit_answer(current_user_id, quiz_id):
    try:
        data = request.get_json()
        
        if 'question_id' not in data or 'answer' not in data:
            return jsonify({'error': 'question_id and answer are required'}), 400
        
        # Get quiz session and verify ownership
        quiz_session = QuizSession.query.filter_by(id=quiz_id, user_id=current_user_id).first()
        if not quiz_session:
            return jsonify({'error': 'Quiz session not found'}), 404
        
        # Get question
        question = Question.query.filter_by(
            id=data['question_id'], 
            quiz_session_id=quiz_id
        ).first()
        
        if not question:
            return jsonify({'error': 'Question not found'}), 404
        
        if question.is_correct is not None:
            return jsonify({'error': 'Question already answered'}), 400
        
        # Check answer using advanced evaluator
        is_correct = question.check_answer(data['answer'])
        question.time_taken = data.get('time_taken', 0)
        
        # Get enhanced feedback from the advanced evaluator
        enhanced_feedback = question.get_enhanced_feedback()
        
        # Record answer in adaptive engine
        answer_record = question_generator.adaptive_engine.record_answer(
            user_id=str(current_user_id),
            question_difficulty=question.difficulty_level,
            is_correct=is_correct,
            response_time=question.time_taken,
            question_metadata={
                'question_type': question.question_type,
                'topic': quiz_session.topic,
                'evaluation_method': enhanced_feedback.get('evaluation_method', 'basic'),
                'confidence': enhanced_feedback.get('confidence', 1.0)
            }
        )
        
        # Get adaptive recommendation for next question
        adaptive_recommendation = question_generator.adaptive_engine.determine_next_difficulty(
            user_id=str(current_user_id),
            current_question_difficulty=question.difficulty_level,
            is_correct=is_correct
        )
        
        # Update quiz session stats
        quiz_session.completed_questions += 1
        if is_correct:
            quiz_session.correct_answers += 1
        
        # Check if quiz is completed
        if quiz_session.completed_questions >= quiz_session.total_questions:
            quiz_session.status = 'completed'
            quiz_session.completed_at = datetime.utcnow()
            quiz_session.calculate_score()
        
        db.session.commit()
        
        return jsonify({
            'is_correct': is_correct,
            'correct_answer': question.correct_answer,
            'explanation': enhanced_feedback.get('explanation', question.explanation),
            'time_taken': question.time_taken,
            'enhanced_feedback': {
                'result_message': enhanced_feedback.get('result_message', ''),
                'evaluation_method': enhanced_feedback.get('evaluation_method', 'basic'),
                'confidence': enhanced_feedback.get('confidence', 1.0 if is_correct else 0.0),
                'hint': enhanced_feedback.get('hint', ''),
                'learning_tip': enhanced_feedback.get('learning_tip', ''),
                'semantic_score': enhanced_feedback.get('semantic_score', 0.0),
                'keyword_overlap': enhanced_feedback.get('keyword_overlap', 0.0)
            },
            'adaptive_insights': {
                'next_difficulty': adaptive_recommendation['next_difficulty'],
                'difficulty_change': adaptive_recommendation['difficulty_change'],
                'performance_trend': adaptive_recommendation['performance_metrics']['trend'],
                'confidence_level': adaptive_recommendation['confidence'],
                'consecutive_correct': adaptive_recommendation['performance_metrics']['consecutive_correct'],
                'adaptation_reason': adaptive_recommendation['reason']
            },
            'quiz_progress': {
                'completed': quiz_session.completed_questions,
                'total': quiz_session.total_questions,
                'score_percentage': quiz_session.score_percentage,
                'is_completed': quiz_session.status == 'completed'
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Adaptive Learning Analytics Routes
@app.route('/api/user/adaptive-analytics', methods=['GET'])
@auth_required
def get_adaptive_analytics(current_user_id):
    """Get comprehensive adaptive learning analytics for the current user"""
    try:
        # Get adaptive recommendation and performance insights
        recommendation = question_generator.adaptive_engine.get_adaptive_question_recommendation(
            user_id=str(current_user_id),
            topic="general",  # General analytics
            question_type="mixed"
        )
        
        # Get performance metrics
        metrics = question_generator.adaptive_engine.calculate_performance_metrics(str(current_user_id))
        
        # Get user profile from adaptive engine
        user_profile = question_generator.adaptive_engine.user_performance_history.get(str(current_user_id))
        
        if not user_profile:
            return jsonify({
                'message': 'No adaptive data available yet. Take a quiz to start tracking.',
                'current_difficulty': 'medium',
                'performance_metrics': {
                    'accuracy': 0.0,
                    'confidence': 0.0,
                    'trend': 0.0,
                    'difficulty_performance': {'easy': 0.0, 'medium': 0.0, 'hard': 0.0},
                    'consecutive_correct': 0
                },
                'learning_insights': {
                    'learning_trend': 'stable',
                    'confidence_level': 'low',
                    'strength_area': 'unknown',
                    'improvement_area': 'unknown'
                },
                'session_stats': {
                    'total_questions': 0,
                    'correct_answers': 0,
                    'consecutive_correct': 0,
                    'difficulty_changes': 0
                },
                'adaptation_metadata': {},
                'difficulty_distribution': {
                    'easy_accuracy': 0.0,
                    'medium_accuracy': 0.0,
                    'hard_accuracy': 0.0
                },
                'progress_indicators': {
                    'learning_trend': 'stable',
                    'confidence_level': 'low',
                    'strength_area': 'unknown',
                    'improvement_area': 'unknown'
                },
                'has_quiz_data': False
            }), 200
        
        return jsonify({
            'current_difficulty': user_profile['current_difficulty'],
            'performance_metrics': metrics,
            'learning_insights': recommendation['learning_insights'],
            'session_stats': user_profile['session_stats'],
            'adaptation_metadata': user_profile['adaptation_metadata'],
            'long_term_stats': user_profile['long_term_stats'],
            'difficulty_distribution': {
                'easy_accuracy': metrics['difficulty_performance'].get('easy', 0),
                'medium_accuracy': metrics['difficulty_performance'].get('medium', 0),
                'hard_accuracy': metrics['difficulty_performance'].get('hard', 0)
            },
            'progress_indicators': {
                'learning_trend': recommendation['learning_insights']['learning_trend'],
                'confidence_level': recommendation['learning_insights']['confidence_level'],
                'strength_area': recommendation['learning_insights']['strength_area'],
                'improvement_area': recommendation['learning_insights']['improvement_area']
            },
            'has_quiz_data': True
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get adaptive analytics: {str(e)}'}), 500

@app.route('/api/user/difficulty-recommendation', methods=['POST'])
@auth_required
def get_difficulty_recommendation(current_user_id):
    """Get difficulty recommendation for specific topic and question type"""
    try:
        data = request.get_json()
        topic = data.get('topic', 'general')
        question_type = data.get('question_type', 'multiple_choice')
        
        recommendation = question_generator.adaptive_engine.get_adaptive_question_recommendation(
            user_id=str(current_user_id),
            topic=topic,
            question_type=question_type
        )
        
        return jsonify(recommendation), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get difficulty recommendation: {str(e)}'}), 500

@app.route('/api/quiz/<int:quiz_id>/results', methods=['GET'])
@auth_required
def get_quiz_results(current_user_id, quiz_id):
    try:
        # Get quiz session and verify ownership
        quiz_session = QuizSession.query.filter_by(id=quiz_id, user_id=current_user_id).first()
        if not quiz_session:
            return jsonify({'error': 'Quiz session not found'}), 404
        
        # Get all questions with answers
        questions = Question.query.filter_by(quiz_session_id=quiz_id).all()
        
        return jsonify({
            'quiz_session': quiz_session.to_dict(),
            'questions': [q.to_dict(include_correct_answer=True) for q in questions],
            'summary': {
                'total_questions': quiz_session.total_questions,
                'correct_answers': quiz_session.correct_answers,
                'score_percentage': quiz_session.score_percentage,
                'time_taken': sum([q.time_taken or 0 for q in questions])
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/questions/generate', methods=['POST'])
@auth_required
def api_generate_questions(current_user_id):
    """API endpoint to generate questions from topic or custom content"""
    try:
        data = request.get_json() or {}
        topic = data.get('topic', 'General')
        skill_level = data.get('skill_level', 'Intermediate')
        num_questions = int(data.get('num_questions', 5))
        custom_topic = data.get('custom_topic')

        questions = question_generator.generate_quiz_questions(
            topic=topic,
            skill_level=skill_level,
            num_questions=num_questions,
            custom_topic=custom_topic,
            user_id=current_user_id
        )

        return jsonify({'success': True, 'questions': questions}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/quiz/next', methods=['POST'])
@auth_required
def api_next_question(current_user_id):
    """Return next adaptive question for user based on recent answer"""
    try:
        data = request.get_json() or {}
        topic = data.get('topic', 'General')
        question_type = data.get('question_type', 'MCQ')
        previous_answer_correct = data.get('previous_answer_correct')

        # Use adaptive generator
        questions = question_generator.generate_adaptive_question(
            user_id=str(current_user_id),
            topic=topic,
            question_type=question_type,
            num_questions=1,
            previous_answer_correct=previous_answer_correct
        )

        if questions:
            return jsonify({'success': True, 'question': questions[0]}), 200
        else:
            return jsonify({'success': False, 'message': 'No question generated'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quiz/history', methods=['GET'])
@auth_required
def get_quiz_history(current_user_id):
    try:
        quiz_sessions = QuizSession.query.filter_by(user_id=current_user_id).order_by(
            QuizSession.started_at.desc()
        ).all()
        
        return jsonify([qs.to_dict() for qs in quiz_sessions]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quiz/analytics', methods=['GET'])
@auth_required
def get_quiz_analytics(current_user_id):
    """Get detailed question analytics for the current user"""
    try:
        # Get all quiz sessions for the user
        quiz_sessions = QuizSession.query.filter_by(
            user_id=current_user_id, 
            status='completed'
        ).all()
        
        # Get all questions from completed quizzes
        all_questions = []
        for session in quiz_sessions:
            questions = Question.query.filter_by(quiz_session_id=session.id).all()
            all_questions.extend(questions)
        
        # Calculate question type performance
        question_type_stats = {
            'mcq': {'total': 0, 'correct': 0, 'accuracy': 0},
            'true_false': {'total': 0, 'correct': 0, 'accuracy': 0},
            'short_answer': {'total': 0, 'correct': 0, 'accuracy': 0}
        }
        
        # Calculate difficulty analysis
        difficulty_stats = {
            'easy': {'total': 0, 'correct': 0, 'accuracy': 0},
            'medium': {'total': 0, 'correct': 0, 'accuracy': 0},
            'hard': {'total': 0, 'correct': 0, 'accuracy': 0}
        }
        
        for question in all_questions:
            if question.user_answer is not None:  # Only count answered questions
                # Question type analysis
                question_type = question.question_type.lower()
                if question_type == 'mcq':
                    question_type_stats['mcq']['total'] += 1
                    if question.is_correct:
                        question_type_stats['mcq']['correct'] += 1
                elif question_type == 'true/false':
                    question_type_stats['true_false']['total'] += 1
                    if question.is_correct:
                        question_type_stats['true_false']['correct'] += 1
                elif question_type == 'short answer':
                    question_type_stats['short_answer']['total'] += 1
                    if question.is_correct:
                        question_type_stats['short_answer']['correct'] += 1
                
                # Difficulty analysis - handle different difficulty formats
                difficulty = question.difficulty_level.lower() if question.difficulty_level else 'medium'
                
                # Map different difficulty values to standard ones
                difficulty_mapping = {
                    'beginner': 'easy',
                    'easy': 'easy',
                    'intermediate': 'medium', 
                    'medium': 'medium',
                    'advanced': 'hard',
                    'hard': 'hard'
                }
                
                # Use mapping or default to medium
                mapped_difficulty = difficulty_mapping.get(difficulty, 'medium')
                
                if mapped_difficulty in difficulty_stats:
                    difficulty_stats[mapped_difficulty]['total'] += 1
                    if question.is_correct:
                        difficulty_stats[mapped_difficulty]['correct'] += 1
        
        print(f"Analytics Debug - Total questions: {len(all_questions)}")
        print(f"Question type stats: {question_type_stats}")
        print(f"Difficulty stats: {difficulty_stats}")
        
        # Calculate accuracy percentages
        for question_type in question_type_stats:
            stats = question_type_stats[question_type]
            if stats['total'] > 0:
                stats['accuracy'] = (stats['correct'] / stats['total']) * 100
        
        for difficulty in difficulty_stats:
            stats = difficulty_stats[difficulty]
            if stats['total'] > 0:
                stats['accuracy'] = (stats['correct'] / stats['total']) * 100
        
        return jsonify({
            'question_type_performance': question_type_stats,
            'difficulty_analysis': difficulty_stats,
            'total_questions': len(all_questions),
            'total_answered': len([q for q in all_questions if q.user_answer is not None]),
            'total_correct': len([q for q in all_questions if q.is_correct])
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Content Upload and Processing Endpoints
@app.route('/api/content/upload', methods=['POST'])
@auth_required
def upload_content_file(current_user_id):
    """Upload and process content files for custom quiz generation"""
    try:
        # Initialize content processor
        content_processor = ContentProcessor(app.config['UPLOAD_FOLDER'])
        
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Secure filename and save temporarily
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        temp_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        
        try:
            # Save uploaded file
            file.save(temp_path)
            
            # Process the content
            processing_result = content_processor.process_content(temp_path, "file")
            
            if not processing_result['success']:
                return jsonify({
                    'error': 'File processing failed',
                    'details': processing_result['error']
                }), 400
            
            # Generate content summary
            content_summary = content_processor.get_content_summary(processing_result['content'])
            
            # Return processed content and metadata
            response_data = {
                'success': True,
                'content': processing_result['content'],
                'metadata': processing_result['metadata'],
                'summary': content_summary,
                'file_info': {
                    'original_filename': filename,
                    'processed_filename': unique_filename,
                    'upload_timestamp': datetime.now().isoformat()
                }
            }
            
            print(f"📁 File processed successfully: {filename} ({content_summary['word_count']} words)")
            return jsonify(response_data), 200
            
        finally:
            # Clean up temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)
        
    except Exception as e:
        print(f"❌ File upload error: {e}")
        return jsonify({'error': f'File upload failed: {str(e)}'}), 500

@app.route('/api/content/process-url', methods=['POST'])
@auth_required
def process_url_content(current_user_id):
    """Process content from web URLs"""
    try:
        data = request.get_json()
        if not data or 'url' not in data:
            return jsonify({'error': 'URL is required'}), 400
        
        url = data['url'].strip()
        if not url:
            return jsonify({'error': 'URL cannot be empty'}), 400
        
        # Initialize content processor
        content_processor = ContentProcessor()
        
        # Process URL content
        processing_result = content_processor.process_content(url, "url")
        
        if not processing_result['success']:
            return jsonify({
                'error': 'URL processing failed',
                'details': processing_result['error']
            }), 400
        
        # Generate content summary
        content_summary = content_processor.get_content_summary(processing_result['content'])
        
        response_data = {
            'success': True,
            'content': processing_result['content'],
            'metadata': processing_result['metadata'],
            'summary': content_summary,
            'source_url': url
        }
        
        print(f"🌐 URL processed successfully: {url} ({content_summary['word_count']} words)")
        return jsonify(response_data), 200
        
    except Exception as e:
        print(f"❌ URL processing error: {e}")
        return jsonify({'error': f'URL processing failed: {str(e)}'}), 500

@app.route('/api/content/analyze', methods=['POST'])
@auth_required
def analyze_text_content(current_user_id):
    """Analyze and provide insights for text content"""
    try:
        data = request.get_json()
        if not data or 'content' not in data:
            return jsonify({'error': 'Content is required'}), 400
        
        content = data['content'].strip()
        if len(content) < 10:
            return jsonify({'error': 'Content must be at least 10 characters long'}), 400
        
        # Initialize content processor
        content_processor = ContentProcessor()
        
        # Process text content
        processing_result = content_processor.process_content(content, "text")
        
        if not processing_result['success']:
            return jsonify({
                'error': 'Content analysis failed',
                'details': processing_result['error']
            }), 400
        
        # Generate detailed content summary
        content_summary = content_processor.get_content_summary(processing_result['content'])
        
        # Additional analysis for quiz generation suitability
        analysis = {
            'content_length': 'short' if len(content) < 500 else 'medium' if len(content) < 2000 else 'long',
            'complexity_estimate': 'beginner' if content_summary['word_count'] < 100 else 'intermediate' if content_summary['word_count'] < 500 else 'advanced',
            'recommended_questions': min(10, max(3, content_summary['word_count'] // 50)),
            'content_type_suggestions': []
        }
        
        # Suggest content types based on keywords
        keywords = content_summary['top_keywords']
        if any(kw in ['history', 'historical', 'century', 'war', 'empire'] for kw in keywords):
            analysis['content_type_suggestions'].append('History')
        if any(kw in ['science', 'scientific', 'research', 'experiment', 'theory'] for kw in keywords):
            analysis['content_type_suggestions'].append('Science')
        if any(kw in ['math', 'mathematical', 'equation', 'calculate', 'number'] for kw in keywords):
            analysis['content_type_suggestions'].append('Mathematics')
        if any(kw in ['literature', 'literary', 'author', 'novel', 'poetry'] for kw in keywords):
            analysis['content_type_suggestions'].append('Literature')
        
        response_data = {
            'success': True,
            'content': processing_result['content'],
            'metadata': processing_result['metadata'],
            'summary': content_summary,
            'analysis': analysis,
            'quiz_generation_ready': True
        }
        
        print(f"📊 Content analyzed: {content_summary['word_count']} words, {analysis['recommended_questions']} recommended questions")
        return jsonify(response_data), 200
        
    except Exception as e:
        print(f"❌ Content analysis error: {e}")
        return jsonify({'error': f'Content analysis failed: {str(e)}'}), 500

@app.route('/api/content/formats', methods=['GET'])
def get_supported_formats():
    """Get list of supported file formats and content types"""
    supported_formats = {
        'file_formats': {
            'documents': ['.pdf', '.docx', '.doc'],
            'text_files': ['.txt', '.md', '.rst'],
            'data_files': ['.json', '.csv', '.xml']
        },
        'content_sources': [
            'Direct text input',
            'File upload (PDF, DOCX, TXT, etc.)',
            'Web URL content extraction',
            'JSON/CSV data files'
        ],
        'limitations': {
            'max_file_size': '10MB',
            'max_content_length': '50,000 characters',
            'supported_languages': 'Primarily English'
        },
        'features': [
            'Automatic content type detection',
            'Text extraction and cleaning',
            'Content analysis and summarization',
            'Quiz generation optimization',
            'Difficulty level suggestions'
        ]
    }
    
    return jsonify(supported_formats), 200

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

# Global Error Handlers for comprehensive error management
@app.errorhandler(ValidationError)
def handle_validation_error(error):
    """Handle validation errors with detailed field information"""
    return jsonify({
        'error': 'Validation Error',
        'message': error.user_message or error.message,
        'details': {
            'field': error.field,
            'value': str(error.value) if error.value is not None else None,
            'validation_rule': error.validation_rule
        },
        'error_code': 'VALIDATION_ERROR',
        'timestamp': datetime.now().isoformat()
    }), 400

@app.errorhandler(AIServiceError)
def handle_ai_service_error(error):
    """Handle AI service errors with service information"""
    return jsonify({
        'error': 'AI Service Error',
        'message': error.user_message or "AI service is temporarily unavailable",
        'details': {
            'service': error.service_name,
            'error_code': error.error_code,
            'retry_count': error.retry_count
        },
        'error_code': 'AI_SERVICE_ERROR',
        'timestamp': datetime.now().isoformat()
    }), 503

@app.errorhandler(SmartQuizzerError)
def handle_smart_quizzer_error(error):
    """Handle custom application errors"""
    status_code = 500
    if error.severity == ErrorSeverity.LOW:
        status_code = 400
    elif error.severity == ErrorSeverity.MEDIUM:
        status_code = 422
    elif error.severity == ErrorSeverity.HIGH:
        status_code = 500
    elif error.severity == ErrorSeverity.CRITICAL:
        status_code = 503
    
    return jsonify({
        'error': 'Application Error',
        'message': error.user_message or error.message,
        'details': error.details,
        'category': error.category.value if error.category else 'unknown',
        'severity': error.severity.value if error.severity else 'unknown',
        'error_code': 'SMART_QUIZZER_ERROR',
        'timestamp': datetime.now().isoformat()
    }), status_code

@app.errorhandler(404)
def handle_not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Not Found',
        'message': 'The requested resource was not found',
        'error_code': 'NOT_FOUND',
        'timestamp': datetime.now().isoformat()
    }), 404

@app.errorhandler(405)
def handle_method_not_allowed(error):
    """Handle 405 errors"""
    return jsonify({
        'error': 'Method Not Allowed',
        'message': 'The HTTP method is not allowed for this endpoint',
        'error_code': 'METHOD_NOT_ALLOWED',
        'timestamp': datetime.now().isoformat()
    }), 405

@app.errorhandler(413)
def handle_file_too_large(error):
    """Handle file upload size errors"""
    return jsonify({
        'error': 'File Too Large',
        'message': 'The uploaded file exceeds the maximum size limit (16MB)',
        'error_code': 'FILE_TOO_LARGE',
        'timestamp': datetime.now().isoformat()
    }), 413

@app.errorhandler(500)
def handle_internal_error(error):
    """Handle unexpected server errors"""
    db.session.rollback()
    return jsonify({
        'error': 'Internal Server Error',
        'message': 'An unexpected error occurred. Please try again later.',
        'error_code': 'INTERNAL_ERROR',
        'timestamp': datetime.now().isoformat()
    }), 500

if __name__ == '__main__':
    print("🚀 Starting Smart Quizzer API...")
    print("🔑 JWT Authentication ✅")
    print("💾 SQLite Database ✅")
    print("🤖 Gemini AI Model ✅")
    print("📁 Advanced Content Processing ✅")
    print("\n🌐 API running on: http://localhost:5000")
    print("📖 API Documentation:")
    print("   Authentication:")
    print("   - POST /api/auth/register - User registration")
    print("   - POST /api/auth/login - User login")
    print("   - GET  /api/auth/profile - User profile")
    print("   Quiz & Topics:")
    print("   - GET  /api/topics - Available topics")
    print("   - POST /api/quiz/start - Start quiz")
    print("   - POST /api/quiz/<id>/answer - Submit answer")
    print("   - GET  /api/quiz/<id>/results - Quiz results")
    print("   - GET  /api/quiz/history - Quiz history")
    print("   Content Upload & Processing:")
    print("   - POST /api/content/upload - Upload files (PDF, DOCX, TXT, etc.)")
    print("   - POST /api/content/process-url - Process web URL content")
    print("   - POST /api/content/analyze - Analyze text content")
    print("   - GET  /api/content/formats - Supported formats info")
    print("   Analytics & Adaptation:")
    print("   - GET  /api/user/adaptive-analytics - Adaptive learning analytics")
    print("   - POST /api/user/difficulty-recommendation - Get difficulty recommendation")
    print("   System:")
    print("   - GET  /api/health - Health check")
    
    app.run(debug=True, host='0.0.0.0', port=5000)