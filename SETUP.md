# Smart Quizzer AI - Setup Guide# Smart Quizzer AI - Setup Guide# Smart Quizzer AI - Complete Setup Guide



**Complete installation and configuration instructions for Smart Quizzer AI**



This guide provides step-by-step instructions for setting up the Smart Quizzer AI platform on your local machine or server.Complete installation and setup guide for Smart Quizzer AI platform.This guide will help you set up Smart Quizzer AI on any laptop or environment from scratch.



---



## Table of Contents---## 📋 Prerequisites



1. [Prerequisites](#prerequisites)

2. [Backend Setup](#backend-setup)

3. [Frontend Setup](#frontend-setup)## Table of ContentsBefore you begin, ensure you have the following installed:

4. [Environment Configuration](#environment-configuration)

5. [Database Initialization](#database-initialization)

6. [Running the Application](#running-the-application)

7. [Production Deployment](#production-deployment)1. [Prerequisites](#prerequisites)### Required Software

8. [Troubleshooting](#troubleshooting)

9. [Advanced Configuration](#advanced-configuration)2. [Installation](#installation)- **Python 3.8 or higher** - [Download here](https://www.python.org/downloads/)



---3. [Configuration](#configuration)- **Node.js 16 or higher** - [Download here](https://nodejs.org/)



## Prerequisites4. [Running the Application](#running-the-application)- **Git** - [Download here](https://git-scm.com/downloads)



### Required Software5. [Database Setup](#database-setup)



**Python 3.13 or higher**6. [Troubleshooting](#troubleshooting)### Required API Keys

- Download: https://www.python.org/downloads/

- Verify: `python --version` (should show 3.13+)7. [Environment Variables](#environment-variables)- **Google Gemini API Key** - [Get one free here](https://makersuite.google.com/app/apikey)



**Node.js 16.0 or higher**

- Download: https://nodejs.org/

- Verify: `node --version` (should show v16+)------



**npm 7.0 or higher** (included with Node.js)

- Verify: `npm --version`

## Prerequisites## 🚀 Quick Setup (Automated)

**Git** (for cloning repository)

- Download: https://git-scm.com/downloads

- Verify: `git --version`

### Required Software### Windows

### Required API Keys



**Google Gemini API Key** (Free tier available)

1. Visit: https://ai.google.dev/1. **Python 3.13+**```bash

2. Sign in with Google account

3. Navigate to "Get API Key" → "Create API Key"   - Download: https://www.python.org/downloads/# 1. Clone the repository

4. Copy the generated key (keep it secure)

   - Verify installation: `python --version`git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

> **Note**: The free tier includes 60 requests per minute, sufficient for development and small deployments.

cd Smart-Quizzer-AI

---

2. **Node.js 16+ and npm**

## Backend Setup

   - Download: https://nodejs.org/# 2. Run the automated setup script

### Step 1: Clone Repository

   - Verify installation: `node --version` and `npm --version`setup.bat

```bash

git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

cd Smart-Quizzer-AI

```3. **Git**# 3. Edit backend/.env and add your GEMINI_API_KEY



### Step 2: Create Virtual Environment   - Download: https://git-scm.com/downloads# (The file will be created automatically)



**Windows (PowerShell)**   - Verify installation: `git --version`

```powershell

cd backend# 4. You're done! Follow the on-screen instructions to start the servers

python -m venv venv

.\venv\Scripts\Activate.ps14. **Google Gemini API Key**```

```

   - Get free API key: https://ai.google.dev/

**Windows (Command Prompt)**

```cmd   - Required for AI question generation### Linux / macOS

cd backend

python -m venv venv

venv\Scripts\activate.bat

```### Optional Software```bash



**Mac/Linux**# 1. Clone the repository

```bash

cd backend- **Virtual Environment Tool** (venv, virtualenv, or conda)git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

python3 -m venv venv

source venv/bin/activate- **Code Editor** (VS Code, PyCharm, or Sublime Text)cd Smart-Quizzer-AI

```

- **Postman** (for API testing)

### Step 3: Install Python Dependencies

# 2. Make setup script executable and run it

```bash

pip install --upgrade pip---chmod +x setup.sh

pip install -r requirements.txt

```./setup.sh



**Expected packages** (automatically installed):## Installation

- Flask==3.0.0

- SQLAlchemy==2.0.43# 3. Edit backend/.env and add your GEMINI_API_KEY

- google-generativeai==0.8.3

- sentence-transformers==3.3.1### Step 1: Clone the Repository# (The file will be created automatically)

- PyPDF2==3.0.1

- python-docx==1.1.2

- Flask-CORS==5.0.0

- Flask-SocketIO==5.4.1```bash# 4. You're done! Follow the on-screen instructions to start the servers

- PyJWT==2.10.1

- beautifulsoup4==4.12.3# Clone from GitHub```



**Installation time**: 2-5 minutes (downloads ~500MB)git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git



### Step 4: Configure Environment Variables---



Create a `.env` file in the `backend/` directory:# Navigate to project directory



**Automated (Recommended)**cd Smart-Quizzer-AI## 🔧 Manual Setup (Step-by-Step)

```bash

# PowerShell (Windows)```

@"

GOOGLE_API_KEY=your_api_key_hereIf you prefer to set up manually or the automated script fails, follow these steps:

SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))')

JWT_SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))')### Step 2: Backend Setup

DATABASE_URL=sqlite:///instance/smart_quizzer.db

FLASK_ENV=development### 1. Clone the Repository

"@ | Out-File -FilePath .env -Encoding UTF8

```#### 2.1 Create Virtual Environment (Recommended)



**Manual (All Platforms)**```bash

Create `backend/.env` with this content:

```env**Windows:**git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

# Required: Google Gemini API Key

GOOGLE_API_KEY=your_actual_api_key_here```bashcd Smart-Quizzer-AI



# Required: Flask secret keys (generate unique values)cd backend```

SECRET_KEY=generate_a_random_32_character_hex_string

JWT_SECRET_KEY=generate_another_random_32_character_hex_stringpython -m venv venv



# Optional: Database configurationvenv\Scripts\activate### 2. Backend Setup

DATABASE_URL=sqlite:///instance/smart_quizzer.db

```

# Optional: Environment

FLASK_ENV=development```bash

```

**macOS/Linux:**# Navigate to backend directory

**Generate secure keys** (Python):

```python```bashcd backend

import secrets

print("SECRET_KEY:", secrets.token_hex(32))cd backend

print("JWT_SECRET_KEY:", secrets.token_hex(32))

```python3 -m venv venv# Install Python dependencies



---source venv/bin/activatepip install -r requirements.txt



## Frontend Setup```



### Step 1: Navigate to Frontend Directory# Create .env file from template



```bash#### 2.2 Install Python Dependenciescp .env.example .env

cd frontend

```# On Windows: copy .env.example .env



### Step 2: Install Node Dependencies```bash



```bashpip install -r requirements.txt# Edit .env and add your GEMINI_API_KEY

npm install

``````# Get one from: https://makersuite.google.com/app/apikey



**Expected packages** (automatically installed):```

- react@18.2.0

- react-dom@18.2.0**Expected output:**

- react-router-dom@6.28.0

- axios@1.7.9```**Minimum required in backend/.env:**

- typescript@4.9.5

- tailwindcss@3.4.17Successfully installed flask-3.0.0 flask-cors-4.0.0 flask-sqlalchemy-3.1.1 ```env



**Installation time**: 1-3 minutes (downloads ~200MB)flask-jwt-extended-4.6.0 flask-socketio-5.3.6 python-socketio-5.11.0 GEMINI_API_KEY=your-actual-gemini-api-key-here



### Step 3: Configure API Endpoint (Optional)bcrypt-4.1.2 requests-2.31.0 google-generativeai-0.8.0 python-dotenv-1.0.1 SECRET_KEY=your-secret-key-for-production



The frontend is pre-configured to connect to `http://localhost:5000`.sentence-transformers-2.7.0 numpy-1.26.0 PyPDF2-3.0.0 pdfplumber-0.11.0 ```



To change the backend URL, edit `frontend/src/lib/api.ts`:python-docx-1.1.0 beautifulsoup4-4.12.0 nltk-3.8.0 textstat-0.7.0 



```typescriptpandas-2.2.0 scikit-learn-1.4.0 werkzeug-3.0.0 transformers-4.38.0 ### 3. Frontend Setup

const API_BASE_URL = 'http://localhost:5000';  // Change if needed

```gunicorn-21.2.0



---``````bash



## Environment Configuration# Navigate to frontend directory (from project root)



### Backend Environment VariablesIf you see any errors, try:cd frontend



| Variable | Required | Default | Description |```bash

|----------|----------|---------|-------------|

| `GOOGLE_API_KEY` | ✅ Yes | None | Google Gemini API key for AI features |pip install -r requirements.txt --force-reinstall# Install Node.js dependencies

| `SECRET_KEY` | ✅ Yes | None | Flask session encryption key |

| `JWT_SECRET_KEY` | ✅ Yes | None | JWT token signing key |```npm install

| `DATABASE_URL` | ❌ No | `sqlite:///instance/smart_quizzer.db` | Database connection string |

| `FLASK_ENV` | ❌ No | `production` | Environment mode (`development`/`production`) |

| `SIMILARITY_THRESHOLD` | ❌ No | `0.7` | Answer similarity threshold (0.0-1.0) |

#### 2.3 Create Environment File# Create .env file

### Frontend Environment Variables

echo "REACT_APP_API_URL=http://localhost:5000" > .env

The frontend uses hardcoded values. For production, create `frontend/.env`:

Create a `.env` file in the `backend/` directory:# On Windows: echo REACT_APP_API_URL=http://localhost:5000 > .env

```env

REACT_APP_API_URL=http://localhost:5000```

```

```bash

Then update `frontend/src/lib/api.ts`:

```typescript# Create .env file### 4. Initialize Database

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

```touch .env  # macOS/Linux



---# OR```bash



## Database Initializationtype nul > .env  # Windows# From project root directory



### Automatic Initialization (Recommended)```python init_database.py



The database is created automatically when you first run the backend:



```bashAdd the following content to `.env`:# This creates:

cd backend

python app.py# - 5 Admin accounts

```

```env# - 15 User accounts

**What happens**:

1. Creates `backend/instance/` directory# Google Gemini AI API Key (REQUIRED)# - Topics for quizzes

2. Creates `smart_quizzer.db` SQLite database

3. Initializes 15 tables (User, QuizSession, Question, Badge, etc.)GOOGLE_API_KEY=your_gemini_api_key_here```

4. Inserts default topics (Python, JavaScript, Data Structures, etc.)

5. Inserts 21 achievement badges



**Expected output**:# Flask Secret Keys (generate random strings)### 5. Populate Sample Data (Optional but Recommended)

```

Database initialized successfully!SECRET_KEY=your_secret_key_here

Created 15 tables

Inserted 10 default topicsJWT_SECRET_KEY=your_jwt_secret_key_here```bash

Created 21 badges

 * Running on http://127.0.0.1:5000# From project root directory

```

# Database Configurationpython populate_quiz_data.py

### Manual Database Initialization

SQLALCHEMY_DATABASE_URI=sqlite:///instance/smart_quizzer.db

If you need to reset or manually initialize:

SQLALCHEMY_TRACK_MODIFICATIONS=False# This adds:

```bash

cd backend# - 185 quiz sessions

python -c "from app import app, db; app.app_context().push(); db.create_all(); print('Database created')"

```# Flask Environment# - 1,119 sample questions



### Database LocationFLASK_ENV=development# - Realistic user quiz history



Default: `backend/instance/smart_quizzer.db`FLASK_DEBUG=True```



To view/edit database (optional):

- Download: https://sqlitebrowser.org/

- Open: `backend/instance/smart_quizzer.db`# Application Settings---



---UPLOAD_FOLDER=uploads



## Running the ApplicationMAX_CONTENT_LENGTH=10485760  # 10MB max file size## ▶️ Running the Application



### Development Mode



**Terminal 1: Backend**# Optional: Email Configuration (for password reset)You need to run both backend and frontend servers simultaneously.

```bash

cd backendSMTP_SERVER=smtp.gmail.com

# Activate virtual environment first (see Backend Setup Step 2)

python app.pySMTP_PORT=587### Start Backend Server

```

SMTP_USERNAME=your_email@gmail.com

Expected output:

```SMTP_PASSWORD=your_app_password```bash

 * Running on http://127.0.0.1:5000

 * Debug mode: on```# Terminal 1 - Backend

```

cd backend

**Terminal 2: Frontend**

```bash**Generate secure keys:**python app.py

cd frontend

npm start

```

```python# Server will start on http://localhost:5000

Expected output:

```# Run this in Python shell to generate random keys```

Compiled successfully!

Local:            http://localhost:8080import secrets

```

print(secrets.token_hex(32))  # Use output for SECRET_KEY### Start Frontend Server

### Access the Application

print(secrets.token_hex(32))  # Use output for JWT_SECRET_KEY

1. **Frontend**: http://localhost:8080

2. **Backend API**: http://localhost:5000``````bash

3. **API Documentation**: http://localhost:5000/api/docs (if enabled)

# Terminal 2 - Frontend (new terminal window)

### First-Time Usage

### Step 3: Frontend Setupcd frontend

1. Navigate to http://localhost:8080

2. Click "Register" → Create account with email/passwordnpm start

3. Select skill level (Beginner/Intermediate/Advanced)

4. Dashboard opens → Start taking quizzes!Open a **new terminal window** (keep backend terminal active).



**Default Admin Account** (if pre-seeded):# Application will open at http://localhost:3000

- Username: `admin@smartquizzer.com`

- Password: `admin123````bash```

- **⚠️ Change password immediately in production**

# Navigate to frontend directory

---

cd frontend---

## Production Deployment



### Backend Deployment

# Install Node.js dependencies## 🐳 Docker Setup (Alternative)

**Option 1: Gunicorn (Recommended)**

npm install

Install Gunicorn:

```bash```If you prefer using Docker:

pip install gunicorn eventlet

```



Run with multiple workers:**Expected output:**```bash

```bash

gunicorn -w 4 -b 0.0.0.0:5000 --worker-class eventlet app:app```# Build and run with Docker Compose

```

added 1500 packages, and audited 1501 packages in 45sdocker-compose up --build

**Option 2: Docker**

found 0 vulnerabilities

Create `backend/Dockerfile`:

```dockerfile```# Access application at http://localhost:3000

FROM python:3.13-slim

WORKDIR /app# Backend API at http://localhost:5000

COPY requirements.txt .

RUN pip install -r requirements.txtIf you encounter errors:```

COPY . .

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "--worker-class", "eventlet", "app:app"]```bash

```

# Clear cache and reinstall---

Build and run:

```bashrm -rf node_modules package-lock.json  # macOS/Linux

docker build -t smart-quizzer-backend .

docker run -p 5000:5000 --env-file .env smart-quizzer-backend# OR## 🌐 Environment Variables Reference

```

rmdir /s node_modules && del package-lock.json  # Windows

### Frontend Deployment

### Backend (.env)

**Build for Production**

```bashnpm cache clean --force

cd frontend

npm run buildnpm install```env

```

```# REQUIRED

Output: `frontend/build/` directory with optimized static files

GEMINI_API_KEY=your-gemini-api-key-here

**Deploy to Nginx**

```nginx---SECRET_KEY=your-secret-key-minimum-32-characters

server {

    listen 80;

    server_name yourdomain.com;

    root /var/www/smart-quizzer/build;## Configuration# OPTIONAL

    index index.html;

DATABASE_URL=sqlite:///smart_quizzer.db

    location / {

        try_files $uri /index.html;### Backend ConfigurationDEBUG=False

    }

FLASK_ENV=production

    location /api {

        proxy_pass http://localhost:5000;#### Database Configuration

        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;# EMAIL (for password reset - optional)

    }

}The application uses SQLite by default. No additional configuration needed.SMTP_SERVER=smtp.gmail.com

```

SMTP_PORT=587

**Deploy to Vercel/Netlify**

1. Push code to GitHub**To use PostgreSQL (Production):**SMTP_USERNAME=your-email@gmail.com

2. Connect repository to Vercel/Netlify

3. Set build command: `npm run build`SMTP_PASSWORD=your-app-password

4. Set publish directory: `build`

5. Add environment variable: `REACT_APP_API_URL=https://api.yourdomain.com`1. Install PostgreSQL:FROM_EMAIL=your-email@gmail.com



### Database for Production   ```bashFRONTEND_URL=http://localhost:3000



**PostgreSQL (Recommended)**   pip install psycopg2-binary```



1. Install PostgreSQL   ```

2. Create database: `createdb smart_quizzer`

3. Update `.env`:### Frontend (.env)

   ```env

   DATABASE_URL=postgresql://username:password@localhost/smart_quizzer2. Update `.env`:

   ```

4. Install adapter: `pip install psycopg2-binary`   ```env```env



**MySQL**   SQLALCHEMY_DATABASE_URI=postgresql://username:password@localhost:5432/smart_quizzer# REQUIRED



Update `.env`:   ```REACT_APP_API_URL=http://localhost:5000

```env

DATABASE_URL=mysql://username:password@localhost/smart_quizzer

```

Install adapter: `pip install PyMySQL`#### NLTK Data Download# OPTIONAL



---PORT=3000



## TroubleshootingDownload required NLTK data (first-time only):```



### Backend Issues



**Problem**: `ModuleNotFoundError: No module named 'flask'`  ```python---

**Solution**:

```bash# Run this in Python shell or create download_nltk.py

# Ensure virtual environment is activated

pip install -r requirements.txt --force-reinstallimport nltk## 📦 Project Structure

```

nltk.download('punkt')

**Problem**: `GOOGLE_API_KEY not found in environment`  

**Solution**:nltk.download('stopwords')```

1. Check `.env` file exists in `backend/` directory

2. Verify `.env` contains `GOOGLE_API_KEY=your_key`nltk.download('wordnet')Smart-Quizzer-AI/

3. Restart backend after editing `.env`

```├── backend/                    # Flask backend

**Problem**: `Address already in use (Port 5000)`  

**Solution**:│   ├── app.py                 # Main API server

```bash

# Windows (PowerShell)Or run:│   ├── models.py              # Database models

Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

```bash│   ├── auth.py                # Authentication

# Mac/Linux

kill -9 $(lsof -ti:5000)python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"│   ├── question_gen.py        # AI question generation



# Or change port in app.py:```│   ├── requirements.txt       # Python dependencies

app.run(debug=True, port=5001)

```│   └── .env                   # Environment variables



**Problem**: `Database is locked`  ### Frontend Configuration├── frontend/                   # React frontend

**Solution**:

1. Close all database browser tools│   ├── src/

2. Stop all backend instances

3. Delete `backend/instance/smart_quizzer.db`#### API URL Configuration│   │   ├── pages/             # All page components

4. Restart backend (auto-creates database)

│   │   ├── components/        # Reusable components

### Frontend Issues

If backend runs on a different port, update `frontend/src/lib/api.ts`:│   │   └── lib/               # Utilities and API

**Problem**: `Cannot find module '../components/XYZ'`  

**Solution**:│   ├── package.json           # Node dependencies

```bash

# Clear webpack cache```typescript│   └── .env                   # Frontend config

Remove-Item node_modules\.cache -Recurse -Force

npm startconst API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';├── init_database.py           # Database initialization

```

```├── populate_quiz_data.py      # Sample data generator

**Problem**: `Proxy error: Could not proxy request to http://localhost:5000`  

**Solution**:├── setup.bat                  # Windows setup script

1. Ensure backend is running on port 5000

2. Check `frontend/package.json` has `"proxy": "http://localhost:5000"`Or create `.env` in `frontend/`:└── README.md                  # Main documentation

3. Restart frontend: `Ctrl+C` → `npm start`

```

**Problem**: `npm ERR! EACCES: permission denied`  

**Solution**:```env

```bash

# Windows (run PowerShell as Administrator)REACT_APP_API_URL=http://localhost:5000/api---

npm install

PORT=8080

# Mac/Linux

sudo npm install```## ✅ Testing the Application

```



### API Connection Issues

---After setup, you can test the application:

**Problem**: CORS errors in browser console  

**Solution**:

Backend already has CORS enabled. If issues persist, check:

1. Backend running on port 5000## Running the Application1. **Access Frontend**: Open `http://localhost:3000` in your browser

2. Frontend environment variables correct

3. Browser cache cleared (Ctrl+Shift+Delete)2. **Create Account**: Register a new user account or use the admin account created during initialization



**Problem**: 401 Unauthorized errors  ### Step 1: Start Backend Server3. **Take a Quiz**: Navigate to the dashboard and start a quiz

**Solution**:

1. Check JWT token in localStorage (F12 → Application → Local Storage)4. **Check Backend**: Verify API is running at `http://localhost:5000`

2. Re-login to get fresh token

3. Verify `JWT_SECRET_KEY` in `.env` hasn't changed```bash



### AI Generation Issues# Ensure you're in backend/ directory with virtual environment activated---



**Problem**: Questions not generating  cd backend

**Solution**:

1. Verify `GOOGLE_API_KEY` is valid (test at https://ai.google.dev/)source venv/bin/activate  # or venv\Scripts\activate on Windows## 🔍 Troubleshooting

2. Check API quota: https://console.cloud.google.com/

3. Review backend console for error messages



**Problem**: "Rate limit exceeded"  # Start Flask server**Common Issues:**

**Solution**:

- Free tier: 60 requests/minutepython app.py

- Wait 1 minute or upgrade to paid tier

```1. **Port Already in Use**

---

   - Backend (Port 5000): Stop other Flask apps or change port in `app.py`

## Advanced Configuration

**Expected output:**   - Frontend (Port 3000): Stop other React apps or set `PORT=3001` in `frontend/.env`

### Custom Similarity Threshold

```

Adjust answer matching sensitivity in `backend/.env`:

```env * Serving Flask app 'app'2. **Module Not Found Errors**

SIMILARITY_THRESHOLD=0.7  # Default (70% match required)

SIMILARITY_THRESHOLD=0.6  # More lenient (60% match) * Debug mode: on   - Run `pip install -r requirements.txt` in backend directory

SIMILARITY_THRESHOLD=0.8  # Stricter (80% match)

```WARNING: This is a development server. Do not use it in a production deployment.   - Run `npm install` in frontend directory



### Custom Topics * Running on http://127.0.0.1:5000



Add topics via Python:Press CTRL+C to quit3. **Database Errors**

```python

from app import app, db * Restarting with stat   - Delete `backend/instance/smart_quizzer.db` and run `python init_database.py` again

from models import Topic

 * Debugger is active!

with app.app_context():

    new_topic = Topic(name='Machine Learning', description='ML fundamentals')```4. **API Connection Failed**

    db.session.add(new_topic)

    db.session.commit()   - Ensure backend is running before starting frontend

```

**On first run, the application will:**   - Check `REACT_APP_API_URL` in `frontend/.env` matches backend URL

### Custom Badges

- ✅ Create database tables automatically

Add badges via Python:

```python- ✅ Initialize 21 achievement badges---

from app import app, db

from models import Badge- ✅ Create default topics



with app.app_context():- ✅ No manual database setup required!**Last Updated**: November 2025  

    badge = Badge(

        name='Custom Badge',**Version**: 1.0.0  

        description='Custom achievement',

        icon='trophy',### Step 2: Start Frontend Development Server**Maintainer**: Mamatha Batchu

        criteria_type='quiz_count',

        criteria_value=100

    )Open a **new terminal window**:

    db.session.add(badge)

    db.session.commit()```bash

```# Navigate to frontend directory

cd frontend

### Email Configuration (Future Feature)

# Start React development server

Prepare for password reset emails by adding to `.env`:npm start

```env```

MAIL_SERVER=smtp.gmail.com

MAIL_PORT=587**Expected output:**

MAIL_USE_TLS=True```

MAIL_USERNAME=your_email@gmail.comCompiled successfully!

MAIL_PASSWORD=your_app_password

```You can now view smart-quizzer-frontend in the browser.



### Enable Debug Mode  Local:            http://localhost:8080

  On Your Network:  http://192.168.1.100:8080

**Development only** (never in production):

```envNote that the development build is not optimized.

FLASK_ENV=developmentTo create a production build, use npm run build.

FLASK_DEBUG=1```

```

### Step 3: Access the Application

### Change Database Location

1. **Frontend**: Open browser and navigate to http://localhost:8080

Update `backend/.env`:2. **Backend API**: http://localhost:5000/api/health (should return `{"status": "healthy"}`)

```env

DATABASE_URL=sqlite:////absolute/path/to/database.db### Step 4: Create Your First Account

```

1. Navigate to http://localhost:8080/register

Or in `backend/app.py`:2. Fill in the registration form:

```python   - Username: (unique, 3-80 characters)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///custom_path.db'   - Email: (valid email format)

```   - Full Name: (your name)

   - Password: (min 8 characters, must include uppercase, lowercase, digit, special char)

---   - Skill Level: Select Beginner, Intermediate, or Advanced

3. Click "Create Account"

## System Requirements4. You'll be automatically logged in and redirected to the Dashboard



### Minimum Requirements---

- **CPU**: 2 cores

- **RAM**: 4 GB## Database Setup

- **Disk**: 2 GB free space

- **Internet**: Required for AI features### Automatic Initialization



### Recommended RequirementsThe database is **automatically created** when you first run `python app.py`. No manual setup required!

- **CPU**: 4+ cores

- **RAM**: 8+ GB### Manual Database Initialization (if needed)

- **Disk**: 10 GB free space (for ML models cache)

- **Internet**: 10+ MbpsIf you need to reinitialize the database:



### Browser Compatibility```bash

- Chrome 90+# Delete existing database

- Firefox 88+rm backend/instance/smart_quizzer.db  # macOS/Linux

- Safari 14+# OR

- Edge 90+del backend\instance\smart_quizzer.db  # Windows



---# Restart backend (auto-creates database)

python backend/app.py

## Security Checklist```



Before deploying to production:### Using init_database.py (Optional - for test data)



- [ ] Change all default passwordsTo populate the database with sample data for testing:

- [ ] Generate unique `SECRET_KEY` and `JWT_SECRET_KEY`

- [ ] Use HTTPS (SSL/TLS certificates)```bash

- [ ] Set `FLASK_ENV=production`cd backend

- [ ] Disable debug mode (`FLASK_DEBUG=0`)python init_database.py

- [ ] Use PostgreSQL instead of SQLite```

- [ ] Enable rate limiting on API endpoints

- [ ] Configure firewall rulesThis will create:

- [ ] Regular database backups- 20 test users (5 admins, 15 regular users)

- [ ] Monitor API key usage- 300+ quiz sessions

- 3000+ questions

---- Sample badges, leaderboard entries, and analytics data



## Getting Help**Test Credentials:**

- Admin: `ravi` / `Admin@123`

**Issues & Bug Reports**  - User: `anjali` / `User@123`

GitHub Issues: https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues- User: `priya` / `User@123`



**Documentation**  ### Database Schema Verification

- [README.md](README.md) - Project overview

- [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) - Technical detailsCheck if database was created successfully:



**Contact**  ```bash

GitHub: [@BatchuMamatha](https://github.com/BatchuMamatha)# List tables in SQLite

sqlite3 backend/instance/smart_quizzer.db ".tables"

---```



**Setup Guide Version**: 1.0.0  **Expected output:**

**Last Updated**: November 2025  ```

**Tested On**: Windows 11, macOS 14, Ubuntu 22.04badge

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
