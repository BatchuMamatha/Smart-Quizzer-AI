import sys
from app import create_app
from models import db, QuizLeaderboard, QuizSession, User

app, socketio = create_app()

with app.app_context():
    # Check QuizLeaderboard entries
    leaderboard_count = QuizLeaderboard.query.count()
    print(f"Total QuizLeaderboard entries: {leaderboard_count}")
    
    if leaderboard_count > 0:
        print("\nSample leaderboard entries:")
        entries = QuizLeaderboard.query.limit(5).all()
        for entry in entries:
            user = User.query.get(entry.user_id)
            print(f"  - User: {user.username if user else 'Unknown'}, Score: {entry.score}, Time: {entry.time_taken}s, Quiz: {entry.quiz_session_id}")
    else:
        print("\nNo leaderboard entries found!")
        
    # Check completed quiz sessions
    completed_sessions = QuizSession.query.filter(
        QuizSession.completed_at.isnot(None)
    ).count()
    print(f"\nTotal completed quiz sessions: {completed_sessions}")
    
    if completed_sessions > 0:
        print("\nSample completed sessions:")
        sessions = QuizSession.query.filter(QuizSession.completed_at.isnot(None)).limit(5).all()
        for session in sessions:
            user = User.query.get(session.user_id)
            has_leaderboard = QuizLeaderboard.query.filter_by(quiz_session_id=session.id).first() is not None
            print(f"  - Session {session.id}: User: {user.username if user else 'Unknown'}, Topic: {session.topic}, Score: {session.score}, Has Leaderboard: {has_leaderboard}")
