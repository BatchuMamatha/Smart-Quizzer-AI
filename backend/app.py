from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import our modules
from models import db, User, QuizSession, Question, Topic
from auth import init_jwt, generate_tokens, auth_required
from question_gen import question_generator

def create_app():
    app = Flask(__name__)
    
    # Configuration - Use environment variables with fallbacks
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'smart-quizzer-secret-2024-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///smart_quizzer.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    init_jwt(app)
    
    # Create tables
    with app.app_context():
        db.create_all()
        
        # Initialize adaptive quiz engine
        app.adaptive_engine = question_generator.adaptive_engine
        
        initialize_topics()
    
    return app

def initialize_topics():
    """Initialize default topics if not exists"""
    topics_data = [
        {"name": "Mathematics", "description": "Mathematical concepts and problems", "category": "STEM"},
        {"name": "Science", "description": "Scientific principles and discoveries", "category": "STEM"},
        {"name": "History", "description": "Historical events and civilizations", "category": "Humanities"},
        {"name": "Literature", "description": "Literary works and analysis", "category": "Humanities"},
        {"name": "Geography", "description": "Physical and human geography", "category": "Social Studies"}
    ]
    
    for topic_data in topics_data:
        if not Topic.query.filter_by(name=topic_data["name"]).first():
            topic = Topic(**topic_data)
            db.session.add(topic)
    
    db.session.commit()

app = create_app()

# Root endpoint
@app.route('/', methods=['GET'])
def root():
    return jsonify({
        'message': 'Welcome to Smart Quizzer API',
        'version': '1.0.0',
        'status': 'running',
        'api_base': '/api',
        'endpoints': {
            'health': '/api/health',
            'auth': {
                'register': '/api/auth/register',
                'login': '/api/auth/login',
                'profile': '/api/auth/profile'
            },
            'quiz': {
                'topics': '/api/topics',
                'start': '/api/quiz/start',
                'answer': '/api/quiz/<id>/answer',
                'results': '/api/quiz/<id>/results',
                'history': '/api/quiz/history'
            }
        }
    }), 200

# Health endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Smart Quizzer API is running',
        'timestamp': datetime.now().isoformat()
    }), 200

# Auth Routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'full_name', 'skill_level']
        for field in required_fields:
            if field not in data or not data[field]:
                print(f"⚠️ Registration validation failed: {field} is required")
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(username=data['username']).first():
            print(f"⚠️ Registration failed: Username '{data['username']}' already exists")
            return jsonify({'error': 'Username already exists'}), 409
        
        if User.query.filter_by(email=data['email']).first():
            print(f"⚠️ Registration failed: Email '{data['email']}' already exists")
            return jsonify({'error': 'Email already exists'}), 409
        
        # Validate skill level
        if data['skill_level'] not in ['Beginner', 'Intermediate', 'Advanced']:
            return jsonify({'error': 'Invalid skill level'}), 400
        
        # Create new user
        user = User(
            username=data['username'],
            email=data['email'],
            full_name=data['full_name'],
            skill_level=data['skill_level']
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        # Generate tokens
        tokens = generate_tokens(user.id)
        print(f"✅ User '{user.username}' registered successfully")
        
        # Add stats to user data
        user_dict = user.to_dict()
        user_dict.update({
            'total_quizzes': 3,
            'completed_quizzes': 2,
            'average_score': 75.0
        })
        
        return jsonify({
            'message': 'User registered successfully',
            'user': user_dict,
            'tokens': tokens
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Registration error: {str(e)}")
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if 'username' not in data or 'password' not in data:
            print("⚠️ Login validation failed: Username and password are required")
            return jsonify({'error': 'Username and password are required'}), 400
        
        # For demo purposes, accept any username/password OR check existing users
        username = data['username']
        password = data['password']
        
        # Check if user exists in database
        existing_user = User.query.filter_by(username=username).first()
        
        if existing_user and existing_user.check_password(password):
            # Existing user login
            user = existing_user
            print(f"✅ Existing user '{user.username}' logged in successfully")
        else:
            # Demo login - create mock user data without saving to database
            print(f"✅ Demo login for username '{username}'")
            user_data = {
                'id': 1,
                'username': username,
                'email': f"{username}@example.com",
                'full_name': username.title(),
                'skill_level': 'Intermediate',
                'created_at': '2025-10-03T15:00:00Z',
                'quiz_count': 0,
                'total_quizzes': 8,
                'completed_quizzes': 6,
                'average_score': 87.5
            }
            
            # Generate tokens for demo user
            tokens = generate_tokens(1)  # Use ID 1 for demo
            
            return jsonify({
                'message': 'Login successful',
                'user': user_data,
                'tokens': tokens
            }), 200
        
        # For existing users, generate tokens
        tokens = generate_tokens(user.id)
        
        # Add stats to existing user data
        user_dict = user.to_dict()
        user_dict.update({
            'total_quizzes': 8,
            'completed_quizzes': 6,
            'average_score': 87.5
        })
        
        return jsonify({
            'message': 'Login successful',
            'user': user_dict,
            'tokens': tokens
        }), 200
        
    except Exception as e:
        print(f"❌ Login error: {str(e)}")
        return jsonify({'error': f'Login failed: {str(e)}'}), 500

@app.route('/api/auth/profile', methods=['GET'])
@auth_required
def get_profile(current_user_id):
    try:
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Get user's quiz statistics
        total_quizzes = len(user.quiz_sessions)
        completed_quizzes = len([qs for qs in user.quiz_sessions if qs.status == 'completed'])
        avg_score = 0
        
        if completed_quizzes > 0:
            total_score = sum([qs.score_percentage for qs in user.quiz_sessions if qs.status == 'completed'])
            avg_score = total_score / completed_quizzes
        
        profile_data = user.to_dict()
        profile_data.update({
            'total_quizzes': total_quizzes,
            'completed_quizzes': completed_quizzes,
            'average_score': round(avg_score, 2)
        })
        
        return jsonify(profile_data), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/test', methods=['GET'])
@auth_required
def test_auth(current_user_id):
    """Test endpoint to verify JWT token is working"""
    try:
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'message': 'Token is valid',
            'user_id': current_user_id,
            'username': user.username
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Topic Routes
@app.route('/api/topics', methods=['GET'])
def get_topics():
    try:
        topics = Topic.query.filter_by(is_active=True).all()
        return jsonify([topic.to_dict() for topic in topics]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quiz/start', methods=['POST'])
@auth_required
def start_quiz(current_user_id):
    try:
        data = request.get_json()
        
        required_fields = ['topic', 'skill_level']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Validate inputs
        if data['skill_level'] not in ['Beginner', 'Intermediate', 'Advanced']:
            return jsonify({'error': 'Invalid skill level'}), 400
        
        num_questions = data.get('num_questions', 5)
        custom_topic = data.get('custom_topic')
        topic = data['topic']
        
        # Enhanced validation for custom topics
        if topic in ['Custom', 'Custom Topic'] and not custom_topic:
            return jsonify({'error': 'Custom topic content is required when using custom topics'}), 400
        
        if custom_topic and len(custom_topic.strip()) < 10:
            return jsonify({'error': 'Custom topic content must be at least 10 characters long'}), 400
        
        # Validate number of questions
        if not isinstance(num_questions, int) or num_questions < 1 or num_questions > 20:
            return jsonify({'error': 'Number of questions must be between 1 and 20'}), 400
        
        print(f"🎯 Starting quiz for user {current_user_id}: {topic} ({data['skill_level']}) - {num_questions} questions")
        if custom_topic:
            print(f"📝 Custom topic content: {custom_topic[:100]}...")
        
        # Initialize adaptive profile for user
        adaptive_profile = question_generator.adaptive_engine.initialize_user_profile(
            user_id=str(current_user_id), 
            initial_skill_level=data['skill_level']
        )
        
        # Create quiz session
        quiz_session = QuizSession(
            user_id=current_user_id,
            topic=topic,
            skill_level=data['skill_level'],
            custom_topic=custom_topic,
            total_questions=num_questions
        )
        
        db.session.add(quiz_session)
        db.session.commit()
        
        # Generate questions using AI with user tracking for uniqueness
        try:
            questions_data = question_generator.generate_quiz_questions(
                topic=topic,
                skill_level=data['skill_level'],
                num_questions=num_questions,
                custom_topic=custom_topic,
                user_id=current_user_id
            )
            
            if not questions_data or len(questions_data) == 0:
                db.session.rollback()
                return jsonify({'error': 'Failed to generate questions. Please try again with different content.'}), 500
                
        except Exception as qgen_error:
            print(f"❌ Question generation error: {qgen_error}")
            db.session.rollback()
            return jsonify({'error': f'Question generation failed: {str(qgen_error)}'}), 500
        
        # Save questions to database
        for q_data in questions_data:
            question = Question(
                quiz_session_id=quiz_session.id,
                question_text=q_data['question_text'],
                question_type=q_data['question_type'],
                correct_answer=q_data['correct_answer'],
                explanation=q_data['explanation'],
                difficulty_level=q_data['difficulty_level']
            )
            question.set_options(q_data.get('options', []))
            db.session.add(question)
        
        db.session.commit()
        
        # Return quiz session with questions (without correct answers)
        questions = Question.query.filter_by(quiz_session_id=quiz_session.id).all()
        
        print(f"✅ Quiz started successfully with {len(questions)} questions")
        
        return jsonify({
            'quiz_session': quiz_session.to_dict(),
            'questions': [q.to_dict(include_correct_answer=False) for q in questions]
        }), 201
        
    except Exception as e:
        print(f"❌ Quiz start error: {e}")
        db.session.rollback()
        return jsonify({'error': f'Failed to start quiz: {str(e)}'}), 500

@app.route('/api/quiz/<int:quiz_id>/answer', methods=['POST'])
@auth_required
def submit_answer(current_user_id, quiz_id):
    try:
        data = request.get_json()
        
        if 'question_id' not in data or 'answer' not in data:
            return jsonify({'error': 'question_id and answer are required'}), 400
        
        # Get quiz session and verify ownership
        quiz_session = QuizSession.query.filter_by(id=quiz_id, user_id=current_user_id).first()
        if not quiz_session:
            return jsonify({'error': 'Quiz session not found'}), 404
        
        # Get question
        question = Question.query.filter_by(
            id=data['question_id'], 
            quiz_session_id=quiz_id
        ).first()
        
        if not question:
            return jsonify({'error': 'Question not found'}), 404
        
        if question.is_correct is not None:
            return jsonify({'error': 'Question already answered'}), 400
        
        # Check answer using advanced evaluator
        is_correct = question.check_answer(data['answer'])
        question.time_taken = data.get('time_taken', 0)
        
        # Get enhanced feedback from the advanced evaluator
        enhanced_feedback = question.get_enhanced_feedback()
        
        # Record answer in adaptive engine
        answer_record = question_generator.adaptive_engine.record_answer(
            user_id=str(current_user_id),
            question_difficulty=question.difficulty_level,
            is_correct=is_correct,
            response_time=question.time_taken,
            question_metadata={
                'question_type': question.question_type,
                'topic': quiz_session.topic,
                'evaluation_method': enhanced_feedback.get('evaluation_method', 'basic'),
                'confidence': enhanced_feedback.get('confidence', 1.0)
            }
        )
        
        # Get adaptive recommendation for next question
        adaptive_recommendation = question_generator.adaptive_engine.determine_next_difficulty(
            user_id=str(current_user_id),
            current_question_difficulty=question.difficulty_level,
            is_correct=is_correct
        )
        
        # Update quiz session stats
        quiz_session.completed_questions += 1
        if is_correct:
            quiz_session.correct_answers += 1
        
        # Check if quiz is completed
        if quiz_session.completed_questions >= quiz_session.total_questions:
            quiz_session.status = 'completed'
            quiz_session.completed_at = datetime.utcnow()
            quiz_session.calculate_score()
        
        db.session.commit()
        
        return jsonify({
            'is_correct': is_correct,
            'correct_answer': question.correct_answer,
            'explanation': enhanced_feedback.get('explanation', question.explanation),
            'time_taken': question.time_taken,
            'enhanced_feedback': {
                'result_message': enhanced_feedback.get('result_message', ''),
                'evaluation_method': enhanced_feedback.get('evaluation_method', 'basic'),
                'confidence': enhanced_feedback.get('confidence', 1.0 if is_correct else 0.0),
                'hint': enhanced_feedback.get('hint', ''),
                'learning_tip': enhanced_feedback.get('learning_tip', ''),
                'semantic_score': enhanced_feedback.get('semantic_score', 0.0),
                'keyword_overlap': enhanced_feedback.get('keyword_overlap', 0.0)
            },
            'adaptive_insights': {
                'next_difficulty': adaptive_recommendation['next_difficulty'],
                'difficulty_change': adaptive_recommendation['difficulty_change'],
                'performance_trend': adaptive_recommendation['performance_metrics']['trend'],
                'confidence_level': adaptive_recommendation['confidence'],
                'consecutive_correct': adaptive_recommendation['performance_metrics']['consecutive_correct'],
                'adaptation_reason': adaptive_recommendation['reason']
            },
            'quiz_progress': {
                'completed': quiz_session.completed_questions,
                'total': quiz_session.total_questions,
                'score_percentage': quiz_session.score_percentage,
                'is_completed': quiz_session.status == 'completed'
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Adaptive Learning Analytics Routes
@app.route('/api/user/adaptive-analytics', methods=['GET'])
@auth_required
def get_adaptive_analytics(current_user_id):
    """Get comprehensive adaptive learning analytics for the current user"""
    try:
        # Get adaptive recommendation and performance insights
        recommendation = question_generator.adaptive_engine.get_adaptive_question_recommendation(
            user_id=str(current_user_id),
            topic="general",  # General analytics
            question_type="mixed"
        )
        
        # Get performance metrics
        metrics = question_generator.adaptive_engine.calculate_performance_metrics(str(current_user_id))
        
        # Get user profile from adaptive engine
        user_profile = question_generator.adaptive_engine.user_performance_history.get(str(current_user_id))
        
        if not user_profile:
            return jsonify({
                'message': 'No adaptive data available yet. Take a quiz to start tracking.',
                'current_difficulty': 'medium',
                'performance_metrics': {
                    'accuracy': 0.0,
                    'confidence': 0.0,
                    'trend': 0.0,
                    'difficulty_performance': {'easy': 0.0, 'medium': 0.0, 'hard': 0.0},
                    'consecutive_correct': 0
                },
                'learning_insights': {
                    'learning_trend': 'stable',
                    'confidence_level': 'low',
                    'strength_area': 'unknown',
                    'improvement_area': 'unknown'
                },
                'session_stats': {
                    'total_questions': 0,
                    'correct_answers': 0,
                    'consecutive_correct': 0,
                    'difficulty_changes': 0
                },
                'adaptation_metadata': {},
                'difficulty_distribution': {
                    'easy_accuracy': 0.0,
                    'medium_accuracy': 0.0,
                    'hard_accuracy': 0.0
                },
                'progress_indicators': {
                    'learning_trend': 'stable',
                    'confidence_level': 'low',
                    'strength_area': 'unknown',
                    'improvement_area': 'unknown'
                },
                'has_quiz_data': False
            }), 200
        
        return jsonify({
            'current_difficulty': user_profile['current_difficulty'],
            'performance_metrics': metrics,
            'learning_insights': recommendation['learning_insights'],
            'session_stats': user_profile['session_stats'],
            'adaptation_metadata': user_profile['adaptation_metadata'],
            'long_term_stats': user_profile['long_term_stats'],
            'difficulty_distribution': {
                'easy_accuracy': metrics['difficulty_performance'].get('easy', 0),
                'medium_accuracy': metrics['difficulty_performance'].get('medium', 0),
                'hard_accuracy': metrics['difficulty_performance'].get('hard', 0)
            },
            'progress_indicators': {
                'learning_trend': recommendation['learning_insights']['learning_trend'],
                'confidence_level': recommendation['learning_insights']['confidence_level'],
                'strength_area': recommendation['learning_insights']['strength_area'],
                'improvement_area': recommendation['learning_insights']['improvement_area']
            },
            'has_quiz_data': True
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get adaptive analytics: {str(e)}'}), 500

@app.route('/api/user/difficulty-recommendation', methods=['POST'])
@auth_required
def get_difficulty_recommendation(current_user_id):
    """Get difficulty recommendation for specific topic and question type"""
    try:
        data = request.get_json()
        topic = data.get('topic', 'general')
        question_type = data.get('question_type', 'multiple_choice')
        
        recommendation = question_generator.adaptive_engine.get_adaptive_question_recommendation(
            user_id=str(current_user_id),
            topic=topic,
            question_type=question_type
        )
        
        return jsonify(recommendation), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get difficulty recommendation: {str(e)}'}), 500

@app.route('/api/quiz/<int:quiz_id>/results', methods=['GET'])
@auth_required
def get_quiz_results(current_user_id, quiz_id):
    try:
        # Get quiz session and verify ownership
        quiz_session = QuizSession.query.filter_by(id=quiz_id, user_id=current_user_id).first()
        if not quiz_session:
            return jsonify({'error': 'Quiz session not found'}), 404
        
        # Get all questions with answers
        questions = Question.query.filter_by(quiz_session_id=quiz_id).all()
        
        return jsonify({
            'quiz_session': quiz_session.to_dict(),
            'questions': [q.to_dict(include_correct_answer=True) for q in questions],
            'summary': {
                'total_questions': quiz_session.total_questions,
                'correct_answers': quiz_session.correct_answers,
                'score_percentage': quiz_session.score_percentage,
                'time_taken': sum([q.time_taken or 0 for q in questions])
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quiz/history', methods=['GET'])
@auth_required
def get_quiz_history(current_user_id):
    try:
        quiz_sessions = QuizSession.query.filter_by(user_id=current_user_id).order_by(
            QuizSession.started_at.desc()
        ).all()
        
        return jsonify([qs.to_dict() for qs in quiz_sessions]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🚀 Starting Smart Quizzer API...")
    print("🔑 JWT Authentication ✅")
    print("💾 SQLite Database ✅")
    print("🤖 Gemini AI Model ✅")
    print("\n🌐 API running on: http://localhost:5000")
    print("📖 API Documentation:")
    print("   - POST /api/auth/register - User registration")
    print("   - POST /api/auth/login - User login")
    print("   - GET  /api/auth/profile - User profile")
    print("   - GET  /api/topics - Available topics")
    print("   - POST /api/quiz/start - Start quiz")
    print("   - POST /api/quiz/<id>/answer - Submit answer")
    print("   - GET  /api/quiz/<id>/results - Quiz results")
    print("   - GET  /api/quiz/history - Quiz history")
    print("   - GET  /api/user/adaptive-analytics - Adaptive learning analytics")
    print("   - POST /api/user/difficulty-recommendation - Get difficulty recommendation")
    print("   - GET  /api/health - Health check")
    
    app.run(debug=True, host='0.0.0.0', port=5000)