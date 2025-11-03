"""
Learning Path Service - Manages personalized learning paths
Provides AI-recommended learning sequences based on user performance
"""

from models import db, User, QuizSession, LearningPath, LearningMilestone
from datetime import datetime
import json
import logging

logger = logging.getLogger(__name__)


def create_learning_path(user_id, name, topics, difficulty_progression, estimated_duration_days=30, description=None):
    """
    Create a new learning path for user
    """
    try:
        learning_path = LearningPath(
            user_id=user_id,
            name=name,
            description=description or f"Custom learning path: {name}",
            topics=json.dumps(topics),
            difficulty_progression=json.dumps(difficulty_progression),
            estimated_duration_days=estimated_duration_days,
            total_steps=len(topics),
            status='active'
        )
        
        db.session.add(learning_path)
        db.session.flush()  # Get the ID
        
        # Create milestones for each topic
        for i, topic in enumerate(topics):
            difficulty = difficulty_progression[i] if i < len(difficulty_progression) else 'Medium'
            
            milestone = LearningMilestone(
                learning_path_id=learning_path.id,
                name=f"{topic} - {difficulty}",
                description=f"Master {topic} at {difficulty} difficulty level",
                order_index=i,
                topic=topic,
                difficulty=difficulty,
                required_accuracy=70.0
            )
            db.session.add(milestone)
        
        db.session.commit()
        logger.info(f"✅ Created learning path '{name}' for user {user_id}")
        return learning_path
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"❌ Failed to create learning path: {e}")
        return None


def generate_recommended_path(user_id):
    """
    Generate AI-recommended learning path based on user's performance
    Identifies weak areas and creates progressive difficulty plan
    """
    user = User.query.get(user_id)
    if not user:
        return None
    
    # Get user's quiz history
    quiz_sessions = QuizSession.query.filter_by(
        user_id=user_id,
        status='completed'
    ).all()
    
    if not quiz_sessions:
        # New user - create beginner path
        return create_beginner_path(user_id, user.skill_level)
    
    # Analyze performance by topic
    topic_performance = {}
    for session in quiz_sessions:
        if session.topic not in topic_performance:
            topic_performance[session.topic] = {
                'quizzes': 0,
                'avg_accuracy': 0,
                'total_accuracy': 0
            }
        
        topic_performance[session.topic]['quizzes'] += 1
        topic_performance[session.topic]['total_accuracy'] += session.score_percentage
    
    # Calculate averages and identify weak topics
    weak_topics = []
    strong_topics = []
    
    for topic, stats in topic_performance.items():
        avg = stats['total_accuracy'] / stats['quizzes']
        stats['avg_accuracy'] = avg
        
        if avg < 60:
            weak_topics.append((topic, avg, 'Easy'))
        elif avg < 75:
            weak_topics.append((topic, avg, 'Medium'))
        else:
            strong_topics.append((topic, avg))
    
    # Create path focusing on weak areas first
    if weak_topics:
        # Sort by lowest accuracy first
        weak_topics.sort(key=lambda x: x[1])
        
        topics = [t[0] for t in weak_topics[:5]]  # Focus on top 5 weak areas
        difficulty_progression = [t[2] for t in weak_topics[:5]]
        
        # Add some strong topics for confidence building
        if strong_topics and len(topics) < 5:
            strong_topics.sort(key=lambda x: x[1], reverse=True)
            for topic, _ in strong_topics[:2]:
                topics.append(topic)
                difficulty_progression.append('Medium')
        
        path_name = "Improvement Plan - Focus on Weak Areas"
        description = f"Personalized plan to improve performance in: {', '.join(topics[:3])}"
        
    else:
        # All topics are strong - create advancement path
        topics = [t[0] for t in strong_topics[:5]]
        difficulty_progression = ['Hard'] * len(topics)
        
        path_name = "Advanced Mastery Path"
        description = "Challenge yourself with harder difficulty levels"
    
    return create_learning_path(
        user_id=user_id,
        name=path_name,
        topics=topics,
        difficulty_progression=difficulty_progression,
        estimated_duration_days=len(topics) * 3,  # 3 days per topic
        description=description
    )


def create_beginner_path(user_id, skill_level='Beginner'):
    """Create a beginner-friendly learning path"""
    beginner_topics = [
        'Mathematics',
        'Science',
        'History',
        'Computer Science',
        'Geography'
    ]
    
    if skill_level == 'Beginner':
        difficulty_progression = ['Easy'] * 5
    elif skill_level == 'Intermediate':
        difficulty_progression = ['Easy', 'Easy', 'Medium', 'Medium', 'Medium']
    else:  # Advanced
        difficulty_progression = ['Medium', 'Medium', 'Hard', 'Hard', 'Hard']
    
    return create_learning_path(
        user_id=user_id,
        name="Getting Started Path",
        topics=beginner_topics,
        difficulty_progression=difficulty_progression,
        estimated_duration_days=15,
        description=f"Introduction to quizzing at {skill_level} level"
    )


def get_user_learning_paths(user_id, status=None):
    """Get all learning paths for a user"""
    query = LearningPath.query.filter_by(user_id=user_id)
    
    if status:
        query = query.filter_by(status=status)
    
    paths = query.order_by(LearningPath.created_at.desc()).all()
    
    return [p.to_dict() for p in paths]


def get_learning_path_details(path_id, user_id):
    """Get detailed information about a learning path including milestones"""
    path = LearningPath.query.filter_by(id=path_id, user_id=user_id).first()
    
    if not path:
        return None
    
    path_dict = path.to_dict()
    
    # Get milestones
    milestones = LearningMilestone.query.filter_by(
        learning_path_id=path_id
    ).order_by(LearningMilestone.order_index).all()
    
    path_dict['milestones'] = [m.to_dict() for m in milestones]
    
    return path_dict


def update_milestone_progress(milestone_id, user_id, quiz_session_id):
    """
    Update milestone progress after quiz completion
    Check if milestone is completed based on performance
    """
    milestone = LearningMilestone.query.get(milestone_id)
    if not milestone:
        return False
    
    # Verify user owns this learning path
    learning_path = LearningPath.query.filter_by(
        id=milestone.learning_path_id,
        user_id=user_id
    ).first()
    
    if not learning_path:
        return False
    
    # Get quiz session
    quiz_session = QuizSession.query.get(quiz_session_id)
    if not quiz_session or quiz_session.user_id != user_id:
        return False
    
    # Check if quiz matches milestone criteria
    if quiz_session.topic == milestone.topic:
        # Check if accuracy meets requirement
        if quiz_session.score_percentage >= milestone.required_accuracy:
            if not milestone.is_completed:
                milestone.is_completed = True
                milestone.completed_at = datetime.utcnow()
                
                # Update learning path progress
                learning_path.completed_steps += 1
                learning_path.progress_percentage = (learning_path.completed_steps / learning_path.total_steps * 100)
                learning_path.current_position = milestone.order_index + 1
                
                # Check if path is complete
                if learning_path.completed_steps >= learning_path.total_steps:
                    learning_path.status = 'completed'
                    learning_path.completed_at = datetime.utcnow()
                
                db.session.commit()
                logger.info(f"✅ Milestone {milestone_id} completed by user {user_id}")
                return True
    
    return False


def get_next_recommended_quiz(user_id, path_id):
    """
    Get the next recommended quiz based on learning path progress
    """
    path = LearningPath.query.filter_by(id=path_id, user_id=user_id).first()
    
    if not path or path.status != 'active':
        return None
    
    # Get next incomplete milestone
    next_milestone = LearningMilestone.query.filter_by(
        learning_path_id=path_id,
        is_completed=False
    ).order_by(LearningMilestone.order_index).first()
    
    if not next_milestone:
        return None
    
    return {
        'topic': next_milestone.topic,
        'difficulty': next_milestone.difficulty,
        'milestone_id': next_milestone.id,
        'milestone_name': next_milestone.name,
        'required_accuracy': next_milestone.required_accuracy,
        'order': next_milestone.order_index,
        'total_steps': path.total_steps
    }


def pause_learning_path(path_id, user_id):
    """Pause an active learning path"""
    path = LearningPath.query.filter_by(id=path_id, user_id=user_id).first()
    
    if path and path.status == 'active':
        path.status = 'paused'
        db.session.commit()
        return True
    
    return False


def resume_learning_path(path_id, user_id):
    """Resume a paused learning path"""
    path = LearningPath.query.filter_by(id=path_id, user_id=user_id).first()
    
    if path and path.status == 'paused':
        path.status = 'active'
        db.session.commit()
        return True
    
    return False


def delete_learning_path(path_id, user_id):
    """Delete a learning path"""
    path = LearningPath.query.filter_by(id=path_id, user_id=user_id).first()
    
    if path:
        db.session.delete(path)
        db.session.commit()
        return True
    
    return False
