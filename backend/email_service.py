"""
Email Service Module for Smart Quizzer
Supports multiple email providers: SMTP, Gmail, SendGrid, etc.
"""

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, List, Optional
import os
from datetime import datetime
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmailService:
    """
    Comprehensive email service supporting multiple providers
    """
    
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_username = os.getenv('SMTP_USERNAME')
        self.smtp_password = os.getenv('SMTP_PASSWORD')
        self.from_email = os.getenv('FROM_EMAIL', self.smtp_username)
        self.from_name = os.getenv('FROM_NAME', 'Smart Quizzer')
        
        # Email service configuration
        self.use_tls = os.getenv('SMTP_USE_TLS', 'true').lower() == 'true'
        self.use_ssl = os.getenv('SMTP_USE_SSL', 'false').lower() == 'true'
        
        # Validate configuration
        self.is_configured = self._validate_configuration()
        
        if self.is_configured:
            logger.info(f"[OK] Email service configured: {self.smtp_server}:{self.smtp_port}")
        else:
            logger.warning("[WARNING] Email service not properly configured - email functionality disabled")
    
    def _validate_configuration(self) -> bool:
        """Validate email service configuration"""
        required_fields = [self.smtp_server, self.smtp_username, self.smtp_password]
        return all(field for field in required_fields)
    
    def send_email(self, to_email: str, subject: str, html_content: str, 
                   text_content: Optional[str] = None) -> Dict[str, any]:
        """
        Send email with HTML and optional text content
        
        Args:
            to_email: Recipient email address
            subject: Email subject
            html_content: HTML content of the email
            text_content: Optional plain text content
            
        Returns:
            Dictionary with success status and message
        """
        if not self.is_configured:
            return {
                'success': False,
                'error': 'Email service not configured',
                'message': 'SMTP credentials not provided'
            }
        
        try:
            # Create message
            message = MIMEMultipart("alternative")
            message["Subject"] = subject
            message["From"] = f"{self.from_name} <{self.from_email}>"
            message["To"] = to_email
            
            # Create text and HTML parts
            if text_content:
                text_part = MIMEText(text_content, "plain")
                message.attach(text_part)
            
            html_part = MIMEText(html_content, "html")
            message.attach(html_part)
            
            # Create SMTP session
            if self.use_ssl:
                # Use SSL connection
                context = ssl.create_default_context()
                server = smtplib.SMTP_SSL(self.smtp_server, self.smtp_port, context=context)
            else:
                # Use regular SMTP with optional TLS
                server = smtplib.SMTP(self.smtp_server, self.smtp_port)
                if self.use_tls:
                    context = ssl.create_default_context()
                    server.starttls(context=context)
            
            # Login and send email
            server.login(self.smtp_username, self.smtp_password)
            text = message.as_string()
            server.sendmail(self.from_email, to_email, text)
            server.quit()
            
            logger.info(f"[OK] Email sent successfully to {to_email}")
            return {
                'success': True,
                'message': f'Email sent successfully to {to_email}',
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            error_msg = f"Failed to send email to {to_email}: {str(e)}"
            logger.error(f"[ERROR] {error_msg}")
            return {
                'success': False,
                'error': str(e),
                'message': error_msg,
                'timestamp': datetime.now().isoformat()
            }
    
    def send_password_reset_email(self, user_email: str, user_name: str, 
                                reset_token: str, reset_url: str) -> Dict[str, any]:
        """
        Send password reset email with styled HTML template
        
        Args:
            user_email: User's email address
            user_name: User's display name
            reset_token: Password reset token
            reset_url: Base URL for password reset (frontend URL)
            
        Returns:
            Dictionary with success status and message
        """
        
        # Construct full reset URL
        full_reset_url = f"{reset_url}?token={reset_token}"
        
        # HTML email template
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset - Smart Quizzer</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }}
                .button {{ display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }}
                .button:hover {{ background: #5a6fd8; }}
                .footer {{ text-align: center; margin-top: 30px; font-size: 14px; color: #666; }}
                .warning {{ background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0; }}
                .code {{ background: #f1f1f1; padding: 2px 6px; border-radius: 3px; font-family: monospace; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🧠 Smart Quizzer</h1>
                    <p>Password Reset Request</p>
                </div>
                <div class="content">
                    <h2>Hello {user_name}!</h2>
                    <p>We received a request to reset your password for your Smart Quizzer account.</p>
                    
                    <p>Click the button below to reset your password:</p>
                    <a href="{full_reset_url}" class="button">Reset Password</a>
                    
                    <div class="warning">
                        <strong>⚠️ Security Notice:</strong>
                        <ul>
                            <li>This link will expire in 24 hours</li>
                            <li>You can only use this link once</li>
                            <li>If you didn't request this reset, please ignore this email</li>
                        </ul>
                    </div>
                    
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p class="code">{full_reset_url}</p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                    
                    <p><strong>Need help?</strong> Contact our support team if you have any questions.</p>
                </div>
                <div class="footer">
                    <p>This email was sent by Smart Quizzer - AI-Powered Adaptive Learning Platform</p>
                    <p>© 2025 Smart Quizzer. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Plain text fallback
        text_content = f"""
        Smart Quizzer - Password Reset Request
        
        Hello {user_name}!
        
        We received a request to reset your password for your Smart Quizzer account.
        
        Please click on the following link to reset your password:
        {full_reset_url}
        
        SECURITY NOTICE:
        - This link will expire in 24 hours
        - You can only use this link once
        - If you didn't request this reset, please ignore this email
        
        If you need help, please contact our support team.
        
        Best regards,
        Smart Quizzer Team
        """
        
        subject = "Reset Your Smart Quizzer Password"
        
        return self.send_email(user_email, subject, html_content, text_content)
    
    def send_welcome_email(self, user_email: str, user_name: str) -> Dict[str, any]:
        """
        Send welcome email to new users
        
        Args:
            user_email: User's email address
            user_name: User's display name
            
        Returns:
            Dictionary with success status and message
        """
        
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Smart Quizzer!</title>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }}
                .feature {{ background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #667eea; }}
                .footer {{ text-align: center; margin-top: 30px; font-size: 14px; color: #666; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🧠 Welcome to Smart Quizzer!</h1>
                    <p>AI-Powered Adaptive Learning Platform</p>
                </div>
                <div class="content">
                    <h2>Hello {user_name}!</h2>
                    <p>Welcome to Smart Quizzer! We're excited to help you learn more effectively with our AI-powered adaptive quiz system.</p>
                    
                    <h3>🚀 Here's what you can do:</h3>
                    
                    <div class="feature">
                        <strong>📚 Custom Content Upload</strong><br>
                        Upload PDFs, documents, or paste text to generate personalized quizzes
                    </div>
                    
                    <div class="feature">
                        <strong>🎯 Adaptive Learning</strong><br>
                        Our AI adjusts question difficulty based on your performance
                    </div>
                    
                    <div class="feature">
                        <strong>📊 Performance Analytics</strong><br>
                        Track your progress and identify areas for improvement
                    </div>
                    
                    <div class="feature">
                        <strong>🎤 Audio Feedback</strong><br>
                        Get spoken results and live captions for better accessibility
                    </div>
                    
                    <p>Ready to start learning? Log in to your account and take your first adaptive quiz!</p>
                    
                    <p>Happy learning!</p>
                </div>
                <div class="footer">
                    <p>Smart Quizzer - Making Learning Smarter with AI</p>
                    <p>© 2025 Smart Quizzer. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        Welcome to Smart Quizzer!
        
        Hello {user_name}!
        
        Welcome to Smart Quizzer! We're excited to help you learn more effectively with our AI-powered adaptive quiz system.
        
        Here's what you can do:
        
        📚 Custom Content Upload - Upload PDFs, documents, or paste text to generate personalized quizzes
        🎯 Adaptive Learning - Our AI adjusts question difficulty based on your performance  
        📊 Performance Analytics - Track your progress and identify areas for improvement
        🎤 Audio Feedback - Get spoken results and live captions for better accessibility
        
        Ready to start learning? Log in to your account and take your first adaptive quiz!
        
        Happy learning!
        Smart Quizzer Team
        """
        
        subject = "Welcome to Smart Quizzer - Let's Start Learning!"
        
        return self.send_email(user_email, subject, html_content, text_content)
    
    def test_configuration(self) -> Dict[str, any]:
        """
        Test email configuration by sending a test email
        
        Returns:
            Dictionary with test results
        """
        if not self.is_configured:
            return {
                'success': False,
                'message': 'Email service not configured',
                'details': {
                    'smtp_server': bool(self.smtp_server),
                    'smtp_username': bool(self.smtp_username),
                    'smtp_password': bool(self.smtp_password)
                }
            }
        
        test_email = self.smtp_username  # Send test to same email
        test_subject = "Smart Quizzer Email Service Test"
        test_content = """
        <h2>Email Service Test</h2>
        <p>This is a test email to verify that your Smart Quizzer email service is working correctly.</p>
        <p><strong>Configuration:</strong></p>
        <ul>
            <li>SMTP Server: {}</li>
            <li>Port: {}</li>
            <li>Use TLS: {}</li>
            <li>Use SSL: {}</li>
        </ul>
        <p>If you received this email, your email service is configured correctly!</p>
        """.format(self.smtp_server, self.smtp_port, self.use_tls, self.use_ssl)
        
        return self.send_email(test_email, test_subject, test_content)
    
    def send_test_email(self, recipient_email: str, recipient_name: str = "User") -> Dict[str, any]:
        """
        Send test email to specified recipient
        
        Args:
            recipient_email: Email address to send test to
            recipient_name: Name of the recipient
            
        Returns:
            Dictionary with send results
        """
        if not self.is_configured:
            raise Exception('Email service not configured')
        
        test_subject = "Smart Quizzer Email Service Test"
        test_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 10px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🧠 Smart Quizzer</h1>
                <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Email Service Test</p>
            </div>
            
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #1a202c; margin-top: 0;">Hello {recipient_name}! 👋</h2>
                
                <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">
                    This is a test email to verify that your Smart Quizzer email service is working correctly.
                </p>
                
                <div style="background: #edf2f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #2d3748; margin-top: 0;">📧 Email Configuration:</h3>
                    <ul style="color: #4a5568; margin: 0;">
                        <li>SMTP Server: <strong>{self.smtp_server}</strong></li>
                        <li>Port: <strong>{self.smtp_port}</strong></li>
                        <li>Use TLS: <strong>{self.use_tls}</strong></li>
                        <li>Use SSL: <strong>{self.use_ssl}</strong></li>
                        <li>From Email: <strong>{self.from_email}</strong></li>
                    </ul>
                </div>
                
                <div style="background: #f0fff4; border: 2px solid #68d391; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="color: #22543d; margin: 0; font-weight: bold;">
                        ✅ Success! If you received this email, your email service is configured correctly!
                    </p>
                </div>
                
                <p style="color: #718096; font-size: 14px; margin-top: 30px;">
                    This test was sent on {datetime.now().strftime('%Y-%m-%d at %H:%M:%S UTC')}
                </p>
            </div>
        </div>
        """
        
        text_content = f"""
        Smart Quizzer Email Service Test
        
        Hello {recipient_name}!
        
        This is a test email to verify that your Smart Quizzer email service is working correctly.
        
        Email Configuration:
        - SMTP Server: {self.smtp_server}
        - Port: {self.smtp_port}
        - Use TLS: {self.use_tls}
        - Use SSL: {self.use_ssl}
        - From Email: {self.from_email}
        
        Success! If you received this email, your email service is configured correctly!
        
        This test was sent on {datetime.now().strftime('%Y-%m-%d at %H:%M:%S UTC')}
        """
        
        return self.send_email(recipient_email, test_subject, test_content, text_content)

# Create global email service instance
email_service = EmailService()

# Convenience functions
def send_password_reset_email(user_email: str, user_name: str, reset_token: str, 
                            reset_url: str = "http://localhost:3000/reset-password") -> Dict[str, any]:
    """Send password reset email using global email service"""
    return email_service.send_password_reset_email(user_email, user_name, reset_token, reset_url)

def send_welcome_email(user_email: str, user_name: str) -> Dict[str, any]:
    """Send welcome email using global email service"""
    return email_service.send_welcome_email(user_email, user_name)

def test_email_service() -> Dict[str, any]:
    """Test email service configuration"""
    return email_service.test_configuration()
