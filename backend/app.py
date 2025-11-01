from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
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
from models import db, User, QuizSession, Question, Topic, QuizLeaderboard
from auth import init_jwt, generate_tokens, auth_required
from question_gen import question_generator
from content_processor import ContentProcessor
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
    
    # Configure CORS - Allow frontend to communicate with backend
    # In production, replace with your actual frontend URL
    cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
    CORS(app, resources={
        r"/api/*": {
            "origins": cors_origins,
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "expose_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }
    })
    
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
        
        # Use SMTP email service
        print(f"📧 Testing SMTP email to {test_email_address}")
        
        try:
            from email_service import email_service
            
            if not email_service or not email_service.is_configured:
                return jsonify({
                    'success': False,
                    'error': 'No email service configured',
                    'message': 'Please configure SMTP email service in .env file'
                }), 500
            
            email_service.send_test_email(test_email_address, user.full_name)
            
            return jsonify({
                'success': True,
                'message': f'Test email sent successfully to {test_email_address}',
                'email_method': 'SMTP',
                'timestamp': datetime.utcnow().isoformat()
            })
            
        except Exception as e:
            print(f"[ERROR] SMTP test failed: {e}")
            return jsonify({
                'success': False,
                'error': str(e),
                'message': 'Failed to send test email',
                'email_method': 'SMTP',
                'error_type': type(e).__name__
            }), 500
            
    except Exception as e:
        print(f"[ERROR] Test email endpoint error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

# OAuth2 endpoints removed - using SMTP email service only

# OAuth2 callback endpoint removed - using SMTP email service only

# OAuth2 status endpoint removed - using SMTP email service only

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
        
        # Get role from data (default to 'user')
        role = data.get('role', 'user')
        if role not in ['user', 'admin']:
            role = 'user'
        
        # Create new user
        user = User(
            username=data['username'],
            email=data['email'],
            full_name=data['full_name'],
            skill_level=data['skill_level'],
            role=role
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Generate tokens
        tokens = generate_tokens(user.id)
        print(f"✅ User '{user.username}' registered successfully as {role}")
        
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
        
        username = data['username']
        password = data['password']
        
        # Check if user exists in database
        user = User.query.filter_by(username=username).first()
        
        if not user:
            print(f"❌ Login failed: User '{username}' not found")
            return jsonify({'error': 'Invalid username or password'}), 401
        
        if not user.check_password(password):
            print(f"❌ Login failed: Invalid password for user '{username}'")
            return jsonify({'error': 'Invalid username or password'}), 401
        
        # Successful login
        print(f"✅ User '{user.username}' (ID: {user.id}) logged in successfully")
        
        # Generate tokens for authenticated user
        tokens = generate_tokens(user.id)
        
        print(f"🔐 Token generated for user: {user.id} ({user.username})")
        print(f"   Token preview: {tokens['access_token'][:50]}...")
        
        # Get user stats
        total_quizzes = len(user.quiz_sessions)
        completed_quizzes = len([qs for qs in user.quiz_sessions if qs.status == 'completed'])
        avg_score = 0
        
        if completed_quizzes > 0:
            total_score = sum([qs.score_percentage for qs in user.quiz_sessions if qs.status == 'completed'])
            avg_score = total_score / completed_quizzes
        
        user_dict = user.to_dict()
        user_dict.update({
            'total_quizzes': total_quizzes,
            'completed_quizzes': completed_quizzes,
            'average_score': round(avg_score, 1)
        })
        
        print(f"📤 Sending login response:")
        print(f"   User ID: {user_dict['id']}")
        print(f"   Username: {user_dict['username']}")
        print(f"   Full Name: {user_dict['full_name']}")
        
        return jsonify({
            'message': 'Login successful',
            'user': user_dict,
            'tokens': tokens
        }), 200
        
    except Exception as e:
        print(f"❌ Login error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Login failed: {str(e)}'}), 500

@app.route('/api/auth/verify-token', methods=['GET'])
@auth_required
def verify_token(current_user_id):
    """Debug endpoint to verify JWT token and user identity"""
    try:
        from flask_jwt_extended import get_jwt, get_jwt_identity
        
        jwt_data = get_jwt()
        jwt_identity = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        debug_info = {
            'decoded_user_id': current_user_id,
            'jwt_identity': jwt_identity,
            'jwt_data': jwt_data,
            'user_from_db': {
                'id': user.id,
                'username': user.username,
                'full_name': user.full_name,
                'email': user.email
            } if user else None
        }
        
        print(f"🔍 DEBUG Token Verification:")
        print(f"  - JWT Identity: {jwt_identity}")
        print(f"  - Decoded User ID: {current_user_id}")
        print(f"  - DB User: {user.username if user else 'NOT FOUND'}")
        
        return jsonify(debug_info), 200
        
    except Exception as e:
        print(f"❌ Token verification error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

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

@app.route('/api/auth/profile/skill-level', methods=['PUT'])
@auth_required
def update_skill_level(current_user_id):
    """Update user's skill level based on adaptive learning performance"""
    try:
        data = request.get_json()
        if not data or 'skill_level' not in data:
            return jsonify({'error': 'Skill level is required'}), 400
        
        skill_level = data['skill_level']
        valid_levels = ['Beginner', 'Intermediate', 'Advanced']
        
        if skill_level not in valid_levels:
            return jsonify({'error': f'Invalid skill level. Must be one of: {", ".join(valid_levels)}'}), 400
        
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        old_level = user.skill_level
        user.skill_level = skill_level
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        print(f"📊 User {user.username} skill level updated: {old_level} → {skill_level}")
        
        return jsonify({
            'success': True,
            'message': f'Skill level updated from {old_level} to {skill_level}',
            'old_skill_level': old_level,
            'new_skill_level': skill_level,
            'updated_at': user.updated_at.isoformat()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/adaptive/skill-level-recommendation', methods=['GET'])
@auth_required
def get_skill_level_recommendation(current_user_id):
    """Get recommendation for skill level update based on performance"""
    try:
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        user_id_str = str(current_user_id)
        
        # Check if user has adaptive performance history
        if user_id_str not in question_generator.adaptive_engine.user_performance_history:
            return jsonify({
                'should_update': False,
                'reason': 'no_adaptive_history',
                'message': 'Complete more quizzes to receive skill level recommendations',
                'current_skill_level': user.skill_level
            }), 200
        
        # Get recommendation from adaptive engine
        recommendation = question_generator.adaptive_engine.should_update_skill_level(user_id_str)
        recommendation['current_skill_level'] = user.skill_level
        
        return jsonify(recommendation), 200
        
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
            
            # Use SMTP email service
            print(f"📧 Sending password reset email to {user.email}")
            email_result = send_password_reset_email(
                user_email=user.email,
                user_name=user.full_name,
                reset_token=reset_token,
                reset_url=reset_url
            )
            
            if email_result and email_result['success']:
                print(f"📧 Password reset email sent via SMTP to {user.email}")
                return jsonify({
                    'success': True,
                    'message': 'Password reset link sent to your email address',
                    'user_exists': True,
                    'email_sent': True,
                    'email_method': 'SMTP'
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
        
        # Calculate score after each answer to show real-time progress
        quiz_session.calculate_score()
        
        # Check if quiz is completed
        if quiz_session.completed_questions >= quiz_session.total_questions:
            quiz_session.status = 'completed'
            quiz_session.completed_at = datetime.utcnow()
        
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
        
        # Recalculate score to ensure it's up to date
        quiz_session.calculate_score()
        db.session.commit()
        
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

@app.route('/api/leaderboard', methods=['GET'])
@auth_required
def get_leaderboard(current_user_id):
    """Get leaderboard rankings for all users based on quiz performance"""
    try:
        print(f"🔍 DEBUG: Leaderboard requested by user_id: {current_user_id}")
        
        # Get query parameters
        topic = request.args.get('topic', None)
        skill_level = request.args.get('skill_level', None)
        limit = request.args.get('limit', 10, type=int)
        
        print(f"🔍 DEBUG: Filters - topic: {topic}, skill_level: {skill_level}, limit: {limit}")
        
        # Build query for completed quiz sessions
        query = QuizSession.query.filter_by(status='completed')
        
        # Apply filters if provided
        if topic:
            query = query.filter_by(topic=topic)
        if skill_level:
            query = query.filter_by(skill_level=skill_level)
        
        # Get all completed quizzes
        completed_quizzes = query.all()
        
        print(f"🔍 DEBUG: Found {len(completed_quizzes)} completed quizzes")
        
        # Group by user and calculate aggregate stats
        user_stats = {}
        
        for quiz in completed_quizzes:
            user_id = quiz.user_id
            
            # Calculate time taken in seconds
            time_taken = 0
            if quiz.completed_at and quiz.started_at:
                time_delta = quiz.completed_at - quiz.started_at
                time_taken = int(time_delta.total_seconds())
            
            if user_id not in user_stats:
                # IMPORTANT: Fetch fresh user data from database
                user = User.query.get(user_id)
                if not user:
                    print(f"⚠️ WARNING: User {user_id} not found in database!")
                    continue
                    
                print(f"🔍 DEBUG: Adding user - ID: {user_id}, Username: {user.username}, Full Name: {user.full_name}")
                
                user_stats[user_id] = {
                    'user_id': user_id,
                    'username': user.username,
                    'full_name': user.full_name,
                    'total_quizzes': 0,
                    'total_questions': 0,
                    'total_correct': 0,
                    'average_score': 0,
                    'total_time': 0,
                    'average_time': 0,
                    'best_score': 0,
                    'best_quiz_id': None,
                    'best_quiz_time': 0,
                    'recent_quizzes': []
                }
            
            # Update aggregated stats
            user_stats[user_id]['total_quizzes'] += 1
            user_stats[user_id]['total_questions'] += quiz.total_questions
            user_stats[user_id]['total_correct'] += quiz.correct_answers
            user_stats[user_id]['total_time'] += time_taken
            
            # Track best score
            if quiz.score_percentage > user_stats[user_id]['best_score']:
                user_stats[user_id]['best_score'] = quiz.score_percentage
                user_stats[user_id]['best_quiz_id'] = quiz.id
                user_stats[user_id]['best_quiz_time'] = time_taken
            
            # Add to recent quizzes (limit to 5)
            if len(user_stats[user_id]['recent_quizzes']) < 5:
                user_stats[user_id]['recent_quizzes'].append({
                    'quiz_id': quiz.id,
                    'topic': quiz.topic,
                    'score': quiz.score_percentage,
                    'time_taken': time_taken,
                    'completed_at': quiz.completed_at.isoformat() if quiz.completed_at else None
                })
        
        print(f"🔍 DEBUG: Total unique users: {len(user_stats)}")
        
        # Calculate averages
        for user_id, stats in user_stats.items():
            if stats['total_questions'] > 0:
                stats['average_score'] = (stats['total_correct'] / stats['total_questions']) * 100
            if stats['total_quizzes'] > 0:
                stats['average_time'] = stats['total_time'] / stats['total_quizzes']
        
        # Convert to list and sort by average score (descending), then by average time (ascending)
        leaderboard = list(user_stats.values())
        leaderboard.sort(key=lambda x: (-x['average_score'], x['average_time']))
        
        # Add rank
        for i, entry in enumerate(leaderboard):
            entry['rank'] = i + 1
            print(f"🔍 DEBUG: Rank {entry['rank']}: {entry['username']} ({entry['full_name']}) - {entry['average_score']:.1f}%")
        
        # Apply limit
        leaderboard = leaderboard[:limit]
        
        # Find current user's rank and stats
        current_user_rank = None
        current_user_stats = None
        
        # Get fresh current user data
        current_user = User.query.get(current_user_id)
        print(f"🔍 DEBUG: Current user - ID: {current_user_id}, Username: {current_user.username if current_user else 'Unknown'}, Full Name: {current_user.full_name if current_user else 'Unknown'}")
        
        for entry in user_stats.values():
            if entry['user_id'] == current_user_id:
                current_user_stats = entry
                # Calculate rank among all users (not just top limit)
                all_users = list(user_stats.values())
                all_users.sort(key=lambda x: (-x['average_score'], x['average_time']))
                for i, user_entry in enumerate(all_users):
                    if user_entry['user_id'] == current_user_id:
                        current_user_rank = i + 1
                        break
                break
        
        print(f"🔍 DEBUG: Current user rank: {current_user_rank}")
        
        return jsonify({
            'leaderboard': leaderboard,
            'total_users': len(user_stats),
            'current_user': {
                'rank': current_user_rank,
                'stats': current_user_stats
            },
            'filters': {
                'topic': topic,
                'skill_level': skill_level
            }
        }), 200
        
    except Exception as e:
        print(f"❌ ERROR in leaderboard: {str(e)}")
        import traceback
        traceback.print_exc()
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

# ==================== ADMIN & MODERATION ENDPOINTS ====================

@app.route('/api/admin/stats', methods=['GET'])
@auth_required
def get_admin_stats(current_user_id):
    """Get admin dashboard statistics"""
    try:
        from models import FlaggedQuestion
        
        # In production, add admin role check here
        total_users = User.query.count()
        total_quizzes = QuizSession.query.count()
        total_questions = Question.query.count()
        
        # Get flagged questions count
        flagged_count = FlaggedQuestion.query.filter_by(status='pending').count()
        
        # Active users today
        today = datetime.utcnow().date()
        active_today = QuizSession.query.filter(
            db.func.date(QuizSession.started_at) == today
        ).distinct(QuizSession.user_id).count()
        
        # Average quiz score
        completed_quizzes = QuizSession.query.filter_by(status='completed').all()
        avg_score = sum([q.score_percentage for q in completed_quizzes]) / len(completed_quizzes) if completed_quizzes else 0
        
        return jsonify({
            'total_users': total_users,
            'total_quizzes': total_quizzes,
            'total_questions': total_questions,
            'flagged_questions': flagged_count,
            'active_users_today': active_today,
            'avg_quiz_score': avg_score
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/users', methods=['GET'])
@auth_required
def get_admin_users(current_user_id):
    """Get all users for admin dashboard"""
    try:
        users = User.query.all()
        users_data = []
        
        for user in users:
            user_dict = user.to_dict()
            user_dict['quiz_count'] = len(user.quiz_sessions)
            users_data.append(user_dict)
        
        return jsonify({'users': users_data}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/users/<int:user_id>/skill-level', methods=['PUT'])
@auth_required
def admin_update_user_skill(current_user_id, user_id):
    """Admin endpoint to update user skill level"""
    try:
        data = request.get_json()
        skill_level = data.get('skill_level')
        
        if skill_level not in ['Beginner', 'Intermediate', 'Advanced']:
            return jsonify({'error': 'Invalid skill level'}), 400
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        user.skill_level = skill_level
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'User {user.username} updated to {skill_level}'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/flagged-questions', methods=['GET'])
@auth_required
def get_flagged_questions(current_user_id):
    """Get all flagged questions with complete details (Admin only)"""
    try:
        # Verify admin access
        admin_user = User.query.get(current_user_id)
        if not admin_user or admin_user.role != 'admin':
            return jsonify({'error': 'Unauthorized: Admin access required'}), 403
        
        from models import FlaggedQuestion
        
        # Get filter parameter (default to 'pending')
        status_filter = request.args.get('status', 'pending')
        
        # Build query based on filter
        if status_filter == 'all':
            flagged = FlaggedQuestion.query.order_by(FlaggedQuestion.flagged_at.desc()).all()
        else:
            flagged = FlaggedQuestion.query.filter_by(status=status_filter).order_by(FlaggedQuestion.flagged_at.desc()).all()
        
        flagged_list = []
        for flag in flagged:
            question = Question.query.get(flag.question_id)
            flagged_by_user = User.query.get(flag.flagged_by_user_id)
            
            flag_dict = {
                'id': flag.id,
                'question_id': flag.question_id,
                'question_text': question.question_text if question else 'Question not found',
                'question_type': question.question_type if question else 'Unknown',
                'difficulty': question.difficulty_level if question else 'Unknown',
                'flag_reason': flag.flag_reason,
                'flag_count': flag.flag_count,
                'flagged_by': [flagged_by_user.username] if flagged_by_user else ['Unknown'],
                'flagged_by_email': flagged_by_user.email if flagged_by_user else 'Unknown',
                'status': flag.status,
                'flagged_at': flag.flagged_at.isoformat() if flag.flagged_at else None,
                'resolved_at': flag.resolved_at.isoformat() if flag.resolved_at else None
            }
            flagged_list.append(flag_dict)
        
        return jsonify({
            'flagged_questions': flagged_list,
            'total_count': len(flagged_list)
        }), 200
        
    except Exception as e:
        print(f"❌ Error getting flagged questions: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/resolve-flag/<int:flag_id>', methods=['POST'])
@auth_required
def resolve_flag(current_user_id, flag_id):
    """Resolve a specific flagged question (Admin only)"""
    try:
        # Verify admin access
        admin_user = User.query.get(current_user_id)
        if not admin_user or admin_user.role != 'admin':
            return jsonify({'error': 'Unauthorized: Admin access required'}), 403
        
        from models import FlaggedQuestion
        flag = FlaggedQuestion.query.get(flag_id)
        
        if not flag:
            return jsonify({'error': 'Flagged question not found'}), 404
        
        flag.status = 'resolved'
        flag.resolved_at = datetime.utcnow()
        flag.resolved_by_user_id = current_user_id
        
        db.session.commit()
        
        print(f"✅ Admin {current_user_id} resolved flag {flag_id} for question {flag.question_id}")
        
        return jsonify({
            'success': True,
            'message': f'Flag resolved successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error resolving flag: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/delete-flagged-question/<int:flag_id>', methods=['DELETE'])
@auth_required
def delete_flagged_question(current_user_id, flag_id):
    """Delete the question associated with a flag and mark flag as resolved (Admin only)"""
    try:
        # Verify admin access
        admin_user = User.query.get(current_user_id)
        if not admin_user or admin_user.role != 'admin':
            return jsonify({'error': 'Unauthorized: Admin access required'}), 403
        
        from models import FlaggedQuestion
        flag = FlaggedQuestion.query.get(flag_id)
        
        if not flag:
            return jsonify({'error': 'Flagged question not found'}), 404
        
        question_id = flag.question_id
        question = Question.query.get(question_id)
        
        if not question:
            # Question already deleted, just resolve the flag
            flag.status = 'resolved'
            flag.resolved_at = datetime.utcnow()
            flag.resolved_by_user_id = current_user_id
            db.session.commit()
            return jsonify({
                'success': True,
                'message': 'Question was already deleted. Flag resolved.'
            }), 200
        
        # Delete the question
        db.session.delete(question)
        
        # Mark all flags for this question as resolved
        all_flags = FlaggedQuestion.query.filter_by(question_id=question_id, status='pending').all()
        for f in all_flags:
            f.status = 'resolved'
            f.resolved_at = datetime.utcnow()
            f.resolved_by_user_id = current_user_id
        
        db.session.commit()
        
        print(f"🗑️ Admin {current_user_id} deleted question {question_id} and resolved {len(all_flags)} flags")
        
        return jsonify({
            'success': True,
            'message': f'Question deleted and {len(all_flags)} flag(s) resolved successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error deleting flagged question: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/feedback', methods=['GET'])
@auth_required
def get_admin_feedback(current_user_id):
    """Get all user feedback with complete details (Admin only)"""
    try:
        # Verify admin access
        admin_user = User.query.get(current_user_id)
        if not admin_user or admin_user.role != 'admin':
            return jsonify({'error': 'Unauthorized: Admin access required'}), 403
        
        from models import QuestionFeedback
        
        # Get all feedback with user and question details
        feedbacks = QuestionFeedback.query.order_by(QuestionFeedback.created_at.desc()).limit(100).all()
        
        feedback_list = []
        for feedback in feedbacks:
            user = User.query.get(feedback.user_id)
            question = Question.query.get(feedback.question_id)
            
            feedback_dict = {
                'id': feedback.id,
                'question_id': feedback.question_id,
                'question_text': question.question_text if question else 'Question not found',
                'question_type': question.question_type if question else 'Unknown',
                'difficulty': question.difficulty_level if question else 'Unknown',
                'user_id': feedback.user_id,
                'username': user.username if user else 'Unknown',
                'user_email': user.email if user else 'Unknown',
                'feedback_text': feedback.feedback_text,
                'rating': feedback.rating,
                'created_at': feedback.created_at.isoformat() if feedback.created_at else None
            }
            feedback_list.append(feedback_dict)
        
        return jsonify({
            'feedbacks': feedback_list,
            'total_count': len(feedback_list)
        }), 200
        
    except Exception as e:
        print(f"❌ Error getting feedback: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/questions/<int:question_id>', methods=['GET'])
@auth_required
def get_question_by_id(current_user_id, question_id):
    """Get a single question by ID with full details (for admins to view question details)"""
    try:
        question = Question.query.get(question_id)
        
        if not question:
            return jsonify({'error': 'Question not found'}), 404
        
        # Get the quiz session to retrieve topic
        quiz_session = QuizSession.query.get(question.quiz_session_id) if question.quiz_session_id else None
        
        # Get the user who created it
        created_by_user = quiz_session.user if quiz_session else None
        
        question_dict = {
            'id': question.id,
            'question_text': question.question_text,
            'question_type': question.question_type,
            'difficulty': question.difficulty_level,
            'topic': quiz_session.topic if quiz_session else 'Unknown',
            'correct_answer': question.correct_answer,
            'explanation': question.explanation,
            'options': question.get_options() if question.question_type == 'multiple_choice' else None,
            'created_at': question.created_at.isoformat() if question.created_at else None,
            'created_by': {
                'id': created_by_user.id if created_by_user else None,
                'username': created_by_user.username if created_by_user else 'Unknown',
                'email': created_by_user.email if created_by_user else 'Unknown'
            } if created_by_user else None
        }
        
        return jsonify(question_dict), 200
        
    except Exception as e:
        print(f"❌ Error getting question: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/leaderboard', methods=['GET'])
@auth_required
def get_admin_leaderboard(current_user_id):
    """Get complete leaderboard for admin dashboard with search and filter"""
    try:
        # Verify admin access
        admin_user = User.query.get(current_user_id)
        if not admin_user or admin_user.role != 'admin':
            return jsonify({'error': 'Unauthorized: Admin access required'}), 403
        
        # Get query parameters
        search = request.args.get('search', '').strip()
        topic = request.args.get('topic', '').strip()
        quiz_id = request.args.get('quiz_id', '').strip()
        limit = request.args.get('limit', 50, type=int)
        offset = request.args.get('offset', 0, type=int)
        
        # Build query
        query = QuizLeaderboard.query
        
        # Apply filters
        if search:
            query = query.join(User).filter(
                db.or_(
                    User.username.ilike(f'%{search}%'),
                    User.full_name.ilike(f'%{search}%'),
                    User.email.ilike(f'%{search}%')
                )
            )
        
        if topic:
            query = query.filter(QuizLeaderboard.topic.ilike(f'%{topic}%'))
        
        if quiz_id:
            query = query.filter(QuizLeaderboard.quiz_session_id == int(quiz_id))
        
        # Get total count
        total_entries = query.count()
        
        # Get paginated results ordered by score
        leaderboard_entries = query.order_by(
            QuizLeaderboard.score.desc(),
            QuizLeaderboard.timestamp.desc()
        ).limit(limit).offset(offset).all()
        
        # Calculate ranks
        for idx, entry in enumerate(leaderboard_entries, start=offset + 1):
            entry.rank = idx
        
        # Get user statistics
        user_stats = db.session.query(
            User.id,
            User.username,
            User.full_name,
            User.email,
            User.role,
            db.func.count(QuizLeaderboard.id).label('total_quizzes'),
            db.func.avg(QuizLeaderboard.score).label('avg_score'),
            db.func.sum(QuizLeaderboard.correct_count).label('total_correct'),
            db.func.sum(QuizLeaderboard.total_questions).label('total_questions')
        ).outerjoin(QuizLeaderboard).group_by(User.id).all()
        
        users_summary = []
        for stat in user_stats:
            users_summary.append({
                'user_id': stat.id,
                'username': stat.username,
                'full_name': stat.full_name,
                'email': stat.email,
                'role': stat.role,
                'total_quizzes': stat.total_quizzes or 0,
                'avg_score': round(stat.avg_score, 2) if stat.avg_score else 0,
                'total_correct': stat.total_correct or 0,
                'total_questions': stat.total_questions or 0,
                'overall_accuracy': round((stat.total_correct / stat.total_questions * 100), 1) if stat.total_questions else 0
            })
        
        return jsonify({
            'leaderboard': [entry.to_dict() for entry in leaderboard_entries],
            'users_summary': users_summary,
            'total_entries': total_entries,
            'limit': limit,
            'offset': offset,
            'filters': {
                'search': search,
                'topic': topic,
                'quiz_id': quiz_id
            }
        }), 200
        
    except Exception as e:
        print(f"❌ Admin leaderboard error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# ==================== FEEDBACK & FLAGGING ENDPOINTS ====================

@app.route('/api/feedback/question/<int:question_id>', methods=['POST'])
@auth_required
def submit_question_feedback(current_user_id, question_id):
    """Submit feedback for a question (Users only, not admins)"""
    try:
        # Verify user is not an admin
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        if user.role == 'admin':
            return jsonify({
                'error': 'Admins cannot submit feedback',
                'message': 'Only regular users who take quizzes can provide feedback'
            }), 403
        
        from models import QuestionFeedback
        data = request.get_json()
        feedback_text = data.get('feedback')
        rating = data.get('rating', 3)
        
        if not feedback_text:
            return jsonify({'error': 'Feedback text is required'}), 400
        
        if not (1 <= rating <= 5):
            return jsonify({'error': 'Rating must be between 1 and 5'}), 400
        
        feedback = QuestionFeedback(
            question_id=question_id,
            user_id=current_user_id,
            feedback_text=feedback_text,
            rating=rating
        )
        
        db.session.add(feedback)
        db.session.commit()
        
        print(f"📝 Feedback saved from user {user.username} (ID: {current_user_id}) on question {question_id}")
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your feedback!',
            'feedback_id': feedback.id
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error submitting feedback: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/flag/question/<int:question_id>', methods=['POST'])
@auth_required
def flag_question(current_user_id, question_id):
    """Flag a question for review (Users only, not admins)"""
    try:
        # Verify user is not an admin
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        if user.role == 'admin':
            return jsonify({
                'error': 'Admins cannot flag questions',
                'message': 'Only regular users who take quizzes can flag questions for review'
            }), 403
        
        from models import FlaggedQuestion
        data = request.get_json()
        flag_reason = data.get('reason', 'No reason provided')
        
        question = Question.query.get(question_id)
        if not question:
            return jsonify({'error': 'Question not found'}), 404
        
        # Check if user already flagged this question
        existing_flag = FlaggedQuestion.query.filter_by(
            question_id=question_id,
            flagged_by_user_id=current_user_id,
            status='pending'
        ).first()
        
        if existing_flag:
            # Increment flag count
            existing_flag.flag_count += 1
            db.session.commit()
            return jsonify({
                'success': True,
                'message': 'Flag count updated for this question'
            }), 200
        
        flag = FlaggedQuestion(
            question_id=question_id,
            flagged_by_user_id=current_user_id,
            flag_reason=flag_reason,
            flag_count=1,
            status='pending'
        )
        
        db.session.add(flag)
        db.session.commit()
        
        print(f"🚩 Question {question_id} flagged by user {current_user_id}: {flag_reason}")
        
        return jsonify({
            'success': True,
            'message': 'Question flagged for review. Thank you for helping improve our content!',
            'flag_id': flag.id
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error flagging question: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# ==================== LEADERBOARD ENDPOINTS ====================

@app.route('/api/leaderboard/global', methods=['GET'])
def get_global_leaderboard():
    """Get global leaderboard across all quizzes"""
    try:
        limit = request.args.get('limit', 10, type=int)
        topic = request.args.get('topic', None)
        
        # Query leaderboard entries
        query = db.session.query(
            QuizLeaderboard.user_id,
            User.username,
            User.full_name,
            db.func.count(QuizLeaderboard.id).label('total_quizzes'),
            db.func.avg(QuizLeaderboard.score).label('avg_score'),
            db.func.sum(QuizLeaderboard.correct_count).label('total_correct'),
            db.func.sum(QuizLeaderboard.total_questions).label('total_questions'),
            db.func.avg(QuizLeaderboard.time_taken).label('avg_time')
        ).join(User).group_by(QuizLeaderboard.user_id)
        
        if topic:
            query = query.filter(QuizLeaderboard.topic == topic)
        
        # Order by average score
        leaderboard_data = query.order_by(db.desc('avg_score')).limit(limit).all()
        
        # Format results with ranking
        leaderboard = []
        for rank, entry in enumerate(leaderboard_data, start=1):
            leaderboard.append({
                'rank': rank,
                'user_id': entry.user_id,
                'username': entry.username,
                'full_name': entry.full_name,
                'total_quizzes': entry.total_quizzes,
                'avg_score': round(entry.avg_score, 2),
                'total_correct': entry.total_correct,
                'total_questions': entry.total_questions,
                'accuracy': round((entry.total_correct / entry.total_questions * 100), 1) if entry.total_questions > 0 else 0,
                'avg_time': round(entry.avg_time, 1)
            })
        
        return jsonify({
            'leaderboard': leaderboard,
            'total_entries': len(leaderboard),
            'topic': topic
        }), 200
        
    except Exception as e:
        print(f"❌ Error fetching global leaderboard: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/leaderboard/topic/<topic>', methods=['GET'])
def get_topic_leaderboard(topic):
    """Get leaderboard for specific topic"""
    try:
        limit = request.args.get('limit', 10, type=int)
        time_period = request.args.get('period', 'all')  # all, today, week, month
        
        query = QuizLeaderboard.query.filter_by(topic=topic)
        
        # Filter by time period
        if time_period == 'today':
            today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
            query = query.filter(QuizLeaderboard.timestamp >= today)
        elif time_period == 'week':
            week_ago = datetime.utcnow() - timedelta(days=7)
            query = query.filter(QuizLeaderboard.timestamp >= week_ago)
        elif time_period == 'month':
            month_ago = datetime.utcnow() - timedelta(days=30)
            query = query.filter(QuizLeaderboard.timestamp >= month_ago)
        
        # Get top scores
        leaderboard_entries = query.order_by(QuizLeaderboard.score.desc()).limit(limit).all()
        
        # Update ranks
        for rank, entry in enumerate(leaderboard_entries, start=1):
            entry.rank = rank
        
        db.session.commit()
        
        leaderboard = [entry.to_dict() for entry in leaderboard_entries]
        
        return jsonify({
            'leaderboard': leaderboard,
            'topic': topic,
            'period': time_period,
            'total_entries': len(leaderboard)
        }), 200
        
    except Exception as e:
        print(f"❌ Error fetching topic leaderboard: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/leaderboard/live/<topic>', methods=['GET'])
def get_live_leaderboard(topic):
    """Get live leaderboard for users currently taking quizzes on a topic"""
    try:
        # Get active and recently completed quiz sessions (last 5 minutes)
        recent_time = datetime.utcnow() - timedelta(minutes=5)
        
        active_sessions = QuizSession.query.filter(
            QuizSession.topic == topic,
            QuizSession.started_at >= recent_time,
            db.or_(
                QuizSession.status == 'active',
                db.and_(
                    QuizSession.status == 'completed',
                    QuizSession.completed_at >= recent_time
                )
            )
        ).all()
        
        live_rankings = []
        for session in active_sessions:
            # Calculate current stats
            time_elapsed = (datetime.utcnow() - session.started_at).total_seconds()
            
            # Calculate average difficulty weight
            questions = Question.query.filter_by(quiz_session_id=session.id).all()
            difficulty_weights = {
                'Beginner': 1.0,
                'Intermediate': 1.5,
                'Advanced': 2.0
            }
            
            avg_difficulty = sum([difficulty_weights.get(q.difficulty_level, 1.0) for q in questions]) / len(questions) if questions else 1.0
            
            # Calculate score
            if time_elapsed > 0:
                time_in_minutes = max(time_elapsed / 60, 0.5)
                score = (session.correct_answers * avg_difficulty * 100) / time_in_minutes
            else:
                score = 0
            
            live_rankings.append({
                'user_id': session.user_id,
                'username': session.user.username,
                'full_name': session.user.full_name,
                'quiz_session_id': session.id,
                'score': round(score, 2),
                'correct_count': session.correct_answers,
                'total_questions': session.total_questions,
                'completed_questions': session.completed_questions,
                'accuracy': round(session.score_percentage, 1),
                'time_taken': int(time_elapsed),
                'status': session.status,
                'avg_difficulty': round(avg_difficulty, 2)
            })
        
        # Sort by score
        live_rankings.sort(key=lambda x: x['score'], reverse=True)
        
        # Add ranks
        for rank, entry in enumerate(live_rankings, start=1):
            entry['rank'] = rank
        
        return jsonify({
            'live_leaderboard': live_rankings,
            'topic': topic,
            'total_active': len(live_rankings),
            'last_updated': datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        print(f"❌ Error fetching live leaderboard: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/leaderboard/user/<int:user_id>', methods=['GET'])
@auth_required
def get_user_leaderboard_stats(current_user_id, user_id):
    """Get leaderboard statistics for a specific user"""
    try:
        # Verify user can access this data (only their own or admin)
        current_user = User.query.get(current_user_id)
        if current_user_id != user_id and current_user.role != 'admin':
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Get all leaderboard entries for user
        entries = QuizLeaderboard.query.filter_by(user_id=user_id).all()
        
        if not entries:
            return jsonify({
                'user_id': user_id,
                'total_entries': 0,
                'best_score': 0,
                'avg_score': 0,
                'total_quizzes': 0
            }), 200
        
        # Calculate stats
        scores = [entry.score for entry in entries]
        best_score = max(scores)
        avg_score = sum(scores) / len(scores)
        
        # Get best rank achieved
        best_rank = min([entry.rank for entry in entries if entry.rank is not None], default=None)
        
        # Group by topic
        topic_stats = {}
        for entry in entries:
            if entry.topic not in topic_stats:
                topic_stats[entry.topic] = {
                    'count': 0,
                    'best_score': 0,
                    'avg_score': 0,
                    'best_rank': None
                }
            
            topic_stats[entry.topic]['count'] += 1
            topic_stats[entry.topic]['best_score'] = max(topic_stats[entry.topic]['best_score'], entry.score)
            
            if entry.rank and (topic_stats[entry.topic]['best_rank'] is None or entry.rank < topic_stats[entry.topic]['best_rank']):
                topic_stats[entry.topic]['best_rank'] = entry.rank
        
        # Calculate average scores per topic
        for topic in topic_stats:
            topic_entries = [e for e in entries if e.topic == topic]
            topic_stats[topic]['avg_score'] = sum([e.score for e in topic_entries]) / len(topic_entries)
        
        return jsonify({
            'user_id': user_id,
            'total_entries': len(entries),
            'best_score': round(best_score, 2),
            'avg_score': round(avg_score, 2),
            'best_rank': best_rank,
            'total_quizzes': len(entries),
            'topic_stats': {
                topic: {
                    'count': stats['count'],
                    'best_score': round(stats['best_score'], 2),
                    'avg_score': round(stats['avg_score'], 2),
                    'best_rank': stats['best_rank']
                }
                for topic, stats in topic_stats.items()
            },
            'recent_entries': [entry.to_dict() for entry in sorted(entries, key=lambda x: x.timestamp, reverse=True)[:5]]
        }), 200
        
    except Exception as e:
        print(f"❌ Error fetching user leaderboard stats: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/quiz/<int:quiz_id>/leaderboard', methods=['POST'])
@auth_required
def update_quiz_leaderboard(current_user_id, quiz_id):
    """Update leaderboard entry when quiz is completed"""
    try:
        # Get quiz session
        quiz_session = QuizSession.query.filter_by(id=quiz_id, user_id=current_user_id).first()
        
        if not quiz_session:
            return jsonify({'error': 'Quiz session not found'}), 404
        
        if quiz_session.status != 'completed':
            return jsonify({'error': 'Quiz not completed yet'}), 400
        
        # Calculate time taken
        if quiz_session.completed_at and quiz_session.started_at:
            time_taken = int((quiz_session.completed_at - quiz_session.started_at).total_seconds())
        else:
            time_taken = 0
        
        # Get all questions for this quiz to calculate average difficulty
        questions = Question.query.filter_by(quiz_session_id=quiz_id).all()
        
        difficulty_weights = {
            'Beginner': 1.0,
            'Intermediate': 1.5,
            'Advanced': 2.0
        }
        
        if questions:
            total_weight = sum([difficulty_weights.get(q.difficulty_level, 1.0) for q in questions])
            avg_difficulty_weight = total_weight / len(questions)
        else:
            avg_difficulty_weight = 1.0
        
        # Check if leaderboard entry already exists
        existing_entry = QuizLeaderboard.query.filter_by(quiz_session_id=quiz_id).first()
        
        if existing_entry:
            # Update existing entry
            leaderboard_entry = existing_entry
            leaderboard_entry.correct_count = quiz_session.correct_answers
            leaderboard_entry.total_questions = quiz_session.total_questions
            leaderboard_entry.time_taken = time_taken
            leaderboard_entry.avg_difficulty_weight = avg_difficulty_weight
        else:
            # Create new leaderboard entry
            leaderboard_entry = QuizLeaderboard(
                user_id=current_user_id,
                quiz_session_id=quiz_id,
                topic=quiz_session.topic,
                correct_count=quiz_session.correct_answers,
                total_questions=quiz_session.total_questions,
                time_taken=time_taken,
                avg_difficulty_weight=avg_difficulty_weight
            )
            db.session.add(leaderboard_entry)
        
        # Calculate score
        leaderboard_entry.calculate_score()
        
        db.session.commit()
        
        # Get updated rank for this topic
        topic_entries = QuizLeaderboard.query.filter_by(topic=quiz_session.topic).order_by(QuizLeaderboard.score.desc()).all()
        
        for rank, entry in enumerate(topic_entries, start=1):
            entry.rank = rank
        
        db.session.commit()
        
        print(f"📊 Leaderboard updated for user {current_user_id}, quiz {quiz_id}, score: {leaderboard_entry.score}")
        
        return jsonify({
            'success': True,
            'leaderboard_entry': leaderboard_entry.to_dict(),
            'message': 'Leaderboard updated successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error updating leaderboard: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

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
    print("   Leaderboard:")
    print("   - GET  /api/leaderboard/global - Global leaderboard")
    print("   - GET  /api/leaderboard/topic/<topic> - Topic-specific leaderboard")
    print("   - GET  /api/leaderboard/live/<topic> - Live rankings (real-time)")
    print("   - GET  /api/leaderboard/user/<id> - User leaderboard stats")
    print("   - POST /api/quiz/<id>/leaderboard - Update leaderboard entry")
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