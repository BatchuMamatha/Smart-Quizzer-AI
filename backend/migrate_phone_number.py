"""
Migration script to add phone_number column to users table
"""
import sqlite3
import sys
import os

# Path to database
db_path = os.path.join(os.path.dirname(__file__), "instance", "smart_quizzer.db")

try:
    # Connect to database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if column already exists
    cursor.execute("PRAGMA table_info(users)")
    columns = [column[1] for column in cursor.fetchall()]
    
    print("Current columns in users table:")
    for col in columns:
        print(f"  - {col}")
    
    # Add phone_number column if it doesn't exist
    if "phone_number" not in columns:
        print("\n📱 Adding phone_number column...")
        cursor.execute("ALTER TABLE users ADD COLUMN phone_number VARCHAR(20)")
        conn.commit()
        print("✅ Column phone_number added successfully!")
    else:
        print("\n✓ Column phone_number already exists")
    
    # Verify
    cursor.execute("PRAGMA table_info(users)")
    new_columns = [column[1] for column in cursor.fetchall()]
    
    print("\n✅ Migration complete!")
    print("Updated columns in users table:")
    for col in new_columns:
        print(f"  - {col}")
    
    conn.close()
    print("\n🎉 Database migration successful! You can now restart the backend server.")
    
except Exception as e:
    print(f"❌ Error during migration: {e}")
    sys.exit(1)
