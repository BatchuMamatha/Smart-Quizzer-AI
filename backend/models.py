from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import bcrypt
import json

# Import the advanced answer evaluator
try:
    from answer_evaluator_simple import answer_evaluator
    EVALUATOR_AVAILABLE = True
except ImportError:
    EVALUATOR_AVAILABLE = False
    print("⚠️ Advanced answer evaluator not available, using basic evaluation")
except Exception as e:
    EVALUATOR_AVAILABLE = False
    print(f"⚠️ Error loading advanced answer evaluator: {e}")
    print("Using basic evaluation instead.")

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    skill_level = db.Column(db.String(20), nullable=False, default='Beginner')  # Beginner, Intermediate, Advanced
    role = db.Column(db.String(20), nullable=False, default='user')  # user or admin
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    quiz_sessions = db.relationship('QuizSession', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        """Check if provided password matches hash"""
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'full_name': self.full_name,
            'skill_level': self.skill_level,
            'role': self.role,
            'created_at': self.created_at.isoformat(),
            'quiz_count': len(self.quiz_sessions)
        }

class QuizSession(db.Model):
    __tablename__ = 'quiz_sessions'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    skill_level = db.Column(db.String(20), nullable=False)
    custom_topic = db.Column(db.Text, nullable=True)  # For custom text input
    total_questions = db.Column(db.Integer, nullable=False, default=5)
    completed_questions = db.Column(db.Integer, nullable=False, default=0)
    correct_answers = db.Column(db.Integer, nullable=False, default=0)
    score_percentage = db.Column(db.Float, nullable=False, default=0.0)
    session_data = db.Column(db.Text, nullable=True)  # JSON string for storing questions and answers
    status = db.Column(db.String(20), nullable=False, default='active')  # active, completed, abandoned
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime, nullable=True)
    
    # Relationships
    questions = db.relationship('Question', backref='quiz_session', lazy=True, cascade='all, delete-orphan')
    
    def set_session_data(self, data):
        """Store session data as JSON"""
        self.session_data = json.dumps(data)
    
    def get_session_data(self):
        """Retrieve session data from JSON"""
        if self.session_data:
            return json.loads(self.session_data)
        return {}
    
    def calculate_score(self):
        """Calculate and update score percentage"""
        if self.total_questions > 0:
            self.score_percentage = (self.correct_answers / self.total_questions) * 100
        else:
            self.score_percentage = 0.0
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'topic': self.topic,
            'skill_level': self.skill_level,
            'custom_topic': self.custom_topic,
            'total_questions': self.total_questions,
            'completed_questions': self.completed_questions,
            'correct_answers': self.correct_answers,
            'score_percentage': self.score_percentage,
            'status': self.status,
            'started_at': self.started_at.isoformat(),
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
            'questions_count': len(self.questions)
        }

class Question(db.Model):
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    quiz_session_id = db.Column(db.Integer, db.ForeignKey('quiz_sessions.id'), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    question_type = db.Column(db.String(20), nullable=False)  # MCQ, True/False, Short Answer
    options = db.Column(db.Text, nullable=True)  # JSON string for MCQ options
    correct_answer = db.Column(db.Text, nullable=False)
    user_answer = db.Column(db.Text, nullable=True)
    explanation = db.Column(db.Text, nullable=True)
    difficulty_level = db.Column(db.String(20), nullable=False)
    is_correct = db.Column(db.Boolean, nullable=True)  # True, False, or None if not answered
    answered_at = db.Column(db.DateTime, nullable=True)
    time_taken = db.Column(db.Integer, nullable=True)  # Time in seconds
    # evaluation_metadata = db.Column(db.Text, nullable=True)  # JSON string for evaluation details - temporarily disabled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def set_options(self, options_list):
        """Store options as JSON"""
        if options_list:
            self.options = json.dumps(options_list)
    
    def get_options(self):
        """Retrieve options from JSON"""
        if self.options:
            return json.loads(self.options)
        return []
    
    def check_answer(self, user_answer):
        """Check if user answer is correct using advanced evaluation"""
        self.user_answer = user_answer
        self.answered_at = datetime.utcnow()
        
        # For MCQ, extract just the letter (A, B, C, D) from answers like "A) Option text"
        if self.question_type == 'MCQ':
            # Extract first character if it's a letter (handles "A", "A)", "A. Option", etc.)
            user_answer_normalized = user_answer.strip()
            if user_answer_normalized and user_answer_normalized[0].upper() in ['A', 'B', 'C', 'D']:
                user_answer_letter = user_answer_normalized[0].upper()
            else:
                user_answer_letter = user_answer_normalized
        else:
            user_answer_letter = user_answer
        
        if EVALUATOR_AVAILABLE:
            # Use advanced answer evaluator
            evaluation_result = answer_evaluator.evaluate_answer(
                question_text=self.question_text,
                user_answer=user_answer_letter,
                correct_answer=self.correct_answer,
                question_type=self.question_type,
                options=self.get_options()
            )
            
            self.is_correct = evaluation_result['is_correct']
            
            # Store evaluation metadata
            # Store detailed evaluation results (temporarily disabled)
            # self.evaluation_metadata = json.dumps({
            #     'confidence': evaluation_result.get('confidence', 0.0),
            #     'evaluation_method': evaluation_result.get('evaluation_method', 'enhanced_text_analysis'),
            #     'answer_type': evaluation_result.get('answer_type', 'general'),
            #     'exact_match': evaluation_result.get('exact_match', False),
            #     'contains_match': evaluation_result.get('contains_match', False),
            #     'keyword_overlap': evaluation_result.get('keyword_overlap', 0.0),
            #     'feedback': evaluation_result.get('feedback', {}),
            #     'evaluation_timestamp': evaluation_result.get('evaluation_timestamp')
            # })
            
            return self.is_correct
        else:
            # Fallback to basic evaluation
            if self.question_type == 'MCQ':
                # Compare just the letter (A, B, C, D)
                self.is_correct = user_answer_letter.strip().upper() == self.correct_answer.strip().upper()
            elif self.question_type == 'True/False':
                self.is_correct = user_answer_letter.strip().lower() == self.correct_answer.strip().lower()
            else:  # Short Answer - basic contains check
                self.is_correct = self.correct_answer.strip().lower() in user_answer_letter.strip().lower()
            
            return self.is_correct
    
    def get_evaluation_details(self):
        """Get detailed evaluation metadata"""
        # Temporarily return empty dict
        return {}
        # if self.evaluation_metadata:
        #     try:
        #         return json.loads(self.evaluation_metadata)
        #     except json.JSONDecodeError:
        #         return {}
        # return {}
    
    def get_enhanced_feedback(self):
        """Get enhanced feedback from evaluation"""
        evaluation_details = self.get_evaluation_details()
        feedback = evaluation_details.get('feedback', {})
        
        return {
            'is_correct': self.is_correct,
            'confidence': evaluation_details.get('confidence', 1.0 if self.is_correct else 0.0),
            'evaluation_method': evaluation_details.get('evaluation_method', 'basic'),
            'result_message': feedback.get('result_message', ''),
            'explanation': feedback.get('explanation', self.explanation or ''),
            'hint': feedback.get('hint', ''),
            'learning_tip': feedback.get('learning_tip', ''),
            'semantic_score': evaluation_details.get('semantic_score', 0.0),
            'keyword_overlap': evaluation_details.get('keyword_overlap', 0.0)
        }
    
    def to_dict(self, include_correct_answer=False):
        result = {
            'id': self.id,
            'quiz_session_id': self.quiz_session_id,
            'question_text': self.question_text,
            'question_type': self.question_type,
            'options': self.get_options(),
            'user_answer': self.user_answer,
            'explanation': self.explanation,
            'difficulty_level': self.difficulty_level,
            'is_correct': self.is_correct,
            'answered_at': self.answered_at.isoformat() if self.answered_at else None,
            'time_taken': self.time_taken,
            'evaluation_details': self.get_evaluation_details()
        }
        
        if include_correct_answer:
            result['correct_answer'] = self.correct_answer
            
        return result

class Topic(db.Model):
    __tablename__ = 'topics'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(50), nullable=False)
    sample_content = db.Column(db.Text, nullable=True)  # Sample text for question generation
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'category': self.category,
            'is_active': self.is_active
        }

class PasswordResetToken(db.Model):
    __tablename__ = 'password_reset_tokens'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    token = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    used = db.Column(db.Boolean, default=False)
    used_at = db.Column(db.DateTime, nullable=True)
    
    # Relationship
    user = db.relationship('User', backref='reset_tokens')
    
    def __init__(self, user_id, token, expires_in_hours=24):
        self.user_id = user_id
        self.token = token
        self.expires_at = datetime.utcnow() + timedelta(hours=expires_in_hours)
    
    def is_valid(self):
        """Check if token is still valid (not expired and not used)"""
        return not self.used and datetime.utcnow() < self.expires_at
    
    def mark_as_used(self):
        """Mark token as used"""
        self.used = True
        self.used_at = datetime.utcnow()
    
    @classmethod
    def cleanup_expired(cls):
        """Remove expired tokens from database"""
        expired_tokens = cls.query.filter(cls.expires_at < datetime.utcnow()).all()
        for token in expired_tokens:
            db.session.delete(token)
        db.session.commit()
        return len(expired_tokens)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at.isoformat(),
            'expires_at': self.expires_at.isoformat(),
            'used': self.used,
            'used_at': self.used_at.isoformat() if self.used_at else None
        }

class QuestionFeedback(db.Model):
    __tablename__ = 'question_feedback'
    
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    feedback_text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # 1-5 stars
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    question = db.relationship('Question', backref='feedbacks')
    user = db.relationship('User', backref='question_feedbacks')
    
    def to_dict(self):
        return {
            'id': self.id,
            'question_id': self.question_id,
            'user_id': self.user_id,
            'username': self.user.username if self.user else 'Unknown',
            'feedback_text': self.feedback_text,
            'rating': self.rating,
            'created_at': self.created_at.isoformat()
        }

class FlaggedQuestion(db.Model):
    __tablename__ = 'flagged_questions'
    
    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    flagged_by_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reason = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')  # pending, reviewed, resolved
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    resolved_at = db.Column(db.DateTime, nullable=True)
    resolved_by_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    
    # Relationships
    question = db.relationship('Question', backref='flags')
    flagged_by = db.relationship('User', foreign_keys=[flagged_by_user_id], backref='flagged_questions')
    resolved_by = db.relationship('User', foreign_keys=[resolved_by_user_id], backref='resolved_flags')
    
    def to_dict(self):
        # Count total flags for this question
        total_flags = FlaggedQuestion.query.filter_by(question_id=self.question_id).count()
        
        # Get all users who flagged this question
        all_flags = FlaggedQuestion.query.filter_by(question_id=self.question_id).all()
        flagged_by_users = [flag.flagged_by.username for flag in all_flags if flag.flagged_by]
        
        return {
            'id': self.id,
            'question_id': self.question_id,
            'question_text': self.question.question_text if self.question else 'Unknown',
            'question_type': self.question.question_type if self.question else 'Unknown',
            'flag_reason': self.reason,
            'flag_count': total_flags,
            'flagged_by': flagged_by_users,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'resolved_at': self.resolved_at.isoformat() if self.resolved_at else None
        }