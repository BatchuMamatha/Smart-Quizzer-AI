#!/usr/bin/env python3
"""
Database Migration Script for Smart Quizzer AI
Adds the evaluation_metadata column to the questions table
"""

import sqlite3
import os

def migrate_database():
    """Add evaluation_metadata column to questions table"""
    
    # Database path (check both locations)
    possible_paths = [
        'smart_quizzer.db',
        'instance/smart_quizzer.db'
    ]
    
    db_path = None
    for path in possible_paths:
        if os.path.exists(path):
            db_path = path
            break
    
    if not db_path:
        print("⚠️ Database file not found. This might be the first run.")
        print("🔄 The database will be created automatically when the Flask app starts.")
        print("💡 Please start the Flask application first to create the database schema.")
        return False
    
    print(f"📂 Using database: {db_path}")
    
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if evaluation_metadata column exists
        cursor.execute("PRAGMA table_info(questions)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'evaluation_metadata' in columns:
            print("✅ evaluation_metadata column already exists in questions table")
            conn.close()
            return True
        
        # Add the evaluation_metadata column
        print("🔄 Adding evaluation_metadata column to questions table...")
        cursor.execute("""
            ALTER TABLE questions 
            ADD COLUMN evaluation_metadata TEXT;
        """)
        
        # Commit changes
        conn.commit()
        print("✅ Successfully added evaluation_metadata column to questions table")
        
        # Verify the column was added
        cursor.execute("PRAGMA table_info(questions)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'evaluation_metadata' in columns:
            print("✅ Column verification successful")
        else:
            print("❌ Column verification failed")
            return False
            
        conn.close()
        return True
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Starting database migration...")
    success = migrate_database()
    
    if success:
        print("\n🎉 Database migration completed successfully!")
        print("📋 Changes made:")
        print("   - Added evaluation_metadata column to questions table")
        print("   - Column type: TEXT (stores JSON evaluation data)")
        print("\n✅ You can now restart the application")
    else:
        print("\n❌ Database migration failed!")
        print("🔧 Please check the error messages above and try again")