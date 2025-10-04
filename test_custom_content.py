#!/usr/bin/env python3
"""
Test script to verify custom content quiz generation is working correctly
"""

import requests
import json

# Test content
test_content = """
Artificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines that can perform tasks typically requiring human intelligence. Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed.

Deep Learning is a subset of Machine Learning that uses neural networks with multiple layers to model and understand complex patterns in data. Neural networks are inspired by the structure and function of the human brain, consisting of interconnected nodes (neurons) that process and transmit information.

Key concepts in AI include:
1. Supervised Learning: Training models using labeled data
2. Unsupervised Learning: Finding patterns in unlabeled data  
3. Reinforcement Learning: Learning through trial and error with rewards
4. Natural Language Processing: Understanding and generating human language
5. Computer Vision: Interpreting and analyzing visual information
"""

def test_custom_content_quiz():
    """Test if the backend generates questions about the actual content"""
    
    # Login first (using demo credentials)
    login_response = requests.post('http://localhost:5000/api/auth/login', json={
        'username': 'test_user',
        'password': 'password'
    })
    
    if login_response.status_code != 200:
        print("❌ Login failed")
        return False
    
    login_data = login_response.json()
    token = login_data['tokens']['access_token']
    
    # Test quiz generation with custom content
    quiz_payload = {
        'topic': 'Artificial Intelligence and Machine Learning',
        'skill_level': 'Intermediate', 
        'num_questions': 3,
        'custom_topic': test_content
    }
    
    headers = {'Authorization': f'Bearer {token}'}
    quiz_response = requests.post('http://localhost:5000/api/quiz/start', 
                                json=quiz_payload, headers=headers)
    
    if quiz_response.status_code != 201:
        print(f"❌ Quiz generation failed: {quiz_response.text}")
        return False
    
    quiz_data = quiz_response.json()
    questions = quiz_data.get('questions', [])
    
    print(f"✅ Quiz generated successfully with {len(questions)} questions")
    
    # Check if questions are about the actual content
    ai_related_keywords = ['artificial intelligence', 'machine learning', 'deep learning', 
                          'neural network', 'supervised', 'unsupervised', 'reinforcement']
    
    for i, question in enumerate(questions, 1):
        question_text = question['question_text'].lower()
        print(f"\n📝 Question {i}: {question['question_text']}")
        
        # Check if question contains AI-related content
        contains_ai_content = any(keyword in question_text for keyword in ai_related_keywords)
        
        # Check if question is NOT about "custom content upload"
        not_about_upload = 'custom content upload' not in question_text and 'upload' not in question_text
        
        if contains_ai_content and not_about_upload:
            print(f"✅ Question {i} is correctly about the uploaded content")
        else:
            print(f"❌ Question {i} may not be about the uploaded content")
            if not not_about_upload:
                print(f"   🚨 Question seems to be about 'upload' instead of content")
            if not contains_ai_content:
                print(f"   🚨 Question doesn't contain AI-related keywords")
    
    return True

if __name__ == "__main__":
    print("🧪 Testing Custom Content Quiz Generation...")
    test_custom_content_quiz()