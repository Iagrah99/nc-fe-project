# 📰 NC News — Full Stack News Aggregator (Frontend)

## Project Summary

NC News is a full-stack news platform built using the PERN stack. It allows users to browse, interact with, and manage articles and their comments, and more!

## 🌐 Live Site

Access the site <a href="https://nc-news-uk.netlify.app" target="_blank">here</a>.

## 🗄️ Backend 

Access the Backend Source Code <a href="https://github.com/Iagrah99/nc-news-be" target="_blank"> here </a>

## 🚀 Features

### 🔐 Authentication

- Login as a registered user or continue as a guest.
- Passwords are encrypted with bcrypt and stored securely in the database.

### 📚 Articles

- View all articles, filter by topic, and sort by date, comment count, or votes.
- Authenticated users can create, edit, and delete their own articles.

### 💬 Comments

- Leave comments on articles.
- Users can edit or delete their own comments.
- Comments are voteable (upvote/downvote).
- User homepage showcases their most popular comments.

### 👤 User Profiles

- View any user's public profile.
- Displays profile picture, username, name, join date, and real-time online status.
- Statistics: Total articles, comments, and cumulative karma from votes.

## ⚙️ Tech Stack
### 🖥️ Frontend:
- React (Vite)
- Axios for API communication
- Tailwind CSS + custom CSS for styling
- Date-fns for date formatting
- Responsive design implemented using Tailwind's utility classes and media breakpoints

### 🗄️ Backend:
- Node.js & Express
- PostgreSQL for relational data
- pg-format for SQL query formatting
- Jest for testing
- bcrypt for secure password hashing

### ☁️ Hosting & Deployment
- Frontend: Hosted on Netlify
- Backend API: Deployed via Fly.io
- Database: Hosted on Supabase (PostgreSQL)

### 🧪 Testing
- The backend is thoroughly tested with Jest.
- Tests cover API endpoints, error responses, and edge cases.

## Instructions

If you wish to run a local version of this project on your computer, read the following instructions.

### Minimum Installation Requirements

<ul>
  <li><a href="https://nodejs.org/en" target="_blank">Node.js</a> - Version v21.2.0</li>
</ul>

1. Start by forking the project repository, and open up a terminal. Then do the following steps:

    1A. Clone the repository to your local machine

    ```bash
    git clone https://github.com/Iagrah99/nc-fe-project
    ```

    1B. Change from the current directory into the project folder

    ```bash
    cd nc-fe-project
    ```

    1C. Open up the folder in VS Code

    ```bash
    code .
    ```

2. Now let's verify you have Node installed. Inside VSCode open a terminal window <kbd>CTRL/CMD SHIFT `</kbd>. Then do the following steps:

    2A. Run the check version command for Node
    
    ```
      node --version
    ```
    
    2B.  Once the version is verified, we can install our dependencies by running the following Node Package Manager (NPM) command: 
  
    ```
      npm install
    ```

   2C.  Now the dependencies are installed, we can run the project using the following command:
  
    ```
      npm run dev
    ```
    
Now you should be good to go! 
