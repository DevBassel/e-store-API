# 🛒 E-Commerce API

A robust, scalable RESTful API for a full-featured e-commerce platform, built with **NestJS**, **TypeORM**, and **PostgreSQL**. Provides complete backend services including authentication, product management, shopping cart, order processing, Stripe payments, reviews, favourites, coupons, and more.

📖 **[Live Swagger Docs](https://app.swaggerhub.com/apis-docs/DevBassel/e-commerce_api_store/1.0)**

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Authorization & Roles](#-authorization--roles)
- [Database](#-database)
- [Docker](#-docker)
- [Testing](#-testing)
- [Scripts](#-scripts)

---

## ✨ Features

| Feature                    | Description                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| 🔐 **Authentication**      | Register, login, logout, and token refresh with JWT + Passport.js                        |
| 🔑 **Password Management** | Forgot password, reset via email OTP, and authenticated password change                  |
| 👥 **User Management**     | Profile view/update, admin user listing, role-based access (User, Manager, Admin)        |
| 📦 **Products**            | Full CRUD with image upload (Cloudinary), pagination, filtering by category/price/search |
| 🗂️ **Categories**          | Create, list, update, and delete product categories                                      |
| 🛒 **Cart**                | Add/remove/update items, view cart — all scoped to the authenticated user                |
| 📋 **Orders**              | Place orders from cart, view order history, filter by status, cancel orders              |
| 💳 **Stripe Payments**     | Create payment intents for orders, Stripe webhook for payment confirmation               |
| ⭐ **Reviews**             | Create, read, update, and delete product reviews with pagination                         |
| ❤️ **Favourites**          | Add/remove products to a personal wishlist                                               |
| 🎟️ **Coupons**             | Admin-managed discount coupons with CRUD operations                                      |
| 📧 **Email Service**       | Transactional emails (password reset) via Nodemailer                                     |
| ☁️ **Image Hosting**       | Cloudinary integration for product image upload and CDN delivery                         |
| 📖 **API Docs**            | Auto-generated interactive Swagger/OpenAPI documentation                                 |
| ✅ **Validation**          | Request body validation with class-validator and DTO whitelisting                        |
| 🐳 **Docker**              | Dockerfile and docker-compose for containerized deployment with PostgreSQL               |

---

## 🛠️ Tech Stack

| Technology                                                      | Version | Purpose                                    |
| --------------------------------------------------------------- | ------- | ------------------------------------------ |
| [NestJS](https://nestjs.com/)                                   | 10.x    | Progressive Node.js framework              |
| [TypeORM](https://typeorm.io/)                                  | 0.3.x   | ORM for PostgreSQL                         |
| [PostgreSQL](https://www.postgresql.org/)                       | Latest  | Relational database                        |
| [Passport.js](http://www.passportjs.org/)                       | —       | Authentication middleware                  |
| [JWT](https://jwt.io/)                                          | —       | Token-based auth (access + refresh tokens) |
| [Swagger/OpenAPI](https://swagger.io/)                          | 7.x     | Interactive API documentation              |
| [Stripe](https://stripe.com/)                                   | 16.x    | Payment processing + webhooks              |
| [Cloudinary](https://cloudinary.com/)                           | 2.x     | Image upload and CDN                       |
| [Nodemailer](https://nodemailer.com/)                           | 6.x     | Email delivery                             |
| [class-validator](https://github.com/typestack/class-validator) | 0.14.x  | DTO validation                             |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js)            | 5.x     | Password hashing                           |
| [Docker](https://www.docker.com/)                               | —       | Containerization                           |

---

## 🏛️ Architecture

The API follows NestJS's modular architecture. Each domain feature is a self-contained module with its own controller, service, DTOs, entities, and guards.

```
                      ┌─────────────────────┐
                      │   Client / Frontend  │
                      └──────────┬──────────┘
                                 │  HTTP
                      ┌──────────▼──────────┐
                      │   NestJS Application │
                      │   (Global Prefix:    │
                      │    /api/v1)           │
                      ├─────────────────────┤
                      │     Middleware       │
                      │  ┌─ CORS            │
                      │  ├─ ValidationPipe   │
                      │  └─ ClassSerializer  │
                      ├─────────────────────┤
                      │      Modules         │
                      │  ┌── Auth + JWT      │
                      │  ├── User            │
                      │  ├── Products        │
                      │  ├── Categories      │
                      │  ├── Cart            │
                      │  ├── Order           │
                      │  ├── Payment (Stripe)│
                      │  ├── Review          │
                      │  ├── Favourite       │
                      │  ├── Coupons         │
                      │  ├── Cloudinary      │
                      │  └── Email           │
                      └──────────┬──────────┘
                                 │
               ┌─────────────────┼─────────────────┐
               │                 │                  │
        ┌──────▼──────┐  ┌──────▼───────┐  ┌───────▼──────┐
        │  PostgreSQL  │  │  Cloudinary  │  │    Stripe    │
        │  (TypeORM)   │  │  (Images)    │  │  (Payments)  │
        └─────────────┘  └──────────────┘  └──────────────┘
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── main.ts                          # App bootstrap, CORS, Swagger, global pipes
│   ├── app.module.ts                    # Root module — imports all feature modules
│   ├── decorator/                       # Custom decorators
│   │   ├── GetUser.decorator.ts         # Extract user from JWT payload
│   │   ├── role.decorator.ts            # @Roles() decorator for RBAC
│   │   └── queryArray.decorator.ts      # @ApiQueryArray() for Swagger docs
│   ├── utils/                           # Shared utility functions
│   └── modules/
│       ├── auth/                        # Authentication & authorization
│       │   ├── auth.controller.ts       # POST /register, /login, /refresh, /log-out
│       │   ├── auth.service.ts          # Auth business logic, bcrypt, JWT signing
│       │   ├── password.controller.ts   # POST /forgot-password, /reset-*-password
│       │   ├── password.service.ts      # Password reset flow with email OTP
│       │   ├── dto/                     # LoginDto, ForgotPasswordDto, ResetPasswordDto, JwtPayload
│       │   ├── enums/
│       │   │   └── role.enum.ts         # Role.USER | Role.MANAGER | Role.ADMIN
│       │   ├── guards/
│       │   │   ├── jwt.guard.ts         # Passport JWT guard
│       │   │   └── role.guard.ts        # Role-based access guard
│       │   └── strategy/               # Passport JWT strategy
│       │
│       ├── user/                        # User management
│       │   ├── user.controller.ts       # GET /users, /users/profile, /users/find/:id
│       │   ├── user.service.ts          # User CRUD, profile operations
│       │   ├── dto/                     # CreateUserDto, UpdateProfileDto
│       │   └── entities/               # User entity (TypeORM)
│       │
│       ├── products/                    # Product catalog
│       │   ├── products.controller.ts   # CRUD + pagination, filtering, search, image upload
│       │   ├── products.service.ts      # Product business logic
│       │   ├── dto/                     # CreateProductDto, UpdateProductDto
│       │   └── entities/               # Product entity
│       │
│       ├── categories/                  # Product categories
│       │   ├── categories.controller.ts # Full CRUD for categories
│       │   ├── categories.service.ts
│       │   ├── dto/                     # CreateCategoryDto, UpdateCategoryDto
│       │   └── entities/               # Category entity
│       │
│       ├── cart/                         # Shopping cart
│       │   ├── cart.controller.ts       # CRUD — all routes require JWT auth
│       │   ├── cart.service.ts          # Cart business logic (user-scoped)
│       │   ├── dto/                     # CreateCartDto, UpdateCartItemDto
│       │   └── entities/               # Cart / CartItem entities
│       │
│       ├── order/                       # Order processing
│       │   ├── order.controller.ts      # Create, list (paginated + status filter), cancel
│       │   ├── order.service.ts         # Order workflow, status management
│       │   ├── dto/                     # CreateOrderDto, UpdateOrderDto
│       │   ├── entities/               # Order entity
│       │   └── enums/
│       │       └── order-status.enum.ts # inProcess | shipped | cancel | success
│       │
│       ├── payment/                     # Stripe payment integration
│       │   ├── payment.controller.ts    # POST /payments/create, /payments/webhook
│       │   ├── payment.service.ts       # Stripe payment intent creation + webhook handler
│       │   └── payment.module.ts
│       │
│       ├── review/                      # Product reviews
│       │   ├── review.controller.ts     # CRUD + paginated listing per product
│       │   ├── review.service.ts
│       │   ├── dto/                     # CreateReviewDto, UpdateReviewDto
│       │   └── entities/               # Review entity
│       │
│       ├── favourite/                   # Wishlist / Favourites
│       │   ├── favourite.controller.ts  # Add, list, remove — user-scoped
│       │   ├── favourite.service.ts
│       │   ├── dto/                     # CreateFavouriteDto
│       │   └── entities/               # Favourite entity
│       │
│       ├── coupons/                     # Discount coupons (Admin only)
│       │   ├── coupons.controller.ts    # Full CRUD — Admin role required
│       │   ├── coupons.service.ts
│       │   ├── dto/                     # CreateCouponDto, UpdateCouponDto
│       │   └── entities/               # Coupon entity
│       │
│       ├── cloudinary/                  # Image upload service
│       │   └── cloudinary.module.ts     # Cloudinary SDK configuration
│       │
│       ├── email/                       # Email service
│       │   └── ...                      # Nodemailer transporter (Gmail/SMTP)
│       │
│       ├── jwt/                         # Global JWT module
│       │   └── jwt.module.ts            # JwtModule.registerAsync (global)
│       │
│       └── DB/                          # Database configuration
│           ├── DB.module.ts             # TypeOrmModule.forRootAsync
│           ├── data-source.ts           # TypeORM DataSource for CLI migrations
│           └── migrations/             # Database migration files
│
├── test/                                # E2E tests
├── Dockerfile                           # Node 20 multi-stage build
├── docker-compose.yml                   # App + PostgreSQL services
├── .env.example                         # Environment variable template
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **pnpm** (recommended) or npm
- **PostgreSQL** ≥ 14 (or use Docker)
- A **Stripe** account (for payment features)
- A **Cloudinary** account (for image uploads)
- A **Gmail** account or SMTP service (for emails)

### Installation

```bash
# Clone the repository
git clone https://github.com/DevBassel/e-store-API.git
cd backend

# Install dependencies
pnpm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your credentials (see Environment Variables section)

# Start in development mode (hot-reload)
pnpm run start:dev
```

The API server starts on `http://localhost:4000` (or your configured `PORT`).
Swagger documentation is available at `http://localhost:4000/api`.

### Seed the Database

Populate the database with sample data using Faker.js:

```bash
pnpm run seeding
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root using `.env.example` as a template:

```env
# Server Configuration
PORT=4000
HOST=http://localhost:4000
NODE_ENV=dev                              # Options: dev, prod

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=e_commerce
DB_USERNAME=postgres
DB_PASSWORD=root
DB_Sync=true                              # Auto-sync schema (dev only!)

# JWT Configuration
JWT_KEY=your_jwt_secret_key

# Email Configuration (Gmail App Password or SMTP)
EMAIL_USER=your_email@gmail.com
EMAIL_SK=your_email_app_password

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Stripe Configuration
STRIPE_SK=your_stripe_secret_key
STRIPE_WEEBHOOK_SK=your_stripe_webhook_secret
```

> ⚠️ **Warning**: Set `DB_Sync=false` in production. Use migrations instead.

---

## 📖 API Reference

All endpoints are prefixed with `/api/v1`. Interactive documentation is available via Swagger at `/api`.

### Auth (`/api/v1/auth`)

| Method | Endpoint         | Auth | Description                       |
| ------ | ---------------- | ---- | --------------------------------- |
| `POST` | `/auth/register` | ❌   | Register a new user               |
| `POST` | `/auth/login`    | ❌   | Login and receive JWT tokens      |
| `POST` | `/auth/refresh`  | ❌   | Refresh access token              |
| `POST` | `/auth/log-out`  | 🔒   | Logout (invalidate refresh token) |

### Password Management (`/api/v1/auth`)

| Method | Endpoint                      | Auth | Description                     |
| ------ | ----------------------------- | ---- | ------------------------------- |
| `POST` | `/auth/forgot-password`       | ❌   | Send password reset email       |
| `POST` | `/auth/reset-forgot-password` | ❌   | Reset password via email token  |
| `POST` | `/auth/reset-password`        | 🔒   | Change password (authenticated) |

### Users (`/api/v1/users`)

| Method  | Endpoint              | Auth     | Description                      |
| ------- | --------------------- | -------- | -------------------------------- |
| `GET`   | `/users`              | 🔒 Admin | List all users (paginated)       |
| `GET`   | `/users/profile`      | 🔒       | Get authenticated user's profile |
| `PATCH` | `/users/profile`      | 🔒       | Update profile                   |
| `GET`   | `/users/find/:userId` | 🔒       | Find a user by ID                |

### Products (`/api/v1/products`)

| Method   | Endpoint        | Auth             | Description                                     |
| -------- | --------------- | ---------------- | ----------------------------------------------- |
| `POST`   | `/products`     | 🔒 Admin/Manager | Create product (multipart/form-data with image) |
| `GET`    | `/products`     | ❌               | List products (paginated, filterable)           |
| `GET`    | `/products/:id` | ❌               | Get product details                             |
| `PATCH`  | `/products/:id` | 🔒               | Update product                                  |
| `DELETE` | `/products/:id` | 🔒 Admin/Manager | Delete product                                  |

**Query Parameters** for `GET /products`:
| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |
| `category` | string | — | Filter by category |
| `min` | number | 0 | Minimum price |
| `max` | number | 1,000,000 | Maximum price |
| `s` | string | — | Search term |

### Categories (`/api/v1/categories`)

| Method   | Endpoint          | Auth | Description         |
| -------- | ----------------- | ---- | ------------------- |
| `POST`   | `/categories`     | ❌   | Create a category   |
| `GET`    | `/categories`     | ❌   | List all categories |
| `GET`    | `/categories/:id` | ❌   | Get category by ID  |
| `PATCH`  | `/categories/:id` | ❌   | Update category     |
| `DELETE` | `/categories/:id` | ❌   | Delete category     |

### Cart (`/api/v1/cart`)

| Method   | Endpoint    | Auth | Description               |
| -------- | ----------- | ---- | ------------------------- |
| `POST`   | `/cart`     | 🔒   | Add item to cart          |
| `GET`    | `/cart`     | 🔒   | Get user's cart           |
| `GET`    | `/cart/:id` | 🔒   | Get specific cart item    |
| `PATCH`  | `/cart/:id` | 🔒   | Update cart item quantity |
| `DELETE` | `/cart/:id` | 🔒   | Remove item from cart     |

### Orders (`/api/v1/orders`)

| Method   | Endpoint      | Auth | Description                            |
| -------- | ------------- | ---- | -------------------------------------- |
| `POST`   | `/orders`     | 🔒   | Create order from cart                 |
| `GET`    | `/orders`     | 🔒   | List orders (paginated, status filter) |
| `GET`    | `/orders/:id` | 🔒   | Get order details                      |
| `GET`    | `/orders/me`  | 🔒   | Get current user's orders              |
| `PATCH`  | `/orders/:id` | 🔒   | Update order                           |
| `DELETE` | `/orders/:id` | 🔒   | Cancel order                           |

**Order Statuses**: `inProcess` → `shipped` → `success` | `cancel`

### Payments (`/api/v1/payments`)

| Method | Endpoint            | Auth | Description                                  |
| ------ | ------------------- | ---- | -------------------------------------------- |
| `POST` | `/payments/create`  | 🔒   | Create Stripe payment intent for an order    |
| `POST` | `/payments/webhook` | —    | Stripe webhook endpoint (signature verified) |

### Reviews (`/api/v1/reviews`)

| Method   | Endpoint              | Auth | Description                            |
| -------- | --------------------- | ---- | -------------------------------------- |
| `POST`   | `/reviews`            | 🔒   | Create a review                        |
| `GET`    | `/reviews/:productId` | ❌   | List reviews for a product (paginated) |
| `GET`    | `/reviews/:id/view`   | ❌   | Get single review                      |
| `PATCH`  | `/reviews/:id`        | 🔒   | Update a review                        |
| `DELETE` | `/reviews/:id`        | 🔒   | Delete a review                        |

### Favourites (`/api/v1/favourite`)

| Method   | Endpoint         | Auth | Description               |
| -------- | ---------------- | ---- | ------------------------- |
| `POST`   | `/favourite`     | 🔒   | Add product to favourites |
| `GET`    | `/favourite`     | 🔒   | List user's favourites    |
| `GET`    | `/favourite/:id` | 🔒   | Get specific favourite    |
| `DELETE` | `/favourite/:id` | 🔒   | Remove from favourites    |

### Coupons (`/api/v1/coupons`)

| Method   | Endpoint       | Auth     | Description              |
| -------- | -------------- | -------- | ------------------------ |
| `POST`   | `/coupons`     | 🔒 Admin | Create coupon            |
| `GET`    | `/coupons`     | 🔒 Admin | List coupons (paginated) |
| `GET`    | `/coupons/:id` | 🔒 Admin | Get coupon details       |
| `PATCH`  | `/coupons/:id` | 🔒 Admin | Update coupon            |
| `DELETE` | `/coupons/:id` | 🔒 Admin | Delete coupon            |

---

## 🛡️ Authorization & Roles

The API uses a role-based access control (RBAC) system with three roles:

| Role        | Value     | Permissions                                                                 |
| ----------- | --------- | --------------------------------------------------------------------------- |
| **User**    | `user`    | Default role. Can manage own cart, orders, reviews, favourites, and profile |
| **Manager** | `manager` | Can create, update, and delete products                                     |
| **Admin**   | `admin`   | Full access — user management, product management, coupon management        |

**Guards applied**:

- `JwtGuard` — Validates the Bearer JWT token from the `Authorization` header
- `RoleGuard` — Checks the user's role against the `@Roles()` decorator on the endpoint

---

## 🗃️ Database

### TypeORM Configuration

The database connection is configured via environment variables and managed by TypeORM:

- **Entities** are auto-discovered from each module's `entities/` directory
- **Synchronization** (`DB_Sync=true`) auto-creates/updates tables from entities (dev only)
- **Migrations** are stored in `src/modules/DB/migrations/`

### Migration Commands

```bash
# Generate a migration from entity changes
pnpm run migration:generate -- src/modules/DB/migrations/MigrationName

# Run pending migrations
pnpm run migration:run

# Revert the last migration
pnpm run migration:revert
```

---

## 🐳 Docker

### Docker Compose (Recommended)

Spins up the API and PostgreSQL together:

```bash
docker-compose up -d
```

**Services**:
| Service | Image | Port |
|---|---|---|
| `app` | Built from Dockerfile | `3000` |
| `postgres` | `postgres:latest` | `5432` |

### Standalone Docker Build

```bash
# Build the image
docker build -t e-commerce-api .

# Run the container
docker run -p 4000:4000 --env-file .env e-commerce-api
```

---

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# Watch mode
pnpm run test:watch

# Coverage report
pnpm run test:cov

# E2E tests
pnpm run test:e2e

# Debug tests
pnpm run test:debug
```

---

## 📜 Scripts

| Script               | Command                       | Description                        |
| -------------------- | ----------------------------- | ---------------------------------- |
| `start:dev`          | `pnpm run start:dev`          | Development server with hot-reload |
| `start:prod`         | `pnpm run start:prod`         | Production server (compiled JS)    |
| `build`              | `pnpm run build`              | Compile TypeScript via NestJS CLI  |
| `seeding`            | `pnpm run seeding`            | Seed database with sample data     |
| `migration:generate` | `pnpm run migration:generate` | Generate new migration             |
| `migration:run`      | `pnpm run migration:run`      | Execute pending migrations         |
| `migration:revert`   | `pnpm run migration:revert`   | Revert last migration              |
| `webhook`            | `pnpm run webhook`            | Forward Stripe webhooks locally    |
| `test`               | `pnpm run test`               | Run unit tests                     |
| `test:e2e`           | `pnpm run test:e2e`           | Run end-to-end tests               |
| `test:cov`           | `pnpm run test:cov`           | Generate coverage report           |
| `lint`               | `pnpm run lint`               | Lint and auto-fix with ESLint      |
| `format`             | `pnpm run format`             | Format code with Prettier          |

---

## 📄 License

This project is **UNLICENSED** — private use only.
