#!/usr/bin/env python3
"""
Database migration script to add countdown timer fields to QuizSession table.
Run this script to update the existing database with timer support.
"""

import os
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from app import app, db
from models import QuizSession
from sqlalchemy import text, inspect

def add_timer_columns():
    """Add timer-related columns to QuizSession table"""
    
    with app.app_context():
        # Get database inspector
        inspector = inspect(db.engine)
        
        # Get existing columns in quiz_sessions table
        existing_columns = [col['name'] for col in inspector.get_columns('quiz_sessions')]
        
        print("✓ Existing columns in quiz_sessions table:")
        for col in existing_columns:
            print(f"  - {col}")
        
        # Check which timer columns are missing
        timer_columns = {
            'time_limit_seconds': 'INTEGER',
            'time_started': 'DATETIME',
            'time_paused_at': 'DATETIME',
            'total_paused_seconds': 'INTEGER'
        }
        
        columns_to_add = {col: dtype for col, dtype in timer_columns.items() if col not in existing_columns}
        
        if not columns_to_add:
            print("\n✓ All timer columns already exist in database!")
            return True
        
        print(f"\n⏱️ Found {len(columns_to_add)} timer columns to add:")
        for col_name, col_type in columns_to_add.items():
            print(f"  - {col_name} ({col_type})")
        
        try:
            with db.engine.begin() as connection:
                for col_name, col_type in columns_to_add.items():
                    # SQLite specific SQL for adding nullable columns
                    if col_type == 'DATETIME':
                        sql = f"ALTER TABLE quiz_sessions ADD COLUMN {col_name} DATETIME NULL"
                    else:  # INTEGER
                        sql = f"ALTER TABLE quiz_sessions ADD COLUMN {col_name} INTEGER DEFAULT 0"
                    
                    print(f"\n  Executing: {sql}")
                    connection.execute(text(sql))
            
            print("\n✅ Successfully added all timer columns!")
            print("\n✓ Database migration completed successfully!")
            print("  You can now use the countdown timer feature in the quiz interface.")
            return True
            
        except Exception as e:
            print(f"\n❌ Error adding timer columns: {e}")
            print("\nNote: If you get 'duplicate column name' errors, the columns may already exist.")
            print("Check the database schema manually if needed.")
            return False

def verify_timer_fields():
    """Verify that timer fields are properly configured"""
    
    with app.app_context():
        try:
            # Try to query a session with timer fields
            session = QuizSession.query.first()
            if session:
                print("\n✓ QuizSession timer fields are accessible:")
                print(f"  - time_limit_seconds: {session.time_limit_seconds}")
                print(f"  - time_started: {session.time_started}")
                print(f"  - time_paused_at: {session.time_paused_at}")
                print(f"  - total_paused_seconds: {session.total_paused_seconds}")
                
                # Check if methods are available
                print("\n✓ QuizSession timer methods are available:")
                print(f"  - get_remaining_time_seconds: {hasattr(session, 'get_remaining_time_seconds')}")
                print(f"  - is_timer_expired: {hasattr(session, 'is_timer_expired')}")
                print(f"  - pause_timer: {hasattr(session, 'pause_timer')}")
                print(f"  - resume_timer: {hasattr(session, 'resume_timer')}")
        except Exception as e:
            print(f"\n⚠️ Could not verify timer fields: {e}")

if __name__ == '__main__':
    print("=" * 60)
    print("🕐 Smart Quizzer - Countdown Timer Database Migration")
    print("=" * 60)
    
    success = add_timer_columns()
    
    if success:
        verify_timer_fields()
        print("\n" + "=" * 60)
        print("✅ Database migration completed!")
        print("=" * 60)
        sys.exit(0)
    else:
        print("\n" + "=" * 60)
        print("❌ Database migration failed!")
        print("=" * 60)
        sys.exit(1)
