

# Simple Todo Manager

## Overview

**SimpleTodoManager** is a straightforward task management application that allows users to create, update, delete, and track their daily to-dos. Built using the MERN stack, it offers a clean interface for managing tasks efficiently, making it ideal for personal use or small-scale project management.

### Features

- **Task Management**:
  - Create new tasks with titles and descriptions.
  - Mark tasks as completed.
  - Edit or update existing tasks.
  - Delete tasks when no longer needed.

- **User Authentication**:
  - Register and log in to manage your personal tasks.
  - Each user has their own list of tasks.

- **Responsive Design**:
  - The application is responsive and works seamlessly across desktop and mobile devices.

### Tech Stack

- **Frontend**:  
  React.js for building the user interface with Chakra UI for styling.

- **Backend**:  
  Node.js with Express.js to manage API endpoints and business logic.

- **Database**:  
  MongoDB to store user data and tasks.

### Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DrLivesey-Shura/SimpleTodoManager.git
   cd SimpleTodoManager
   ```

2. Install dependencies for both the client and server:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - MongoDB connection string
   - JWT secret for user authentication

4. Start the servers:
   - **Backend**:
     ```bash
     cd server
     npm start
     ```
   - **Frontend**:
     ```bash
     cd client
     npm start
     ```

### Usage

- **User Tasks**:
  - Register or log in to access your personal task list.
  - Add new tasks, edit existing ones, mark tasks as complete, or delete tasks.
  
### Contributing

Contributions are welcome! Feel free to submit issues and pull requests to improve the project or suggest new features.
