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

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

try:
    from app import app, db
    from models import User, Topic, QuizSession, Question, FlaggedQuestion, QuestionFeedback, QuizLeaderboard
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

# ==================== SECURITY: Password Management ====================
# Get test user passwords from environment variables for security
# These credentials are for testing/development only

def get_default_password(user_type='user'):
    """Get default password from environment or use placeholder"""
    if user_type == 'admin':
        pwd = os.getenv('DEFAULT_ADMIN_PASSWORD')
        if not pwd:
            pwd = 'CHANGEME_ADMIN'
            print("⚠️  WARNING: Admin password not set in environment")
    else:
        pwd = os.getenv('DEFAULT_USER_PASSWORD')
        if not pwd:
            pwd = 'CHANGEME_USER'
            print("⚠️  WARNING: User password not set in environment")
    return pwd


def initialize_topics():
    """Initialize default topics in the database"""
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
    
    topics_list = []
    for topic_data in default_topics:
        try:
            topic = Topic(**topic_data, is_active=True)# type: ignore
            db.session.add(topic)
            topics_list.append(topic)
            print(f'   ✅ Created topic: {topic_data["name"]}')
        except Exception as e:
            print(f'   ❌ Failed to create topic {topic_data["name"]}: {str(e)}')
    
    db.session.commit()
    return topics_list

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
                user_id=user.id,# type: ignore
                topic=topic_name,# type: ignore
                custom_topic=None,# type: ignore
                skill_level=difficulty,# type: ignore
                total_questions=total_questions,# type: ignore
                completed_questions=total_questions,# type: ignore
                correct_answers=correct_answers,# type: ignore
                score_percentage=round(score_percentage, 1),# type: ignore
                status='completed',# type: ignore
                started_at=started_at,# type: ignore
                completed_at=completed_at# type: ignore
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

def create_flagged_questions_and_feedback(users):
    """Create realistic flagged questions and user feedback"""
    print('\n🚩 Creating flagged questions and user feedback...')
    
    # Get all completed questions from the database
    all_questions = Question.query.all()
    
    if not all_questions or len(all_questions) == 0:
        print('   ⚠️  No questions found. Skipping flagged questions and feedback.')
        return 0, 0
    
    # Flag reasons
    flag_reasons = [
        "Incorrect answer key - the marked answer is wrong",
        "Question text is unclear or ambiguous",
        "Grammar mistake in question",
        "Multiple correct answers possible",
        "Answer explanation is insufficient",
        "Question difficulty doesn't match the level",
        "Outdated information in the question",
        "Typo in one of the options",
        "Question is too vague",
        "Missing context for the question"
    ]
    
    # Feedback comments (positive and negative)
    feedback_comments = [
        "Great question! Really helped me understand the concept.",
        "The explanation was very clear and helpful.",
        "Loved the adaptive difficulty level!",
        "This question was challenging but fair.",
        "The feedback system helped me learn from my mistakes.",
        "Excellent coverage of the topic.",
        "Some questions were repetitive.",
        "Could use more detailed explanations.",
        "The question was a bit confusing.",
        "More examples would be helpful in the explanation.",
        "Perfect difficulty level for beginners!",
        "The time limit was just right.",
        "Very engaging quiz experience.",
        "Questions helped reinforce my learning.",
        "Good variety of question types.",
        "The MCQ options were well-designed.",
        "Appreciated the immediate feedback!",
        "This helped me identify my weak areas.",
        "Would love to see more questions like this.",
        "The quiz was well-structured."
    ]
    
    flagged_count = 0
    feedback_count = 0
    resolved_count = 0
    
    # Create flagged questions (15-25 flags)
    num_flags = random.randint(15, 25)
    flagged_questions = random.sample(all_questions, min(num_flags, len(all_questions)))
    
    for question in flagged_questions:
        # Pick a random user who completed this quiz - Fixed legacy Query.get()
        quiz_session = db.session.get(QuizSession, question.quiz_session_id)
        if not quiz_session:
            continue
            
        user = db.session.get(User, quiz_session.user_id)
        if not user or user.role != 'user':
            continue
        
        # Random flag reason
        reason = random.choice(flag_reasons)
        
        # Random status (70% pending, 30% resolved)
        status = 'pending' if random.random() < 0.7 else 'resolved'
        
        # Create flag date (within the quiz completion time and now)
        days_ago = random.randint(0, 30)
        flagged_at = datetime.now() - timedelta(days=days_ago, hours=random.randint(0, 23))
        
        # If resolved, set resolution date
        resolved_at = None
        resolved_by_user_id = None
        if status == 'resolved':
            # Resolved within 1-7 days after flagging
            resolved_days = random.randint(1, 7)
            resolved_at = flagged_at + timedelta(days=resolved_days, hours=random.randint(0, 23))
            # Pick a random admin to resolve it
            admin = User.query.filter_by(role='admin').first()
            if admin:
                resolved_by_user_id = admin.id
            resolved_count += 1
        
        flagged_question = FlaggedQuestion(
            question_id=question.id,# type: ignore
            flagged_by_user_id=user.id,# type: ignore
            flag_reason=reason,# type: ignore
            flag_count=1,# type: ignore
            status=status,# type: ignore
            flagged_at=flagged_at,# type: ignore
            resolved_at=resolved_at,# type: ignore
            resolved_by_user_id=resolved_by_user_id# type: ignore
        )
        db.session.add(flagged_question)
        flagged_count += 1
    
    # Create user feedback (30-50 feedback entries)
    num_feedback = random.randint(30, 50)
    feedback_questions = random.sample(all_questions, min(num_feedback, len(all_questions)))
    
    for question in feedback_questions:
        # Pick the user who answered this question - Fixed legacy Query.get()
        quiz_session = db.session.get(QuizSession, question.quiz_session_id)
        if not quiz_session:
            continue
            
        user = db.session.get(User, quiz_session.user_id)
        if not user or user.role != 'user':
            continue
        
        # Random rating (weighted towards higher ratings)
        # 40% chance of 5 stars, 30% of 4 stars, 20% of 3 stars, 10% of 1-2 stars
        rating_weights = [5, 10, 20, 30, 40]  # cumulative weights for 1-5
        rand_val = random.randint(1, 100)
        if rand_val <= rating_weights[0]:
            rating = 1
        elif rand_val <= rating_weights[1]:
            rating = 2
        elif rand_val <= rating_weights[2]:
            rating = 3
        elif rand_val <= rating_weights[3]:
            rating = 4
        else:
            rating = 5
        
        # Pick appropriate comment based on rating
        if rating >= 4:
            comment = random.choice([c for c in feedback_comments if any(word in c.lower() for word in ['great', 'excellent', 'loved', 'perfect', 'good', 'helpful', 'clear', 'appreciated'])])
        elif rating == 3:
            comment = random.choice([c for c in feedback_comments if any(word in c.lower() for word in ['could', 'would', 'helped', 'reinforced'])])
        else:
            comment = random.choice([c for c in feedback_comments if any(word in c.lower() for word in ['repetitive', 'confusing', 'more'])])
        
        # Create feedback date (same day or shortly after quiz)
        days_after = random.randint(0, 3)
        feedback_date = quiz_session.completed_at + timedelta(days=days_after, hours=random.randint(0, 23)) if quiz_session.completed_at else datetime.now()
        
        feedback = QuestionFeedback(
            question_id=question.id,# type: ignore
            user_id=user.id,# type: ignore
            feedback_text=comment,# type: ignore
            rating=rating,# type: ignore
            created_at=feedback_date# type: ignore
        )
        db.session.add(feedback)
        feedback_count += 1
    
    db.session.commit()
    print(f'   ✅ Created {flagged_count} flagged questions ({flagged_count - resolved_count} pending, {resolved_count} resolved)')
    print(f'   ✅ Created {feedback_count} user feedback entries')
    print(f'   ⭐ Average rating: {sum([f.rating for f in QuestionFeedback.query.all()]) / feedback_count:.1f}/5.0' if feedback_count > 0 else '   ⭐ No feedback yet')
    
    return flagged_count, feedback_count

def populate_leaderboard():
    """Populate leaderboard from existing quiz sessions"""
    print('\n🏆 Populating leaderboard from quiz sessions...')
    
    # Clear existing leaderboard entries
    QuizLeaderboard.query.delete()
    db.session.commit()
    
    # Get all completed quiz sessions
    completed_sessions = QuizSession.query.filter_by(status='completed').all()
    
    if not completed_sessions:
        print('   ⚠️  No completed quiz sessions found')
        return 0
    
    leaderboard_count = 0
    
    for session in completed_sessions:
        # Calculate time taken in seconds
        time_taken_seconds = 0
        if session.completed_at and session.started_at:
            time_delta = session.completed_at - session.started_at
            time_taken_seconds = int(time_delta.total_seconds())
        
        # Calculate accuracy
        accuracy = (session.correct_answers / session.total_questions * 100) if session.total_questions > 0 else 0
        
        # Create leaderboard entry
        leaderboard_entry = QuizLeaderboard(
            user_id=session.user_id,# type: ignore
            quiz_session_id=session.id,# type: ignore
            topic=session.topic,# type: ignore
            score=session.score_percentage,# type: ignore
            correct_count=session.correct_answers,# type: ignore
            total_questions=session.total_questions,# type: ignore
            time_taken=time_taken_seconds,# type: ignore
            avg_difficulty_weight=1.0,  # type: ignore
            timestamp=session.completed_at if session.completed_at else session.started_at # type: ignore
        )
        db.session.add(leaderboard_entry)
        leaderboard_count += 1
    
    db.session.commit()
    
    # Calculate and assign ranks
    all_entries = QuizLeaderboard.query.order_by(
        QuizLeaderboard.score.desc(),# type: ignore
        QuizLeaderboard.time_taken.asc()# type: ignore
    ).all()
    
    for idx, entry in enumerate(all_entries, start=1):
        entry.rank = idx
    
    db.session.commit()
    
    print(f'   ✅ Created {leaderboard_count} leaderboard entries')
    print(f'   🏅 Ranks assigned (1-{leaderboard_count})')
    
    # Show top 5
    top_5 = QuizLeaderboard.query.order_by(QuizLeaderboard.score.desc()).limit(5).all()# type: ignore
    print(f'\n   🌟 Top 5 Leaderboard:')
    for entry in top_5:
        print(f'      #{entry.rank} {entry.user.username}: {entry.score}% on {entry.topic} ({entry.time_taken}s)')
    
    return leaderboard_count

def init_database():
    """
    Initialize database with default data.
    IDEMPOTENT DESIGN: Safe to run multiple times without data loss or duplication.
    
    On first run:
      - Creates all tables via db.create_all()
      - Inserts ALL users (admin + regular users) from default_users list
      - Inserts all topics
      - Optionally creates quiz history and leaderboard
    
    On subsequent runs:
      - Detects existing users by username (UNIQUE constraint)
      - Skips duplicate users (via filter check before insert)
      - Can optionally add more quiz history
      - Preserves all existing data
    
    This ensures:
      ✅ Users can login immediately after cloning (no manual setup needed)
      ✅ Running multiple times is safe (no duplicates)
      ✅ Data persists across app restarts
    """
    
    with app.app_context():
        print('\n' + '='*80)
        print('SMART QUIZZER AI - DATABASE INITIALIZATION')
        print('='*80)
        
        # Create all tables
        print('\n📦 Creating database tables...')
        db.create_all()
        print('✅ Database tables created successfully!')
        
        # Check if ALL required users exist (idempotency check)
        existing_user_count = User.query.count()
        
        if existing_user_count > 0:
            print(f'\n✅ Database already has {existing_user_count} users.')
            print('⚠️  Checking which users need to be created...')
        
        # Get credentials from environment
        admin_pwd = get_default_password('admin')
        user_pwd = get_default_password('user')
        
        # Define all default users (admin + regular users with different skill levels)
        # IDEMPOTENT: Each user is checked by username before insertion
        print('\n👥 Processing default test users...')

        # SECURITY: All test credentials are retrieved from environment variables
        # See .env.example for configuration requirements
        
        # Define all default users (admin + regular users with different skill levels)
        default_users = [
            # Primary Admin Account (as specified in requirements)
            {
                'username': 'admin1',
                'email': 'admin1@smartquizzer.com',
                'password': admin_pwd,
                'full_name': 'System Administrator',
                'skill_level': 'Advanced',
                'role': 'admin'
            },
            # Primary User Account (as specified in requirements)
            {
                'username': 'john',
                'email': 'john@example.com',
                'password': user_pwd,
                'full_name': 'John Doe',
                'skill_level': 'Intermediate',
                'role': 'user'
            },
            # Additional Admin accounts
            {
                'username': 'ravi',
                'email': 'ravi.kumar@smartquizzer.com',
                'password': admin_pwd,
                'full_name': 'Ravi Kumar',
                'skill_level': 'Advanced',
                'role': 'admin'
            },
            {
                'username': 'sneha',
                'email': 'sneha.reddy@smartquizzer.com',
                'password': admin_pwd,
                'full_name': 'Sneha Reddy',
                'skill_level': 'Advanced',
                'role': 'admin'
            },
            {
                'username': 'arjun',
                'email': 'arjun.mehta@smartquizzer.com',
                'password': admin_pwd,
                'full_name': 'Arjun Mehta',
                'skill_level': 'Advanced',
                'role': 'admin'
            },
            # Beginner Regular Users
            {
                'username': 'priya',
                'email': 'priya.nair@gmail.com',
                'password': user_pwd,
                'full_name': 'Priya Nair',
                'skill_level': 'Beginner',
                'role': 'user'
            },
            {
                'username': 'rohit',
                'email': 'rohit.verma@gmail.com',
                'password': user_pwd,
                'full_name': 'Rohit Verma',
                'skill_level': 'Beginner',
                'role': 'user'
            },
            {
                'username': 'anjali',
                'email': 'anjali.das@gmail.com',
                'password': user_pwd,
                'full_name': 'Anjali Das',
                'skill_level': 'Beginner',
                'role': 'user'
            },
            # Intermediate Regular Users
            {
                'username': 'aditya',
                'email': 'aditya.rao@gmail.com',
                'password': user_pwd,
                'full_name': 'Aditya Rao',
                'skill_level': 'Intermediate',
                'role': 'user'
            },
            {
                'username': 'neha',
                'email': 'neha.bansal@gmail.com',
                'password': user_pwd,
                'full_name': 'Neha Bansal',
                'skill_level': 'Intermediate',
                'role': 'user'
            },
            # Advanced Regular Users
            {
                'username': 'deepak',
                'email': 'deepak.gupta@gmail.com',
                'password': user_pwd,
                'full_name': 'Deepak Gupta',
                'skill_level': 'Advanced',
                'role': 'user'
            },
            {
                'username': 'meera',
                'email': 'meera.joshi@gmail.com',
                'password': user_pwd,
                'full_name': 'Meera Joshi',
                'skill_level': 'Advanced',
                'role': 'user'
            }
        ]
        
        # IDEMPOTENT USER CREATION: Check each user before inserting
        created_users = []
        skipped_users = []
        
        for user_data in default_users:
            try:
                # CRITICAL CHECK: Does user already exist by username?
                # This prevents duplicates on subsequent runs
                existing_user = User.query.filter_by(username=user_data['username']).first()
                
                if existing_user:
                    skipped_users.append({
                        'username': user_data['username'],
                        'reason': 'already exists'
                    })
                    print(f'   ⏭️  Skipped: {user_data["username"]} (already exists)')
                    continue
                
                # Create new user (only if it doesn't exist)
                user = User(
                    username=user_data['username'],# type: ignore
                    email=user_data['email'],# type: ignore
                    full_name=user_data['full_name'],# type: ignore
                    skill_level=user_data['skill_level'],# type: ignore
                    role=user_data['role']# type: ignore
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
                    # IDEMPOTENT: Check if topic exists
                    existing_topic = Topic.query.filter_by(name=topic_data['name']).first()
                    if not existing_topic:
                        topic = Topic(**topic_data, is_active=True)# type: ignore
                        db.session.add(topic)
                        topics_list.append(topic)
                        print(f'   ✅ Created topic: {topic_data["name"]}')
                except Exception as e:
                    print(f'   ❌ Failed to create topic {topic_data["name"]}: {str(e)}')
            
            if topics_list:
                db.session.commit()
        else:
            print(f'\n📚 Topics already exist ({existing_topics} topics found)')
            topics_list = Topic.query.all()
        
        
        # Ask if user wants to create quiz history for demonstration purposes
        # This is OPTIONAL - users can login immediately without quiz history
        all_users = User.query.all()
        if all_users and len(all_users) > 0:
            print(f'\n💡 Found {len(all_users)} users in database.')
            print('   You can now login directly with these credentials.')
            print('\n   Optional: Would you like to add realistic quiz history for demo purposes?')
            print('   (This creates sample quizzes, questions, and leaderboard rankings)')
            
            response = input('   Add demo quiz history? (yes/no): ')
            
            if response.lower() in ['yes', 'y']:
                print('\n📊 Creating realistic quiz history...')
                total_quizzes, total_questions = create_quiz_history(all_users, topics_list)
                print('\n🚩 Creating flagged questions and user feedback...')
                total_flags, total_feedback = create_flagged_questions_and_feedback(all_users)
                print('\n🏆 Populating leaderboard from quiz sessions...')
                total_leaderboard = populate_leaderboard()
            else:
                print('✅ Skipping demo quiz history. You can add it anytime by re-running this script.')
                total_quizzes = total_questions = 0
                total_flags = total_feedback = 0
                total_leaderboard = 0
        else:
            print('⚠️  No users found after setup. This is unexpected.')
            total_quizzes = total_questions = 0
            total_flags = total_feedback = 0
            total_leaderboard = 0
        
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
        print(f'   🚩 Flagged questions: {total_flags}')
        print(f'   💬 User feedback entries: {total_feedback}')
        print(f'   🏆 Leaderboard entries: {total_leaderboard}')
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
