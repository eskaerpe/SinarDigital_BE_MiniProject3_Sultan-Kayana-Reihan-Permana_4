# Deployment Checklist

Use this checklist to ensure proper deployment and testing of the application.

## Pre-Installation Checklist

-   [ ] Node.js 18+ installed (`node --version`)
-   [ ] npm installed (`npm --version`)
-   [ ] MySQL server running
-   [ ] MySQL accessible on localhost:3306
-   [ ] Database `blog-app-prisma` created (or ready to be created)

## Installation Steps

-   [ ] Clone/download the project
-   [ ] Navigate to project directory
-   [ ] Run `npm install`
-   [ ] Run `npm install bcryptjs jsonwebtoken express-rate-limit nodemailer joi`
-   [ ] Create `.env` file (copy from `.env.example`)
-   [ ] Update `DATABASE_URL` in `.env`
-   [ ] Set `JWT_SECRET` in `.env` (use a strong random string)
-   [ ] Run `npx prisma migrate dev --name add_user_model`
-   [ ] Run `npx prisma generate`
-   [ ] (Optional) Run `node prisma/seed.js` for sample data

## Configuration Checklist

### Required Configuration

-   [ ] `.env` file created
-   [ ] `PORT` set (default: 3000)
-   [ ] `DATABASE_URL` configured correctly
-   [ ] `JWT_SECRET` set to a strong random string
-   [ ] `JWT_EXPIRES_IN` set (default: 7d)

### Optional Configuration

-   [ ] Email configuration (if using email features)
    -   [ ] `EMAIL_HOST` set
    -   [ ] `EMAIL_PORT` set
    -   [ ] `EMAIL_USER` set
    -   [ ] `EMAIL_PASSWORD` set (use app password for Gmail)
    -   [ ] `EMAIL_FROM` set

## Start Server

-   [ ] Run `npm run dev` or `npm start`
-   [ ] Server starts without errors
-   [ ] Console shows: "Server is running on port 3000"
-   [ ] No database connection errors

## Database Verification

-   [ ] Run `npx prisma studio`
-   [ ] Verify tables exist:
    -   [ ] User table
    -   [ ] Author table
    -   [ ] Post table
-   [ ] Check table schemas match expected structure
-   [ ] (If seeded) Verify sample data exists

## API Testing - Authentication

### Register Endpoint

-   [ ] POST to `/api/auth/register` works
-   [ ] Returns user object and token
-   [ ] Email validation works (try invalid email)
-   [ ] Password validation works (try short password)
-   [ ] Duplicate email rejected

### Login Endpoint

-   [ ] POST to `/api/auth/login` works
-   [ ] Returns user object and token
-   [ ] Invalid credentials rejected
-   [ ] Rate limiting works (try 6+ attempts)

### Profile Endpoint

-   [ ] GET to `/api/auth/profile` with token works
-   [ ] Returns user data
-   [ ] Without token returns 401
-   [ ] With invalid token returns 401

### Logout Endpoint

-   [ ] POST to `/api/auth/logout` with token works
-   [ ] Returns success message

## API Testing - Existing Features

### Authors

-   [ ] GET `/api/authors` returns list
-   [ ] POST `/api/authors` creates author
-   [ ] PUT `/api/authors/:id` updates author
-   [ ] DELETE `/api/authors/:id` deletes author
-   [ ] Duplicate email/number handled correctly

### Blogs

-   [ ] GET `/api/blog` returns list
-   [ ] POST `/api/blog` creates blog with image
-   [ ] POST `/api/blog` validation works
-   [ ] PUT `/api/blog/:id` updates blog
-   [ ] DELETE `/api/blog/:id` deletes blog
-   [ ] Image files are saved correctly
-   [ ] Old images deleted on update

## Security Testing

### Rate Limiting

-   [ ] Auth endpoints limited to 5 per 15 min
-   [ ] General endpoints limited to 100 per 15 min
-   [ ] Rate limit returns 429 status
-   [ ] Rate limit message is clear

### Input Validation

-   [ ] Invalid email format rejected
-   [ ] Short passwords rejected
-   [ ] Missing required fields rejected
-   [ ] Error messages are helpful

### Authentication

-   [ ] Protected routes require token
-   [ ] Invalid tokens rejected
-   [ ] Expired tokens rejected (wait for expiration)
-   [ ] Passwords stored as hashes (check database)

## UI Testing

### Blog View

-   [ ] Navigate to `/blog-view`
-   [ ] Blog list displays correctly
-   [ ] Create blog form works
-   [ ] Edit blog form works
-   [ ] Delete blog works
-   [ ] Images display correctly

### Static Files

-   [ ] Navigate to `/uploads/<filename>` works
-   [ ] Images are accessible
-   [ ] No directory listing exposed

## Postman Collection Testing

-   [ ] Import `api.postman_collection.json`
-   [ ] Set `baseUrl` variable to `http://localhost:3000`
-   [ ] Run "Register" request
-   [ ] Verify token saved to `authToken` variable
-   [ ] Run "Login" request
-   [ ] Verify token updated
-   [ ] Run "Get Profile" request with saved token
-   [ ] Run all requests in collection
-   [ ] All requests return expected responses

## Email Testing (If Configured)

-   [ ] Register a new user
-   [ ] Check email received
-   [ ] Email content is correct
-   [ ] Email formatting is good
-   [ ] Sender address is correct

## Error Handling

-   [ ] Database connection errors handled gracefully
-   [ ] Invalid route returns 404
-   [ ] Malformed JSON returns 400
-   [ ] Server errors return 500
-   [ ] Error messages don't expose sensitive data

## Performance Checks

-   [ ] Server responds quickly (< 1 second)
-   [ ] Database queries are efficient
-   [ ] No memory leaks (check with multiple requests)
-   [ ] Image uploads don't timeout

## Documentation Review

-   [ ] README_NEW.md is clear and accurate
-   [ ] INSTALLATION.md steps work
-   [ ] API_REFERENCE.md matches actual API
-   [ ] IMPLEMENTATION_SUMMARY.md is complete
-   [ ] All endpoints documented

## Production Readiness (Before Going Live)

### Security

-   [ ] Change JWT_SECRET to strong random string
-   [ ] Remove or secure `/blog-view` if not needed
-   [ ] Set up HTTPS
-   [ ] Configure CORS properly
-   [ ] Add helmet.js for security headers
-   [ ] Set NODE_ENV=production
-   [ ] Disable detailed error messages in production

### Database

-   [ ] Database backup strategy in place
-   [ ] Connection pooling configured
-   [ ] Indexes added where needed
-   [ ] Migration strategy planned

### Monitoring

-   [ ] Logging configured
-   [ ] Error tracking set up
-   [ ] Performance monitoring enabled
-   [ ] Uptime monitoring configured

### Deployment

-   [ ] Environment variables set on server
-   [ ] Process manager configured (PM2, systemd)
-   [ ] Auto-restart on crash enabled
-   [ ] Logs rotation configured
-   [ ] Domain and SSL certificate configured

## Common Issues Resolution

### "Cannot find module"

-   [ ] Ran `npm install` successfully
-   [ ] Installed new packages: `npm install bcryptjs jsonwebtoken express-rate-limit nodemailer joi`

### "Port already in use"

-   [ ] Changed PORT in .env
-   [ ] Or killed process using port 3000

### "Database connection error"

-   [ ] MySQL is running
-   [ ] DATABASE_URL is correct
-   [ ] Database exists
-   [ ] User has proper permissions

### "Prisma migration failed"

-   [ ] MySQL is accessible
-   [ ] User has CREATE TABLE permissions
-   [ ] No conflicting migrations

### "Rate limit immediately active"

-   [ ] Restarted server
-   [ ] Waited 15 minutes
-   [ ] Used different IP/cleared cookies

## Final Verification

-   [ ] All checklist items completed
-   [ ] No console errors during operation
-   [ ] All tests pass
-   [ ] Documentation is accurate
-   [ ] Ready for use/deployment

## Notes

Add any issues encountered and their solutions:

```
Issue:
Solution:

Issue:
Solution:
```

## Sign-off

-   [ ] Developer tested: **\*\***\_**\*\*** Date: **\_\_\_**
-   [ ] Code reviewed: **\*\***\_**\*\*** Date: **\_\_\_**
-   [ ] QA approved: **\*\***\_**\*\*** Date: **\_\_\_**
-   [ ] Ready for deployment: **\*\***\_**\*\*** Date: **\_\_\_**
