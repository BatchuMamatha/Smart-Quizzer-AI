"""
Simple migration script to add timer columns to quiz_sessions table
"""
import sqlite3
import sys

# Path to database
db_path = r"C:\Users\batch_mhuyvs9\Smart-Quizzer-AI\backend\instance\smart_quizzer.db"

try:
    # Connect to database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if columns already exist
    cursor.execute("PRAGMA table_info(quiz_sessions)")
    columns = [column[1] for column in cursor.fetchall()]
    
    print("Current columns in quiz_sessions:")
    for col in columns:
        print(f"  - {col}")
    
    # Add missing columns
    columns_to_add = [
        ("time_limit_seconds", "INTEGER"),
        ("time_started", "DATETIME"),
        ("time_paused_at", "DATETIME"),
        ("total_paused_seconds", "INTEGER")
    ]
    
    for col_name, col_type in columns_to_add:
        if col_name not in columns:
            print(f"\nAdding column: {col_name} ({col_type})")
            if col_type == "INTEGER":
                cursor.execute(f"ALTER TABLE quiz_sessions ADD COLUMN {col_name} {col_type} DEFAULT 0")
            else:
                cursor.execute(f"ALTER TABLE quiz_sessions ADD COLUMN {col_name} {col_type}")
            print(f"✅ Column {col_name} added")
        else:
            print(f"✓ Column {col_name} already exists")
    
    # Commit changes
    conn.commit()
    
    # Verify
    cursor.execute("PRAGMA table_info(quiz_sessions)")
    new_columns = [column[1] for column in cursor.fetchall()]
    
    print("\n✅ Migration complete!")
    print("Updated columns in quiz_sessions:")
    for col in new_columns:
        print(f"  - {col}")
    
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
