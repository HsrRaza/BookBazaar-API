# BookBazaar-API
📚 Online Bookstore API
A full-featured backend API for an online bookstore where users can browse, purchase, and review books. The system is designed to simulate a lightweight e-commerce backend with real-world design patterns, authentication, middleware, and structured data handling using Prisma and PostgreSQL.

🎯 End Goal
✅ JWT-based user authentication & authorization

✅ Full CRUD for books, reviews, and orders

✅ API key generation to secure book and order access

✅ Middleware for authentication, API key, and admin access

✅ Postman collection with all endpoints

💳 Bonus: Razorpay payment integration & cart functionality

📊 Database Tables
users

api_keys

books

reviews

orders

cart_items (bonus enhancement)

payments (bonus for Razorpay mock integration)

🧾 API Routes Overview
🔐 Auth & API Key
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Log in user and get token
POST	/auth/api-key	Generate new API key
GET	/auth/me	Get logged-in user profile

📚 Book Routes
Method	Endpoint	Description
POST	/books	Add a new book (Admin only)
GET	/books	List all books (filters supported)
GET	/books/:id	Get book details by ID
PUT	/books/:id	Update book (Admin only)
DELETE	/books/:id	Delete book (Admin only)

✍️ Review Routes
Method	Endpoint	Description
POST	/books/:bookId/reviews	Add a review to a book
GET	/books/:bookId/reviews	List reviews for a book
DELETE	/reviews/:id	Delete review (owner only)

🛒 Order Routes
Method	Endpoint	Description
POST	/orders	Place an order
GET	/orders	List user’s orders
GET	/orders/:id	View order details

💳 Payment Mock API (Bonus)
Method	Endpoint	Description
POST	/payments/create	Create fake Razorpay payment ID
POST	/payments/verify	Verify mock payment

🛡️ Security & Middleware
🔐 JWT auth required for all protected routes

🛂 Admin middleware for book creation and deletion

🔑 API Key middleware for /books, /orders, and /payments routes

💡 Bonus Enhancements
💳 Razorpay integration (mock/real) with callback simulation

🔍 Book search, sort, filter (e.g., by title, author, genre)

🛒 Cart system via cart_items table

🔁 Pagination for listing books/reviews/orders

📧 Email confirmation after placing an order (Mailtrap or real)

✅ Deliverables Checklist
 Auth + API Key (JWT, key generation)

 Book CRUD with Admin checks

 Review & Order functionality

 Middleware (JWT, API Key, Admin)

 DB structure & Prisma relationships

 Clean, modular code structure

 Complete Postman collection

 Bonus: Razorpay, cart, filters, pagination, email

🚀 Tech Stack
Node.js, Express, TypeScript

Prisma ORM + PostgreSQL

Zod for validation

JWT, bcrypt for security

Docker for containerization

Razorpay for mock payment flows

📦 Project Setup
bash
Copy
Edit
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run Postgres via Docker
docker-compose up -d

# Migrate database
npx prisma migrate dev --name init

# Start the server
npm run dev
