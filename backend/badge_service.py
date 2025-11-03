"""
Badge Service - Manages achievement badges and gamification
Handles badge awarding, progress tracking, and user achievements
"""

from models import db, Badge, UserBadge, User, QuizSession, QuizLeaderboard, PerformanceTrend
from datetime import datetime, timedelta
from sqlalchemy import func
import json
import logging

logger = logging.getLogger(__name__)


def initialize_badges():
    """Initialize default badges in the database"""
    default_badges = [
        # First Achievements
        {
            'name': 'First Quiz',
            'description': 'Complete your first quiz',
            'icon': '🎯',
            'category': 'milestone',
            'criteria_type': 'quiz_count',
            'criteria_value': 1,
            'rarity': 'common',
            'points': 10
        },
        {
            'name': 'Quiz Master',
            'description': 'Complete 10 quizzes',
            'icon': '📚',
            'category': 'milestone',
            'criteria_type': 'quiz_count',
            'criteria_value': 10,
            'rarity': 'common',
            'points': 25
        },
        {
            'name': 'Quiz Legend',
            'description': 'Complete 50 quizzes',
            'icon': '👑',
            'category': 'milestone',
            'criteria_type': 'quiz_count',
            'criteria_value': 50,
            'rarity': 'rare',
            'points': 100
        },
        {
            'name': 'Quiz Titan',
            'description': 'Complete 100 quizzes',
            'icon': '🏆',
            'category': 'milestone',
            'criteria_type': 'quiz_count',
            'criteria_value': 100,
            'rarity': 'epic',
            'points': 250
        },
        
        # Perfect Score Badges
        {
            'name': 'Perfect Score',
            'description': 'Get 100% on any quiz',
            'icon': '⭐',
            'category': 'achievement',
            'criteria_type': 'perfect_score',
            'criteria_value': 1,
            'rarity': 'common',
            'points': 20
        },
        {
            'name': 'Perfectionist',
            'description': 'Get 100% on 5 quizzes',
            'icon': '💎',
            'category': 'achievement',
            'criteria_type': 'perfect_score',
            'criteria_value': 5,
            'rarity': 'rare',
            'points': 75
        },
        {
            'name': 'Flawless Victory',
            'description': 'Get 100% on 10 quizzes',
            'icon': '🌟',
            'category': 'achievement',
            'criteria_type': 'perfect_score',
            'criteria_value': 10,
            'rarity': 'epic',
            'points': 150
        },
        
        # Speed Badges
        {
            'name': 'Speed Demon',
            'description': 'Complete a quiz in under 2 minutes',
            'icon': '⚡',
            'category': 'achievement',
            'criteria_type': 'speed',
            'criteria_value': 120,  # seconds
            'rarity': 'rare',
            'points': 50
        },
        {
            'name': 'Lightning Fast',
            'description': 'Complete 5 quizzes in under 2 minutes each',
            'icon': '🔥',
            'category': 'achievement',
            'criteria_type': 'speed_streak',
            'criteria_value': 5,
            'rarity': 'epic',
            'points': 150
        },
        
        # Streak Badges
        {
            'name': 'On Fire',
            'description': 'Get 5 correct answers in a row',
            'icon': '🔥',
            'category': 'achievement',
            'criteria_type': 'streak',
            'criteria_value': 5,
            'rarity': 'common',
            'points': 15
        },
        {
            'name': 'Unstoppable',
            'description': 'Get 10 correct answers in a row',
            'icon': '💪',
            'category': 'achievement',
            'criteria_type': 'streak',
            'criteria_value': 10,
            'rarity': 'rare',
            'points': 50
        },
        {
            'name': 'Legendary Streak',
            'description': 'Get 20 correct answers in a row',
            'icon': '🚀',
            'category': 'achievement',
            'criteria_type': 'streak',
            'criteria_value': 20,
            'rarity': 'legendary',
            'points': 200
        },
        
        # Daily Streak
        {
            'name': 'Daily Habit',
            'description': 'Complete quizzes on 7 consecutive days',
            'icon': '📅',
            'category': 'achievement',
            'criteria_type': 'daily_streak',
            'criteria_value': 7,
            'rarity': 'rare',
            'points': 75
        },
        {
            'name': 'Dedicated Learner',
            'description': 'Complete quizzes on 30 consecutive days',
            'icon': '🎓',
            'category': 'achievement',
            'criteria_type': 'daily_streak',
            'criteria_value': 30,
            'rarity': 'epic',
            'points': 250
        },
        
        # Accuracy Badges
        {
            'name': 'Sharpshooter',
            'description': 'Maintain 90%+ accuracy over 10 quizzes',
            'icon': '🎯',
            'category': 'achievement',
            'criteria_type': 'high_accuracy',
            'criteria_value': 90,
            'rarity': 'rare',
            'points': 100
        },
        
        # Topic Master Badges
        {
            'name': 'Mathematics Master',
            'description': 'Complete 10 Mathematics quizzes with 80%+ accuracy',
            'icon': '🔢',
            'category': 'achievement',
            'criteria_type': 'topic_master',
            'criteria_value': 10,
            'rarity': 'rare',
            'points': 75
        },
        {
            'name': 'Science Genius',
            'description': 'Complete 10 Science quizzes with 80%+ accuracy',
            'icon': '🔬',
            'category': 'achievement',
            'criteria_type': 'topic_master',
            'criteria_value': 10,
            'rarity': 'rare',
            'points': 75
        },
        {
            'name': 'History Expert',
            'description': 'Complete 10 History quizzes with 80%+ accuracy',
            'icon': '📖',
            'category': 'achievement',
            'criteria_type': 'topic_master',
            'criteria_value': 10,
            'rarity': 'rare',
            'points': 75
        },
        
        # Special Badges
        {
            'name': 'Early Bird',
            'description': 'Complete a quiz before 8 AM',
            'icon': '🌅',
            'category': 'special',
            'criteria_type': 'early_quiz',
            'criteria_value': 1,
            'rarity': 'common',
            'points': 20
        },
        {
            'name': 'Night Owl',
            'description': 'Complete a quiz after midnight',
            'icon': '🦉',
            'category': 'special',
            'criteria_type': 'late_quiz',
            'criteria_value': 1,
            'rarity': 'common',
            'points': 20
        },
        {
            'name': 'Comeback King',
            'description': 'Improve your score by 30%+ on a retaken quiz',
            'icon': '↗️',
            'category': 'special',
            'criteria_type': 'improvement',
            'criteria_value': 30,
            'rarity': 'rare',
            'points': 50
        }
    ]
    
    for badge_data in default_badges:
        existing = Badge.query.filter_by(name=badge_data['name']).first()
        if not existing:
            badge = Badge(**badge_data)
            db.session.add(badge)
    
    try:
        db.session.commit()
        logger.info(f"✅ Initialized {len(default_badges)} badges")
    except Exception as e:
        db.session.rollback()
        logger.error(f"❌ Failed to initialize badges: {e}")


def check_and_award_badges(user_id, quiz_session_id=None):
    """
    Check if user has earned any new badges based on their performance
    Returns list of newly awarded badges
    """
    user = User.query.get(user_id)
    if not user:
        return []
    
    newly_awarded = []
    
    # Get user's existing badges
    existing_badge_ids = [ub.badge_id for ub in UserBadge.query.filter_by(user_id=user_id).all()]
    
    # Get all available badges
    all_badges = Badge.query.all()
    
    for badge in all_badges:
        if badge.id in existing_badge_ids:
            continue  # User already has this badge
        
        # Check if user meets criteria
        if check_badge_criteria(user_id, badge, quiz_session_id):
            # Award badge
            user_badge = UserBadge(
                user_id=user_id,
                badge_id=badge.id,
                earned_at=datetime.utcnow()
            )
            db.session.add(user_badge)
            newly_awarded.append(badge)
            logger.info(f"🏅 Badge awarded: {badge.name} to user {user_id}")
    
    if newly_awarded:
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            logger.error(f"❌ Failed to award badges: {e}")
            return []
    
    return newly_awarded


def check_badge_criteria(user_id, badge, quiz_session_id=None):
    """Check if user meets specific badge criteria"""
    criteria_type = badge.criteria_type
    criteria_value = badge.criteria_value
    
    if criteria_type == 'quiz_count':
        completed_count = QuizSession.query.filter_by(
            user_id=user_id, 
            status='completed'
        ).count()
        return completed_count >= criteria_value
    
    elif criteria_type == 'perfect_score':
        perfect_scores = QuizSession.query.filter_by(
            user_id=user_id, 
            status='completed'
        ).filter(QuizSession.score_percentage >= 100).count()
        return perfect_scores >= criteria_value
    
    elif criteria_type == 'speed':
        if quiz_session_id:
            session = QuizSession.query.get(quiz_session_id)
            if session and session.total_time_seconds <= criteria_value:
                return True
        return False
    
    elif criteria_type == 'speed_streak':
        # Check last N quizzes all completed within time limit
        recent_sessions = QuizSession.query.filter_by(
            user_id=user_id, 
            status='completed'
        ).order_by(QuizSession.completed_at.desc()).limit(criteria_value).all()
        
        if len(recent_sessions) < criteria_value:
            return False
        
        return all(s.total_time_seconds <= 120 for s in recent_sessions)
    
    elif criteria_type == 'streak':
        # Check consecutive correct answers across questions
        # This would need Question table data
        from models import Question
        recent_questions = db.session.query(Question).join(
            QuizSession
        ).filter(
            QuizSession.user_id == user_id,
            Question.is_correct.isnot(None)
        ).order_by(Question.answered_at.desc()).limit(criteria_value).all()
        
        if len(recent_questions) < criteria_value:
            return False
        
        return all(q.is_correct for q in recent_questions)
    
    elif criteria_type == 'daily_streak':
        # Check PerformanceTrend for consecutive days
        trends = PerformanceTrend.query.filter_by(
            user_id=user_id
        ).filter(PerformanceTrend.quizzes_completed > 0).order_by(
            PerformanceTrend.date.desc()
        ).limit(criteria_value).all()
        
        if len(trends) < criteria_value:
            return False
        
        # Check if dates are consecutive
        for i in range(len(trends) - 1):
            date_diff = (trends[i].date - trends[i+1].date).days
            if date_diff != 1:
                return False
        return True
    
    elif criteria_type == 'high_accuracy':
        # Check average accuracy over last 10 quizzes
        recent_sessions = QuizSession.query.filter_by(
            user_id=user_id, 
            status='completed'
        ).order_by(QuizSession.completed_at.desc()).limit(10).all()
        
        if len(recent_sessions) < 10:
            return False
        
        avg_accuracy = sum(s.score_percentage for s in recent_sessions) / len(recent_sessions)
        return avg_accuracy >= criteria_value
    
    elif criteria_type == 'topic_master':
        # Extract topic from badge name
        topic_map = {
            'Mathematics Master': 'Mathematics',
            'Science Genius': 'Science',
            'History Expert': 'History'
        }
        topic = topic_map.get(badge.name)
        if not topic:
            return False
        
        topic_sessions = QuizSession.query.filter_by(
            user_id=user_id,
            topic=topic,
            status='completed'
        ).filter(QuizSession.score_percentage >= 80).count()
        
        return topic_sessions >= criteria_value
    
    elif criteria_type == 'early_quiz':
        if quiz_session_id:
            session = QuizSession.query.get(quiz_session_id)
            if session and session.completed_at:
                hour = session.completed_at.hour
                return hour < 8
        return False
    
    elif criteria_type == 'late_quiz':
        if quiz_session_id:
            session = QuizSession.query.get(quiz_session_id)
            if session and session.completed_at:
                hour = session.completed_at.hour
                return hour >= 0 and hour < 6
        return False
    
    elif criteria_type == 'improvement':
        # Check improvement on retaken quiz
        if quiz_session_id:
            session = QuizSession.query.get(quiz_session_id)
            if not session:
                return False
            
            # Find previous attempt on same topic
            previous = QuizSession.query.filter_by(
                user_id=user_id,
                topic=session.topic,
                status='completed'
            ).filter(
                QuizSession.id != quiz_session_id,
                QuizSession.completed_at < session.completed_at
            ).order_by(QuizSession.completed_at.desc()).first()
            
            if previous:
                improvement = session.score_percentage - previous.score_percentage
                return improvement >= criteria_value
        return False
    
    return False


def get_user_badges(user_id):
    """Get all badges earned by user with details"""
    user_badges = UserBadge.query.filter_by(user_id=user_id).join(Badge).all()
    
    badges_data = []
    total_points = 0
    
    for ub in user_badges:
        badge_dict = ub.to_dict()
        badges_data.append(badge_dict)
        if ub.badge:
            total_points += ub.badge.points
    
    return {
        'badges': badges_data,
        'total_badges': len(badges_data),
        'total_points': total_points
    }


def get_badge_progress(user_id):
    """Get user's progress towards unearned badges"""
    existing_badge_ids = [ub.badge_id for ub in UserBadge.query.filter_by(user_id=user_id).all()]
    available_badges = Badge.query.filter(~Badge.id.in_(existing_badge_ids)).all()
    
    progress_data = []
    
    for badge in available_badges:
        current_value = get_current_badge_progress_value(user_id, badge)
        progress_percentage = min(100, (current_value / badge.criteria_value * 100)) if badge.criteria_value > 0 else 0
        
        progress_data.append({
            'badge': badge.to_dict(),
            'current_value': current_value,
            'required_value': badge.criteria_value,
            'progress_percentage': round(progress_percentage, 2),
            'is_close': progress_percentage >= 80
        })
    
    # Sort by progress percentage (closest to completion first)
    progress_data.sort(key=lambda x: x['progress_percentage'], reverse=True)
    
    return progress_data


def get_current_badge_progress_value(user_id, badge):
    """Get current progress value for a specific badge criteria"""
    criteria_type = badge.criteria_type
    
    if criteria_type == 'quiz_count':
        return QuizSession.query.filter_by(user_id=user_id, status='completed').count()
    
    elif criteria_type == 'perfect_score':
        return QuizSession.query.filter_by(
            user_id=user_id, 
            status='completed'
        ).filter(QuizSession.score_percentage >= 100).count()
    
    elif criteria_type == 'speed_streak':
        recent_sessions = QuizSession.query.filter_by(
            user_id=user_id, 
            status='completed'
        ).order_by(QuizSession.completed_at.desc()).limit(badge.criteria_value).all()
        return sum(1 for s in recent_sessions if s.total_time_seconds <= 120)
    
    elif criteria_type == 'streak':
        from models import Question
        recent_questions = db.session.query(Question).join(
            QuizSession
        ).filter(
            QuizSession.user_id == user_id,
            Question.is_correct.isnot(None)
        ).order_by(Question.answered_at.desc()).limit(badge.criteria_value).all()
        
        streak = 0
        for q in recent_questions:
            if q.is_correct:
                streak += 1
            else:
                break
        return streak
    
    elif criteria_type == 'topic_master':
        topic_map = {
            'Mathematics Master': 'Mathematics',
            'Science Genius': 'Science',
            'History Expert': 'History'
        }
        topic = topic_map.get(badge.name)
        if not topic:
            return 0
        
        return QuizSession.query.filter_by(
            user_id=user_id,
            topic=topic,
            status='completed'
        ).filter(QuizSession.score_percentage >= 80).count()
    
    return 0
