# Smart Quizzer AI

An intelligent, adaptive quiz generation platform powered by AI that creates personalized learning experiences.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.8+-blue.svg)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.x-yellow.svg)](https://python.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3+-cyan.svg)](https://tailwindcss.com/)

## Features

### AI-Powered Question Generation
- Google Gemini AI integration for dynamic question creation
- Context-aware questions based on custom topics or predefined subjects
- Adaptive difficulty scaling based on user skill level
- Multiple question types: MCQ, True/False, Short Answer

### Secure Authentication
- JWT-based authentication with bcrypt password hashing
- User profiles with skill level tracking
- Session management with automatic token handling
- Demo mode for quick testing

### Comprehensive Analytics
- Real-time performance tracking with instant feedback
- Detailed quiz results with explanations for learning
- Progress statistics and improvement trends
- Quiz history with filtering capabilities

### Modern User Experience
- Responsive design with Tailwind CSS
- Real-time feedback during quiz taking
- Intuitive dashboard with quick stats
- Smooth animations and loading states

## Technology Stack

### Frontend
- React 18 - Modern JavaScript library
- TypeScript - Static typing for better development
- Tailwind CSS - Utility-first CSS framework
- React Router - Client-side routing
- Axios - HTTP client for API calls

### Backend
- Python 3.x - Programming language
- Flask 2.3 - Lightweight web framework
- SQLite - File-based database
- SQLAlchemy - Object-Relational Mapping
- JWT Extended - JSON Web Token authentication
- Google Gemini AI - AI question generation

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
   cd Smart-Quizzer-AI
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   
   # Set up environment variables (IMPORTANT!)
   python setup_env.py
   # OR manually copy .env.example to .env and add your API keys
   
   python app.py
   ```
   Backend will run on `http://localhost:5000`

3. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend will run on `http://localhost:3000`

### Environment Setup

**IMPORTANT: Secure your API keys!**

1. **Automated Setup (Recommended):**
   ```bash
   cd backend
   python setup_env.py
   ```

2. **Manual Setup:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env file and add your API keys
   ```

3. **Required Environment Variables:**
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   SECRET_KEY=your_secure_secret_key_here
   DATABASE_URL=sqlite:///smart_quizzer.db
   ```

**Get your Gemini API key:** https://makersuite.google.com/app/apikey

**Security Note:** Never commit your `.env` file to version control!

## Usage

### Getting Started
1. Register a new account or use demo login
2. Choose a topic from predefined subjects or create custom content
3. Select difficulty level (Beginner/Intermediate/Advanced)
4. Take the quiz with real-time feedback
5. View results with detailed explanations and performance analytics

### Available Topics
- Mathematics - Mathematical concepts and problems
- Science - Scientific principles and discoveries
- History - Historical events and civilizations
- Literature - Literary works and analysis
- Geography - Physical and human geography
- Custom Topics - Upload your own content for personalized quizzes

### Dashboard Features
- Quick Stats: Total quizzes, average score, completion rate
- Recent Activity: Latest quiz attempts and scores
- Progress Tracking: Performance trends over time
- Quiz History: Detailed records of all past attempts

## Architecture

```
React Frontend (TypeScript + Tailwind CSS)
           ↕ HTTP/JSON
Flask Backend (Python + SQLAlchemy + JWT Auth + Gemini AI)
           ↕
SQLite Database (Users, Quiz Sessions, Questions, Topics)
```

## Project Structure

```
Smart-Quizzer-AI/
├── backend/                    # Flask backend
│   ├── app.py                 # Main Flask application
│   ├── auth.py                # Authentication logic
│   ├── models.py              # Database models
│   ├── question_gen.py        # AI question generation
│   ├── requirements.txt       # Python dependencies
│   ├── setup_env.py           # Environment setup script
│   ├── .env.example           # Environment template
│   └── instance/
│       └── smart_quizzer.db   # SQLite database
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/            # Main page components
│   │   ├── lib/              # Utilities and API clients
│   │   └── App.tsx           # Main App component
│   ├── public/               # Static assets
│   ├── package.json          # Node.js dependencies
│   └── tailwind.config.js    # Tailwind configuration
├── .gitignore                # Git ignore rules
├── LICENSE                   # MIT License
└── README.md                 # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Quiz Management
- `GET /api/topics` - Get available topics
- `POST /api/quiz/start` - Start a new quiz
- `POST /api/quiz/{id}/answer` - Submit quiz answer
- `GET /api/quiz/{id}/results` - Get quiz results
- `GET /api/quiz/history` - Get quiz history

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices for frontend
- Use Python PEP 8 style guide for backend
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- **Batchu Mamatha** - *Initial work* - [@BatchuMamatha](https://github.com/BatchuMamatha)

## Acknowledgments

- Google Gemini AI for intelligent question generation
- React community for excellent documentation
- Flask team for the lightweight framework
- Tailwind CSS for beautiful styling utilities

## Support

If you have any questions or run into issues, please:

1. Check the documentation above
2. Search for existing issues on GitHub
3. Create a new issue with detailed information

---

**Built for better learning experiences**