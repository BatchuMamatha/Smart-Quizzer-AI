#!/bin/bash

echo "========================================"
echo "Smart Quizzer AI - Quick Setup Script"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed!"
    echo "Please install Python 3.9+ from https://www.python.org/downloads/"
    exit 1
fi

echo "[1/5] Checking Python installation..."
python3 --version
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[2/5] Checking Node.js installation..."
node --version
npm --version
echo ""

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "[3/5] Creating Python virtual environment..."
    python3 -m venv venv
    echo ""
else
    echo "[3/5] Virtual environment already exists."
    echo ""
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "[4/5] Installing Python dependencies..."
cd backend
pip install -r requirements.txt
cd ..
echo ""

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo ""
    echo "========================================"
    echo "WARNING: .env file not found!"
    echo "========================================"
    echo ""
    echo "Please create backend/.env file with your Gemini API key:"
    echo ""
    echo "1. Copy backend/.env.example to backend/.env"
    echo "2. Get API key from: https://makersuite.google.com/app/apikey"
    echo "3. Add your API key to the .env file"
    echo ""
    read -p "Press enter to continue..."
fi

# Install frontend dependencies
echo "[5/5] Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo ""

echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Initialize database (first time only):"
echo "   python3 init_database.py"
echo ""
echo "2. Start backend (in one terminal):"
echo "   cd backend"
echo "   python3 app.py"
echo ""
echo "3. Start frontend (in another terminal):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "========================================"
