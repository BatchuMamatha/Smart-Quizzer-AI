"""
Comprehensive Error Handling and Fallback System for Smart Quizzer AI
Provides robust error handling, validation, and graceful degradation
"""

import logging
import functools
import traceback
import time
from typing import Dict, Any, Optional, Callable, List
from datetime import datetime
from enum import Enum
import json
import os

class ErrorSeverity(Enum):
    """Error severity levels for proper handling and logging"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class ErrorCategory(Enum):
    """Error categories for better classification and handling"""
    VALIDATION = "validation"
    AUTHENTICATION = "authentication"
    AI_SERVICE = "ai_service"
    DATABASE = "database"
    FILE_PROCESSING = "file_processing"
    NETWORK = "network"
    SYSTEM = "system"
    USER_INPUT = "user_input"
    BUSINESS_LOGIC = "business_logic"

class SmartQuizzerError(Exception):
    """Base custom exception class with enhanced error information"""
    
    def __init__(self, message: str, category: ErrorCategory, severity: ErrorSeverity, 
                 details: Optional[Dict] = None, user_message: Optional[str] = None):
        self.message = message
        self.category = category
        self.severity = severity
        self.details = details or {}
        self.user_message = user_message or self._generate_user_friendly_message()
        self.timestamp = datetime.now().isoformat()
        super().__init__(self.message)
    
    def _generate_user_friendly_message(self) -> str:
        """Generate user-friendly error messages based on category"""
        user_messages = {
            ErrorCategory.VALIDATION: "Please check your input and try again.",
            ErrorCategory.AUTHENTICATION: "Authentication failed. Please log in again.",
            ErrorCategory.AI_SERVICE: "AI service is temporarily unavailable. Please try again in a moment.",
            ErrorCategory.DATABASE: "Data service is temporarily unavailable. Please try again later.",
            ErrorCategory.FILE_PROCESSING: "File processing failed. Please check the file format and try again.",
            ErrorCategory.NETWORK: "Network connection issue. Please check your internet connection.",
            ErrorCategory.SYSTEM: "System error occurred. Our team has been notified.",
            ErrorCategory.USER_INPUT: "Invalid input provided. Please review and correct your input.",
            ErrorCategory.BUSINESS_LOGIC: "Operation failed due to business rules. Please contact support."
        }
        return user_messages.get(self.category, "An unexpected error occurred. Please try again.")
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert error to dictionary for API responses"""
        return {
            'error': True,
            'message': self.message,
            'user_message': self.user_message,
            'category': self.category.value,
            'severity': self.severity.value,
            'details': self.details,
            'timestamp': self.timestamp
        }

class AIServiceError(SmartQuizzerError):
    """AI service specific errors with enhanced handling"""
    
    def __init__(self, message: str, service_name: str, error_code: Optional[str] = None, 
                 retry_count: int = 0, details: Optional[Dict] = None):
        self.service_name = service_name
        self.error_code = error_code
        self.retry_count = retry_count
        
        enhanced_details = details or {}
        enhanced_details.update({
            'service_name': service_name,
            'error_code': error_code,
            'retry_count': retry_count
        })
        
        super().__init__(
            message=message,
            category=ErrorCategory.AI_SERVICE,
            severity=ErrorSeverity.HIGH if retry_count > 2 else ErrorSeverity.MEDIUM,
            details=enhanced_details,
            user_message=f"AI service ({service_name}) is temporarily unavailable. Please try again."
        )

class ValidationError(SmartQuizzerError):
    """Input validation errors with detailed field information"""
    
    def __init__(self, message: str, field: str, value: Any = None, 
                 validation_rule: Optional[str] = None, details: Optional[Dict] = None):
        self.field = field
        self.value = value
        self.validation_rule = validation_rule
        
        enhanced_details = details or {}
        enhanced_details.update({
            'field': field,
            'value': str(value) if value is not None else None,
            'validation_rule': validation_rule
        })
        
        super().__init__(
            message=message,
            category=ErrorCategory.VALIDATION,
            severity=ErrorSeverity.LOW,
            details=enhanced_details,
            user_message=f"Invalid {field}: {message}"
        )

class ErrorHandler:
    """Centralized error handling and logging system"""
    
    def __init__(self, log_file: str = "smart_quizzer_errors.log"):
        self.log_file = log_file
        self.setup_logging()
        self.error_count = 0
        self.error_history = []
        self.circuit_breaker_state = {}  # For circuit breaker pattern
        
    def setup_logging(self):
        """Setup comprehensive logging configuration"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(self.log_file),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger('SmartQuizzerAI')
    
    def log_error(self, error: Exception, context: Optional[Dict] = None):
        """Log errors with comprehensive context information"""
        self.error_count += 1
        
        error_info = {
            'error_id': f"ERR_{int(time.time())}_{self.error_count}",
            'timestamp': datetime.now().isoformat(),
            'error_type': type(error).__name__,
            'error_message': str(error),  # Renamed from 'message' to avoid LogRecord conflict
            'context': context or {},
            'traceback': traceback.format_exc() if not isinstance(error, SmartQuizzerError) else None
        }
        
        # Add SmartQuizzerError specific information
        if isinstance(error, SmartQuizzerError):
            error_info.update({
                'category': error.category.value,
                'severity': error.severity.value,
                'details': error.details,
                'user_message': error.user_message
            })
        
        # Store error history (keep last 100)
        self.error_history.append(error_info)
        if len(self.error_history) > 100:
            self.error_history.pop(0)
        
        # Log based on severity
        if isinstance(error, SmartQuizzerError):
            if error.severity in [ErrorSeverity.HIGH, ErrorSeverity.CRITICAL]:
                self.logger.error(f"[{error.category.value.upper()}] {error.message}", extra=error_info)
            else:
                self.logger.warning(f"[{error.category.value.upper()}] {error.message}", extra=error_info)
        else:
            self.logger.error(f"Unhandled error: {str(error)}", extra=error_info)
        
        return error_info['error_id']
    
    def handle_error(self, error: Exception, context: Optional[Dict] = None) -> Dict[str, Any]:
        """Handle errors and return appropriate response"""
        error_id = self.log_error(error, context)
        
        if isinstance(error, SmartQuizzerError):
            response = error.to_dict()
            response['error_id'] = error_id
        else:
            # Handle unexpected errors
            response = {
                'error': True,
                'message': 'An unexpected error occurred',
                'user_message': 'Something went wrong. Please try again later.',
                'category': ErrorCategory.SYSTEM.value,
                'severity': ErrorSeverity.HIGH.value,
                'error_id': error_id,
                'timestamp': datetime.now().isoformat()
            }
        
        return response
    
    def get_error_stats(self) -> Dict[str, Any]:
        """Get error statistics for monitoring"""
        recent_errors = [e for e in self.error_history if 
                        (datetime.now() - datetime.fromisoformat(e['timestamp'])).total_seconds() < 3600]
        
        category_counts = {}
        severity_counts = {}
        
        for error in recent_errors:
            category = error.get('category', 'unknown')
            severity = error.get('severity', 'unknown')
            
            category_counts[category] = category_counts.get(category, 0) + 1
            severity_counts[severity] = severity_counts.get(severity, 0) + 1
        
        return {
            'total_errors': self.error_count,
            'recent_errors_count': len(recent_errors),
            'category_distribution': category_counts,
            'severity_distribution': severity_counts,
            'last_error_timestamp': self.error_history[-1]['timestamp'] if self.error_history else None
        }

class FallbackManager:
    """Manages fallback strategies for various system components"""
    
    def __init__(self):
        self.fallback_strategies = {}
        self.offline_data = {}
        self.circuit_breakers = {}
        
        # Load offline fallback data
        self._load_offline_data()
    
    def _load_offline_data(self):
        """Load offline fallback data for when services are unavailable"""
        self.offline_data = {
            'sample_questions': [
                {
                    'question_text': 'What is the capital of France?',
                    'question_type': 'MCQ',
                    'options': ['A. London', 'B. Berlin', 'C. Paris', 'D. Madrid'],
                    'correct_answer': 'C',
                    'explanation': 'Paris is the capital and largest city of France.',
                    'difficulty_level': 'Beginner',
                    'topic': 'Geography'
                },
                {
                    'question_text': 'What is 2 + 2?',
                    'question_type': 'MCQ',
                    'options': ['A. 3', 'B. 4', 'C. 5', 'D. 6'],
                    'correct_answer': 'B',
                    'explanation': 'Basic addition: 2 + 2 equals 4.',
                    'difficulty_level': 'Beginner',
                    'topic': 'Mathematics'
                },
                {
                    'question_text': 'The Earth revolves around the Sun.',
                    'question_type': 'True/False',
                    'correct_answer': 'True',
                    'explanation': 'The Earth orbits around the Sun in approximately 365.25 days.',
                    'difficulty_level': 'Beginner',
                    'topic': 'Science'
                }
            ],
            'default_topics': ['Mathematics', 'Science', 'History', 'Literature', 'Geography'],
            'skill_levels': ['Beginner', 'Intermediate', 'Advanced']
        }
    
    def register_fallback(self, service_name: str, fallback_function: Callable):
        """Register a fallback function for a service"""
        self.fallback_strategies[service_name] = fallback_function
    
    def get_fallback_questions(self, topic: str, skill_level: str, num_questions: int = 3) -> List[Dict]:
        """Generate fallback questions when AI service is unavailable"""
        available_questions = [
            q for q in self.offline_data['sample_questions']
            if q.get('topic', '').lower() == topic.lower() or topic.lower() == 'general'
        ]
        
        if not available_questions:
            available_questions = self.offline_data['sample_questions']
        
        # Select questions up to requested amount
        selected_questions = available_questions[:min(num_questions, len(available_questions))]
        
        # Add fallback metadata
        for question in selected_questions:
            question.update({
                'id': f"fallback_{hash(question['question_text']) % 10000}",
                'is_fallback': True,
                'fallback_reason': 'AI service unavailable',
                'generated_at': datetime.now().isoformat()
            })
        
        return selected_questions
    
    def execute_with_fallback(self, service_name: str, primary_function: Callable, 
                             fallback_params: Optional[Dict] = None, *args, **kwargs):
        """Execute function with automatic fallback on failure"""
        try:
            return primary_function(*args, **kwargs)
        except Exception as e:
            print(f"🔄 Primary service failed, using fallback for {service_name}: {e}")
            
            if service_name in self.fallback_strategies:
                fallback_func = self.fallback_strategies[service_name]
                if fallback_params:
                    return fallback_func(**fallback_params)
                else:
                    return fallback_func(*args, **kwargs)
            else:
                # Generic fallback
                if service_name == 'question_generation':
                    return self.get_fallback_questions(
                        topic=kwargs.get('topic', 'General'),
                        skill_level=kwargs.get('skill_level', 'Beginner'),
                        num_questions=kwargs.get('num_questions', 3)
                    )
                else:
                    raise SmartQuizzerError(
                        message=f"Service {service_name} failed and no fallback available",
                        category=ErrorCategory.SYSTEM,
                        severity=ErrorSeverity.HIGH,
                        details={'service_name': service_name, 'original_error': str(e)}
                    )

class InputValidator:
    """Comprehensive input validation with detailed error reporting"""
    
    @staticmethod
    def validate_quiz_params(data: Dict[str, Any]) -> List[ValidationError]:
        """Validate quiz generation parameters"""
        errors = []
        
        # Topic validation
        if 'topic' not in data or not data['topic']:
            errors.append(ValidationError(
                message="Topic is required",
                field="topic",
                value=data.get('topic'),
                validation_rule="required"
            ))
        elif not isinstance(data['topic'], str) or len(data['topic'].strip()) < 2:
            errors.append(ValidationError(
                message="Topic must be at least 2 characters long",
                field="topic",
                value=data.get('topic'),
                validation_rule="min_length=2"
            ))
        
        # Skill level validation
        valid_skill_levels = ['Beginner', 'Intermediate', 'Advanced']
        if 'skill_level' not in data or data['skill_level'] not in valid_skill_levels:
            errors.append(ValidationError(
                message=f"Skill level must be one of: {', '.join(valid_skill_levels)}",
                field="skill_level",
                value=data.get('skill_level'),
                validation_rule=f"enum={valid_skill_levels}"
            ))
        
        # Number of questions validation
        num_questions = data.get('num_questions', 5)
        if not isinstance(num_questions, int) or num_questions < 1 or num_questions > 20:
            errors.append(ValidationError(
                message="Number of questions must be between 1 and 20",
                field="num_questions",
                value=num_questions,
                validation_rule="range=1-20"
            ))
        
        # Custom topic validation
        if data.get('topic') in ['Custom', 'Custom Topic']:
            custom_topic = data.get('custom_topic', '').strip()
            if not custom_topic:
                errors.append(ValidationError(
                    message="Custom topic content is required when using custom topics",
                    field="custom_topic",
                    value=custom_topic,
                    validation_rule="required_when=topic=Custom"
                ))
            elif len(custom_topic) < 10:
                errors.append(ValidationError(
                    message="Custom topic content must be at least 10 characters long",
                    field="custom_topic",
                    value=custom_topic,
                    validation_rule="min_length=10"
                ))
            elif len(custom_topic) > 10000:
                errors.append(ValidationError(
                    message="Custom topic content must be less than 10,000 characters",
                    field="custom_topic",
                    value=f"{len(custom_topic)} characters",
                    validation_rule="max_length=10000"
                ))
        
        return errors
    
    @staticmethod
    def validate_user_registration(data: Dict[str, Any]) -> List[ValidationError]:
        """Validate user registration data"""
        errors = []
        
        required_fields = ['username', 'email', 'password', 'skill_level']
        for field in required_fields:
            if field not in data or not data[field]:
                errors.append(ValidationError(
                    message=f"{field.title()} is required",
                    field=field,
                    value=data.get(field),
                    validation_rule="required"
                ))
        
        # Username validation
        username = data.get('username', '').strip()
        if username:
            if len(username) < 3:
                errors.append(ValidationError(
                    message="Username must be at least 3 characters long",
                    field="username",
                    value=username,
                    validation_rule="min_length=3"
                ))
            elif len(username) > 50:
                errors.append(ValidationError(
                    message="Username must be less than 50 characters",
                    field="username",
                    value=username,
                    validation_rule="max_length=50"
                ))
            elif not username.replace('_', '').replace('-', '').isalnum():
                errors.append(ValidationError(
                    message="Username can only contain letters, numbers, hyphens, and underscores",
                    field="username",
                    value=username,
                    validation_rule="alphanumeric_with_separators"
                ))
        
        # Email validation
        email = data.get('email', '').strip()
        if email:
            import re
            email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            if not re.match(email_pattern, email):
                errors.append(ValidationError(
                    message="Invalid email format",
                    field="email",
                    value=email,
                    validation_rule="email_format"
                ))
        
        # Password validation
        password = data.get('password', '')
        if password:
            if len(password) < 6:
                errors.append(ValidationError(
                    message="Password must be at least 6 characters long",
                    field="password",
                    value="[HIDDEN]",
                    validation_rule="min_length=6"
                ))
            elif len(password) > 128:
                errors.append(ValidationError(
                    message="Password must be less than 128 characters",
                    field="password",
                    value="[HIDDEN]",
                    validation_rule="max_length=128"
                ))
        
        # Skill level validation
        valid_skill_levels = ['Beginner', 'Intermediate', 'Advanced']
        if data.get('skill_level') not in valid_skill_levels:
            errors.append(ValidationError(
                message=f"Skill level must be one of: {', '.join(valid_skill_levels)}",
                field="skill_level",
                value=data.get('skill_level'),
                validation_rule=f"enum={valid_skill_levels}"
            ))
        
        return errors
    
    @staticmethod
    def validate_file_upload(file_data: Any, max_size: int = 10 * 1024 * 1024) -> List[ValidationError]:
        """Validate file upload parameters"""
        errors = []
        
        if not file_data:
            errors.append(ValidationError(
                message="No file provided",
                field="file",
                value=None,
                validation_rule="required"
            ))
            return errors
        
        # Check if file has a filename
        if not hasattr(file_data, 'filename') or not file_data.filename:
            errors.append(ValidationError(
                message="File must have a valid filename",
                field="filename",
                value=getattr(file_data, 'filename', None),
                validation_rule="valid_filename"
            ))
        
        # Check file size if possible
        if hasattr(file_data, 'content_length') and file_data.content_length:
            if file_data.content_length > max_size:
                errors.append(ValidationError(
                    message=f"File size must be less than {max_size // (1024*1024)}MB",
                    field="file_size",
                    value=f"{file_data.content_length // (1024*1024)}MB",
                    validation_rule=f"max_size={max_size}"
                ))
        
        # Validate file extension
        if hasattr(file_data, 'filename') and file_data.filename:
            allowed_extensions = {'.pdf', '.docx', '.doc', '.txt', '.md', '.json', '.csv', '.xml'}
            file_ext = os.path.splitext(file_data.filename.lower())[1]
            if file_ext not in allowed_extensions:
                errors.append(ValidationError(
                    message=f"File type '{file_ext}' not supported. Allowed: {', '.join(allowed_extensions)}",
                    field="file_extension",
                    value=file_ext,
                    validation_rule=f"allowed_extensions={allowed_extensions}"
                ))
        
        return errors

# Decorator for automatic error handling
def handle_errors(func_or_handler=None, context: Optional[Dict] = None):
    """Decorator for automatic error handling in routes and functions"""
    
    # If called without parameters, use the global error handler
    if func_or_handler is None or callable(func_or_handler):
        # This is the case when @handle_errors is used without parentheses
        actual_func = func_or_handler
        handler = globals().get('error_handler')
        
        if actual_func is None:
            # Return a decorator that will receive the function
            def decorator(func):
                return _create_wrapper(func, handler, context)
            return decorator
        else:
            # Direct decoration
            return _create_wrapper(actual_func, handler, context)
    else:
        # This is the case when @handle_errors(error_handler, context) is used
        handler = func_or_handler
        def decorator(func):
            return _create_wrapper(func, handler, context)
        return decorator

def _create_wrapper(func, handler, context):
    """Create the actual wrapper function"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except SmartQuizzerError as e:
            # Handle custom errors
            if handler and hasattr(handler, 'handle_error'):
                error_response = handler.handle_error(e, context)
            else:
                error_response = {
                    'error': e.user_message,
                    'details': e.details,
                    'category': e.category.value,
                    'severity': e.severity.value
                }
            
            if hasattr(func, '__name__') and 'api' in func.__name__:
                # Return Flask response for API endpoints
                from flask import jsonify
                return jsonify(error_response), 400 if e.severity == ErrorSeverity.LOW else 500
            else:
                return error_response
        except Exception as e:
            # Handle unexpected errors
            if handler and hasattr(handler, 'handle_error'):
                error_response = handler.handle_error(e, context)
            else:
                error_response = {
                    'error': 'An unexpected error occurred',
                    'message': str(e),
                    'type': type(e).__name__
                }
            
            if hasattr(func, '__name__') and 'api' in func.__name__:
                from flask import jsonify
                return jsonify(error_response), 500
            else:
                return error_response
    return wrapper

# Initialize global error handler and fallback manager
error_handler = ErrorHandler()
fallback_manager = FallbackManager()

# Usage example and testing
if __name__ == "__main__":
    # Test error handling
    try:
        raise AIServiceError("Gemini API timeout", "gemini", "TIMEOUT_001", retry_count=3)
    except SmartQuizzerError as e:
        response = error_handler.handle_error(e)
        print("Error Response:", json.dumps(response, indent=2))
    
    # Test validation
    invalid_data = {
        'topic': 'M',  # Too short
        'skill_level': 'Invalid',  # Invalid value
        'num_questions': 25  # Too many
    }
    
    validation_errors = InputValidator.validate_quiz_params(invalid_data)
    for error in validation_errors:
        print(f"Validation Error: {error.to_dict()}")
    
    # Test fallback
    fallback_questions = fallback_manager.get_fallback_questions('Mathematics', 'Beginner', 2)
    print(f"Fallback Questions: {len(fallback_questions)} generated")