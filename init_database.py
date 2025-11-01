"""
Database Initialization Script for Smart Quizzer AI
This script creates the database and adds default test users with realistic quiz history.
Run this after cloning the repository.
"""

import sys
import os
from datetime import datetime, timedelta
import random
import json

# Add backend directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

try:
    from app import app, db
    from models import User, Topic, QuizSession, Question
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

def create_quiz_history(users, topics):
    """Create realistic quiz history for all users"""
    print('\n📊 Creating realistic quiz history...')
    
    # Quiz templates with varied difficulty and performance patterns
    quiz_templates = [
        # Beginner-friendly topics
        {'topic': 'Mathematics', 'difficulties': ['Beginner', 'Intermediate'], 'avg_score': 65},
        {'topic': 'Science', 'difficulties': ['Beginner', 'Intermediate'], 'avg_score': 70},
        {'topic': 'Computer Science', 'difficulties': ['Beginner', 'Intermediate', 'Advanced'], 'avg_score': 60},
        {'topic': 'Geography', 'difficulties': ['Beginner', 'Intermediate'], 'avg_score': 75},
        {'topic': 'History', 'difficulties': ['Beginner', 'Intermediate', 'Advanced'], 'avg_score': 68},
        {'topic': 'Physics', 'difficulties': ['Beginner', 'Intermediate', 'Advanced'], 'avg_score': 62},
        {'topic': 'Chemistry', 'difficulties': ['Beginner', 'Intermediate'], 'avg_score': 67},
        {'topic': 'Biology', 'difficulties': ['Beginner', 'Intermediate', 'Advanced'], 'avg_score': 72},
        {'topic': 'Literature', 'difficulties': ['Beginner', 'Intermediate'], 'avg_score': 73},
        {'topic': 'Economics', 'difficulties': ['Intermediate', 'Advanced'], 'avg_score': 65}
    ]
    
    question_types = ['MCQ', 'True/False', 'Short Answer']
    
    total_quizzes_created = 0
    total_questions_created = 0
    
    for user in users:
        # Determine quiz count based on user skill level
        if user.skill_level == 'Beginner':
            quiz_count = random.randint(5, 12)  # 5-12 quizzes
            performance_multiplier = 0.85  # Slightly lower scores
        elif user.skill_level == 'Intermediate':
            quiz_count = random.randint(10, 20)  # 10-20 quizzes
            performance_multiplier = 1.0  # Average scores
        else:  # Advanced
            quiz_count = random.randint(15, 30)  # 15-30 quizzes
            performance_multiplier = 1.15  # Higher scores
        
        # Create quizzes over the past 60 days
        for i in range(quiz_count):
            # Pick a random topic
            template = random.choice(quiz_templates)
            topic_name = template['topic']
            
            # Select difficulty appropriate for user
            if user.skill_level == 'Beginner':
                difficulty = random.choice(['Beginner', 'Beginner', 'Intermediate'])  # More beginner
            elif user.skill_level == 'Intermediate':
                difficulty = random.choice(['Beginner', 'Intermediate', 'Intermediate', 'Advanced'])
            else:  # Advanced
                difficulty = random.choice(['Intermediate', 'Advanced', 'Advanced'])
            
            # Random date within last 60 days
            days_ago = random.randint(1, 60)
            started_at = datetime.now() - timedelta(days=days_ago, hours=random.randint(0, 23), minutes=random.randint(0, 59))
            
            # Quiz duration (5-30 minutes)
            quiz_duration = random.randint(5, 30)
            completed_at = started_at + timedelta(minutes=quiz_duration)
            
            # Number of questions (5-15)
            total_questions = random.randint(5, 15)
            
            # Calculate score with some randomness
            base_score = template['avg_score']
            score_variance = random.randint(-15, 20)
            target_score = max(30, min(100, int(base_score * performance_multiplier + score_variance)))
            
            correct_answers = int((target_score / 100.0) * total_questions)
            score_percentage = (correct_answers / total_questions) * 100 if total_questions > 0 else 0
            
            # Create quiz session
            quiz_session = QuizSession(
                user_id=user.id,
                topic=topic_name,
                custom_topic=None,
                skill_level=difficulty,
                total_questions=total_questions,
                completed_questions=total_questions,
                correct_answers=correct_answers,
                score_percentage=round(score_percentage, 1),
                status='completed',
                started_at=started_at,
                completed_at=completed_at
            )
            db.session.add(quiz_session)
            db.session.flush()  # Get quiz_session.id
            
            # Create questions for this quiz
            for q_num in range(total_questions):
                # Determine if this question was answered correctly
                is_correct = q_num < correct_answers
                
                # Random question type
                q_type = random.choice(question_types)
                
                # Generate sample options for MCQ
                if q_type == 'MCQ':
                    options = [f'Option {chr(65+j)}' for j in range(4)]
                    correct_answer = random.choice(options)
                    user_answer = correct_answer if is_correct else random.choice([opt for opt in options if opt != correct_answer])
                elif q_type == 'True/False':
                    options = ['True', 'False']
                    correct_answer = random.choice(options)
                    user_answer = correct_answer if is_correct else ('False' if correct_answer == 'True' else 'True')
                else:  # Short Answer
                    options = []
                    correct_answer = 'Sample correct answer'
                    user_answer = correct_answer if is_correct else 'Sample incorrect answer'
                
                # Time taken per question (30 sec - 3 min)
                time_taken = random.randint(30, 180)
                answered_at = started_at + timedelta(seconds=sum([random.randint(30, 180) for _ in range(q_num + 1)]))
                
                # Difficulty levels for questions
                q_difficulty_levels = ['Easy', 'Medium', 'Hard', 'Expert']
                if difficulty == 'Beginner':
                    q_difficulty = random.choice(['Easy', 'Easy', 'Medium'])
                elif difficulty == 'Intermediate':
                    q_difficulty = random.choice(['Easy', 'Medium', 'Medium', 'Hard'])
                else:
                    q_difficulty = random.choice(['Medium', 'Hard', 'Hard', 'Expert'])
                
                question = Question(
                    quiz_session_id=quiz_session.id,
                    question_text=f'{topic_name} question {q_num + 1} ({q_difficulty})',
                    question_type=q_type,
                    options=json.dumps(options) if options else None,
                    correct_answer=correct_answer,
                    user_answer=user_answer,
                    is_correct=is_correct,
                    explanation=f'Explanation for {topic_name} question {q_num + 1}',
                    difficulty_level=q_difficulty,
                    answered_at=answered_at,
                    time_taken=time_taken
                )
                db.session.add(question)
                total_questions_created += 1
            
            total_quizzes_created += 1
    
    db.session.commit()
    print(f'   ✅ Created {total_quizzes_created} quiz sessions')
    print(f'   ✅ Created {total_questions_created} questions')
    print(f'   📈 Average: {total_quizzes_created // len(users)} quizzes per user')
    
    return total_quizzes_created, total_questions_created

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
            # Admin accounts (5 total)
            {
                'username': 'ravi',
                'email': 'ravi.kumar@smartquizzer.com',
                'password': 'Admin@123',
                'full_name': 'Ravi Kumar',
                'skill_level': 'Advanced',
                'role': 'admin'
            },
            {
                'username': 'sneha',
                'email': 'sneha.reddy@smartquizzer.com',
                'password': 'Admin@123',
                'full_name': 'Sneha Reddy',
                'skill_level': 'Advanced',
                'role': 'admin'
            },
            {
                'username': 'arjun',
                'email': 'arjun.mehta@smartquizzer.com',
                'password': 'Admin@123',
                'full_name': 'Arjun Mehta',
                'skill_level': 'Advanced',
                'role': 'admin'
            },
            {
                'username': 'divya',
                'email': 'divya.patel@smartquizzer.com',
                'password': 'Admin@123',
                'full_name': 'Divya Patel',
                'skill_level': 'Advanced',
                'role': 'admin'
            },
            {
                'username': 'rahul',
                'email': 'rahul.sharma@smartquizzer.com',
                'password': 'Admin@123',
                'full_name': 'Rahul Sharma',
                'skill_level': 'Advanced',
                'role': 'admin'
            },
            # Regular user accounts (15 total - 5 Beginner, 5 Intermediate, 5 Advanced)
            # Beginner Users (5)
            {
                'username': 'priya',
                'email': 'priya.nair@gmail.com',
                'password': 'User@123',
                'full_name': 'Priya Nair',
                'skill_level': 'Beginner',
                'role': 'user'
            },
            {
                'username': 'rohit',
                'email': 'rohit.verma@gmail.com',
                'password': 'User@123',
                'full_name': 'Rohit Verma',
                'skill_level': 'Beginner',
                'role': 'user'
            },
            {
                'username': 'anjali',
                'email': 'anjali.das@gmail.com',
                'password': 'User@123',
                'full_name': 'Anjali Das',
                'skill_level': 'Beginner',
                'role': 'user'
            },
            {
                'username': 'vikram',
                'email': 'vikram.singh@gmail.com',
                'password': 'User@123',
                'full_name': 'Vikram Singh',
                'skill_level': 'Beginner',
                'role': 'user'
            },
            {
                'username': 'kavya',
                'email': 'kavya.pillai@gmail.com',
                'password': 'User@123',
                'full_name': 'Kavya Pillai',
                'skill_level': 'Beginner',
                'role': 'user'
            },
            # Intermediate Users (5)
            {
                'username': 'aditya',
                'email': 'aditya.rao@gmail.com',
                'password': 'User@123',
                'full_name': 'Aditya Rao',
                'skill_level': 'Intermediate',
                'role': 'user'
            },
            {
                'username': 'neha',
                'email': 'neha.bansal@gmail.com',
                'password': 'User@123',
                'full_name': 'Neha Bansal',
                'skill_level': 'Intermediate',
                'role': 'user'
            },
            {
                'username': 'suresh',
                'email': 'suresh.iyer@gmail.com',
                'password': 'User@123',
                'full_name': 'Suresh Iyer',
                'skill_level': 'Intermediate',
                'role': 'user'
            },
            {
                'username': 'tanya',
                'email': 'tanya.joseph@gmail.com',
                'password': 'User@123',
                'full_name': 'Tanya Joseph',
                'skill_level': 'Intermediate',
                'role': 'user'
            },
            {
                'username': 'rajesh',
                'email': 'rajesh.kumar@gmail.com',
                'password': 'User@123',
                'full_name': 'Rajesh Kumar',
                'skill_level': 'Intermediate',
                'role': 'user'
            },
            # Advanced Users (5)
            {
                'username': 'nisha',
                'email': 'nisha.chauhan@gmail.com',
                'password': 'User@123',
                'full_name': 'Nisha Chauhan',
                'skill_level': 'Advanced',
                'role': 'user'
            },
            {
                'username': 'deepak',
                'email': 'deepak.gupta@gmail.com',
                'password': 'User@123',
                'full_name': 'Deepak Gupta',
                'skill_level': 'Advanced',
                'role': 'user'
            },
            {
                'username': 'meera',
                'email': 'meera.joshi@gmail.com',
                'password': 'User@123',
                'full_name': 'Meera Joshi',
                'skill_level': 'Advanced',
                'role': 'user'
            },
            {
                'username': 'anand',
                'email': 'anand.kulkarni@gmail.com',
                'password': 'User@123',
                'full_name': 'Anand Kulkarni',
                'skill_level': 'Advanced',
                'role': 'user'
            },
            {
                'username': 'isha',
                'email': 'isha.menon@gmail.com',
                'password': 'User@123',
                'full_name': 'Isha Menon',
                'skill_level': 'Advanced',
                'role': 'user'
            }
        ]
        
        created_users = []
        skipped_users = []
        
        for user_data in default_users:
            try:
                # Check if user already exists by username or email
                existing_user = User.query.filter(
                    (User.username == user_data['username']) | 
                    (User.email == user_data['email'])
                ).first()
                
                if existing_user:
                    skipped_users.append({
                        'username': user_data['username'],
                        'reason': 'already exists'
                    })
                    print(f'   ⏭️  Skipped: {user_data["username"]} (already exists)')
                    continue
                
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
                
                role_emoji = '👑' if user_data['role'] == 'admin' else '👤'
                print(f'   ✅ Created: {role_emoji} {user_data["username"]} ({user_data["role"]})')
                
            except Exception as e:
                print(f'   ❌ Failed to create {user_data["username"]}: {str(e)}')
                db.session.rollback()
        
        # Check if topics exist
        existing_topics = Topic.query.count()
        topics_list = []
        
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
                    topics_list.append(topic)
                    print(f'   ✅ Created topic: {topic_data["name"]}')
                except Exception as e:
                    print(f'   ❌ Failed to create topic {topic_data["name"]}: {str(e)}')
            
            db.session.commit()
        else:
            print(f'\n📚 Topics already exist ({existing_topics} topics found)')
            topics_list = Topic.query.all()
        
        # Create quiz history for all users
        all_users = User.query.all()
        if all_users and len(all_users) > 0:
            total_quizzes, total_questions = create_quiz_history(all_users, topics_list)
        else:
            total_quizzes, total_questions = 0, 0
        
        # Display credentials
        print('\n' + '='*80)
        print('DATABASE INITIALIZATION COMPLETE!')
        print('='*80)
        
        # Show summary statistics
        print('\n📊 SUMMARY:')
        print('-'*80)
        admin_count = len([u for u in created_users if u['role'] == 'admin'])
        user_count = len([u for u in created_users if u['role'] == 'user'])
        print(f'   👑 Admin accounts created: {admin_count}')
        print(f'   👤 Regular user accounts created: {user_count}')
        print(f'   ⏭️  Skipped (already exist): {len(skipped_users)}')
        print(f'   📊 Total in database: {User.query.count()}')
        print(f'   📝 Quiz sessions created: {total_quizzes}')
        print(f'   ❓ Questions created: {total_questions}')
        print('-'*80)
        
        if created_users:
            print('\n📋 NEW USER CREDENTIALS:')
            print('-'*80)
            print(f'{"USERNAME":<15} {"PASSWORD":<15} {"EMAIL":<35} {"ROLE":<10}')
            print('-'*80)
            for user in created_users:
                print(f'{user["username"]:<15} {user["password"]:<15} {user["email"]:<35} {user["role"]:<10}')
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
