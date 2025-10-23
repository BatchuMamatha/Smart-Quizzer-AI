"""
Migration script to add role column to users table
Run this script to update the database schema
"""

from app import app, db
from models import User

def add_role_column():
    """Add role column to users table and set admin role for admin user"""
    with app.app_context():
        try:
            # Add the role column if it doesn't exist
            with db.engine.connect() as conn:
                # Check if column exists
                result = conn.execute(db.text("PRAGMA table_info(users)"))
                columns = [row[1] for row in result]
                
                if 'role' not in columns:
                    print("Adding 'role' column to users table...")
                    conn.execute(db.text("ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'user'"))
                    conn.commit()
                    print("✅ Column 'role' added successfully!")
                else:
                    print("⚠️ Column 'role' already exists")
                
                # Update admin user role
                print("Updating admin user role...")
                conn.execute(db.text("UPDATE users SET role = 'admin' WHERE username = 'admin'"))
                conn.commit()
                print("✅ Admin user role updated!")
                
                # Verify the change
                result = conn.execute(db.text("SELECT username, role FROM users"))
                users = result.fetchall()
                print("\nCurrent users and roles:")
                for user in users:
                    print(f"  - {user[0]}: {user[1]}")
                
        except Exception as e:
            print(f"❌ Error: {e}")
            db.session.rollback()

if __name__ == '__main__':
    print("🔄 Starting database migration...")
    add_role_column()
    print("✅ Migration completed!")
