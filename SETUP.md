# Smart Quizzer AI - Setup Guide# Smart Quizzer AI - Complete Setup Guide



Complete installation and setup guide for Smart Quizzer AI platform.This guide will help you set up Smart Quizzer AI on any laptop or environment from scratch.



---## 📋 Prerequisites



## Table of ContentsBefore you begin, ensure you have the following installed:



1. [Prerequisites](#prerequisites)### Required Software

2. [Installation](#installation)- **Python 3.8 or higher** - [Download here](https://www.python.org/downloads/)

3. [Configuration](#configuration)- **Node.js 16 or higher** - [Download here](https://nodejs.org/)

4. [Running the Application](#running-the-application)- **Git** - [Download here](https://git-scm.com/downloads)

5. [Database Setup](#database-setup)

6. [Troubleshooting](#troubleshooting)### Required API Keys

7. [Environment Variables](#environment-variables)- **Google Gemini API Key** - [Get one free here](https://makersuite.google.com/app/apikey)



------



## Prerequisites## 🚀 Quick Setup (Automated)



### Required Software### Windows



1. **Python 3.13+**```bash

   - Download: https://www.python.org/downloads/# 1. Clone the repository

   - Verify installation: `python --version`git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

cd Smart-Quizzer-AI

2. **Node.js 16+ and npm**

   - Download: https://nodejs.org/# 2. Run the automated setup script

   - Verify installation: `node --version` and `npm --version`setup.bat



3. **Git**# 3. Edit backend/.env and add your GEMINI_API_KEY

   - Download: https://git-scm.com/downloads# (The file will be created automatically)

   - Verify installation: `git --version`

# 4. You're done! Follow the on-screen instructions to start the servers

4. **Google Gemini API Key**```

   - Get free API key: https://ai.google.dev/

   - Required for AI question generation### Linux / macOS



### Optional Software```bash

# 1. Clone the repository

- **Virtual Environment Tool** (venv, virtualenv, or conda)git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

- **Code Editor** (VS Code, PyCharm, or Sublime Text)cd Smart-Quizzer-AI

- **Postman** (for API testing)

# 2. Make setup script executable and run it

---chmod +x setup.sh

./setup.sh

## Installation

# 3. Edit backend/.env and add your GEMINI_API_KEY

### Step 1: Clone the Repository# (The file will be created automatically)



```bash# 4. You're done! Follow the on-screen instructions to start the servers

# Clone from GitHub```

git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

---

# Navigate to project directory

cd Smart-Quizzer-AI## 🔧 Manual Setup (Step-by-Step)

```

If you prefer to set up manually or the automated script fails, follow these steps:

### Step 2: Backend Setup

### 1. Clone the Repository

#### 2.1 Create Virtual Environment (Recommended)

```bash

**Windows:**git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

```bashcd Smart-Quizzer-AI

cd backend```

python -m venv venv

venv\Scripts\activate### 2. Backend Setup

```

```bash

**macOS/Linux:**# Navigate to backend directory

```bashcd backend

cd backend

python3 -m venv venv# Install Python dependencies

source venv/bin/activatepip install -r requirements.txt

```

# Create .env file from template

#### 2.2 Install Python Dependenciescp .env.example .env

# On Windows: copy .env.example .env

```bash

pip install -r requirements.txt# Edit .env and add your GEMINI_API_KEY

```# Get one from: https://makersuite.google.com/app/apikey

```

**Expected output:**

```**Minimum required in backend/.env:**

Successfully installed flask-3.0.0 flask-cors-4.0.0 flask-sqlalchemy-3.1.1 ```env

flask-jwt-extended-4.6.0 flask-socketio-5.3.6 python-socketio-5.11.0 GEMINI_API_KEY=your-actual-gemini-api-key-here

bcrypt-4.1.2 requests-2.31.0 google-generativeai-0.8.0 python-dotenv-1.0.1 SECRET_KEY=your-secret-key-for-production

sentence-transformers-2.7.0 numpy-1.26.0 PyPDF2-3.0.0 pdfplumber-0.11.0 ```

python-docx-1.1.0 beautifulsoup4-4.12.0 nltk-3.8.0 textstat-0.7.0 

pandas-2.2.0 scikit-learn-1.4.0 werkzeug-3.0.0 transformers-4.38.0 ### 3. Frontend Setup

gunicorn-21.2.0

``````bash

# Navigate to frontend directory (from project root)

If you see any errors, try:cd frontend

```bash

pip install -r requirements.txt --force-reinstall# Install Node.js dependencies

```npm install



#### 2.3 Create Environment File# Create .env file

echo "REACT_APP_API_URL=http://localhost:5000" > .env

Create a `.env` file in the `backend/` directory:# On Windows: echo REACT_APP_API_URL=http://localhost:5000 > .env

```

```bash

# Create .env file### 4. Initialize Database

touch .env  # macOS/Linux

# OR```bash

type nul > .env  # Windows# From project root directory

```python init_database.py



Add the following content to `.env`:# This creates:

# - 5 Admin accounts

```env# - 15 User accounts

# Google Gemini AI API Key (REQUIRED)# - Topics for quizzes

GOOGLE_API_KEY=your_gemini_api_key_here```



# Flask Secret Keys (generate random strings)### 5. Populate Sample Data (Optional but Recommended)

SECRET_KEY=your_secret_key_here

JWT_SECRET_KEY=your_jwt_secret_key_here```bash

# From project root directory

# Database Configurationpython populate_quiz_data.py

SQLALCHEMY_DATABASE_URI=sqlite:///instance/smart_quizzer.db

SQLALCHEMY_TRACK_MODIFICATIONS=False# This adds:

# - 185 quiz sessions

# Flask Environment# - 1,119 sample questions

FLASK_ENV=development# - Realistic user quiz history

FLASK_DEBUG=True```



# Application Settings---

UPLOAD_FOLDER=uploads

MAX_CONTENT_LENGTH=10485760  # 10MB max file size## ▶️ Running the Application



# Optional: Email Configuration (for password reset)You need to run both backend and frontend servers simultaneously.

SMTP_SERVER=smtp.gmail.com

SMTP_PORT=587### Start Backend Server

SMTP_USERNAME=your_email@gmail.com

SMTP_PASSWORD=your_app_password```bash

```# Terminal 1 - Backend

cd backend

**Generate secure keys:**python app.py



```python# Server will start on http://localhost:5000

# Run this in Python shell to generate random keys```

import secrets

print(secrets.token_hex(32))  # Use output for SECRET_KEY### Start Frontend Server

print(secrets.token_hex(32))  # Use output for JWT_SECRET_KEY

``````bash

# Terminal 2 - Frontend (new terminal window)

### Step 3: Frontend Setupcd frontend

npm start

Open a **new terminal window** (keep backend terminal active).

# Application will open at http://localhost:3000

```bash```

# Navigate to frontend directory

cd frontend---



# Install Node.js dependencies## 🐳 Docker Setup (Alternative)

npm install

```If you prefer using Docker:



**Expected output:**```bash

```# Build and run with Docker Compose

added 1500 packages, and audited 1501 packages in 45sdocker-compose up --build

found 0 vulnerabilities

```# Access application at http://localhost:3000

# Backend API at http://localhost:5000

If you encounter errors:```

```bash

# Clear cache and reinstall---

rm -rf node_modules package-lock.json  # macOS/Linux

# OR## 🌐 Environment Variables Reference

rmdir /s node_modules && del package-lock.json  # Windows

### Backend (.env)

npm cache clean --force

npm install```env

```# REQUIRED

GEMINI_API_KEY=your-gemini-api-key-here

---SECRET_KEY=your-secret-key-minimum-32-characters



## Configuration# OPTIONAL

DATABASE_URL=sqlite:///smart_quizzer.db

### Backend ConfigurationDEBUG=False

FLASK_ENV=production

#### Database Configuration

# EMAIL (for password reset - optional)

The application uses SQLite by default. No additional configuration needed.SMTP_SERVER=smtp.gmail.com

SMTP_PORT=587

**To use PostgreSQL (Production):**SMTP_USERNAME=your-email@gmail.com

SMTP_PASSWORD=your-app-password

1. Install PostgreSQL:FROM_EMAIL=your-email@gmail.com

   ```bashFRONTEND_URL=http://localhost:3000

   pip install psycopg2-binary```

   ```

### Frontend (.env)

2. Update `.env`:

   ```env```env

   SQLALCHEMY_DATABASE_URI=postgresql://username:password@localhost:5432/smart_quizzer# REQUIRED

   ```REACT_APP_API_URL=http://localhost:5000



#### NLTK Data Download# OPTIONAL

PORT=3000

Download required NLTK data (first-time only):```



```python---

# Run this in Python shell or create download_nltk.py

import nltk## 📦 Project Structure

nltk.download('punkt')

nltk.download('stopwords')```

nltk.download('wordnet')Smart-Quizzer-AI/

```├── backend/                    # Flask backend

│   ├── app.py                 # Main API server

Or run:│   ├── models.py              # Database models

```bash│   ├── auth.py                # Authentication

python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"│   ├── question_gen.py        # AI question generation

```│   ├── requirements.txt       # Python dependencies

│   └── .env                   # Environment variables

### Frontend Configuration├── frontend/                   # React frontend

│   ├── src/

#### API URL Configuration│   │   ├── pages/             # All page components

│   │   ├── components/        # Reusable components

If backend runs on a different port, update `frontend/src/lib/api.ts`:│   │   └── lib/               # Utilities and API

│   ├── package.json           # Node dependencies

```typescript│   └── .env                   # Frontend config

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';├── init_database.py           # Database initialization

```├── populate_quiz_data.py      # Sample data generator

├── setup.bat                  # Windows setup script

Or create `.env` in `frontend/`:└── README.md                  # Main documentation

```

```env

REACT_APP_API_URL=http://localhost:5000/api---

PORT=8080

```## ✅ Testing the Application



---After setup, you can test the application:



## Running the Application1. **Access Frontend**: Open `http://localhost:3000` in your browser

2. **Create Account**: Register a new user account or use the admin account created during initialization

### Step 1: Start Backend Server3. **Take a Quiz**: Navigate to the dashboard and start a quiz

4. **Check Backend**: Verify API is running at `http://localhost:5000`

```bash

# Ensure you're in backend/ directory with virtual environment activated---

cd backend

source venv/bin/activate  # or venv\Scripts\activate on Windows## 🔍 Troubleshooting



# Start Flask server**Common Issues:**

python app.py

```1. **Port Already in Use**

   - Backend (Port 5000): Stop other Flask apps or change port in `app.py`

**Expected output:**   - Frontend (Port 3000): Stop other React apps or set `PORT=3001` in `frontend/.env`

```

 * Serving Flask app 'app'2. **Module Not Found Errors**

 * Debug mode: on   - Run `pip install -r requirements.txt` in backend directory

WARNING: This is a development server. Do not use it in a production deployment.   - Run `npm install` in frontend directory

 * Running on http://127.0.0.1:5000

Press CTRL+C to quit3. **Database Errors**

 * Restarting with stat   - Delete `backend/instance/smart_quizzer.db` and run `python init_database.py` again

 * Debugger is active!

```4. **API Connection Failed**

   - Ensure backend is running before starting frontend

**On first run, the application will:**   - Check `REACT_APP_API_URL` in `frontend/.env` matches backend URL

- ✅ Create database tables automatically

- ✅ Initialize 21 achievement badges---

- ✅ Create default topics

- ✅ No manual database setup required!**Last Updated**: November 2025  

**Version**: 1.0.0  

### Step 2: Start Frontend Development Server**Maintainer**: Mamatha Batchu


Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd frontend

# Start React development server
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view smart-quizzer-frontend in the browser.

  Local:            http://localhost:8080
  On Your Network:  http://192.168.1.100:8080

Note that the development build is not optimized.
To create a production build, use npm run build.
```

### Step 3: Access the Application

1. **Frontend**: Open browser and navigate to http://localhost:8080
2. **Backend API**: http://localhost:5000/api/health (should return `{"status": "healthy"}`)

### Step 4: Create Your First Account

1. Navigate to http://localhost:8080/register
2. Fill in the registration form:
   - Username: (unique, 3-80 characters)
   - Email: (valid email format)
   - Full Name: (your name)
   - Password: (min 8 characters, must include uppercase, lowercase, digit, special char)
   - Skill Level: Select Beginner, Intermediate, or Advanced
3. Click "Create Account"
4. You'll be automatically logged in and redirected to the Dashboard

---

## Database Setup

### Automatic Initialization

The database is **automatically created** when you first run `python app.py`. No manual setup required!

### Manual Database Initialization (if needed)

If you need to reinitialize the database:

```bash
# Delete existing database
rm backend/instance/smart_quizzer.db  # macOS/Linux
# OR
del backend\instance\smart_quizzer.db  # Windows

# Restart backend (auto-creates database)
python backend/app.py
```

### Using init_database.py (Optional - for test data)

To populate the database with sample data for testing:

```bash
cd backend
python init_database.py
```

This will create:
- 20 test users (5 admins, 15 regular users)
- 300+ quiz sessions
- 3000+ questions
- Sample badges, leaderboard entries, and analytics data

**Test Credentials:**
- Admin: `ravi` / `Admin@123`
- User: `anjali` / `User@123`
- User: `priya` / `User@123`

### Database Schema Verification

Check if database was created successfully:

```bash
# List tables in SQLite
sqlite3 backend/instance/smart_quizzer.db ".tables"
```

**Expected output:**
```
badge
flagged_question
learning_milestone
learning_path
multiplayer_participant
multiplayer_room
password_reset_token
performance_trend
question
question_feedback
quiz_leaderboard
quiz_session
topic
user
user_badge
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "GOOGLE_API_KEY not found"

**Symptom:**
```
Error: GOOGLE_API_KEY not configured in environment variables
```

**Solution:**
1. Create `.env` file in `backend/` directory
2. Add: `GOOGLE_API_KEY=your_api_key_here`
3. Get API key from https://ai.google.dev/
4. Restart backend server

---

#### Issue 2: "Module not found" errors

**Symptom:**
```
ModuleNotFoundError: No module named 'flask'
```

**Solution:**
```bash
# Activate virtual environment
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

---

#### Issue 3: Port already in use

**Symptom:**
```
OSError: [Errno 48] Address already in use
```

**Solution:**

**Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find process using port 5000
lsof -ti:5000

# Kill process
kill -9 $(lsof -ti:5000)
```

Or change port in `backend/app.py`:
```python
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5001, debug=True)  # Changed to 5001
```

---

#### Issue 4: Database initialization errors

**Symptom:**
```
sqlalchemy.exc.OperationalError: no such table: user
```

**Solution:**
```bash
# Delete database and restart
rm backend/instance/smart_quizzer.db
python backend/app.py
```

---

#### Issue 5: Frontend compilation errors

**Symptom:**
```
Module build failed: Error: Cannot find module 'react'
```

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm start
```

---

#### Issue 6: CORS errors in browser console

**Symptom:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

Ensure CORS is configured in `backend/app.py`:
```python
from flask_cors import CORS

CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:8080"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

Restart backend server.

---

#### Issue 7: WebSocket connection fails

**Symptom:**
```
WebSocket connection to 'ws://localhost:5000/socket.io/' failed
```

**Solution:**

1. Check Flask-SocketIO installation:
   ```bash
   pip install flask-socketio==5.3.6 python-socketio==5.11.0
   ```

2. Verify SocketIO initialization in `backend/app.py`:
   ```python
   socketio = SocketIO(app, cors_allowed_origins="*")
   ```

3. Restart backend server

---

#### Issue 8: NLTK download errors

**Symptom:**
```
LookupError: Resource 'punkt' not found
```

**Solution:**
```bash
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"
```

---

### Verification Steps

After setup, verify everything works:

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   # Expected: {"status": "healthy"}
   ```

2. **Database Check:**
   ```bash
   sqlite3 backend/instance/smart_quizzer.db ".tables"
   # Should list 15 tables
   ```

3. **Frontend Access:**
   - Open http://localhost:8080 in browser
   - Should see login/register page

4. **API Authentication:**
   ```bash
   # Register a test user
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"Test@123","full_name":"Test User","skill_level":"Beginner"}'
   
   # Should return access_token
   ```

---

## Environment Variables

### Backend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GOOGLE_API_KEY` | **Yes** | None | Google Gemini AI API key |
| `SECRET_KEY` | **Yes** | None | Flask secret key for sessions |
| `JWT_SECRET_KEY` | **Yes** | None | Secret key for JWT token signing |
| `SQLALCHEMY_DATABASE_URI` | No | `sqlite:///instance/smart_quizzer.db` | Database connection string |
| `FLASK_ENV` | No | `development` | Flask environment (development/production) |
| `FLASK_DEBUG` | No | `True` | Enable/disable debug mode |
| `UPLOAD_FOLDER` | No | `uploads` | Directory for uploaded files |
| `MAX_CONTENT_LENGTH` | No | `10485760` | Max upload size (10MB) |
| `SMTP_SERVER` | No | None | SMTP server for emails (optional) |
| `SMTP_PORT` | No | `587` | SMTP port |
| `SMTP_USERNAME` | No | None | SMTP username |
| `SMTP_PASSWORD` | No | None | SMTP password |

### Frontend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `REACT_APP_API_URL` | No | `http://localhost:5000/api` | Backend API base URL |
| `PORT` | No | `8080` | Frontend development server port |

---

## Production Deployment

### Building for Production

#### Backend (Gunicorn)

```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
cd backend
gunicorn -w 4 -b 0.0.0.0:5000 --worker-class eventlet app:app
```

#### Frontend (Static Build)

```bash
# Create production build
cd frontend
npm run build

# Output: build/ directory with optimized static files
# Serve with Nginx, Apache, or any static file server
```

### Recommended Production Stack

- **Web Server**: Nginx (reverse proxy)
- **Application Server**: Gunicorn (4+ workers)
- **Database**: PostgreSQL (migrate from SQLite)
- **Process Manager**: systemd or supervisor
- **Security**: SSL/TLS certificates (Let's Encrypt)

### Environment Setup

**Production `.env`:**
```env
FLASK_ENV=production
FLASK_DEBUG=False
SQLALCHEMY_DATABASE_URI=postgresql://user:pass@localhost/smart_quizzer
SECRET_KEY=<strong-random-key>
JWT_SECRET_KEY=<strong-random-key>
```

---

## Next Steps

After successful setup:

1. **Explore the Dashboard**: Navigate around the interface
2. **Take a Quiz**: Try the Custom Content Upload feature
3. **Check Analytics**: View your performance trends
4. **Earn Badges**: Complete quizzes to unlock achievements
5. **Join Leaderboard**: Compete with other users
6. **Read Documentation**: Check [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) for technical details

---

## Support

If you encounter issues not covered in this guide:

1. **Check Logs**:
   - Backend: `backend/smart_quizzer_errors.log`
   - Frontend: Browser console (F12 → Console tab)

2. **GitHub Issues**: https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues

3. **Documentation**: [README.md](README.md) and [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)

---

**Setup Guide Version**: 1.0.0  
**Last Updated**: November 2025  
**Status**: Production Ready
