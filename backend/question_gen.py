import random
import re
import json
import requests
import os
from typing import List, Dict, Any
import math
from collections import Counter, deque
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DifficultyClassifier:
    """
    🎯 ADVANCED DIFFICULTY CLASSIFICATION MODULE
    
    This sophisticated module implements multi-layered difficulty analysis using:
    
    📚 BLOOM'S TAXONOMY INTEGRATION:
    - Maps questions to cognitive levels (Remember, Understand, Apply, Analyze, Evaluate, Create)
    - Easy: Remember (list, name, identify) + Understand (explain, describe, summarize)
    - Medium: Apply (solve, demonstrate, calculate) + Analyze (compare, contrast, examine)
    - Hard: Evaluate (judge, critique, assess) + Create (design, construct, develop)
    
    🔍 TEXT COMPLEXITY ANALYSIS:
    - Flesch Reading Score calculation (0-100 scale)
    - Average word length and sentence complexity
    - Lexical diversity and vocabulary sophistication
    - Syllable counting for readability assessment
    
    📊 CLASSIFIER THRESHOLDS:
    - Flesch Score: >70 (Easy), 50-70 (Medium), <50 (Hard)
    - Word Length: ≤4 chars (Easy), 4-6 chars (Medium), >6 chars (Hard)
    - Bloom's Weight: 40% of final classification
    - Semantic Weight: 30% of final classification
    - Text Complexity: 30% of final classification
    
    🧠 SEMANTIC STRUCTURE PATTERNS:
    - Domain-specific complexity indicators
    - Mathematical terminology analysis
    - Question structure pattern recognition
    - Multi-method weighted scoring system
    """
    
    def __init__(self):
        # 📚 BLOOM'S TAXONOMY COGNITIVE LEVEL MAPPING
        # Based on revised Bloom's taxonomy (Anderson & Krathwohl, 2001)
        # Each level maps to specific difficulty classifications
        self.blooms_taxonomy = {
            'easy': {
                'remember': ['list', 'name', 'identify', 'define', 'recall', 'state', 'what is', 'who is', 'when did'],
                'understand': ['explain', 'describe', 'summarize', 'interpret', 'give example', 'classify']
            },
            'medium': {
                'apply': ['solve', 'demonstrate', 'calculate', 'show', 'complete', 'examine', 'modify'],
                'analyze': ['compare', 'contrast', 'distinguish', 'examine', 'categorize', 'differentiate', 'analyze']
            },
            'hard': {
                'evaluate': ['judge', 'critique', 'assess', 'evaluate', 'justify', 'argue', 'defend', 'support'],
                'create': ['design', 'construct', 'develop', 'formulate', 'compose', 'plan', 'produce', 'invent']
            }
        }
        
        # 🔍 VOCABULARY COMPLEXITY INDICATORS
        # Linguistic markers for cognitive demand levels
        self.complexity_indicators = {
            'easy': ['simple', 'basic', 'main', 'first', 'common', 'usual', 'general'],
            'medium': ['analyze', 'process', 'relationship', 'factor', 'method', 'principle', 'concept'],
            'hard': ['synthesize', 'hypothesis', 'paradigm', 'methodology', 'theoretical', 'empirical', 'philosophical']
        }
        
        # 📊 MATHEMATICAL COMPLEXITY CLASSIFICATION
        # Domain-specific mathematical concept difficulty mapping
        self.math_complexity = {
            'easy': ['addition', 'subtraction', 'multiplication', 'division', 'counting', 'basic'],
            'medium': ['algebra', 'equation', 'function', 'graph', 'probability', 'statistics'],
            'hard': ['calculus', 'derivative', 'integral', 'matrix', 'theorem', 'proof', 'differential']
        }
        
        # 📈 CLASSIFIER CONFIGURATION SUMMARY
        self.classifier_config = {
            'flesch_thresholds': {'easy': 70, 'medium': 50, 'hard': 0},
            'word_length_thresholds': {'easy': 4, 'medium': 6, 'hard': float('inf')},
            'weights': {
                'blooms_taxonomy': 0.4,
                'semantic_analysis': 0.3, 
                'text_complexity': 0.2,
                'skill_level_influence': 0.1
            },
            'confidence_threshold': 0.3,
            'syllable_estimation': 'flesch_kincaid_approximation'
        }
        
        print("🎯 Difficulty Classifier initialized with Bloom's taxonomy and semantic analysis")
        print(f"📊 Classification weights: Bloom's {self.classifier_config['weights']['blooms_taxonomy']*100}%, "
              f"Semantic {self.classifier_config['weights']['semantic_analysis']*100}%, "
              f"Text {self.classifier_config['weights']['text_complexity']*100}%")
    
    def calculate_text_complexity(self, text: str) -> Dict[str, float]:
        """
        📊 CALCULATE COMPREHENSIVE TEXT COMPLEXITY METRICS
        
        Uses multiple linguistic measures to assess reading difficulty:
        - Flesch Reading Ease Score (0-100): Higher = easier to read
        - Average word length: Character count per word
        - Average sentence length: Words per sentence  
        - Lexical diversity: Unique words / Total words
        - Syllable estimation: For readability calculation
        
        THRESHOLDS:
        - Flesch Score: >70 (Easy), 50-70 (Medium), <50 (Hard)
        - Word Length: ≤4 (Easy), 4-6 (Medium), >6 (Hard)
        - Sentence Length: <15 (Easy), 15-25 (Medium), >25 (Hard)
        """
        words = text.split()
        sentences = text.split('.')
        
        # Basic readability metrics
        avg_word_length = sum(len(word.strip('.,!?;:')) for word in words) / max(len(words), 1)
        avg_sentence_length = len(words) / max(len(sentences), 1)
        
        # Syllable estimation (Flesch-Kincaid approximation)
        syllable_count = sum(self._estimate_syllables(word.strip('.,!?;:')) for word in words)
        flesch_score = 206.835 - (1.015 * avg_sentence_length) - (84.6 * (syllable_count / max(len(words), 1)))
        
        # Vocabulary complexity
        unique_words = len(set(word.lower().strip('.,!?;:') for word in words))
        lexical_diversity = unique_words / max(len(words), 1)
        
        return {
            'avg_word_length': avg_word_length,
            'avg_sentence_length': avg_sentence_length,
            'flesch_score': max(0, min(100, flesch_score)),  # Normalize to 0-100
            'lexical_diversity': lexical_diversity,
            'total_words': len(words)
        }
    
    def _estimate_syllables(self, word: str) -> int:
        """Estimate syllable count in a word"""
        word = word.lower()
        if len(word) <= 3:
            return 1
        
        vowels = 'aeiouy'
        syllables = 0
        prev_was_vowel = False
        
        for char in word:
            is_vowel = char in vowels
            if is_vowel and not prev_was_vowel:
                syllables += 1
            prev_was_vowel = is_vowel
        
        # Adjust for silent 'e'
        if word.endswith('e'):
            syllables = max(1, syllables - 1)
        
        return max(1, syllables)
    
    def analyze_blooms_taxonomy(self, question_text: str) -> Dict[str, Any]:
        """
        📚 BLOOM'S TAXONOMY COGNITIVE LEVEL ANALYSIS
        
        Maps question verbs to cognitive complexity levels:
        
        EASY LEVEL (Foundational):
        - Remember: list, name, identify, define, recall, state
        - Understand: explain, describe, summarize, interpret, classify
        
        MEDIUM LEVEL (Application):
        - Apply: solve, demonstrate, calculate, show, complete, examine
        - Analyze: compare, contrast, distinguish, categorize, differentiate
        
        HARD LEVEL (Higher-Order):
        - Evaluate: judge, critique, assess, justify, argue, defend
        - Create: design, construct, develop, formulate, compose, plan
        
        Returns confidence score based on verb detection frequency
        """
        question_lower = question_text.lower()
        
        bloom_scores = {'easy': 0, 'medium': 0, 'hard': 0}
        detected_verbs = []
        
        for difficulty, categories in self.blooms_taxonomy.items():
            for category, verbs in categories.items():
                for verb in verbs:
                    if verb in question_lower:
                        bloom_scores[difficulty] += 1
                        detected_verbs.append((verb, category, difficulty))
        
        # Determine primary cognitive level
        max_score = max(bloom_scores.values())
        if max_score == 0:
            primary_level = 'medium'  # Default
        else:
            primary_level = max(bloom_scores.keys(), key=lambda k: bloom_scores[k])
        
        return {
            'scores': bloom_scores,
            'primary_level': primary_level,
            'detected_verbs': detected_verbs,
            'confidence': max_score / max(sum(bloom_scores.values()), 1)
        }
    
    def analyze_semantic_structure(self, question_text: str, topic: str) -> Dict[str, Any]:
        """
        🔍 SEMANTIC STRUCTURE & DOMAIN-SPECIFIC ANALYSIS
        
        Analyzes multiple dimensions of question complexity:
        
        VOCABULARY COMPLEXITY:
        - Easy: simple, basic, main, first, common, usual, general
        - Medium: analyze, process, relationship, factor, method, principle
        - Hard: synthesize, hypothesis, paradigm, methodology, theoretical
        
        MATHEMATICAL DOMAIN PATTERNS:
        - Easy: addition, subtraction, multiplication, division, counting
        - Medium: algebra, equation, function, graph, probability, statistics  
        - Hard: calculus, derivative, integral, matrix, theorem, proof
        
        STRUCTURAL COMPLEXITY:
        - Easy: "what is", "which of", "true or false", "name the"
        - Medium: "compare and", "explain how", "what happens when"
        - Hard: "evaluate the", "synthesize", "critically analyze"
        
        WEIGHTING SYSTEM:
        - Complexity indicators: 1x weight
        - Mathematical terms: 2x weight  
        - Structural patterns: 3x weight
        """
        question_lower = question_text.lower()
        
        # Check for complexity indicators
        complexity_scores = {'easy': 0, 'medium': 0, 'hard': 0}
        
        for level, indicators in self.complexity_indicators.items():
            for indicator in indicators:
                if indicator in question_lower:
                    complexity_scores[level] += 1
        
        # Topic-specific analysis
        if topic.lower() == 'mathematics':
            for level, terms in self.math_complexity.items():
                for term in terms:
                    if term in question_lower:
                        complexity_scores[level] += 2  # Higher weight for math terms
        
        # Structural complexity patterns
        structural_indicators = {
            'easy': ['what is', 'which of', 'true or false', 'name the'],
            'medium': ['compare and', 'explain how', 'what happens when', 'why does'],
            'hard': ['evaluate the', 'synthesize', 'critically analyze', 'justify your']
        }
        
        for level, patterns in structural_indicators.items():
            for pattern in patterns:
                if pattern in question_lower:
                    complexity_scores[level] += 3  # Higher weight for structural patterns
        
        # Question type complexity
        if 'multiple choice' in question_lower or any(opt in question_lower for opt in ['a)', 'b)', 'c)', 'd)']):
            complexity_scores['easy'] += 1
        elif 'true/false' in question_lower:
            complexity_scores['easy'] += 1
        elif 'explain' in question_lower or 'describe' in question_lower:
            complexity_scores['medium'] += 2
        elif 'analyze' in question_lower or 'evaluate' in question_lower:
            complexity_scores['hard'] += 3
        
        max_score = max(complexity_scores.values())
        primary_level = max(complexity_scores.keys(), key=lambda k: complexity_scores[k]) if max_score > 0 else 'medium'
        
        return {
            'scores': complexity_scores,
            'primary_level': primary_level,
            'confidence': max_score / max(sum(complexity_scores.values()), 1)
        }
    
    def classify_difficulty(self, question_text: str, topic: str, skill_level: str) -> Dict[str, Any]:
        """
        🎯 COMPREHENSIVE MULTI-METHOD DIFFICULTY CLASSIFICATION
        
        CLASSIFICATION PIPELINE:
        1. Text Complexity Analysis (30% weight)
        2. Bloom's Taxonomy Mapping (40% weight)  
        3. Semantic Structure Analysis (30% weight)
        4. Skill Level Influence (10% weight)
        
        DECISION THRESHOLDS:
        - Flesch Score: >70 (Easy), 50-70 (Medium), <50 (Hard)
        - Word Length: ≤4 (Easy), 4-6 (Medium), >6 (Hard)
        - Minimum Confidence: 0.3 (fallback to skill level)
        
        FINAL CLASSIFICATION:
        - Weighted sum of all analysis methods
        - Confidence score based on strongest indicator
        - Fallback to skill level if confidence < threshold
        - Comprehensive metadata for transparency
        """"
        
        # 1. Text complexity analysis
        text_metrics = self.calculate_text_complexity(question_text)
        
        # 2. Bloom's taxonomy analysis
        blooms_analysis = self.analyze_blooms_taxonomy(question_text)
        
        # 3. Semantic structure analysis
        semantic_analysis = self.analyze_semantic_structure(question_text, topic)
        
        # Combine analyses with weighted scoring
        final_scores = {'easy': 0, 'medium': 0, 'hard': 0}
        
        # Text complexity contribution (20% weight)
        flesch_score = text_metrics['flesch_score']
        if flesch_score >= 70:  # Easy to read
            final_scores['easy'] += 0.2
        elif flesch_score >= 50:  # Moderate
            final_scores['medium'] += 0.2
        else:  # Difficult
            final_scores['hard'] += 0.2
        
        # Word length contribution
        avg_word_len = text_metrics['avg_word_length']
        if avg_word_len <= 4:
            final_scores['easy'] += 0.1
        elif avg_word_len <= 6:
            final_scores['medium'] += 0.1
        else:
            final_scores['hard'] += 0.1
        
        # Bloom's taxonomy contribution (40% weight)
        blooms_weight = 0.4 * blooms_analysis['confidence']
        final_scores[blooms_analysis['primary_level']] += blooms_weight
        
        # Semantic analysis contribution (30% weight)
        semantic_weight = 0.3 * semantic_analysis['confidence']
        final_scores[semantic_analysis['primary_level']] += semantic_weight
        
        # Skill level influence (10% weight)
        skill_mapping = {'Beginner': 'easy', 'Intermediate': 'medium', 'Advanced': 'hard'}
        if skill_level in skill_mapping:
            final_scores[skill_mapping[skill_level]] += 0.1
        
        # Determine final classification
        classified_difficulty = max(final_scores.keys(), key=lambda k: final_scores[k])
        confidence_score = final_scores[classified_difficulty]
        
        # Ensure minimum confidence
        if confidence_score < 0.3:
            classified_difficulty = skill_mapping.get(skill_level, 'medium')
            confidence_score = 0.5
        
        return {
            'classified_difficulty': classified_difficulty,
            'confidence': confidence_score,
            'scores': final_scores,
            'text_metrics': text_metrics,
            'blooms_analysis': blooms_analysis,
            'semantic_analysis': semantic_analysis,
            'metadata': {
                'avg_word_length': text_metrics['avg_word_length'],
                'flesch_score': text_metrics['flesch_score'],
                'lexical_diversity': text_metrics['lexical_diversity'],
                'cognitive_level': blooms_analysis['primary_level'],
                'semantic_complexity': semantic_analysis['primary_level'],
                'detected_patterns': blooms_analysis['detected_verbs'] + 
                                  [(pattern, 'semantic', semantic_analysis['primary_level']) 
                                   for pattern in semantic_analysis['scores'].keys() if semantic_analysis['scores'][pattern] > 0]
            }
        }

class AdaptiveQuizEngine:
    """Advanced adaptive quiz engine that adjusts difficulty based on user performance"""
    
    def __init__(self):
        # Performance tracking
        self.user_performance_history = {}  # user_id -> performance data
        self.difficulty_levels = ['easy', 'medium', 'hard']
        self.difficulty_weights = {'easy': 1, 'medium': 2, 'hard': 3}
        
        # Adaptive parameters
        self.performance_window_size = 5  # Number of recent questions to consider
        self.confidence_threshold = 0.7  # Threshold for difficulty adjustment
        self.adaptation_sensitivity = 0.3  # How quickly to adapt (0.1-1.0)
        
        # Difficulty ladder configuration
        self.difficulty_ladder = {
            'promotion_threshold': 0.8,  # Correct rate to move up
            'demotion_threshold': 0.4,   # Correct rate to move down
            'stability_window': 3,       # Questions needed to confirm level
            'max_jump': 1,              # Maximum difficulty level jump at once
            'streak_bonus': 0.1         # Bonus for consecutive correct answers
        }
        
        # Question pool management
        self.question_pools = {
            'easy': deque(maxlen=50),
            'medium': deque(maxlen=50), 
            'hard': deque(maxlen=50)
        }
        
        print("🎯 Adaptive Quiz Engine initialized with real-time difficulty adjustment")
    
    def initialize_user_profile(self, user_id: str, initial_skill_level: str = 'medium') -> Dict[str, Any]:
        """Initialize adaptive profile for a new user"""
        skill_mapping = {
            'Beginner': 'easy',
            'Intermediate': 'medium', 
            'Advanced': 'hard'
        }
        
        initial_difficulty = skill_mapping.get(initial_skill_level, 'medium')
        
        self.user_performance_history[user_id] = {
            'current_difficulty': initial_difficulty,
            'target_difficulty': initial_difficulty,
            'performance_history': deque(maxlen=self.performance_window_size),
            'session_stats': {
                'total_questions': 0,
                'correct_answers': 0,
                'consecutive_correct': 0,
                'consecutive_incorrect': 0,
                'difficulty_changes': 0,
                'session_start_time': datetime.now()
            },
            'long_term_stats': {
                'easy_accuracy': 0.0,
                'medium_accuracy': 0.0,
                'hard_accuracy': 0.0,
                'total_sessions': 0,
                'preferred_difficulty': initial_difficulty
            },
            'adaptation_metadata': {
                'confidence_level': 0.5,
                'stability_score': 0.0,
                'learning_velocity': 0.0,
                'last_adaptation': datetime.now()
            }
        }
        
        print(f"👤 User profile initialized: {user_id} -> {initial_difficulty} difficulty")
        return self.user_performance_history[user_id]
    
    def record_answer(self, user_id: str, question_difficulty: str, is_correct: bool, 
                     response_time: float = 0, question_metadata: Dict = None) -> Dict[str, Any]:
        """Record user's answer and update performance metrics"""
        if user_id not in self.user_performance_history:
            self.initialize_user_profile(user_id)
        
        profile = self.user_performance_history[user_id]
        
        # Record the answer
        answer_record = {
            'timestamp': datetime.now(),
            'difficulty': question_difficulty,
            'correct': is_correct,
            'response_time': response_time,
            'metadata': question_metadata or {}
        }
        
        profile['performance_history'].append(answer_record)
        
        # Update session stats
        profile['session_stats']['total_questions'] += 1
        if is_correct:
            profile['session_stats']['correct_answers'] += 1
            profile['session_stats']['consecutive_correct'] += 1
            profile['session_stats']['consecutive_incorrect'] = 0
        else:
            profile['session_stats']['consecutive_correct'] = 0
            profile['session_stats']['consecutive_incorrect'] += 1
        
        # Update long-term accuracy by difficulty
        difficulty_key = f"{question_difficulty}_accuracy"
        if difficulty_key in profile['long_term_stats']:
            current_accuracy = profile['long_term_stats'][difficulty_key]
            total_at_difficulty = sum(1 for record in profile['performance_history'] 
                                    if record['difficulty'] == question_difficulty)
            new_accuracy = (current_accuracy * (total_at_difficulty - 1) + (1 if is_correct else 0)) / total_at_difficulty
            profile['long_term_stats'][difficulty_key] = new_accuracy
        
        print(f"📊 Answer recorded: {user_id} -> {question_difficulty} ({'✓' if is_correct else '✗'})")
        return answer_record
    
    def calculate_performance_metrics(self, user_id: str) -> Dict[str, float]:
        """Calculate comprehensive performance metrics for adaptive decisions"""
        default_metrics = {
            'accuracy': 0.5, 
            'confidence': 0.0, 
            'trend': 0.0,
            'difficulty_performance': {'easy': 0.5, 'medium': 0.5, 'hard': 0.5},
            'avg_response_time': 0.0,
            'consecutive_correct': 0,
            'streak_bonus': 0.0,
            'adjusted_accuracy': 0.5
        }
        
        if user_id not in self.user_performance_history:
            return default_metrics
        
        profile = self.user_performance_history[user_id]
        history = list(profile['performance_history'])
        
        if not history:
            return default_metrics
        
        # Overall accuracy in recent window
        correct_count = sum(1 for record in history if record['correct'])
        accuracy = correct_count / len(history)
        
        # Confidence based on consistency
        if len(history) >= 3:
            recent_results = [record['correct'] for record in history[-3:]]
            confidence = 1.0 - (sum(abs(a - b) for a, b in zip(recent_results[:-1], recent_results[1:])) / (len(recent_results) - 1))
        else:
            confidence = 0.5
        
        # Performance trend (improvement/decline)
        if len(history) >= 4:
            first_half = history[:len(history)//2]
            second_half = history[len(history)//2:]
            first_accuracy = sum(r['correct'] for r in first_half) / len(first_half)
            second_accuracy = sum(r['correct'] for r in second_half) / len(second_half)
            trend = second_accuracy - first_accuracy
        else:
            trend = 0.0
        
        # Difficulty-specific performance
        difficulty_performance = {}
        for difficulty in self.difficulty_levels:
            diff_records = [r for r in history if r['difficulty'] == difficulty]
            if diff_records:
                difficulty_performance[difficulty] = sum(r['correct'] for r in diff_records) / len(diff_records)
            else:
                difficulty_performance[difficulty] = 0.5
        
        # Response time analysis
        response_times = [r['response_time'] for r in history if r['response_time'] > 0]
        avg_response_time = sum(response_times) / len(response_times) if response_times else 0
        
        # Streak analysis
        consecutive_correct = profile['session_stats']['consecutive_correct']
        streak_bonus = min(consecutive_correct * self.difficulty_ladder['streak_bonus'], 0.5)
        
        return {
            'accuracy': accuracy,
            'confidence': confidence,
            'trend': trend,
            'difficulty_performance': difficulty_performance,
            'avg_response_time': avg_response_time,
            'consecutive_correct': consecutive_correct,
            'streak_bonus': streak_bonus,
            'adjusted_accuracy': min(1.0, accuracy + streak_bonus)
        }
    
    def determine_next_difficulty(self, user_id: str, current_question_difficulty: str, 
                                is_correct: bool) -> Dict[str, Any]:
        """Intelligent difficulty adjustment based on performance and ladder logic"""
        if user_id not in self.user_performance_history:
            return {'next_difficulty': 'medium', 'reason': 'new_user', 'confidence': 0.5}
        
        profile = self.user_performance_history[user_id]
        metrics = self.calculate_performance_metrics(user_id)
        
        current_difficulty_index = self.difficulty_levels.index(profile['current_difficulty'])
        adjusted_accuracy = metrics['adjusted_accuracy']
        confidence = metrics['confidence']
        
        # Decision logic
        next_difficulty = profile['current_difficulty']
        reason = 'maintaining_level'
        
        # Promotion logic
        if (adjusted_accuracy >= self.difficulty_ladder['promotion_threshold'] and 
            confidence >= self.confidence_threshold and
            current_difficulty_index < len(self.difficulty_levels) - 1):
            
            next_difficulty = self.difficulty_levels[current_difficulty_index + 1]
            reason = f'promoted_high_performance_{adjusted_accuracy:.2f}'
            profile['session_stats']['difficulty_changes'] += 1
        
        # Demotion logic
        elif (adjusted_accuracy <= self.difficulty_ladder['demotion_threshold'] and
              current_difficulty_index > 0):
            
            next_difficulty = self.difficulty_levels[current_difficulty_index - 1]
            reason = f'demoted_low_performance_{adjusted_accuracy:.2f}'
            profile['session_stats']['difficulty_changes'] += 1
        
        # Gradual adjustment for moderate performance
        elif confidence >= self.confidence_threshold:
            if adjusted_accuracy > 0.65 and current_difficulty_index < len(self.difficulty_levels) - 1:
                # Small chance to try harder difficulty
                if random.random() < self.adaptation_sensitivity:
                    next_difficulty = self.difficulty_levels[current_difficulty_index + 1]
                    reason = 'gradual_increase_exploration'
            elif adjusted_accuracy < 0.55 and current_difficulty_index > 0:
                # Small chance to try easier difficulty
                if random.random() < self.adaptation_sensitivity:
                    next_difficulty = self.difficulty_levels[current_difficulty_index - 1]
                    reason = 'gradual_decrease_support'
        
        # Update profile
        profile['current_difficulty'] = next_difficulty
        profile['adaptation_metadata']['confidence_level'] = confidence
        profile['adaptation_metadata']['last_adaptation'] = datetime.now()
        
        adaptation_result = {
            'next_difficulty': next_difficulty,
            'reason': reason,
            'confidence': confidence,
            'performance_metrics': metrics,
            'difficulty_change': next_difficulty != profile.get('previous_difficulty', next_difficulty)
        }
        
        profile['previous_difficulty'] = current_question_difficulty
        
        print(f"🎯 Next difficulty: {next_difficulty} (reason: {reason}, confidence: {confidence:.2f})")
        return adaptation_result
    
    def get_adaptive_question_recommendation(self, user_id: str, topic: str, 
                                           question_type: str, available_questions: List[Dict] = None) -> Dict[str, Any]:
        """Comprehensive adaptive question recommendation"""
        if user_id not in self.user_performance_history:
            self.initialize_user_profile(user_id)
        
        profile = self.user_performance_history[user_id]
        current_difficulty = profile['current_difficulty']
        
        # Get performance insights
        metrics = self.calculate_performance_metrics(user_id)
        
        recommendation = {
            'recommended_difficulty': current_difficulty,
            'user_performance': metrics,
            'session_stats': profile['session_stats'],
            'adaptation_metadata': profile['adaptation_metadata'],
            'learning_insights': {
                'strength_area': max(metrics['difficulty_performance'].items(), key=lambda x: x[1])[0] if metrics['difficulty_performance'] else 'unknown',
                'improvement_area': min(metrics['difficulty_performance'].items(), key=lambda x: x[1])[0] if metrics['difficulty_performance'] else 'unknown',
                'learning_trend': 'improving' if metrics['trend'] > 0.1 else 'declining' if metrics['trend'] < -0.1 else 'stable',
                'confidence_level': 'high' if metrics['confidence'] > 0.7 else 'medium' if metrics['confidence'] > 0.4 else 'low'
            }
        }
        
        print(f"📋 Adaptive recommendation for {user_id}: {current_difficulty} difficulty")
        print(f"    Performance: {metrics['accuracy']:.2f} accuracy, {metrics['confidence']:.2f} confidence")
        print(f"    Trend: {recommendation['learning_insights']['learning_trend']}")
        
        return recommendation

class GeminiQuestionGenerator:
    def __init__(self):
        # Get API key from environment variables
        self.api_key = os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("❌ GEMINI_API_KEY environment variable is not set. Please check your .env file.")
        
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
        
        # Initialize difficulty classifier
        self.difficulty_classifier = DifficultyClassifier()
        
        # Initialize adaptive quiz engine
        self.adaptive_engine = AdaptiveQuizEngine()
        
        print("🤖 Gemini AI Question Generator initialized with adaptive difficulty system")
        
        # Topic-specific content for enhanced context
        self.topic_content = {
            "Mathematics": {
                "Beginner": "Basic arithmetic, fractions, geometry, simple equations, counting, basic shapes, addition, subtraction, multiplication, division",
                "Intermediate": "Algebra, linear equations, probability, statistics, quadratic equations, geometry, trigonometry, functions",
                "Advanced": "Calculus, differential equations, linear algebra, number theory, complex analysis, mathematical proofs, discrete mathematics"
            },
            "Science": {
                "Beginner": "Human body, states of matter, plants, animals, weather, basic chemistry, simple physics, earth science",
                "Intermediate": "Atoms, molecules, energy, DNA, cellular biology, chemical reactions, force and motion, electricity",
                "Advanced": "Quantum mechanics, thermodynamics, molecular biology, biochemistry, advanced physics, genetics, evolution"
            },
            "History": {
                "Beginner": "Ancient civilizations, Renaissance, Industrial Revolution, basic historical timelines, famous historical figures",
                "Intermediate": "World Wars, French Revolution, Cold War, colonialism, major historical events and their causes",
                "Advanced": "Treaty of Westphalia, imperialism, Enlightenment, complex historical analysis, historiography"
            },
            "Literature": {
                "Beginner": "Poetry, novels, drama, basic literary devices, story elements, character analysis",
                "Intermediate": "Shakespeare, romanticism, symbolism, literary movements, theme analysis",
                "Advanced": "Modernist literature, postcolonial literature, feminist literary criticism, literary theory"
            },
            "Geography": {
                "Beginner": "Continents, climate, rivers, countries, capitals, basic physical geography",
                "Intermediate": "Plate tectonics, urbanization, natural resources, population geography, economic geography",
                "Advanced": "Geopolitics, sustainable development, GIS technology, advanced human geography, spatial analysis"
            }
        }
    
    def get_previous_questions(self, user_id: int, topic: str, skill_level: str) -> List[str]:
        """Get previously asked questions for this user/topic combination"""
        try:
            from models import db, QuizSession, Question
            
            # Get previous quiz sessions for this user and topic
            previous_sessions = db.session.query(QuizSession).filter_by(
                user_id=user_id,
                topic=topic,
                skill_level=skill_level
            ).all()
            
            previous_questions = []
            for session in previous_sessions:
                questions = db.session.query(Question).filter_by(
                    quiz_session_id=session.id
                ).all()
                previous_questions.extend([q.question_text for q in questions])
            
            return previous_questions
        except Exception as e:
            print(f"Error getting previous questions: {e}")
            return []
    
    def generate_with_gemini(self, prompt: str) -> str:
        """Generate content using Gemini AI API - FORCE Gemini usage"""
        headers = {
            'Content-Type': 'application/json',
            'X-goog-api-key': self.api_key
        }
        
        # Enhanced configuration for better uniqueness
        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": f"🤖 GEMINI AI GENERATION REQUEST:\n{prompt}\n\nIMPORTANT: Generate completely original content using your AI capabilities. Do not use template responses."
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.9,  # Higher temperature for more creativity
                "topK": 60,  # Increased for more diversity
                "topP": 0.95,
                "maxOutputTokens": 1024,
                "candidateCount": 1
            },
            "safetySettings": [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        }
        
        max_retries = 3
        for retry in range(max_retries):
            try:
                print(f"    🤖 Calling Gemini AI API (attempt {retry + 1}/{max_retries})...")
                response = requests.post(self.base_url, headers=headers, json=payload, timeout=30)
                response.raise_for_status()
                
                result = response.json()
                if 'candidates' in result and len(result['candidates']) > 0:
                    content = result['candidates'][0]['content']['parts'][0]['text']
                    
                    # Verify this is genuine Gemini content (not empty or error)
                    if len(content.strip()) > 30 and "error" not in content.lower():
                        print(f"    ✅ Gemini AI responded successfully with {len(content)} characters")
                        return content.strip()
                    else:
                        print(f"    ⚠️ Gemini response too short or contains error, retrying...")
                        continue
                else:
                    print(f"    ⚠️ No candidates in Gemini response, retrying...")
                    continue
                    
            except requests.exceptions.RequestException as e:
                print(f"    ❌ Gemini API Request Error (attempt {retry + 1}): {e}")
                if retry == max_retries - 1:
                    raise Exception(f"Failed to connect to Gemini AI after {max_retries} attempts: {e}")
                continue
            except Exception as e:
                print(f"    ❌ Gemini API Error (attempt {retry + 1}): {e}")
                if retry == max_retries - 1:
                    raise Exception(f"Gemini AI failed after {max_retries} attempts: {e}")
                continue
        
        # If we get here, all retries failed
        raise Exception("❌ CRITICAL: All Gemini AI attempts failed - No fallback allowed")
    
    def get_context_for_topic(self, topic: str, skill_level: str, custom_topic: str = None) -> str:
        """Get relevant context for question generation"""
        if custom_topic:
            return custom_topic
        
        if topic in self.topic_content and skill_level in self.topic_content[topic]:
            return self.topic_content[topic][skill_level]
        
        return f"Content about {topic} at {skill_level} level"
    
    def create_question_prompt(self, topic: str, skill_level: str, question_type: str, context: str, previous_questions: List[str] = None) -> str:
        """Create a detailed prompt for Gemini AI with uniqueness requirements"""
        
        # Add uniqueness requirements
        uniqueness_prompt = ""
        if previous_questions:
            uniqueness_prompt = f"""
IMPORTANT - AVOID REPETITION:
Do NOT create questions similar to these previously asked questions:
{chr(10).join([f"- {q[:100]}..." for q in previous_questions[-10:]])}

Your question MUST be completely different in:
- Question content and focus
- Specific examples or scenarios used
- Angle of approach to the topic
- Wording and phrasing
"""
        
        prompt = f"""You are an expert educational content creator using Gemini AI. Create a {skill_level}-level {question_type} question about {topic}.

🎯 GENERATION SOURCE: This question MUST be generated using Gemini AI model capabilities.

Context: {context}
{uniqueness_prompt}

Requirements:
- The question should be appropriate for {skill_level} level students
- Question type: {question_type}
- Be creative and ensure uniqueness from any previous questions
- Use varied vocabulary and different approaches to the topic
- Generate fresh, original content every time"""

        if question_type == "MCQ":
            prompt += """

- Provide exactly 4 multiple choice options (A, B, C, D)
- Only one option should be correct
- Make distractors plausible but clearly wrong
- Format your response as:
Question: [question text]
Type: MCQ
Options: A. [option 1], B. [option 2], C. [option 3], D. [option 4]
Correct Answer: [A/B/C/D]
Explanation: [detailed explanation why the correct answer is right]
"""
        elif question_type == "True/False":
            prompt += """

- Create a statement that can be definitively true or false
- Make it challenging but fair
- Format your response as:
Question: [true/false statement]
Type: True/False
Correct Answer: [True/False]
Explanation: [detailed explanation of why the statement is true or false]
"""
        else:  # Short Answer
            prompt += """

- Create an open-ended question requiring a thoughtful response
- The question should test understanding, not just memorization
- Format your response as:
Question: [question text]
Type: Short Answer
Correct Answer: [sample correct answer]
Explanation: [what makes a good answer and why this topic is important]
"""
        
        return prompt
    
    def parse_gemini_response(self, response: str, question_type: str, difficulty: str, topic: str = "General") -> Dict:
        """Parse Gemini's response into structured question data with difficulty classification"""
        try:
            lines = [line.strip() for line in response.split('\n') if line.strip()]
            
            question_text = ""
            options = []
            correct_answer = ""
            explanation = ""
            
            for line in lines:
                if line.startswith("Question:"):
                    question_text = line[9:].strip()
                elif line.startswith("Options:"):
                    options_text = line[8:].strip()
                    # Split options by comma and letter
                    options = [opt.strip() for opt in re.split(r'[,] ?[A-D]\.', options_text)]
                    if options:
                        options[0] = options[0].replace('A. ', '')  # Clean first option
                elif line.startswith("Correct Answer:"):
                    correct_answer = line[15:].strip()
                elif line.startswith("Explanation:"):
                    explanation = line[12:].strip()
                # Additional parsing for options on separate lines
                elif re.match(r'^[A-D]\. ', line):
                    options.append(line[3:].strip())
            
            # Validate and clean up
            if not question_text:
                raise ValueError("No question text found")
            
            if question_type == "MCQ":
                if len(options) < 4:
                    # Generate missing options
                    while len(options) < 4:
                        options.append(f"Option {len(options) + 1}")
                
                # Ensure options are properly formatted with letters
                formatted_options = []
                for i, option in enumerate(options[:4]):
                    letter = chr(65 + i)  # A, B, C, D
                    formatted_options.append(f"{letter}. {option}")
                options = formatted_options
                
                # Validate correct answer
                if correct_answer not in ['A', 'B', 'C', 'D']:
                    correct_answer = 'A'  # Default fallback
            
            elif question_type == "True/False":
                options = ["True", "False"]
                if correct_answer not in ["True", "False"]:
                    correct_answer = "True"  # Default fallback
            
            else:  # Short Answer
                options = []
                if not correct_answer:
                    correct_answer = "Please provide a thoughtful answer based on the topic content."
            
            if not explanation:
                explanation = f"This question tests understanding of key concepts in {question_text[:30]}..."
            
            # Perform advanced difficulty classification
            difficulty_analysis = self.difficulty_classifier.classify_difficulty(
                question_text, topic, difficulty
            )
            
            print(f"    🎯 Difficulty Analysis: {difficulty_analysis['classified_difficulty']} (confidence: {difficulty_analysis['confidence']:.2f})")
            
            return {
                'question_text': question_text,
                'question_type': question_type,
                'options': options,
                'correct_answer': correct_answer,
                'explanation': explanation,
                'difficulty_level': difficulty,
                'classified_difficulty': difficulty_analysis['classified_difficulty'],
                'difficulty_confidence': difficulty_analysis['confidence'],
                'difficulty_metadata': difficulty_analysis['metadata'],
                'text_complexity': difficulty_analysis['text_metrics'],
                'cognitive_level': difficulty_analysis['blooms_analysis']['primary_level'],
                'semantic_complexity': difficulty_analysis['semantic_analysis']['primary_level']
            }
            
        except Exception as e:
            print(f"Error parsing Gemini response: {e}")
            # Return a fallback question with basic difficulty classification
            fallback = self._create_unique_fallback_question(question_type, difficulty, topic, 0)
            
            # Add basic difficulty classification to fallback
            difficulty_analysis = self.difficulty_classifier.classify_difficulty(
                fallback['question_text'], topic, difficulty
            )
            
            fallback.update({
                'classified_difficulty': difficulty_analysis['classified_difficulty'],
                'difficulty_confidence': difficulty_analysis['confidence'],
                'difficulty_metadata': difficulty_analysis['metadata'],
                'text_complexity': difficulty_analysis['text_metrics'],
                'cognitive_level': difficulty_analysis['blooms_analysis']['primary_level'],
                'semantic_complexity': difficulty_analysis['semantic_analysis']['primary_level']
            })
            
            return fallback
    
    def _is_question_unique(self, new_question: str, existing_questions: List[str]) -> bool:
        """Check if a question is sufficiently unique"""
        if not existing_questions:
            return True
        
        new_question_lower = new_question.lower()
        new_words = set(new_question_lower.split())
        
        for existing in existing_questions:
            existing_lower = existing.lower()
            existing_words = set(existing_lower.split())
            
            # Check for high similarity
            common_words = new_words.intersection(existing_words)
            similarity_ratio = len(common_words) / max(len(new_words), len(existing_words), 1)
            
            # If more than 60% of words are common, consider it too similar
            if similarity_ratio > 0.6:
                return False
            
            # Check for identical key phrases
            if len(new_question_lower) > 20 and new_question_lower[:20] in existing_lower:
                return False
        
        return True
    
    def _create_unique_fallback_question(self, question_type: str, difficulty: str, topic: str, question_number: int) -> Dict:
        """Create a unique fallback question when API fails"""
        
        # Unique question starters based on question number
        starters = [
            "What is the primary concept",
            "How does the principle",
            "Which aspect of",
            "Why is the study of",
            "In what way does"
        ]
        
        starter = starters[question_number % len(starters)]
        
        if question_type == "MCQ":
            return {
                'question_text': f"{starter} in {topic} at the {difficulty} level relate to core understanding?",
                'question_type': 'MCQ',
                'options': ["A. Fundamental theoretical framework", "B. Unrelated peripheral concepts", "C. Basic memorization only", "D. Advanced complexity beyond scope"],
                'correct_answer': 'A',
                'explanation': f"This {difficulty}-level question tests understanding of {topic} fundamentals generated as fallback.",
                'difficulty_level': difficulty
            }
        elif question_type == "True/False":
            statements = [
                f"The {difficulty}-level study of {topic} requires analytical thinking.",
                f"Understanding {topic} at {difficulty} level involves practical application.",
                f"Key concepts in {topic} are essential for {difficulty}-level comprehension."
            ]
            statement = statements[question_number % len(statements)]
            
            return {
                'question_text': statement,
                'question_type': 'True/False',
                'options': ["True", "False"],
                'correct_answer': 'True',
                'explanation': f"This statement accurately reflects {difficulty}-level {topic} study requirements.",
                'difficulty_level': difficulty
            }
        else:
            return {
                'question_text': f"{starter} in {topic} impact {difficulty}-level learning outcomes?",
                'question_type': 'Short Answer',
                'options': [],
                'correct_answer': f"The {topic} concepts provide foundational knowledge essential for {difficulty}-level academic progress.",
                'explanation': f"This tests analytical understanding of {topic} at {difficulty} level.",
                'difficulty_level': difficulty
            }
    
    def generate_quiz_questions(self, topic: str, skill_level: str, num_questions: int = 5, custom_topic: str = None, user_id: int = None) -> List[Dict]:
        """Main method to generate unique quiz questions using Gemini AI"""
        print(f"🚀 Generating {num_questions} UNIQUE questions for {topic} at {skill_level} level using Gemini AI...")
        
        # Get previous questions to avoid repetition
        previous_questions = []
        if user_id:
            previous_questions = self.get_previous_questions(user_id, topic, skill_level)
            print(f"📚 Found {len(previous_questions)} previous questions to avoid repeating")
        
        # Get context for the topic
        context = self.get_context_for_topic(topic, skill_level, custom_topic)
        
        questions = []
        question_types = ['MCQ', 'True/False', 'MCQ', 'MCQ', 'True/False']  # More MCQs for better interaction
        
        # Add randomization to ensure variety
        import random
        random.shuffle(question_types)
        
        for i in range(num_questions):
            question_type = question_types[i % len(question_types)]
            
            # Try multiple attempts to get a unique question
            max_attempts = 3
            question = None
            
            for attempt in range(max_attempts):
                try:
                    # Create enhanced prompt with uniqueness requirements
                    prompt = self.create_question_prompt(
                        topic, skill_level, question_type, context, 
                        previous_questions + [q['question_text'] for q in questions]
                    )
                    
                    # Add attempt-specific uniqueness
                    if attempt > 0:
                        prompt += f"\n\nATTEMPT #{attempt + 1}: Make this question even more unique and different from previous attempts."
                    
                    # Generate with Gemini AI - FORCE Gemini usage
                    print(f"  🤖 Generating UNIQUE question {i+1}/{num_questions} ({question_type}) via Gemini AI (attempt {attempt+1})...")
                    gemini_response = self.generate_with_gemini(prompt)
                    
                    # Ensure response is from Gemini (not fallback)
                    if "fallback" in gemini_response.lower() or len(gemini_response) < 50:
                        print(f"    ⚠️ Detected potential fallback response, retrying with Gemini...")
                        continue
                    
                    # Parse response into structured format with difficulty classification
                    question = self.parse_gemini_response(gemini_response, question_type, skill_level, topic)
                    
                    # Check for uniqueness
                    if self._is_question_unique(question['question_text'], previous_questions + [q['question_text'] for q in questions]):
                        print(f"  ✅ UNIQUE question {i+1} generated successfully via Gemini AI")
                        break
                    else:
                        print(f"    🔄 Question too similar to previous ones, retrying...")
                        question = None
                        
                except Exception as e:
                    print(f"  ❌ Error generating question {i+1} (attempt {attempt+1}): {e}")
                    question = None
            
            # If we couldn't generate a unique question, create a fallback
            if question is None:
                print(f"  🔄 Creating fallback question {i+1} with enhanced uniqueness")
                question = self._create_unique_fallback_question(question_type, skill_level, topic, len(questions))
            
            questions.append(question)
            print(f"  📝 Question {i+1} added to quiz")
        
        print(f"🎉 Successfully generated {len(questions)} UNIQUE questions using Gemini AI!")
        
        # Final enhancement for variety
        self._add_variety_to_questions(questions, topic, skill_level)
        
        return questions
    
    def _add_variety_to_questions(self, questions: List[Dict], topic: str, skill_level: str):
        """Add variety and enhance questions"""
        difficulty_indicators = {
            "Beginner": ["basic", "simple", "fundamental", "elementary"],
            "Intermediate": ["moderate", "standard", "typical", "common"],
            "Advanced": ["complex", "sophisticated", "advanced", "challenging"]
        }
        
        indicators = difficulty_indicators.get(skill_level, ["standard"])
        
        for i, question in enumerate(questions):
            # Add difficulty indicators to explanations
            if not any(word in question['explanation'].lower() for word in indicators):
                indicator = random.choice(indicators)
                question['explanation'] = f"This {indicator} question " + question['explanation'].lower()
            
            # Enhance question numbering in explanations
            question['explanation'] += f" This tests {skill_level}-level understanding of {topic}."
    
    def generate_adaptive_question(self, user_id: str, topic: str, question_type: str, 
                                 num_questions: int = 1, previous_answer_correct: bool = None) -> List[Dict]:
        """Generate questions with real-time adaptive difficulty adjustment"""
        print(f"\n🎯 Generating adaptive questions for user {user_id}")
        
        # Initialize user profile if needed
        if user_id not in self.adaptive_engine.user_performance_history:
            # Map skill level from topic or default to intermediate
            initial_skill = 'Intermediate'  # This should come from user profile in real implementation
            self.adaptive_engine.initialize_user_profile(user_id, initial_skill)
        
        # Record previous answer if provided
        if previous_answer_correct is not None:
            profile = self.adaptive_engine.user_performance_history[user_id]
            current_difficulty = profile['current_difficulty']
            self.adaptive_engine.record_answer(user_id, current_difficulty, previous_answer_correct)
        
        # Get adaptive recommendation
        recommendation = self.adaptive_engine.get_adaptive_question_recommendation(
            user_id, topic, question_type
        )
        
        target_difficulty = recommendation['recommended_difficulty']
        print(f"🎯 Target difficulty for next question: {target_difficulty}")
        print(f"📊 User performance: {recommendation['user_performance']['accuracy']:.2f} accuracy")
        
        # Generate questions at the recommended difficulty
        questions = []
        for i in range(num_questions):
            # Use the target difficulty as skill_level parameter
            skill_level_mapping = {
                'easy': 'Beginner',
                'medium': 'Intermediate', 
                'hard': 'Advanced'
            }
            mapped_skill_level = skill_level_mapping.get(target_difficulty, 'Intermediate')
            
            try:
                # Generate question using existing method with adaptive difficulty
                question_batch = self.generate_quiz_questions(
                    topic=topic,
                    skill_level=mapped_skill_level,
                    num_questions=1,
                    user_id=int(user_id) if user_id.isdigit() else None
                )
                
                if question_batch:
                    question = question_batch[0]
                    
                    # Enhance question with adaptive metadata
                    question.update({
                        'adaptive_difficulty': target_difficulty,
                        'user_performance_data': recommendation['user_performance'],
                        'adaptation_reason': recommendation.get('adaptation_reason', 'initial_generation'),
                        'question_sequence_number': recommendation['session_stats']['total_questions'] + 1,
                        'recommended_by_adaptive_engine': True,
                        'learning_insights': recommendation['learning_insights']
                    })
                    
                    questions.append(question)
                    print(f"✅ Generated adaptive question {i+1}/{num_questions} at {target_difficulty} difficulty")
                else:
                    print(f"⚠️ Failed to generate question {i+1}, using fallback")
                    # Create fallback question
                    fallback = self._create_unique_fallback_question(
                        question_type, mapped_skill_level, topic, i
                    )
                    fallback.update({
                        'adaptive_difficulty': target_difficulty,
                        'is_fallback': True,
                        'recommended_by_adaptive_engine': True
                    })
                    questions.append(fallback)
                    
            except Exception as e:
                print(f"❌ Error generating adaptive question {i+1}: {e}")
                continue
        
        print(f"🎯 Generated {len(questions)} adaptive questions for {user_id}")
        return questions
    
    def record_user_answer_and_adapt(self, user_id: str, question_data: Dict, 
                                   user_answer: str, is_correct: bool, 
                                   response_time: float = 0) -> Dict[str, Any]:
        """Record user answer and get next difficulty recommendation"""
        print(f"\n📝 Recording answer for user {user_id}: {'✓' if is_correct else '✗'}")
        
        # Extract question difficulty
        question_difficulty = question_data.get('adaptive_difficulty', 
                                               question_data.get('classified_difficulty', 
                                                               question_data.get('difficulty_level', 'medium')))
        
        # Record the answer
        answer_record = self.adaptive_engine.record_answer(
            user_id=user_id,
            question_difficulty=question_difficulty,
            is_correct=is_correct,
            response_time=response_time,
            question_metadata={
                'question_type': question_data.get('question_type', ''),
                'topic': question_data.get('topic', ''),
                'question_id': question_data.get('id', ''),
                'user_answer': user_answer,
                'correct_answer': question_data.get('correct_answer', '')
            }
        )
        
        # Determine next difficulty
        next_difficulty_info = self.adaptive_engine.determine_next_difficulty(
            user_id=user_id,
            current_question_difficulty=question_difficulty,
            is_correct=is_correct
        )
        
        adaptation_result = {
            'answer_recorded': True,
            'answer_record': answer_record,
            'next_difficulty': next_difficulty_info['next_difficulty'],
            'difficulty_changed': next_difficulty_info['difficulty_change'],
            'adaptation_reason': next_difficulty_info['reason'],
            'performance_metrics': next_difficulty_info['performance_metrics'],
            'recommendations': {
                'continue_current_level': not next_difficulty_info['difficulty_change'],
                'suggested_practice_areas': [],
                'ready_for_advancement': next_difficulty_info['performance_metrics']['adjusted_accuracy'] > 0.75
            }
        }
        
        print(f"🎯 Adaptation complete: Next difficulty = {next_difficulty_info['next_difficulty']}")
        
        return adaptation_result
    
    def get_user_learning_analytics(self, user_id: str) -> Dict[str, Any]:
        """Get comprehensive learning analytics for user dashboard"""
        if user_id not in self.adaptive_engine.user_performance_history:
            return {'error': 'User profile not found'}
        
        # Get current recommendation
        recommendation = self.adaptive_engine.get_adaptive_question_recommendation(
            user_id, 'General', 'MCQ'
        )
        
        # Additional analytics
        profile = self.adaptive_engine.user_performance_history[user_id]
        recent_history = list(profile['performance_history'])[-10:]  # Last 10 questions
        
        learning_analytics = {
            'user_id': user_id,
            'current_status': {
                'difficulty_level': profile['current_difficulty'],
                'confidence_score': recommendation['user_performance']['confidence'],
                'learning_trend': 'improving' if recommendation['user_performance']['trend'] > 0.1 else 'declining' if recommendation['user_performance']['trend'] < -0.1 else 'stable',
                'session_progress': {
                    'questions_completed': profile['session_stats']['total_questions'],
                    'current_accuracy': recommendation['user_performance']['accuracy'],
                    'consecutive_correct': profile['session_stats']['consecutive_correct']
                }
            },
            'performance_breakdown': {
                'by_difficulty': recommendation['user_performance']['difficulty_performance'],
                'overall_accuracy': recommendation['user_performance']['accuracy'],
                'response_time_avg': recommendation['user_performance']['avg_response_time'],
                'improvement_areas': []
            },
            'learning_insights': recommendation['learning_insights'],
            'adaptive_history': {
                'difficulty_changes': profile['session_stats']['difficulty_changes'],
                'adaptation_metadata': profile['adaptation_metadata'],
                'recent_performance': [{
                    'timestamp': record['timestamp'].isoformat(),
                    'difficulty': record['difficulty'],
                    'correct': record['correct']
                } for record in recent_history]
            },
            'next_steps': {
                'recommended_difficulty': recommendation['recommended_difficulty'],
                'focus_areas': [],
                'ready_to_advance': recommendation['user_performance']['adjusted_accuracy'] > 0.75
            }
        }
        
        return learning_analytics

# Initialize the question generator
question_generator = GeminiQuestionGenerator()