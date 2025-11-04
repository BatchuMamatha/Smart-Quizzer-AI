# 🎓 Smart Quizzer AI

### Adaptive AI-Based Learning & Quiz Generation Platform

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Flask](https://img.shields.io/badge/Backend-Flask-green?logo=flask)
![Python](https://img.shields.io/badge/Language-Python-yellow?logo=python)
![TypeScript](https://img.shields.io/badge/TypeScript-4.8+-informational?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 📘 Overview

**Smart Quizzer AI** is an intelligent, adaptive learning platform that uses artificial intelligence to generate personalized quizzes from educational content such as PDFs, URLs, or text.
The platform automatically evaluates user responses, adjusts question difficulty in real-time, and provides performance analytics through detailed dashboards and leaderboards.

Ideal for:

* 🎓 Students preparing for exams
* 👩‍🏫 Educators designing dynamic assessments
* 💼 Corporate training and certification programs
* 📚 Self-learners seeking personalized study tools

---

## ✨ Key Features

### 🤖 AI-Powered Question Generation

* Generates quizzes from **PDFs, DOCX files, URLs, and plain text**
* Powered by **Google Gemini AI** for contextual, relevant question creation
* Supports **MCQ, True/False, and Short Answer** formats
* Classifies questions using **Bloom’s Taxonomy** (Easy, Medium, Hard)

### 🎯 Adaptive Learning Engine

* Adjusts question difficulty dynamically based on performance
* Tracks user accuracy and completion time to personalize quizzes
* Learns from past attempts to improve future question difficulty

### 🧠 Semantic Answer Evaluation

* Uses **Sentence-Transformers NLP** to assess answer similarity
* Recognizes conceptually correct answers (not just keyword matches)
* Provides **explanations and hints** for each question

### 📊 Leaderboards & Analytics

* **Real-time global leaderboard** — ranked by accuracy and speed
* **User progress tracking** with performance trends by topic
* Visual charts show accuracy, quiz history, and learning growth

### 🌟 Gamification

* Achievement badges (Perfect Score, Quiz Master, Streak Winner, etc.)
* Skill-level progression from Beginner → Intermediate → Expert
* Motivates users with score streaks and achievements

### 👨‍💼 Admin Dashboard

* Manage users and monitor platform analytics
* Review flagged questions and feedback submitted by learners
* Access global leaderboards, system stats, and moderation tools

---

## 🧱️ Technology Stack

| Layer                | Technology                              | Description                                 |
| -------------------- | --------------------------------------- | ------------------------------------------- |
| **Frontend**         | React 18, TypeScript, Tailwind CSS      | Responsive and modern user interface        |
| **Backend**          | Flask (Python)                          | REST API and business logic                 |
| **Database**         | SQLite / PostgreSQL                     | Stores users, quizzes, and results          |
| **AI/NLP**           | Google Gemini AI, Sentence-Transformers | Question generation and semantic evaluation |
| **Authentication**   | JWT + BCrypt                            | Secure user login and roles                 |
| **Real-time Engine** | Flask-SocketIO                          | Multiplayer and live updates                |
| **Deployment**       | Docker + Nginx                          | Production-ready deployment setup           |

---

## ⚙️ Quick Start (Development Setup)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
cd Smart-Quizzer-AI
```

### 2️⃣ Setup Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

Backend runs on: **[http://localhost:5000](http://localhost:5000)**

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

Frontend runs on: **[http://localhost:3000](http://localhost:3000)**

### 4️⃣ Docker (Optional)

```bash
docker-compose up --build
```

---

## 📂 Project Structure

```
Smart-Quizzer-AI/
├── backend/
│   ├── app.py                # Flask API entry
│   ├── models.py             # Database models
│   ├── question_gen.py       # AI-based question generator
│   ├── answer_evaluator.py   # NLP answer evaluator
│   ├── init_database.py      # Creates default users/admins
│   └── requirements.txt      # Dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/            # React pages (Dashboard, Quiz, Admin)
│   │   ├── components/       # Reusable UI components
│   │   └── lib/              # Utilities & API handlers
│   ├── package.json          # Frontend dependencies
│   └── Dockerfile            # Frontend container setup
│
├── docker-compose.yml        # Docker orchestration
├── LICENSE                   # MIT License
└── README.md                 # Documentation
```

---

## 🎮 How to Use

1. **Register or log in** as a user.
2. **Upload study material** (PDF, DOCX, URL, or text).
3. **Start a quiz** — select topic, difficulty, and number of questions.
4. **Answer questions** — difficulty adjusts automatically in real-time.
5. **Submit & Review Results**:

   * Correctness and explanations
   * Analytics and leaderboard rank
6. **Admins** can monitor user progress and flagged content.

---

## 🧑‍💻 User Roles

### 👩‍🎓 Regular User

* Take adaptive quizzes
* Get instant feedback and explanations
* View quiz history, analytics, and badges
* Compete on leaderboards

### 👨‍💼 Admin

* Manage all users and quizzes
* Review flagged questions and feedback
* Access global leaderboard
* Track platform statistics

---

## 📈 Leaderboard Logic

| Metric              | Description                             |
| ------------------- | --------------------------------------- |
| **Accuracy**        | Higher accuracy = better ranking        |
| **Time Taken**      | Faster completion increases score       |
| **Recent Activity** | Recent quiz takers appear at the top    |
| **Dynamic Update**  | Refreshes automatically after each quiz |

---

## 🛧️ Current Status

🔁 Implemented Modules:

* User authentication and profile management
* AI-based question generation
* Adaptive learning engine
* Semantic answer evaluation
* Leaderboard and analytics system
* Admin moderation dashboard

🔜 Future Enhancements:

* Voice-based quizzes and multilingual support
* Mobile app (React Native)
* AI-powered personalized study recommendations

---

## 🧳 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute with attribution.

---

## 👩‍💻 Maintainer

**Batchu Mamatha**
🔗 [GitHub: BatchuMamatha](https://github.com/BatchuMamatha)
📧 For issues and feature requests: [GitHub Issues](https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues)

---

> 🌟 **Smart Quizzer AI – Making Learning Adaptive,
