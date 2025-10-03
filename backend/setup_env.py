#!/usr/bin/env python3
"""
Smart Quizzer AI - Environment Setup Script
This script helps you set up the required environment variables.
"""

import os
import secrets
import sys

def generate_secret_key():
    """Generate a secure secret key for Flask"""
    return secrets.token_urlsafe(32)

def create_env_file():
    """Create .env file with user input"""
    env_file_path = os.path.join(os.path.dirname(__file__), '.env')
    
    print("🔧 Smart Quizzer AI - Environment Setup")
    print("=" * 50)
    
    # Check if .env already exists
    if os.path.exists(env_file_path):
        response = input("⚠️ .env file already exists. Overwrite? (y/N): ")
        if response.lower() != 'y':
            print("❌ Setup cancelled.")
            return False
    
    # Get Gemini API key
    print("\n🤖 Google Gemini AI Setup:")
    print("Get your API key from: https://makersuite.google.com/app/apikey")
    gemini_api_key = input("Enter your Gemini API key: ").strip()
    
    if not gemini_api_key:
        print("❌ Gemini API key is required!")
        return False
    
    # Generate secret key
    secret_key = generate_secret_key()
    print(f"\n🔐 Generated secure Flask secret key: {secret_key[:16]}...")
    
    # Create .env content
    env_content = f"""# Smart Quizzer AI Environment Variables
# Generated on {os.getcwd()}

# Google Gemini AI API Key
GEMINI_API_KEY={gemini_api_key}

# Flask Secret Key (keep this secure!)
SECRET_KEY={secret_key}

# Database URL (SQLite by default)
DATABASE_URL=sqlite:///smart_quizzer.db

# Development Mode
FLASK_ENV=development
"""
    
    # Write .env file
    try:
        with open(env_file_path, 'w') as f:
            f.write(env_content)
        
        print(f"\n✅ Environment file created: {env_file_path}")
        print("\n🚀 Setup complete! You can now run:")
        print("   python app.py")
        print("\n⚠️ IMPORTANT: Never commit your .env file to version control!")
        
        return True
        
    except Exception as e:
        print(f"❌ Error creating .env file: {e}")
        return False

def main():
    """Main setup function"""
    if create_env_file():
        print("\n🎉 Smart Quizzer AI is ready to go!")
    else:
        print("\n💥 Setup failed. Please try again.")
        sys.exit(1)

if __name__ == "__main__":
    main()