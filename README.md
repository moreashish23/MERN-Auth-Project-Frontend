# PostSphere Frontend

A modern **React + Redux Toolkit** frontend for PostSphere — a full-stack MERN application that allows users to create, explore, and manage tech posts with authentication and authorization.

---

##  Live Features

-  User Authentication (Login / Signup)
-  Email Verification (OTP)
-  Create, Edit, Delete Posts
-  Public Feed (Explore posts)
-  User Dashboard (Manage posts)
-  Responsive UI (Mobile → Desktop)
-  Dark Theme UI

---

##  Tech Stack

-  React (Vite)
-  Redux Toolkit
-  React Router DOM
-  Tailwind CSS
-  React Hot Toast
-  Axios

---

src/
├── api/ # Axios config
├── app/ # Redux store
├── features/
│ ├── auth/ # Auth logic
│ └── posts/ # Post CRUD logic
├── components/ # Reusable UI components
├── pages/ # Home, Login, Signup, Dashboard
├── routes/ # Protected routes
└── utils/ # Helpers

##  Setup & Installation

### 1️ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/postsphere-frontend.git
cd postsphere-frontend
2️⃣ Install dependencies
npm install
3️⃣ Create .env file

Create a .env file in the root directory:

VITE_API_URL=http://localhost:5000/api
4️⃣ Run the app
npm run dev
 Environment Variables
Variable	Description
VITE_API_URL	Backend API base URL
🔄 API Integration

The frontend connects to the backend using Axios:

const API = import.meta.env.VITE_API_URL;

📱 Responsive Design
Device	Layout
Mobile	1 column
Tablet	2 columns
Desktop	3 columns

 UI Design
Dark Theme (Tech UI)
Tailwind CSS based
Consistent card layout
Smooth hover & focus states


 Authentication Flow
User Signup
Verification Code Sent
Verify Account
Login
JWT Token stored
Protected Routes enabled


## 📂 Project Structure
