import re
import json
from typing import Dict, List, Tuple, Any
from datetime import datetime

class AdvancedAnswerEvaluator:
    """Enhanced answer evaluation with AI feedback (without semantic similarity)"""
    
    def __init__(self):
        print("📊 Advanced Answer Evaluator initialized with enhanced text analysis")
        
        # Text preprocessing patterns
        self.normalization_patterns = [
            (r'\s+', ' '),  # Multiple spaces to single space
            (r'[^\w\s]', ''),  # Remove punctuation
            (r'\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by)\b', ''),  # Remove common words
        ]
        
        # Answer type detection patterns
        self.answer_patterns = {
            'numerical': r'^-?\d+\.?\d*$',
            'yes_no': r'^(yes|no|true|false)$',
            'mathematical': r'[\d\+\-\*/\(\)=]',
            'scientific': r'(atom|molecule|cell|dna|rna|protein|enzyme)',
            'geographical': r'(country|city|continent|ocean|mountain|river)',
            'historical': r'(year|century|bc|ad|war|battle|empire)',
        }
    
    def normalize_text(self, text: str) -> str:
        """Normalize text for better comparison"""
        if not text:
            return ""
        
        text = text.lower().strip()
        
        # Apply normalization patterns
        for pattern, replacement in self.normalization_patterns:
            text = re.sub(pattern, replacement, text, flags=re.IGNORECASE)
        
        return text.strip()
    
    def detect_answer_type(self, text: str) -> str:
        """Detect the type of answer for specialized evaluation"""
        text_lower = text.lower()
        
        for answer_type, pattern in self.answer_patterns.items():
            if re.search(pattern, text_lower):
                return answer_type
        
        return 'general'
    
    def evaluate_mcq_answer(self, user_answer: str, correct_answer: str, options: List[str]) -> Dict[str, Any]:
        """Evaluate multiple choice question answer"""
        user_normalized = self.normalize_text(user_answer)
        correct_normalized = self.normalize_text(correct_answer)
        
        is_correct = user_normalized == correct_normalized
        confidence = 1.0 if is_correct else 0.0
        
        return {
            'is_correct': is_correct,
            'confidence': confidence,
            'evaluation_method': 'exact_match',
            'user_answer_normalized': user_normalized,
            'correct_answer_normalized': correct_normalized
        }
    
    def evaluate_true_false_answer(self, user_answer: str, correct_answer: str) -> Dict[str, Any]:
        """Evaluate true/false question answer"""
        true_variants = ['true', 't', 'yes', 'y', '1', 'correct']
        false_variants = ['false', 'f', 'no', 'n', '0', 'incorrect']
        
        user_normalized = self.normalize_text(user_answer)
        correct_normalized = self.normalize_text(correct_answer)
        
        user_bool = user_normalized in true_variants
        correct_bool = correct_normalized in true_variants
        
        is_correct = user_bool == correct_bool
        confidence = 1.0 if is_correct else 0.0
        
        return {
            'is_correct': is_correct,
            'confidence': confidence,
            'evaluation_method': 'boolean_match',
            'user_answer_normalized': user_normalized,
            'correct_answer_normalized': correct_normalized
        }
    
    def evaluate_short_answer(self, user_answer: str, correct_answer: str) -> Dict[str, Any]:
        """Evaluate short answer with enhanced text analysis"""
        user_normalized = self.normalize_text(user_answer)
        correct_normalized = self.normalize_text(correct_answer)
        
        answer_type = self.detect_answer_type(correct_answer)
        
        # Method 1: Exact match
        exact_match = user_normalized == correct_normalized
        
        # Method 2: Contains match
        contains_match = correct_normalized in user_normalized or user_normalized in correct_normalized
        
        # Method 3: Keyword overlap
        user_words = set(user_normalized.split())
        correct_words = set(correct_normalized.split())
        
        if correct_words:
            keyword_overlap = len(user_words.intersection(correct_words)) / len(correct_words)
        else:
            keyword_overlap = 0.0
        
        # Determine correctness
        is_correct = False
        confidence = 0.0
        evaluation_method = 'enhanced_text_analysis'
        
        if exact_match:
            is_correct = True
            confidence = 1.0
            evaluation_method = 'exact_match'
        elif contains_match and keyword_overlap >= 0.6:
            is_correct = True
            confidence = max(0.8, keyword_overlap)
            evaluation_method = 'keyword_overlap'
        elif answer_type == 'numerical' and self._evaluate_numerical(user_answer, correct_answer):
            is_correct = True
            confidence = 0.9
            evaluation_method = 'numerical_match'
        elif keyword_overlap >= 0.5:
            is_correct = True
            confidence = keyword_overlap
            evaluation_method = 'partial_keyword_match'
        
        return {
            'is_correct': is_correct,
            'confidence': confidence,
            'evaluation_method': evaluation_method,
            'answer_type': answer_type,
            'exact_match': exact_match,
            'contains_match': contains_match,
            'keyword_overlap': keyword_overlap,
            'user_answer_normalized': user_normalized,
            'correct_answer_normalized': correct_normalized
        }
    
    def _evaluate_numerical(self, user_answer: str, correct_answer: str) -> bool:
        """Evaluate numerical answers with tolerance"""
        try:
            user_num = float(re.sub(r'[^\d\.\-]', '', user_answer))
            correct_num = float(re.sub(r'[^\d\.\-]', '', correct_answer))
            
            tolerance = abs(correct_num * 0.01)
            return abs(user_num - correct_num) <= max(tolerance, 0.01)
        except (ValueError, TypeError):
            return False
    
    def generate_ai_feedback(self, question_text: str, user_answer: str, correct_answer: str, 
                           is_correct: bool, evaluation_result: Dict[str, Any], 
                           question_type: str) -> Dict[str, str]:
        """Generate enhanced feedback and explanations"""
        
        feedback = {
            'result_message': '',
            'explanation': '',
            'hint': '',
            'learning_tip': ''
        }
        
        # Result message based on correctness and confidence
        if is_correct:
            confidence = evaluation_result.get('confidence', 1.0)
            if confidence >= 0.9:
                feedback['result_message'] = "🎉 Excellent! Your answer is spot on!"
            elif confidence >= 0.7:
                feedback['result_message'] = "✅ Great job! Your answer captures the key concepts."
            else:
                feedback['result_message'] = "👍 Good effort! Your answer shows understanding."
        else:
            feedback['result_message'] = "📚 Not quite right, but let's learn from this!"
        
        # Enhanced explanations
        evaluation_method = evaluation_result.get('evaluation_method', 'basic')
        
        if question_type == 'Short Answer':
            keyword_overlap = evaluation_result.get('keyword_overlap', 0)
            
            if is_correct:
                if evaluation_method == 'exact_match':
                    feedback['explanation'] = "Perfect match! Your answer is exactly what we were looking for."
                elif evaluation_method == 'keyword_overlap':
                    feedback['explanation'] = "Excellent! Your answer includes the key concepts we were looking for."
                else:
                    feedback['explanation'] = "Well done! Your answer demonstrates understanding of the concept."
            else:
                if keyword_overlap > 0.3:
                    feedback['explanation'] = f"Your answer includes some relevant points, but the complete answer is: '{correct_answer}'"
                else:
                    feedback['explanation'] = f"The correct answer is: '{correct_answer}'. Let's understand why this is the right response."
                
                # Generate hints
                if keyword_overlap > 0.3:
                    feedback['hint'] = "🔍 Hint: You're on the right track! Try to be more specific or complete in your answer."
                elif len(user_answer.split()) < len(correct_answer.split()) // 2:
                    feedback['hint'] = "📝 Hint: Your answer might be too brief. Consider providing more detail."
                else:
                    feedback['hint'] = "💡 Hint: Think about the key concepts related to this topic and try again."
        
        elif question_type == 'MCQ':
            if is_correct:
                feedback['explanation'] = f"Perfect! '{correct_answer}' is indeed the correct choice."
            else:
                feedback['explanation'] = f"The correct answer is '{correct_answer}'. Your choice '{user_answer}' is not the best option here."
        
        elif question_type == 'True/False':
            if is_correct:
                feedback['explanation'] = f"Correct! The statement is {correct_answer.lower()}."
            else:
                feedback['explanation'] = f"Actually, the statement is {correct_answer.lower()}, not {user_answer.lower()}."
        
        # Learning tips
        if not is_correct:
            answer_type = evaluation_result.get('answer_type', 'general')
            tips = {
                'numerical': "💡 Tip: Pay attention to units and significant figures in numerical problems.",
                'scientific': "🔬 Tip: Focus on understanding the underlying scientific principles and terminology.",
                'geographical': "🌍 Tip: Try to visualize the locations and their relationships on a map.",
                'historical': "📜 Tip: Remember the context and cause-effect relationships in historical events.",
                'mathematical': "🧮 Tip: Break down complex problems into smaller, manageable steps.",
                'general': "💭 Tip: Take time to carefully read and understand what the question is asking for."
            }
            feedback['learning_tip'] = tips.get(answer_type, tips['general'])
        
        return feedback
    
    def evaluate_answer(self, question_text: str, user_answer: str, correct_answer: str, 
                       question_type: str, options: List[str] = None) -> Dict[str, Any]:
        """Main method to evaluate any type of answer"""
        
        if not user_answer or not correct_answer:
            return {
                'is_correct': False,
                'confidence': 0.0,
                'evaluation_method': 'no_answer',
                'feedback': {
                    'result_message': '❌ No answer provided',
                    'explanation': 'Please provide an answer to receive feedback.',
                    'hint': '',
                    'learning_tip': ''
                }
            }
        
        # Evaluate based on question type
        if question_type == 'MCQ':
            result = self.evaluate_mcq_answer(user_answer, correct_answer, options or [])
        elif question_type == 'True/False':
            result = self.evaluate_true_false_answer(user_answer, correct_answer)
        else:  # Short Answer
            result = self.evaluate_short_answer(user_answer, correct_answer)
        
        # Generate enhanced feedback
        feedback = self.generate_ai_feedback(
            question_text, user_answer, correct_answer, 
            result['is_correct'], result, question_type
        )
        
        result['feedback'] = feedback
        result['evaluation_timestamp'] = datetime.utcnow().isoformat()
        
        return result

# Global instance
answer_evaluator = AdvancedAnswerEvaluator()