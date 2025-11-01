"""
Populate Quiz Data Script
This script creates sample quiz sessions for all users with realistic data
"""

import sys
import os
import random
from datetime import datetime, timedelta

# Add backend directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

try:
    from app import app, db
    from models import User, QuizSession, Question, Topic, QuizLeaderboard
except ImportError as e:
    print(f'\n❌ ERROR: Could not import required modules: {str(e)}')
    sys.exit(1)

# Sample topics
TOPICS = [
    'Mathematics', 'Science', 'History', 'Computer Science', 
    'Physics', 'Chemistry', 'Biology', 'Literature', 
    'Geography', 'Economics'
]

# Sample questions for different topics
SAMPLE_QUESTIONS = {
    'Mathematics': [
        {
            'question_text': 'What is 15 + 27?',
            'question_type': 'MCQ',
            'options': ['42', '32', '52', '41'],
            'correct_answer': 'A',
            'explanation': '15 + 27 = 42',
            'difficulty_level': 'Easy'
        },
        {
            'question_text': 'What is the square root of 144?',
            'question_type': 'MCQ',
            'options': ['12', '14', '10', '16'],
            'correct_answer': 'A',
            'explanation': '√144 = 12',
            'difficulty_level': 'Medium'
        },
        {
            'question_text': 'Solve: 3x + 5 = 20',
            'question_type': 'Short Answer',
            'correct_answer': '5',
            'explanation': '3x = 15, x = 5',
            'difficulty_level': 'Hard'
        }
    ],
    'Science': [
        {
            'question_text': 'Water is composed of hydrogen and oxygen.',
            'question_type': 'True/False',
            'correct_answer': 'True',
            'explanation': 'Water (H2O) contains 2 hydrogen atoms and 1 oxygen atom.',
            'difficulty_level': 'Easy'
        },
        {
            'question_text': 'What is the chemical symbol for gold?',
            'question_type': 'MCQ',
            'options': ['Au', 'Ag', 'Fe', 'Cu'],
            'correct_answer': 'A',
            'explanation': 'Au is the symbol for gold from Latin "aurum".',
            'difficulty_level': 'Medium'
        }
    ],
    'History': [
        {
            'question_text': 'World War II ended in 1945.',
            'question_type': 'True/False',
            'correct_answer': 'True',
            'explanation': 'World War II ended in September 1945.',
            'difficulty_level': 'Easy'
        },
        {
            'question_text': 'Who was the first President of the United States?',
            'question_type': 'MCQ',
            'options': ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'],
            'correct_answer': 'A',
            'explanation': 'George Washington was the first US President (1789-1797).',
            'difficulty_level': 'Medium'
        }
    ],
    'Computer Science': [
        {
            'question_text': 'What does HTML stand for?',
            'question_type': 'MCQ',
            'options': ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
            'correct_answer': 'A',
            'explanation': 'HTML stands for HyperText Markup Language.',
            'difficulty_level': 'Easy'
        },
        {
            'question_text': 'Python is a compiled language.',
            'question_type': 'True/False',
            'correct_answer': 'False',
            'explanation': 'Python is an interpreted language, not compiled.',
            'difficulty_level': 'Medium'
        }
    ],
    'Default': [
        {
            'question_text': 'This is a sample question.',
            'question_type': 'True/False',
            'correct_answer': 'True',
            'explanation': 'Sample explanation.',
            'difficulty_level': 'Easy'
        }
    ]
}

def get_sample_questions(topic, num_questions, difficulty):
    """Get sample questions for a topic"""
    template = SAMPLE_QUESTIONS.get(topic, SAMPLE_QUESTIONS['Default'])
    questions = []
    
    for i in range(num_questions):
        q_template = random.choice(template)
        question = q_template.copy()
        
        # Adjust difficulty if specified
        if difficulty:
            question['difficulty_level'] = difficulty.capitalize()
        
        questions.append(question)
    
    return questions

def create_quiz_session(user, topic, skill_level, num_questions):
    """Create a quiz session with questions and answers"""
    
    # Create quiz session
    session = QuizSession(
        user_id=user.id,
        topic=topic,
        skill_level=skill_level,
        total_questions=num_questions,
        status='completed'
    )
    
    # Random date within last 60 days
    days_ago = random.randint(1, 60)
    hours_ago = random.randint(0, 23)
    session.started_at = datetime.utcnow() - timedelta(days=days_ago, hours=hours_ago)
    session.completed_at = session.started_at + timedelta(minutes=random.randint(5, 20))
    
    db.session.add(session)
    db.session.flush()  # Get session ID
    
    # Create questions
    sample_questions = get_sample_questions(topic, num_questions, skill_level)
    correct_count = 0
    
    # Determine performance based on skill level
    if skill_level == 'Beginner':
        accuracy_range = (0.5, 0.75)  # 50-75% for beginners
    elif skill_level == 'Intermediate':
        accuracy_range = (0.65, 0.85)  # 65-85% for intermediate
    else:  # Advanced
        accuracy_range = (0.75, 0.95)  # 75-95% for advanced
    
    target_accuracy = random.uniform(*accuracy_range)
    target_correct = int(num_questions * target_accuracy)
    
    for i, q_data in enumerate(sample_questions):
        question = Question(
            quiz_session_id=session.id,
            question_text=q_data['question_text'],
            question_type=q_data['question_type'],
            correct_answer=q_data['correct_answer'],
            explanation=q_data.get('explanation', ''),
            difficulty_level=q_data['difficulty_level']
        )
        
        # Set options for MCQ
        if q_data['question_type'] == 'MCQ' and 'options' in q_data:
            question.set_options(q_data['options'])
        
        # Simulate user answer
        is_correct = (correct_count < target_correct)
        if is_correct:
            question.user_answer = q_data['correct_answer']
            question.is_correct = True
            correct_count += 1
        else:
            # Wrong answer
            if q_data['question_type'] == 'MCQ':
                wrong_options = ['A', 'B', 'C', 'D']
                wrong_options.remove(q_data['correct_answer'])
                question.user_answer = random.choice(wrong_options)
            elif q_data['question_type'] == 'True/False':
                question.user_answer = 'False' if q_data['correct_answer'] == 'True' else 'True'
            else:
                question.user_answer = 'Wrong answer'
            question.is_correct = False
        
        question.answered_at = session.started_at + timedelta(minutes=i)
        question.time_taken = random.randint(20, 90)
        
        db.session.add(question)
    
    # Update session statistics
    session.completed_questions = num_questions
    session.correct_answers = correct_count
    session.calculate_score()
    
    # Create leaderboard entry
    total_time = sum([random.randint(20, 90) for _ in range(num_questions)])
    
    # Calculate difficulty weight
    difficulty_weights = {'Easy': 1.0, 'Medium': 1.5, 'Hard': 2.0}
    avg_difficulty_weight = sum([difficulty_weights.get(q['difficulty_level'], 1.0) 
                                 for q in sample_questions]) / len(sample_questions)
    
    leaderboard_entry = QuizLeaderboard(
        user_id=user.id,
        quiz_session_id=session.id,
        topic=topic,
        correct_count=correct_count,
        total_questions=num_questions,
        time_taken=total_time,
        avg_difficulty_weight=avg_difficulty_weight
    )
    leaderboard_entry.calculate_score()
    
    db.session.add(leaderboard_entry)
    
    return session

def populate_quiz_data():
    """Populate database with sample quiz data for all users"""
    
    with app.app_context():
        print('\n' + '='*80)
        print('SMART QUIZZER AI - QUIZ DATA POPULATION')
        print('='*80)
        
        # Get all users
        users = User.query.all()
        
        if not users:
            print('\n❌ No users found in database!')
            print('   Please run init_database.py first to create users.')
            return
        
        print(f'\n📊 Found {len(users)} users in database')
        
        # Check if quiz data already exists
        existing_sessions = QuizSession.query.count()
        if existing_sessions > 0:
            response = input(f'\n⚠️  Database already has {existing_sessions} quiz sessions.\nDo you want to add more quiz data? (yes/no): ')
            if response.lower() != 'yes':
                print('❌ Operation cancelled.')
                return
        
        print('\n🎯 Creating sample quiz sessions for each user...\n')
        
        total_sessions_created = 0
        total_questions_created = 0
        
        for user in users:
            print(f'\n👤 {user.username} ({user.role}) - {user.skill_level}')
            print('-' * 60)
            
            # Each user takes 3-7 quizzes
            num_quizzes = random.randint(3, 7)
            
            for i in range(num_quizzes):
                # Random topic
                topic = random.choice(TOPICS)
                
                # Number of questions (3, 5, 7, or 10)
                num_questions = random.choice([3, 5, 7, 10])
                
                # Skill level - sometimes use user's level, sometimes random
                if random.random() < 0.7:  # 70% of the time use user's skill level
                    skill_level = user.skill_level
                else:
                    skill_level = random.choice(['Beginner', 'Intermediate', 'Advanced'])
                
                try:
                    session = create_quiz_session(user, topic, skill_level, num_questions)
                    db.session.commit()
                    
                    total_sessions_created += 1
                    total_questions_created += num_questions
                    
                    score_emoji = '🎉' if session.score_percentage >= 80 else '👍' if session.score_percentage >= 60 else '📚'
                    print(f'   ✅ Quiz #{i+1}: {topic} ({skill_level}) - {num_questions}Q - Score: {session.score_percentage:.1f}% {score_emoji}')
                    
                except Exception as e:
                    db.session.rollback()
                    print(f'   ❌ Failed to create quiz #{i+1}: {str(e)}')
        
        # Update leaderboard rankings
        print('\n🏆 Calculating leaderboard rankings...')
        leaderboard_entries = QuizLeaderboard.query.order_by(QuizLeaderboard.score.desc()).all()
        for rank, entry in enumerate(leaderboard_entries, start=1):
            entry.rank = rank
        db.session.commit()
        
        print('\n' + '='*80)
        print('QUIZ DATA POPULATION COMPLETE!')
        print('='*80)
        
        print('\n📊 SUMMARY:')
        print('-'*80)
        print(f'   👥 Users with quiz data: {len(users)}')
        print(f'   📝 Total quiz sessions created: {total_sessions_created}')
        print(f'   ❓ Total questions generated: {total_questions_created}')
        print(f'   🏆 Leaderboard entries: {QuizLeaderboard.query.count()}')
        print('-'*80)
        
        # Show some statistics
        print('\n📈 DATABASE STATISTICS:')
        print('-'*80)
        print(f'   Total Users: {User.query.count()}')
        print(f'   Total Quiz Sessions: {QuizSession.query.count()}')
        print(f'   Total Questions: {Question.query.count()}')
        print(f'   Completed Sessions: {QuizSession.query.filter_by(status="completed").count()}')
        print(f'   Leaderboard Entries: {QuizLeaderboard.query.count()}')
        print('-'*80)
        
        # Show top 5 performers
        print('\n🏆 TOP 5 PERFORMERS:')
        print('-'*80)
        top_performers = QuizLeaderboard.query.order_by(QuizLeaderboard.score.desc()).limit(5).all()
        for i, entry in enumerate(top_performers, start=1):
            medal = '🥇' if i == 1 else '🥈' if i == 2 else '🥉' if i == 3 else '🏅'
            accuracy = round((entry.correct_count / entry.total_questions * 100), 1) if entry.total_questions > 0 else 0
            print(f'   {medal} #{i} - {entry.user.username}: {entry.score:.1f} points ({entry.topic}, {accuracy}% accuracy)')
        
        print('\n✅ All users now have quiz history!')
        print('   - Analytics page will show real data')
        print('   - Admin dashboard will display user statistics')
        print('   - Leaderboard is populated with rankings')
        print('\n' + '='*80 + '\n')

if __name__ == '__main__':
    try:
        populate_quiz_data()
    except Exception as e:
        print(f'\n❌ ERROR: {str(e)}')
        import traceback
        traceback.print_exc()
        sys.exit(1)
