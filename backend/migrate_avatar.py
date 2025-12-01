"""
Migration script to add avatar_url column to users table
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
    print("AVATAR SUPPORT MIGRATION")
    print("=" * 60)
    
    # Check current users table columns
    cursor.execute("PRAGMA table_info(users)")
    columns = [column[1] for column in cursor.fetchall()]
    
    print("\nCurrent columns in users table:")
    for col in columns:
        print(f"  - {col}")
    
    # Add avatar_url column if it doesn't exist
    if "avatar_url" not in columns:
        print("\n🖼️  Adding avatar_url column to users table...")
        cursor.execute("ALTER TABLE users ADD COLUMN avatar_url VARCHAR(255)")
        conn.commit()
        print("✅ Column avatar_url added successfully!")
    else:
        print("\n✓ Column avatar_url already exists")
    
    # Verify users table
    cursor.execute("PRAGMA table_info(users)")
    new_columns = [column[1] for column in cursor.fetchall()]
    
    print("\n" + "=" * 60)
    print("MIGRATION COMPLETE")
    print("=" * 60)
    print("\nUpdated columns in users table:")
    for col in new_columns:
        print(f"  - {col}")
    
    # Create avatars directory
    avatars_dir = os.path.join(os.path.dirname(__file__), "uploads", "avatars")
    os.makedirs(avatars_dir, exist_ok=True)
    print(f"\n📁 Avatars directory created: {avatars_dir}")
    
    conn.close()
    
    print("\n" + "=" * 60)
    print("🎉 Database migration successful!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Restart the backend server")
    print("2. Users can now upload profile pictures")
    print("3. Avatars will be stored in backend/uploads/avatars/")
    print("4. Maximum file size: 16MB")
    print("5. Allowed formats: PNG, JPG, JPEG, GIF, WEBP")
    print("=" * 60)
    
except Exception as e:
    print(f"❌ Error during migration: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
