# 🔒 SECURITY & ENVIRONMENT SETUP

## ⚠️ IMPORTANT SECURITY NOTICE
This repository does NOT contain sensitive credentials. You must configure them yourself.

## 🔧 Setup Instructions

### 1. Environment Configuration
Copy the example files and fill in your actual values:

```bash
# Copy environment files
cp .env.example .env
cp backend/.env.example backend/.env
```

### 2. Required Credentials

#### Google Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env` and `backend/.env`:
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```

#### Google OAuth2 (for Gmail integration)
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth2 Client ID
3. Add redirect URIs:
   - `http://localhost:5000/api/admin/gmail-callback`
   - `http://localhost:5000/auth/google/callback`
4. Add to both `.env` files:
   ```
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

#### JWT Secret Keys
Generate secure random strings for production:
```bash
# Generate random keys (Linux/Mac)
openssl rand -base64 32

# Or use Python
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

Add to both `.env` files:
```
SECRET_KEY=your-super-secure-random-key
JWT_SECRET_KEY=your-jwt-secret-key
```

### 3. Email Configuration (Optional)
For SMTP email (fallback method):
```
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=your-email@gmail.com
```

**For Gmail**: Use App Password, not regular password
1. Enable 2FA on Gmail
2. Go to Google Account > Security > App passwords  
3. Generate app password for "Smart Quizzer"

## 🚫 Files NEVER to Commit
- `.env` files
- `gmail_token.json`
- Any file with real API keys or credentials
- Database files (`*.db`)

## ✅ Safe to Commit
- `.env.example` files (with placeholder values)
- Source code
- Documentation
- Configuration files (without secrets)

## 🔍 Checking for Sensitive Data
Before committing, check for sensitive information:
```bash
# Check for common sensitive patterns
grep -r "AIzaSy\|GOCSPX\|sk-" . --exclude-dir=node_modules --exclude-dir=.git
```

## 🛡️ Security Best Practices
1. ✅ Use environment variables for all secrets
2. ✅ Never commit `.env` files
3. ✅ Use OAuth2 instead of passwords when possible
4. ✅ Rotate API keys regularly
5. ✅ Use strong, unique secrets for each environment
6. ✅ Review git commits for accidental credential inclusion