from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from functools import wraps
from flask import jsonify, request
import os

def init_jwt(app):
    """Initialize JWT with the app"""
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-jwt-secret-key-here-change-in-production')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
    app.config['JWT_ALGORITHM'] = 'HS256'
    app.config['JWT_CSRF_CHECK_FORM'] = False
    app.config['JWT_CSRF_IN_COOKIES'] = False
    
    jwt = JWTManager(app)
    
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        print(f"🔍 DEBUG: Expired token - Header: {jwt_header}, Payload: {jwt_payload}")
        return jsonify({
            'error': 'Token has expired',
            'message': 'Please login again'
        }), 401
    
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        print(f"🔍 DEBUG: Invalid token - Error: {error}")
        return jsonify({
            'error': 'Invalid token',
            'message': 'Please provide a valid token'
        }), 401
    
    @jwt.unauthorized_loader
    def missing_token_callback(error):
        print(f"🔍 DEBUG: Missing token - Error: {error}")
        return jsonify({
            'error': 'Token required',
            'message': 'Please provide an access token'
        }), 401
    
    return jwt

def generate_tokens(user_id):
    """Generate access token for user"""
    access_token = create_access_token(identity=str(user_id))  # Convert to string
    return {
        'access_token': access_token,
        'token_type': 'Bearer'
    }

def auth_required(f):
    """Decorator for routes that require authentication"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Allow OPTIONS requests for CORS preflight
        if request.method == 'OPTIONS':
            return '', 204
        
        @jwt_required()
        def check_auth():
            current_user_id = int(get_jwt_identity())  # Convert back to int
            return f(current_user_id, *args, **kwargs)
        
        return check_auth()
    return decorated_function