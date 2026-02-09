# BirQadam E-commerce Platform - Final Project

A full-stack e-commerce application built with Node.js, Express, MongoDB, and React, showcasing advanced NoSQL database features and a robust, scalable architecture. This platform is designed to support multiple user roles, including a new Seller role, and is branded as BirQadam.

## 🎯 Project Overview

This project demonstrates advanced MongoDB features and modern web development practices, now enhanced with:

•
New User Role (Seller): Introduced a dedicated 'Seller' role with specific permissions for product management, expanding the platform to a multi-vendor model.

•
BirQadam Branding: The application's branding has been updated to 'BirQadam', reflecting a unique identity and cohesive user experience.

•
Enhanced Security with bcrypt: All user passwords are now securely hashed using bcrypt for improved data protection, preventing plaintext password storage.

•
MongoDB Atlas Integration: The database is integrated with MongoDB Atlas, providing a cloud-hosted, scalable, and highly available NoSQL solution.

•
Deployment Ready: The application is configured for seamless deployment to production environments, adhering to best practices for environment variables and process management.

## Key MongoDB features utilized include:

•
Embedded Documents (colors, sizes, reviews in products)

•
Document References (users, orders, products)

•
Compound Indexes (brand + price, category + rating)

•
Text Search Indexes (full-text search on products)

•
Aggregation Pipelines (revenue analytics, top-rated products)

•
Advanced Update Operators ($inc for stock, $push for reviews)

•
Complex Validation (nested schema validation)

•
Virtual Properties (calculated fields)

•
Pre/Post Hooks (auto-calculations, password hashing)

## 🚀 Setup Instructions

To get the BirQadam E-commerce Platform up and running on your local machine, follow these steps:

Prerequisites

•
Node.js 18+ and npm (Node Package Manager)

•
MongoDB (local installation or a MongoDB Atlas Cloud Database account)

## Backend Setup

1.
Navigate to the server directory in your terminal:


cd server





2.
Install backend dependencies:



npm install





3.
Configure Environment Variables:
Create a .env file in the server/ directory. IMPORTANT: Never commit this file to GitHub. It is already added to .gitignore.

Plain Text


## Database Configuration
MONGODB_URI=mongodb+srv://alinalead_db_user:alina2007@1qadam.1rgtson.mongodb.net/shoe_store

## JWT Secret
JWT_SECRET=kfjjjsvk375894gips90

## Server Configuration
PORT=5000
NODE_ENV=development

## Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000



Note: The MONGODB_URI provided is for the Bir Kadam MongoDB Atlas cluster.



4.
Seed the database (optional, for initial data and test accounts ):



npm run seed # Assuming seed script is configured in package.json





5.
Start the backend server:


npm run dev



The server will run on http://localhost:5000.



Frontend Setup

1.
Navigate to the client directory in a separate terminal:

cd client2





2.
Install frontend dependencies:

npm install





3.
Create a .env file in the client2/ directory and add the API URL:

Plain Text


REACT_APP_API_URL=http://localhost:5000/api





4.
Start the React development server:

npm start



The React application will run on http://localhost:3000.



## 📚 API Documentation

The BirQadam platform exposes a comprehensive set of RESTful APIs for authentication, product management, order processing, and analytics. All protected routes require a valid JSON Web Token (JWT ) in the Authorization: Bearer <token> header.

## Authentication Endpoints

•
POST /api/auth/register: Registers a new user with encrypted passwords. Supports user and seller roles.

•
POST /api/auth/login: Authenticates users and returns a JWT for secure session management.

•
GET /api/auth/me: Retrieves the logged-in user's profile details (Protected).

•
PUT /api/auth/profile: Allows users to update their profile information (Protected).

Product Management Endpoints

•
POST /api/products: Creates a new order (Protected).

• GET /api/orders/me: Retrieves the current user's order history (Protected).

• GET /api/orders/:id: Retrieves details for a specific order (Protected).

• GET /api/orders: Retrieves all orders (Admin).

• PATCH /api/orders/:id/status: Updates the status of an order (Admin).

• DELETE /api/orders/:id: Allows a user to cancel their order (Protected).

Analytics Endpoints (Admin Only)

• GET /api/stats/revenue: Provides revenue breakdown by category using advanced aggregation pipelines.

• GET /api/stats/top-rated: Lists top-rated products based on customer reviews.

• GET /api/stats/best-sellers: Identifies best-selling products.

• GET /api/stats/sales-trends: Analyzes sales data over time.

• GET /api/stats/inventory: Generates a low stock report.

• GET /api/stats/customers: Lists top customers based on purchase history.

✨ Key Features & Screenshots

Home Page (BirQadam Branding)
The landing page features the new 'BirQadam' branding, a hero section, and displays featured products and categories, providing an inviting entry point for users.
<img width="941" height="537" alt="image" src="https://github.com/user-attachments/assets/66629380-2601-497e-a380-1e3b2c5cbf9f" />

Figure 1: The BirQadam home page, showcasing the brand logo and featured products.

Product Detail Page with Reviews
Detailed product view allowing users to select colors and sizes, add to cart, and submit reviews. Includes dynamic image display based on color selection.
<img width="945" height="531" alt="image" src="https://github.com/user-attachments/assets/a0b88854-0041-411b-b35b-f95001dade6a" />
<img width="946" height="519" alt="image" src="https://github.com/user-attachments/assets/89d109d0-ce40-4973-bbe9-5f3fe7f766e4" />
Figure 2: A product detail page displaying various options and customer reviews.

Shopping Cart & Checkout Flow
A seamless shopping cart experience with quantity controls, order summary, and a multi-step checkout process for placing orders.
<img width="940" height="516" alt="image" src="https://github.com/user-attachments/assets/a80f9dc8-b04c-4759-b556-3e96d8186463" />
Figure 3: The shopping cart interface, showing selected items and subtotal.
<img width="950" height="541" alt="image" src="https://github.com/user-attachments/assets/6f31efd5-bffa-4315-9a71-55c1a1f3abbe" />
Figure 4: The checkout page, where users enter shipping information and select payment methods.

User Profile & Order History
Users can manage their profile information, including address and phone number, and view their complete order history with status updates.
<img width="941" height="544" alt="image" src="https://github.com/user-attachments/assets/278a6dd6-d87a-4e26-ae22-e8c3784f9b6a" />
Admin & Seller Dashboard (Role-Based Access Control)
Dedicated dashboards for Admin and Seller roles to manage products (CRUD operations), view orders, and access sales analytics. Sellers have restricted access to only their products, demonstrating Role-Based Access Control (RBAC).
Figure 6: The Admin Dashboard, providing an overview of products, orders, and analytics.
<img width="941" height="536" alt="image" src="https://github.com/user-attachments/assets/b2fae03e-5033-434c-a489-73f6b75bb5e1" />

6. Secure Authentication (bcrypt)

User registration and login processes are secured using bcrypt for password hashing, ensuring sensitive data is protected against unauthorized access.



<img width="768" height="599" alt="image" src="https://github.com/user-attachments/assets/21e867c5-5707-4b55-aae9-ba95f1359cc7" />



Figure 7: The login interface, secured with bcrypt password hashing.

## 🔐 Test Credentials

After running npm run seed (or node seed.js) to populate the database:

### Admin Account:

•
Email: admin@shoestore.com

•
Password: admin123

### Seller Account:

•
Email: seller_aliya@shoestore.com
•
Password: seller123

•
Email:seller_karima@shoestore.com
•
Password: karima123

### User Account:

•
Email: john@example.com

•
Password: password123

## 📁 Project Structure

The project follows a modular structure with separate directories for frontend (client2/) and backend (server/) components, ensuring clear separation of concerns and maintainability.

Plain Text


## 📁 Project Structure

## 📁 Project Structure

```
SHOE-STORE-PROJECT
│
├── server/
│   ├── config/         # MongoDB connection and configuration
│   ├── controllers/    # API business logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── middleware/     # Auth & error handlers
│   ├── seed.js         # Database seeder
│   ├── server.js       # Backend entry point
│   └── package.json
│
└── client2/
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Main app pages
    │   ├── contexts/   # React context (Auth, Cart)
    │   ├── services/   # API calls
    │   ├── styles/     # CSS files
    │   └── App.js
    │
    └── package.json
```




#☁️ Deployment

The BirQadam platform is designed for cloud deployment, separating the frontend and backend for optimal performance and scalability. This project can be deployed to platforms like Render, Replit, Railway, Heroku, Vercel, or AWS.

## Key Deployment Considerations:

•
Environment Variables: All sensitive information (e.g., MONGODB_URI, JWT_SECRET) MUST be configured as environment variables in the deployment environment, not hardcoded.

•
CORS: Properly configure Cross-Origin Resource Sharing (CORS) to allow secure communication between your frontend and backend applications.

•
Build Process: The frontend (React app) requires a build step (npm run build) to generate optimized static assets for production deployment.

•
Process Manager: For Node.js backend applications, using a process manager like PM2 is recommended to ensure high availability, automatic restarts, and efficient resource management.

## 🎓 Learning Outcomes

This project demonstrates practical understanding and application of:

- Advanced NoSQL database design principles  
- Embedded vs Referenced data strategies in MongoDB  
- Complex schema validation for data integrity  
- Index optimization for efficient query performance  
- MongoDB Aggregation Framework for analytics  
- Advanced update operators (`$inc`, `$push`)  
- Full-stack JavaScript development (MERN stack)  
- RESTful API design and implementation  
- Secure JWT authentication with bcrypt password hashing  
- React state management and responsive UI design  
- Role-Based Access Control (User, Seller, Admin)  
- Cloud database integration (MongoDB Atlas)  
- Deployment readiness and production best practices
