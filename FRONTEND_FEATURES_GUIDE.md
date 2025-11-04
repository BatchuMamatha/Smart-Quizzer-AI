# Smart Quizzer AI - Frontend Features Guide

## Overview

This document maps all implemented frontend features to their respective components and pages, helping you understand where to access each feature in the web application.

---

## 📍 Navigation Map

### Main Routes Available:

| Route | Page | Purpose |
|-------|------|---------|
| `/dashboard` | Dashboard | Main quiz creation hub |
| `/quiz` | Quiz | Quiz taking interface |
| `/results` | Results | Quiz results and performance |
| `/history` | History | Past quiz attempts |
| `/analytics` | Analytics | Basic performance stats |
| `/analytics-dashboard` | AnalyticsDashboard | **Complete analytics with all visualizations** |
| `/leaderboard` | Leaderboard | Global rankings |
| `/content-upload` | ContentUploadPage | Upload study materials |
| `/profile` | ProfilePage | User profile management |
| `/admin` | AdminDashboard | Admin panel (admin-only) |

---

## 🎨 Components Explained & Where to Find Them

### 1. **BadgeShowcase.tsx** & **BadgeProgress.tsx**
**What it does:** Displays user achievement badges and progress toward badge completion

**Where to access:**
- ✅ **`/analytics-dashboard`** → Click **"🏆 Badges"** tab
  - **BadgeShowcase**: Shows all earned badges with descriptions
  - **BadgeProgress**: Shows progress toward completing next badges

**What to look for:**
- Visual cards with badge icons (🎖️, 🏅, ⭐)
- Completion percentage for in-progress badges
- Badge names like "Quiz Starter", "Perfect Score", "Streak Master"

---

### 2. **PerformanceChart.tsx**
**What it does:** Displays quiz score trends over time (30-day chart)

**Where to access:**
- ✅ **`/analytics-dashboard`** → Click **"📊 Overview"** tab → **"Performance Trends"** section
- Also available on **`/analytics`** page (basic version)

**What to look for:**
- Line chart showing score progression
- X-axis: days/dates
- Y-axis: percentage scores (0-100%)
- Smooth trend line showing improvement/decline

---

### 3. **TopicHeatmap.tsx**
**What it does:** Visual heatmap showing your proficiency across different topics

**Where to access:**
- ✅ **`/analytics-dashboard`** → Click **"📚 Topic Mastery"** tab

**What to look for:**
- Color-coded grid where:
  - 🟩 **Green** = High proficiency
  - 🟨 **Yellow** = Medium proficiency
  - 🟥 **Red** = Low proficiency (needs improvement)
- Topic names on left side
- Tooltip showing exact proficiency percentage when hovering

---

### 4. **WeeklyReport.tsx**
**What it does:** Summarizes your quiz activity and performance for the past week

**Where to access:**
- ✅ **`/analytics-dashboard`** → Click **"📊 Overview"** tab → **"Weekly Report"** section

**What to look for:**
- Summary cards with:
  - 📝 Quizzes taken this week
  - 🎯 Average score
  - ⏱️ Time spent
  - 🔝 Best topic
  - 📉 Topics needing work

---

### 5. **RecommendationCard.tsx**
**What it does:** AI-powered learning recommendations based on your weak areas

**Where to access:**
- ✅ **`/analytics-dashboard`** → Click **"🤖 AI Insights"** tab

**What to look for:**
- Personalized cards suggesting which topics to focus on
- Reason for recommendation (e.g., "Low performance in...")
- "Start Quiz" button to begin a quiz on that topic
- Priority indicators (High/Medium/Low)

---

### 6. **ContentUpload.tsx** Component
**What it does:** File/content upload interface for creating custom quizzes

**Where to access:**
- ✅ **`/content-upload`** page (dedicated page)
- Also inline on **`/dashboard`** (alternative quiz creation method)

**What to look for:**
- File upload dropzone
- Multiple format support: PDF, DOCX, TXT
- Alternative: Paste URL or text directly
- "Generate Quiz" button after content is uploaded

---

## 📊 Feature-by-Feature Access Guide

### **Achievement/Badges System**
```
Dashboard Home → (after taking quizzes) → Analytics Dashboard → 🏆 Badges Tab
                                         ↓
                                  View earned badges
                                  See progress toward next badges
```

### **Performance Analytics**
```
Dashboard → Analytics Dashboard → 📊 Overview Tab
                              ↓
                        • Weekly Report (this week's activity)
                        • Performance Chart (30-day trend)
                        • Badge Progress (badges earned)
```

### **Topic Mastery Tracking**
```
Dashboard → Analytics Dashboard → 📚 Topic Mastery Tab
                              ↓
                        Visual heatmap showing proficiency
                        by topic (color-coded)
```

### **AI-Powered Learning Paths**
```
Dashboard → Analytics Dashboard → 🤖 AI Insights Tab
                              ↓
                        Personalized recommendations
                        Based on weak areas & performance
```

### **Custom Content Quiz**
```
Dashboard → Content Upload → Upload PDF/DOCX/URL/Text
                        ↓
                    Generate Quiz
                        ↓
                    Take Quiz → Review Results
```

### **Quiz History**
```
Dashboard → History Page
                ↓
         View all past quiz attempts
         Filter by topic/date
         Retake quizzes
```

### **Global Leaderboard**
```
Dashboard → Leaderboard Page
                ↓
         Compare scores with other users
         Weekly/Monthly/All-time rankings
```

### **User Profile Management**
```
Header (Top Right) → Profile Button → Profile Page
                                   ↓
                            Edit profile information
                            Change skill level
                            View account stats
```

---

## 🎯 How to Navigate the Website

### **After Login, You'll See:**

1. **Header Bar** (Top)
   - App logo & title: "🧠 Smart Quizzer"
   - Welcome message with your name
   - **Profile** button (🧑‍💼) → Goes to `/profile`
   - **Logout** button

2. **Dashboard** (Main Page at `/dashboard`)
   - Quiz creation form (select topic, difficulty, number of questions)
   - Alternative: Upload custom content for quizzes
   - Quick start buttons for preset topics

3. **Left Sidebar / Navigation** (if available)
   - Dashboard
   - Analytics Dashboard
   - Quiz History
   - Leaderboard
   - Content Upload
   - Profile
   - Admin (if admin user)

### **How to Access Each Feature:**

#### **🏆 See Your Badges**
1. Click **"Analytics Dashboard"** in navigation
2. Click the **"🏆 Badges"** tab
3. See all badges earned and progress toward new ones

#### **📊 View Performance Trends**
1. Click **"Analytics Dashboard"**
2. Click **"📊 Overview"** tab
3. Scroll to see:
   - **Weekly Report** (this week's summary)
   - **Performance Trends** (30-day chart)
   - **Badge Progress** (badge progress bars)

#### **📚 Check Topic Proficiency**
1. Click **"Analytics Dashboard"**
2. Click **"📚 Topic Mastery"** tab
3. See color-coded heatmap:
   - 🟩 Green = Strong
   - 🟨 Yellow = Average
   - 🟥 Red = Weak

#### **🤖 Get AI Recommendations**
1. Click **"Analytics Dashboard"**
2. Click **"🤖 AI Insights"** tab
3. See personalized recommendations for topics to study
4. Click any recommendation to start a quiz on that topic

#### **📝 Create Quiz from Custom Content**
1. Click **"Content Upload"**
2. Upload file (PDF/DOCX) OR paste URL OR paste text
3. Click **"Generate Quiz"**
4. Start taking the quiz

#### **📋 Review Past Quizzes**
1. Click **"Quiz History"** or **"History"**
2. See list of all past quiz attempts
3. Click any quiz to see detailed results
4. Option to retake or review answers

#### **🏅 Check Global Rankings**
1. Click **"Leaderboard"**
2. See rankings:
   - Weekly leaders
   - Monthly leaders
   - All-time leaders
3. Find your position on the leaderboard

---

## 🔧 Component Details

### **Components Location:** `frontend/src/components/`

| Component | File | Used In | Purpose |
|-----------|------|---------|---------|
| BadgeShowcase | `BadgeShowcase.tsx` | AnalyticsDashboard | Show all earned badges |
| BadgeProgress | `BadgeProgress.tsx` | AnalyticsDashboard | Show badge completion progress |
| PerformanceChart | `PerformanceChart.tsx` | AnalyticsDashboard, Analytics | Plot 30-day score trend |
| TopicHeatmap | `TopicHeatmap.tsx` | AnalyticsDashboard | Color-coded topic proficiency |
| WeeklyReport | `WeeklyReport.tsx` | AnalyticsDashboard | Weekly activity summary |
| RecommendationCard | `RecommendationCard.tsx` | AnalyticsDashboard | AI learning recommendations |
| ContentUpload | `ContentUpload.tsx` | ContentUploadPage | File upload interface |
| Header | `Header.tsx` | All pages | Top navigation bar |

---

## 📱 Page Details

### **Pages Location:** `frontend/src/pages/`

| Page | Route | Components Used | Features |
|------|-------|-----------------|----------|
| Dashboard | `/dashboard` | Header | Quiz creation, topic selection |
| Quiz | `/quiz` | Header | Question display, answer input |
| Results | `/results` | Header | Quiz score, explanation review |
| History | `/history` | Header | Past quiz list, retake options |
| Analytics | `/analytics` | Header | Basic stats, performance overview |
| **AnalyticsDashboard** | `/analytics-dashboard` | Header, **BadgeShowcase, BadgeProgress, PerformanceChart, TopicHeatmap, WeeklyReport, RecommendationCard** | **⭐ MAIN ANALYTICS HUB** |
| Leaderboard | `/leaderboard` | Header | Global rankings, score comparison |
| ProfilePage | `/profile` | Header | Edit profile, view account info |
| ContentUploadPage | `/content-upload` | Header, ContentUpload | Upload custom study materials |
| AdminDashboard | `/admin` | Header | Admin controls (admin-only) |

---

## ✅ Implementation Checklist

### **Frontend Components - FULLY IMPLEMENTED:**
- ✅ BadgeShowcase.tsx - Badge display
- ✅ BadgeProgress.tsx - Progress toward badges
- ✅ PerformanceChart.tsx - Score trend visualization
- ✅ TopicHeatmap.tsx - Topic proficiency heatmap
- ✅ WeeklyReport.tsx - Weekly activity summary
- ✅ RecommendationCard.tsx - AI learning recommendations
- ✅ ContentUpload.tsx - Custom content upload
- ✅ Header.tsx - Navigation header

### **Pages - FULLY IMPLEMENTED:**
- ✅ Dashboard - Quiz creation hub
- ✅ Quiz - Quiz interface
- ✅ Results - Results display
- ✅ History - Quiz history
- ✅ Analytics - Basic analytics
- ✅ **AnalyticsDashboard** - Full analytics dashboard with all visualizations
- ✅ Leaderboard - Global rankings
- ✅ ProfilePage - User profile
- ✅ ContentUploadPage - Content upload
- ✅ AdminDashboard - Admin panel

---

## 🎓 Quick Start for Users

1. **Register/Login** → Create account or sign in
2. **Take a Quiz** → Go to Dashboard, select topic, start quiz
3. **View Results** → See score and explanations
4. **Check Analytics** → Go to Analytics Dashboard to see all visualizations
5. **Upload Content** → Create custom quizzes from PDFs/URLs
6. **Track Progress** → Monitor badges, performance, and topic mastery
7. **Get Recommendations** → AI suggests topics to focus on
8. **Compete** → Check leaderboard rankings

---

## 🚀 Technical Stack

- **Frontend Framework:** React 18.2.0
- **Language:** TypeScript 4.8
- **Styling:** Tailwind CSS 3.3.0
- **Routing:** React Router 6.4.0
- **HTTP Client:** Axios 1.5.0
- **Real-time:** Socket.IO 4.8.1
- **Charts:** Recharts (for PerformanceChart)
- **State Management:** React Hooks (useState, useEffect, useCallback)

---

## 📝 Notes

- All features are **fully implemented** in the frontend
- The **AnalyticsDashboard** page at `/analytics-dashboard` is the **main hub for all analytics features**
- Components are **reusable** and follow React best practices
- Real-time data fetching uses the **API layer** (`lib/api.ts`)
- Routing uses React Router with private/admin route guards
- Responsive design works on desktop, tablet, and mobile

---

## 🔗 Related Documentation

- See `PROJECT_DOCUMENTATION.md` for backend API details
- See `SETUP.md` for installation and configuration
- See `README.md` for project overview

