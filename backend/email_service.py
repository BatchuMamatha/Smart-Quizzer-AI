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
        self.smtp_username = os.getenv('SMTP_USERNAME', '')
        self.smtp_password = os.getenv('SMTP_PASSWORD', '')
        self.from_email = os.getenv('FROM_EMAIL', self.smtp_username)
        self.is_configured = bool(self.smtp_username and self.smtp_password)
        
        if self.is_configured:
            logger.info(f"✅ Email service configured: {self.smtp_server}:{self.smtp_port}")
        else:
            logger.warning("⚠️  Email service not configured. Set SMTP_USERNAME and SMTP_PASSWORD in .env")
    
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
            return {
                'success': False,
                'error': 'Email service not configured',
                'message': 'SMTP credentials not set in environment variables'
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
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)
            
            logger.info(f"✅ Email sent successfully to {to_email}")
            return {
                'success': True,
                'message': f'Email sent to {to_email}'
            }
            
        except Exception as e:
            error_msg = str(e)
            logger.error(f"❌ Failed to send email to {to_email}: {error_msg}")
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
    
    def send_password_reset_email(self, user_email, user_name, reset_token, reset_url):
        """Send password reset email with token"""
        reset_link = f"{reset_url}?token={reset_token}"
        
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
