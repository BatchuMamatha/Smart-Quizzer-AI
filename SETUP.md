# Smart Quizzer AI - Setup Guide# Smart Quizzer AI - Complete Setup Guide# Smart Quizzer AI - Complete Setup Guide# Smart Quizzer AI - Complete Setup Guide# Smart Quizzer AI - Setup Guide# Smart Quizzer AI - Setup Guide# Smart Quizzer AI - Complete Setup Guide



Complete installation and configuration instructions for local development on Windows, Mac, and Linux.



---**Comprehensive installation and configuration instructions for Windows, Mac, and Linux**



## 📋 Table of Contents



1. [Prerequisites](#prerequisites)This guide will walk you through setting up Smart Quizzer AI on your local machine, from initial installation to running the complete application.**Step-by-step installation and configuration instructions for all platforms**

2. [Quick Setup](#quick-setup)

3. [Detailed Backend Setup](#detailed-backend-setup)

4. [Detailed Frontend Setup](#detailed-frontend-setup)

5. [Database Initialization](#database-initialization)---

6. [Running the Application](#running-the-application)

7. [Environment Variables Reference](#environment-variables-reference)

8. [Testing](#testing)

9. [Production Deployment](#production-deployment)## 📋 Table of ContentsThis guide provides comprehensive instructions for setting up Smart Quizzer AI on your local machine, regardless of your operating system (Windows, Mac, or Linux).**Step-by-step installation and configuration instructions**

10. [Troubleshooting](#troubleshooting)



---

1. [System Requirements](#system-requirements)

## Prerequisites

2. [Prerequisites](#prerequisites)

Before beginning installation, ensure you have the following software installed:

3. [Quick Setup (All Platforms)](#quick-setup-all-platforms)---

### Required Software

4. [Detailed Backend Setup](#detailed-backend-setup)

| Software | Minimum Version | Download Link | Verification Command |

|----------|----------------|---------------|---------------------|5. [Detailed Frontend Setup](#detailed-frontend-setup)

| **Python** | 3.9 or higher | [python.org](https://www.python.org/downloads/) | `python --version` |

| **Node.js** | 16 or higher | [nodejs.org](https://nodejs.org/) | `node --version` |6. [Database Initialization](#database-initialization)

| **npm** | 8 or higher | Included with Node.js | `npm --version` |

| **Git** | 2.30 or higher | [git-scm.com](https://git-scm.com/downloads) | `git --version` |7. [Running the Application](#running-the-application)## 📋 Table of ContentsThis guide will help you set up Smart Quizzer AI on your local machine or server, regardless of your operating system.**Complete installation and configuration instructions for Smart Quizzer AI**



### API Keys8. [Environment Variables Reference](#environment-variables-reference)



**Google Gemini API Key** (Required for AI question generation):9. [Production Deployment](#production-deployment)

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)

2. Sign in with your Google account10. [Troubleshooting](#troubleshooting)

3. Click "Create API Key"

4. Copy the key (format: `AIza...`)11. [Advanced Configuration](#advanced-configuration)1. [Prerequisites](#prerequisites)

5. Store securely - you'll need this for the `.env` file



### System Requirements

---2. [Quick Setup](#quick-setup)

**Minimum**:

- RAM: 4 GB

- Storage: 2 GB free space

- OS: Windows 10, macOS 10.15, or Ubuntu 20.04+## System Requirements3. [Detailed Backend Setup](#detailed-backend-setup)---



**Recommended**:

- RAM: 8 GB or more

- Storage: 5 GB free space### Minimum Requirements4. [Detailed Frontend Setup](#detailed-frontend-setup)

- OS: Windows 11, macOS 12+, or Ubuntu 22.04+

- SSD for better performance



---| Component | Specification |5. [Database Initialization](#database-initialization)



## Quick Setup|-----------|--------------|



For experienced developers who want to get started quickly:| **Operating System** | Windows 10, macOS 10.15, or Ubuntu 20.04+ |6. [Running the Application](#running-the-application)



### Windows (PowerShell)| **RAM** | 4 GB |

```powershell

# Clone repository| **Storage** | 2 GB free space |7. [Environment Variables Reference](#environment-variables-reference)## 📋 Table of ContentsThis guide provides step-by-step instructions for setting up the Smart Quizzer AI platform on your local machine or server.Complete installation and setup guide for Smart Quizzer AI platform.This guide will help you set up Smart Quizzer AI on any laptop or environment from scratch.

git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

cd Smart-Quizzer-AI| **Internet** | Stable connection for API calls |



# Backend setup8. [Production Deployment](#production-deployment)

cd backend

python -m venv venv### Recommended Requirements

venv\Scripts\activate

pip install -r requirements.txt9. [Troubleshooting](#troubleshooting)



# Create .env file (then edit with your API key)| Component | Specification |

Copy-Item .env.example .env

notepad .env|-----------|--------------|10. [Advanced Configuration](#advanced-configuration)



# Initialize database (auto-creates tables and sample data)| **Operating System** | Windows 11, macOS 12+, or Ubuntu 22.04+ |

python app.py

# Press Ctrl+C after "Database initialization complete"| **RAM** | 8 GB or more |1. [Prerequisites](#prerequisites)



# Open new terminal for frontend| **Storage** | 5 GB free space |

cd ..\frontend

npm install| **Internet** | High-speed connection |---

npm start



# Backend in first terminal

cd backend---2. [Quick Setup](#quick-setup)

venv\Scripts\activate

python app.py

```

## Prerequisites## Prerequisites

### Mac/Linux (Bash)

```bash

# Clone repository

git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.gitBefore starting the installation, ensure you have the following software installed:3. [Backend Setup](#backend-setup)---

cd Smart-Quizzer-AI



# Backend setup

cd backend### Required SoftwareBefore you begin, ensure you have the following installed on your system:

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

1. **Python 3.9 or Higher**4. [Frontend Setup](#frontend-setup)

# Create .env file (then edit with your API key)

cp .env.example .env   - Download: [python.org/downloads](https://www.python.org/downloads/)

nano .env  # or vim, code, etc.

   - Verify installation: `python --version` or `python3 --version`### Required Software

# Initialize database

python app.py

# Press Ctrl+C after "Database initialization complete"

2. **Node.js 16 or Higher**5. [Database Initialization](#database-initialization)

# Open new terminal for frontend

cd frontend   - Download: [nodejs.org](https://nodejs.org/)

npm install

npm start   - Verify installation: `node --version`| Software | Minimum Version | Download Link |



# Backend in first terminal   - npm should be included: `npm --version`

cd backend

source venv/bin/activate|----------|----------------|---------------|6. [Running the Application](#running-the-application)

python app.py

```3. **Git**



**Access the application**:   - Download: [git-scm.com/downloads](https://git-scm.com/downloads)| Python | 3.9 | https://www.python.org/downloads/ |

- Frontend: http://localhost:8080

- Backend API: http://localhost:5000   - Verify installation: `git --version`



---| Node.js | 16.0 | https://nodejs.org/ |7. [Environment Variables](#environment-variables)## Table of Contents---## 📋 Prerequisites



## Detailed Backend Setup4. **Google Gemini API Key** (Required for AI features)



### Step 1: Clone the Repository   - Get free API key: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)| Git | 2.30 | https://git-scm.com/downloads |



```bash   - Sign in with Google account

git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

cd Smart-Quizzer-AI   - Click "Create API Key"| Google Gemini API Key | N/A | https://aistudio.google.com/app/apikey |8. [Production Deployment](#production-deployment)

```

   - Copy and save the key securely

### Step 2: Create Python Virtual Environment



A virtual environment isolates project dependencies from system Python packages.

---

**Windows**:

```powershell### System Requirements9. [Troubleshooting](#troubleshooting)

cd backend

python -m venv venv## Quick Setup (All Platforms)

```



**Mac/Linux**:

```bashFor experienced developers who want to get started quickly:

cd backend

python3 -m venv venv**Minimum**:10. [Advanced Configuration](#advanced-configuration)

```

### Windows (PowerShell)

### Step 3: Activate Virtual Environment

- RAM: 4 GB

**Windows PowerShell**:

```powershell```powershell

venv\Scripts\activate

```# Clone repository- Storage: 2 GB free space1. [Prerequisites](#prerequisites)



**Windows CMD**:git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

```cmd

venv\Scripts\activate.batcd Smart-Quizzer-AI- OS: Windows 10, macOS 10.15, or Ubuntu 20.04+

```



**Mac/Linux**:

```bash# Backend setup---

source venv/bin/activate

```cd backend



You should see `(venv)` prefix in your terminal prompt.python -m venv venv**Recommended**:



### Step 4: Install Python Dependencies.\venv\Scripts\Activate.ps1



```bashpip install -r requirements.txt- RAM: 8 GB or more2. [Backend Setup](#backend-setup)

pip install -r requirements.txt

```



This installs 28 packages including:# Create .env file- Storage: 5 GB free space

- Flask 3.0.0 (web framework)

- SQLAlchemy 3.1.1 (database ORM)@"

- Flask-SocketIO 5.3.6 (WebSocket support)

- google-generativeai (Gemini AI)SECRET_KEY=your-generated-secret-key-min-32-characters- OS: Windows 11, macOS 12+, or Ubuntu 22.04+## 📦 Prerequisites

- sentence-transformers (NLP)

- PyPDF2, pdfplumber (PDF processing)JWT_SECRET_KEY=your-generated-jwt-key-min-32-characters

- python-docx (Word processing)

- beautifulsoup4 (web scraping)GOOGLE_API_KEY=your-google-gemini-api-key-here

- And more...

FLASK_APP=app.py

**Troubleshooting**: If installation fails:

```bashFLASK_ENV=development---3. [Frontend Setup](#frontend-setup)## Table of ContentsBefore you begin, ensure you have the following installed:

# Upgrade pip first

python -m pip install --upgrade pipDATABASE_URL=sqlite:///instance/smart_quizzer.db



# Try installing again"@ | Out-File -FilePath .env -Encoding utf8

pip install -r requirements.txt

```



### Step 5: Configure Environment Variables# Start backend## Quick Setup### Required Software



Create a `.env` file in the `backend/` directory:python app.py



**Windows**:

```powershell

Copy-Item .env.example .env# Frontend setup (open new PowerShell terminal)

notepad .env

```cd ..\frontendFor experienced developers who want to get started quickly:4. [Environment Configuration](#environment-configuration)



**Mac/Linux**:npm install

```bash

cp .env.example .env

nano .env  # or your preferred editor

```# Create frontend .env



**Edit the `.env` file** with these values:@"### Windows (PowerShell)#### 1. Python 3.9 or Higher



```envREACT_APP_API_URL=http://localhost:5000

# Flask Configuration

SECRET_KEY=your-secret-key-here-minimum-32-characters-long"@ | Out-File -FilePath .env -Encoding utf8

JWT_SECRET_KEY=your-jwt-secret-key-also-32-chars-minimum

FLASK_ENV=development



# Database (SQLite for local development)# Start frontend```powershell- **Download**: https://www.python.org/downloads/5. [Database Initialization](#database-initialization)

DATABASE_URL=sqlite:///instance/smart_quizzer.db

npm start

# Google Gemini AI

GOOGLE_API_KEY=AIza...your-actual-api-key-here```# Clone repository



# Answer Evaluation

SIMILARITY_THRESHOLD=0.75

### Mac/Linux (Bash/Zsh)git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git- **Verify installation**:

# CORS (Frontend URL)

CORS_ORIGINS=http://localhost:8080



# Optional: Email Configuration (if implementing password reset)```bashcd Smart-Quizzer-AI

# SMTP_SERVER=smtp.gmail.com

# SMTP_PORT=587# Clone repository

# SMTP_USERNAME=your-email@gmail.com

# SMTP_PASSWORD=your-app-passwordgit clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git  ```bash6. [Running the Application](#running-the-application)

# FROM_EMAIL=your-email@gmail.com

```cd Smart-Quizzer-AI



**Generate Secure Secret Keys**:# Backend setup



**Windows PowerShell**:# Backend setup

```powershell

# Generate SECRET_KEYcd backendcd backend  python --version

python -c "import secrets; print('SECRET_KEY=' + secrets.token_urlsafe(32))"

python3 -m venv venv

# Generate JWT_SECRET_KEY

python -c "import secrets; print('JWT_SECRET_KEY=' + secrets.token_hex(32))"source venv/bin/activatepython -m venv venv

```

pip install -r requirements.txt

**Mac/Linux**:

```bash.\venv\Scripts\Activate.ps1  # Should output: Python 3.9.x or higher7. [Production Deployment](#production-deployment)1. [Prerequisites](#prerequisites)### Required Software

# Generate SECRET_KEY

python3 -c "import secrets; print('SECRET_KEY=' + secrets.token_urlsafe(32))"# Create .env file



# Generate JWT_SECRET_KEYcat > .env << 'EOL'pip install -r requirements.txt

python3 -c "import secrets; print('JWT_SECRET_KEY=' + secrets.token_hex(32))"

```SECRET_KEY=your-generated-secret-key-min-32-characters



Copy the generated keys into your `.env` file.JWT_SECRET_KEY=your-generated-jwt-key-min-32-characters@"  ```



### Step 6: Verify InstallationGOOGLE_API_KEY=your-google-gemini-api-key-here



```bashFLASK_APP=app.pySECRET_KEY=your-secret-key-here

python --version  # Should show Python 3.9+

pip list  # Should show all installed packagesFLASK_ENV=development

```

DATABASE_URL=sqlite:///instance/smart_quizzer.dbJWT_SECRET_KEY=your-jwt-secret-key-here8. [Troubleshooting](#troubleshooting)

---

EOL

## Detailed Frontend Setup

GOOGLE_API_KEY=your-google-api-key-here

### Step 1: Navigate to Frontend Directory

# Start backend

```bash

cd frontendpython app.py &FLASK_APP=app.py#### 2. Node.js 16 or Higher

```



(If you're in `backend/`, use `cd ../frontend`)

# Frontend setup (open new terminal)FLASK_ENV=development

### Step 2: Install Node Dependencies

cd ../frontend

```bash

npm installnpm installDATABASE_URL=sqlite:///instance/smart_quizzer.db- **Download**: https://nodejs.org/9. [Advanced Configuration](#advanced-configuration)2. [Installation](#installation)- **Python 3.8 or higher** - [Download here](https://www.python.org/downloads/)

```



This installs packages including:

- React 18.2.0# Create frontend .env"@ | Out-File -FilePath .env -Encoding utf8

- TypeScript 4.8

- Tailwind CSS 3.3.0cat > .env << 'EOL'

- React Router 6.4.0

- Axios 1.5.0REACT_APP_API_URL=http://localhost:5000python app.py &- **Verify installation**:

- Socket.IO Client 4.8.1

- And more...EOL



**Troubleshooting**: If `npm install` fails:

```bash

# Clear npm cache# Start frontend

npm cache clean --force

npm start# Frontend setup (new terminal)  ```bash

# Delete node_modules and package-lock.json

rm -rf node_modules package-lock.json  # Mac/Linux```

Remove-Item -Recurse -Force node_modules,package-lock.json  # Windows

cd ..\frontend

# Reinstall

npm install---

```

npm install  node --version  # Should output: v16.x.x or higher

### Step 3: Configure Frontend Environment (Optional)

## Detailed Backend Setup

By default, frontend connects to `http://localhost:5000`. To customize:

@"

Create `frontend/.env`:

```env### Step 1: Clone the Repository

REACT_APP_API_URL=http://localhost:5000

REACT_APP_WS_URL=http://localhost:5000REACT_APP_API_URL=http://localhost:5000  npm --version   # Should output: 8.x.x or higher---3. [Configuration](#configuration)- **Node.js 16 or higher** - [Download here](https://nodejs.org/)

```

Open your terminal (PowerShell on Windows, Terminal on Mac/Linux) and run:

### Step 4: Verify Installation

"@ | Out-File -FilePath .env -Encoding utf8

```bash

node --version  # Should show v16+```bash

npm --version  # Should show v8+

npm list --depth=0  # Shows installed packagesgit clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.gitnpm start  ```

```

cd Smart-Quizzer-AI

---

``````

## Database Initialization



Smart Quizzer AI uses SQLite for local development. The database auto-initializes on first run.

### Step 2: Navigate to Backend Directory

### Automatic Initialization (Recommended)



Simply run the backend application:

```bash### Mac/Linux (Bash)

```bash

cd backendcd backend

python app.py

``````#### 3. Git



The system will:

1. Create `instance/` directory if it doesn't exist

2. Create all 15 database tables### Step 3: Create Python Virtual Environment```bash

3. Insert default topics (10 topics)

4. Create 21 achievement badges

5. Log "Database initialization complete"

**Why virtual environment?** Isolates project dependencies from system Python packages.# Clone repository- **Download**: https://git-scm.com/downloads## Prerequisites4. [Running the Application](#running-the-application)- **Git** - [Download here](https://git-scm.com/downloads)

You can press **Ctrl+C** to stop the server after initialization.



### Manual Database Reset

**Windows**:git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

To completely reset the database:

```powershell

**Windows**:

```powershellpython -m venv venvcd Smart-Quizzer-AI- **Verify installation**:

Remove-Item -Force backend\instance\smart_quizzer.db

python backend\app.py```

# Database recreates automatically

```



**Mac/Linux**:**Mac/Linux**:

```bash

rm -f backend/instance/smart_quizzer.db```bash# Backend setup  ```bash

python backend/app.py

# Database recreates automaticallypython3 -m venv venv

```

```cd backend

### Database Location



The SQLite database is stored at:

```### Step 4: Activate Virtual Environmentpython3 -m venv venv  git --version

backend/instance/smart_quizzer.db

```



This file is automatically excluded from Git (see `.gitignore`).**Windows PowerShell**:source venv/bin/activate



### Database Tables Created```powershell



15 tables are created:.\venv\Scripts\Activate.ps1pip install -r requirements.txt  ```### Required Software5. [Database Setup](#database-setup)

1. `user` - User accounts

2. `quiz_session` - Quiz attempts```

3. `question` - Question bank

4. `topic` - Quiz topics/subjectscat > .env << EOL

5. `password_reset_token` - Password recovery

6. `question_feedback` - User ratings on questions**Windows Command Prompt**:

7. `flagged_question` - Reported questions

8. `quiz_leaderboard` - Global rankings```cmdSECRET_KEY=your-secret-key-here

9. `badge` - Achievement definitions

10. `user_badge` - User achievement trackingvenv\Scripts\activate.bat

11. `performance_trend` - Analytics data

12. `learning_path` - Personalized learning routes```JWT_SECRET_KEY=your-jwt-secret-key-here

13. `learning_milestone` - Progress checkpoints

14. `multiplayer_room` - Real-time quiz rooms

15. `multiplayer_participant` - Room participants

**Mac/Linux**:GOOGLE_API_KEY=your-google-api-key-here### Required API Keys

---

```bash

## Running the Application

source venv/bin/activateFLASK_APP=app.py

You need **two terminal windows** - one for backend, one for frontend.

```

### Terminal 1: Backend Server

FLASK_ENV=development

**Windows PowerShell**:

```powershell**Success indicator**: Your prompt should now show `(venv)` prefix.

cd backend

venv\Scripts\activateDATABASE_URL=sqlite:///instance/smart_quizzer.db

python app.py

```### Step 5: Install Python Dependencies



**Mac/Linux**:EOL#### Google Gemini API Key (Free)**Python 3.13 or higher**6. [Troubleshooting](#troubleshooting)### Required API Keys

```bash

cd backend```bash

source venv/bin/activate

python app.pypip install -r requirements.txtpython app.py &

```

```

**Expected output**:

```

 * Serving Flask app 'app'

 * Debug mode: on**This installs 28 packages** including:

INFO:werkzeug: * Running on http://127.0.0.1:5000

 * Restarting with stat- Flask 3.0.0 (web framework)# Frontend setup (new terminal)

Database initialization complete

```- SQLAlchemy 2.0.43 (database ORM)



Backend API is now available at `http://localhost:5000`- Google Generative AI SDK (Gemini AI)cd ../frontend1. Visit: https://ai.google.dev/- Download: https://www.python.org/downloads/



### Terminal 2: Frontend Development Server- Sentence-Transformers 2.7.0+ (NLP)



**Windows/Mac/Linux**:- Flask-SocketIO 5.3.6 (WebSocket support)npm install

```bash

cd frontend- BCrypt 4.1.2 (password hashing)

npm start

```- PyJWT (authentication tokens)cat > .env << EOL2. Sign in with your Google account



**Expected output**:- PyPDF2, python-docx, BeautifulSoup4 (content processing)

```

Compiled successfully!REACT_APP_API_URL=http://localhost:5000



You can now view smart-quizzer-frontend in the browser.**Installation time**: 3-5 minutes (depends on internet speed)



  Local:            http://localhost:8080EOL3. Navigate to "Get API Key" → "Create API Key"- Verify: `python --version` (should show 3.13+)7. [Environment Variables](#environment-variables)- **Google Gemini API Key** - [Get one free here](https://makersuite.google.com/app/apikey)

  On Your Network:  http://192.168.x.x:8080

```### Step 6: Configure Environment Variables



Browser automatically opens to `http://localhost:8080`npm start



### Stopping the ServersCreate a `.env` file in the `backend/` directory.



Press **Ctrl+C** in each terminal window.```4. Copy the generated key (keep it secure)



### Default Test Account (If Created)**Windows PowerShell**:



Some setups include a test account:```powershell

- **Username**: `testuser`

- **Password**: `Test@123`@"



Or register a new account via the UI.SECRET_KEY=your-secret-key-here-minimum-32-characters-long---



---JWT_SECRET_KEY=your-jwt-secret-key-minimum-32-characters



## Environment Variables ReferenceGOOGLE_API_KEY=your-actual-google-gemini-api-key



### Backend VariablesFLASK_APP=app.py



| Variable | Required | Default | Description |FLASK_ENV=development## Detailed Backend Setup> **Note**: The free tier includes 60 requests per minute, which is sufficient for development and small deployments.

|----------|----------|---------|-------------|

| `SECRET_KEY` | Yes | - | Flask secret key for session encryption (min 32 chars) |FLASK_DEBUG=True

| `JWT_SECRET_KEY` | Yes | - | JWT token signing key (min 32 chars) |

| `GOOGLE_API_KEY` | Yes | - | Google Gemini AI API key for question generation |DATABASE_URL=sqlite:///instance/smart_quizzer.db

| `DATABASE_URL` | No | `sqlite:///instance/smart_quizzer.db` | Database connection string |

| `SIMILARITY_THRESHOLD` | No | `0.75` | NLP similarity threshold for answer evaluation (0.0-1.0) |CORS_ORIGINS=http://localhost:8080

| `CORS_ORIGINS` | No | `http://localhost:8080` | Allowed frontend origins (comma-separated) |

| `FLASK_ENV` | No | `development` | Flask environment (`development` or `production`) |"@ | Out-File -FilePath .env -Encoding utf8### Step 1: Clone the Repository**Node.js 16.0 or higher**

| `SMTP_SERVER` | No | - | SMTP server for emails (optional) |

| `SMTP_PORT` | No | `587` | SMTP port |```

| `SMTP_USERNAME` | No | - | Email username |

| `SMTP_PASSWORD` | No | - | Email password (use app password) |

| `FROM_EMAIL` | No | - | Sender email address |

**Mac/Linux (Bash)**:

### Frontend Variables

```bash```bash---

| Variable | Required | Default | Description |

|----------|----------|---------|-------------|cat > .env << 'EOL'

| `REACT_APP_API_URL` | No | `http://localhost:5000` | Backend API base URL |

| `REACT_APP_WS_URL` | No | `http://localhost:5000` | WebSocket server URL |SECRET_KEY=your-secret-key-here-minimum-32-characters-longgit clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git



---JWT_SECRET_KEY=your-jwt-secret-key-minimum-32-characters



## TestingGOOGLE_API_KEY=your-actual-google-gemini-api-keycd Smart-Quizzer-AI- Download: https://nodejs.org/



### Backend TestsFLASK_APP=app.py



Currently, the project uses manual testing. To test backend functionality:FLASK_ENV=development```



1. **Start the backend server**FLASK_DEBUG=True

   ```bash

   cd backendDATABASE_URL=sqlite:///instance/smart_quizzer.db## ⚡ Quick Setup

   python app.py

   ```CORS_ORIGINS=http://localhost:8080



2. **Test endpoints using curl or Postman**EOL### Step 2: Navigate to Backend Directory



   **Register a user**:```

   ```bash

   curl -X POST http://localhost:5000/api/auth/register \- Verify: `node --version` (should show v16+)------

     -H "Content-Type: application/json" \

     -d '{"username":"testuser","email":"test@example.com","password":"Test@123","full_name":"Test User"}'**Important**: Replace placeholder values with actual keys!

   ```

```bash

   **Login**:

   ```bash#### How to Generate Secure Secret Keys

   curl -X POST http://localhost:5000/api/auth/login \

     -H "Content-Type: application/json" \cd backend### For Windows

     -d '{"username":"testuser","password":"Test@123"}'

   ```**Option 1 - Python** (All platforms):



### Frontend Tests```bash```



```bashpython -c "import secrets; print(secrets.token_urlsafe(32))"

cd frontend

npm test```

```



Note: Test suite is minimal. Contributions welcome!

**Option 2 - PowerShell** (Windows):### Step 3: Create Python Virtual Environment

---

```powershell

## Production Deployment

-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})```bash

### Using Gunicorn (Linux/Mac)

```

1. **Install Gunicorn** (already in requirements.txt)

   ```bash**Windows**:

   pip install gunicorn

   ```**Option 3 - Online** (Not recommended for production):



2. **Run with Gunicorn**Visit: [randomkeygen.com](https://randomkeygen.com/)```powershell# 1. Clone repository**npm 7.0 or higher** (included with Node.js)

   ```bash

   cd backend

   gunicorn -w 4 -b 0.0.0.0:5000 --worker-class eventlet app:app

   ```#### How to Get Google Gemini API Keypython -m venv venv



### Using PostgreSQL (Recommended for Production)



1. **Install PostgreSQL**1. Visit: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)```git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

   - [Download PostgreSQL](https://www.postgresql.org/download/)

2. Sign in with your Google account

2. **Create Database**

   ```sql3. Click "Create API Key" button

   CREATE DATABASE smart_quizzer;

   CREATE USER quizzer_user WITH PASSWORD 'secure_password';4. Copy the generated key

   GRANT ALL PRIVILEGES ON DATABASE smart_quizzer TO quizzer_user;

   ```5. Paste it as the value for `GOOGLE_API_KEY` in your `.env` file**Mac/Linux**:cd Smart-Quizzer-AI- Verify: `npm --version`



3. **Update `.env`**

   ```env

   DATABASE_URL=postgresql://quizzer_user:secure_password@localhost/smart_quizzer**Note**: The free tier allows 60 requests/minute, which is sufficient for development.```bash

   ```



4. **Install PostgreSQL adapter**

   ```bash### Step 7: Initialize Database and Start Serverpython3 -m venv venv

   pip install psycopg2-binary

   ```



### Frontend Production Build```bash```



```bashpython app.py

cd frontend

npm run build```# 2. Backend setup## Prerequisites## 🚀 Quick Setup (Automated)

```



This creates optimized production files in `frontend/build/`.

**What happens**:### Step 4: Activate Virtual Environment

Serve with Nginx, Apache, or any static file server.

1. Creates `instance/` directory if it doesn't exist

### Environment Variables for Production

2. Generates `smart_quizzer.db` SQLite database filecd backend

Update `.env`:

```env3. Creates all 15 database tables:

FLASK_ENV=production

DATABASE_URL=postgresql://user:pass@host/dbname   - user, quiz_session, question, topic, badge**Windows (PowerShell)**:

CORS_ORIGINS=https://yourdomain.com

SECRET_KEY=<strong-production-key>   - user_badge, performance_trend, learning_path, learning_milestone

JWT_SECRET_KEY=<strong-production-jwt-key>

```   - multiplayer_room, multiplayer_participant, quiz_leaderboard```powershellpython -m venv venv**Git** (for cloning repository)



---   - flagged_question, question_feedback, password_reset_token



## Troubleshooting4. Inserts default data:.\venv\Scripts\Activate.ps1



### Issue 1: "GOOGLE_API_KEY not configured"   - 10 quiz topics (Python, JavaScript, Data Structures, etc.)



**Error**:   - 21 achievement badges```venv\Scripts\activate

```

Error: GOOGLE_API_KEY not configured in environment variables5. Starts Flask development server on port 5000

```



**Solution**:

1. Verify `.env` file exists in `backend/` directory**Expected output**:

2. Ensure `GOOGLE_API_KEY=AIza...` line is present

3. Remove any quotes around the key```**Windows (Command Prompt)**:pip install -r requirements.txt- Download: https://git-scm.com/downloads

4. Restart the backend server

5. Get a new API key from [Google AI Studio](https://aistudio.google.com/app/apikey) * Serving Flask app 'app.py'



### Issue 2: "Module not found" Errors * Debug mode: on```cmd



**Python modules not found**:WARNING: This is a development server. Do not use it in production.

```bash

# Ensure virtual environment is activatedUse a production WSGI server instead.venv\Scripts\activate.bat

venv\Scripts\activate  # Windows

source venv/bin/activate  # Mac/Linux * Running on http://127.0.0.1:5000



# Reinstall dependenciesPress CTRL+C to quit```

pip install -r requirements.txt

``````



**Node modules not found**:# 3. Create .env file- Verify: `git --version`

```bash

cd frontend**Backend is now running on**: `http://localhost:5000`

rm -rf node_modules package-lock.json

npm install**Mac/Linux**:

```

**Keep this terminal window open!**

### Issue 3: Port Already in Use

```bashecho GOOGLE_API_KEY=your_api_key_here > .env

**Backend port 5000 in use**:

---

**Windows**:

```powershellsource venv/bin/activate

# Find process using port 5000

netstat -ano | findstr :5000## Detailed Frontend Setup



# Kill process (replace PID)```### Required Software### Windows

taskkill /PID <process_id> /F

```Open a **new terminal window** for the frontend setup.



**Mac/Linux**:

```bash

# Find process### Step 1: Navigate to Frontend Directory

lsof -i :5000

You should see `(venv)` prefix in your terminal prompt.# Generate secret keys

# Kill process

kill -9 <PID>```bash

```

cd frontend

**Frontend port 8080 in use**:

Change port in `frontend/package.json`:```

```json

"scripts": {### Step 5: Install Python Dependenciespython -c "import secrets; print('SECRET_KEY=' + secrets.token_hex(32))" >> .env### Required API Keys

  "start": "set PORT=3000 && react-scripts start"  // Windows

  "start": "PORT=3000 react-scripts start"  // Mac/Linux(If you're at the project root. If you're in `backend/`, use `cd ../frontend`)

}

```



### Issue 4: Database Errors### Step 2: Install Node.js Dependencies



**"Unable to open database file"**:```bashpython -c "import secrets; print('JWT_SECRET_KEY=' + secrets.token_hex(32))" >> .env

```bash

# Ensure instance directory exists```bash

mkdir -p backend/instance  # Mac/Linux

New-Item -ItemType Directory -Force backend\instance  # Windowsnpm installpip install -r requirements.txt



# Reset database```

python backend/app.py

``````



**"Table already exists"**:**This installs 1000+ packages** including:

```bash

# Delete and recreate database- React 18.2.0

rm backend/instance/smart_quizzer.db  # Mac/Linux

Remove-Item backend\instance\smart_quizzer.db  # Windows- TypeScript 4.9.5



python backend/app.py- Tailwind CSS 3.3.0This installs 28 packages including:# 4. Start backend

```

- React Router 6.4.0

### Issue 5: CORS Errors

- Axios 1.5.0- Flask 3.0.0 (web framework)

**"Access-Control-Allow-Origin" error in browser**:

- Socket.IO Client 4.8.1

1. Check `CORS_ORIGINS` in `.env`:

   ```env- Recharts 2.8.0 (for charts)- SQLAlchemy 2.0.43 (database ORM)python app.py**Google Gemini API Key** (Free tier available)

   CORS_ORIGINS=http://localhost:8080

   ```- And many development dependencies



2. Ensure frontend runs on the specified port- Google Generative AI SDK (Gemini AI)



3. Restart backend server after changing `.env`**Installation time**: 2-4 minutes



### Issue 6: Gemini API Rate Limits- Sentence-Transformers (NLP for answer evaluation)```



**"Resource exhausted" or 429 errors**:**Possible warnings**: You might see peer dependency warnings - these are normal and can be safely ignored.



Free tier limits:- Flask-SocketIO (real-time WebSocket support)

- 60 requests per minute

- 1,500 requests per day### Step 3: Configure Frontend Environment



**Solutions**:- And more...1. Visit: https://ai.google.dev/1. **Python 3.13+**```bash

- Wait 1 minute between generating large batches of questions

- Reduce number of questions per quiz (5-10 instead of 20)Create a `.env` file in the `frontend/` directory.

- Consider upgrading to paid tier if needed



### Issue 7: Frontend Compilation Errors

**Windows PowerShell**:

**Webpack errors or TypeScript issues**:

```powershell**Installation time**: Approximately 3-5 minutes depending on internet speed.Open a **new terminal**:

```bash

cd frontend@"



# Clear cacheREACT_APP_API_URL=http://localhost:5000

rm -rf node_modules/.cache  # Mac/Linux

Remove-Item -Recurse node_modules\.cache  # Windows"@ | Out-File -FilePath .env -Encoding utf8



# Rebuild```### Step 6: Configure Environment Variables2. Sign in with Google account

npm start

```



### Issue 8: Virtual Environment Activation Issues**Mac/Linux (Bash)**:



**"venv not recognized" on Windows**:```bash



Use full path:cat > .env << 'EOL'Create a `.env` file in the `backend/` directory:```bash

```powershell

C:\path\to\Smart-Quizzer-AI\backend\venv\Scripts\activateREACT_APP_API_URL=http://localhost:5000

```

EOL

Or use Python directly:

```powershell```

python -m venv venv

venv\Scripts\python.exe app.py**Windows (PowerShell)**:# 5. Frontend setup3. Navigate to "Get API Key" → "Create API Key"   - Download: https://www.python.org/downloads/# 1. Clone the repository

```

**Note**: If you deploy the backend on a different URL, update this value accordingly.

---

```powershell

## Additional Notes

### Step 4: Start Development Server

### Deactivating Virtual Environment

@"cd frontend

When done developing:

```bash```bash

deactivate

```npm startSECRET_KEY=your-secret-key-here-minimum-32-characters



### Updating Dependencies```



**Backend**:JWT_SECRET_KEY=your-jwt-secret-key-here-minimum-32-charactersnpm install4. Copy the generated key (keep it secure)

```bash

pip install --upgrade -r requirements.txt**What happens**:

```

1. Compiles TypeScript to JavaScriptGOOGLE_API_KEY=your-google-gemini-api-key-here

**Frontend**:

```bash2. Processes Tailwind CSS

npm update

```3. Starts webpack development server on port 8080FLASK_APP=app.pynpm start



### Checking Logs4. Opens browser automatically at `http://localhost:8080`



Backend logs print to console. For production, configure logging to files.5. Enables hot-reload (changes auto-refresh the browser)FLASK_ENV=development



### Security Reminders



- **Never commit `.env` files** to Git**Expected output**:DATABASE_URL=sqlite:///instance/smart_quizzer.db```   - Verify installation: `python --version`git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

- Use strong, unique secret keys in production

- Change default passwords```

- Keep dependencies updated

- Use HTTPS in productionCompiled successfully!"@ | Out-File -FilePath .env -Encoding utf8



---



**Need more help?** Check [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md) for technical details or open an issue on GitHub.You can now view smart-quizzer-frontend in the browser.```



**Ready to deploy?** See the Production Deployment section above or contact the project maintainer.


  Local:            http://localhost:8080

  On Your Network:  http://192.168.x.x:8080

**Mac/Linux (Bash)**:### For macOS/Linux> **Note**: The free tier includes 60 requests per minute, sufficient for development and small deployments.

Note that the development build is not optimized.

To create a production build, use npm run build.```bash



webpack compiled successfullycat > .env << EOL

```

SECRET_KEY=your-secret-key-here-minimum-32-characters

**Frontend is now running on**: `http://localhost:8080`

JWT_SECRET_KEY=your-jwt-secret-key-here-minimum-32-characters```bashcd Smart-Quizzer-AI

---

GOOGLE_API_KEY=your-google-gemini-api-key-here

## Database Initialization

FLASK_APP=app.py# 1. Clone repository

### Automatic Initialization (Default)

FLASK_ENV=development

The database is **automatically initialized** when you first run `python app.py`. The initialization process:

DATABASE_URL=sqlite:///instance/smart_quizzer.dbgit clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git---

1. **Creates all tables** using SQLAlchemy models

2. **Inserts default topics**:EOL

   - Python Programming

   - JavaScript```cd Smart-Quizzer-AI

   - Data Structures

   - Algorithms

   - Database Systems

   - Web Development**Getting a Google Gemini API Key**:2. **Node.js 16+ and npm**

   - Machine Learning

   - Cloud Computing

   - Cybersecurity

   - Software Engineering1. Visit https://aistudio.google.com/app/apikey# 2. Backend setup



3. **Inserts 21 achievement badges**:2. Sign in with your Google account

   - Quiz Starter, Quick Learner, Perfectionist

   - Marathon Runner, Streak Master, Night Owl3. Click "Create API Key"cd backend## Backend Setup

   - Early Bird, Weekend Warrior, Speedster

   - Consistent Learner, Subject Expert, Quiz Master4. Copy the generated key

   - Legend, Knowledge Seeker, Challenger

   - Champion, Persistent Learner, Dedicated Student5. Replace `your-google-gemini-api-key-here` in `.env` with your keypython3 -m venv venv

   - Wise Owl, Scholar, Quiz King



### Manual Database Reset

**Generating Secret Keys**:source venv/bin/activate   - Download: https://nodejs.org/# 2. Run the automated setup script

If you need to start fresh:



**Windows PowerShell**:

```powershell**Windows (PowerShell)**:pip install -r requirements.txt

cd backend

Remove-Item -Path "instance\smart_quizzer.db" -Force```powershell

python app.py

```-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})### Step 1: Clone Repository



**Mac/Linux**:```

```bash

cd backend# 3. Create .env file

rm -f instance/smart_quizzer.db

python app.py**Mac/Linux (Bash)**:

```

```bashcat > .env << EOF   - Verify installation: `node --version` and `npm --version`setup.bat

### Using Migration Script (Advanced)

python3 -c "import secrets; print(secrets.token_urlsafe(32))"

For more control over database initialization:

```GOOGLE_API_KEY=your_api_key_here

```bash

cd backend

source venv/bin/activate  # or .\venv\Scripts\Activate.ps1 on Windows

python migrate_db.py### Step 7: Initialize DatabaseSECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')```bash

```



---

```bashJWT_SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')

## Running the Application

python app.py

You need **TWO terminal windows** running simultaneously:

```EOFgit clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

### Terminal 1: Backend Server



```bash

cd backendThis will:



# Activate virtual environment1. Create the `instance/` directory

source venv/bin/activate  # Mac/Linux

# or2. Generate `smart_quizzer.db` SQLite database# 4. Start backendcd Smart-Quizzer-AI

.\venv\Scripts\Activate.ps1  # Windows PowerShell

3. Create all 15 database tables

# Start server

python app.py4. Insert default topics (Python, JavaScript, Data Structures, etc.)python app.py

```

5. Insert 21 achievement badges

**Runs on**: `http://localhost:5000`

6. Start the Flask development server on port 5000``````3. **Git**# 3. Edit backend/.env and add your GEMINI_API_KEY

### Terminal 2: Frontend Development Server



```bash

cd frontend**Output should look like**:



# Start server```

npm start

``` * Serving Flask app 'app.py'Open a **new terminal**:



**Runs on**: `http://localhost:8080` * Debug mode: on



### Accessing the ApplicationWARNING: This is a development server. Do not use it in production.



1. Open your web browser * Running on http://127.0.0.1:5000

2. Navigate to **http://localhost:8080**

3. You should see the Smart Quizzer AI login page``````bash### Step 2: Create Virtual Environment   - Download: https://git-scm.com/downloads# (The file will be created automatically)



### Test Accounts (if you seed the database)



You can create test accounts through the registration page, or seed the database with:Keep this terminal window open. The backend server is now running.# 5. Frontend setup



**Admin Account**:

- Username: `admin`

- Password: `admin123` (change in production!)---cd frontend



**Regular User**:

- Username: `testuser`

- Password: `test123`## Detailed Frontend Setupnpm install



### Stopping the Servers



**To stop backend**:Open a **new terminal window** for the frontend.npm start**Windows (PowerShell)**   - Verify installation: `git --version`

- Press `Ctrl + C` in the backend terminal



**To stop frontend**:

- Press `Ctrl + C` in the frontend terminal### Step 1: Navigate to Frontend Directory```



---



## Environment Variables Reference```bash```powershell



### Backend Environment Variablescd frontend



| Variable | Required | Default | Description |```### Access the Application

|----------|----------|---------|-------------|

| `SECRET_KEY` | **Yes** | None | Flask secret key for session encryption (min 32 chars) |

| `JWT_SECRET_KEY` | **Yes** | None | JWT token signing key (min 32 chars) |

| `GOOGLE_API_KEY` | **Yes** | None | Google Gemini AI API key for question generation |(Assuming you're at the project root. If you're in `backend/`, use `cd ../frontend`)cd backend# 4. You're done! Follow the on-screen instructions to start the servers

| `FLASK_APP` | No | `app.py` | Main Flask application file |

| `FLASK_ENV` | No | `development` | Environment mode (`development` or `production`) |

| `FLASK_DEBUG` | No | `True` | Enable Flask debug mode (set `False` in production) |

| `DATABASE_URL` | No | `sqlite:///instance/smart_quizzer.db` | Database connection string |### Step 2: Install Node Dependencies- **Frontend**: http://localhost:8080

| `CORS_ORIGINS` | No | `http://localhost:8080` | Allowed CORS origins (comma-separated for multiple) |

| `SIMILARITY_THRESHOLD` | No | `0.75` | Answer evaluation similarity threshold (0.0-1.0) |

| `QUESTION_TIMEOUT` | No | `60` | Quiz question timeout in seconds |

| `MAX_UPLOAD_SIZE` | No | `16777216` | Max file upload size in bytes (16 MB) |```bash- **Backend API**: http://localhost:5000python -m venv venv

| `SESSION_TIMEOUT` | No | `3600` | User session timeout in seconds (1 hour) |

npm install

### Frontend Environment Variables

```- **Create Account**: http://localhost:8080/register

| Variable | Required | Default | Description |

|----------|----------|---------|-------------|

| `REACT_APP_API_URL` | **Yes** | None | Backend API base URL (e.g., `http://localhost:5000`) |

| `REACT_APP_WS_URL` | No | Same as API URL | WebSocket server URL (auto-detected if not set) |This installs 1000+ packages including:.\venv\Scripts\Activate.ps14. **Google Gemini API Key**```



---- React 18.2.0



## Production Deployment- TypeScript 4.9.5---



### Backend Production Setup- Tailwind CSS 3.3.0



#### 1. Use Production-Grade WSGI Server (Gunicorn)- Axios (HTTP client)```



**Install Gunicorn** (already in requirements.txt):- Socket.IO Client (WebSocket)

```bash

pip install gunicorn eventlet- React Router (routing)## 🔧 Backend Setup

```

- Recharts (data visualization)

**Run with Gunicorn**:

```bash   - Get free API key: https://ai.google.dev/

gunicorn -w 4 -b 0.0.0.0:5000 --worker-class eventlet app:app

```**Installation time**: Approximately 2-4 minutes.



**Gunicorn options explained**:### Step 1: Clone Repository

- `-w 4`: Use 4 worker processes (adjust based on CPU cores: 2-4 × num_cores)

- `-b 0.0.0.0:5000`: Bind to all network interfaces on port 5000### Step 3: Configure Environment Variables

- `--worker-class eventlet`: Use eventlet workers for WebSocket support

- `app:app`: Module name and application object**Windows (Command Prompt)**



#### 2. Switch to PostgreSQL DatabaseCreate a `.env` file in the `frontend/` directory:



**Install PostgreSQL adapter**:```bash

```bash

pip install psycopg2-binary**Windows (PowerShell)**:

```

```powershellgit clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git```cmd   - Required for AI question generation### Linux / macOS

**Update `.env`**:

```@"

DATABASE_URL=postgresql://username:password@localhost:5432/smart_quizzer

```REACT_APP_API_URL=http://localhost:5000cd Smart-Quizzer-AI



**Create PostgreSQL database**:"@ | Out-File -FilePath .env -Encoding utf8

```sql

CREATE DATABASE smart_quizzer;``````cd backend

CREATE USER smart_quiz_user WITH PASSWORD 'secure_password';

GRANT ALL PRIVILEGES ON DATABASE smart_quizzer TO smart_quiz_user;

```

**Mac/Linux (Bash)**:

#### 3. Set Production Environment Variables

```bash

Update `.env`:

```cat > .env << EOL### Step 2: Create Virtual Environmentpython -m venv venv

FLASK_ENV=production

FLASK_DEBUG=FalseREACT_APP_API_URL=http://localhost:5000

SECRET_KEY=<generate-new-strong-key>

JWT_SECRET_KEY=<generate-new-strong-key>EOL

```

```

#### 4. Configure Nginx as Reverse Proxy

**Purpose**: Isolates project dependencies from system Python packages.venv\Scripts\activate.bat

**Install Nginx**:

```bash### Step 4: Start Development Server

# Ubuntu/Debian

sudo apt update

sudo apt install nginx

```bash

# macOS

brew install nginxnpm start**Windows:**```### Optional Software```bash

```

```

**Nginx configuration** (`/etc/nginx/sites-available/smart-quizzer`):

```nginx```bash

server {

    listen 80;This will:

    server_name your-domain.com;

1. Compile TypeScript to JavaScriptcd backend

    # Frontend (React build)

    location / {2. Build Tailwind CSS

        root /path/to/Smart-Quizzer-AI/frontend/build;

        try_files $uri $uri/ /index.html;3. Start development server on port 8080python -m venv venv

    }

4. Automatically open http://localhost:8080 in your browser

    # Backend API

    location /api {venv\Scripts\activate**Mac/Linux**# 1. Clone the repository

        proxy_pass http://localhost:5000;

        proxy_http_version 1.1;**Output should look like**:

        proxy_set_header Upgrade $http_upgrade;

        proxy_set_header Connection 'upgrade';``````

        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;Compiled successfully!

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_cache_bypass $http_upgrade;```bash

    }

You can now view frontend in the browser.

    # WebSocket (Socket.IO)

    location /socket.io {**macOS/Linux:**

        proxy_pass http://localhost:5000;

        proxy_http_version 1.1;  Local:            http://localhost:8080

        proxy_set_header Upgrade $http_upgrade;

        proxy_set_header Connection "upgrade";  On Your Network:  http://192.168.x.x:8080```bashcd backend- **Virtual Environment Tool** (venv, virtualenv, or conda)git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;```

    }

}cd backend

```

---

**Enable site**:

```bashpython3 -m venv venvpython3 -m venv venv

sudo ln -s /etc/nginx/sites-available/smart-quizzer /etc/nginx/sites-enabled/

sudo nginx -t## Database Initialization

sudo systemctl restart nginx

```source venv/bin/activate



### Frontend Production BuildThe database is automatically initialized when you first run `python app.py`. However, if you need to manually reset or initialize the database:



#### 1. Build Optimized Production Bundle```source venv/bin/activate- **Code Editor** (VS Code, PyCharm, or Sublime Text)cd Smart-Quizzer-AI



```bash### Automatic Initialization (Recommended)

cd frontend

npm run build

```

Simply run the backend server:

**This creates**:

- Optimized, minified JavaScript bundles**Expected Output:**```

- Compressed CSS files

- Static assets in `build/` directory```bash

- Typically reduces size by 70-80%

cd backend```

**Build output location**: `frontend/build/`

source venv/bin/activate  # or .\venv\Scripts\Activate.ps1 on Windows

#### 2. Serve Static Files

python app.py(venv) C:\...\backend>  # Windows- **Postman** (for API testing)

**Option 1 - Using Nginx** (recommended):

Configure Nginx as shown above to serve the `build/` directory.```



**Option 2 - Using serve package**:(venv) user@machine:~/backend$  # macOS/Linux

```bash

npm install -g serveThe server automatically:

serve -s build -l 8080

```- Creates all tables```### Step 3: Install Python Dependencies



**Option 3 - Using Node.js static server**:- Inserts default topics

```bash

npm install -g http-server- Inserts achievement badges

cd build

http-server -p 8080- Sets up database relationships

```

### Step 3: Install Python Dependencies# 2. Make setup script executable and run it

### Docker Deployment (Recommended for Production)

### Manual Initialization (Advanced)

**Use the provided `docker-compose.yml`**:



```bash

# Build and start all servicesIf you need more control, use the migration script:

docker-compose up --build -d

```bash```bash

# View logs

docker-compose logs -f```bash



# Stop servicescd backendpip install --upgrade pip

docker-compose down

```source venv/bin/activate



**Docker Compose automatically**:python migrate_db.pypip install -r requirements.txtpip install --upgrade pip---chmod +x setup.sh

- Builds backend and frontend images

- Sets up PostgreSQL database with persistent volume```

- Configures networking between containers

- Exposes ports 80 (frontend) and 5000 (backend)```



---**Resetting the Database**:



## Troubleshootingpip install -r requirements.txt



### Common Issue #1: "GOOGLE_API_KEY not found" ErrorTo start fresh, delete the existing database and restart the server:



**Symptom**: Backend fails to start with error message about missing API key.**Installation Time**: 2-5 minutes (downloads ~500MB)



**Cause**: Environment variable not loaded or `.env` file missing.**Windows**:



**Solution**:```powershell```./setup.sh

1. Ensure `.env` file exists in `backend/` directory

2. Verify `GOOGLE_API_KEY` is set in `.env`Remove-Item -Path instance\smart_quizzer.db -Force

3. Check that value is your actual API key (not placeholder text)

4. Ensure no extra spaces around `=` signpython app.py**Key Packages Installed:**

5. Restart backend server after editing `.env`

```

**Get API Key**: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)



### Common Issue #2: "Module not found" Errors (Python)

**Mac/Linux**:

**Symptom**: Import errors when starting backend.

```bash| Package | Version | Purpose |

**Cause**: Dependencies not installed or virtual environment not activated.

rm -f instance/smart_quizzer.db

**Solution**:

1. Ensure virtual environment is activated:python app.py|---------|---------|---------|**Expected packages** (automatically installed):## Installation

   ```bash

   source venv/bin/activate  # Mac/Linux```

   .\venv\Scripts\Activate.ps1  # Windows

   ```| Flask | 3.0.0 | Web framework |

2. Reinstall dependencies:

   ```bash---

   pip install -r requirements.txt

   ```| SQLAlchemy | 2.0.43 | Database ORM |- Flask==3.0.0

3. Verify Python version:

   ```bash## Running the Application

   python --version  # Should be 3.9 or higher

   ```| google-generativeai | 0.8.0+ | AI question generation |

4. Clear pip cache if needed:

   ```bash### Development Mode

   pip cache purge

   pip install -r requirements.txt| sentence-transformers | 2.7.0+ | Answer evaluation |- SQLAlchemy==2.0.43# 3. Edit backend/.env and add your GEMINI_API_KEY

   ```

You need **two terminal windows** running simultaneously:

### Common Issue #3: Port Already in Use

| Flask-SocketIO | 5.3.6 | Real-time WebSocket |

**Symptom**: "Address already in use" error for port 5000 or 8080.

#### Terminal 1: Backend Server

**Cause**: Another process is using the port.

| PyJWT | 2.8.0+ | Authentication tokens |- google-generativeai==0.8.3

**Solution**:

```bash

**Find and kill process on Windows**:

```powershellcd backend| BCrypt | 4.1.2 | Password hashing |

# Find process using port 5000

netstat -ano | findstr :5000source venv/bin/activate  # Windows: .\venv\Scripts\Activate.ps1

# Kill process (replace PID with actual process ID)

taskkill /PID <PID> /Fpython app.py- sentence-transformers==3.3.1### Step 1: Clone the Repository# (The file will be created automatically)

```

```

**Find and kill process on Mac/Linux**:

```bash**Expected Output:**

# Find and kill process using port 5000

lsof -ti:5000 | xargs kill -9Runs on: http://localhost:5000



# Or for port 8080```- PyPDF2==3.0.1

lsof -ti:8080 | xargs kill -9

```#### Terminal 2: Frontend Development Server



**Alternative**: Change the port in configuration files.Successfully installed flask-3.0.0 sqlalchemy-2.0.43 ...



### Common Issue #4: Database Initialization Errors```bash



**Symptom**: "OperationalError: no such table" or similar database errors.cd frontend```- python-docx==1.1.2



**Cause**: Database not properly initialized or corrupted.npm start



**Solution**:```

1. Delete existing database:

   ```bash

   # Windows

   Remove-Item backend\instance\smart_quizzer.db -ForceRuns on: http://localhost:8080### Step 4: Configure Environment Variables- Flask-CORS==5.0.0



   # Mac/Linux

   rm -f backend/instance/smart_quizzer.db

   ```### Accessing the Application

2. Restart backend server:

   ```bash

   python app.py

   ```1. Open your browserCreate a `.env` file in the `backend/` directory:- Flask-SocketIO==5.4.1```bash# 4. You're done! Follow the on-screen instructions to start the servers

3. Database will be recreated automatically

2. Navigate to http://localhost:8080

### Common Issue #5: Frontend Compilation Errors

3. You should see the Smart Quizzer AI login page

**Symptom**: TypeScript or webpack build errors.



**Cause**: Corrupted node_modules or cache issues.

### Default Accounts (if seeded)**Method 1: Manual Creation**- PyJWT==2.10.1

**Solution**:

1. Delete `node_modules/` and package lock:

   ```bash

   # Windows**Admin Account**:

   Remove-Item -Recurse -Force node_modules, package-lock.json

- Username: `admin`

   # Mac/Linux

   rm -rf node_modules package-lock.json- Password: `admin123`Create `backend/.env` with this content:- beautifulsoup4==4.12.3# Clone from GitHub```

   ```

2. Clear npm cache:

   ```bash

   npm cache clean --force**Test User Account**:

   ```

3. Reinstall dependencies:- Username: `testuser`

   ```bash

   npm install- Password: `test123````env

   ```

4. Clear webpack cache:

   ```bash

   # Windows### Stopping the Servers# REQUIRED: Google Gemini API Key

   Remove-Item -Recurse -Force node_modules\.cache



   # Mac/Linux

   rm -rf node_modules/.cache**Backend**:GOOGLE_API_KEY=your_actual_api_key_here**Installation time**: 2-5 minutes (downloads ~500MB)git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

   ```

5. Restart development server:- Press `Ctrl + C` in the backend terminal

   ```bash

   npm start

   ```

**Frontend**:

### Common Issue #6: CORS Errors in Browser Console

- Press `Ctrl + C` in the frontend terminal# REQUIRED: Flask secret keys (generate unique values)

**Symptom**: "CORS policy" errors in browser developer tools.



**Cause**: Frontend and backend on different origins, CORS not configured.

---SECRET_KEY=your_secret_key_here

**Solution**:

1. Verify `REACT_APP_API_URL` in frontend `.env` matches backend URL

2. Check backend CORS configuration in `app.py`:

   ```python## Environment Variables ReferenceJWT_SECRET_KEY=your_jwt_secret_key_here### Step 4: Configure Environment Variables---

   CORS(app, resources={r"/api/*": {"origins": ["http://localhost:8080"]}})

   ```

3. Ensure backend is running before starting frontend

4. Clear browser cache and reload### Backend Environment Variables



### Common Issue #7: WebSocket Connection Failures



**Symptom**: Multiplayer features not working, "Connection failed" messages.| Variable | Required | Default | Description |# OPTIONAL: Database configuration



**Cause**: Flask-SocketIO not properly configured or firewall blocking.|----------|----------|---------|-------------|



**Solution**:| `SECRET_KEY` | Yes | None | Flask secret key for session encryption (min 32 chars) |DATABASE_URL=sqlite:///instance/smart_quizzer.db

1. Verify `flask-socketio` is installed:

   ```bash| `JWT_SECRET_KEY` | Yes | None | JWT token signing key (min 32 chars) |

   pip install flask-socketio python-socketio

   ```| `GOOGLE_API_KEY` | Yes | None | Google Gemini AI API key |Create a `.env` file in the `backend/` directory:# Navigate to project directory

2. Check browser console for connection errors

3. Ensure no firewall blocking WebSocket connections| `FLASK_APP` | No | `app.py` | Main Flask application file |

4. Try accessing from incognito/private browser window

5. Verify backend is running with eventlet workers:| `FLASK_ENV` | No | `development` | Environment mode (`development` or `production`) |# OPTIONAL: Environment

   ```bash

   pip install eventlet| `FLASK_DEBUG` | No | `True` | Enable debug mode (set to `False` in production) |

   ```

| `DATABASE_URL` | No | `sqlite:///instance/smart_quizzer.db` | Database connection string |FLASK_ENV=development

### Common Issue #8: Slow Question Generation

| `CORS_ORIGINS` | No | `http://localhost:8080` | Allowed CORS origins (comma-separated) |

**Symptom**: Questions take a long time to generate (>30 seconds).

| `SIMILARITY_THRESHOLD` | No | `0.75` | Answer evaluation threshold (0.0-1.0) |FLASK_DEBUG=True

**Cause**: Google Gemini API rate limiting or slow internet connection.

| `QUESTION_TIMEOUT` | No | `60` | Quiz question timeout in seconds |

**Solution**:

1. Check your internet connection speed| `MAX_UPLOAD_SIZE` | No | `16777216` | Max file upload size in bytes (16 MB) |```**Automated (Recommended)**cd Smart-Quizzer-AI## 🔧 Manual Setup (Step-by-Step)

2. Verify API key hasn't exceeded rate limits (60 requests/minute for free tier)

3. Reduce number of questions generated per request| `SESSION_TIMEOUT` | No | `3600` | User session timeout in seconds (1 hour) |

4. Consider upgrading to paid Google Gemini API tier

5. Check `question_gen.py` timeout settings



---### Frontend Environment Variables



## Advanced Configuration**Method 2: Generate Secure Keys**```bash



### Customizing Answer Evaluation Threshold| Variable | Required | Default | Description |



Adjust the strictness of answer grading:|----------|----------|---------|-------------|



**Edit `backend/.env`**:| `REACT_APP_API_URL` | Yes | None | Backend API base URL (e.g., `http://localhost:5000`) |

```

# Stricter evaluation (requires 80% similarity)| `REACT_APP_WS_URL` | No | Same as API URL | WebSocket server URL |```bash# PowerShell (Windows)```

SIMILARITY_THRESHOLD=0.80



# More lenient (accepts 70% similarity)

SIMILARITY_THRESHOLD=0.70---# Windows (PowerShell)



# Default

SIMILARITY_THRESHOLD=0.75

```## Production Deploymentpython -c "import secrets; print('SECRET_KEY=' + secrets.token_hex(32))"@"



**Impact**:

- Higher values (0.8-0.9): Requires more precise answers

- Lower values (0.6-0.7): Accepts more varied phrasings### Backend Production Setuppython -c "import secrets; print('JWT_SECRET_KEY=' + secrets.token_hex(32))"

- Default (0.75): Balanced approach



### Adding Custom Quiz Topics

#### 1. Use Gunicorn (WSGI Server)GOOGLE_API_KEY=your_api_key_hereIf you prefer to set up manually or the automated script fails, follow these steps:

**Edit `backend/app.py`** in the `initialize_default_data()` function:



```python

topics = [Install Gunicorn:# macOS/Linux

    Topic(name='Python Programming'),

    Topic(name='JavaScript'),```bash

    Topic(name='Data Structures'),

    # Add your custom topicspip install gunicornpython3 -c "import secrets; print('SECRET_KEY=' + secrets.token_hex(32))"SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))')

    Topic(name='React Development'),

    Topic(name='Node.js Backend'),```

    Topic(name='Docker & Kubernetes'),

]python3 -c "import secrets; print('JWT_SECRET_KEY=' + secrets.token_hex(32))"

```

Run with Gunicorn:

**Apply changes**:

1. Delete database: `rm backend/instance/smart_quizzer.db````bash```JWT_SECRET_KEY=$(python -c 'import secrets; print(secrets.token_hex(32))')### Step 2: Backend Setup

2. Restart backend: `python app.py`

gunicorn -w 4 -b 0.0.0.0:5000 --worker-class eventlet app:app

### Creating Custom Achievement Badges

```

**Edit `backend/app.py`** in the `initialize_default_data()` function:



```python

badges = [- `-w 4`: Use 4 worker processes (adjust based on CPU cores)Copy the output to your `.env` file.DATABASE_URL=sqlite:///instance/smart_quizzer.db

    # Existing badges...

    - `-b 0.0.0.0:5000`: Bind to all interfaces on port 5000

    # Add custom badge

    Badge(- `--worker-class eventlet`: Required for WebSocket support

        name='Power User',

        description='Complete 100 quizzes in a single month',

        criteria_type='quiz_count_monthly',

        criteria_value=100,#### 2. Use PostgreSQL (Production Database)### Step 5: Start Backend ServerFLASK_ENV=development### 1. Clone the Repository

        points=1000,

        rarity='Epic',

        icon='crown'

    ),Install PostgreSQL adapter:

]

``````bash



### Configuring Email Notifications (Optional)pip install psycopg2-binary```bash"@ | Out-File -FilePath .env -Encoding UTF8



For password reset and notification features:```



**Install email dependencies**:python app.py

```bash

pip install Flask-MailUpdate `.env`:

```

`````````#### 2.1 Create Virtual Environment (Recommended)

**Add to `backend/.env`**:

```DATABASE_URL=postgresql://username:password@localhost:5432/smart_quizzer

MAIL_SERVER=smtp.gmail.com

MAIL_PORT=587```

MAIL_USE_TLS=True

MAIL_USERNAME=your-email@gmail.com

MAIL_PASSWORD=your-app-specific-password

```#### 3. Set Environment to Production**Expected Output:**



**Note**: Never commit email credentials to version control!



---Update `.env`:```



## Next Steps```



After successful setup:FLASK_ENV=productionDatabase initialized successfully!**Manual (All Platforms)**```bash



1. ✅ **Create an account** through the registration pageFLASK_DEBUG=False

2. ✅ **Upload content** (PDF, DOCX, or text) to generate your first quiz

3. ✅ **Take quizzes** and track your progress in Analytics```Created 15 tables

4. ✅ **Earn badges** by completing various achievements

5. ✅ **Compete** on global leaderboards

6. ✅ **Explore** multiplayer quiz rooms

#### 4. Set Up Reverse Proxy (Nginx)Inserted 10 default topicsCreate `backend/.env` with this content:

---



## Getting Help

Example Nginx configuration:Inserted 21 achievement badges

If you encounter issues not covered in this guide:



1. **Check existing GitHub Issues**: [github.com/BatchuMamatha/Smart-Quizzer-AI/issues](https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues)

2. **Search documentation**: Review [project_documentation.md](project_documentation.md)```nginx * Serving Flask app 'app'```env**Windows:**git clone https://github.com/BatchuMamatha/Smart-Quizzer-AI.git

3. **Create new issue**: Provide detailed error messages and steps to reproduce

server {

---

    listen 80; * Debug mode: on

**Setup Guide Version**: 1.0.0  

**Last Updated**: November 2025      server_name your-domain.com;

**Maintainer**: Mamatha Bachu

 * Running on http://127.0.0.1:5000# Required: Google Gemini API Key

    location / {

        proxy_pass http://localhost:8080;  # FrontendPress CTRL+C to quit

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade; * Restarting with statGOOGLE_API_KEY=your_actual_api_key_here```bashcd Smart-Quizzer-AI

        proxy_set_header Connection 'upgrade';

        proxy_set_header Host $host; * Debugger is active!

        proxy_cache_bypass $http_upgrade;

    }```



    location /api {

        proxy_pass http://localhost:5000;  # Backend

        proxy_http_version 1.1;**What Happens on First Run:**# Required: Flask secret keys (generate unique values)cd backend```

        proxy_set_header Upgrade $http_upgrade;

        proxy_set_header Connection 'upgrade';- ✅ Creates `backend/instance/` directory

        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;- ✅ Creates `smart_quizzer.db` SQLite databaseSECRET_KEY=generate_a_random_32_character_hex_string

    }

- ✅ Initializes 15 database tables

    location /socket.io {

        proxy_pass http://localhost:5000;- ✅ Inserts default topics (Python, JavaScript, Data Structures, etc.)JWT_SECRET_KEY=generate_another_random_32_character_hex_stringpython -m venv venv

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;- ✅ Inserts 21 achievement badges

        proxy_set_header Connection "upgrade";

    }- ✅ No manual database setup required!

}

```



### Frontend Production Setup---# Optional: Database configurationvenv\Scripts\activate### 2. Backend Setup



#### 1. Build for Production



```bash## 💻 Frontend SetupDATABASE_URL=sqlite:///instance/smart_quizzer.db

cd frontend

npm run build

```

### Step 1: Navigate to Frontend Directory```

This creates an optimized production build in the `build/` directory.



#### 2. Serve with Static Server

Open a **new terminal window** (keep backend terminal running):# Optional: Environment

Option 1: Using `serve` package:

```bash

npm install -g serve

serve -s build -l 8080```bashFLASK_ENV=development```bash

```

cd frontend

Option 2: Using Nginx:

```nginx``````

server {

    listen 8080;

    root /path/to/Smart-Quizzer-AI/frontend/build;

    index index.html;### Step 2: Install Node Dependencies**macOS/Linux:**# Navigate to backend directory



    location / {

        try_files $uri $uri/ /index.html;

    }```bash**Generate secure keys** (Python):

}

```npm install



### Docker Deployment (Recommended)``````python```bashcd backend



Use the provided `docker-compose.yml`:



```bash**Installation Time**: 1-3 minutes (downloads ~200MB)import secrets

docker-compose up --build

```



This automatically:**Key Packages Installed:**print("SECRET_KEY:", secrets.token_hex(32))cd backend

- Builds backend and frontend Docker images

- Sets up PostgreSQL database

- Configures networking between containers

- Exposes ports 80 (frontend) and 5000 (backend)| Package | Version | Purpose |print("JWT_SECRET_KEY:", secrets.token_hex(32))



---|---------|---------|---------|



## Troubleshooting| React | 18.2.0 | UI framework |```python3 -m venv venv# Install Python dependencies



### Common Issue #1: "GOOGLE_API_KEY not found"| TypeScript | 4.9.5 | Type safety |



**Problem**: Backend fails to start with error about missing API key.| React Router | 6.4.0+ | Client-side routing |



**Solution**:| Axios | 1.5.0+ | HTTP client |

1. Ensure `.env` file exists in `backend/` directory

2. Verify `GOOGLE_API_KEY` is set in `.env`| Tailwind CSS | 3.3.0 | Styling framework |---source venv/bin/activatepip install -r requirements.txt

3. Get a free API key from https://aistudio.google.com/app/apikey

4. Restart the backend server| Socket.IO Client | 4.8.1 | WebSocket client |



### Common Issue #2: "Module not found" errors



**Problem**: Python import errors when starting backend.**Expected Output:**



**Solution**:```## Frontend Setup```

1. Ensure virtual environment is activated: `source venv/bin/activate`

2. Reinstall dependencies: `pip install -r requirements.txt`added 1500 packages in 45s

3. Check Python version: `python --version` (should be 3.9+)

```

### Common Issue #3: Port already in use



**Problem**: Error message "Address already in use" for port 5000 or 8080.

### Step 3: Configure API Endpoint (Optional)### Step 1: Navigate to Frontend Directory# Create .env file from template

**Solution**:



**Find and kill process using port 5000**:

The frontend is pre-configured to connect to `http://localhost:5000`.

**Windows**:

```powershell

netstat -ano | findstr :5000

taskkill /PID <PID> /F**To change the backend URL**, edit `frontend/src/lib/api.ts`:```bash#### 2.2 Install Python Dependenciescp .env.example .env

```



**Mac/Linux**:

```bash```typescriptcd frontend

lsof -ti:5000 | xargs kill -9

```const API_BASE_URL = 'http://localhost:5000';  // Change if needed



**Or change the port** in `backend/app.py`:``````# On Windows: copy .env.example .env

```python

if __name__ == '__main__':

    socketio.run(app, host='0.0.0.0', port=5001, debug=True)

```Or create `frontend/.env`:



### Common Issue #4: Database initialization errors



**Problem**: "OperationalError: no such table" or database-related errors.```env### Step 2: Install Node Dependencies```bash



**Solution**:REACT_APP_API_URL=http://localhost:5000

1. Delete existing database: `rm -f instance/smart_quizzer.db`

2. Restart backend server: `python app.py`PORT=8080

3. Database tables will be recreated automatically

```

### Common Issue #5: Frontend compilation errors

```bashpip install -r requirements.txt# Edit .env and add your GEMINI_API_KEY

**Problem**: TypeScript or build errors when running `npm start`.

### Step 4: Start Development Server

**Solution**:

1. Delete `node_modules/` and `package-lock.json`npm install

2. Reinstall dependencies: `npm install`

3. Clear cache: `npm cache clean --force````bash

4. Restart development server: `npm start`

npm start``````# Get one from: https://makersuite.google.com/app/apikey

### Common Issue #6: CORS errors

```

**Problem**: Browser console shows "CORS policy" errors.



**Solution**:

1. Verify `REACT_APP_API_URL` in frontend `.env` matches backend URL**Expected Output:**

2. Ensure backend CORS is configured for frontend origin

3. Check backend `app.py` CORS settings:```**Expected packages** (automatically installed):```

   ```python

   CORS(app, resources={r"/api/*": {"origins": ["http://localhost:8080"]}})Compiled successfully!

   ```

- react@18.2.0

### Common Issue #7: WebSocket connection fails

You can now view smart-quizzer-frontend in the browser.

**Problem**: Real-time features (multiplayer) not working.

- react-dom@18.2.0**Expected output:**

**Solution**:

1. Ensure `flask-socketio` is installed: `pip install flask-socketio`  Local:            http://localhost:8080

2. Check that Socket.IO client is connected:

   - Open browser console  On Your Network:  http://192.168.1.100:8080- react-router-dom@6.28.0

   - Look for "Connected to Socket.IO" message

3. Verify no firewall blocking WebSocket connections



---Note that the development build is not optimized.- axios@1.7.9```**Minimum required in backend/.env:**



## Advanced ConfigurationTo create a production build, use npm run build.



### Custom Similarity Threshold```- typescript@4.9.5



To adjust answer evaluation strictness, modify `backend/.env`:



```---- tailwindcss@3.4.17Successfully installed flask-3.0.0 flask-cors-4.0.0 flask-sqlalchemy-3.1.1 ```env

SIMILARITY_THRESHOLD=0.80  # Stricter (80% similarity required)

# or

SIMILARITY_THRESHOLD=0.70  # More lenient (70% similarity required)

```## 🗄️ Database Initialization



Default: `0.75` (75% similarity)



### Custom Quiz Topics### Automatic Initialization**Installation time**: 1-3 minutes (downloads ~200MB)flask-jwt-extended-4.6.0 flask-socketio-5.3.6 python-socketio-5.11.0 GEMINI_API_KEY=your-actual-gemini-api-key-here



Add new topics by editing `backend/app.py` in the `initialize_default_data()` function:



```pythonThe database is **automatically created** when you first run `python app.py`. No manual setup required!

topics = [

    Topic(name='Python Programming'),

    Topic(name='JavaScript'),

    Topic(name='Data Structures'),### What Gets Created### Step 3: Configure API Endpoint (Optional)bcrypt-4.1.2 requests-2.31.0 google-generativeai-0.8.0 python-dotenv-1.0.1 SECRET_KEY=your-secret-key-for-production

    Topic(name='Algorithms'),

    Topic(name='Machine Learning'),  # Add new topic

    Topic(name='Web Development'),  # Add new topic

]1. **Database File**: `backend/instance/smart_quizzer.db`

```

2. **15 Tables**: User, QuizSession, Question, Topic, Badge, UserBadge, PerformanceTrend, LearningPath, LearningMilestone, MultiplayerRoom, MultiplayerParticipant, QuizLeaderboard, FlaggedQuestion, QuestionFeedback, PasswordResetToken

Restart backend to apply changes.

3. **Default Topics**: 10+ topics (Python, JavaScript, Data Structures, Algorithms, etc.)The frontend is pre-configured to connect to `http://localhost:5000`.sentence-transformers-2.7.0 numpy-1.26.0 PyPDF2-3.0.0 pdfplumber-0.11.0 ```

### Custom Badge Criteria

4. **Achievement Badges**: 21 badges (First Steps, Quiz Master, Perfect Score, etc.)

Modify badge requirements in `backend/app.py`:



```python

badges = [### Manual Reset (If Needed)

    Badge(

        name='Super Achiever',  # Custom badgeTo change the backend URL, edit `frontend/src/lib/api.ts`:python-docx-1.1.0 beautifulsoup4-4.12.0 nltk-3.8.0 textstat-0.7.0 

        description='Complete 100 quizzes',

        criteria_type='quiz_count',To reset the database:

        criteria_value=100,

        points=500,

        rarity='Epic',

        icon='crown'```bash

    ),

]# Stop backend server (Ctrl+C)```typescriptpandas-2.2.0 scikit-learn-1.4.0 werkzeug-3.0.0 transformers-4.38.0 ### 3. Frontend Setup

```



---

# Delete databaseconst API_BASE_URL = 'http://localhost:5000';  // Change if needed

**Setup Guide Version**: 1.0.0  

**Last Updated**: November 2025  rm backend/instance/smart_quizzer.db  # macOS/Linux

**For questions or issues**: https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues

del backend\instance\smart_quizzer.db  # Windows```gunicorn-21.2.0



# Restart backend (auto-creates fresh database)

python app.py

```---``````bash



### Verify Database Creation



```bash## Environment Configuration# Navigate to frontend directory (from project root)

# macOS/Linux

ls -la backend/instance/



# Windows### Backend Environment VariablesIf you see any errors, try:cd frontend

dir backend\instance\



# Should show smart_quizzer.db file

```| Variable | Required | Default | Description |```bash



---|----------|----------|---------|-------------|



## ▶️ Running the Application| `GOOGLE_API_KEY` | ✅ Yes | None | Google Gemini API key for AI features |pip install -r requirements.txt --force-reinstall# Install Node.js dependencies



### Start Both Servers| `SECRET_KEY` | ✅ Yes | None | Flask session encryption key |



You need to run **both backend and frontend** servers simultaneously.| `JWT_SECRET_KEY` | ✅ Yes | None | JWT token signing key |```npm install



**Terminal 1 - Backend:**| `DATABASE_URL` | ❌ No | `sqlite:///instance/smart_quizzer.db` | Database connection string |

```bash

cd backend| `FLASK_ENV` | ❌ No | `production` | Environment mode (`development`/`production`) |

# Activate virtual environment first

# Windows: venv\Scripts\activate| `SIMILARITY_THRESHOLD` | ❌ No | `0.7` | Answer similarity threshold (0.0-1.0) |

# macOS/Linux: source venv/bin/activate

python app.py#### 2.3 Create Environment File# Create .env file

```

### Frontend Environment Variables

**Terminal 2 - Frontend:**

```bashecho "REACT_APP_API_URL=http://localhost:5000" > .env

cd frontend

npm startThe frontend uses hardcoded values. For production, create `frontend/.env`:

```

Create a `.env` file in the `backend/` directory:# On Windows: echo REACT_APP_API_URL=http://localhost:5000 > .env

### Access the Application

```env

1. **Frontend (User Interface)**: http://localhost:8080

2. **Backend API**: http://localhost:5000REACT_APP_API_URL=http://localhost:5000```

3. **API Health Check**: http://localhost:5000/api/health

```

### Create Your First Account

```bash

1. Navigate to http://localhost:8080/register

2. Fill in the registration form:Then update `frontend/src/lib/api.ts`:

   - **Username**: Unique, 3-80 characters

   - **Email**: Valid email format```typescript# Create .env file### 4. Initialize Database

   - **Full Name**: Your name

   - **Password**: Min 8 characters (uppercase, lowercase, digit, special char)const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

   - **Skill Level**: Beginner, Intermediate, or Advanced

3. Click "Create Account"```touch .env  # macOS/Linux

4. You'll be automatically logged in



### Stopping the Application

---# OR```bash

**Backend:**

- Press `Ctrl+C` in backend terminal



**Frontend:**## Database Initializationtype nul > .env  # Windows# From project root directory

- Press `Ctrl+C` in frontend terminal



---

### Automatic Initialization (Recommended)```python init_database.py

## 🔐 Environment Variables



### Backend Environment Variables

The database is created automatically when you first run the backend:

| Variable | Required | Default | Description |

|----------|----------|---------|-------------|

| `GOOGLE_API_KEY` | **Yes** | None | Google Gemini AI API key |

| `SECRET_KEY` | **Yes** | None | Flask secret key for sessions |```bashAdd the following content to `.env`:# This creates:

| `JWT_SECRET_KEY` | **Yes** | None | Secret key for JWT token signing |

| `DATABASE_URL` | No | `sqlite:///instance/smart_quizzer.db` | Database connection string |cd backend

| `FLASK_ENV` | No | `development` | Flask environment (development/production) |

| `FLASK_DEBUG` | No | `True` | Enable/disable debug mode |python app.py# - 5 Admin accounts

| `UPLOAD_FOLDER` | No | `uploads` | Directory for uploaded files |

| `MAX_CONTENT_LENGTH` | No | `10485760` | Max upload size (10MB) |```



### Frontend Environment Variables```env# - 15 User accounts



| Variable | Required | Default | Description |**What happens**:

|----------|----------|---------|-------------|

| `REACT_APP_API_URL` | No | `http://localhost:5000` | Backend API base URL |1. Creates `backend/instance/` directory# Google Gemini AI API Key (REQUIRED)# - Topics for quizzes

| `PORT` | No | `8080` | Frontend development server port |

2. Creates `smart_quizzer.db` SQLite database

### Generating Secure Keys

3. Initializes 15 tables (User, QuizSession, Question, Badge, etc.)GOOGLE_API_KEY=your_gemini_api_key_here```

```bash

# Generate SECRET_KEY4. Inserts default topics (Python, JavaScript, Data Structures, etc.)

python -c "import secrets; print(secrets.token_hex(32))"

5. Inserts 21 achievement badges

# Generate JWT_SECRET_KEY  

python -c "import secrets; print(secrets.token_hex(32))"

```

**Expected output**:# Flask Secret Keys (generate random strings)### 5. Populate Sample Data (Optional but Recommended)

---

```

## 🚀 Production Deployment

Database initialized successfully!SECRET_KEY=your_secret_key_here

### Building for Production

Created 15 tables

#### Backend (Using Gunicorn)

Inserted 10 default topicsJWT_SECRET_KEY=your_jwt_secret_key_here```bash

```bash

# Install GunicornCreated 21 badges

pip install gunicorn

 * Running on http://127.0.0.1:5000# From project root directory

# Run with Gunicorn (4 workers)

cd backend```

gunicorn -w 4 -b 0.0.0.0:5000 --worker-class eventlet app:app

```# Database Configurationpython populate_quiz_data.py



#### Frontend (Static Build)### Manual Database Initialization



```bashSQLALCHEMY_DATABASE_URI=sqlite:///instance/smart_quizzer.db

# Create optimized production build

cd frontendIf you need to reset or manually initialize:

npm run build

SQLALCHEMY_TRACK_MODIFICATIONS=False# This adds:

# Output: build/ directory with optimized static files

# Serve with Nginx, Apache, or any static file server```bash

```

cd backend# - 185 quiz sessions

### Production Environment Variables

python -c "from app import app, db; app.app_context().push(); db.create_all(); print('Database created')"

**backend/.env (Production):**

```env```# Flask Environment# - 1,119 sample questions

FLASK_ENV=production

FLASK_DEBUG=False

DATABASE_URL=postgresql://user:password@localhost/smart_quizzer

SECRET_KEY=<strong-random-key>### Database LocationFLASK_ENV=development# - Realistic user quiz history

JWT_SECRET_KEY=<strong-random-key>

GOOGLE_API_KEY=<your-api-key>

```

Default: `backend/instance/smart_quizzer.db`FLASK_DEBUG=True```

### Database Migration (PostgreSQL)



For production, migrate from SQLite to PostgreSQL:

To view/edit database (optional):

```bash

# Install PostgreSQL adapter- Download: https://sqlitebrowser.org/

pip install psycopg2-binary

- Open: `backend/instance/smart_quizzer.db`# Application Settings---

# Create database

createdb smart_quizzer



# Update .env---UPLOAD_FOLDER=uploads

DATABASE_URL=postgresql://username:password@localhost/smart_quizzer



# Restart backend (auto-creates tables)

python app.py## Running the ApplicationMAX_CONTENT_LENGTH=10485760  # 10MB max file size## ▶️ Running the Application

```



### Docker Deployment

### Development Mode

```bash

# Build and run with Docker Compose

docker-compose up --build

**Terminal 1: Backend**# Optional: Email Configuration (for password reset)You need to run both backend and frontend servers simultaneously.

# Access application

# Frontend: http://localhost:8080```bash

# Backend: http://localhost:5000

```cd backendSMTP_SERVER=smtp.gmail.com



---# Activate virtual environment first (see Backend Setup Step 2)



## 🐛 Troubleshootingpython app.pySMTP_PORT=587### Start Backend Server



### Common Issues```



#### Issue 1: "GOOGLE_API_KEY not found"SMTP_USERNAME=your_email@gmail.com



**Symptom:**Expected output:

```

Error: GOOGLE_API_KEY not configured in environment variables```SMTP_PASSWORD=your_app_password```bash

```

 * Running on http://127.0.0.1:5000

**Solution:**

1. Create `.env` file in `backend/` directory * Debug mode: on```# Terminal 1 - Backend

2. Add: `GOOGLE_API_KEY=your_api_key_here`

3. Get API key from https://ai.google.dev/```

4. Restart backend server

cd backend

---

**Terminal 2: Frontend**

#### Issue 2: "Module not found" errors

```bash**Generate secure keys:**python app.py

**Symptom:**

```cd frontend

ModuleNotFoundError: No module named 'flask'

```npm start



**Solution:**```

```bash

# Activate virtual environment```python# Server will start on http://localhost:5000

cd backend

# Windows: venv\Scripts\activateExpected output:

# macOS/Linux: source venv/bin/activate

```# Run this in Python shell to generate random keys```

# Reinstall dependencies

pip install -r requirements.txt --force-reinstallCompiled successfully!

```

Local:            http://localhost:8080import secrets

---

```

#### Issue 3: Port already in use

print(secrets.token_hex(32))  # Use output for SECRET_KEY### Start Frontend Server

**Symptom:**

```### Access the Application

OSError: [Errno 48] Address already in use

```print(secrets.token_hex(32))  # Use output for JWT_SECRET_KEY



**Solution:**1. **Frontend**: http://localhost:8080



**Windows (PowerShell):**2. **Backend API**: http://localhost:5000``````bash

```bash

# Find process using port 50003. **API Documentation**: http://localhost:5000/api/docs (if enabled)

netstat -ano | findstr :5000

# Terminal 2 - Frontend (new terminal window)

# Kill process (replace <PID> with actual number)

taskkill /PID <PID> /F### First-Time Usage

```

### Step 3: Frontend Setupcd frontend

**macOS/Linux:**

```bash1. Navigate to http://localhost:8080

# Find and kill process using port 5000

lsof -ti:5000 | xargs kill -92. Click "Register" → Create account with email/passwordnpm start

```

3. Select skill level (Beginner/Intermediate/Advanced)

**Or change port** in `backend/app.py`:

```python4. Dashboard opens → Start taking quizzes!Open a **new terminal window** (keep backend terminal active).

if __name__ == '__main__':

    socketio.run(app, host='0.0.0.0', port=5001, debug=True)  # Changed to 5001

```

**Default Admin Account** (if pre-seeded):# Application will open at http://localhost:3000

---

- Username: `admin@smartquizzer.com`

#### Issue 4: Database initialization errors

- Password: `admin123````bash```

**Symptom:**

```- **⚠️ Change password immediately in production**

sqlalchemy.exc.OperationalError: no such table: user

```# Navigate to frontend directory



**Solution:**---

```bash

# Delete database and restartcd frontend---

rm backend/instance/smart_quizzer.db  # macOS/Linux

del backend\instance\smart_quizzer.db  # Windows## Production Deployment



# Restart backend

python app.py

```### Backend Deployment



---# Install Node.js dependencies## 🐳 Docker Setup (Alternative)



#### Issue 5: Frontend compilation errors**Option 1: Gunicorn (Recommended)**



**Symptom:**npm install

```

Module build failed: Error: Cannot find module 'react'Install Gunicorn:

```

```bash```If you prefer using Docker:

**Solution:**

```bashpip install gunicorn eventlet

cd frontend

```

# Clear cache and reinstall

rm -rf node_modules package-lock.json  # macOS/Linux

rmdir /s node_modules && del package-lock.json  # Windows

Run with multiple workers:**Expected output:**```bash

npm cache clean --force

npm install```bash

npm start

```gunicorn -w 4 -b 0.0.0.0:5000 --worker-class eventlet app:app```# Build and run with Docker Compose



---```



#### Issue 6: CORS errors in browser consoleadded 1500 packages, and audited 1501 packages in 45sdocker-compose up --build



**Symptom:****Option 2: Docker**

```

Access to XMLHttpRequest blocked by CORS policyfound 0 vulnerabilities

```

Create `backend/Dockerfile`:

**Solution:**

```dockerfile```# Access application at http://localhost:3000

CORS is already configured in `backend/app.py`. If issues persist:

1. Ensure backend is running on port 5000FROM python:3.13-slim

2. Check frontend environment variables

3. Clear browser cache (Ctrl+Shift+Delete)WORKDIR /app# Backend API at http://localhost:5000

4. Restart both servers

COPY requirements.txt .

---

RUN pip install -r requirements.txtIf you encounter errors:```

#### Issue 7: WebSocket connection fails

COPY . .

**Symptom:**

```CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "--worker-class", "eventlet", "app:app"]```bash

WebSocket connection to 'ws://localhost:5000/socket.io/' failed

``````



**Solution:**# Clear cache and reinstall---

1. Check Flask-SocketIO installation:

   ```bashBuild and run:

   pip install flask-socketio==5.3.6 python-socketio==5.11.0

   ``````bashrm -rf node_modules package-lock.json  # macOS/Linux

2. Restart backend server

docker build -t smart-quizzer-backend .

---

docker run -p 5000:5000 --env-file .env smart-quizzer-backend# OR## 🌐 Environment Variables Reference

### Verification Steps

```

After setup, verify everything works:

rmdir /s node_modules && del package-lock.json  # Windows

1. **Backend Health Check:**

   ```bash### Frontend Deployment

   curl http://localhost:5000/api/health

   # Expected: {"status": "healthy"}### Backend (.env)

   ```

**Build for Production**

2. **Database Check:**

   ```bash```bashnpm cache clean --force

   # macOS/Linux

   sqlite3 backend/instance/smart_quizzer.db ".tables"cd frontend

   

   # Windowsnpm run buildnpm install```env

   # Download SQLite Browser: https://sqlitebrowser.org/

   ``````



3. **Frontend Access:**```# REQUIRED

   - Open http://localhost:8080 in browser

   - Should see login/register pageOutput: `frontend/build/` directory with optimized static files



4. **API Test:**GEMINI_API_KEY=your-gemini-api-key-here

   ```bash

   # Register a test user**Deploy to Nginx**

   curl -X POST http://localhost:5000/api/auth/register \

     -H "Content-Type: application/json" \```nginx---SECRET_KEY=your-secret-key-minimum-32-characters

     -d '{"username":"testuser","email":"test@example.com","password":"Test@123","full_name":"Test User","skill_level":"Beginner"}'

   ```server {



---    listen 80;



## ⚙️ Advanced Configuration    server_name yourdomain.com;



### Custom Similarity Threshold    root /var/www/smart-quizzer/build;## Configuration# OPTIONAL



Adjust answer matching sensitivity in `backend/.env`:    index index.html;



```envDATABASE_URL=sqlite:///smart_quizzer.db

SIMILARITY_THRESHOLD=0.75  # Default (75% match required)

SIMILARITY_THRESHOLD=0.65  # More lenient (65% match)    location / {

SIMILARITY_THRESHOLD=0.85  # Stricter (85% match)

```        try_files $uri /index.html;### Backend ConfigurationDEBUG=False



### Custom Topics    }



Add topics programmatically:FLASK_ENV=production



```python    location /api {

from app import app, db

from models import Topic        proxy_pass http://localhost:5000;#### Database Configuration



with app.app_context():        proxy_set_header Host $host;

    new_topic = Topic(

        name='Machine Learning',        proxy_set_header X-Real-IP $remote_addr;# EMAIL (for password reset - optional)

        description='ML fundamentals',

        category='Technology'    }

    )

    db.session.add(new_topic)}The application uses SQLite by default. No additional configuration needed.SMTP_SERVER=smtp.gmail.com

    db.session.commit()

``````



### Custom BadgesSMTP_PORT=587



Create custom achievement badges:**Deploy to Vercel/Netlify**



```python1. Push code to GitHub**To use PostgreSQL (Production):**SMTP_USERNAME=your-email@gmail.com

from app import app, db

from models import Badge2. Connect repository to Vercel/Netlify



with app.app_context():3. Set build command: `npm run build`SMTP_PASSWORD=your-app-password

    badge = Badge(

        name='Custom Badge',4. Set publish directory: `build`

        description='Custom achievement',

        icon='trophy',5. Add environment variable: `REACT_APP_API_URL=https://api.yourdomain.com`1. Install PostgreSQL:FROM_EMAIL=your-email@gmail.com

        criteria_type='quiz_count',

        criteria_value=100,

        points=500,

        rarity='Epic'### Database for Production   ```bashFRONTEND_URL=http://localhost:3000

    )

    db.session.add(badge)

    db.session.commit()

```**PostgreSQL (Recommended)**   pip install psycopg2-binary```



### Enable Email Notifications



Add to `backend/.env`:1. Install PostgreSQL   ```



```env2. Create database: `createdb smart_quizzer`

SMTP_SERVER=smtp.gmail.com

SMTP_PORT=5873. Update `.env`:### Frontend (.env)

SMTP_USE_TLS=True

SMTP_USERNAME=your_email@gmail.com   ```env

SMTP_PASSWORD=your_app_password

FROM_EMAIL=your_email@gmail.com   DATABASE_URL=postgresql://username:password@localhost/smart_quizzer2. Update `.env`:

```

   ```

---

4. Install adapter: `pip install psycopg2-binary`   ```env```env

## 📊 System Requirements



### Minimum Requirements

- **CPU**: 2 cores**MySQL**   SQLALCHEMY_DATABASE_URI=postgresql://username:password@localhost:5432/smart_quizzer# REQUIRED

- **RAM**: 4 GB

- **Disk**: 2 GB free space

- **Internet**: Required for AI features

- **Ports**: 5000 (backend), 8080 (frontend)Update `.env`:   ```REACT_APP_API_URL=http://localhost:5000



### Recommended Requirements```env

- **CPU**: 4+ cores

- **RAM**: 8+ GBDATABASE_URL=mysql://username:password@localhost/smart_quizzer

- **Disk**: 10 GB free space (for ML models cache)

- **Internet**: 10+ Mbps for smooth AI operations```



### Browser CompatibilityInstall adapter: `pip install PyMySQL`#### NLTK Data Download# OPTIONAL

- Chrome 90+

- Firefox 88+

- Safari 14+

- Edge 90+---PORT=3000



---



## 📞 Getting Help## TroubleshootingDownload required NLTK data (first-time only):```



### Documentation

- **README.md** - Project overview and features

- **PROJECT_DOCUMENTATION.md** - Technical architecture and API reference### Backend Issues

- **This file (SETUP.md)** - Setup and troubleshooting



### Support Channels

- **GitHub Issues**: https://github.com/BatchuMamatha/Smart-Quizzer-AI/issues**Problem**: `ModuleNotFoundError: No module named 'flask'`  ```python---

- **Email**: Check repository for contact information

**Solution**:

### Logs Location

- **Backend Logs**: `backend/smart_quizzer_errors.log````bash# Run this in Python shell or create download_nltk.py

- **Browser Console**: F12 → Console tab

- **Terminal Output**: Check both backend and frontend terminals# Ensure virtual environment is activated



---pip install -r requirements.txt --force-reinstallimport nltk## 📦 Project Structure



## ✅ Next Steps```



After successful setup:nltk.download('punkt')



1. ✅ **Explore the Dashboard**: Navigate around the interface**Problem**: `GOOGLE_API_KEY not found in environment`  

2. ✅ **Take Your First Quiz**: Try the Custom Content Upload feature

3. ✅ **Check Analytics**: View your performance trends**Solution**:nltk.download('stopwords')```

4. ✅ **Earn Badges**: Complete quizzes to unlock achievements

5. ✅ **Join Leaderboard**: Compete with other users1. Check `.env` file exists in `backend/` directory

6. ✅ **Read Technical Docs**: Check [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)

2. Verify `.env` contains `GOOGLE_API_KEY=your_key`nltk.download('wordnet')Smart-Quizzer-AI/

---

3. Restart backend after editing `.env`

**Setup Guide Version**: 1.0.0  

**Last Updated**: November 2025  ```├── backend/                    # Flask backend

**Tested On**: Windows 11, macOS 14, Ubuntu 22.04  

**Status**: Production Ready**Problem**: `Address already in use (Port 5000)`  


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
