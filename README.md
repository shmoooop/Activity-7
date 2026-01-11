# Task Management System

A simple Task Management System built with React (Vite) frontend and NestJS backend.

## 🎯 Features

- **Projects**: Create and manage projects with name and description
- **Users**: Add users to assign tasks
- **Tasks**: Create tasks assigned to projects and users
- **Dashboard**: View projects and their tasks in a clean interface
- **API Documentation**: Swagger UI available at `/api`

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: NestJS + TypeScript
- **Database**: SQLite with TypeORM
- **API Docs**: Swagger

## 📁 Project Structure

```
Activity 7/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       ├── App.jsx
│       └── api.js
├── server/          # NestJS backend
│   └── src/
│       ├── projects/
│       ├── users/
│       └── tasks/
├── SETUP_COMMANDS.md    # Quick setup reference
└── HOW_TO_RUN.md        # Detailed run instructions
```

## 🚀 Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run start:dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

### 3. Open in Browser

- Frontend: http://localhost:5173
- API Docs: http://localhost:3000/api

## 📚 Documentation

- **Setup Commands**: See `SETUP_COMMANDS.md`
- **How to Run**: See `HOW_TO_RUN.md`

## 🎓 For Students

This is a beginner-friendly implementation with:
- Simple, clean code structure
- Clear comments and naming
- Easy-to-understand patterns
- All CRUD operations implemented
