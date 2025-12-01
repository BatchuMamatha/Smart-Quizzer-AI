"""
Email Service Module
Handles sending emails via SMTP for password resets, welcome emails, and notifications.
"""

import smtplib
import os
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Configure logging
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

class EmailService:
    """Service for sending emails via SMTP"""
    
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
        self.smtp_username = os.getenv('SMTP_USERNAME', '').strip()
        self.smtp_password = os.getenv('SMTP_PASSWORD', '').strip()
        self.from_email = os.getenv('FROM_EMAIL', self.smtp_username)
        
        # Check for placeholder credentials
        has_placeholder_email = self.smtp_username.upper() in ['YOUR_EMAIL@GMAIL.COM', 'YOUR-EMAIL@GMAIL.COM', 'YOUR_EMAIL@GMAIL.COM']
        has_placeholder_password = self.smtp_password.upper() in ['YOUR_16_CHAR_APP_PASSWORD', 'YOUR_APP_PASSWORD', 'YOUR-APP-PASSWORD']
        has_placeholder_values = self.smtp_username.startswith('YOUR_') or self.smtp_password.startswith('YOUR_')
        
        self.is_configured = bool(self.smtp_username and self.smtp_password)
        self.has_valid_credentials = self.is_configured and not (has_placeholder_email or has_placeholder_password or has_placeholder_values)
        
        if self.has_valid_credentials:
            logger.info(f"Email service configured correctly: {self.smtp_server}:{self.smtp_port} (Username: {self.smtp_username[:10]}...)")
        elif self.is_configured and not self.has_valid_credentials:
            logger.warning("WARNING: Email service has placeholder credentials!")
            logger.warning("   Fix: Update SMTP_USERNAME and SMTP_PASSWORD in .env with real Gmail credentials")
            logger.warning("   1. Get Google App Password from: https://myaccount.google.com/apppasswords")
            logger.warning("   2. Use App Password (16 characters), NOT regular Gmail password")
            logger.warning("   3. Update .env with: SMTP_USERNAME=yourmail@gmail.com")
            logger.warning("   4. Update .env with: SMTP_PASSWORD=your16charapppassword")
        else:
            logger.warning("WARNING: Email service not configured!")
            logger.warning("   Fix: Set SMTP_USERNAME and SMTP_PASSWORD in .env file")
    
    def send_email(self, to_email, subject, html_content, text_content=None):
        """
        Send email via SMTP
        
        Args:
            to_email (str): Recipient email address
            subject (str): Email subject
            html_content (str): HTML email body
            text_content (str): Plain text email body (fallback)
        
        Returns:
            dict: {'success': bool, 'message': str, 'error': str if failed}
        """
        if not self.is_configured:
            error_msg = 'Email service not configured - SMTP_USERNAME and SMTP_PASSWORD not set'
            logger.error(f"ERROR: {error_msg}")
            return {
                'success': False,
                'error': error_msg,
                'message': 'Email service not configured'
            }
        
        if not self.has_valid_credentials:
            error_msg = 'Email service has placeholder/invalid credentials - update .env with real Gmail App Password'
            logger.error(f"ERROR: {error_msg}")
            return {
                'success': False,
                'error': error_msg,
                'message': 'Email configuration incomplete'
            }
        
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = self.from_email
            msg['To'] = to_email
            
            # Add plain text and HTML versions
            if text_content:
                msg.attach(MIMEText(text_content, 'plain'))
            msg.attach(MIMEText(html_content, 'html'))
            
            # Send email with proper error handling
            try:
                with smtplib.SMTP(self.smtp_server, self.smtp_port, timeout=10) as server:
                    server.starttls()
                    server.login(self.smtp_username, self.smtp_password)
                    server.send_message(msg)
                
                logger.info(f"Email sent successfully to {to_email}")
                return {
                    'success': True,
                    'message': f'Email sent to {to_email}'
                }
            except smtplib.SMTPAuthenticationError as auth_error:
                error_msg = f"Gmail authentication failed: Invalid SMTP credentials (Error 535: BadCredentials). Use Google App Password, not regular Gmail password."
                logger.error(f"ERROR: {error_msg}")
                logger.error(f"   Details: {str(auth_error)}")
                return {
                    'success': False,
                    'error': error_msg,
                    'message': 'Email authentication failed'
                }
            except smtplib.SMTPException as smtp_error:
                error_msg = f"SMTP error: {str(smtp_error)}"
                logger.error(f"ERROR: Failed to send email to {to_email}: {error_msg}")
                return {
                    'success': False,
                    'error': error_msg,
                    'message': 'SMTP connection failed'
                }
            except TimeoutError:
                error_msg = "SMTP connection timeout - check SMTP_SERVER and SMTP_PORT"
                logger.error(f"ERROR: {error_msg}")
                return {
                    'success': False,
                    'error': error_msg,
                    'message': 'Email connection timeout'
                }
            
        except Exception as e:
            error_msg = f"Unexpected error: {str(e)}"
            logger.error(f"ERROR: Failed to send email to {to_email}: {error_msg}")
            return {
                'success': False,
                'error': error_msg,
                'message': 'Failed to send email'
            }
    
    def send_test_email(self, to_email, user_name):
        """Send a test email"""
        subject = "Smart Quizzer - Test Email"
        text_content = f"Hello {user_name},\n\nThis is a test email from Smart Quizzer AI."
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif;">
                <h2>Smart Quizzer - Test Email</h2>
                <p>Hello {user_name},</p>
                <p>This is a test email from Smart Quizzer AI.</p>
                <p>If you received this email, your email configuration is working correctly!</p>
                <hr/>
                <p style="color: #999; font-size: 12px;">
                    This is an automated message. Please do not reply to this email.
                </p>
            </body>
        </html>
        """
        return self.send_email(to_email, subject, html_content, text_content)
    
    def send_welcome_email(self, user_email, user_name):
        """Send welcome email to new user"""
        subject = "Welcome to Smart Quizzer AI!"
        text_content = f"""
        Hello {user_name},
        
        Welcome to Smart Quizzer AI! Your account has been created successfully.
        
        You can now log in and start taking quizzes to improve your knowledge and skills.
        
        Features:
        - Adaptive quizzes tailored to your skill level
        - Real-time progress tracking
        - Performance analytics
        - Leaderboards and achievements
        
        Get started now: https://smartquizzer.example.com/login
        
        If you have any questions, please contact our support team.
        
        Best regards,
        Smart Quizzer AI Team
        """
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2c3e50;">Welcome to Smart Quizzer AI! 🎓</h2>
                    
                    <p>Hello <strong>{user_name}</strong>,</p>
                    
                    <p>Your account has been created successfully. Welcome to Smart Quizzer AI!</p>
                    
                    <p>You can now log in and start taking quizzes to improve your knowledge and skills.</p>
                    
                    <h3 style="color: #3498db;">Features:</h3>
                    <ul>
                        <li>📚 Adaptive quizzes tailored to your skill level</li>
                        <li>📊 Real-time progress tracking</li>
                        <li>📈 Performance analytics</li>
                        <li>🏆 Leaderboards and achievements</li>
                    </ul>
                    
                    <p style="margin-top: 30px;">
                        <a href="https://smartquizzer.example.com/login" 
                           style="background-color: #3498db; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Get Started Now
                        </a>
                    </p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;"/>
                    
                    <p style="color: #7f8c8d; font-size: 12px;">
                        If you have any questions or need assistance, please contact our support team.<br/>
                        This is an automated message. Please do not reply to this email.
                    </p>
                    
                    <p style="color: #7f8c8d; font-size: 12px;">
                        Smart Quizzer AI Team
                    </p>
                </div>
            </body>
        </html>
        """
        
        return self.send_email(user_email, subject, html_content, text_content)
    
    def send_verification_email(self, user_email, user_name, verification_token, verification_url):
        """Send email verification email with token"""
        # verification_url should already contain the token in URL parameter format
        # Example: http://localhost:3000/verify-email/token123
        verification_link = verification_url
        
        subject = "Smart Quizzer - Verify Your Email Address"
        text_content = f"""
        Hello {user_name},
        
        Thank you for registering with Smart Quizzer AI!
        
        Please verify your email address by clicking the link below:
        {verification_link}
        
        This link will expire in 24 hours.
        
        If you did not create this account, please ignore this email.
        
        Best regards,
        Smart Quizzer AI Team
        """
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2c3e50;">Verify Your Email Address 📧</h2>
                    
                    <p>Hello <strong>{user_name}</strong>,</p>
                    
                    <p>Thank you for registering with Smart Quizzer AI!</p>
                    
                    <p>Please verify your email address to complete your registration and access all features.</p>
                    
                    <p style="margin: 30px 0;">
                        <a href="{verification_link}" 
                           style="background-color: #27ae60; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Verify Email Address
                        </a>
                    </p>
                    
                    <p style="color: #7f8c8d; font-size: 12px;">
                        Or copy and paste this link into your browser:<br/>
                        <a href="{verification_link}" style="color: #3498db;">{verification_link}</a>
                    </p>
                    
                    <p style="color: #7f8c8d; font-size: 12px; margin-top: 30px;">
                        This link will expire in 24 hours.
                    </p>
                    
                    <p style="color: #7f8c8d; font-size: 12px;">
                        If you did not create this account, please ignore this email.
                    </p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;"/>
                    
                    <p style="color: #7f8c8d; font-size: 12px;">
                        Smart Quizzer AI Team<br/>
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            </body>
        </html>
        """
        
        return self.send_email(user_email, subject, html_content, text_content)

    def send_password_reset_email(self, user_email, user_name, reset_token, reset_url):
        """Send password reset email with token"""
        # reset_url should already contain the token in URL parameter format
        # Example: http://localhost:3000/reset-password/token123
        reset_link = reset_url
        
        subject = "Smart Quizzer - Password Reset Request"
        text_content = f"""
        Hello {user_name},
        
        We received a request to reset your password for Smart Quizzer AI.
        
        Click the link below to reset your password:
        {reset_link}
        
        This link will expire in 24 hours.
        
        If you did not request this password reset, please ignore this email.
        
        Best regards,
        Smart Quizzer AI Team
        """
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #e74c3c;">Password Reset Request</h2>
                    
                    <p>Hello <strong>{user_name}</strong>,</p>
                    
                    <p>We received a request to reset your password for Smart Quizzer AI.</p>
                    
                    <p style="margin: 30px 0;">
                        <a href="{reset_link}" 
                           style="background-color: #e74c3c; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Reset Password
                        </a>
                    </p>
                    
                    <p style="color: #7f8c8d; font-size: 12px;">
                        This link will expire in 24 hours.
                    </p>
                    
                    <p style="color: #7f8c8d; font-size: 12px; margin-top: 30px;">
                        If you did not request this password reset, please ignore this email or 
                        contact us if you suspect unauthorized access.
                    </p>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;"/>
                    
                    <p style="color: #7f8c8d; font-size: 12px;">
                        Smart Quizzer AI Team<br/>
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            </body>
        </html>
        """
        
        return self.send_email(user_email, subject, html_content, text_content)

# Create singleton instance
email_service = EmailService()

def test_email_service():
    """Test email service configuration"""
    return {
        'configured': email_service.is_configured,
        'smtp_server': email_service.smtp_server,
        'smtp_port': email_service.smtp_port,
        'from_email': email_service.from_email,
        'message': 'Email service is configured' if email_service.is_configured else 'Email service not configured'
    }
