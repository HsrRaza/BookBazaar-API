 # 📚 BookBazaar-API

An advanced RESTful API for an online bookstore where users can browse, purchase, and review books. Designed using best practices in modern backend development — with authentication, middleware, data validation, and payment integration.

![BookBazaar Banner](https://your-image-link.com/banner.png)

🔗 **Live API**: [https://bookbazaar-api.vercel.app](https://bookbazaar-api.vercel.app)

---

## 🎯 Features

- ✅ JWT-based authentication & authorization
- ✅ Full CRUD for books, reviews, orders
- ✅ API key generation for protected access
- ✅ Admin-only routes with middleware protection
- ✅ Postman collection included for testing
- ✅ Bonus: Razorpay mock payment & cart system

---

## 🗂️ Database Schema

| Table         | Description                          |
|---------------|--------------------------------------|
| `users`       | User info with roles and auth data   |
| `api_keys`    | Unique keys for route protection     |
| `books`       | Catalog of books                     |
| `reviews`     | User reviews for books               |
| `orders`      | Purchase orders                      |
| `cart_items`  | User cart details (bonus)            |
| `payments`    | Razorpay mock payments (bonus)       |

---

## 🧾 API Routes Overview

### 🔐 Auth & API Key

| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| POST   | `/auth/register` | Register new user             |
| POST   | `/auth/login`    | Log in & get JWT token        |
| POST   | `/auth/api-key`  | Generate new API key          |
| GET    | `/auth/me`       | Get current user info         |

### 📚 Book Routes

| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| POST   | `/books`         | Add new book (Admin only)     |
| GET    | `/books`         | List all books (with filters) |
| GET    | `/books/:id`     | Get book details by ID        |
| PUT    | `/books/:id`     | Update book (Admin only)      |
| DELETE | `/books/:id`     | Delete book (Admin only)      |

### ✍️ Review Routes

| Method | Endpoint                        | Description                 |
|--------|----------------------------------|-----------------------------|
| POST   | `/books/:bookId/reviews`        | Add review to a book        |
| GET    | `/books/:bookId/reviews`        | List reviews for a book     |
| DELETE | `/reviews/:id`                  | Delete review (owner only)  |

### 🛒 Order Routes

| Method | Endpoint         | Description                 |
|--------|------------------|-----------------------------|
| POST   | `/orders`        | Place an order              |
| GET    | `/orders`        | List user’s orders          |
| GET    | `/orders/:id`    | View specific order details |

         |

---

## 🛡️ Middleware & Security

- 🔐 JWT auth for protected routes
- 🛂 Admin-only access for book operations
- 🔑 API Key middleware for sensitive endpoints
- 🧪 Zod for request validation

---

## 💡 Bonus Enhancements

- 🔍 Book search, filter, sort
- 🛒 Cart system
- 🔁 Pagination for lists
- 📧 Email confirmation (Mailtrap or SMTP)

---

## ✅ Deliverables Checklist

- [x] Auth + API Key protection  
- [x] Book CRUD with Admin access  
- [x] Reviews & Orders support  
- [x] Secure Middleware implementation  
- [x] Database structure with Prisma  
- [x] Docker support  
- [x] Postman collection  
- [x] Razorpay + Cart + Email (bonus)

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express, TypeScript  
- **Database**: PostgreSQL + Prisma ORM  
- **Security**: JWT, bcrypt  
- **Validation**: Zod  
- **Payment**: Razorpay (mock)  
- **Email**: Mailtrap  
- **DevOps**: Docker, Docker Compose

---

## 📦 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/BookBazaar-API.git
cd BookBazaar-API

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 4. Run Postgres using Docker
docker-compose up -d

# 5. Migrate DB
npx prisma migrate dev --name init

# 6. Start the dev server
npm run dev
