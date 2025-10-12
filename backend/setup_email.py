#!/usr/bin/env python3
"""
Quick Email Setup for Smart Quizzer AI
This script helps you quickly configure email settings
"""

import os

def setup_email():
    """Interactive email setup"""
    
    print("🔧 Smart Quizzer AI - Quick Email Setup")
    print("=" * 40)
    
    print("\n📧 To send real emails, you need:")
    print("1. An email address (Gmail recommended)")
    print("2. App Password (for Gmail) or regular password (for others)")
    
    email = input("\nEnter your email address: ").strip()
    password = input("Enter your password/app password: ").strip()
    
    if not email or not password:
        print("❌ Email and password are required!")
        return False
    
    # Determine SMTP settings based on email domain
    domain = email.split('@')[1].lower()
    
    if 'gmail' in domain:
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        print("\n📝 Gmail detected. Make sure you're using an App Password!")
        print("   Go to: Google Account > Security > App passwords")
    elif 'outlook' in domain or 'hotmail' in domain or 'live' in domain:
        smtp_server = 'smtp-mail.outlook.com'
        smtp_port = 587
    elif 'yahoo' in domain:
        smtp_server = 'smtp.mail.yahoo.com'
        smtp_port = 587
        print("\n📝 Yahoo detected. Make sure you're using an App Password!")
    else:
        print(f"\n❓ Unknown email provider: {domain}")
        smtp_server = input("Enter SMTP server: ").strip()
        smtp_port = int(input("Enter SMTP port (usually 587): ").strip() or "587")
    
    # Read current .env file
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            content = f.read()
    else:
        content = ""
    
    # Update email settings
    email_config = f"""
# Email Configuration - Updated by setup script
SMTP_SERVER={smtp_server}
SMTP_PORT={smtp_port}
SMTP_USERNAME={email}
SMTP_PASSWORD={password}
FROM_EMAIL={email}
FROM_NAME=Smart Quizzer AI
"""
    
    # Remove old email config
    lines = content.split('\n')
    new_lines = []
    skip_next = False
    
    for line in lines:
        if any(line.strip().startswith(key) for key in ['SMTP_SERVER', 'SMTP_PORT', 'SMTP_USERNAME', 'SMTP_PASSWORD', 'FROM_EMAIL', 'FROM_NAME']):
            continue
        new_lines.append(line)
    
    # Add new email config
    new_content = '\n'.join(new_lines) + email_config
    
    # Write back to .env
    with open(env_path, 'w') as f:
        f.write(new_content)
    
    print(f"\n✅ Email configuration saved to .env file!")
    print(f"📧 From: {email}")
    print(f"🌐 SMTP: {smtp_server}:{smtp_port}")
    
    print(f"\n🚀 Next steps:")
    print("1. Restart the backend server")
    print("2. Test the forgot password feature")
    print("3. Check your email inbox")
    
    return True

if __name__ == "__main__":
    try:
        setup_email()
    except KeyboardInterrupt:
        print("\n\n❌ Setup cancelled by user")
    except Exception as e:
        print(f"\n❌ Setup failed: {e}")
    
    input("\nPress Enter to continue...")