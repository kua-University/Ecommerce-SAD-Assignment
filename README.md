# 🛍️ E-Commerce Platform

> A full-stack e-commerce application built with **React** (Frontend) and **Spring Boot** (Backend), featuring JWT authentication, product management, shopping cart, order processing, admin dashboard, and newsletter subscriptions.

[![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)](https://adoptium.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1-brightgreen?style=flat-square&logo=spring)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=flat-square&logo=docker)](https://www.docker.com/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start with Docker](#-quick-start-with-docker)
- [Local Development Setup](#-local-development-setup)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Authentication & Security](#-authentication--security)
- [Default Credentials](#-default-credentials)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Authentication** | Register & login with secure JWT tokens |
| 🛒 **Shopping Cart** | Add/remove items, update quantities with Context API |
| 📦 **Product Catalog** | Browse, search, and view detailed product pages |
| 🧾 **Order Management** | Place orders and view complete order history |
| 📊 **Admin Dashboard** | Manage users, products, and orders (Admin only) |
| 🏪 **Seller Dashboard** | Sellers can add, edit, and delete their own products |
| 📧 **Newsletter Subscription** | Subscribe to receive promotional emails |
| 📱 **Responsive Design** | Mobile-friendly UI with Tailwind CSS |

---

## 🚀 Technology Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Core language |
| Spring Boot | 3.1 | REST API framework |
| Spring Security | 6.x | Authentication & Authorization |
| Spring Data JPA | — | Database ORM |
| PostgreSQL | 15 | Relational database |
| JWT (jjwt) | — | Stateless token-based auth |
| Maven | — | Dependency management |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI library |
| Vite | — | Build tool & dev server |
| React Router DOM | v6 | Client-side routing |
| Axios | — | HTTP API client |
| Tailwind CSS | — | Utility-first styling |
| Context API | — | Cart state management |

### DevOps
| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-service orchestration |
| Maven | Backend build & packaging |

---

## 📁 Project Structure

```
ecommerce-platform/
│
├── docker-compose.yml            # Multi-container orchestration
│
├── backend/                      # Spring Boot REST API
│   ├── Dockerfile
│   ├── pom.xml                   # Maven dependencies
│   └── src/main/
│       ├── resources/
│       │   └── application.properties
│       └── java/com/ecommerce/
│           ├── EcommerceApplication.java
│           ├── config/           # CORS & Security configuration
│           ├── controller/       # REST controllers
│           │   ├── AuthController.java
│           │   ├── ProductController.java
│           │   ├── OrderController.java
│           │   ├── AdminController.java
│           │   └── NewsletterController.java
│           ├── dto/              # Request/Response DTOs
│           ├── model/            # JPA entities
│           ├── repository/       # Spring Data repositories
│           ├── security/         # JWT filter & utilities
│           └── service/          # Business logic layer
│
└── frontend/                     # React SPA
    ├── Dockerfile
    ├── package.json
    ├── tailwind.config.js
    └── src/
        ├── main.jsx              # App entry point
        ├── App.jsx               # Route definitions
        ├── context/              # CartContext (global state)
        └── components/
            ├── Navbar.jsx        # Global navigation bar
            └── pages/
                ├── HomePage.jsx
                ├── ProductsPage.jsx
                ├── CartPage.jsx
                ├── CheckoutPage.jsx
                ├── LoginPage.jsx
                ├── RegisterPage.jsx
                ├── AboutPage.jsx
                ├── SellerDashboard.jsx
                └── admin/
                    ├── AdminLogin.jsx
                    └── AdminDashboard.jsx
```

---

## 📦 Prerequisites

Before you begin, make sure you have the following installed:

- **Docker & Docker Compose** — [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Java JDK 17+** — [Download](https://adoptium.net/) *(for local development)*
- **Maven 3.8+** — [Download](https://maven.apache.org/download.cgi) *(for local development)*
- **Node.js v18+** — [Download](https://nodejs.org/) *(for local development)*
- **PostgreSQL 14+** — [Download](https://www.postgresql.org/download/) *(for local development)*
- **Git** — [Download](https://git-scm.com/)

---

## 🐳 Quick Start with Docker

The fastest way to get the full stack running is with Docker Compose.

### 1. Clone the Repository

```bash
git clone https://github.com/yabsrashimels/Ecommerce-SAD-Assignment.git
cd ecommerce-platform
```

### 2. Start All Services

```bash
docker-compose up --build
```

This command will spin up three containers:

| Container | Port | Description |
|---|---|---|
| `ecommerce-postgres` | `5432` | PostgreSQL database |
| `ecommerce-backend` | `8080` | Spring Boot REST API |
| `ecommerce-frontend` | `3000` | React application |

### 3. Access the Application

| Service | URL |
|---|---|
| Frontend (React) | http://localhost:3000 |
| Backend API | http://localhost:8080/api |
| Database | `localhost:5432` (DB: `ecommerce_db`) |

### Stop the Containers

```bash
docker-compose down
```

> **Note:** Use `docker-compose down -v` to also remove the persistent database volume.

---

## 🔧 Local Development Setup

### Backend Setup

#### 1. Configure PostgreSQL

```sql
-- Log into PostgreSQL and run:
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
```

#### 2. Configure `application.properties`

Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=ecommerce_user
spring.datasource.password=your_password

# JWT Configuration
jwt.secret=your_jwt_secret_key_here_change_in_production
jwt.expiration=86400000

# Server
server.port=8080
```

#### 3. Build & Run Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend API will be available at `http://localhost:8080`

---

### Frontend Setup

#### 1. Install Dependencies

```bash
cd frontend
npm install
```

#### 2. Configure Environment

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:8080/api
```

#### 3. Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## 🏃 Running the Application

### Development Mode (All Together)

Open **three terminals** and run:

```bash
# Terminal 1 — Database (if not using Docker)
# Make sure PostgreSQL service is running

# Terminal 2 — Backend
cd backend
mvn spring-boot:run

# Terminal 3 — Frontend
cd frontend
npm run dev
```

Then open your browser at `http://localhost:5173`

### Production Build

```bash
# Backend — builds a runnable JAR
cd backend
mvn clean package
java -jar target/ecommerce-0.0.1-SNAPSHOT.jar

# Frontend — creates optimized static files in /dist
cd frontend
npm run build
```

---

## 🔌 API Endpoints

### Public Endpoints (No Authentication Required)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT token |
| `GET` | `/api/products` | Retrieve all products |
| `GET` | `/api/products/{id}` | Get a single product by ID |
| `POST` | `/api/newsletter/subscribe` | Subscribe to newsletter |

### Protected Endpoints (JWT Required)

| Method | Endpoint | Description | Role |
|---|---|---|---|
| `POST` | `/api/orders` | Place a new order | `USER` |
| `GET` | `/api/orders/my-orders` | Get current user's orders | `USER` |
| `POST` | `/api/products` | Add a new product | `SELLER` |
| `PUT` | `/api/products/{id}` | Update a product | `SELLER` |
| `DELETE` | `/api/products/{id}` | Delete a product | `SELLER` |
| `GET` | `/api/admin/users` | Get all users | `ADMIN` |
| `GET` | `/api/orders/all` | Get all orders | `ADMIN` |
| `PUT` | `/api/orders/{id}/status` | Update order status | `ADMIN` |

### Authentication Header

All protected requests must include:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📊 Database Schema

The application uses the following core entities:

```
User
  ├── id (PK)
  ├── email (unique)
  ├── password (BCrypt hashed)
  ├── firstName
  ├── lastName
  └── role  →  USER | SELLER | ADMIN

Product
  ├── id (PK)
  ├── name
  ├── description
  ├── price
  ├── stock
  ├── imageUrl
  └── sellerId (FK → User)

Order
  ├── id (PK)
  ├── userId (FK → User)
  ├── orderDate
  ├── totalAmount
  └── status  →  PENDING | PROCESSING | SHIPPED | DELIVERED

OrderItem
  ├── id (PK)
  ├── orderId (FK → Order)
  ├── productId (FK → Product)
  ├── quantity
  └── price

Subscriber
  ├── id (PK)
  ├── email (unique)
  └── subscribedAt
```

---

## 🛡️ Authentication & Security

- **JWT Tokens** — Issued on login, sent via `Authorization: Bearer` header, expire after **24 hours**
- **BCrypt Hashing** — All user passwords are hashed with BCrypt before storage
- **Role-Based Access Control** — Three roles: `USER`, `SELLER`, `ADMIN`
- **CORS** — Configured to allow requests from the React dev server (`localhost:5173`)
- **Stateless Sessions** — No server-side sessions; all state is in the JWT

#### Example Axios Interceptor (Frontend)

```javascript
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🔑 Default Credentials

> ⚠️ **Change these credentials immediately in any production deployment.**

### Admin Account

| Field | Value |
|---|---|
| Email | `admin@example.com` |
| Password | `admin` |
| Role | `ADMIN` |

The admin dashboard is accessible at `/admin` and allows full control over users, products, and orders.

---

## 🌐 Environment Variables

### Backend (`application.properties`)

| Variable | Default | Description |
|---|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/ecommerce_db` | Database connection URL |
| `SPRING_DATASOURCE_USERNAME` | `postgres` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | `1234` | Database password |
| `JWT_SECRET` | `your_jwt_secret_key_here...` | Secret key for signing JWTs |

### Frontend (`.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8080/api` | Base URL for backend API |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a descriptive message:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request against the `main` branch

### Commit Message Convention

| Prefix | Usage |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation changes |
| `style:` | Code formatting |
| `refactor:` | Code restructuring |

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JWT.io](https://jwt.io/)

---

<p align="center">
  Built with ❤️ as a Systems Analysis & Design Assignment
</p>