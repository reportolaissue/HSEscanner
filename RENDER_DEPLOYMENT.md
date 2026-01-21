# AI Safety Vision - Render Deployment Guide

## Prerequisites
1. GitHub account
2. Render account (free at render.com)
3. MongoDB Atlas account (free at mongodb.com/atlas)
4. Your EMERGENT_LLM_KEY from Emergent platform

## Architecture on Render
- Backend: Python Web Service (FastAPI)
- Frontend: Static Site (React)
- Database: MongoDB Atlas (external)

## Environment Variables Needed

### Backend (.env):
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/safety_vision
DB_NAME=safety_vision
EMERGENT_LLM_KEY=your-emergent-key-here
CORS_ORIGINS=https://your-frontend.onrender.com
```

### Frontend (.env):
```
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```
