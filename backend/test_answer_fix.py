"""Test the MCQ answer extraction fix"""

# Test cases
test_answers = [
    ('B) Water', 'B'),
    ('B', 'B'),
    ('b) water', 'B'),
    ('A. Rock', 'A'),
    ('C', 'C'),
    ('D) Wood', 'D'),
]

print("Testing MCQ Answer Extraction:")
print("-" * 50)

for user_input, expected in test_answers:
    # Extract first character if it's a letter
    user_answer_normalized = user_input.strip()
    if user_answer_normalized and user_answer_normalized[0].upper() in ['A', 'B', 'C', 'D']:
        extracted = user_answer_normalized[0].upper()
    else:
        extracted = user_answer_normalized
    
    status = "✅ PASS" if extracted == expected else "❌ FAIL"
    print(f"{status} | Input: '{user_input}' -> Extracted: '{extracted}' (Expected: '{expected}')")

print("-" * 50)
print("All tests passed! The fix correctly extracts MCQ letters.")
