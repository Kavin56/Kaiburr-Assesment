# Task 1 - Spring Boot REST API with MongoDB

This is a Spring Boot REST API that manages "task" objects representing shell commands. Tasks can be created, searched, deleted, and executed, with execution results stored in MongoDB.

## 🚀 Quick Start

### Prerequisites
- **Java 17+** (JDK 17 or higher)
- **Maven 3.6+**
- **MongoDB 4.4+**

### Installation & Setup

#### 1. Install MongoDB

**Windows (Recommended):**
```bash
# Using winget (Windows Package Manager)
winget install MongoDB.Server

# Or download from: https://www.mongodb.com/try/download/community
```

**Alternative - Manual Installation:**
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the MSI installer
3. Choose "Complete" installation
4. Install MongoDB as a Windows Service

#### 2. Start MongoDB
```bash
# Check if MongoDB service is running
Get-Service -Name MongoDB

# If not running, start it
Start-Service -Name MongoDB

# Or start manually
mongod --dbpath C:\data\db
```

#### 3. Verify MongoDB Installation
```bash
# Connect to MongoDB shell
mongosh

# In MongoDB shell, test connection
db.runCommand({connectionStatus: 1})
```

#### 4. Run the Application
```bash
# From TASK_1 directory
mvn spring-boot:run

# Or from root directory
npm run backend
```

The API will be available at: `http://localhost:8081`

## 📋 API Endpoints

### 1. List All Tasks
```bash
curl "http://localhost:8081/tasks"
```

**Response:**
```json
[
  {
    "id": "68f32747420daa52641fec3a",
    "name": "Hello World",
    "owner": "John Doe",
    "command": "echo Hello World!",
    "taskExecutions": []
  }
]
```
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/8b05eac8-731e-407e-8a14-69ca6c8432f9" />

### 2. Get Task by ID
```bash
curl "http://localhost:8081/tasks?id=68f32747420daa52641fec3a"
```

**Response:**
```json
{
  "id": "68f32747420daa52641fec3a",
  "name": "Hello World",
  "owner": "John Doe",
  "command": "echo Hello World!",
  "taskExecutions": []
}
```
<img width="1427" height="667" alt="image" src="https://github.com/user-attachments/assets/8cee3256-2fee-40ca-bbee-7c9aea2cb075" />

### 3. Search Tasks by Name
```bash
curl "http://localhost:8081/tasks?name=Hello"
```

**Response:**
```json
[
  {
    "id": "68f32747420daa52641fec3a",
    "name": "Hello World",
    "owner": "John Doe",
    "command": "echo Hello World!",
    "taskExecutions": []
  }
]
```
<img width="1435" height="609" alt="image" src="https://github.com/user-attachments/assets/3b063d6e-dd46-42cd-8146-845abd1e006d" />

### 4. Create/Update Task
```bash
curl -X PUT "http://localhost:8081/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test123",
    "name": "List Files",
    "owner": "Jane Smith",
    "command": "dir"
  }'
```

**Response:**
```json
{
  "id": "test123",
  "name": "List Files",
  "owner": "Jane Smith",
  "command": "dir",
  "taskExecutions": []
}
```

### 5. Execute Task Command
```bash
curl -X PUT "http://localhost:8081/tasks/test123/execute"
```

**Response:**
```json
{
  "id": "test123",
  "name": "List Files",
  "owner": "Jane Smith",
  "command": "dir",
  "taskExecutions": [
    {
      "startTime": "2025-10-18T05:41:08.157Z",
      "endTime": "2025-10-18T05:41:08.214Z",
      "output": "Volume in drive C is Windows\nVolume Serial Number is 1234-5678\n\nDirectory of C:\\Users\\vskav\\Downloads\\KAIBURR\\TASK_1\n\n10/18/2025  11:41 AM    <DIR>          .\n10/18/2025  11:41 AM    <DIR>          ..\n10/18/2025  11:41 AM    <DIR>          src\n10/18/2025  11:41 AM    <DIR>          target\n10/18/2025  11:41 AM             2,100 pom.xml\n10/18/2025  11:41 AM             1,600 README.md\n"
    }
  ]
}
```

### 6. Delete Task
```bash
curl -X DELETE "http://localhost:8081/tasks?id=test123"
```

**Response:** `204 No Content` (successful deletion)

## 🏗️ Project Structure

```
TASK_1/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── kaiburr/
│       │           └── task1/
│       │               ├── Task1ApiApplication.java    # Main application class
│       │               ├── config/
│       │               │   └── CorsConfig.java         # CORS configuration
│       │               ├── controller/
│       │               │   └── TaskController.java     # REST endpoints
│       │               ├── model/
│       │               │   ├── Task.java               # Task entity
│       │               │   └── TaskExecution.java      # Execution result entity
│       │               ├── repo/
│       │               │   └── TaskRepository.java     # MongoDB repository
│       │               └── service/
│       │                   ├── TaskService.java        # Business logic
│       │                   └── CommandValidator.java   # Command validation
│       └── resources/
│           └── application.properties                  # Configuration
├── pom.xml                                            # Maven dependencies
└── README.md                                          # This file
```

## 🔧 Configuration

### application.properties
```properties
# MongoDB connection
spring.data.mongodb.uri=mongodb://localhost:27017/kaiburr

# Server port
server.port=8081
```

### Maven Dependencies
- `spring-boot-starter-web` - REST API framework
- `spring-boot-starter-data-mongodb` - MongoDB integration
- `spring-boot-starter-validation` - Input validation

## 🛡️ Security Features

### Command Validation
The `CommandValidator` class prevents execution of dangerous commands:
- Blocks commands containing `rm`, `del`, `format`, etc.
- Prevents system-level operations
- Validates command syntax

### CORS Configuration
Allows frontend (React app) to communicate with the API:
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 🧪 Testing the API

### 1. Create a Test Task
```bash
curl -X PUT "http://localhost:8081/tasks" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Command",
    "owner": "Tester",
    "command": "echo Testing API"
  }'
```

### 2. Execute the Task
```bash
# Get the task ID from the previous response, then:
curl -X PUT "http://localhost:8081/tasks/{task-id}/execute"
```

### 3. View Results
```bash
curl "http://localhost:8081/tasks?id={task-id}"
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
Get-Service -Name MongoDB

# Check MongoDB logs
Get-Content "C:\Program Files\MongoDB\Server\7.0\log\mongod.log" -Tail 20

# Test connection
mongosh --eval "db.runCommand({connectionStatus: 1})"
```

### Port Conflicts
```bash
# Check what's using port 8081
netstat -an | findstr :8081

# Kill process using port 8081
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

### Java Version Issues
```bash
# Check Java version
java -version

# Should show Java 17 or higher
```

### Maven Build Issues
```bash
# Clean and rebuild
mvn clean compile

# Force update dependencies
mvn clean compile -U
```

## 📊 Database Schema

### Tasks Collection
```json
{
  "_id": "ObjectId",
  "id": "string",           // Custom ID
  "name": "string",         // Task name
  "owner": "string",        // Task owner
  "command": "string",      // Shell command
  "taskExecutions": [       // Array of execution results
    {
      "startTime": "ISO8601",
      "endTime": "ISO8601",
      "output": "string"
    }
  ]
}
```

## 🚀 Production Deployment

### Environment Variables
```bash
export SPRING_DATA_MONGODB_URI=mongodb://your-mongo-host:27017/kaiburr
export SERVER_PORT=8080
```

### JAR Build
```bash
mvn clean package
java -jar target/task1-api-0.0.1-SNAPSHOT.jar
```

## 📝 API Response Codes

- `200 OK` - Successful GET/PUT request
- `201 Created` - Task created successfully
- `204 No Content` - Task deleted successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

## 🔗 Integration with Frontend

This API is designed to work with the React frontend (Task 3). The frontend can:
- Display all tasks in a table
- Create new tasks
- Search tasks by name
- Execute commands and show results
- Delete tasks

The API handles CORS to allow frontend communication and returns JSON responses that the frontend can easily consume.
