# Todo App

A full-stack todo list application with a React frontend and Express backend.

## Features

- Add, edit, and delete tasks
- Mark tasks as complete
- Filter by All / Active / Completed
- Clear all completed tasks at once

## Running Locally

**Backend** (port 3001):
```bash
cd backend
npm install
npm run dev
```

**Frontend** (port 3000):
```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | List all todos |
| POST | `/api/todos` | Create a todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |
