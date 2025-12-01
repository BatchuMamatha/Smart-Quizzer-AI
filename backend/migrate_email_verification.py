"""
Migration script to add email verification support
- Adds email_verified column to users table
- Creates email_verification_tokens table
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
    
    print("=" * 60)
    print("EMAIL VERIFICATION MIGRATION")
    print("=" * 60)
    
    # Check current users table columns
    cursor.execute("PRAGMA table_info(users)")
    columns = [column[1] for column in cursor.fetchall()]
    
    print("\nCurrent columns in users table:")
    for col in columns:
        print(f"  - {col}")
    
    # Add email_verified column if it doesn't exist
    if "email_verified" not in columns:
        print("\n📧 Adding email_verified column to users table...")
        cursor.execute("ALTER TABLE users ADD COLUMN email_verified BOOLEAN NOT NULL DEFAULT 0")
        conn.commit()
        print("✅ Column email_verified added successfully!")
    else:
        print("\n✓ Column email_verified already exists")
    
    # Check if email_verification_tokens table exists
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='email_verification_tokens'")
    table_exists = cursor.fetchone() is not None
    
    if not table_exists:
        print("\n🔐 Creating email_verification_tokens table...")
        cursor.execute("""
            CREATE TABLE email_verification_tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                token VARCHAR(100) NOT NULL UNIQUE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                expires_at DATETIME NOT NULL,
                used BOOLEAN DEFAULT 0,
                used_at DATETIME,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
        """)
        conn.commit()
        print("✅ Table email_verification_tokens created successfully!")
    else:
        print("\n✓ Table email_verification_tokens already exists")
    
    # Verify users table
    cursor.execute("PRAGMA table_info(users)")
    new_columns = [column[1] for column in cursor.fetchall()]
    
    print("\n" + "=" * 60)
    print("MIGRATION COMPLETE")
    print("=" * 60)
    print("\nUpdated columns in users table:")
    for col in new_columns:
        print(f"  - {col}")
    
    # Verify email_verification_tokens table
    cursor.execute("PRAGMA table_info(email_verification_tokens)")
    token_columns = [column[1] for column in cursor.fetchall()]
    
    print("\nColumns in email_verification_tokens table:")
    for col in token_columns:
        print(f"  - {col}")
    
    conn.close()
    
    print("\n" + "=" * 60)
    print("🎉 Database migration successful!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Restart the backend server")
    print("2. New users will receive verification emails on registration")
    print("3. Existing users have email_verified=False by default")
    print("4. You can manually update existing users if needed:")
    print("   UPDATE users SET email_verified=1 WHERE email='user@example.com';")
    print("=" * 60)
    
except Exception as e:
    print(f"❌ Error during migration: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
