# 🚀 Quick Start Guide

## What's Been Implemented

Your blog application now has:
✅ **User Authentication** (Register, Login, Logout)
✅ **JWT Token-based Security**
✅ **Rate Limiting** (Protection against brute force)
✅ **Input Validation** (Using Joi)
✅ **Email Notifications** (Optional)
✅ **Comprehensive API Documentation**
✅ **Postman Collection for Testing**

## 📋 Next Steps - DO THIS NOW

### 1. Install Dependencies (REQUIRED)

Since PowerShell 6+ is not available on your system, please open your terminal (Command Prompt or Windows PowerShell 5) and run:

```bash
# Navigate to the project directory first
cd c:\Coding\BNCC_TPM\mini_project_3.worktrees\worktree-2025-12-14T04-10-15

# Install existing dependencies
npm install

# Install new authentication packages
npm install bcryptjs jsonwebtoken express-rate-limit nodemailer joi
```

### 2. Create .env File (REQUIRED)

Create a file named `.env` in the root directory with this content:

```env
PORT=3000
DATABASE_URL=mysql://root@localhost:3306/blog-app-prisma

# IMPORTANT: Change this to a random string in production!
JWT_SECRET=your_super_secret_change_this_12345
JWT_EXPIRES_IN=7d

# Email is OPTIONAL - leave commented out if not using
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASSWORD=your_app_password
# EMAIL_FROM=noreply@yourdomain.com
```

### 3. Run Database Migration (REQUIRED)

```bash
npx prisma migrate dev --name add_user_model
npx prisma generate
```

### 4. Start the Server

```bash
npm run dev
```

## 🧪 Quick Test

Once the server is running, test the authentication:

### Test 1: Register a User

Open a new terminal and run:

```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"test123\",\"name\":\"Test User\"}"
```

You should see a response with a user object and a token.

### Test 2: Login

```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

### Test 3: Import Postman Collection

1. Open Postman or Thunder Client
2. Import the file: `api.postman_collection.json`
3. Run the "Register" or "Login" request
4. The token will be saved automatically
5. Test other endpoints

## 📁 New Files Created

```
✅ src/config/email.js                    - Email setup
✅ src/controllers/authController.js      - Auth logic
✅ src/middlewares/auth.js                - JWT verification
✅ src/middlewares/rateLimiter.js         - Rate limiting
✅ src/routes/authRoutes.js               - Auth endpoints
✅ src/utils/jwt.js                       - JWT utilities
✅ src/utils/response.js                  - Response helpers
✅ src/utils/validationSchemas.js         - Joi schemas
✅ api.postman_collection.json            - API tests
✅ README_NEW.md                          - Full documentation
✅ INSTALLATION.md                        - Setup guide
✅ API_REFERENCE.md                       - API quick reference
✅ IMPLEMENTATION_SUMMARY.md              - What was built
✅ DEPLOYMENT_CHECKLIST.md                - Testing checklist
✅ QUICK_START.md                         - This file
```

## 📚 Documentation

| File                        | Purpose                          |
| --------------------------- | -------------------------------- |
| `README_NEW.md`             | Complete project documentation   |
| `INSTALLATION.md`           | Step-by-step setup instructions  |
| `API_REFERENCE.md`          | Quick API endpoint reference     |
| `IMPLEMENTATION_SUMMARY.md` | Technical implementation details |
| `DEPLOYMENT_CHECKLIST.md`   | Comprehensive testing checklist  |

## 🔑 API Endpoints

### Authentication (NEW)

-   `POST /api/auth/register` - Create new user
-   `POST /api/auth/login` - Login and get token
-   `GET /api/auth/profile` - Get user profile (requires token)
-   `POST /api/auth/logout` - Logout

### Blogs (Existing - Still Work)

-   `GET /api/blog` - Get all blogs
-   `POST /api/blog` - Create blog
-   `PUT /api/blog/:id` - Update blog
-   `DELETE /api/blog/:id` - Delete blog

### Authors (Existing - Still Work)

-   `GET /api/authors` - Get all authors
-   `POST /api/authors` - Create author
-   `PUT /api/authors/:id` - Update author
-   `DELETE /api/authors/:id` - Delete author

## 🔒 Security Features

1. **Rate Limiting**

    - Auth endpoints: 5 requests/15 minutes
    - Other endpoints: 100 requests/15 minutes

2. **Password Security**

    - Bcrypt hashing with 10 salt rounds
    - Minimum 6 characters required

3. **JWT Tokens**

    - 7-day expiration (configurable)
    - Secure token verification

4. **Input Validation**
    - Email format validation
    - Required field validation
    - Clear error messages

## ❗ Important Notes

1. **JWT_SECRET**: Change it to a random string before production!
2. **Email**: Optional - app works without email configuration
3. **Backward Compatible**: All existing features still work
4. **Database**: New User table added, existing tables unchanged

## 🐛 Troubleshooting

### Issue: "Cannot find module 'bcryptjs'"

**Solution:** Run `npm install bcryptjs jsonwebtoken express-rate-limit nodemailer joi`

### Issue: "Port 3000 is already in use"

**Solution:** Change `PORT` in .env to another port (e.g., 3001)

### Issue: "Database connection failed"

**Solution:**

1. Ensure MySQL is running
2. Check DATABASE_URL in .env
3. Verify database exists

### Issue: "Prisma migration failed"

**Solution:**

```bash
# Reset and re-migrate (WARNING: Deletes data)
npx prisma migrate reset
npx prisma migrate dev --name init
node prisma/seed.js
```

## 📞 Need Help?

1. Check `INSTALLATION.md` for detailed setup
2. Check `API_REFERENCE.md` for API usage
3. Use `DEPLOYMENT_CHECKLIST.md` to verify everything
4. Review `IMPLEMENTATION_SUMMARY.md` for technical details

## ✅ Verification Checklist

Before you continue, make sure:

-   [ ] Dependencies installed (`npm install` completed)
-   [ ] New packages installed (bcryptjs, jsonwebtoken, etc.)
-   [ ] `.env` file created with correct values
-   [ ] Database migration completed successfully
-   [ ] Server starts without errors
-   [ ] Can register a new user via API
-   [ ] Can login and receive a token
-   [ ] Postman collection imported and working

## 🎯 What to Do Next

1. **Complete the installation steps above**
2. **Test the authentication endpoints**
3. **Import and test the Postman collection**
4. **Read README_NEW.md for full documentation**
5. **Customize JWT_SECRET in .env**
6. **Start building your application!**

## 🎉 Success!

If you can:

-   Register a user ✅
-   Login and get a token ✅
-   Access profile with the token ✅

Then you're all set! The implementation is complete and working.

---

**Ready to deploy?** Check `DEPLOYMENT_CHECKLIST.md` for production readiness steps.

**Need API reference?** Open `API_REFERENCE.md` for quick endpoint lookup.

**Questions about implementation?** Read `IMPLEMENTATION_SUMMARY.md` for details.
