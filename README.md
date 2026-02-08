 Bir Kadam E-commerce Platform - WEB Technologies 2 (Back End) Final Project

A full-stack e-commerce application built with Node.js, Express, MongoDB, and React, showcasing advanced NoSQL database features and a robust, scalable architecture. This platform is designed to support multiple user roles, including a new Seller role, and is branded as Bir Kadam.

🎯 Project Overview

This project demonstrates advanced MongoDB features and modern web development practices, now enhanced with:

•
New User Role (Seller): Introduced a dedicated 'Seller' role with specific permissions for product management, expanding the platform to a multi-vendor model.

•
Bir Kadam Branding: The application's branding has been updated to 'Bir Kadam', reflecting a unique identity and cohesive user experience.

•
Enhanced Security with bcrypt: All user passwords are now securely hashed using bcrypt for improved data protection, preventing plaintext password storage.

•
MongoDB Atlas Integration: The database is integrated with MongoDB Atlas, providing a cloud-hosted, scalable, and highly available NoSQL solution.

•
Deployment Ready: The application is configured for seamless deployment to production environments, adhering to best practices for environment variables and process management.

Key MongoDB features utilized include:

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

🚀 Setup Instructions

To get the Bir Kadam E-commerce Platform up and running on your local machine, follow these steps:

Prerequisites

•
Node.js 18+ and npm (Node Package Manager)

•
MongoDB (local installation or a MongoDB Atlas Cloud Database account)

Backend Setup

1.
Navigate to the server directory in your terminal:

Bash


cd server





2.
Install backend dependencies:

Bash


npm install





3.
Create a .env file in the server/ directory and configure your environment variables. An example is provided below:

Plain Text


MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/shoe_store?retryWrites=true&w=majority # Example for Atlas
JWT_SECRET=your_super_secret_key_change_in_production
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000



Note: Replace <username>, <password>, and <cluster-url> with your actual MongoDB Atlas credentials. For local MongoDB, use mongodb://localhost:27017/shoe_store.



4.
Seed the database (optional, for initial data and test accounts ):

Bash


npm run seed # Assuming seed script is configured in package.json





5.
Start the backend server:

Bash


npm run dev



The server will run on http://localhost:5000.



Frontend Setup

1.
Navigate to the client directory in a separate terminal:

Bash


cd client2





2.
Install frontend dependencies:

Bash


npm install





3.
Create a .env file in the client2/ directory and add the API URL:

Plain Text


REACT_APP_API_URL=http://localhost:5000/api





4.
Start the React development server:

Bash


npm start



The React application will run on http://localhost:3000.



📚 API Documentation

The Bir Kadam platform exposes a comprehensive set of RESTful APIs for authentication, product management, order processing, and analytics. All protected routes require a valid JSON Web Token (JWT ) in the Authorization: Bearer <token> header.

Authentication Endpoints

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
POST /api/products: Creates a new product (Admin/Seller).

•
GET /api/products: Retrieves all products, with support for filtering, searching, and pagination.

•
GET /api/products/featured: Fetches a list of featured products.

•
GET /api/products/:id: Retrieves a specific product by its ID.

•
PATCH /api/products/:id: Updates details of a specific product (Admin/Seller).

•
PATCH /api/products/:id/stock: Updates product stock using MongoDB's $inc operator (Admin/Seller).

•
DELETE /api/products/:id: Deletes a specific product (Admin/Seller).

•
POST /api/products/:id/reviews: Adds a review to a product (Protected).

Order Management Endpoints

•
POST /api/orders: Creates a new order (Protected).

•
GET /api/orders/me: Retrieves the current user's order history (Protected).

•
GET /api/orders/:id: Retrieves details for a specific order (Protected).

•
GET /api/orders: Retrieves all orders (Admin).

•
PATCH /api/orders/:id/status: Updates the status of an order (Admin).

•
DELETE /api/orders/:id: Allows a user to cancel their order (Protected).

Analytics Endpoints (Admin Only)

•
GET /api/stats/revenue: Provides revenue breakdown by category using advanced aggregation pipelines.

•
GET /api/stats/top-rated: Lists top-rated products based on customer reviews.

•
GET /api/stats/best-sellers: Identifies best-selling products.

•
GET /api/stats/sales-trends: Analyzes sales data over time.

•
GET /api/stats/inventory: Generates a low stock report.

•
GET /api/stats/customers: Lists top customers based on purchase history.

✨ Key Features & Screenshots

1. Home Page (Bir Kadam Branding)

The landing page features the new 'Bir Kadam' branding, a hero section, and displays featured products and categories, providing an inviting entry point for users.






Figure 1: The Bir Kadam home page, showcasing the brand logo and featured products.

2. Product Detail Page with Reviews

Detailed product view allowing users to select colors and sizes, add to cart, and submit reviews. Includes dynamic image display based on color selection.






Figure 2: A product detail page displaying various options and customer reviews.

3. Shopping Cart & Checkout Flow

A seamless shopping cart experience with quantity controls, order summary, and a multi-step checkout process for placing orders.






Figure 3: The shopping cart interface, showing selected items and subtotal.






Figure 4: The checkout page, where users enter shipping information and select payment methods.

4. User Profile & Order History

Users can manage their profile information, including address and phone number, and view their complete order history with status updates.






Figure 5: User profile section displaying personal information and past orders.

5. Admin & Seller Dashboard (Role-Based Access Control)

Dedicated dashboards for Admin and Seller roles to manage products (CRUD operations), view orders, and access sales analytics. Sellers have restricted access to only their products, demonstrating Role-Based Access Control (RBAC).






Figure 6: The Admin Dashboard, providing an overview of products, orders, and analytics.

6. Secure Authentication (bcrypt)

User registration and login processes are secured using bcrypt for password hashing, ensuring sensitive data is protected against unauthorized access.






Figure 7: The login interface, secured with bcrypt password hashing.

🔐 Test Credentials

After running npm run seed (or node seed.js) to populate the database:

Admin Account:

•
Email: admin@birkadam.com

•
Password: admin123

Seller Account:

•
Email: seller@birkadam.com

•
Password: seller123

User Account:

•
Email: john@example.com

•
Password: password123

📁 Project Structure

The project follows a modular structure with separate directories for frontend (client2/) and backend (server/) components, ensuring clear separation of concerns and maintainability.

Plain Text


SHOE-STORE-PROJECT/
├── server/
│   ├── config/                    # MongoDB connection and other configurations
│   ├── controllers/               # Business logic for API endpoints
│   ├── models/                    # Mongoose schemas for MongoDB collections
│   ├── routes/                    # API route definitions
│   ├── middleware/                # Authentication (JWT) and error handling middleware
│   ├── .env                       # Environment variables for sensitive data
│   ├── server.js                  # Backend entry point
│   ├── seed.js                    # Database seeder for initial data
│   └── package.json               # Backend dependencies and scripts
│
└── client2/
    ├── src/
    │   ├── components/          # Reusable React components
    │   ├── pages/               # Main application pages (Home, Shop, ProductDetail, etc.)
    │   ├── contexts/            # React Context API for global state management (Auth, Cart)
    │   ├── services/            # Axios API calls to the backend
    │   ├── styles/              # CSS files for styling
    │   └── App.js               # Main React application component
    └── package.json           # Frontend dependencies and scripts



☁️ Deployment

The Bir Kadam platform is designed for cloud deployment, separating the frontend and backend for optimal performance and scalability. This project can be deployed to platforms like Render, Replit, Railway, Heroku, Vercel, or AWS.

Key Deployment Considerations:

•
Environment Variables: All sensitive information (e.g., MONGODB_URI, JWT_SECRET) MUST be configured as environment variables in the deployment environment, not hardcoded.

•
CORS: Properly configure Cross-Origin Resource Sharing (CORS) to allow secure communication between your frontend and backend applications.

•
Build Process: The frontend (React app) requires a build step (npm run build) to generate optimized static assets for production deployment.

•
Process Manager: For Node.js backend applications, using a process manager like PM2 is recommended to ensure high availability, automatic restarts, and efficient resource management.

🎓 Learning Outcomes

This project demonstrates comprehensive understanding and application of:
✅ Advanced NoSQL database design principles
✅ Effective use of Embedded vs. Referenced data strategies in MongoDB
✅ Complex schema validation for data integrity
✅ Index optimization techniques for efficient query performance
✅ Mastery of MongoDB's Aggregation Framework for data analysis
✅ Implementation of advanced update operators ($inc, $push)
✅ Full-stack JavaScript development using the MERN stack
✅ RESTful API design and implementation
✅ Secure JWT authentication with bcrypt password hashing
✅ React state management and responsive UI design
✅ Role-Based Access Control (User, Seller, Admin)
✅ Cloud database integration (MongoDB Atlas)
✅ Deployment readiness and best practices

🔗 References

[1] MongoDB Documentation:
[2] React Documentation:
[3] Express.js Documentation:
[4] bcrypt.js GitHub:
[5] JWT (JSON Web Tokens) Official Website:
