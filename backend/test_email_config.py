#!/usr/bin/env python3
"""
Email Configuration and Testing Script
Helps configure and test email sending for Smart Quizzer AI
"""

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from getpass import getpass
import sys

def test_email_config():
    """Test email configuration and send a test email"""
    
    print("🔧 Smart Quizzer AI - Email Configuration Test")
    print("=" * 50)
    
    # Get email configuration from user
    print("\n📧 Email Provider Setup:")
    print("1. Gmail (recommended)")
    print("2. Outlook/Hotmail")
    print("3. Yahoo Mail")
    print("4. Custom SMTP")
    
    provider = input("\nSelect email provider (1-4): ").strip()
    
    if provider == "1":
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        print("\n📝 For Gmail, you need an App Password:")
        print("1. Go to Google Account > Security")
        print("2. Enable 2-Step Verification")
        print("3. Generate App Password for 'Mail'")
        print("4. Use the 16-character password below\n")
    elif provider == "2":
        smtp_server = "smtp-mail.outlook.com"
        smtp_port = 587
    elif provider == "3":
        smtp_server = "smtp.mail.yahoo.com"
        smtp_port = 587
        print("\n📝 For Yahoo, you need an App Password:")
        print("1. Go to Yahoo Account Security")
        print("2. Generate App Password")
        print("3. Use that password below\n")
    elif provider == "4":
        smtp_server = input("SMTP Server: ").strip()
        smtp_port = int(input("SMTP Port (usually 587): ").strip() or "587")
    else:
        print("❌ Invalid selection")
        return False
    
    # Get credentials
    from_email = input("Your Email Address: ").strip()
    password = getpass("Email Password (App Password for Gmail/Yahoo): ")
    test_to_email = input("Test Email Address (where to send test): ").strip()
    
    print(f"\n🧪 Testing email configuration...")
    print(f"📧 From: {from_email}")
    print(f"📧 To: {test_to_email}")
    print(f"🌐 SMTP: {smtp_server}:{smtp_port}")
    
    try:
        # Create test message
        msg = MIMEMultipart()
        msg['Subject'] = '✅ Smart Quizzer AI - Email Test Successful'
        msg['From'] = f"Smart Quizzer AI <{from_email}>"
        msg['To'] = test_to_email
        
        body = """
Hello!

This is a test email from Smart Quizzer AI.

If you received this email, your email configuration is working correctly!

🎉 Your forgot password feature will now send real emails.

Best regards,
Smart Quizzer AI Team
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(from_email, password)
            server.send_message(msg)
        
        print("✅ Test email sent successfully!")
        
        # Update .env file
        env_path = os.path.join(os.path.dirname(__file__), '.env')
        
        print(f"\n📝 Updating .env file...")
        
        # Read current .env
        if os.path.exists(env_path):
            with open(env_path, 'r') as f:
                lines = f.readlines()
        else:
            lines = []
        
        # Update email settings
        email_settings = {
            'SMTP_SERVER': smtp_server,
            'SMTP_PORT': str(smtp_port),
            'SMTP_USERNAME': from_email,
            'SMTP_PASSWORD': password,
            'FROM_EMAIL': from_email,
            'FROM_NAME': 'Smart Quizzer AI'
        }
        
        # Update or add email settings
        updated_lines = []
        settings_found = set()
        
        for line in lines:
            line_updated = False
            for setting, value in email_settings.items():
                if line.strip().startswith(f"{setting}="):
                    updated_lines.append(f"{setting}={value}\n")
                    settings_found.add(setting)
                    line_updated = True
                    break
            
            if not line_updated:
                updated_lines.append(line)
        
        # Add missing settings
        for setting, value in email_settings.items():
            if setting not in settings_found:
                updated_lines.append(f"{setting}={value}\n")
        
        # Write updated .env
        with open(env_path, 'w') as f:
            f.writelines(updated_lines)
        
        print("✅ .env file updated successfully!")
        print("\n🚀 Next steps:")
        print("1. Restart the backend server (Ctrl+C then python app.py)")
        print("2. Test forgot password feature")
        print("3. Check your email inbox for reset emails")
        
        return True
        
    except Exception as e:
        print(f"❌ Email test failed: {str(e)}")
        print("\n🔧 Common issues:")
        print("- Wrong username/password")
        print("- Need App Password for Gmail/Yahoo")
        print("- 2-Step Verification not enabled")
        print("- SMTP server/port incorrect")
        print("- Firewall blocking SMTP")
        
        return False

if __name__ == "__main__":
    print("Starting email configuration test...\n")
    success = test_email_config()
    
    if not success:
        print("\n❌ Email configuration failed.")
        print("💡 You can still use demo mode by leaving SMTP settings empty.")
    
    input("\nPress Enter to continue...")