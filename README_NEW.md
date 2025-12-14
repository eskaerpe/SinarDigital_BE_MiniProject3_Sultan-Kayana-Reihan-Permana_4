# Sinar Digital BE Mini Project 3

A complete Express + Prisma backend with authentication, CRUD operations, image uploads, and security features. This project includes both REST API endpoints and an EJS-based admin UI.

## Key Features

-   **Authentication System** with JWT-based login, registration, and logout
-   **Prisma ORM** wired to MySQL with `User`, `Author`, and `Post` models
-   **Image uploads** stored on disk under `uploads/` with path recording
-   **REST API** with CRUD for blogs and authors
-   **EJS admin UI** at `/blog-view` for managing content
-   **Security Features**: Rate limiting, input validation (Joi), and error handling
-   **Email Notifications** (optional) for user registration
-   **Postman Collection** for API testing

## Tech Stack

-   Node.js & Express.js
-   Prisma ORM with MySQL
-   JWT for authentication
-   Bcrypt for password hashing
-   Multer for file uploads
-   Joi for validation
-   Express Rate Limit for security
-   Nodemailer for emails (optional)

## Prerequisites

1. Node.js 18+ and npm installed
2. MySQL server listening on `localhost:3306` (or adjust `DATABASE_URL`)
3. A `.env` file (see setup below)

## Setup

### 1. Install dependencies

**IMPORTANT**: Install the required packages first:

```bash
npm install
npm install bcryptjs jsonwebtoken express-rate-limit nodemailer joi
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=mysql://root@localhost:3306/blog-app-prisma

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRES_IN=7d

# Email Configuration (Optional - for registration emails)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@yourdomain.com
```

### 3. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

### 4. Seed the Database

```bash
node prisma/seed.js
```

### 5. Start the Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

## API Documentation

### Authentication Endpoints

#### Register

-   **POST** `/api/auth/register`
-   **Body**: `{ "email": "user@example.com", "password": "password123", "name": "John Doe" }`
-   **Response**: Returns user data and JWT token

#### Login

-   **POST** `/api/auth/login`
-   **Body**: `{ "email": "user@example.com", "password": "password123" }`
-   **Response**: Returns user data and JWT token

#### Get Profile (Protected)

-   **GET** `/api/auth/profile`
-   **Headers**: `Authorization: Bearer <token>`
-   **Response**: Returns current user profile

#### Logout (Protected)

-   **POST** `/api/auth/logout`
-   **Headers**: `Authorization: Bearer <token>`
-   **Response**: Success message

### Blog Endpoints

-   **GET** `/api/blog` - List all posts (includes author data)
-   **POST** `/api/blog` - Create post (`multipart/form-data` with `title`, `content`, `authorId`, and optional `image`)
-   **PUT** `/api/blog/:id` - Update post (upload new image to replace existing)
-   **DELETE** `/api/blog/:id` - Delete post and its file

### Author Endpoints

-   **GET** `/api/authors` - List authors with their posts
-   **POST** `/api/authors` - Create author
-   **PUT** `/api/authors/:id` - Update author
-   **DELETE** `/api/authors/:id` - Delete author

## Security Features

### Rate Limiting

-   Authentication endpoints: 5 requests per 15 minutes
-   General endpoints: 100 requests per 15 minutes

### Input Validation

All inputs are validated using Joi schemas with clear error messages.

### Protected Routes

Use JWT tokens in the `Authorization: Bearer <token>` header for protected endpoints.

## Testing with Postman

1. Import `api.postman_collection.json` into Postman or Thunder Client
2. The collection includes environment variables for `baseUrl` and `authToken`
3. Test flow:
    - Register a new user (token auto-saved)
    - Login (token auto-saved)
    - Access protected endpoints using the saved token
    - Test blog and author CRUD operations

## Admin UI (`/blog-view`)

1. Browse posts in table and card views
2. Create/edit posts using EJS forms with author dropdown
3. Upload images (displayed inline) and switch them during updates
4. Delete posts through `confirm()` prompts

## File Upload Details

-   Multer stores images under `uploads/` with safe filenames
-   Path saved in Prisma's `Post.imagePath` as relative URL
-   Express serves files via `/uploads` static route
-   Updates delete old files before replacing
-   Deleting posts removes associated files

## Project Structure

```
src/
├── config/
│   ├── app.config.js      # App configuration
│   └── email.js           # Email configuration
├── controllers/
│   ├── apiController.js   # Blog and Author controllers
│   ├── authController.js  # Authentication controller
│   └── viewController.js  # View rendering controller
├── middlewares/
│   ├── auth.js            # JWT authentication middleware
│   ├── errorHandler.js    # Global error handler
│   ├── rateLimiter.js     # Rate limiting middleware
│   ├── upload.js          # Multer file upload
│   └── validator.js       # Joi validation middleware
├── routes/
│   ├── apiRoutes.js       # Blog and Author routes
│   ├── authRoutes.js      # Authentication routes
│   ├── index.js           # Root routes
│   └── viewRoutes.js      # View routes
├── utils/
│   ├── helpers.js         # Helper functions
│   ├── jwt.js             # JWT utilities
│   ├── prisma.js          # Prisma client
│   ├── response.js        # Response helpers
│   └── validationSchemas.js # Joi validation schemas
└── app.js                 # Express app setup
```

## Extras

-   Run `npx prisma studio` to inspect data visually
-   Reset database (caution): `npx prisma migrate reset` then reseed

## Troubleshooting

-   If migrations fail, confirm MySQL is running and credentials in `.env` are correct
-   If authors are missing in forms, rerun `node prisma/seed.js`
-   For email issues, check SMTP credentials or skip email configuration (emails will be skipped automatically)

## Notes

-   Email functionality is optional and will be skipped if not configured
-   Default JWT secret should be changed in production
-   Rate limiting protects against brute force attacks
-   All passwords are hashed using bcrypt before storage

---

## 🤖 Acknowledgments

This project was developed with the assistance of **GitHub Copilot**, an AI-powered code completion tool that helped accelerate development and ensure best practices in code structure, security implementation, and documentation.
