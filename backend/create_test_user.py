#!/usr/bin/env python3
"""
Create Test User Script
Creates a test user account for testing password reset functionality
"""

import sqlite3
import os
import bcrypt
from datetime import datetime

def create_test_user():
    """Create a test user account"""
    
    # Test user data
    test_users = [
        {
            'username': 'testuser',
            'email': 'riyademo316@gmail.com',  # Use the email you tried to reset
            'password': 'password123',
            'full_name': 'Test User',
            'skill_level': 'Intermediate'
        },
        {
            'username': 'demouser',
            'email': 'demo@smartquizzer.com',
            'password': 'demo123',
            'full_name': 'Demo User',
            'skill_level': 'Beginner'
        }
    ]
    
    # Path to the database
    db_path = os.path.join(os.path.dirname(__file__), 'instance', 'smart_quizzer.db')
    
    # Check if database exists
    if not os.path.exists(db_path):
        print(f"❌ Database not found at {db_path}")
        print("🔧 Please start the Flask app first to create the database")
        return False
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        for user_data in test_users:
            # Check if user already exists
            cursor.execute("SELECT id FROM users WHERE email = ? OR username = ?", 
                          (user_data['email'], user_data['username']))
            
            if cursor.fetchone():
                print(f"⚠️ User {user_data['username']} ({user_data['email']}) already exists")
                continue
            
            # Hash password
            password_hash = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            
            # Insert user
            cursor.execute("""
                INSERT INTO users (username, email, password_hash, full_name, skill_level, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                user_data['username'],
                user_data['email'],
                password_hash,
                user_data['full_name'],
                user_data['skill_level'],
                datetime.utcnow(),
                datetime.utcnow()
            ))
            
            print(f"✅ Created test user: {user_data['username']} ({user_data['email']})")
            print(f"   Password: {user_data['password']}")
        
        # Commit changes
        conn.commit()
        conn.close()
        
        print(f"\n🎉 Test users created successfully!")
        print(f"📧 You can now test forgot password with:")
        for user_data in test_users:
            print(f"   Email: {user_data['email']}")
        
        return True
        
    except Exception as e:
        print(f"❌ Failed to create test users: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Creating test users for password reset testing...")
    success = create_test_user()
    
    if success:
        print("\n✅ Test users ready! Now you can:")
        print("1. Try forgot password with riyademo316@gmail.com")
        print("2. Check backend console for the reset link (demo mode)")
        print("3. Copy the reset link and paste in browser")
        print("4. Test the complete password reset flow")
    else:
        print("\n❌ Failed to create test users. Please check the error messages above.")