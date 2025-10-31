"""
Database Initialization Script for Smart Quizzer AI
This script creates the database and adds default test users.
Run this after cloning the repository.
"""

import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

try:
    from app import app, db
    from models import User, Topic
except ImportError as e:
    print('\n' + '='*80)
    print('❌ ERROR: Could not import required modules')
    print('='*80)
    print(f'\nError: {str(e)}')
    print('\n💡 SOLUTION:')
    print('   1. Make sure you are in the project root directory')
    print('   2. Install backend dependencies:')
    print('      cd backend')
    print('      pip install -r requirements.txt')
    print('   3. Run this script again from the root directory:')
    print('      python init_database.py')
    print('\n' + '='*80 + '\n')
    sys.exit(1)

def init_database():
    """Initialize database with default data"""
    
    with app.app_context():
        print('\n' + '='*80)
        print('SMART QUIZZER AI - DATABASE INITIALIZATION')
        print('='*80)
        
        # Create all tables
        print('\n📦 Creating database tables...')
        db.create_all()
        print('✅ Database tables created successfully!')
        
        # Check if users already exist
        existing_users = User.query.count()
        if existing_users > 0:
            print(f'\n⚠️  Database already has {existing_users} users.')
            response = input('Do you want to reset and add default users? (yes/no): ')
            if response.lower() != 'yes':
                print('❌ Initialization cancelled.')
                return
            
            # Clear existing users
            User.query.delete()
            db.session.commit()
            print('🗑️  Cleared existing users.')
        
        # Create default users
        print('\n👥 Creating default test users...')
        
        default_users = [
            {
                'username': 'admin',
                'email': 'admin@smartquizzer.com',
                'password': 'admin123',
                'full_name': 'Admin User',
                'skill_level': 'Advanced',
                'role': 'admin'
            },
            {
                'username': 'alice',
                'email': 'alice@example.com',
                'password': 'password123',
                'full_name': 'Alice Johnson',
                'skill_level': 'Beginner',
                'role': 'user'
            },
            {
                'username': 'john',
                'email': 'john@example.com',
                'password': 'password123',
                'full_name': 'John Doe',
                'skill_level': 'Intermediate',
                'role': 'user'
            },
            {
                'username': 'demo',
                'email': 'demo@smartquizzer.com',
                'password': 'demo123',
                'full_name': 'Demo User',
                'skill_level': 'Intermediate',
                'role': 'user'
            }
        ]
        
        created_users = []
        
        for user_data in default_users:
            try:
                user = User(
                    username=user_data['username'],
                    email=user_data['email'],
                    full_name=user_data['full_name'],
                    skill_level=user_data['skill_level'],
                    role=user_data['role']
                )
                user.set_password(user_data['password'])
                db.session.add(user)
                db.session.commit()
                
                created_users.append({
                    'username': user_data['username'],
                    'password': user_data['password'],
                    'email': user_data['email'],
                    'role': user_data['role']
                })
                
                print(f'   ✅ Created: {user_data["username"]} ({user_data["role"]})')
                
            except Exception as e:
                print(f'   ❌ Failed to create {user_data["username"]}: {str(e)}')
                db.session.rollback()
        
        # Check if topics exist
        existing_topics = Topic.query.count()
        if existing_topics == 0:
            print('\n📚 Creating default topics...')
            
            default_topics = [
                {'name': 'Mathematics', 'description': 'Mathematical concepts and problems', 'category': 'STEM'},
                {'name': 'Science', 'description': 'Scientific principles and discoveries', 'category': 'STEM'},
                {'name': 'History', 'description': 'Historical events and civilizations', 'category': 'Humanities'},
                {'name': 'Computer Science', 'description': 'Programming and computing concepts', 'category': 'STEM'},
                {'name': 'Physics', 'description': 'Physical laws and phenomena', 'category': 'STEM'},
                {'name': 'Chemistry', 'description': 'Chemical reactions and properties', 'category': 'STEM'},
                {'name': 'Biology', 'description': 'Living organisms and life processes', 'category': 'STEM'},
                {'name': 'Literature', 'description': 'Literary works and analysis', 'category': 'Humanities'},
                {'name': 'Geography', 'description': 'Physical and human geography', 'category': 'Social Studies'},
                {'name': 'Economics', 'description': 'Economic principles and theories', 'category': 'Social Studies'}
            ]
            
            for topic_data in default_topics:
                try:
                    topic = Topic(**topic_data, is_active=True)
                    db.session.add(topic)
                    print(f'   ✅ Created topic: {topic_data["name"]}')
                except Exception as e:
                    print(f'   ❌ Failed to create topic {topic_data["name"]}: {str(e)}')
            
            db.session.commit()
        else:
            print(f'\n📚 Topics already exist ({existing_topics} topics found)')
        
        # Display credentials
        print('\n' + '='*80)
        print('DATABASE INITIALIZATION COMPLETE!')
        print('='*80)
        
        if created_users:
            print('\n📋 DEFAULT USER CREDENTIALS:')
            print('-'*80)
            print(f'{"USERNAME":<15} {"PASSWORD":<15} {"EMAIL":<30} {"ROLE":<10}')
            print('-'*80)
            for user in created_users:
                print(f'{user["username"]:<15} {user["password"]:<15} {user["email"]:<30} {user["role"]:<10}')
            print('-'*80)
        
        print('\n✅ You can now:')
        print('   1. Start the backend: cd backend && python app.py')
        print('   2. Start the frontend: cd frontend && npm start')
        print('   3. Login with any of the credentials above')
        print('   4. Or register a new user at http://localhost:3000/register')
        print('\n' + '='*80)
        
        # Verify users were created correctly
        print('\n🔍 VERIFICATION: Testing user credentials...')
        print('-'*80)
        
        verification_passed = True
        for user_data in default_users:
            test_user = User.query.filter_by(username=user_data['username']).first()
            if test_user and test_user.check_password(user_data['password']):
                print(f'   ✅ {user_data["username"]}: Login will work')
            else:
                print(f'   ❌ {user_data["username"]}: Login may FAIL')
                verification_passed = False
        
        if verification_passed:
            print('\n✅ ALL CREDENTIALS VERIFIED - Login should work!')
        else:
            print('\n⚠️  WARNING: Some credentials may not work. Try re-running this script.')
        
        print('\n' + '='*80 + '\n')

if __name__ == '__main__':
    try:
        init_database()
    except Exception as e:
        print(f'\n❌ ERROR: {str(e)}')
        import traceback
        traceback.print_exc()
        sys.exit(1)
