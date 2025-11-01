"""
Leaderboard Service - Handles all leaderboard-related computations and updates
Ensures thread-safe operations and accurate ranking calculations
"""

from models import db, QuizSession, Question, QuizLeaderboard, User
from datetime import datetime, timedelta
from sqlalchemy import desc, asc, or_
from sqlalchemy.orm import joinedload
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def compute_weighted_score(questions):
    """
    Compute weighted score from a list of questions.
    
    Formula: score = sum(difficulty_weight for each correct question)
    - Easy (1.0): 1 point per correct answer
    - Medium (1.5): 1.5 points per correct answer  
    - Hard (2.0): 2 points per correct answer
    
    Args:
        questions: List of Question objects
        
    Returns:
        tuple: (weighted_score, avg_difficulty_weight)
    """
    if not questions:
        return 0.0, 1.0
    
    weighted_sum = 0.0
    total_weight = 0.0
    
    for question in questions:
        weight = question.difficulty_weight
        total_weight += weight
        if question.is_correct:
            weighted_sum += weight
    
    avg_difficulty_weight = total_weight / len(questions) if questions else 1.0
    
    return weighted_sum, avg_difficulty_weight


def update_leaderboard_entry(quiz_session_id, emit_event=None):
    """
    Create or update leaderboard entry for a completed quiz session.
    This is called when a quiz is completed.
    
    Args:
        quiz_session_id: ID of the completed quiz session
        emit_event: Optional WebSocket emit function for real-time updates
        
    Returns:
        QuizLeaderboard entry or None if failed
    """
    try:
        # Get quiz session with questions
        quiz_session = QuizSession.query.options(
            joinedload(QuizSession.questions)
        ).filter_by(id=quiz_session_id).first()
        
        if not quiz_session:
            logger.error(f"Quiz session {quiz_session_id} not found")
            return None
        
        if quiz_session.status != 'completed':
            logger.warning(f"Quiz session {quiz_session_id} is not completed (status: {quiz_session.status})")
            return None
        
        # Check if leaderboard entry already exists
        leaderboard_entry = QuizLeaderboard.query.filter_by(
            quiz_session_id=quiz_session_id
        ).first()
        
        # Get all questions for this session
        questions = quiz_session.questions
        
        # Compute weighted score
        weighted_score, avg_difficulty_weight = compute_weighted_score(questions)
        
        # Calculate total time from quiz session
        total_time = quiz_session.total_time_seconds
        if total_time <= 0:
            # Fallback: sum individual question times
            total_time = sum([q.time_taken or 0 for q in questions])
            if total_time <= 0:
                total_time = 1  # Minimum 1 second to avoid division issues
        
        if leaderboard_entry:
            # Update existing entry
            leaderboard_entry.score = weighted_score
            leaderboard_entry.correct_count = quiz_session.correct_answers
            leaderboard_entry.total_questions = quiz_session.total_questions
            leaderboard_entry.time_taken = total_time
            leaderboard_entry.avg_difficulty_weight = avg_difficulty_weight
            leaderboard_entry.timestamp = quiz_session.completed_at or datetime.utcnow()
            
            logger.info(f"Updated leaderboard entry for quiz {quiz_session_id}, score: {weighted_score}")
        else:
            # Create new entry
            leaderboard_entry = QuizLeaderboard(
                user_id=quiz_session.user_id,
                quiz_session_id=quiz_session_id,
                topic=quiz_session.topic,
                score=weighted_score,
                correct_count=quiz_session.correct_answers,
                total_questions=quiz_session.total_questions,
                time_taken=total_time,
                avg_difficulty_weight=avg_difficulty_weight,
                timestamp=quiz_session.completed_at or datetime.utcnow()
            )
            db.session.add(leaderboard_entry)
            
            logger.info(f"Created leaderboard entry for quiz {quiz_session_id}, score: {weighted_score}")
        
        db.session.commit()
        
        # Recalculate ranks for the same topic
        recalculate_ranks(topic=quiz_session.topic)
        
        # Emit WebSocket event for real-time update
        if emit_event:
            try:
                emit_event('leaderboard:update', {
                    'topic': quiz_session.topic,
                    'entry': leaderboard_entry.to_dict(),
                    'timestamp': datetime.utcnow().isoformat()
                }, broadcast=True)
                logger.info(f"Emitted leaderboard update event for topic: {quiz_session.topic}")
            except Exception as e:
                logger.error(f"Failed to emit WebSocket event: {e}")
        
        return leaderboard_entry
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to update leaderboard entry for quiz {quiz_session_id}: {e}")
        return None


def recalculate_ranks(topic=None, quiz_id=None):
    """
    Recalculate ranks for all leaderboard entries.
    Ordering: score (desc), time_taken (asc), completed_at (asc)
    
    Args:
        topic: Optional topic filter - recalculate only for specific topic
        quiz_id: Optional quiz filter - recalculate only for specific quiz
    """
    try:
        # Build query
        query = QuizLeaderboard.query.join(QuizSession)
        
        if topic:
            query = query.filter(QuizLeaderboard.topic == topic)
        
        if quiz_id:
            query = query.filter(QuizLeaderboard.quiz_session_id == quiz_id)
        
        # Order by: score (desc), time_taken (asc), completed_at (asc)
        entries = query.order_by(
            desc(QuizLeaderboard.score),
            asc(QuizLeaderboard.time_taken),
            asc(QuizSession.completed_at)
        ).all()
        
        # Assign ranks
        for rank, entry in enumerate(entries, start=1):
            entry.rank = rank
        
        db.session.commit()
        
        logger.info(f"Recalculated ranks for {len(entries)} entries" + 
                   (f" (topic: {topic})" if topic else "") +
                   (f" (quiz_id: {quiz_id})" if quiz_id else ""))
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to recalculate ranks: {e}")


def get_live_rankings(topic=None, quiz_id=None, limit=50, offset=0, search=None):
    """
    Get live leaderboard rankings with filtering and pagination.
    
    Args:
        topic: Filter by topic
        quiz_id: Filter by quiz session ID
        limit: Number of entries to return
        offset: Offset for pagination
        search: Search by username or email
        
    Returns:
        dict: {entries: list, total: int}
    """
    try:
        # Build query with joins
        query = QuizLeaderboard.query.join(
            User, QuizLeaderboard.user_id == User.id
        ).join(
            QuizSession, QuizLeaderboard.quiz_session_id == QuizSession.id
        ).filter(
            QuizSession.status == 'completed'  # Only completed sessions
        )
        
        # Apply filters
        if topic:
            query = query.filter(QuizLeaderboard.topic == topic)
        
        if quiz_id:
            query = query.filter(QuizLeaderboard.quiz_session_id == quiz_id)
        
        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    User.username.ilike(search_pattern),
                    User.email.ilike(search_pattern),
                    User.full_name.ilike(search_pattern)
                )
            )
        
        # Get total count
        total = query.count()
        
        # Order by rank (or fallback to score/time/date ordering)
        entries = query.order_by(
            asc(QuizLeaderboard.rank),
            desc(QuizLeaderboard.score),
            asc(QuizLeaderboard.time_taken),
            asc(QuizSession.completed_at)
        ).limit(limit).offset(offset).all()
        
        return {
            'entries': [entry.to_dict() for entry in entries],
            'total': total,
            'limit': limit,
            'offset': offset
        }
        
    except Exception as e:
        logger.error(f"Failed to get live rankings: {e}")
        return {
            'entries': [],
            'total': 0,
            'limit': limit,
            'offset': offset,
            'error': str(e)
        }


def get_user_leaderboard_stats(user_id):
    """
    Get comprehensive leaderboard statistics for a specific user.
    
    Args:
        user_id: User ID
        
    Returns:
        dict: User leaderboard statistics
    """
    try:
        user = User.query.get(user_id)
        if not user:
            return None
        
        # Get all leaderboard entries for user
        entries = QuizLeaderboard.query.filter_by(user_id=user_id).all()
        
        if not entries:
            return {
                'user_id': user_id,
                'username': user.username,
                'total_entries': 0,
                'best_rank': None,
                'avg_rank': None,
                'total_score': 0,
                'avg_score': 0,
                'topics': []
            }
        
        # Calculate statistics
        ranks = [e.rank for e in entries if e.rank]
        scores = [e.score for e in entries]
        topics = {}
        
        for entry in entries:
            if entry.topic not in topics:
                topics[entry.topic] = {
                    'topic': entry.topic,
                    'entries': 0,
                    'best_rank': entry.rank,
                    'avg_score': 0,
                    'total_score': 0
                }
            
            topics[entry.topic]['entries'] += 1
            topics[entry.topic]['total_score'] += entry.score
            
            if entry.rank and (not topics[entry.topic]['best_rank'] or entry.rank < topics[entry.topic]['best_rank']):
                topics[entry.topic]['best_rank'] = entry.rank
        
        # Calculate averages
        for topic_stats in topics.values():
            topic_stats['avg_score'] = topic_stats['total_score'] / topic_stats['entries']
        
        return {
            'user_id': user_id,
            'username': user.username,
            'full_name': user.full_name,
            'email': user.email,
            'total_entries': len(entries),
            'best_rank': min(ranks) if ranks else None,
            'avg_rank': sum(ranks) / len(ranks) if ranks else None,
            'total_score': sum(scores),
            'avg_score': sum(scores) / len(scores) if scores else 0,
            'topics': list(topics.values())
        }
        
    except Exception as e:
        logger.error(f"Failed to get user leaderboard stats for user {user_id}: {e}")
        return None


def cleanup_incomplete_sessions(hours=24):
    """
    Clean up abandoned quiz sessions and their leaderboard entries.
    
    Args:
        hours: Remove sessions older than this many hours that are still 'active'
    """
    try:
        cutoff_time = datetime.utcnow() - timedelta(hours=hours)
        
        # Find abandoned sessions
        abandoned_sessions = QuizSession.query.filter(
            QuizSession.status == 'active',
            QuizSession.started_at < cutoff_time
        ).all()
        
        # Mark as abandoned
        for session in abandoned_sessions:
            session.status = 'abandoned'
        
        db.session.commit()
        
        logger.info(f"Cleaned up {len(abandoned_sessions)} abandoned sessions")
        return len(abandoned_sessions)
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to cleanup incomplete sessions: {e}")
        return 0


def get_aggregated_user_leaderboard(topic=None, limit=50, offset=0, search=None):
    """
    Get aggregated leaderboard with user statistics (not individual quiz entries).
    Each user appears once with their aggregated stats across all quizzes.
    
    Args:
        topic: Optional topic filter
        limit: Number of users to return
        offset: Offset for pagination
        search: Search by username/email/full_name
        
    Returns:
        dict: {leaderboard: list, total_users: int}
    """
    try:
        from sqlalchemy import func
        
        # Base query - get all users who have completed quizzes
        query = db.session.query(User.id).join(
            QuizLeaderboard, User.id == QuizLeaderboard.user_id
        ).distinct()
        
        # Apply topic filter
        if topic:
            query = query.filter(QuizLeaderboard.topic == topic)
        
        # Apply search filter
        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                    User.username.ilike(search_pattern),
                    User.email.ilike(search_pattern),
                    User.full_name.ilike(search_pattern)
                )
            )
        
        # Get all matching user IDs
        user_ids = [row[0] for row in query.all()]
        
        # Build user statistics
        user_stats = []
        for user_id in user_ids:
            user = User.query.get(user_id)
            if not user:
                continue
            
            # Get all leaderboard entries for this user (filtered by topic if specified)
            entries_query = QuizLeaderboard.query.filter_by(user_id=user_id)
            if topic:
                entries_query = entries_query.filter_by(topic=topic)
            
            entries = entries_query.all()
            if not entries:
                continue
            
            # Calculate aggregated statistics
            total_quizzes = len(entries)
            total_questions = sum(e.total_questions for e in entries)
            total_correct = sum(e.correct_count for e in entries)
            total_time = sum(e.time_taken for e in entries)
            scores = [e.score for e in entries]
            
            # Average score (as percentage)
            average_score = (total_correct / total_questions * 100) if total_questions > 0 else 0
            average_time = total_time / total_quizzes if total_quizzes > 0 else 0
            
            # Best performance
            best_entry = max(entries, key=lambda e: (e.score, -e.time_taken))
            best_score = (best_entry.correct_count / best_entry.total_questions * 100) if best_entry.total_questions > 0 else 0
            
            # Recent quizzes (last 5)
            recent_entries = sorted(entries, key=lambda e: e.timestamp, reverse=True)[:5]
            recent_quizzes = [
                {
                    'quiz_id': e.quiz_session_id,
                    'topic': e.topic,
                    'score': round((e.correct_count / e.total_questions * 100), 1) if e.total_questions > 0 else 0,
                    'time_taken': e.time_taken,
                    'completed_at': e.timestamp.isoformat()
                }
                for e in recent_entries
            ]
            
            user_stats.append({
                'user_id': user_id,
                'username': user.username,
                'full_name': user.full_name,
                'email': user.email,
                'total_quizzes': total_quizzes,
                'total_questions': total_questions,
                'total_correct': total_correct,
                'average_score': round(average_score, 1),
                'total_time': total_time,
                'average_time': round(average_time, 1),
                'best_score': round(best_score, 1),
                'best_quiz_id': best_entry.quiz_session_id,
                'best_quiz_time': best_entry.time_taken,
                'recent_quizzes': recent_quizzes
            })
        
        # Sort by average_score (desc), then average_time (asc)
        user_stats.sort(key=lambda x: (-x['average_score'], x['average_time']))
        
        # Assign ranks
        for i, user_stat in enumerate(user_stats, start=1):
            user_stat['rank'] = i
        
        # Apply pagination
        total_users = len(user_stats)
        paginated_stats = user_stats[offset:offset+limit]
        
        logger.info(f"✅ Aggregated leaderboard: {len(paginated_stats)} users (total: {total_users})")
        
        return {
            'leaderboard': paginated_stats,
            'total_users': total_users
        }
        
    except Exception as e:
        logger.error(f"Failed to get aggregated user leaderboard: {e}")
        import traceback
        traceback.print_exc()
        return {
            'leaderboard': [],
            'total_users': 0,
            'error': str(e)
        }
        
        logger.info(f"Marked {len(abandoned_sessions)} sessions as abandoned")
        
        return len(abandoned_sessions)
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to cleanup incomplete sessions: {e}")
        return 0
