# API Quick Reference Guide

## Base URL

```
http://localhost:3000
```

## Authentication

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**

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

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

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

### Get Profile (Protected)

```http
GET /api/auth/profile
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**

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

### Logout (Protected)

```http
POST /api/auth/logout
Authorization: Bearer YOUR_TOKEN_HERE
```

**Response:**

```json
{
	"status": "success",
	"message": "Logout successful. Please delete the token on client side."
}
```

## Blogs

### Get All Blogs

```http
GET /api/blog
```

**Response:**

```json
[
	{
		"id": 1,
		"title": "My First Blog",
		"content": "Blog content here",
		"authorId": 1,
		"imagePath": "uploads/image-123.jpg",
		"createdAt": "2024-01-01T00:00:00.000Z",
		"updatedAt": "2024-01-01T00:00:00.000Z",
		"author": {
			"id": 1,
			"name": "John Doe",
			"email": "john@example.com"
		}
	}
]
```

### Create Blog

```http
POST /api/blog
Content-Type: multipart/form-data

title=My Blog Title
content=Blog content here
authorId=1
image=<file>
```

**Response:**

```json
{
  "message": "Blog created successfully!",
  "createdBlog": {
    "id": 1,
    "title": "My Blog Title",
    "content": "Blog content here",
    "authorId": 1,
    "imagePath": "uploads/image-123.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "author": { ... }
  }
}
```

### Update Blog

```http
PUT /api/blog/:id
Content-Type: multipart/form-data

title=Updated Title
content=Updated content
authorId=1
image=<file>
```

### Delete Blog

```http
DELETE /api/blog/:id
```

**Response:**

```json
{
  "message": "Blog deleted successfully!",
  "deleted": { ... }
}
```

## Authors

### Get All Authors

```http
GET /api/authors
```

**Response:**

```json
[
	{
		"id": 1,
		"name": "John Doe",
		"email": "john@example.com",
		"number": "1234567890",
		"createdAt": "2024-01-01T00:00:00.000Z",
		"posts": [
			{
				"id": 1,
				"title": "Blog Title"
			}
		]
	}
]
```

### Create Author

```http
POST /api/authors
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "number": "9876543210"
}
```

**Response:**

```json
{
	"message": "Author created successfully!",
	"createdAuthor": {
		"id": 2,
		"name": "Jane Smith",
		"email": "jane@example.com",
		"number": "9876543210",
		"createdAt": "2024-01-01T00:00:00.000Z"
	}
}
```

### Update Author

```http
PUT /api/authors/:id
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "email": "jane.updated@example.com",
  "number": "1111111111"
}
```

### Delete Author

```http
DELETE /api/authors/:id
```

## Error Responses

### Validation Error

```json
{
	"status": "error",
	"message": "Validation failed",
	"errors": [
		{
			"field": "email",
			"message": "Please provide a valid email address"
		},
		{
			"field": "password",
			"message": "Password must be at least 6 characters long"
		}
	]
}
```

### Authentication Error

```json
{
	"status": "error",
	"message": "Access denied. No token provided."
}
```

### Rate Limit Error

```json
{
	"status": "error",
	"message": "Too many authentication attempts, please try again later."
}
```

### Not Found Error

```json
{
	"status": "error",
	"message": "Author not found"
}
```

## HTTP Status Codes

| Status | Meaning                                      |
| ------ | -------------------------------------------- |
| 200    | OK - Request successful                      |
| 201    | Created - Resource created successfully      |
| 400    | Bad Request - Invalid input/validation error |
| 401    | Unauthorized - Invalid credentials or token  |
| 404    | Not Found - Resource doesn't exist           |
| 429    | Too Many Requests - Rate limit exceeded      |
| 500    | Internal Server Error - Server error         |

## Rate Limits

| Endpoint         | Limit        | Window     |
| ---------------- | ------------ | ---------- |
| /api/auth/\*     | 5 requests   | 15 minutes |
| /api/\* (others) | 100 requests | 15 minutes |

## Authentication Header Format

For protected endpoints:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Testing with cURL

### Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Get Profile (replace TOKEN)

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Blog with Image

```bash
curl -X POST http://localhost:3000/api/blog \
  -F "title=My Blog" \
  -F "content=Blog content" \
  -F "authorId=1" \
  -F "image=@/path/to/image.jpg"
```

## Tips

1. **Save the token**: After login/register, save the token for subsequent requests
2. **Token expiration**: Default is 7 days (configurable in .env)
3. **Image uploads**: Use multipart/form-data, not JSON
4. **Rate limiting**: Wait 15 minutes if blocked
5. **Testing**: Use the Postman collection for easier testing

## Common Workflows

### First Time Setup

1. Register a new user → Save token
2. Create an author
3. Create a blog post with the author's ID

### Regular Usage

1. Login → Get token
2. Access protected endpoints with token
3. Perform CRUD operations

### Admin Tasks

1. Access /blog-view for UI
2. Or use API endpoints for programmatic access
