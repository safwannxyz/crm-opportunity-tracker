# Mini CRM Opportunity Tracker

A full-stack MERN application for managing sales opportunities.

## Live Demo

- **Frontend:** https://crm-opportunity-tracker-five.vercel.app
- **Backend:** https://crm-backend-xtqc.onrender.com

## Test Credentials

Email: test@live.com
Password: 123456

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, JWT, bcryptjs
- **Frontend:** React.js, Vite, Tailwind CSS, Axios

## Features

- User Registration & Login with JWT Authentication
- Create, View, Update, Delete Opportunities
- Ownership-based Authorization
- Dashboard with opportunity statistics
- Responsive Design

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB Atlas account

### Backend Setup

```bash
cd backend
npm install
npm run dev

Frontend Setup
cd frontend
npm install
npm run dev

Environment Variables
Backend (.env)
text
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d


Frontend (.env)
text
VITE_API_URL=http://localhost:5000


API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get user profile


Opportunities
Method	Endpoint	Description
GET	/api/opportunities	Get all opportunities
POST	/api/opportunities	Create opportunity
PUT	/api/opportunities/:id	Update opportunity
DELETE	/api/opportunities/:id	Delete opportunity


Deployment
Backend: Render
Frontend: Vercel
Database: MongoDB Atlas



Project Structure
text
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md


Known Limitations
No pagination (loads all opportunities)
No search/filter functionality
Basic form validation only



Future Improvements
Add pagination and search
Add email verification
Add activity logs
Add Kanban board view
text
---
```
