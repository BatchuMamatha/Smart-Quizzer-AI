@echo off
REM ========================================================
REM Smart Quizzer AI - Automated Setup Script (Windows)
REM ========================================================

echo.
echo ========================================================
echo   SMART QUIZZER AI - AUTOMATED SETUP
echo ========================================================
echo.

REM Check Python installation
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from https://www.python.org/
    pause
    exit /b 1
)

echo [1/8] Python detected: 
python --version

REM Check Node.js installation
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [2/8] Node.js detected:
node --version

REM Create backend .env if it doesn't exist
if not exist "backend\.env" (
    echo [3/8] Creating backend\.env from template...
    copy "backend\.env.example" "backend\.env" >nul
    echo     ✓ Created backend\.env
    echo     IMPORTANT: Edit backend\.env and add your GEMINI_API_KEY
) else (
    echo [3/8] backend\.env already exists - skipping
)

REM Create frontend .env if it doesn't exist
if not exist "frontend\.env" (
    echo [4/8] Creating frontend\.env...
    (
        echo REACT_APP_API_URL=http://localhost:5000
    ) > "frontend\.env"
    echo     ✓ Created frontend\.env
) else (
    echo [4/8] frontend\.env already exists - skipping
)

REM Install backend dependencies
echo [5/8] Installing Python dependencies...
cd backend
python -m pip install --upgrade pip >nul 2>&1
pip install -r requirements.txt
if errorlevel 1 (
    echo     [ERROR] Failed to install Python dependencies
    cd ..
    pause
    exit /b 1
)
echo     ✓ Backend dependencies installed
cd ..

REM Install frontend dependencies
echo [6/8] Installing Node.js dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo     [ERROR] Failed to install Node.js dependencies
    cd ..
    pause
    exit /b 1
)
echo     ✓ Frontend dependencies installed
cd ..

REM Initialize database
echo [7/8] Initializing database with sample data...
python init_database.py
if errorlevel 1 (
    echo     [WARNING] Database initialization had issues
) else (
    echo     ✓ Database initialized successfully
)

REM Populate quiz data
echo [8/8] Populating sample quiz data...
python populate_quiz_data.py
if errorlevel 1 (
    echo     [WARNING] Quiz data population had issues
) else (
    echo     ✓ Sample quiz data added
)

echo.
echo ========================================================
echo   SETUP COMPLETE!
echo ========================================================
echo.
echo NEXT STEPS:
echo.
echo 1. Edit backend\.env and add your GEMINI_API_KEY
echo    Get one from: https://makersuite.google.com/app/apikey
echo.
echo 2. Start the backend server:
echo    cd backend
echo    python app.py
echo.
echo 3. In a new terminal, start the frontend:
echo    cd frontend
echo    npm start
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo DEFAULT LOGIN CREDENTIALS:
echo    Admin: username=ravi, password=Admin@123
echo    User:  username=priya, password=User@123
echo.
echo ========================================================
echo.
pause
