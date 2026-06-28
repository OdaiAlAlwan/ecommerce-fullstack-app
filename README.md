# E-Commerce Full-Stack Application

## 📝 Project Description
A complete, full-stack E-commerce web application developed using modern web development technologies. This application is designed as a comprehensive academic/graduation project. It provides a seamless shopping experience for users, along with a robust, fully-featured admin dashboard for managing products, categories, orders, and users.

## 🚀 Tech Stack

### 💻 Frontend
- **React.js (Vite)**: For building a fast, highly-performant user interface.
- **Redux Toolkit**: For centralized state management.
- **Tailwind CSS & Styled-Components**: For modern, attractive, and fully responsive UI design.
- **React Router DOM**: For smooth and dynamic client-side routing.
- **React Hook Form**: For efficient form handling and validation.
- **Axios**: For making API requests to the backend server.

### ⚙️ Backend & Database
- **Node.js & Express.js (v5)**: For server-side programming and developing RESTful APIs efficiently.
- **MongoDB & Mongoose**: As a flexible NoSQL database for data storage and management.
- **JWT (JSON Web Tokens)**: For secure user authentication and authorization.
- **Bcrypt.js**: For password hashing and securing user credentials.
- **Multer & Sharp**: For uploading, compressing, and processing product images.
- **Nodemailer**: For sending notifications and emails (e.g., password reset).

## ✨ Key Features
- **User Authentication:** Login, registration, password recovery, and profile management.
- **Shopping Experience:** Browse, categorize, search, and rate products.
- **Shopping Cart:** Add/remove items and proceed to a secure checkout.
- **Order Management:** Users can track their orders, and admins can manage order statuses.
- **Admin Dashboard:** A dedicated panel to add, edit, or delete products and categories, as well as manage user roles and permissions.

## 🛠️ How to Run Locally

### 1️⃣ Prerequisites
- Install [Node.js](https://nodejs.org/) on your machine.
- Have a [MongoDB](https://www.mongodb.com/) database running (either locally or a cloud cluster via MongoDB Atlas).

### 2️⃣ Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd ecommerce-fullstack-app
   ```

2. **Install all dependencies:**
   The project includes a unified script to install dependencies for the root, frontend, and backend all at once:
   ```bash
   npm run install-all
   ```

3. **Set up Environment Variables:**
   Make sure you have a `config.env` file inside the `backend/config` directory, and ensure it contains the required configurations (update them based on your environment):
   ```env
   PORT=8000
   NODE_ENV=development
   DB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=90d
   ```

### 3️⃣ Starting the App
Thanks to `concurrently`, you can start both the backend server and the frontend client simultaneously from the root directory with a single command:
```bash
npm run dev
```

- **Frontend Client:** Will typically run on `http://localhost:5173`.
- **Backend Server:** Will run on `http://localhost:8000` (or the port defined in your config.env).

---
*This repository is structured to provide a comprehensive and professional overview of the project, making it fully ready for academic presentation and evaluation.*
