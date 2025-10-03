# 🧠 Smart Quizzer AI# Smart Quizzer - AI-Driven Questions Generation System



> An intelligent, adaptive quiz generation platform powered by AI that creates personalized learning experiences.An advanced AI-powered quiz generation system built with Python (Flask), React, and Hugging Face Transformers. This project implements **Module 1 (User Input & Topic Selection)** and **Module 2 (AI-Based Question Generation)** with adaptive difficulty and real-time performance evaluation.



[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)## 🎯 Features

[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)

[![TypeScript](https://img.shields.io/badge/TypeScript-4.8+-blue.svg)](https://www.typescriptlang.org/)### 🏗️ Module 1: User Input & Topic Selection

[![Python](https://img.shields.io/badge/Python-3.x-yellow.svg)](https://python.org/)- **User Authentication**: Secure registration/login with JWT tokens

[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3+-cyan.svg)](https://tailwindcss.com/)- **User Profiles**: Store learner information and skill levels

- **Topic Selection**: Choose from predefined topics or custom content

## 🌟 Features- **Skill Levels**: Beginner, Intermediate, Advanced

- **Confirmation Flow**: Review settings before starting quiz

### 🎯 **AI-Powered Question Generation**

- **Google Gemini AI Integration** for dynamic question creation### 🧠 Module 2: AI-Based Question Generation

- **Context-aware questions** based on custom topics or predefined subjects- **AI-Powered**: Hugging Face T5 model for dynamic question generation

- **Adaptive difficulty** scaling based on user skill level- **Multiple Question Types**: MCQ, True/False, Short Answer

- **Multiple question types**: MCQ, True/False, Short Answer- **Adaptive Difficulty**: Questions adapt to user skill level

- **Instant Feedback**: Immediate explanations and corrections

### 🔐 **Secure Authentication**- **Performance Tracking**: Real-time score calculation

- **JWT-based authentication** with bcrypt password hashing

- **User profiles** with skill level tracking## 🔧 Technologies Used

- **Session management** with automatic token handling

- **Demo mode** for quick testing- **Backend**: Python, Flask, SQLite

- **AI/NLP**: Hugging Face Transformers (T5-small)

### 📊 **Comprehensive Analytics**- **Frontend**: React, TypeScript, Tailwind CSS

- **Real-time performance tracking** with instant feedback- **Authentication**: JWT-based secure login

- **Detailed quiz results** with explanations for learning- **Database**: SQLite for persistent storage

- **Progress statistics** and improvement trends- **APIs**: RESTful API architecture

- **Quiz history** with filtering capabilities

## 📂 Project Structure

### 🎨 **Modern User Experience**

- **Responsive design** with Tailwind CSS```

- **Real-time feedback** during quiz takingSmart-Quizzer-AI/

- **Intuitive dashboard** with quick stats├── backend/

- **Smooth animations** and loading states│   ├── app.py              # Main Flask application

│   ├── models.py           # Database models

## 🏗️ Technology Stack│   ├── auth.py             # JWT authentication

│   ├── question_gen.py     # AI question generation

### **Frontend**│   ├── console_demo.py     # Console demo application

- **⚛️ React 18** - Modern JavaScript library│   ├── requirements.txt    # Python dependencies

- **🔷 TypeScript** - Static typing for better development│   └── smart_quizzer.db    # SQLite database (auto-created)

- **🎨 Tailwind CSS** - Utility-first CSS framework├── frontend/

- **🛣️ React Router** - Client-side routing│   ├── src/

- **🌐 Axios** - HTTP client for API calls│   │   ├── pages/          # React components

│   │   ├── lib/            # API and utility functions

### **Backend**│   │   └── index.tsx       # Main React app

- **🐍 Python 3.x** - Programming language│   ├── package.json        # Node.js dependencies

- **🌶️ Flask 2.3** - Lightweight web framework│   └── tailwind.config.js  # Tailwind CSS config

- **🗄️ SQLite** - File-based database├── install.py              # Installation script

- **🔗 SQLAlchemy** - Object-Relational Mapping└── README.md              # This file

- **🔐 JWT Extended** - JSON Web Token authentication```

- **🤖 Google Gemini AI** - AI question generation

## 🚀 Quick Start

## 🚀 Quick Start

### 1. Install Dependencies

### Prerequisites

- **Node.js** (v16 or higher)Run the installation script:

- **Python** (v3.8 or higher)```bash

- **npm** or **yarn**python install.py

- **Git**```



### 📥 InstallationOr install manually:



1. **Clone the repository****Backend:**

   ```bash```bash

   git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.gitcd backend

   cd Smart-Quizzer-AIpip install -r requirements.txt

   ``````



2. **Set up the Backend****Frontend:**

   ```bash```bash

   cd backendcd frontend

   pip install -r requirements.txtnpm install

   python app.py```

   ```

   Backend will run on `http://localhost:5000`### 2. Start the Backend Server



3. **Set up the Frontend**```bash

   ```bashcd backend

   cd frontendpython app.py

   npm install```

   npm start

   ```The API will be available at: `http://localhost:5000`

   Frontend will run on `http://localhost:3000`

### 3. Run Console Demo

### 🔑 Environment Setup

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

⚠️ **Security Note:** Never commit your `.env` file to version control!

```

### 4. Start Frontend (Optional)

## 📱 Usage

```bash

### 🏠 **Getting Started**cd frontend

1. **Register** a new account or use demo loginnpm start

2. **Choose a topic** from predefined subjects or create custom content```

3. **Select difficulty** level (Beginner/Intermediate/Advanced)

4. **Take the quiz** with real-time feedbackThe React app will be available at: `http://localhost:3000`

5. **View results** with detailed explanations and performance analytics

## 🖥️ Console Demo Features

### 🎯 **Available Topics**

- **Mathematics** - Mathematical concepts and problemsThe console demo provides a complete demonstration of:

- **Science** - Scientific principles and discoveries

- **History** - Historical events and civilizations1. **User Registration & Login**

- **Literature** - Literary works and analysis2. **Topic Selection with Skill Levels**

- **Geography** - Physical and human geography3. **AI Question Generation**

- **Custom Topics** - Upload your own content for personalized quizzes4. **Interactive Quiz Taking**

5. **Real-time Feedback**

### 📊 **Dashboard Features**6. **Performance Evaluation**

- **Quick Stats**: Total quizzes, average score, completion rate7. **Quiz History**

- **Recent Activity**: Latest quiz attempts and scores

- **Progress Tracking**: Performance trends over time### Sample Console Output

- **Quiz History**: Detailed records of all past attempts

```

## 🏛️ Architecture🧠 SMART QUIZZER - AI QUIZ GENERATOR

   Module 1: User Input & Topic Selection ✅

```   Module 2: AI-Based Question Generation ✅

┌─────────────────┐    HTTP/JSON    ┌─────────────────┐

│   React Frontend│ ←────────────→  │  Flask Backend  │🔐 Authentication Required

│                 │                 │                 │1. Register New Account

│ • TypeScript    │                 │ • Python        │2. Login

│ • Tailwind CSS  │                 │ • SQLAlchemy    │3. Exit

│ • Axios         │                 │ • JWT Auth      │

│ • React Router  │                 │ • Gemini AI     │Select option (1-3): 1

└─────────────────┘                 └─────────────────┘

                                            │📝 USER REGISTRATION - MODULE 1

                                            ▼Create your Smart Quizzer account:

                                    ┌─────────────────┐Username: alice

                                    │ SQLite Database │Email: alice@example.com

                                    │                 │Full Name: Alice Johnson

                                    │ • Users         │Password: ****

                                    │ • Quiz Sessions │

                                    │ • Questions     │Select your skill level:

                                    │ • Topics        │1. Beginner

                                    └─────────────────┘2. Intermediate

```3. Advanced

Choice (1-3): 2

## 📁 Project Structure

✅ Registration successful!

```Welcome, Alice Johnson!

Smart-Quizzer-AI/

├── backend/                    # Flask backend📚 TOPIC SELECTION - MODULE 1

│   ├── app.py                 # Main Flask applicationAvailable Topics:

│   ├── auth.py                # Authentication logic1. Mathematics - Mathematical concepts and problems

│   ├── models.py              # Database models2. Science - Scientific principles and discoveries

│   ├── question_gen.py        # AI question generation3. History - Historical events and civilizations

│   ├── requirements.txt       # Python dependencies4. Literature - Literary works and analysis

│   └── instance/5. Geography - Physical and human geography

│       └── smart_quizzer.db   # SQLite database6. Custom Topic (Enter your own)

├── frontend/                   # React frontend

│   ├── src/Select topic (1-6): 2

│   │   ├── components/        # Reusable React components

│   │   ├── pages/            # Main page components🤖 Generating AI questions... Please wait...

│   │   ├── lib/              # Utilities and API clients✅ Questions generated successfully!

│   │   └── App.tsx           # Main App component

│   ├── public/               # Static assets🧠 AI-GENERATED QUIZ - MODULE 2

│   ├── package.json          # Node.js dependenciesTopic: Science

│   └── tailwind.config.js    # Tailwind configurationDifficulty: Intermediate

├── .gitignore                # Git ignore rulesTotal Questions: 5

└── README.md                 # This file

```📝 Question 1/5

Q: How does photosynthesis work in plants?

## 🔌 API Endpoints

Options:

### Authentication   A. Plants absorb sunlight and convert it to chemical energy

- `POST /api/auth/register` - User registration   B. Plants only need water to survive

- `POST /api/auth/login` - User login   C. Plants get energy from soil minerals

- `GET /api/auth/profile` - Get user profile   D. Plants don't need sunlight



### Quiz ManagementYour answer (A/B/C/D): A

- `GET /api/topics` - Get available topics

- `POST /api/quiz/start` - Start a new quiz✅ Correct!

- `POST /api/quiz/{id}/answer` - Submit quiz answer💡 Explanation: Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create glucose and oxygen.

- `GET /api/quiz/{id}/results` - Get quiz results

- `GET /api/quiz/history` - Get quiz history📊 Progress: 1/5 completed

```

## 🎨 Screenshots

## 🌐 API Endpoints

### Dashboard

![Dashboard](https://via.placeholder.com/800x400?text=Smart+Quizzer+Dashboard)### Authentication

- `POST /api/auth/register` - User registration

### Quiz Interface- `POST /api/auth/login` - User login

![Quiz](https://via.placeholder.com/800x400?text=Interactive+Quiz+Interface)- `GET /api/auth/profile` - Get user profile



### Results Analysis### Topics

![Results](https://via.placeholder.com/800x400?text=Detailed+Results+Analysis)- `GET /api/topics` - Get available topics



## 🤝 Contributing### Quiz

- `POST /api/quiz/start` - Start new quiz

1. **Fork** the repository- `POST /api/quiz/{id}/answer` - Submit answer

2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)- `GET /api/quiz/{id}/results` - Get quiz results

3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)- `GET /api/quiz/history` - Get quiz history

4. **Push** to the branch (`git push origin feature/AmazingFeature`)

5. **Open** a Pull Request## 🤖 AI Question Generation



### Development GuidelinesThe system uses Hugging Face's T5-small model to generate contextual questions:

- Follow **TypeScript best practices** for frontend

- Use **Python PEP 8** style guide for backend### Difficulty Adaptation

- Write **meaningful commit messages**- **Beginner**: Simple factual questions

- Add **tests** for new features- **Intermediate**: Analytical and application questions  

- Update **documentation** as needed- **Advanced**: Higher-order thinking and evaluation questions



## 📄 License### Question Types

- **Multiple Choice (MCQ)**: 4 options with explanations

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.- **True/False**: Boolean questions with reasoning

- **Short Answer**: Open-ended text responses

## 👥 Authors

### Context Sources

- **Batchu Mamatha** - *Initial work* - [@BatchuMamatha](https://github.com/BatchuMamatha)- **Predefined Topics**: Curated content for each subject area

- **Custom Content**: User-provided text for question generation

## 🙏 Acknowledgments- **Adaptive Prompts**: T5 model prompts based on difficulty level



- **Google Gemini AI** for intelligent question generation## 📊 Performance Features

- **React community** for excellent documentation

- **Flask team** for the lightweight framework### Real-time Evaluation

- **Tailwind CSS** for beautiful styling utilities- Instant feedback on each answer

- Detailed explanations for correct/incorrect responses

## 📞 Support- Running score calculation

- Time tracking per question

If you have any questions or run into issues, please:

### Analytics

1. Check the **documentation** above- Quiz completion rates

2. Search for **existing issues** on GitHub- Average scores by topic

3. Create a **new issue** with detailed information- Performance trends over time

4. Contact: [your-email@example.com]- Skill level progression



---## 🔒 Security Features



<div align="center">- **Password Hashing**: bcrypt for secure password storage

  <strong>🚀 Built with ❤️ for better learning experiences</strong>- **JWT Authentication**: Stateless token-based auth

</div>- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: SQLAlchemy ORM prevents attacks

## 🎓 Educational Benefits

### Personalized Learning
- Adaptive difficulty based on skill level
- Custom topic support for specialized subjects
- Immediate feedback for faster learning
- Progress tracking for motivation

### AI-Enhanced Experience
- Dynamic question generation (no static question banks)
- Context-aware explanations
- Varied question formats to test different skills
- Scalable to any subject domain

## 🚧 Future Enhancements

- **Module 3**: Real-time Performance Analytics Dashboard
- **Module 4**: Adaptive Learning Path Recommendations
- **Module 5**: Multiplayer Quiz Competitions
- **Advanced AI**: Integration with larger language models (GPT-4, Claude)
- **Mobile App**: React Native mobile application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Hugging Face for the T5 model and transformers library
- Flask community for the excellent web framework
- React team for the frontend framework
- SQLAlchemy for database ORM

---

**Built with ❤️ for intelligent education**

🧠 **Smart Quizzer** - Transforming learning through AI-powered assessment