"""
Analytics Service - Performance trends, insights, and recommendations
Provides comprehensive learning analytics and progress tracking
"""

from models import db, User, QuizSession, Question, PerformanceTrend, QuizLeaderboard
from datetime import datetime, timedelta, date
from sqlalchemy import func, and_
import json
import logging

logger = logging.getLogger(__name__)


def update_performance_trend(user_id, quiz_session_id):
    """
    Update daily performance trends after quiz completion
    Aggregates metrics for analytics dashboard
    """
    session = QuizSession.query.get(quiz_session_id)
    if not session or session.user_id != user_id:
        return None
    
    today = date.today()
    
    # Get or create today's performance trend (overall)
    overall_trend = PerformanceTrend.query.filter_by(
        user_id=user_id,
        date=today,
        topic=None
    ).first()
    
    if not overall_trend:
        overall_trend = PerformanceTrend(
            user_id=user_id,
            date=today,
            topic=None
        )
        db.session.add(overall_trend)
    
    # Get or create today's performance trend (topic-specific)
    topic_trend = PerformanceTrend.query.filter_by(
        user_id=user_id,
        date=today,
        topic=session.topic
    ).first()
    
    if not topic_trend:
        topic_trend = PerformanceTrend(
            user_id=user_id,
            date=today,
            topic=session.topic
        )
        db.session.add(topic_trend)
    
    # Update metrics for both trends
    for trend in [overall_trend, topic_trend]:
        trend.quizzes_completed += 1
        trend.total_questions += session.total_questions
        trend.correct_answers += session.correct_answers
        trend.accuracy_rate = (trend.correct_answers / trend.total_questions * 100) if trend.total_questions > 0 else 0
        
        # Calculate average time per question
        if session.total_time_seconds > 0:
            avg_time = session.total_time_seconds / session.total_questions if session.total_questions > 0 else 0
            if trend.avg_time_per_question == 0:
                trend.avg_time_per_question = avg_time
            else:
                # Running average
                total_quizzes = trend.quizzes_completed
                trend.avg_time_per_question = (
                    (trend.avg_time_per_question * (total_quizzes - 1) + avg_time) / total_quizzes
                )
        
        # Update difficulty distribution
        questions = Question.query.filter_by(quiz_session_id=quiz_session_id).all()
        difficulty_dist = json.loads(trend.difficulty_distribution) if trend.difficulty_distribution else {'easy': 0, 'medium': 0, 'hard': 0}
        
        for q in questions:
            diff_key = q.difficulty_level.lower()
            if diff_key in difficulty_dist:
                difficulty_dist[diff_key] += 1
        
        trend.difficulty_distribution = json.dumps(difficulty_dist)
        trend.updated_at = datetime.utcnow()
    
    # Update streak
    update_daily_streak(user_id, today, overall_trend)
    
    try:
        db.session.commit()
        logger.info(f"✅ Updated performance trends for user {user_id}")
        return overall_trend
    except Exception as e:
        db.session.rollback()
        logger.error(f"❌ Failed to update performance trends: {e}")
        return None


def update_daily_streak(user_id, today, trend):
    """Update user's daily quiz streak"""
    yesterday = today - timedelta(days=1)
    
    # Check if user completed quiz yesterday
    yesterday_trend = PerformanceTrend.query.filter_by(
        user_id=user_id,
        date=yesterday,
        topic=None
    ).first()
    
    if yesterday_trend and yesterday_trend.quizzes_completed > 0:
        # Continue streak
        trend.daily_streak = yesterday_trend.daily_streak + 1
    else:
        # Reset streak to 1 (today)
        trend.daily_streak = 1


def get_performance_trends(user_id, days=30, topic=None):
    """
    Get performance trends over specified period
    Returns daily aggregated metrics for charts and analysis
    Aggregates data from QuizSession table
    """
    start_date = date.today() - timedelta(days=days)
    
    # Query quiz sessions within the date range
    query = QuizSession.query.filter(
        QuizSession.user_id == user_id,
        QuizSession.status == 'completed',
        func.date(QuizSession.completed_at) >= start_date
    )
    
    if topic:
        query = query.filter_by(topic=topic)
    
    sessions = query.order_by(QuizSession.completed_at).all()
    
    if not sessions:
        return {
            'trends': [],
            'period_days': days,
            'data_points': 0,
            'current_streak': 0
        }
    
    # Aggregate by date
    daily_data = {}
    for session in sessions:
        session_date = session.completed_at.date() if session.completed_at else date.today()
        date_key = session_date.isoformat()
        
        if date_key not in daily_data:
            daily_data[date_key] = {
                'date': session_date,
                'quizzes_completed': 0,
                'total_questions': 0,
                'correct_answers': 0,
                'total_time': 0
            }
        
        daily_data[date_key]['quizzes_completed'] += 1
        daily_data[date_key]['total_questions'] += session.total_questions
        daily_data[date_key]['correct_answers'] += session.correct_answers
        daily_data[date_key]['total_time'] += session.total_time_seconds
    
    # Calculate daily metrics
    trends = []
    for date_key in sorted(daily_data.keys()):
        data = daily_data[date_key]
        accuracy_rate = (data['correct_answers'] / data['total_questions'] * 100) if data['total_questions'] > 0 else 0
        avg_time_per_question = data['total_time'] / data['total_questions'] if data['total_questions'] > 0 else 0
        
        trends.append({
            'date': data['date'].isoformat(),
            'quizzes_completed': data['quizzes_completed'],
            'total_questions': data['total_questions'],
            'correct_answers': data['correct_answers'],
            'accuracy_rate': round(accuracy_rate, 2),
            'avg_time_per_question': round(avg_time_per_question, 2),
            'id': hash(f"{user_id}_{date_key}_{topic or 'overall'}") % (10 ** 8)  # Generate consistent ID
        })
    
    # Calculate current streak (consecutive days with quizzes)
    current_streak = 1
    if trends:
        for i in range(len(trends) - 1, 0, -1):
            current_date = datetime.fromisoformat(trends[i]['date']).date()
            prev_date = datetime.fromisoformat(trends[i - 1]['date']).date()
            if (current_date - prev_date).days == 1:
                current_streak += 1
            else:
                break
    
    return {
        'trends': trends,
        'period_days': days,
        'data_points': len(trends),
        'current_streak': current_streak
    }


def get_topic_mastery_analysis(user_id):
    """
    Analyze user's mastery across different topics
    Returns heatmap data for topic performance
    """
    # Get all topics user has attempted
    topic_sessions = db.session.query(
        QuizSession.topic,
        func.count(QuizSession.id).label('quiz_count'),
        func.avg(QuizSession.score_percentage).label('avg_score'),
        func.sum(QuizSession.correct_answers).label('total_correct'),
        func.sum(QuizSession.total_questions).label('total_questions')
    ).filter_by(
        user_id=user_id,
        status='completed'
    ).group_by(QuizSession.topic).all()
    
    mastery_data = []
    
    for topic, quiz_count, avg_score, total_correct, total_questions in topic_sessions:
        accuracy = (total_correct / total_questions * 100) if total_questions > 0 else 0
        
        # Determine mastery level
        if avg_score >= 90:
            mastery_level = 'expert'
            level_color = '#10b981'  # green
        elif avg_score >= 75:
            mastery_level = 'proficient'
            level_color = '#3b82f6'  # blue
        elif avg_score >= 60:
            mastery_level = 'developing'
            level_color = '#f59e0b'  # yellow
        else:
            mastery_level = 'beginner'
            level_color = '#ef4444'  # red
        
        mastery_data.append({
            'topic': topic,
            'quiz_count': quiz_count,
            'avg_score': round(avg_score, 2),
            'accuracy': round(accuracy, 2),
            'total_correct': total_correct,
            'total_questions': total_questions,
            'mastery_level': mastery_level,
            'level_color': level_color
        })
    
    # Sort by avg_score descending
    mastery_data.sort(key=lambda x: x['avg_score'], reverse=True)
    
    # Identify strengths and weaknesses
    strengths = [t for t in mastery_data if t['avg_score'] >= 80]
    weaknesses = [t for t in mastery_data if t['avg_score'] < 60]
    
    return {
        'topics': mastery_data,
        'total_topics': len(mastery_data),
        'strengths': strengths,
        'weaknesses': weaknesses,
        'best_topic': mastery_data[0] if mastery_data else None,
        'weakest_topic': mastery_data[-1] if mastery_data else None
    }


def get_weekly_report(user_id):
    """Generate weekly performance report"""
    week_ago = date.today() - timedelta(days=7)
    
    # Get this week's quizzes
    week_sessions = QuizSession.query.filter(
        QuizSession.user_id == user_id,
        QuizSession.status == 'completed',
        QuizSession.completed_at >= datetime.combine(week_ago, datetime.min.time())
    ).all()
    
    if not week_sessions:
        return {
            'week_start': week_ago.isoformat(),
            'week_end': date.today().isoformat(),
            'quizzes_completed': 0,
            'message': 'No quizzes completed this week'
        }
    
    total_quizzes = len(week_sessions)
    total_questions = sum(s.total_questions for s in week_sessions)
    total_correct = sum(s.correct_answers for s in week_sessions)
    avg_accuracy = (total_correct / total_questions * 100) if total_questions > 0 else 0
    avg_time = sum(s.total_time_seconds for s in week_sessions) / total_quizzes if total_quizzes > 0 else 0
    
    # Compare to previous week
    two_weeks_ago = week_ago - timedelta(days=7)
    prev_week_sessions = QuizSession.query.filter(
        QuizSession.user_id == user_id,
        QuizSession.status == 'completed',
        QuizSession.completed_at >= datetime.combine(two_weeks_ago, datetime.min.time()),
        QuizSession.completed_at < datetime.combine(week_ago, datetime.min.time())
    ).all()
    
    if prev_week_sessions:
        prev_total = sum(s.correct_answers for s in prev_week_sessions)
        prev_questions = sum(s.total_questions for s in prev_week_sessions)
        prev_accuracy = (prev_total / prev_questions * 100) if prev_questions > 0 else 0
        accuracy_change = avg_accuracy - prev_accuracy
        quiz_count_change = total_quizzes - len(prev_week_sessions)
    else:
        accuracy_change = 0
        quiz_count_change = total_quizzes
    
    # Topic breakdown
    topic_breakdown = {}
    for session in week_sessions:
        if session.topic not in topic_breakdown:
            topic_breakdown[session.topic] = {
                'count': 0,
                'correct': 0,
                'total': 0
            }
        topic_breakdown[session.topic]['count'] += 1
        topic_breakdown[session.topic]['correct'] += session.correct_answers
        topic_breakdown[session.topic]['total'] += session.total_questions
    
    # Get current streak
    latest_trend = PerformanceTrend.query.filter_by(
        user_id=user_id,
        topic=None
    ).order_by(PerformanceTrend.date.desc()).first()
    
    return {
        'week_start': week_ago.isoformat(),
        'week_end': date.today().isoformat(),
        'quizzes_completed': total_quizzes,
        'total_questions': total_questions,
        'total_correct': total_correct,
        'avg_accuracy': round(avg_accuracy, 2),
        'avg_time_seconds': round(avg_time, 2),
        'accuracy_change': round(accuracy_change, 2),
        'quiz_count_change': quiz_count_change,
        'topic_breakdown': topic_breakdown,
        'current_streak': latest_trend.daily_streak if latest_trend else 0,
        'improvement_trend': 'improving' if accuracy_change > 5 else 'declining' if accuracy_change < -5 else 'stable'
    }


def get_monthly_report(user_id):
    """Generate monthly performance report"""
    month_ago = date.today() - timedelta(days=30)
    
    # Get this month's trends
    trends = PerformanceTrend.query.filter(
        PerformanceTrend.user_id == user_id,
        PerformanceTrend.date >= month_ago,
        PerformanceTrend.topic.is_(None)
    ).order_by(PerformanceTrend.date).all()
    
    if not trends:
        return {
            'period_start': month_ago.isoformat(),
            'period_end': date.today().isoformat(),
            'total_days': 30,
            'active_days': 0,
            'message': 'No activity in the last 30 days'
        }
    
    total_quizzes = sum(t.quizzes_completed for t in trends)
    total_questions = sum(t.total_questions for t in trends)
    total_correct = sum(t.correct_answers for t in trends)
    overall_accuracy = (total_correct / total_questions * 100) if total_questions > 0 else 0
    active_days = len(trends)
    
    # Calculate weekly breakdown
    weekly_data = []
    for i in range(4):  # Last 4 weeks
        week_start = date.today() - timedelta(days=(4-i)*7)
        week_end = week_start + timedelta(days=7)
        
        week_trends = [t for t in trends if week_start <= t.date < week_end]
        if week_trends:
            week_quizzes = sum(t.quizzes_completed for t in week_trends)
            week_questions = sum(t.total_questions for t in week_trends)
            week_correct = sum(t.correct_answers for t in week_trends)
            week_accuracy = (week_correct / week_questions * 100) if week_questions > 0 else 0
            
            weekly_data.append({
                'week_num': i + 1,
                'start_date': week_start.isoformat(),
                'quizzes': week_quizzes,
                'accuracy': round(week_accuracy, 2)
            })
    
    # Best and worst days
    best_day = max(trends, key=lambda t: t.accuracy_rate) if trends else None
    worst_day = min(trends, key=lambda t: t.accuracy_rate) if trends else None
    
    # Longest streak
    max_streak = max(t.daily_streak for t in trends) if trends else 0
    
    return {
        'period_start': month_ago.isoformat(),
        'period_end': date.today().isoformat(),
        'total_days': 30,
        'active_days': active_days,
        'activity_rate': round((active_days / 30) * 100, 2),
        'total_quizzes': total_quizzes,
        'total_questions': total_questions,
        'total_correct': total_correct,
        'overall_accuracy': round(overall_accuracy, 2),
        'weekly_breakdown': weekly_data,
        'best_day': {
            'date': best_day.date.isoformat(),
            'accuracy': round(best_day.accuracy_rate, 2)
        } if best_day else None,
        'worst_day': {
            'date': worst_day.date.isoformat(),
            'accuracy': round(worst_day.accuracy_rate, 2)
        } if worst_day else None,
        'longest_streak': max_streak
    }


def get_strength_weakness_analysis(user_id):
    """
    Analyze user's strengths and weaknesses
    Returns detailed insights for personalized recommendations
    """
    # Get topic mastery
    topic_mastery = get_topic_mastery_analysis(user_id)
    
    # Analyze question types
    from models import Question
    question_stats = db.session.query(
        Question.question_type,
        func.count(Question.id).label('total'),
        func.sum(func.cast(Question.is_correct, db.Integer)).label('correct')
    ).join(QuizSession).filter(
        QuizSession.user_id == user_id,
        Question.is_correct.isnot(None)
    ).group_by(Question.question_type).all()
    
    question_type_performance = []
    for q_type, total, correct in question_stats:
        accuracy = (correct / total * 100) if total > 0 else 0
        question_type_performance.append({
            'type': q_type,
            'total': total,
            'correct': correct,
            'accuracy': round(accuracy, 2)
        })
    
    # Analyze difficulty levels
    difficulty_stats = db.session.query(
        Question.difficulty_level,
        func.count(Question.id).label('total'),
        func.sum(func.cast(Question.is_correct, db.Integer)).label('correct')
    ).join(QuizSession).filter(
        QuizSession.user_id == user_id,
        Question.is_correct.isnot(None)
    ).group_by(Question.difficulty_level).all()
    
    difficulty_performance = []
    for diff, total, correct in difficulty_stats:
        accuracy = (correct / total * 100) if total > 0 else 0
        difficulty_performance.append({
            'level': diff,
            'total': total,
            'correct': correct,
            'accuracy': round(accuracy, 2)
        })
    
    # Generate recommendations
    recommendations = []
    
    # Topic recommendations
    if topic_mastery['weaknesses']:
        for weak_topic in topic_mastery['weaknesses'][:3]:
            recommendations.append({
                'type': 'topic_practice',
                'priority': 'high',
                'message': f"Focus on {weak_topic['topic']} - current accuracy: {weak_topic['accuracy']}%",
                'action': f"Take 3 more {weak_topic['topic']} quizzes to improve",
                'topic': weak_topic['topic']
            })
    
    # Question type recommendations
    weak_types = [qt for qt in question_type_performance if qt['accuracy'] < 70]
    if weak_types:
        weakest_type = min(weak_types, key=lambda x: x['accuracy'])
        recommendations.append({
            'type': 'question_type',
            'priority': 'medium',
            'message': f"Practice {weakest_type['type']} questions - current accuracy: {weakest_type['accuracy']}%",
            'action': f"Focus on quizzes with more {weakest_type['type']} questions"
        })
    
    # Difficulty recommendations
    if difficulty_performance:
        # Find optimal difficulty
        sorted_diff = sorted(difficulty_performance, key=lambda x: x['accuracy'], reverse=True)
        if sorted_diff[0]['accuracy'] >= 80:
            # Suggest moving up
            recommendations.append({
                'type': 'difficulty_progression',
                'priority': 'medium',
                'message': f"You're performing well at {sorted_diff[0]['level']} difficulty ({sorted_diff[0]['accuracy']}%)",
                'action': "Consider trying harder difficulty levels to challenge yourself"
            })
    
    return {
        'topic_mastery': topic_mastery,
        'question_type_performance': question_type_performance,
        'difficulty_performance': difficulty_performance,
        'recommendations': recommendations
    }
