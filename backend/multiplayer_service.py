"""
Multiplayer Service - Manages real-time multiplayer quiz rooms
Handles room creation, participant management, and live scoring
"""

from models import db, User, MultiplayerRoom, MultiplayerParticipant, QuizSession, Question
from datetime import datetime
import random
import string
import logging

logger = logging.getLogger(__name__)


def generate_room_code():
    """Generate a unique 6-character room code"""
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        # Check if code already exists
        existing = MultiplayerRoom.query.filter_by(room_code=code).first()
        if not existing:
            return code


def create_room(host_user_id, topic, difficulty, max_players=10, question_count=10, time_limit_per_question=30):
    """Create a new multiplayer room"""
    try:
        room_code = generate_room_code()
        
        room = MultiplayerRoom(
            room_code=room_code,
            host_user_id=host_user_id,
            topic=topic,
            difficulty=difficulty,
            max_players=max_players,
            question_count=question_count,
            time_limit_per_question=time_limit_per_question,
            status='waiting'
        )
        
        db.session.add(room)
        db.session.flush()
        
        # Add host as first participant
        host_participant = MultiplayerParticipant(
            room_id=room.id,
            user_id=host_user_id,
            is_ready=True,  # Host is ready by default
            is_host=True
        )
        
        db.session.add(host_participant)
        room.current_players = 1
        
        db.session.commit()
        
        logger.info(f"🎮 Created multiplayer room {room_code} by user {host_user_id}")
        return room
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"❌ Failed to create multiplayer room: {e}")
        return None


def join_room(room_code, user_id):
    """Join an existing multiplayer room"""
    room = MultiplayerRoom.query.filter_by(room_code=room_code).first()
    
    if not room:
        return None, "Room not found"
    
    if room.status != 'waiting':
        return None, "Room is not accepting new players"
    
    if room.current_players >= room.max_players:
        return None, "Room is full"
    
    # Check if user already in room
    existing_participant = MultiplayerParticipant.query.filter_by(
        room_id=room.id,
        user_id=user_id
    ).first()
    
    if existing_participant:
        return room, "Already in room"
    
    try:
        participant = MultiplayerParticipant(
            room_id=room.id,
            user_id=user_id,
            is_ready=False,
            is_host=False
        )
        
        db.session.add(participant)
        room.current_players += 1
        
        db.session.commit()
        
        logger.info(f"👤 User {user_id} joined room {room_code}")
        return room, "Joined successfully"
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"❌ Failed to join room: {e}")
        return None, "Failed to join room"


def leave_room(room_code, user_id):
    """Leave a multiplayer room"""
    room = MultiplayerRoom.query.filter_by(room_code=room_code).first()
    
    if not room:
        return False, "Room not found"
    
    participant = MultiplayerParticipant.query.filter_by(
        room_id=room.id,
        user_id=user_id
    ).first()
    
    if not participant:
        return False, "Not in this room"
    
    try:
        was_host = participant.is_host
        
        db.session.delete(participant)
        room.current_players -= 1
        
        # If host left and room is still waiting, assign new host
        if was_host and room.status == 'waiting' and room.current_players > 0:
            new_host = MultiplayerParticipant.query.filter_by(
                room_id=room.id
            ).first()
            if new_host:
                new_host.is_host = True
                new_host.is_ready = True
                logger.info(f"👑 User {new_host.user_id} is now host of room {room_code}")
        
        # If room is empty, delete it
        if room.current_players == 0:
            db.session.delete(room)
            logger.info(f"🗑️ Deleted empty room {room_code}")
        
        db.session.commit()
        
        logger.info(f"👋 User {user_id} left room {room_code}")
        return True, "Left successfully"
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"❌ Failed to leave room: {e}")
        return False, "Failed to leave room"


def toggle_ready_status(room_code, user_id):
    """Toggle player's ready status"""
    room = MultiplayerRoom.query.filter_by(room_code=room_code).first()
    
    if not room:
        return None
    
    participant = MultiplayerParticipant.query.filter_by(
        room_id=room.id,
        user_id=user_id
    ).first()
    
    if not participant:
        return None
    
    participant.is_ready = not participant.is_ready
    db.session.commit()
    
    logger.info(f"✓ User {user_id} ready status: {participant.is_ready} in room {room_code}")
    return participant


def check_all_ready(room_id):
    """Check if all participants are ready"""
    participants = MultiplayerParticipant.query.filter_by(room_id=room_id).all()
    
    if len(participants) < 2:  # Need at least 2 players
        return False
    
    return all(p.is_ready for p in participants)


def start_game(room_code, host_user_id):
    """Start the multiplayer game (host only)"""
    room = MultiplayerRoom.query.filter_by(room_code=room_code).first()
    
    if not room:
        return None, "Room not found"
    
    # Verify user is host
    host = MultiplayerParticipant.query.filter_by(
        room_id=room.id,
        user_id=host_user_id,
        is_host=True
    ).first()
    
    if not host:
        return None, "Only host can start the game"
    
    if room.status != 'waiting':
        return None, "Game already started"
    
    # Check if all players are ready
    if not check_all_ready(room.id):
        return None, "Not all players are ready"
    
    try:
        room.status = 'in_progress'
        room.started_at = datetime.utcnow()
        room.current_question_index = 0
        
        db.session.commit()
        
        logger.info(f"🎮 Started game in room {room_code}")
        return room, "Game started"
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"❌ Failed to start game: {e}")
        return None, "Failed to start game"


def submit_answer(room_code, user_id, question_index, user_answer, time_taken):
    """Submit an answer in a multiplayer game"""
    room = MultiplayerRoom.query.filter_by(room_code=room_code).first()
    
    if not room or room.status != 'in_progress':
        return None, "Room not found or game not in progress"
    
    participant = MultiplayerParticipant.query.filter_by(
        room_id=room.id,
        user_id=user_id
    ).first()
    
    if not participant:
        return None, "Not a participant in this room"
    
    # Validate question index
    if question_index != room.current_question_index:
        return None, "Invalid question index"
    
    try:
        # Calculate points based on correctness and time
        # Assuming we have a way to check correctness - this would need actual question data
        # For now, we'll update score and increment answers
        
        participant.answers_submitted += 1
        participant.last_answer_time = datetime.utcnow()
        
        # Update ranking based on score
        update_rankings(room.id)
        
        db.session.commit()
        
        logger.info(f"✅ User {user_id} submitted answer for question {question_index} in room {room_code}")
        return participant, "Answer submitted"
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"❌ Failed to submit answer: {e}")
        return None, "Failed to submit answer"


def update_participant_score(room_id, user_id, points_to_add, is_correct):
    """Update participant's score"""
    participant = MultiplayerParticipant.query.filter_by(
        room_id=room_id,
        user_id=user_id
    ).first()
    
    if not participant:
        return None
    
    participant.score += points_to_add
    
    if is_correct:
        participant.correct_answers += 1
    
    db.session.commit()
    
    return participant


def update_rankings(room_id):
    """Update rankings for all participants in a room"""
    participants = MultiplayerParticipant.query.filter_by(
        room_id=room_id
    ).order_by(MultiplayerParticipant.score.desc()).all()
    
    for rank, participant in enumerate(participants, 1):
        participant.rank = rank
    
    db.session.commit()


def next_question(room_code):
    """Move to next question"""
    room = MultiplayerRoom.query.filter_by(room_code=room_code).first()
    
    if not room or room.status != 'in_progress':
        return None
    
    room.current_question_index += 1
    
    # Check if game is finished
    if room.current_question_index >= room.question_count:
        room.status = 'completed'
        room.ended_at = datetime.utcnow()
        logger.info(f"🏁 Game completed in room {room_code}")
    
    db.session.commit()
    
    return room


def get_room_details(room_code, user_id=None):
    """Get detailed room information including participants"""
    room = MultiplayerRoom.query.filter_by(room_code=room_code).first()
    
    if not room:
        return None
    
    room_dict = room.to_dict()
    
    # Get participants
    participants = MultiplayerParticipant.query.filter_by(
        room_id=room.id
    ).order_by(MultiplayerParticipant.rank).all()
    
    participants_data = []
    for p in participants:
        user = User.query.get(p.user_id)
        participant_dict = p.to_dict()
        participant_dict['username'] = user.username if user else "Unknown"
        participants_data.append(participant_dict)
    
    room_dict['participants'] = participants_data
    room_dict['is_participant'] = False
    
    if user_id:
        participant = MultiplayerParticipant.query.filter_by(
            room_id=room.id,
            user_id=user_id
        ).first()
        room_dict['is_participant'] = participant is not None
        room_dict['is_host'] = participant.is_host if participant else False
        room_dict['is_ready'] = participant.is_ready if participant else False
    
    return room_dict


def get_available_rooms(topic=None, status='waiting'):
    """Get list of available rooms"""
    query = MultiplayerRoom.query.filter_by(status=status)
    
    if topic:
        query = query.filter_by(topic=topic)
    
    rooms = query.filter(
        MultiplayerRoom.current_players < MultiplayerRoom.max_players
    ).order_by(MultiplayerRoom.created_at.desc()).all()
    
    rooms_data = []
    for room in rooms:
        room_dict = room.to_dict()
        # Get host info
        host = User.query.get(room.host_user_id)
        room_dict['host_username'] = host.username if host else "Unknown"
        rooms_data.append(room_dict)
    
    return rooms_data


def get_game_results(room_code):
    """Get final results for a completed game"""
    room = MultiplayerRoom.query.filter_by(room_code=room_code).first()
    
    if not room or room.status != 'completed':
        return None
    
    # Get participants sorted by rank
    participants = MultiplayerParticipant.query.filter_by(
        room_id=room.id
    ).order_by(MultiplayerParticipant.rank).all()
    
    results = []
    for p in participants:
        user = User.query.get(p.user_id)
        results.append({
            'rank': p.rank,
            'user_id': p.user_id,
            'username': user.username if user else "Unknown",
            'score': p.score,
            'correct_answers': p.correct_answers,
            'answers_submitted': p.answers_submitted,
            'accuracy': (p.correct_answers / p.answers_submitted * 100) if p.answers_submitted > 0 else 0
        })
    
    return {
        'room_code': room.room_code,
        'topic': room.topic,
        'difficulty': room.difficulty,
        'total_questions': room.question_count,
        'started_at': room.started_at.isoformat() if room.started_at else None,
        'ended_at': room.ended_at.isoformat() if room.ended_at else None,
        'results': results,
        'winner': results[0] if results else None
    }


def cleanup_old_rooms(hours=24):
    """Clean up old completed/abandoned rooms"""
    from datetime import timedelta
    
    cutoff_time = datetime.utcnow() - timedelta(hours=hours)
    
    old_rooms = MultiplayerRoom.query.filter(
        db.or_(
            db.and_(
                MultiplayerRoom.status == 'completed',
                MultiplayerRoom.ended_at < cutoff_time
            ),
            db.and_(
                MultiplayerRoom.status == 'waiting',
                MultiplayerRoom.created_at < cutoff_time
            )
        )
    ).all()
    
    count = len(old_rooms)
    
    for room in old_rooms:
        db.session.delete(room)
    
    db.session.commit()
    
    logger.info(f"🧹 Cleaned up {count} old multiplayer rooms")
    return count
