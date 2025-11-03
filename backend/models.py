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
    total_time_seconds = db.Column(db.Integer, nullable=False, default=0)  # Total time taken in seconds
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
            'total_time_seconds': self.total_time_seconds,
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
    difficulty_weight = db.Column(db.Float, nullable=False, default=1.0)  # Easy=1.0, Medium=1.5, Hard=2.0
    is_correct = db.Column(db.Boolean, nullable=True)  # True, False, or None if not answered
    answered_at = db.Column(db.DateTime, nullable=True)
    time_taken = db.Column(db.Integer, nullable=True)  # Time in seconds
    # evaluation_metadata = db.Column(db.Text, nullable=True)  # JSON string for evaluation details - temporarily disabled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __init__(self, **kwargs):
        super(Question, self).__init__(**kwargs)
        # Set difficulty weight based on difficulty level
        if hasattr(self, 'difficulty_level'):
            self.set_difficulty_weight()
    
    def set_difficulty_weight(self):
        """Set difficulty weight based on difficulty level"""
        difficulty_weights = {
            'Easy': 1.0,
            'easy': 1.0,
            'Medium': 1.5,
            'medium': 1.5,
            'Hard': 2.0,
            'hard': 2.0
        }
        self.difficulty_weight = difficulty_weights.get(self.difficulty_level, 1.0)
    
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
        
        # Normalize answers for comparison
        user_answer_normalized = str(user_answer).strip()
        correct_answer_normalized = str(self.correct_answer).strip()
        
        if self.question_type in ['MCQ', 'multiple_choice']:
            # For MCQ, we expect single letter answers (A, B, C, D)
            # Extract first character if it's a letter
            if user_answer_normalized and user_answer_normalized[0].upper() in ['A', 'B', 'C', 'D']:
                user_answer_normalized = user_answer_normalized[0].upper()
            
            if correct_answer_normalized and correct_answer_normalized[0].upper() in ['A', 'B', 'C', 'D']:
                correct_answer_normalized = correct_answer_normalized[0].upper()
            
            # Compare letters
            self.is_correct = user_answer_normalized == correct_answer_normalized
            
            print(f"[DEBUG] MCQ Evaluation - User: '{user_answer}' -> '{user_answer_normalized}', Correct: '{self.correct_answer}' -> '{correct_answer_normalized}', Result: {self.is_correct}")
            
        elif self.question_type in ['True/False', 'true_false']:
            # For True/False, normalize case
            self.is_correct = user_answer_normalized.lower() == correct_answer_normalized.lower()
            
            print(f"[DEBUG] T/F Evaluation - User: '{user_answer}' -> '{user_answer_normalized}', Correct: '{self.correct_answer}' -> '{correct_answer_normalized}', Result: {self.is_correct}")
            
        else:
            # For Short Answer and Fill-in-the-blank
            if EVALUATOR_AVAILABLE:
                # Use advanced answer evaluator
                evaluation_result = answer_evaluator.evaluate_answer(
                    question_text=self.question_text,
                    user_answer=user_answer_normalized,
                    correct_answer=correct_answer_normalized,
                    question_type=self.question_type,
                    options=self.get_options()
                )
                
                self.is_correct = evaluation_result['is_correct']
                print(f"[DEBUG] Advanced Evaluation - User: '{user_answer}', Correct: '{self.correct_answer}', Result: {self.is_correct}")
            else:
                # Fallback: basic contains check for short answers
                self.is_correct = correct_answer_normalized.lower() in user_answer_normalized.lower()
                print(f"[DEBUG] Basic Evaluation - User: '{user_answer}', Correct: '{self.correct_answer}', Result: {self.is_correct}")
        
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
            'difficulty_weight': self.difficulty_weight,
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
    flag_reason = db.Column(db.Text, nullable=False)
    flag_count = db.Column(db.Integer, default=1)
    status = db.Column(db.String(20), nullable=False, default='pending')  # pending, reviewed, resolved
    flagged_at = db.Column(db.DateTime, default=datetime.utcnow)
    resolved_at = db.Column(db.DateTime, nullable=True)
    resolved_by_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    
    # Relationships
    question = db.relationship('Question', backref='flags')
    flagged_by = db.relationship('User', foreign_keys=[flagged_by_user_id], backref='flagged_questions')
    resolved_by = db.relationship('User', foreign_keys=[resolved_by_user_id], backref='resolved_flags')
    
    def to_dict(self):
        return {
            'id': self.id,
            'question_id': self.question_id,
            'question_text': self.question.question_text if self.question else 'Unknown',
            'question_type': self.question.question_type if self.question else 'Unknown',
            'flag_reason': self.flag_reason,
            'flag_count': self.flag_count,
            'flagged_by': [self.flagged_by.username] if self.flagged_by else [],
            'status': self.status,
            'flagged_at': self.flagged_at.isoformat() if self.flagged_at else None,
            'resolved_at': self.resolved_at.isoformat() if self.resolved_at else None
        }

class QuizLeaderboard(db.Model):
    __tablename__ = 'quiz_leaderboard'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    quiz_session_id = db.Column(db.Integer, db.ForeignKey('quiz_sessions.id'), nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Float, nullable=False, default=0.0)  # Weighted score
    correct_count = db.Column(db.Integer, nullable=False, default=0)
    total_questions = db.Column(db.Integer, nullable=False, default=0)
    time_taken = db.Column(db.Integer, nullable=False, default=0)  # in seconds (must be > 0)
    avg_difficulty_weight = db.Column(db.Float, nullable=False, default=1.0)
    rank = db.Column(db.Integer, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref='leaderboard_entries')
    quiz_session = db.relationship('QuizSession', backref='leaderboard_entry')
    
    def compute_weighted_score(self, questions):
        """
        Compute weighted score from questions using the formula:
        score = sum(difficulty_weight for each correct question)
        
        This gives bonus points for harder questions:
        - Easy (1.0): 1 point per correct answer
        - Medium (1.5): 1.5 points per correct answer
        - Hard (2.0): 2 points per correct answer
        
        Tiebreaker: time_taken (lower is better), then completed_at (earlier is better)
        """
        if not questions:
            self.score = 0.0
            self.avg_difficulty_weight = 1.0
            return 0.0
        
        # Calculate weighted score: sum of difficulty weights for correct answers
        weighted_sum = 0.0
        total_weight = 0.0
        
        for question in questions:
            weight = question.difficulty_weight
            total_weight += weight
            if question.is_correct:
                weighted_sum += weight
        
        self.score = weighted_sum
        self.avg_difficulty_weight = total_weight / len(questions) if questions else 1.0
        
        # Ensure time_taken is positive (use minimal epsilon if 0)
        if self.time_taken <= 0:
            self.time_taken = 1
        
        return self.score
    
    def calculate_score(self):
        """
        Backward compatibility method - uses simple calculation
        Will be replaced by compute_weighted_score in leaderboard updates
        """
        if self.time_taken > 0:
            time_in_minutes = max(self.time_taken / 60, 0.5)
            self.score = (self.correct_count * self.avg_difficulty_weight * 100) / time_in_minutes
        else:
            self.score = 0.0
        
        return self.score
    
    def to_dict(self):
        """Convert to dictionary - SCORE REMOVED for admin leaderboard (shows recent activity only)"""
        # Determine submitted_at with proper null checking
        submitted_at = None
        if self.quiz_session and self.quiz_session.completed_at:
            submitted_at = self.quiz_session.completed_at.isoformat()
        elif self.timestamp:
            submitted_at = self.timestamp.isoformat()
        else:
            submitted_at = datetime.utcnow().isoformat()
        
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.user.username if self.user else 'Unknown',
            'email': self.user.email if self.user else '',
            'full_name': self.user.full_name if self.user else 'Unknown',
            'quiz_session_id': self.quiz_session_id,
            'topic': self.topic,
            # 'score': removed - admin leaderboard now shows recent activity, not rankings
            'correct_count': self.correct_count,
            'total_questions': self.total_questions,
            'accuracy': round((self.correct_count / self.total_questions * 100), 1) if self.total_questions > 0 else 0,
            'time_taken': self.time_taken,
            'rank': self.rank,
            'timestamp': self.timestamp.isoformat() if self.timestamp else datetime.utcnow().isoformat(),
            'submitted_at': submitted_at
        }


class Badge(db.Model):
    """Achievement badges for gamification"""
    __tablename__ = 'badges'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(50), nullable=False)  # Emoji or icon identifier
    category = db.Column(db.String(50), nullable=False)  # achievement, milestone, special
    criteria_type = db.Column(db.String(50), nullable=False)  # quiz_count, perfect_score, streak, speed, accuracy
    criteria_value = db.Column(db.Integer, nullable=False)  # Threshold value
    rarity = db.Column(db.String(20), nullable=False, default='common')  # common, rare, epic, legendary
    points = db.Column(db.Integer, nullable=False, default=10)  # Badge points value
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user_badges = db.relationship('UserBadge', backref='badge', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'icon': self.icon,
            'category': self.category,
            'criteria_type': self.criteria_type,
            'criteria_value': self.criteria_value,
            'rarity': self.rarity,
            'points': self.points,
            'created_at': self.created_at.isoformat()
        }


class UserBadge(db.Model):
    """User's earned badges"""
    __tablename__ = 'user_badges'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    badge_id = db.Column(db.Integer, db.ForeignKey('badges.id'), nullable=False)
    earned_at = db.Column(db.DateTime, default=datetime.utcnow)
    progress_data = db.Column(db.Text, nullable=True)  # JSON for tracking progress towards badge
    
    # Relationships
    user = db.relationship('User', backref='badges')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'badge_id': self.badge_id,
            'badge': self.badge.to_dict() if self.badge else None,
            'earned_at': self.earned_at.isoformat(),
            'progress_data': json.loads(self.progress_data) if self.progress_data else None
        }


class PerformanceTrend(db.Model):
    """Track user performance over time for analytics"""
    __tablename__ = 'performance_trends'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    topic = db.Column(db.String(100), nullable=True)  # Null = overall performance
    
    # Daily aggregated metrics
    quizzes_completed = db.Column(db.Integer, default=0)
    total_questions = db.Column(db.Integer, default=0)
    correct_answers = db.Column(db.Integer, default=0)
    accuracy_rate = db.Column(db.Float, default=0.0)  # Percentage
    avg_time_per_question = db.Column(db.Float, default=0.0)  # Seconds
    difficulty_distribution = db.Column(db.Text, nullable=True)  # JSON: {easy: x, medium: y, hard: z}
    
    # Streak tracking
    daily_streak = db.Column(db.Integer, default=0)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref='performance_trends')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'date': self.date.isoformat(),
            'topic': self.topic,
            'quizzes_completed': self.quizzes_completed,
            'total_questions': self.total_questions,
            'correct_answers': self.correct_answers,
            'accuracy_rate': round(self.accuracy_rate, 2),
            'avg_time_per_question': round(self.avg_time_per_question, 2),
            'difficulty_distribution': json.loads(self.difficulty_distribution) if self.difficulty_distribution else {},
            'daily_streak': self.daily_streak,
            'created_at': self.created_at.isoformat()
        }


class LearningPath(db.Model):
    """Personalized learning paths for users"""
    __tablename__ = 'learning_paths'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    topics = db.Column(db.Text, nullable=False)  # JSON array of topics
    difficulty_progression = db.Column(db.Text, nullable=False)  # JSON: recommended difficulty path
    estimated_duration_days = db.Column(db.Integer, default=30)
    current_position = db.Column(db.Integer, default=0)  # Which step user is on
    status = db.Column(db.String(20), default='active')  # active, completed, paused
    
    # Progress tracking
    total_steps = db.Column(db.Integer, default=0)
    completed_steps = db.Column(db.Integer, default=0)
    progress_percentage = db.Column(db.Float, default=0.0)
    
    # Metadata
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    completed_at = db.Column(db.DateTime, nullable=True)
    
    # Relationships
    user = db.relationship('User', backref='learning_paths')
    milestones = db.relationship('LearningMilestone', backref='learning_path', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'topics': json.loads(self.topics) if self.topics else [],
            'difficulty_progression': json.loads(self.difficulty_progression) if self.difficulty_progression else [],
            'estimated_duration_days': self.estimated_duration_days,
            'current_position': self.current_position,
            'status': self.status,
            'total_steps': self.total_steps,
            'completed_steps': self.completed_steps,
            'progress_percentage': round(self.progress_percentage, 2),
            'created_at': self.created_at.isoformat(),
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }


class LearningMilestone(db.Model):
    """Milestones within learning paths"""
    __tablename__ = 'learning_milestones'
    
    id = db.Column(db.Integer, primary_key=True)
    learning_path_id = db.Column(db.Integer, db.ForeignKey('learning_paths.id'), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    order_index = db.Column(db.Integer, nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)
    required_accuracy = db.Column(db.Float, default=70.0)  # Percentage to pass
    is_completed = db.Column(db.Boolean, default=False)
    completed_at = db.Column(db.DateTime, nullable=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'learning_path_id': self.learning_path_id,
            'name': self.name,
            'description': self.description,
            'order_index': self.order_index,
            'topic': self.topic,
            'difficulty': self.difficulty,
            'required_accuracy': self.required_accuracy,
            'is_completed': self.is_completed,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }


class MultiplayerRoom(db.Model):
    """Multiplayer quiz rooms for real-time competition"""
    __tablename__ = 'multiplayer_rooms'
    
    id = db.Column(db.Integer, primary_key=True)
    room_code = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(200), nullable=False)
    host_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    topic = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)
    num_questions = db.Column(db.Integer, default=10)
    max_players = db.Column(db.Integer, default=10)
    current_players = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default='waiting')  # waiting, in_progress, completed
    
    # Game settings
    time_per_question = db.Column(db.Integer, default=30)  # Seconds
    is_public = db.Column(db.Boolean, default=True)
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    started_at = db.Column(db.DateTime, nullable=True)
    completed_at = db.Column(db.DateTime, nullable=True)
    
    # Relationships
    host = db.relationship('User', backref='hosted_rooms')
    participants = db.relationship('MultiplayerParticipant', backref='room', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'room_code': self.room_code,
            'name': self.name,
            'host_user_id': self.host_user_id,
            'host_username': self.host.username if self.host else 'Unknown',
            'topic': self.topic,
            'difficulty': self.difficulty,
            'num_questions': self.num_questions,
            'max_players': self.max_players,
            'current_players': self.current_players,
            'status': self.status,
            'time_per_question': self.time_per_question,
            'is_public': self.is_public,
            'created_at': self.created_at.isoformat(),
            'started_at': self.started_at.isoformat() if self.started_at else None
        }


class MultiplayerParticipant(db.Model):
    """Participants in multiplayer rooms"""
    __tablename__ = 'multiplayer_participants'
    
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('multiplayer_rooms.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    score = db.Column(db.Integer, default=0)
    correct_answers = db.Column(db.Integer, default=0)
    rank = db.Column(db.Integer, nullable=True)
    is_ready = db.Column(db.Boolean, default=False)
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', backref='multiplayer_sessions')
    
    def to_dict(self):
        return {
            'id': self.id,
            'room_id': self.room_id,
            'user_id': self.user_id,
            'username': self.user.username if self.user else 'Unknown',
            'full_name': self.user.full_name if self.user else 'Unknown',
            'score': self.score,
            'correct_answers': self.correct_answers,
            'rank': self.rank,
            'is_ready': self.is_ready,
            'joined_at': self.joined_at.isoformat()
        }