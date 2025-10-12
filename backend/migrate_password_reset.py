#!/usr/bin/env python3
"""
Database Migration Script for Password Reset Feature
Adds reset_token and reset_token_expires fields to User table
"""

import sqlite3
import os
from datetime import datetime

def migrate_database():
    """Add password reset fields to User table"""
    
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
        
        # Check if fields already exist
        cursor.execute("PRAGMA table_info(users)")
        columns = [column[1] for column in cursor.fetchall()]
        
        fields_to_add = []
        if 'reset_token' not in columns:
            fields_to_add.append('reset_token')
        if 'reset_token_expires' not in columns:
            fields_to_add.append('reset_token_expires')
        
        if not fields_to_add:
            print("✅ Password reset fields already exist in database")
            return True
        
        # Add missing fields
        for field in fields_to_add:
            if field == 'reset_token':
                cursor.execute("ALTER TABLE users ADD COLUMN reset_token TEXT")
                print("✅ Added reset_token field to users table")
            elif field == 'reset_token_expires':
                cursor.execute("ALTER TABLE users ADD COLUMN reset_token_expires DATETIME")
                print("✅ Added reset_token_expires field to users table")
        
        # Commit changes
        conn.commit()
        conn.close()
        
        print(f"🎉 Database migration completed successfully!")
        print(f"📅 Migration completed at: {datetime.now()}")
        return True
        
    except Exception as e:
        print(f"❌ Migration failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Starting database migration for password reset feature...")
    success = migrate_database()
    
    if success:
        print("\n✅ Migration completed! You can now use the forgot password feature.")
        print("💡 Restart the Flask application to ensure all changes take effect.")
    else:
        print("\n❌ Migration failed. Please check the error messages above.")