# Omni University

Omni University is an online training platform tailored for business use. It leverages the MERN stack (MongoDB, Express.js, React, Node.js) to provide a robust, user-friendly, and scalable solution for employee training and development.

## Features

- User roles: Employees, Shift Leads, Managers, Admins, Owners
- Secure login with options for Google and Facebook OAuth
- Course management and tracking for user progress
- Customizable user dashboards based on roles
- Responsive and engaging UI built with React

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- MongoDB
- npm or yarn

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository:
   ```
   git clone https://github.com/RBMarketing1011/omni_university.git
   ```
2. Install backend dependencies:
   ```
   cd omni_university/backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```
4. Setup Your .env for enironment variables (need NODE_ENV, PORT, MONGO_URI, SESSION_SECRET, JWT_SECRET)
5. Run the backend server:
   ```
   npm start
   ```
6. Run the frontend application:
   ```
   cd ../frontend
   npm start
   ```
7. Visit `http://localhost:3000` in your browser.
8. OR to run production build
   ```
   change .env NODE_ENV to 'production'
   
   cd backend
   npm run server
   ```
9. Visit `http://localhost:5173` in your browser.

## Usage

### This app is used as a training platform for restaurants. The 'Admin' or 'Manager' roles can create all CRUD operation on Users, Courses, and Videos
### Users can not create their own accounts, an admin or manager must create their account for them

## License

This project is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License - see the [LICENSE.md](License.md) file for details.

## Acknowledgments

- Big thanks to Colt Steele and Brad Traversy who have helped me grow in my development carrer.
