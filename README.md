# CRM Opportunity Tracker

A MERN stack application to manage sales opportunities.

## Live Links
- Frontend: https://crm-opportunity-tracker-five.vercel.app
- Backend: https://crm-backend-xtqc.onrender.com

## Test Credentials
Email: test@live.com
Password: 123456

## Tech Stack
- MongoDB, Express.js, React, Node.js
- JWT for authentication
- Tailwind CSS for styling

## Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)
- Git

## Features
- User registration and login
- Create, view, edit, delete opportunities
- Only the creator can edit/delete their opportunities
- Dashboard showing all opportunities

## How to Run Locally

Backend:
cd backend
npm install
npm run dev

Frontend:
cd frontend
npm install
npm run dev


## Environment Variables

Backend (.env):
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d


Frontend (.env):
VITE_API_URL=http://localhost:5000


## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get user profile |
| GET | /api/opportunities | Get all opportunities |
| POST | /api/opportunities | Create opportunity |
| PUT | /api/opportunities/:id | Update opportunity |
| DELETE | /api/opportunities/:id | Delete opportunity |

## Deployment
- Backend: Render
- Frontend: Vercel
- Database: MongoDB Atlas

## Limitations
- No pagination
- No search/filter
- Basic validation only