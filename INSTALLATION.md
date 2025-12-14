# Installation and Setup Guide

Follow these steps to get the application up and running.

## Prerequisites Check

Before starting, ensure you have:

-   Node.js (version 18 or higher)
-   npm (usually comes with Node.js)
-   MySQL Server running on localhost:3306
-   A database management tool (optional, like MySQL Workbench or phpMyAdmin)

## Step-by-Step Installation

### Step 1: Install Dependencies

Since PowerShell 6+ is not available on your system, please run these commands manually in your terminal:

```bash
# Install existing dependencies
npm install

# Install new authentication and security packages
npm install bcryptjs jsonwebtoken express-rate-limit nodemailer joi
```

### Step 2: Create Environment File

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
DATABASE_URL=mysql://root@localhost:3306/blog-app-prisma

# JWT Configuration - IMPORTANT: Change this in production!
JWT_SECRET=your_super_secret_jwt_key_change_this_please
JWT_EXPIRES_IN=7d

# Email Configuration (Optional - Leave commented out if not using)
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASSWORD=your_app_password
# EMAIL_FROM=noreply@yourdomain.com
```

**Important Notes:**

-   Change `JWT_SECRET` to a strong random string in production
-   Email configuration is optional - if not configured, email sending will be skipped
-   Adjust `DATABASE_URL` if your MySQL uses a different user or password

### Step 3: Update Database Schema

Run Prisma migration to create the new User table:

```bash
npx prisma migrate dev --name add_user_model
```

This will:

-   Create a new `User` table in your database
-   Keep existing `Author` and `Post` tables intact

### Step 4: Generate Prisma Client

```bash
npx prisma generate
```

### Step 5: (Optional) Seed Database

If you want sample data:

```bash
node prisma/seed.js
```

### Step 6: Start the Server

```bash
npm run dev
```

The server should start at `http://localhost:3000`

## Verification

### Test the Authentication API

1. **Register a new user:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456","name":"Test User"}'
```

2. **Login:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123456"}'
```

Copy the token from the response.

3. **Access protected endpoint:**

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Test with Postman

1. Open Postman or Thunder Client
2. Import the file: `api.postman_collection.json`
3. The collection includes all authentication and CRUD endpoints
4. Start with the "Register" or "Login" request
5. The token will be automatically saved for subsequent requests

## Common Issues and Solutions

### Issue 1: "Cannot find module 'bcryptjs'"

**Solution:** Run `npm install bcryptjs jsonwebtoken express-rate-limit nodemailer joi`

### Issue 2: MySQL connection error

**Solution:**

-   Ensure MySQL is running
-   Check the DATABASE_URL in .env file
-   Verify the database exists (create it if needed):
    ```sql
    CREATE DATABASE `blog-app-prisma`;
    ```

### Issue 3: Prisma migration fails

**Solution:**

-   Check MySQL credentials
-   Ensure you have permission to create tables
-   Try: `npx prisma migrate reset` (WARNING: This deletes all data)

### Issue 4: Port 3000 already in use

**Solution:** Change PORT in .env file to another port (e.g., 3001)

### Issue 5: Email not sending

**Solution:** Email is optional. If you see "Email not configured" messages, this is normal. To enable:

1. Use a Gmail account with "App Password" (not regular password)
2. Enable 2FA on Gmail
3. Generate App Password in Google Account settings
4. Add credentials to .env file

## Next Steps

After successful installation:

1. **Create your first user** via the register endpoint
2. **Import the Postman collection** for easy testing
3. **Read the API documentation** in README_NEW.md
4. **Explore the existing blog and author endpoints**
5. **Access the admin UI** at `http://localhost:3000/blog-view`

## Project Structure

All new files have been added:

```
src/
├── config/
│   └── email.js              ← NEW: Email configuration
├── controllers/
│   └── authController.js      ← NEW: Authentication logic
├── middlewares/
│   ├── auth.js               ← NEW: JWT middleware
│   └── rateLimiter.js        ← NEW: Rate limiting
├── routes/
│   └── authRoutes.js         ← NEW: Auth routes
├── utils/
│   ├── jwt.js                ← NEW: JWT utilities
│   ├── response.js           ← NEW: Response helpers
│   └── validationSchemas.js  ← NEW: Joi schemas
└── Updated files:
    ├── app.js                 ← Updated with auth routes
    ├── middlewares/validator.js ← Updated with Joi
    └── routes/apiRoutes.js    ← Fixed imports

prisma/
└── schema.prisma             ← Updated with User model

Root:
├── .env.example              ← Updated with new variables
├── api.postman_collection.json ← NEW: Postman collection
└── README_NEW.md             ← NEW: Updated documentation
```

## Support

If you encounter any issues:

1. Check the Troubleshooting section in README_NEW.md
2. Verify all dependencies are installed
3. Ensure MySQL is running and accessible
4. Check the console for error messages
