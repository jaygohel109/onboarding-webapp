# Zealthy - Custom Onboarding Flow

## Overview

This project is a full-stack implementation of a **Custom Onboarding Flow** that allows admins to configure user onboarding steps dynamically. The onboarding process is structured like a wizard with three steps. The second and third steps can be customized via an admin panel. Additionally, user data is stored in a database and displayed in a table for testing.

## Features

✅ **User Onboarding Flow** - A three-step process to collect user details.  
✅ **Dynamic Admin Configuration** - Admins can control which fields appear on step 2 and step 3.  
✅ **Data Persistence** - User data is stored in a backend database.  
✅ **Data Table** - Displays all stored user information in a structured table.  
✅ **Responsive UI** - Designed for a clean and modern user experience.  

## Tech Stack

### Frontend:
- React.js (with Hooks & Context API)
- React Router
- Styled Components / Custom CSS

### Backend:
- FastAPI (Python-based backend framework)
- MongoDB (for persistent storage)
- CORS & Middleware for security

### Deployment:
- Frontend hosted on **[https://onboard-flow.netlify.app/]**
- Backend hosted on **[https://onboarding-webapp-production.up.railway.app]**
- MongoDB hosted on **[MongoDB Atlas]**

## Installation & Setup

### Clone the repository:
```bash
git clone [YOUR_REPO_URL]
cd zealthy-onboarding
cd backend
```

### Backend Setup:

#### Install dependencies:
```bash
pip install -r requirements.txt
```

#### Start the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup:

#### Navigate to the frontend folder:
```bash
cd frontend
```

#### Install dependencies:
```bash
npm install
```

#### Start the React app:
```bash
npm start
```

## Project Structure

```
zealthy-onboarding/
│── backend/
│   ├── main.py (FastAPI backend)
│   ├── models.py (MongoDB models)
│   ├── routes.py (API endpoints)
│   └── database.py (DB connection)
│
│── client/
│   ├── src/
│   │   ├── components/ (Reusable UI components)
│   │   ├── pages/ (Onboarding, Admin, and Data pages)
│   │   ├── CSS/ (CSS for all pages)
│   │   ├── api.js (API communication)
│   │   ├── App.js (Main application entry)
│   │   ├── index.js (React entry point)
│   │   └── styles/ (Custom CSS files)
│
│── README.md
│── package.json (Frontend dependencies)
│── requirements.txt (Backend dependencies)
```

## API Endpoints

### User Onboarding
- `POST /users` → Register new user
- `POST /onboarding/step2` → Save user onboarding data
- `GET /data` → Retrieve all user data

### Admin
- `GET /data` → Retrieve onboarding field configuration
- `POST /admin` → Update field visibility for step 2 & 3

## Usage Guide

### **User Onboarding:**
1. **Step 1:** Email & Password
2. **Step 2:** (Customizable - About Me / Address / Birthdate)
3. **Step 3:** (Customizable - Any remaining fields)

*Onboarding progress is tracked to resume from the last step.*

### **Admin Section:**
- Accessible via `/admin` URL
- Allows selecting which fields appear on Step 2 & Step 3

### **Data Table:**
- Accessible via `/data` URL
- Displays all collected user information

## Live Demo & GitHub Repo

- **Live App:** [https://onboard-flow.netlify.app/]  
- **GitHub Repo:** [https://github.com/jaygohel109/onboarding-webapp/edit/main/README.md]  

## Contact

**Jay Gohel**  
[jaygohel109@gmail.com]  
[https://jay-gohel.netlify.app]
