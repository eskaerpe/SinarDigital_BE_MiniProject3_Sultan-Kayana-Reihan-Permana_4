# 🧪 Testing Guide - Using Postman Collection

## Quick Start

### Prerequisites

1. ✅ Server is running (`npm run dev`)
2. ✅ Database is migrated and running
3. ✅ Postman or Thunder Client installed

---

## Step 1: Import the Collection

### Using Postman Desktop/Web

1. **Open Postman**
2. **Click "Import"** button (top left)
3. **Drag and drop** the file `api.postman_collection.json` OR click "Upload Files"
4. **Select** `api.postman_collection.json` from your project folder
5. **Click "Import"**

You should see **"Blog API with Authentication"** collection appear in the left sidebar.

### Using Thunder Client (VS Code Extension)

1. **Open VS Code**
2. **Click Thunder Client** icon in the sidebar
3. **Click "Collections"** tab
4. **Click the menu icon** (three dots)
5. **Select "Import"**
6. **Choose** `api.postman_collection.json`

---

## Step 2: Configure Environment

### Option A: Use Collection Variables (Recommended)

The collection already has variables configured:

-   `baseUrl` = `http://localhost:3000`
-   `authToken` = (empty, will be auto-filled)

**To check/edit:**

1. Click on the collection name
2. Select **"Variables"** tab
3. Verify `baseUrl` matches your server URL
4. Click **"Save"**

### Option B: Create Environment (Advanced)

1. **Click "Environments"** in left sidebar
2. **Click "+" to create new environment**
3. **Name it** "Blog API Dev"
4. **Add variables:**
    ```
    baseUrl = http://localhost:3000
    authToken = (leave empty)
    ```
5. **Save** and select this environment

---

## Step 3: Start Testing - Authentication Flow

### 🔐 Test 1: Register a New User

1. **Expand** the collection
2. **Open** "Authentication" folder
3. **Click** "Register" request
4. **Review the body** (you can modify the data):
    ```json
    {
    	"email": "user@example.com",
    	"password": "password123",
    	"name": "John Doe"
    }
    ```
5. **Click "Send"**

**Expected Response (201 Created):**

```json
{
	"status": "success",
	"message": "Registration successful",
	"data": {
		"user": {
			"id": 1,
			"email": "user@example.com",
			"name": "John Doe",
			"createdAt": "2024-01-01T00:00:00.000Z"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
	}
}
```

**✨ The token is automatically saved to `authToken` variable!**

### 🔓 Test 2: Login

1. **Click** "Login" request
2. **Use the same credentials** from registration:
    ```json
    {
    	"email": "user@example.com",
    	"password": "password123"
    }
    ```
3. **Click "Send"**

**Expected Response (200 OK):**

```json
{
	"status": "success",
	"message": "Login successful",
	"data": {
		"user": {
			"id": 1,
			"email": "user@example.com",
			"name": "John Doe"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
	}
}
```

**✨ Token automatically updated!**

### 👤 Test 3: Get Profile (Protected Route)

1. **Click** "Get Profile" request
2. **Check** the "Authorization" tab - it should use `{{authToken}}`
3. **Click "Send"**

**Expected Response (200 OK):**

```json
{
	"status": "success",
	"message": "Profile retrieved successfully",
	"data": {
		"user": {
			"id": 1,
			"email": "user@example.com",
			"name": "John Doe"
		}
	}
}
```

**❌ If you get 401:** Check that the token was saved. Try logging in again.

### 🚪 Test 4: Logout

1. **Click** "Logout" request
2. **Click "Send"**

**Expected Response (200 OK):**

```json
{
	"status": "success",
	"message": "Logout successful. Please delete the token on client side."
}
```

---

## Step 4: Test CRUD Operations

### 📝 Authors

#### Create Author First (Needed for Blog Posts)

1. **Open** "Authors" folder
2. **Click** "Create Author"
3. **Review/modify the body:**
    ```json
    {
    	"name": "Jane Smith",
    	"email": "jane@example.com",
    	"number": "1234567890"
    }
    ```
4. **Click "Send"**

**Expected Response (200 OK):**

```json
{
	"message": "Author created successfully!",
	"createdAuthor": {
		"id": 1,
		"name": "Jane Smith",
		"email": "jane@example.com",
		"number": "1234567890",
		"createdAt": "2024-01-01T00:00:00.000Z"
	}
}
```

**📝 Note the `id` - you'll need it for blog posts!**

#### Get All Authors

1. **Click** "Get All Authors"
2. **Click "Send"**

#### Update Author

1. **Click** "Update Author"
2. **Change the URL** `:id` to the author's ID (e.g., `/api/authors/1`)
3. **Modify the body**
4. **Click "Send"**

#### Delete Author (Optional - Be Careful!)

1. **Click** "Delete Author"
2. **Change the URL** `:id` to the author's ID
3. **Click "Send"**

---

### 📰 Blogs

#### Create Blog Post

1. **Open** "Blogs" folder
2. **Click** "Create Blog"
3. **Important:** Change to **"Body" → "form-data"** (already set)
4. **Fill in the fields:**

    - `title` = "My First Blog Post"
    - `content` = "This is the content of my first blog post."
    - `authorId` = `1` (use the author ID from earlier)
    - `image` = Click "Select Files" and choose an image (optional)

5. **Click "Send"**

**Expected Response (200 OK):**

```json
{
	"message": "Blog created successfully!",
	"createdBlog": {
		"id": 1,
		"title": "My First Blog Post",
		"content": "This is the content...",
		"authorId": 1,
		"imagePath": "uploads/image-123.jpg",
		"createdAt": "2024-01-01T00:00:00.000Z",
		"author": {
			"id": 1,
			"name": "Jane Smith",
			"email": "jane@example.com"
		}
	}
}
```

#### Get All Blogs

1. **Click** "Get All Blogs"
2. **Click "Send"**
3. **You'll see all blogs with author information**

#### Update Blog

1. **Click** "Update Blog"
2. **Change URL** `:id` to the blog ID (e.g., `/api/blog/1`)
3. **Modify fields** (title, content, authorId, image)
4. **Click "Send"**

#### Delete Blog

1. **Click** "Delete Blog"
2. **Change URL** `:id` to the blog ID
3. **Click "Send"**

---

## Step 5: Test Validation & Error Handling

### ❌ Test Invalid Email

1. **Go to** "Register" request
2. **Change email to invalid format:**
    ```json
    {
    	"email": "invalid-email",
    	"password": "password123",
    	"name": "Test User"
    }
    ```
3. **Click "Send"**

**Expected Response (400 Bad Request):**

```json
{
	"status": "error",
	"message": "Validation failed",
	"errors": [
		{
			"field": "email",
			"message": "Please provide a valid email address"
		}
	]
}
```

### ❌ Test Short Password

1. **Change password to short:**
    ```json
    {
    	"email": "test@example.com",
    	"password": "123",
    	"name": "Test User"
    }
    ```
2. **Click "Send"**

**Expected Response (400 Bad Request):**

```json
{
	"status": "error",
	"message": "Validation failed",
	"errors": [
		{
			"field": "password",
			"message": "Password must be at least 6 characters long"
		}
	]
}
```

### ❌ Test Invalid Credentials

1. **Go to** "Login" request
2. **Use wrong password:**
    ```json
    {
    	"email": "user@example.com",
    	"password": "wrongpassword"
    }
    ```
3. **Click "Send"**

**Expected Response (401 Unauthorized):**

```json
{
	"status": "error",
	"message": "Invalid credentials"
}
```

### ❌ Test Without Token

1. **Go to** "Get Profile" request
2. **Delete the token** from Authorization header
3. **Click "Send"**

**Expected Response (401 Unauthorized):**

```json
{
	"status": "error",
	"message": "Access denied. No token provided."
}
```

### ❌ Test Rate Limiting

1. **Go to** "Login" request
2. **Send 6 requests quickly** (within 15 minutes)
3. **6th request should fail**

**Expected Response (429 Too Many Requests):**

```json
{
	"status": "error",
	"message": "Too many authentication attempts, please try again later."
}
```

---

## Step 6: Advanced Testing

### Test Complete Flow

1. ✅ **Register** a new user
2. ✅ **Login** with credentials
3. ✅ **Get Profile** to verify token works
4. ✅ **Create Author** for blog posts
5. ✅ **Create Blog** with image
6. ✅ **Get All Blogs** to see the new blog
7. ✅ **Update Blog** with different content
8. ✅ **Delete Blog**
9. ✅ **Logout**

### Test Edge Cases

1. ✅ **Duplicate Email Registration** - Try registering same email twice
2. ✅ **Missing Required Fields** - Remove fields from request
3. ✅ **Invalid IDs** - Use non-existent IDs for update/delete
4. ✅ **Large Images** - Test image upload limits
5. ✅ **SQL Injection Attempts** - Try SQL in inputs (should be safe)

---

## Troubleshooting

### Problem: "Cannot send request"

**Solution:** Make sure server is running (`npm run dev`)

### Problem: "401 Unauthorized" on protected routes

**Solution:**

1. Login/Register first
2. Check token is saved in collection variables
3. Verify Authorization header uses `Bearer {{authToken}}`

### Problem: "Connection refused" or "Network error"

**Solution:**

1. Check server is running
2. Verify `baseUrl` in collection variables
3. Check port (default: 3000)

### Problem: "429 Too Many Requests"

**Solution:** Wait 15 minutes or restart server (resets rate limit)

### Problem: "Image upload fails"

**Solution:**

1. Make sure body type is "form-data" not "raw JSON"
2. Use small image files
3. Check `uploads/` folder exists

### Problem: Token not auto-saving

**Solution:**

1. Check the "Tests" tab in Register/Login requests
2. Should have script: `pm.collectionVariables.set('authToken', response.data.token);`
3. Manually copy token if needed

---

## Tips for Efficient Testing

### 1. Use Collection Runner

1. **Click** collection name
2. **Click** "Run" button
3. **Select requests** to run
4. **Click "Run Blog API..."**
5. **View results** - all requests run automatically!

### 2. Save Different Users

Create environment variables for multiple users:

```
user1Email = user1@example.com
user1Token = (token here)
user2Email = user2@example.com
user2Token = (token here)
```

### 3. Use Pre-request Scripts

Add to collection/request:

```javascript
// Generate random email
pm.variables.set("randomEmail", `test${Date.now()}@example.com`);
```

### 4. Use Assertions in Tests Tab

Add to verify responses:

```javascript
pm.test("Status code is 200", function () {
	pm.response.to.have.status(200);
});

pm.test("Response has token", function () {
	var jsonData = pm.response.json();
	pm.expect(jsonData.data.token).to.exist;
});
```

---

## Quick Testing Checklist

Use this to verify everything works:

### Authentication

-   [ ] Register new user (201)
-   [ ] Register duplicate email (400)
-   [ ] Login with valid credentials (200)
-   [ ] Login with invalid credentials (401)
-   [ ] Get profile with token (200)
-   [ ] Get profile without token (401)
-   [ ] Logout (200)
-   [ ] Test rate limiting (429 after 5 attempts)

### Authors

-   [ ] Create author (200)
-   [ ] Get all authors (200)
-   [ ] Update author (200)
-   [ ] Delete author (200)

### Blogs

-   [ ] Create blog without image (200)
-   [ ] Create blog with image (200)
-   [ ] Get all blogs (200)
-   [ ] Update blog (200)
-   [ ] Delete blog (200)

### Validation

-   [ ] Invalid email format (400)
-   [ ] Short password (400)
-   [ ] Missing required fields (400)

---

## Video Tutorial Alternative

If you prefer video tutorials, search YouTube for:

-   "How to import Postman collection"
-   "Postman authentication with JWT"
-   "Postman testing REST API"

---

## Need More Help?

1. **Check** API_REFERENCE.md for endpoint details
2. **Review** INSTALLATION.md for setup issues
3. **See** server console for error messages
4. **Check** database with `npx prisma studio`

---

## Success Criteria

✅ You're successfully testing if:

1. All authentication endpoints work
2. Token is automatically saved and used
3. Protected routes work with token
4. CRUD operations complete successfully
5. Validation errors are caught
6. Rate limiting activates after 5 auth attempts

🎉 **Happy Testing!**
