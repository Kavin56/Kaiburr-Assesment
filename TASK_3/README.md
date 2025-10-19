# Task 3 - React Frontend with TypeScript and Ant Design

This is a modern React 18 frontend application built with TypeScript and Ant Design that provides a user-friendly interface for managing tasks. It connects to the Spring Boot backend (Task 1) to perform CRUD operations on task objects.

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (LTS recommended)
- **npm 9+** or **yarn 1.22+**
- **Backend API running** (Task 1) on `http://localhost:8081`

### Installation & Setup

#### 1. Install Dependencies
```bash
# From TASK_3 directory
npm install

# Or from root directory
npm run install-all
```

#### 2. Start Development Server
```bash
# From TASK_3 directory
npm run dev

# Or from root directory
npm run frontend
```

The application will be available at: `http://localhost:5173`
<img width="1540" height="713" alt="image" src="https://github.com/user-attachments/assets/adfb3be8-3aa8-4d6f-946e-36c824a1de92" />

## 🎨 Features

### ✅ Task Management
- **Create Tasks**: Add new tasks with name, owner, and command
- **View Tasks**: Display all tasks in a responsive table
- **Search Tasks**: Find tasks by name with real-time search
- **Execute Commands**: Run shell commands and view results in JSON format
- **Delete Tasks**: Remove tasks with confirmation

### ✅ User Interface
- **Modern Design**: Clean, professional interface using Ant Design
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Automatic refresh after operations
- **Error Handling**: User-friendly error messages and loading states
- **Modal Dialogs**: Command execution results displayed in detailed modals

### ✅ Technical Features
- **TypeScript**: Full type safety and better development experience
- **React 18**: Latest React features and performance improvements
- **Ant Design 5**: Modern UI components and theming
- **Axios**: HTTP client for API communication
- **Vite**: Fast development server and build tool

## 🏗️ Project Structure

```
TASK_3/
├── src/
│   ├── main.tsx              # Application entry point
│   └── ui/
│       └── App.tsx           # Main application component
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# From root directory
npm run frontend     # Start frontend only
npm run dev          # Start both frontend and backend
```

## 🎯 Usage Guide

### 1. Creating a New Task
1. Click the **"New Task"** button in the header
2. Fill in the form:
   - **Name**: Descriptive name for the task
   - **Owner**: Who owns this task
   - **Command**: Shell command to execute
3. Click **"Save"** to create the task

**Example Task:**
- Name: `List Files`
- Owner: `John Doe`
- Command: `dir` (Windows) or `ls -la` (Linux/Mac)

### 2. Viewing Tasks
- All tasks are displayed in a table with columns:
  - **ID**: Unique task identifier
  - **Name**: Task name
  - **Owner**: Task owner
  - **Command**: Shell command
  - **Executions**: Recent execution timestamps
  - **Actions**: Run and Delete buttons

### 3. Searching Tasks
- Use the search box in the header
- Type part of the task name
- Press Enter or click the search icon
- Results update in real-time

### 4. Executing Commands
1. Click the **"Run"** button for any task
2. The command executes on the backend
3. A modal opens showing:
   - **Complete Task JSON**: Full task object with all data
   - **Latest Execution Output**: Command output and execution details
4. Close the modal to return to the task list

**Example Execution Result:**
```json
{
  "id": "test123",
  "name": "List Files",
  "owner": "John Doe",
  "command": "dir",
  "taskExecutions": [
    {
      "startTime": "2025-10-18T05:41:08.157Z",
      "endTime": "2025-10-18T05:41:08.214Z",
      "output": "Volume in drive C is Windows\nDirectory of C:\\Users\\..."
    }
  ]
}
```

### 5. Deleting Tasks
1. Click the **"Delete"** button for any task
2. The task is immediately removed
3. A success message confirms the deletion
4. The table updates automatically

## 🔧 Configuration

### Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/tasks': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
})
```

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## 🎨 UI Components

### Main Layout
- **Header**: Application title, search box, and new task button
- **Content**: Task table with pagination
- **Footer**: Application information

### Task Table Columns
- **ID**: Unique identifier (truncated for display)
- **Name**: Task name
- **Owner**: Task owner
- **Command**: Shell command (with ellipsis for long commands)
- **Executions**: Recent execution timestamps as blue tags
- **Actions**: Run (primary blue) and Delete (danger red) buttons

### Modal Components
- **New Task Modal**: Form for creating tasks
- **Execution Result Modal**: Displays command output and task JSON
<img width="1916" height="929" alt="image" src="https://github.com/user-attachments/assets/4e408c68-a91b-419a-83a9-b968ae866ab8" />

## 🔗 API Integration

### Backend Communication
The frontend communicates with the Spring Boot backend through these endpoints:

```typescript
// Get all tasks
GET /tasks

// Search tasks by name
GET /tasks?name={searchTerm}

// Create/update task
PUT /tasks

// Delete task
DELETE /tasks?id={taskId}

// Execute task command
PUT /tasks/{taskId}/execute
```

### Error Handling
- **Network Errors**: Displayed as user-friendly messages
- **Validation Errors**: Form validation with Ant Design components
- **API Errors**: Extracted from backend response and displayed
- **React Errors**: Caught by ErrorBoundary to prevent white screens

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend Connection Failed
```
Error: Network Error
```
**Solution:**
- Ensure backend is running on `http://localhost:8081`
- Check if MongoDB is running
- Verify CORS configuration in backend

#### 2. Port Already in Use
```
Error: Port 5173 is already in use
```
**Solution:**
```bash
# Kill process using port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

#### 3. TypeScript Errors
```
Error: Cannot find module 'antd'
```
**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 4. Build Errors
```
Error: Build failed
```
**Solution:**
```bash
# Clean and rebuild
npm run build
# Check for TypeScript errors
npx tsc --noEmit
```

### Development Tools

#### Browser DevTools
- **Console**: Check for JavaScript errors
- **Network**: Monitor API requests and responses
- **React DevTools**: Inspect component state and props

#### Vite DevTools
- **Hot Module Replacement**: Automatic updates during development
- **Fast Refresh**: Preserves component state during updates
- **Error Overlay**: Displays compilation errors in browser

## 🚀 Production Build

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Static Hosting
The build creates static files in `dist/` directory that can be deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Push `dist/` contents to gh-pages branch
- **AWS S3**: Upload `dist/` contents to S3 bucket

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

### Mobile Features
- **Responsive Table**: Horizontal scroll on small screens
- **Touch-Friendly**: Large buttons and touch targets
- **Optimized Layout**: Stacked elements on mobile

## 🎨 Customization

### Theming
Ant Design components can be customized through the ConfigProvider:

```typescript
import { ConfigProvider, theme } from 'antd'

<ConfigProvider
  theme={{
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 6,
    },
  }}
>
  <App />
</ConfigProvider>
```

### Styling
- **CSS Modules**: Component-specific styles
- **Ant Design**: Pre-built component styles
- **Inline Styles**: Dynamic styling based on state

## 🔒 Security Considerations

### Input Validation
- **Client-side**: Form validation with Ant Design
- **Server-side**: Backend validation for all inputs
- **Command Sanitization**: Dangerous commands blocked by backend

### CORS Configuration
- **Development**: Allows `http://localhost:5173`
- **Production**: Configure for your domain

## 📊 Performance

### Optimization Features
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Unused code eliminated
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Create new task
- [ ] Search tasks by name
- [ ] Execute command and view results
- [ ] Delete task
- [ ] Test error handling
- [ ] Test responsive design
- [ ] Test with different browsers

### Browser Compatibility
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📝 Development Notes

### Code Structure
- **Functional Components**: Using React hooks
- **TypeScript**: Full type safety
- **Error Boundaries**: Graceful error handling
- **Custom Hooks**: Reusable logic extraction

### Best Practices
- **Component Composition**: Small, focused components
- **State Management**: Local state with useState
- **API Calls**: Centralized in service functions
- **Error Handling**: User-friendly error messages
