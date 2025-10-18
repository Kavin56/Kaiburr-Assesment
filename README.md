# Kaiburr Assessment - Unified Development Setup

This project contains both the backend (Task 1) and frontend (Task 3) for the Kaiburr Assessment.

## Quick Start

### Option 1: Unified Command (Recommended)
From the root directory (`KAIBURR`), run:
```bash
npm run dev
```

This will start both:
- **Backend**: Spring Boot API on `http://localhost:8081`
- **Frontend**: React app on `http://localhost:5173`

### Option 2: Individual Commands
If you prefer to run them separately:

**Backend only:**
```bash
npm run backend
# or
cd TASK_1 && mvn spring-boot:run
```

**Frontend only:**
```bash
npm run frontend
# or
cd TASK_3 && npm run dev
```

## Available Scripts

- `npm run dev` - Start both backend and frontend
- `npm run backend` - Start only the backend
- `npm run frontend` - Start only the frontend
- `npm run install-all` - Install frontend dependencies
- `npm run build` - Build the frontend for production

## Prerequisites

1. **Java 17+** - For the Spring Boot backend
2. **Maven** - For building the Java project
3. **Node.js 18+** - For the React frontend
4. **MongoDB** - Database for the backend

## Project Structure

```
KAIBURR/
├── TASK_1/          # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── TASK_3/          # React Frontend
│   ├── src/
│   ├── package.json
│   └── README.md
├── package.json     # Root package.json for unified commands
└── README.md        # This file
```

## API Endpoints

The backend provides these REST endpoints:

- `GET /tasks` - List all tasks
- `GET /tasks?id={id}` - Get task by ID
- `GET /tasks?name={name}` - Search tasks by name
- `PUT /tasks` - Create/update task
- `DELETE /tasks?id={id}` - Delete task
- `PUT /tasks/{id}/execute` - Execute task command

## Frontend Features

- Create new tasks
- View all tasks in a table
- Search tasks by name
- Execute commands (shows JSON output in modal)
- Delete tasks
- Real-time updates

## Troubleshooting

If you encounter issues:

1. **Port conflicts**: Make sure ports 8081 (backend) and 5173 (frontend) are available
2. **MongoDB**: Ensure MongoDB is running on localhost:27017
3. **Java version**: Make sure you have Java 17+ installed
4. **Node version**: Make sure you have Node.js 18+ installed

## How the Unified Development Setup Works

### The Magic Behind `npm run dev`

The unified command works using **concurrently** - a package that runs multiple commands simultaneously in the same terminal.

#### 1. Root Package.json Configuration
```json
{
  "scripts": {
    "dev": "concurrently \"npm run backend\" \"npm run frontend\"",
    "backend": "cd TASK_1 && mvn spring-boot:run",
    "frontend": "cd TASK_3 && npm run dev"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

#### 2. How It Works Step by Step
```bash
# When you run: npm run dev
# It executes: concurrently "npm run backend" "npm run frontend"

# Which expands to:
concurrently "cd TASK_1 && mvn spring-boot:run" "cd TASK_3 && npm run dev"
```

#### 3. Terminal Output with Color Coding
```
[0] > kaiburr-assessment@1.0.0 backend
[0] > cd TASK_1 && mvn spring-boot:run
[0] 
[1] > kaiburr-assessment@1.0.0 frontend  
[1] > cd TASK_3 && npm run dev
[1] 
[1] VITE v5.4.20  ready in 392 ms
[1] ➜  Local:   http://localhost:5173/
[0] :: Spring Boot ::                (v3.3.3)
[0] Tomcat started on port 8081 (http)
```

**Legend:**
- `[0]` = Backend (Spring Boot) - Red color
- `[1]` = Frontend (React) - Blue color

#### 4. Why This Setup is Powerful
```bash
# Instead of running 2 separate commands in 2 terminals:
Terminal 1: cd TASK_1 && mvn spring-boot:run
Terminal 2: cd TASK_3 && npm run dev

# You run 1 command in 1 terminal:
npm run dev
```

#### 5. Process Management
```bash
# To stop both services:
Ctrl + C  # Stops both backend and frontend

# To stop individual services:
# Backend only: npm run backend
# Frontend only: npm run frontend
```

### Key Benefits
- ✅ **Single Command**: One command starts everything
- ✅ **Color Coded**: Easy to distinguish backend vs frontend logs
- ✅ **Synchronized**: Both services start together
- ✅ **Easy Debugging**: All logs in one place
- ✅ **Cross-Platform**: Works on Windows, Mac, Linux

## Development Notes

- The backend uses Spring Boot 3.3.3 with MongoDB
- The frontend uses React 18 with TypeScript and Ant Design
- Both services support hot reload during development
- CORS is configured to allow frontend-backend communication
- The unified setup uses `concurrently` to run both services simultaneously