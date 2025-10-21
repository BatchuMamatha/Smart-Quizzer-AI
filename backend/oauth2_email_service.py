"""
OAuth2 Email Service Module for Smart Quizzer
Supports Gmail OAuth2 authentication for secure email sending
"""

import base64
import json
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Optional
from datetime import datetime

try:
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import Flow
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
    GOOGLE_LIBS_AVAILABLE = True
except ImportError:
    GOOGLE_LIBS_AVAILABLE = False
    print("[WARNING] Google OAuth2 libraries not installed. Install with: pip install google-auth google-auth-oauthlib google-api-python-client")


class OAuth2EmailService:
    """
    OAuth2-based email service for Gmail integration
    More secure than SMTP with App Passwords
    """
    
    def __init__(self):
        self.credentials = None
        self.service = None
        self.is_configured = False
        self.from_email = None
        self.from_name = "Smart Quizzer"
        
        # OAuth2 configuration
        self.client_id = os.getenv('GOOGLE_CLIENT_ID')
        self.client_secret = os.getenv('GOOGLE_CLIENT_SECRET')
        self.redirect_uri = os.getenv('GOOGLE_REDIRECT_URI', 'http://localhost:5000/api/admin/gmail-callback')
        
        # Scopes required for sending emails
        self.scopes = ['https://www.googleapis.com/auth/gmail.send']
        
        # Token storage path
        self.token_file = os.path.join(os.path.dirname(__file__), 'gmail_token.json')
        
        self._initialize()
    
    def _initialize(self):
        """Initialize the OAuth2 email service"""
        if not GOOGLE_LIBS_AVAILABLE:
            print("[ERROR] Google OAuth2 libraries not available")
            return
            
        if not self.client_id or not self.client_secret:
            print("[WARNING] Google OAuth2 credentials not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET")
            return
        
        # Try to load existing credentials
        self._load_credentials()
        
        if self.credentials and self.credentials.valid:
            self._build_service()
            print("[OK] Gmail OAuth2 service initialized successfully")
        elif self.credentials and self.credentials.expired and self.credentials.refresh_token:
            print("[INFO] Refreshing expired OAuth2 credentials...")
            self._refresh_credentials()
        else:
            print("[INFO] Gmail OAuth2 authentication required. Use /api/admin/gmail-auth to authenticate")
    
    def _load_credentials(self):
        """Load credentials from token file"""
        if os.path.exists(self.token_file):
            try:
                self.credentials = Credentials.from_authorized_user_file(self.token_file, self.scopes)
                return True
            except Exception as e:
                print(f"[ERROR] Failed to load credentials: {e}")
                return False
        return False
    
    def _save_credentials(self):
        """Save credentials to token file"""
        try:
            with open(self.token_file, 'w') as token:
                token.write(self.credentials.to_json())
            return True
        except Exception as e:
            print(f"[ERROR] Failed to save credentials: {e}")
            return False
    
    def _refresh_credentials(self):
        """Refresh expired credentials"""
        try:
            self.credentials.refresh(Request())
            self._save_credentials()
            self._build_service()
            print("[OK] OAuth2 credentials refreshed successfully")
            return True
        except Exception as e:
            print(f"[ERROR] Failed to refresh credentials: {e}")
            self.credentials = None
            return False
    
    def _build_service(self):
        """Build Gmail API service"""
        try:
            self.service = build('gmail', 'v1', credentials=self.credentials)
            self.is_configured = True
            
            # Get user's email address
            profile = self.service.users().getProfile(userId='me').execute()
            self.from_email = profile.get('emailAddress')
            
            return True
        except Exception as e:
            print(f"[ERROR] Failed to build Gmail service: {e}")
            self.service = None
            self.is_configured = False
            return False
    
    def get_auth_url(self) -> str:
        """
        Get OAuth2 authorization URL for user authentication
        
        Returns:
            Authorization URL string
        """
        if not GOOGLE_LIBS_AVAILABLE:
            raise Exception("Google OAuth2 libraries not available")
        
        if not self.client_id or not self.client_secret:
            raise Exception("Google OAuth2 credentials not configured")
        
        flow = Flow.from_client_config(
            {
                "web": {
                    "client_id": self.client_id,
                    "client_secret": self.client_secret,
                    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                    "token_uri": "https://oauth2.googleapis.com/token",
                    "redirect_uris": [self.redirect_uri]
                }
            },
            scopes=self.scopes
        )
        flow.redirect_uri = self.redirect_uri
        
        auth_url, _ = flow.authorization_url(prompt='consent')
        return auth_url
    
    def handle_auth_callback(self, auth_code: str) -> Dict[str, any]:
        """
        Handle OAuth2 callback with authorization code
        
        Args:
            auth_code: Authorization code from Google
            
        Returns:
            Dictionary with authentication result
        """
        if not GOOGLE_LIBS_AVAILABLE:
            return {
                'success': False,
                'error': 'Google OAuth2 libraries not available'
            }
        
        try:
            flow = Flow.from_client_config(
                {
                    "web": {
                        "client_id": self.client_id,
                        "client_secret": self.client_secret,
                        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                        "token_uri": "https://oauth2.googleapis.com/token",
                        "redirect_uris": [self.redirect_uri]
                    }
                },
                scopes=self.scopes
            )
            flow.redirect_uri = self.redirect_uri
            
            # Exchange authorization code for credentials
            flow.fetch_token(code=auth_code)
            self.credentials = flow.credentials
            
            # Save credentials and build service
            self._save_credentials()
            success = self._build_service()
            
            if success:
                return {
                    'success': True,
                    'message': 'Gmail OAuth2 authentication successful',
                    'email': self.from_email
                }
            else:
                return {
                    'success': False,
                    'error': 'Failed to build Gmail service'
                }
                
        except Exception as e:
            return {
                'success': False,
                'error': f'OAuth2 authentication failed: {str(e)}'
            }
    
    def send_email(self, to_email: str, subject: str, html_content: str, text_content: str = None) -> Dict[str, any]:
        """
        Send email using Gmail API
        
        Args:
            to_email: Recipient email address
            subject: Email subject
            html_content: HTML content of the email
            text_content: Plain text content (optional)
            
        Returns:
            Dictionary with send result
        """
        if not self.is_configured or not self.service:
            return {
                'success': False,
                'error': 'Gmail OAuth2 service not configured or authenticated'
            }
        
        try:
            # Create message
            message = MIMEMultipart('alternative')
            message['to'] = to_email
            message['from'] = f"{self.from_name} <{self.from_email}>"
            message['subject'] = subject
            
            # Add text content if provided
            if text_content:
                part1 = MIMEText(text_content, 'plain')
                message.attach(part1)
            
            # Add HTML content
            part2 = MIMEText(html_content, 'html')
            message.attach(part2)
            
            # Encode message
            raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
            
            # Send message
            send_result = self.service.users().messages().send(
                userId='me',
                body={'raw': raw_message}
            ).execute()
            
            return {
                'success': True,
                'message': f'Email sent successfully to {to_email}',
                'message_id': send_result.get('id'),
                'timestamp': datetime.utcnow().isoformat()
            }
            
        except HttpError as error:
            error_details = error.error_details[0] if error.error_details else {}
            return {
                'success': False,
                'error': f'Gmail API error: {error_details.get("message", str(error))}',
                'error_code': error.resp.status
            }
        except Exception as e:
            return {
                'success': False,
                'error': f'Failed to send email: {str(e)}'
            }
    
    def send_password_reset_email(self, user_email: str, user_name: str, reset_token: str, 
                                reset_url: str = "http://localhost:3000/reset-password") -> Dict[str, any]:
        """Send password reset email with OAuth2"""
        
        reset_link = f"{reset_url}?token={reset_token}"
        
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🧠 Smart Quizzer</h1>
                <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Password Reset Request</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #1a202c; margin-top: 0;">Hello {user_name}! 👋</h2>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
                    We received a request to reset your password for your Smart Quizzer account.
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="{reset_link}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                        🔑 Reset My Password
                    </a>
                </div>
                
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="color: #856404; margin: 0; font-size: 14px;">
                        ⏰ <strong>Important:</strong> This reset link will expire in 1 hour for security reasons.
                    </p>
                </div>
                
                <p style="color: #4a5568; font-size: 14px; line-height: 1.6;">
                    If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
                </p>
                
                <p style="color: #4a5568; font-size: 14px; line-height: 1.6;">
                    If the button doesn't work, copy and paste this link into your browser:<br>
                    <a href="{reset_link}" style="color: #667eea; word-break: break-all;">{reset_link}</a>
                </p>
                
                <div style="border-top: 2px solid #e2e8f0; margin-top: 30px; padding-top: 20px;">
                    <p style="color: #718096; font-size: 12px; margin: 0;">
                        This email was sent from Smart Quizzer AI Learning Platform<br>
                        Sent on {datetime.now().strftime('%Y-%m-%d at %H:%M:%S UTC')}
                    </p>
                </div>
            </div>
        </div>
        """
        
        text_content = f"""
        Smart Quizzer - Password Reset Request
        
        Hello {user_name}!
        
        We received a request to reset your password for your Smart Quizzer account.
        
        Click this link to reset your password: {reset_link}
        
        Important: This reset link will expire in 1 hour for security reasons.
        
        If you didn't request this password reset, please ignore this email.
        
        Best regards,
        Smart Quizzer Team
        """
        
        subject = "🔑 Password Reset - Smart Quizzer"
        
        return self.send_email(user_email, subject, html_content, text_content)
    
    def send_welcome_email(self, user_email: str, user_name: str) -> Dict[str, any]:
        """Send welcome email with OAuth2"""
        
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🧠 Smart Quizzer</h1>
                <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Welcome to AI-Powered Learning!</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #1a202c; margin-top: 0;">Welcome {user_name}! 🎉</h2>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
                    Thank you for joining Smart Quizzer! We're excited to help you on your learning journey with our AI-powered adaptive quiz system.
                </p>
                
                <div style="background: #edf2f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #2d3748; margin-top: 0;">🚀 What you can do:</h3>
                    <ul style="color: #4a5568; margin: 0;">
                        <li>📚 Take adaptive quizzes on various topics</li>
                        <li>🧠 Experience AI-powered question generation</li>
                        <li>📈 Track your learning progress and analytics</li>
                        <li>📁 Upload custom content for personalized quizzes</li>
                        <li>🎯 Adaptive difficulty based on your performance</li>
                    </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="http://localhost:3000/dashboard" style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                        🎯 Start Learning Now
                    </a>
                </div>
                
                <p style="color: #4a5568; font-size: 14px; line-height: 1.6;">
                    Ready to test your knowledge? Log in to your dashboard and start your first adaptive quiz!
                </p>
                
                <div style="border-top: 2px solid #e2e8f0; margin-top: 30px; padding-top: 20px;">
                    <p style="color: #718096; font-size: 12px; margin: 0;">
                        Happy learning!<br>
                        Smart Quizzer Team<br>
                        Sent on {datetime.now().strftime('%Y-%m-%d at %H:%M:%S UTC')}
                    </p>
                </div>
            </div>
        </div>
        """
        
        text_content = f"""
        Welcome to Smart Quizzer!
        
        Hello {user_name}!
        
        Thank you for joining Smart Quizzer! We're excited to help you on your learning journey.
        
        What you can do:
        - Take adaptive quizzes on various topics
        - Experience AI-powered question generation
        - Track your learning progress and analytics
        - Upload custom content for personalized quizzes
        - Adaptive difficulty based on your performance
        
        Ready to start learning? Visit: http://localhost:3000/dashboard
        
        Happy learning!
        Smart Quizzer Team
        """
        
        subject = "🎉 Welcome to Smart Quizzer - Let's Start Learning!"
        
        return self.send_email(user_email, subject, html_content, text_content)
    
    def send_test_email(self, recipient_email: str, recipient_name: str = "User") -> Dict[str, any]:
        """Send test email using OAuth2"""
        
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🧠 Smart Quizzer</h1>
                <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">OAuth2 Email Service Test</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #1a202c; margin-top: 0;">Hello {recipient_name}! 👋</h2>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
                    This is a test email to verify that your Smart Quizzer OAuth2 email service is working correctly.
                </p>
                
                <div style="background: #edf2f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #2d3748; margin-top: 0;">📧 OAuth2 Configuration:</h3>
                    <ul style="color: #4a5568; margin: 0;">
                        <li>Service Type: <strong>Gmail OAuth2</strong></li>
                        <li>Authentication: <strong>Secure OAuth2 Flow</strong></li>
                        <li>From Email: <strong>{self.from_email}</strong></li>
                        <li>API Version: <strong>Gmail API v1</strong></li>
                    </ul>
                </div>
                
                <div style="background: #f0fff4; border: 2px solid #68d391; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="color: #22543d; margin: 0; font-weight: bold;">
                        ✅ Success! OAuth2 email service is working perfectly!
                    </p>
                </div>
                
                <p style="color: #718096; font-size: 14px; margin-top: 30px;">
                    This test was sent on {datetime.now().strftime('%Y-%m-%d at %H:%M:%S UTC')}
                </p>
            </div>
        </div>
        """
        
        text_content = f"""
        Smart Quizzer OAuth2 Email Service Test
        
        Hello {recipient_name}!
        
        This is a test email to verify that your Smart Quizzer OAuth2 email service is working correctly.
        
        OAuth2 Configuration:
        - Service Type: Gmail OAuth2
        - Authentication: Secure OAuth2 Flow
        - From Email: {self.from_email}
        - API Version: Gmail API v1
        
        Success! OAuth2 email service is working perfectly!
        
        This test was sent on {datetime.now().strftime('%Y-%m-%d at %H:%M:%S UTC')}
        """
        
        subject = "🧪 Smart Quizzer OAuth2 Email Test"
        
        return self.send_email(recipient_email, subject, html_content, text_content)
    
    def get_status(self) -> Dict[str, any]:
        """Get current OAuth2 service status"""
        return {
            'is_configured': self.is_configured,
            'libraries_available': GOOGLE_LIBS_AVAILABLE,
            'credentials_valid': self.credentials is not None and self.credentials.valid,
            'from_email': self.from_email,
            'client_id_configured': bool(self.client_id),
            'client_secret_configured': bool(self.client_secret),
            'token_file_exists': os.path.exists(self.token_file)
        }


# Create global OAuth2 email service instance
oauth2_email_service = OAuth2EmailService()

# Convenience functions for compatibility
def send_password_reset_email_oauth(user_email: str, user_name: str, reset_token: str, 
                                  reset_url: str = "http://localhost:3000/reset-password") -> Dict[str, any]:
    """Send password reset email using OAuth2"""
    return oauth2_email_service.send_password_reset_email(user_email, user_name, reset_token, reset_url)

def send_welcome_email_oauth(user_email: str, user_name: str) -> Dict[str, any]:
    """Send welcome email using OAuth2"""
    return oauth2_email_service.send_welcome_email(user_email, user_name)