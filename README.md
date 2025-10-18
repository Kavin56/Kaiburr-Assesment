# Kaiburr Assessment - Task Management System

A full-stack web application for managing and executing shell commands through a modern web interface. The system consists of a Spring Boot REST API backend with MongoDB storage and a React frontend with TypeScript and Ant Design.

## 🚀 Quick Start

### Prerequisites
- **Java 17+** - For the backend API
- **Maven 3.6+** - For building the Java application
- **Node.js 18+** - For the frontend application
- **MongoDB 4.4+** - For data storage

### One-Command Setup
```bash
# Clone and navigate to the project
cd KAIBURR

# Install dependencies and start both services
npm install
npm run dev
```

This starts:
- **Backend API**: `http://localhost:8081`
- **Frontend Web App**: `http://localhost:5173`

## 🎯 What This Application Does

### Core Functionality
This is a **Task Management System** that allows users to:

- **Create Tasks**: Define shell commands with metadata (name, owner, command)
- **Execute Commands**: Run shell commands and capture their output
- **Search & Filter**: Find tasks by name or other criteria
- **View History**: See execution results and timestamps
- **Manage Tasks**: Delete tasks and update information

### Real-World Use Cases
- **DevOps Automation**: Store and execute deployment scripts
- **System Administration**: Manage server maintenance commands
- **Development Workflows**: Run build, test, and deployment commands
- **Team Collaboration**: Share common commands across team members

## 🏗️ System Architecture

### Backend (Spring Boot API)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│◄──►│  Spring Boot API│◄──►│    MongoDB      │
│   (Port 5173)   │    │   (Port 8081)   │    │  (Port 27017)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Technology Stack:**
- **Framework**: Spring Boot 3.3.3
- **Database**: MongoDB with Spring Data
- **Security**: Command validation and CORS protection
- **Build Tool**: Maven with Java 17

### Frontend (React Web App)
```
┌─────────────────────────────────────────────────────────────┐
│                    React Web Interface                      │
├─────────────────────────────────────────────────────────────┤
│  • Task Creation Form    • Search & Filter                 │
│  • Task Management Table • Command Execution Results       │
│  • Real-time Updates     • Responsive Design               │
└─────────────────────────────────────────────────────────────┘
```

**Technology Stack:**
- **Framework**: React 18 with TypeScript
- **UI Library**: Ant Design 5
- **Build Tool**: Vite
- **HTTP Client**: Axios

## 📊 Data Model

### Task Object Structure
```json
{
  "id": "unique-task-id",
  "name": "Task Name",
  "owner": "Task Owner",
  "command": "shell command to execute",
  "taskExecutions": [
    {
      "startTime": "2025-10-18T05:41:08.157Z",
      "endTime": "2025-10-18T05:41:08.214Z",
      "output": "command output text"
    }
  ]
}
```

### Database Schema
- **Collection**: `tasks`
- **Storage**: MongoDB document store
- **Indexing**: Automatic on `id` field
- **Relationships**: Self-contained documents

## 🔧 API Endpoints

### Task Management
```bash
# List all tasks
GET /tasks

# Get specific task
GET /tasks?id={taskId}

# Search tasks by name
GET /tasks?name={searchTerm}

# Create or update task
PUT /tasks

# Delete task
DELETE /tasks?id={taskId}

# Execute task command
PUT /tasks/{taskId}/execute
```

### Example API Usage
```bash
# Create a new task
curl -X PUT "http://localhost:8081/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "List Files",
    "owner": "John Doe",
    "command": "ls -la"
  }'

# Execute the task
curl -X PUT "http://localhost:8081/tasks/{taskId}/execute"
```

## 🎨 User Interface Features

### Dashboard
- **Task Table**: Displays all tasks with key information
- **Search Bar**: Real-time search by task name
- **Action Buttons**: Create, execute, and delete tasks
- **Status Indicators**: Shows recent execution timestamps

### Task Creation
- **Form Validation**: Ensures required fields are filled
- **Command Preview**: Shows the command before saving
- **Owner Assignment**: Track who created each task

### Command Execution
- **Modal Display**: Shows execution results in a popup
- **JSON Output**: Complete task data with execution history
- **Command Output**: Raw shell command results
- **Execution Metadata**: Start time, end time, and duration

### Responsive Design
- **Mobile Friendly**: Works on phones and tablets
- **Desktop Optimized**: Full-featured interface on larger screens
- **Touch Support**: Optimized for touch interactions

## 🛡️ Security Features

### Command Validation
- **Dangerous Command Blocking**: Prevents execution of harmful commands
- **Input Sanitization**: Validates all user inputs
- **Safe Command List**: Whitelist approach for allowed commands

### CORS Protection
- **Frontend Origin**: Only allows requests from `localhost:5173`
- **Method Restrictions**: Limits to safe HTTP methods
- **Header Validation**: Ensures proper request headers

### Error Handling
- **Graceful Failures**: User-friendly error messages
- **Logging**: Comprehensive error logging for debugging
- **Recovery**: Automatic retry mechanisms where appropriate

## 🚀 Development Workflow

### How the Unified Development Setup Works

The application uses **concurrently** to run both backend and frontend simultaneously:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run backend\" \"npm run frontend\"",
    "backend": "cd TASK_1 && mvn spring-boot:run",
    "frontend": "cd TASK_3 && npm run dev"
  }
}
```

### Terminal Output
```bash
[0] > Backend (Spring Boot) - Red color
[1] > Frontend (React) - Blue color

# Example output:
[1] VITE v5.4.20  ready in 392 ms
[1] ➜  Local:   http://localhost:5173/
[0] :: Spring Boot ::                (v3.3.3)
[0] Tomcat started on port 8081 (http)
```

### Available Commands
```bash
npm run dev          # Start both backend and frontend
npm run backend      # Start only the backend API
npm run frontend     # Start only the frontend web app
npm run install-all  # Install all dependencies
npm run build        # Build frontend for production
```

## 📁 Project Structure

```
KAIBURR/
├── TASK_1/                    # Backend API
│   ├── src/main/java/         # Java source code
│   │   └── com/kaiburr/task1/
│   │       ├── controller/    # REST endpoints
│   │       ├── model/         # Data models
│   │       ├── service/       # Business logic
│   │       ├── repo/          # Database access
│   │       └── config/        # Configuration
│   ├── src/main/resources/    # Configuration files
│   └── pom.xml               # Maven dependencies
├── TASK_3/                    # Frontend Web App
│   ├── src/                   # React source code
│   │   ├── main.tsx          # Application entry point
│   │   └── ui/               # React components
│   ├── package.json          # Node.js dependencies
│   └── vite.config.ts        # Build configuration
├── TASK_4/                    # CI/CD Pipeline
│   └── .github/workflows/     # GitHub Actions
├── package.json              # Root package.json
└── README.md                 # This file
```

## 🔄 Development Process

### Local Development
1. **Start Services**: `npm run dev`
2. **Make Changes**: Edit code in either backend or frontend
3. **Hot Reload**: Changes automatically reflected
4. **Test Features**: Use the web interface to test functionality

### Code Changes
- **Backend**: Java changes require restart
- **Frontend**: React changes update automatically
- **Database**: MongoDB persists data between restarts

### Testing
- **API Testing**: Use curl commands or Postman
- **UI Testing**: Use the web interface
- **Integration Testing**: Test full workflow end-to-end

## 🐛 Troubleshooting

### Common Issues

#### Services Won't Start
```bash
# Check if ports are available
netstat -an | findstr ":8081\|:5173"

# Kill processes using ports
taskkill /PID <PID> /F
```

#### Database Connection Issues
```bash
# Check MongoDB status
Get-Service -Name MongoDB

# Test MongoDB connection
mongosh --eval "db.runCommand({connectionStatus: 1})"
```

#### Build Failures
```bash
# Clean and rebuild
mvn clean compile
npm run build
```

### Getting Help
1. **Check Logs**: Look at terminal output for error messages
2. **Verify Prerequisites**: Ensure all required software is installed
3. **Test Individual Components**: Run backend and frontend separately
4. **Check Network**: Ensure ports are not blocked by firewall

## 🚀 Production Deployment

### Backend Deployment
```bash
# Build JAR file
mvn clean package

# Run in production
java -jar target/task1-api-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy dist/ folder to web server
```

### Environment Configuration
```bash
# Backend environment variables
export SPRING_DATA_MONGODB_URI=mongodb://your-mongo-host:27017/kaiburr
export SERVER_PORT=8080

# Frontend environment variables
export VITE_API_URL=http://your-api-host:8080
```

## 📈 Performance & Scalability

### Current Capabilities
- **Concurrent Users**: Supports multiple simultaneous users
- **Command Execution**: Handles shell commands safely
- **Data Storage**: MongoDB scales horizontally
- **Response Time**: Sub-second API responses

### Optimization Features
- **Connection Pooling**: Efficient database connections
- **Caching**: Maven and npm dependency caching
- **Hot Reload**: Fast development iteration
- **Code Splitting**: Optimized frontend bundle sizes

## 🔮 Future Enhancements

### Potential Features
- **User Authentication**: Login and user management
- **Command Scheduling**: Cron-like task scheduling
- **File Upload**: Support for script file uploads
- **Team Collaboration**: Multi-user task sharing
- **Audit Logging**: Detailed execution history
- **API Rate Limiting**: Prevent abuse
- **Docker Support**: Containerized deployment

## 📚 Technology Documentation

### Backend Technologies
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data MongoDB](https://spring.io/projects/spring-data-mongodb)
- [Maven Documentation](https://maven.apache.org/guides/)

### Frontend Technologies
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Ant Design Components](https://ant.design/components/overview)
- [Vite Guide](https://vitejs.dev/guide/)

### Database
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Java Driver](https://mongodb.github.io/mongo-java-driver/)

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- **Java**: Follow Spring Boot conventions
- **TypeScript**: Use strict type checking
- **React**: Functional components with hooks
- **Documentation**: Update README files as needed

---

**Built with ❤️ for the Kaiburr Assessment**

This application demonstrates modern full-stack development practices with a focus on user experience, security, and maintainability.
