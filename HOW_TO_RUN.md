# How to Run the Task Management System

Follow these steps **exactly** to run your application:

## Prerequisites
- Node.js and npm must be installed (you already have this ✅)

---

## Step 1: Install Backend Dependencies

1. Open your terminal
2. Navigate to the server folder:
   ```bash
   cd server
   ```

3. Install all dependencies:
   ```bash
   npm install
   ```
   
   *This will take a few minutes. Wait for it to finish.*

---

## Step 2: Install Frontend Dependencies

1. Open a **NEW terminal window** (keep the first one open)
2. Navigate to the client folder:
   ```bash
   cd client
   ```
   
   **Note:** Make sure you're in the correct directory. If you're in the server folder, go back first:
   ```bash
   cd ..
   cd client
   ```

3. Install all dependencies:
   ```bash
   npm install
   ```
   
   *This will take a few minutes. Wait for it to finish.*

---

## Step 3: Start the Backend Server

1. In the **first terminal** (where you installed backend dependencies):
   ```bash
   cd server
   npm run start:dev
   ```

2. You should see:
   ```
   [Nest] INFO  [NestFactory] Starting Nest application...
   [Nest] INFO  [InstanceLoader] ...
   Server is running on http://localhost:3000
   Swagger docs available at http://localhost:3000/api
   ```

3. **Keep this terminal open!** The server needs to keep running.

4. **Optional:** Test the API documentation by opening your browser and going to:
   ```
   http://localhost:3000/api
   ```

---

## Step 4: Start the Frontend Website

1. In the **second terminal** (where you installed frontend dependencies):
   ```bash
   cd client
   npm run dev
   ```

2. You should see:
   ```
   VITE v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

3. **Keep this terminal open too!** The frontend needs to keep running.

4. Open your browser and go to:
   ```
   http://localhost:5173
   ```

---

## Step 5: Using the Application

### First Steps:
1. **Create a User first:**
   - Click the "+ Add User" button
   - Enter a name (e.g., "John Doe")
   - Click "Create User"

2. **Create a Project:**
   - Click the "+ Create New Project" button
   - Enter a project name (e.g., "Website Redesign")
   - Add an optional description
   - Click "Create Project"

3. **View Tasks:**
   - Click on any project card to see its tasks
   - Create tasks by clicking "+ Add New Task"
   - Tasks will show the assigned user and deadline

---

## Important Notes:

- **Both terminals must stay open** while you're using the application
- **Always start the backend FIRST**, then the frontend
- If you see errors, make sure:
  - Both `npm install` commands completed successfully
  - You're in the correct folders
  - No other applications are using ports 3000 or 5173

---

## Stopping the Application

- To stop the backend: Go to the first terminal and press `Ctrl + C`
- To stop the frontend: Go to the second terminal and press `Ctrl + C`

---

## Troubleshooting

### Port Already in Use
If you get an error about port 3000 or 5173 being in use:
- Close any other applications using those ports
- Or restart your computer

### Cannot Connect to Backend
- Make sure the backend server is running first
- Check that you see "Server is running on http://localhost:3000" in the backend terminal

### Dependencies Installation Failed
- Make sure you have internet connection
- Try deleting `node_modules` folder and running `npm install` again

---

## Testing with Swagger

You can test all API endpoints directly using Swagger:
1. Make sure backend is running
2. Go to: `http://localhost:3000/api`
3. You can test all CRUD operations for Projects, Users, and Tasks
