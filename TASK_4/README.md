# Task 4 - CI/CD Pipeline with GitHub Actions

This task implements a Continuous Integration/Continuous Deployment (CI/CD) pipeline using GitHub Actions to automatically build and test the Java API (Task 1) on every push and pull request.

## 🚀 Overview

The CI/CD pipeline automates the build process for the Spring Boot application, ensuring code quality and consistency across different environments. It runs on GitHub's infrastructure and provides immediate feedback on code changes.

## 📋 What This Pipeline Does

### ✅ Automated Build Process
- **Code Checkout**: Retrieves the latest code from the repository
- **Java Setup**: Configures JDK 17 (Temurin) environment
- **Dependency Resolution**: Downloads Maven dependencies
- **Compilation**: Builds the Java application
- **Testing**: Runs unit tests (if configured)
- **Artifact Creation**: Generates JAR files for deployment

### ✅ Trigger Events
- **Push to main/master**: Builds on every commit to the main branch
- **Pull Requests**: Validates changes before merging
- **Manual Trigger**: Can be triggered manually from GitHub Actions tab

## 🛠️ Setup Instructions

### Prerequisites
- **GitHub Account**: Free account is sufficient
- **Git Repository**: Your project must be in a Git repository
- **Java Project**: Task 1 (Spring Boot API) must be present

### Step 1: Initialize Git Repository (if not already done)
```bash
# Navigate to your project root
cd C:\Users\vskav\Downloads\KAIBURR

# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Kaiburr Assessment Tasks"
```

### Step 2: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"**
3. Name it: `kaiburr-assessment` (or your preferred name)
4. Make it **Public** or **Private** (your choice)
5. **Don't** initialize with README (since you already have files)
6. Click **"Create repository"**

### Step 3: Connect Local Repository to GitHub
```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/kaiburr-assessment.git

# Rename default branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 4: Set Up CI/CD Pipeline
```bash
# Create GitHub Actions directory
mkdir -p .github/workflows

# Copy the CI workflow file
cp TASK_4/.github/workflows/ci.yml .github/workflows/
```

### Step 5: Commit and Push Pipeline
```bash
# Add the workflow file
git add .github/workflows/ci.yml

# Commit the changes
git commit -m "Add CI/CD pipeline for Task 1"

# Push to trigger the first build
git push origin main
```

## 📁 Pipeline Structure

### Workflow File: `.github/workflows/ci.yml`
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up JDK 17
      uses: actions/setup-java@v4
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Cache Maven dependencies
      uses: actions/cache@v3
      with:
        path: ~/.m2
        key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
        restore-keys: ${{ runner.os }}-m2
    
    - name: Build with Maven
      run: mvn -B -q -e -DskipTests package
      working-directory: TASK_1
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: task1-jar
        path: TASK_1/target/*.jar
```

## 🔍 Understanding the Pipeline

### Workflow Triggers
```yaml
on:
  push:
    branches: [ main, master ]    # Triggers on push to main/master
  pull_request:
    branches: [ main, master ]    # Triggers on PR to main/master
```

### Build Environment
- **OS**: Ubuntu Latest (Linux)
- **Java**: JDK 17 (Temurin distribution)
- **Build Tool**: Maven
- **Cache**: Maven dependencies cached for faster builds

### Build Steps
1. **Checkout Code**: Downloads your repository code
2. **Setup Java**: Installs JDK 17
3. **Cache Dependencies**: Speeds up subsequent builds
4. **Build Application**: Compiles and packages the JAR
5. **Upload Artifacts**: Saves build outputs for download

## 📊 Monitoring the Pipeline

### Viewing Build Status
1. Go to your GitHub repository
2. Click the **"Actions"** tab
3. You'll see a list of all workflow runs
4. Click on any run to see detailed logs

### Build Status Indicators
- ✅ **Green Checkmark**: Build successful
- ❌ **Red X**: Build failed
- 🟡 **Yellow Circle**: Build in progress
- ⚪ **Gray Circle**: Build cancelled

### Understanding Build Logs
```
Run actions/checkout@v4
✓ Checkout code

Run actions/setup-java@v4
✓ Set up JDK 17

Run actions/cache@v3
✓ Cache Maven dependencies

Run mvn -B -q -e -DskipTests package
✓ Build with Maven

Run actions/upload-artifact@v3
✓ Upload build artifacts
```

## 🐛 Troubleshooting Common Issues

### 1. Build Fails with "Java not found"
```
Error: Java 17 not found
```
**Solution:**
- Ensure the workflow file has correct Java setup
- Check that `java-version: '17'` is specified
- Verify `distribution: 'temurin'` is used

### 2. Maven Build Fails
```
Error: Maven build failed
```
**Solution:**
- Check if `TASK_1/pom.xml` exists
- Verify Maven dependencies are correct
- Look at detailed error logs in GitHub Actions

### 3. Cache Issues
```
Error: Cache restore failed
```
**Solution:**
- This is usually not critical
- The build will continue without cache
- Cache will be rebuilt on next run

### 4. Artifact Upload Fails
```
Error: No files found to upload
```
**Solution:**
- Check if JAR file is generated in `TASK_1/target/`
- Verify the path in upload-artifact step
- Ensure Maven build completed successfully

## 🚀 Advanced Configuration

### Adding Tests to Pipeline
```yaml
- name: Run Tests
  run: mvn test
  working-directory: TASK_1
```

### Adding Code Quality Checks
```yaml
- name: Run Checkstyle
  run: mvn checkstyle:check
  working-directory: TASK_1
```

### Adding Security Scanning
```yaml
- name: Run Security Scan
  run: mvn org.owasp:dependency-check-maven:check
  working-directory: TASK_1
```

### Multi-Environment Builds
```yaml
strategy:
  matrix:
    java-version: [17, 21]
    os: [ubuntu-latest, windows-latest, macos-latest]
```

## 📦 Artifact Management

### Downloading Build Artifacts
1. Go to GitHub Actions → Your workflow run
2. Scroll down to **"Artifacts"** section
3. Click **"task1-jar"** to download
4. Extract the JAR file for deployment

### Artifact Retention
- **GitHub Free**: 90 days retention
- **GitHub Pro**: 400 days retention
- **GitHub Enterprise**: Custom retention policies

## 🔄 Continuous Deployment (CD)

### Adding Deployment Steps
```yaml
- name: Deploy to Staging
  if: github.ref == 'refs/heads/main'
  run: |
    # Deploy to staging environment
    echo "Deploying to staging..."
    
- name: Deploy to Production
  if: github.ref == 'refs/heads/main' && github.event_name == 'release'
  run: |
    # Deploy to production
    echo "Deploying to production..."
```

### Environment Variables
```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  API_KEY: ${{ secrets.API_KEY }}
```

## 📈 Best Practices

### 1. Branch Protection
- Enable branch protection on main branch
- Require status checks to pass before merging
- Require pull request reviews

### 2. Workflow Optimization
- Use caching for dependencies
- Run tests in parallel when possible
- Use matrix builds for multiple environments

### 3. Security
- Use GitHub Secrets for sensitive data
- Don't commit API keys or passwords
- Use least-privilege access tokens

### 4. Monitoring
- Set up notifications for build failures
- Monitor build times and optimize
- Track deployment success rates

## 🎯 Benefits of CI/CD

### ✅ Immediate Feedback
- Know immediately if code changes break the build
- Catch issues before they reach production
- Faster development cycles

### ✅ Consistency
- Same build environment every time
- Reproducible builds across different machines
- Standardized deployment process

### ✅ Automation
- No manual build steps required
- Automatic testing and validation
- Reduced human error

### ✅ Collaboration
- Team members can see build status
- Easy to track changes and deployments
- Better code review process

## 📝 Next Steps

### For Production Deployment
1. **Set up staging environment**
2. **Configure production secrets**
3. **Add deployment automation**
4. **Set up monitoring and alerts**

### For Team Development
1. **Enable branch protection**
2. **Set up code review requirements**
3. **Configure team notifications**
4. **Add code quality gates**

## 🔗 Related Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Maven GitHub Actions](https://github.com/actions/setup-java)
- [Spring Boot Deployment Guide](https://spring.io/guides/gs/spring-boot-for-azure/)
- [CI/CD Best Practices](https://docs.github.com/en/actions/learn-github-actions)

## 📞 Support

If you encounter issues with the CI/CD pipeline:

1. **Check GitHub Actions logs** for detailed error messages
2. **Verify your repository structure** matches the expected layout
3. **Ensure all dependencies** are properly configured
4. **Test locally** with the same Maven commands

The pipeline is designed to be robust and provide clear feedback when issues occur. Most problems can be resolved by checking the build logs and ensuring your local setup matches the CI environment.