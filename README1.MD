Here's a comprehensive README file based on your project structure and the information provided:

```markdown
# 🛍️ E-Commerce Platform

A full-stack e-commerce application built with **React** (Frontend) and **Spring Boot** (Backend), featuring user authentication, product management, shopping cart functionality, order processing, and newsletter subscriptions.

## 📋 Table of Contents
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Authentication & Security](#authentication--security)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Technology Stack

### Backend
- **Java 17** or higher
- **Spring Boot 3.x** - REST API framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database ORM
- **PostgreSQL** - Relational database
- **JWT (JSON Web Tokens)** - Stateless authentication
- **Maven** - Dependency management

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & development server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management (Cart)

## 📁 Project Structure

```
ecommerce-platform/
│
├── backend/                  # Spring Boot API & Database Logic
│   ├── pom.xml               # Maven dependencies
│   └── src/main/
│       ├── resources/
│       │   └── application.properties
│       └── java/com/ecommerce/
│           ├── EcommerceApplication.java
│           ├── config/       # Global configurations
│           ├── controller/   # REST API endpoints
│           ├── dto/          # Data Transfer Objects
│           ├── model/        # Database entities
│           ├── repository/   # JPA repositories
│           ├── security/     # JWT & Security config
│           └── service/      # Business logic
│
└── frontend/                 # React UI
    ├── package.json
    ├── tailwind.config.js
    └── src/
        ├── main.jsx          # Entry point
        ├── App.jsx           # Routing
        ├── context/          # Global state (Cart)
        └── components/
            ├── Navbar.jsx    # Navigation
            └── pages/        # Route pages
                ├── HomePage.jsx
                ├── ProductsPage.jsx
                ├── CartPage.jsx
                ├── CheckoutPage.jsx
                ├── LoginPage.jsx
                ├── RegisterPage.jsx
                ├── AboutPage.jsx
                └── SellerDashboard.jsx
```

## ✨ Features

- **User Authentication** - Register/Login with JWT tokens
- **Product Catalog** - Browse products with detailed views
- **Shopping Cart** - Add/remove items, update quantities
- **Order Management** - Place orders, view order history
- **Newsletter Subscription** - Subscribe to promotional emails
- **Seller Dashboard** - Manage product inventory (for sellers)
- **Responsive Design** - Mobile-friendly using Tailwind CSS

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java JDK 17+** - [Download](https://adoptium.net/)
- **Maven** - [Download](https://maven.apache.org/download.cgi)
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Backend Setup

#### Configure PostgreSQL Database

```bash
# Log into PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE ecommerce_db;
CREATE USER ecommerce_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO ecommerce_user;
\q
```

#### Configure Backend Properties

Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=ecommerce_user
spring.datasource.password=your_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT Configuration
jwt.secret=your_jwt_secret_key_here_min_256_bits
jwt.expiration=86400000  # 24 hours

# Server Configuration
server.port=8080
```

#### Build and Run Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8080/api
```

Run the development server:

```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

## 🏃 Running the Application

### Development Mode

1. **Start PostgreSQL**:
   ```bash
   sudo systemctl start postgresql  # Linux
   # or
   brew services start postgresql   # macOS
   ```

2. **Run Backend**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Run Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Production Build

#### Backend
```bash
cd backend
mvn clean package
java -jar target/ecommerce-0.0.1-SNAPSHOT.jar
```

#### Frontend
```bash
cd frontend
npm run build
# The build files will be in the 'dist' folder
# Serve them using nginx, Apache, or any static file server
```

## 🔌 API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product by ID |
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |

### Protected Endpoints (Requires JWT)
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/api/orders` | Create new order | USER |
| GET | `/api/orders/my-orders` | Get user orders | USER |
| POST | `/api/products` | Add new product | SELLER |
| PUT | `/api/products/{id}` | Update product | SELLER |
| DELETE | `/api/products/{id}` | Delete product | SELLER |
| GET | `/api/orders/all` | Get all orders | ADMIN |
| PUT | `/api/orders/{id}/status` | Update order status | ADMIN |

## 🔐 Environment Variables

### Backend (`application.properties`)
```properties
# Database
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/ecommerce_db}
spring.datasource.username=${DB_USERNAME:ecommerce_user}
spring.datasource.password=${DB_PASSWORD:your_password}

# JWT
jwt.secret=${JWT_SECRET:your-secret-key}
jwt.expiration=${JWT_EXPIRATION:86400000}
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:8080/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key  # If using Stripe
```

## 📊 Database Schema

The application uses the following main entities:

- **User** - `id`, `email`, `password`, `firstName`, `lastName`, `role` (USER/SELLER/ADMIN)
- **Product** - `id`, `name`, `description`, `price`, `stock`, `imageUrl`, `sellerId`
- **Order** - `id`, `userId`, `orderDate`, `totalAmount`, `status`
- **OrderItem** - `id`, `orderId`, `productId`, `quantity`, `price`
- **Subscriber** - `id`, `email`, `subscribedAt`

## 🛡️ Authentication & Security

- **JWT-based authentication** - Tokens are sent in the `Authorization` header
- **Password encryption** - BCrypt hashing for user passwords
- **Role-based access control** - USER, SELLER, ADMIN roles
- **CORS configuration** - Configured to allow frontend origin

### Making Authenticated Requests

```javascript
// Example Axios interceptor
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Workflow

```bash
# After making changes
git add .
git commit -m "Describe your changes"
git push origin your-branch-name

# Check status
git status
cd frontend && git status
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support

For support, email support@ecommerce-platform.com or open an issue in the GitHub repository.

## 🙏 Acknowledgments

- Spring Boot documentation
- React documentation
-PostgreSQL documentation
- Tailwind CSS
- All contributors and maintainers

---

