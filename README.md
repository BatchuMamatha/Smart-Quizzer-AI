# Smart Quizzer AI 🎓



**An intelligent, AI-powered adaptive learning platform that generates personalized quizzes and provides real-time performance analytics**



[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react&logoColor=white)](https://reactjs.org/)An intelligent, AI-powered adaptive learning platform that generates personalized quizzes, evaluates answers semantically, and provides real-time performance analytics.**An intelligent, AI-powered adaptive learning platform that generates personalized quizzes, evaluates answers semantically, and provides real-time performance analytics.****An intelligent quiz generation platform powered by AI that creates personalized learning experiences with real-time feedback, adaptive difficulty adjustment, and comprehensive analytics.**

[![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)

[![Python](https://img.shields.io/badge/Python-3.9+-3776ab?logo=python&logoColor=white)](https://python.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-4.8-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)



---[![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?logo=flask)](https://flask.palletsprojects.com/)



## 📖 Overview[![Python](https://img.shields.io/badge/Python-3.9+-3776ab?logo=python)](https://python.org/)[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)



Smart Quizzer AI is a modern web-based learning platform that combines the power of artificial intelligence with adaptive learning methodologies. The system automatically generates contextually relevant quiz questions from uploaded content (PDFs, documents, URLs, or text), evaluates answers using natural language processing, and dynamically adjusts difficulty based on user performance.[![TypeScript](https://img.shields.io/badge/TypeScript-4.8-3178c6?logo=typescript)](https://www.typescriptlang.org/)



**Perfect for**: Students preparing for exams, educators creating assessments, self-learners tracking progress, and corporate training programs.[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)[![Flask](https://img.shields.io/badge/Flask-3.0.0-green.svg)](https://flask.palletsprojects.com/)



---



## ✨ Key Features---[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://python.org/)



### 🤖 AI-Powered Question Generation

- Automatically generates quiz questions from uploaded content using **Google Gemini AI**

- Supports multiple formats: PDF, DOCX, URLs, and plain text## 📚 Table of Contents[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue.svg)](https://www.typescriptlang.org/)

- Questions classified by **Bloom's Taxonomy** (Remember, Understand, Apply, Analyze, Evaluate, Create)

- Three difficulty levels: Easy, Medium, and Hard



### 📊 Adaptive Learning System- [Project Overview](#project-overview)[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

- Real-time difficulty adjustment based on user performance

- Personalized learning paths tailored to individual knowledge gaps- [Key Features](#key-features)

- Comprehensive analytics with performance trends and topic mastery tracking

- Visual dashboards with charts, heatmaps, and progress reports- [Technology Stack](#technology-stack)



### 🎯 Intelligent Answer Evaluation- [Quick Start](#quick-start)

- Semantic similarity matching using **Sentence-Transformers** (NLP)

- Accepts answers that demonstrate conceptual understanding (75% similarity threshold)- [Project Structure](#project-structure)------

- Contextual feedback with detailed explanations for correct and incorrect answers

- Support for Multiple Choice, True/False, and Short Answer questions- [Usage](#usage)



### 🏆 Gamification & Engagement- [Project Status](#project-status)

- **21 achievement badges** (Quiz Starter, Perfect Score, Streak Master, Marathon Runner, etc.)

- Global leaderboards with weekly, monthly, and all-time rankings- [Contributing](#contributing)

- Points and rewards system to motivate consistent learning

- Skill level progression from Beginner to Expert- [License](#license)## 📚 Table of Contents## Contact



### 🌐 Real-Time Multiplayer- [Contact](#contact)
---

# Smart Quizzer AI 🎓

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.0.0-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776ab?logo=python&logoColor=white)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.8-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An intelligent, AI-powered adaptive learning platform that generates personalized quizzes, evaluates answers semantically, and provides real-time performance analytics.

---

## Table of Contents
- Overview
- Key Features
- Technology Stack
- Quick Start
- Project Structure
- Demo / Usage
- Contributing
- License & Contact

---

## 📖 Overview

Smart Quizzer AI converts study materials (PDF/DOCX/URLs/text) into high-quality quizzes using AI. It evaluates short answers semantically, adapts difficulty to each learner, and provides dashboards and analytics to track progress.

Who it's for: students, educators, self-learners, and corporate training teams.

---

## ✨ Key Features

- AI-powered question generation (Google Gemini integration)
- Semantic answer evaluation (Sentence-Transformers)
- Adaptive difficulty and personalized learning paths
- Multiple question types: MCQ, True/False, Short Answer
- Real-time multiplayer quiz rooms and leaderboards
- Gamification with badges and achievements
- Admin dashboard for content moderation and analytics

---

## 🛠️ Technology Stack

Frontend: React (18.2.0), TypeScript, Tailwind CSS, React Router, Axios, Socket.IO Client

Backend: Flask (3.0.0), SQLAlchemy, Flask-SocketIO, Flask-JWT-Extended, Google Gemini AI, Sentence-Transformers, BCrypt

Database: SQLite (development), PostgreSQL recommended for production

Tools & libs: pdfplumber / PyPDF2, python-docx, BeautifulSoup4, NLTK

---

## 🚀 Quick Start (development)

1. Clone the repo:

```powershell
git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
cd Smart-Quizzer-AI
```

2. Backend (Windows example):

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# copy .env.example to .env and add your keys
python app.py
# Backend runs on http://localhost:5000
```

3. Frontend:

```powershell
cd ../frontend
npm install
npm start
# Frontend runs on http://localhost:8080
```

For full setup details, see `SETUP.md`.

---

## 📁 Project Structure (high-level)

Smart-Quizzer-AI/
- backend/        # Flask backend (API, AI services, DB models)
- frontend/       # React app (pages, components, styles)
- PROJECT_DOCUMENTATION.md
- SETUP.md
- PRESENTATION.md
- LICENSE

See the repository for a more detailed layout.

---

## 🎮 Demo / Usage (brief)

1. Register and log in.
2. Upload content (PDF/DOCX/URL/text) in Content Upload.
3. Generate a quiz (choose topic, difficulty, and length).
4. Take the quiz — get semantic evaluation and explanations.
5. Review analytics and learning recommendations.

---

## 🤝 Contributing

Contributions welcome — fork, create a feature branch, add tests, and open a PR. Please follow the commit message conventions: `type: short description` (e.g., `feat: add similarity threshold config`). See `CONTRIBUTING` or open an issue first for larger changes.

---

## 📄 License & Contact

This project is licensed under the MIT License — see `LICENSE` for details.

Maintainer: Mamatha Bachu — https://github.com/BatchuMamatha

Issues & feature requests: https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues

---

Thank you for using Smart Quizzer AI — empowering learners with AI-driven adaptive assessments.

- Real-time multiplayer quiz rooms and leaderboards
- Gamification with badges and achievements
- Admin dashboard for content moderation and analytics

---

## 🛠️ Technology Stack

Frontend: React (18.2.0), TypeScript, Tailwind CSS, React Router, Axios, Socket.IO Client

Backend: Flask (3.0.0), SQLAlchemy, Flask-SocketIO, Flask-JWT-Extended, Google Gemini AI, Sentence-Transformers, BCrypt

Database: SQLite (development), PostgreSQL recommended for production

Tools & libs: pdfplumber / PyPDF2, python-docx, BeautifulSoup4, NLTK

---

## 🚀 Quick Start (development)

1. Clone the repo:

```powershell
git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
cd Smart-Quizzer-AI
```

2. Backend (Windows example):

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# copy .env.example to .env and add your keys
python app.py
# Backend runs on http://localhost:5000
```

3. Frontend:

```powershell
cd ../frontend
npm install
npm start
# Frontend runs on http://localhost:8080
```

For full setup details, see `SETUP.md`.

---

## 📁 Project Structure (high-level)

Smart-Quizzer-AI/
- backend/        # Flask backend (API, AI services, DB models)
- frontend/       # React app (pages, components, styles)
- PROJECT_DOCUMENTATION.md
- SETUP.md
- PRESENTATION.md
- LICENSE

See the repository for a more detailed layout.

---

## 🎮 Demo / Usage (brief)

1. Register and log in.
2. Upload content (PDF/DOCX/URL/text) in Content Upload.
3. Generate a quiz (choose topic, difficulty, and length).
4. Take the quiz — get semantic evaluation and explanations.
5. Review analytics and learning recommendations.

---

## 🤝 Contributing

Contributions welcome — fork, create a feature branch, add tests, and open a PR. Please follow the commit message conventions: `type: short description` (e.g., `feat: add similarity threshold config`). See `CONTRIBUTING` or open an issue first for larger changes.

---

## 📄 License & Contact

This project is licensed under the MIT License — see `LICENSE` for details.

Maintainer: Mamatha Bachu — https://github.com/BatchuMamatha

Issues & feature requests: https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues

---

Thank you for using Smart Quizzer AI — empowering learners with AI-driven adaptive assessments.

   - View "Analytics Dashboard" for trends and insights### Development Workflow

   - See topic mastery on heatmaps

   - Get AI-recommended learning paths1. **Fork the repository** on GitHub

2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`

6. **Compete & Earn**3. **Make your changes** following our coding standards

   - View global "Leaderboard" rankings4. **Run tests**: 

   - Join multiplayer quiz rooms for real-time competition   - Backend: `pytest`

   - Earn badges for achievements   - Frontend: `npm test`

   - Track skill level progression5. **Commit your changes**: `git commit -m 'Add AmazingFeature'`

6. **Push to branch**: `git push origin feature/AmazingFeature`

### For Admins7. **Open a Pull Request** with a detailed description

---

1. **Access Admin Dashboard**

   - Login with admin account## License

   - Navigate to "Admin Dashboard"

This project is licensed under the **MIT License**.

2. **Manage Users**

   - View all registered users```

   - Monitor user activity and engagementMIT License

   - Access user performance statistics

Copyright (c) 2025 Mamatha Bachu

3. **Moderate Content**

   - Review flagged questionsPermission is hereby granted, free of charge, to any person obtaining a copy

   - Read user feedback on questionsof this software and associated documentation files (the "Software"), to deal

   - Monitor system health metricsin the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

4. **Configure System**copies of the Software, and to permit persons to whom the Software is

   - Manage badge criteriafurnished to do so, subject to the following conditions:

   - View platform-wide analytics

   - Export data for reportingThe above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.

---

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

## Project StatusIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

### ✅ Fully Implemented FeaturesAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

- User authentication and authorization (JWT)OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

- AI question generation from multiple content typesSOFTWARE.

- Adaptive difficulty adjustment```

- Semantic answer evaluation (NLP)

- Quiz history and results trackingSee [LICENSE](LICENSE) file for full details.

- Performance analytics and visualizations

- Badge/achievement system (21 badges)---

- Global leaderboards

- Real-time multiplayer quiz rooms## Contact

- Learning path recommendations

- Admin dashboard and moderation tools**Project Maintainer**: Mamatha Bachu

- Content upload and processing (PDF/DOCX/URL/Text)

**GitHub Repository**: [github.com/BatchuMamatha/Smart-Quizzer-AI](https://github.com/BatchuMamatha/Smart-Quizzer-AI)

### 🚧 Known Limitations

**For Support**:

- SQLite database suitable for development/small deployments (use PostgreSQL for production)- 🐛 Report bugs via [GitHub Issues](https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues)

- Google Gemini API has rate limits (60 requests/min on free tier)- 💡 Request features via [GitHub Issues](https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues)

- File upload limited to 16MB- 📧 General inquiries: Check repository discussions

- Multiplayer rooms support up to 10 participants

---

### 📈 Potential Enhancements

## Acknowledgments

- Mobile application (React Native)

- Video content support- **Google Gemini AI** for powering intelligent question generation

- Voice-based quiz mode- **Hugging Face** for providing state-of-the-art NLP models

- Collaborative study groups- **Flask** and **React** communities for excellent documentation and support

- Scheduled quizzes and reminders- All open-source contributors who made this project possible

- Integration with LMS platforms

- Advanced analytics with ML predictions---



---**Made with ❤️ by Mamatha Bachu**



## Contributing*Empowering learners worldwide through AI-driven adaptive assessments*



We welcome contributions! Here's how you can help:---



1. **Fork the repository****⭐ If you find this project useful, please consider giving it a star on GitHub!**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following these guidelines:
   - Follow PEP 8 for Python code
   - Use ESLint/Prettier for TypeScript/React
   - Write clear commit messages
   - Add comments for complex logic
   - Test your changes locally

4. **Commit your changes**
   ```bash
   git commit -m "feat: Add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Ensure all tests pass

### Commit Message Format
```
<type>: <description>

Types: feat, fix, docs, style, refactor, test, chore
Example: feat: Add semantic similarity threshold configuration
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

**Project Maintainer**: Mamatha Bachu

**GitHub**: [BatchuMamatha/Smart-Quizzer-AI](https://github.com/BatchuMamatha/Smart-Quizzer-AI)

**Issues & Bug Reports**: [GitHub Issues](https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues)

---

## Acknowledgments

- **Google Gemini AI** for powerful question generation capabilities
- **Sentence-Transformers** for semantic similarity evaluation
- **Flask** and **React** communities for excellent frameworks
- **Tailwind CSS** for beautiful, responsive design
- All contributors and users who help improve this project

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**

**📖 For technical details and API documentation, see [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)**

**🎤 For implementation presentation, see [PRESENTATION.md](PRESENTATION.md)**
