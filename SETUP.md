# 🚀 Smart Quizzer AI - Complete Setup Guide

This guide provides step-by-step instructions for installing, configuring, and running Smart Quizzer AI on Windows, macOS, and Linux systems.

---

## 📋 Table of Contents

- [System Requirements](#system-requirements)
- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [Method 1: Quick Setup (Recommended)](#method-1-quick-setup-recommended)
  - [Method 2: Docker Setup](#method-2-docker-setup)
  - [Method 3: Manual Setup](#method-3-manual-setup)
- [Environment Configuration](#environment-configuration)
- [Database Initialization](#database-initialization)
- [Running the Application](#running-the-application)
- [Verification & Testing](#verification--testing)
- [Troubleshooting](#troubleshooting)
- [Production Deployment](#production-deployment)

---

## 💻 System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Operating System** | Windows 10, macOS 10.15, Ubuntu 20.04 | Latest stable versions |
| **RAM** | 4 GB | 8 GB or more |
| **Storage** | 2 GB free space | 5 GB or more |
| **Internet** | Stable connection | Required for AI API calls |
| **Processor** | Dual-core 2.0 GHz | Quad-core 2.5 GHz+ |

---

## 🔧 Prerequisites

Before installation, ensure you have the following software installed on your system.

### Required Software

#### 1. **Python 3.9 or Higher**
- Download from [python.org](https://www.python.org/downloads/)
- **Windows**: Check "Add Python to PATH" during installation
- **Verify installation**:
  ```bash
  python --version
  # or
  python3 --version
  ```

#### 2. **Node.js 16+ and npm**
- Download from [nodejs.org](https://nodejs.org/)
- npm is included with Node.js
- **Verify installation**:
  ```bash
  node --version
  npm --version
  ```

#### 3. **Git**
- Download from [git-scm.com](https://git-scm.com/downloads)
- **Verify installation**:
  ```bash
  git --version
  ```

### API Keys

You need a **Google Gemini API key** to enable AI-powered question generation:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"** or **"Create API Key"**
4. Copy the generated key (you'll need this later)

---

## 📥 Installation Methods

### Method 1: Quick Setup (Recommended)

This method is ideal for local development and testing.

#### Step 1: Clone the Repository

```bash
git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
cd Smart-Quizzer-AI
```

#### Step 2: Backend Setup

**Navigate to backend directory:**
```bash
cd backend
```

**Create Python virtual environment:**

**Windows (PowerShell/CMD):**
```powershell
python -m venv venv
```

**macOS/Linux:**
```bash
python3 -m venv venv
```

**Activate virtual environment:**

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

**Install Python dependencies:**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**Create environment configuration:**
```bash
# Copy example environment file
cp .env.example .env
```

**Edit `.env` file** and add your Google Gemini API key:
```ini
GOOGLE_API_KEY=your-actual-api-key-here
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-for-jwt
DATABASE_URL=sqlite:///instance/quizzer.db
```

**Initialize database:**
```bash
python -c "from app import app, db; app.app_context().push(); db.create_all(); print('Database initialized successfully')"
```

#### Step 3: Frontend Setup

Open a **new terminal** window and navigate to frontend:

```bash
cd Smart-Quizzer-AI/frontend
```

**Install Node.js dependencies:**
```bash
npm install
```

**Create frontend environment file** (`.env` in `frontend` directory):
```ini
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=http://localhost:5000
```

---

### Method 2: Docker Setup

Docker provides an isolated, production-ready environment.

#### Prerequisites
- Docker Desktop ([download here](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)

#### Steps

**1. Clone repository:**
```bash
git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git
cd Smart-Quizzer-AI
```

**2. Configure environment variables:**

Create `backend/.env` file:
```ini
GOOGLE_API_KEY=your-actual-api-key-here
SECRET_KEY=your-secret-key-for-jwt
DATABASE_URL=sqlite:///instance/quizzer.db
FLASK_ENV=production
```

**3. Build and run containers:**
```bash
docker-compose up --build
```

**4. Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

**Stop containers:**
```bash
docker-compose down
```

---

### Method 3: Manual Setup

For advanced users who want full control over the setup process.

#### Backend Configuration

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (OS-specific commands from Method 1)
source venv/bin/activate  # macOS/Linux
# OR
.\venv\Scripts\Activate.ps1  # Windows

# Install dependencies individually
pip install flask==3.0.0
pip install flask-cors==4.0.0
pip install flask-sqlalchemy==3.1.1
pip install flask-jwt-extended==4.6.0
pip install google-generativeai>=0.8.0
pip install sentence-transformers>=2.7.0
# ... (see requirements.txt for complete list)

# Set environment variables manually
export GOOGLE_API_KEY="your-api-key"  # macOS/Linux
# OR
set GOOGLE_API_KEY=your-api-key  # Windows CMD
```

#### Frontend Configuration

```bash
cd frontend

# Install dependencies
npm install react@18.2.0
npm install react-router-dom@6.4.0
npm install axios@1.5.0
npm install tailwindcss@3.3.0
npm install typescript@4.8.0
# ... (see package.json for complete list)
```

---

## ⚙️ Environment Configuration

### Backend Environment Variables (`backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GOOGLE_API_KEY` | **Yes** | None | Google Gemini AI API key for question generation |
| `SECRET_KEY` | **Yes** | None | JWT token encryption key (use strong random string) |
| `FLASK_APP` | No | `app.py` | Main Flask application file |
| `FLASK_ENV` | No | `development` | Environment mode (`development` or `production`) |
| `DATABASE_URL` | No | `sqlite:///instance/quizzer.db` | Database connection string |

**Generate a secure SECRET_KEY:**

**Python:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

**OpenSSL:**
```bash
openssl rand -hex 32
```

### Frontend Environment Variables (`frontend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `REACT_APP_API_URL` | No | `http://localhost:5000` | Backend API base URL |
| `REACT_APP_WS_URL` | No | `http://localhost:5000` | WebSocket server URL |
| `PORT` | No | `3000` | Development server port |

---

## 🗄️ Database Initialization

Smart Quizzer AI uses SQLite by default for development. The database is automatically created on first run.

### Automatic Initialization

When you start the Flask backend for the first time, the database tables are created automatically:

```bash
cd backend
python app.py
```

You should see console output:
```
Database tables created successfully
* Running on http://127.0.0.1:5000
```

### Manual Database Creation

If you need to recreate the database:

```bash
cd backend
source venv/bin/activate  # or appropriate activation command

python -c "
from app import app, db
with app.app_context():
    db.drop_all()  # WARNING: Deletes all data
    db.create_all()
    print('Database reset complete')
"
```

### Database Tables

The following tables are automatically created:

- `user` - User accounts and profiles
- `quiz` - Quiz metadata and configurations
- `question` - Generated questions and answers
- `quiz_attempt` - User quiz submission records
- `leaderboard` - Global and topic-specific rankings
- `badge` - Achievement badges
- `feedback` - User feedback and reports

---

## ▶️ Running the Application

### Development Mode (Recommended for Testing)

**Terminal 1 - Backend Server:**
```bash
cd backend
source venv/bin/activate  # Windows: .\venv\Scripts\Activate.ps1
python app.py
```

Expected output:
```
 * Running on http://127.0.0.1:5000
 * Debugger is active!
```

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
Local:            http://localhost:3000
```

**Access the application:**
- Open browser: http://localhost:3000
- Backend API docs: http://localhost:5000/api/health

### Production Mode

**Backend (using Gunicorn):**
```bash
cd backend
source venv/bin/activate
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

**Frontend (build static files):**
```bash
cd frontend
npm run build
```

Serve the `build` folder using Nginx, Apache, or a static file server.

---

## ✅ Verification & Testing

### 1. Backend Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status": "healthy", "database": "connected"}
```

### 2. Frontend Accessibility

Open browser to http://localhost:3000 and verify:
- Login/Register page loads
- No console errors in browser DevTools
- Tailwind CSS styles are applied

### 3. API Connectivity Test

**Register a test user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test123!"}'
```

**Expected response:**
```json
{"message": "User registered successfully", "user_id": 1}
```

### 4. AI Integration Test

Test question generation (requires valid GOOGLE_API_KEY):

1. Log into the application
2. Navigate to "Create Quiz"
3. Enter sample text or upload a PDF
4. Verify questions are generated within 10-15 seconds

---

## 🐛 Troubleshooting

### Issue 1: "GOOGLE_API_KEY not found"

**Symptom:** Error on question generation

**Solutions:**
```bash
# Check if .env file exists
ls backend/.env  # should exist

# Verify API key is set
cat backend/.env | grep GOOGLE_API_KEY

# Restart backend server after updating .env
```

### Issue 2: Port Already in Use

**Symptom:** `Address already in use: 5000` or `port 3000 already in use`

**Solutions:**

**Find and kill process (Windows):**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Find and kill process (macOS/Linux):**
```bash
lsof -ti:5000 | xargs kill -9
```

**Use alternative port:**
```bash
# Backend
flask run --port 5001

# Frontend
PORT=3001 npm start
```

### Issue 3: Virtual Environment Activation Issues

**Windows PowerShell Execution Policy Error:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\venv\Scripts\Activate.ps1
```

**macOS/Linux Permission Denied:**
```bash
chmod +x venv/bin/activate
source venv/bin/activate
```

### Issue 4: npm Install Failures

**Clear npm cache and reinstall:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue 5: Database Locked Error

**Solution:**
```bash
# Stop all running Flask instances
# Delete database file
rm backend/instance/quizzer.db
# Restart backend (database will recreate)
python app.py
```

### Issue 6: CORS Errors in Browser

**Symptom:** `Access-Control-Allow-Origin` errors in browser console

**Solution:**

Check `backend/app.py` has CORS configured:
```python
from flask_cors import CORS
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
```

Verify frontend is using correct API URL in `.env`.

### Issue 7: Sentence-Transformers Download Fails

**Solution:**

Pre-download the model manually:
```bash
cd backend
source venv/bin/activate
python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"
```

### Issue 8: Frontend Build Errors

**TypeScript compilation errors:**
```bash
cd frontend
npm install --save-dev @types/react @types/react-dom @types/node
npm run build
```

---

## 🚀 Production Deployment

### Backend Production Checklist

1. **Use production WSGI server** (Gunicorn):
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. **Set environment to production:**
   ```ini
   FLASK_ENV=production
   DEBUG=False
   ```

3. **Use PostgreSQL for database:**
   ```ini
   DATABASE_URL=postgresql://user:password@localhost/quizzer_db
   ```

4. **Configure secure secret keys:**
   ```bash
   SECRET_KEY=$(openssl rand -hex 32)
   ```

5. **Enable HTTPS** with SSL certificates (Let's Encrypt)

### Frontend Production Build

```bash
cd frontend
npm run build
```

Serve the `build` folder using:
- **Nginx** (recommended)
- **Apache**
- **Static hosting** (Vercel, Netlify, AWS S3)

**Sample Nginx configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/frontend/build;
    index index.html;
    
    location / {
        try_files $uri /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

### Docker Production Deployment

Update `docker-compose.yml` for production:
```yaml
services:
  backend:
    environment:
      - FLASK_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/quizzer
    restart: always
  
  frontend:
    command: serve -s build -l 3000
    restart: always
```

---

## 📞 Support

If you encounter issues not covered in this guide:

1. Check existing [GitHub Issues](https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues)
2. Review application logs:
   - Backend: Console output from `python app.py`
   - Frontend: Browser console (F12 → Console tab)
3. Create a new issue with:
   - Operating system and version
   - Python and Node.js versions
   - Complete error message
   - Steps to reproduce

---

## 🎉 Success!

If all steps completed successfully, you should now have:
- ✅ Backend running on `http://localhost:5000`
- ✅ Frontend running on `http://localhost:3000`
- ✅ Database initialized with tables
- ✅ AI question generation functional
- ✅ User authentication working

**Next Steps:**
1. Register a new user account
2. Upload study material (PDF/DOCX/URL/Text)
3. Generate your first AI-powered quiz
4. Explore analytics and leaderboard features

Happy learning with Smart Quizzer AI! 🚀