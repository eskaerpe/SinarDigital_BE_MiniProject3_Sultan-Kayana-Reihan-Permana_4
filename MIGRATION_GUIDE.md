# API Testing Guide

## Migration Complete! 🎉

Your application has been successfully migrated from JSON file storage to MySQL with Prisma.

## What Changed:

### 1. **Database Schema**

-   Created `Author` and `Post` models in Prisma
-   Added one-to-many relationship (1 author → many posts)
-   Migrated all data from JSON files to MySQL

### 2. **API Controller Updates**

-   Replaced `fs.writeFile` operations with Prisma queries
-   All methods are now `async/await`
-   Added proper error handling
-   Added CRUD operations for Authors

### 3. **Request Format Change**

**OLD (JSON):** Posts used `author` as a string

```json
{
	"title": "My Post",
	"author": "John Doe",
	"content": "Content here"
}
```

**NEW (MySQL):** Posts use `authorId` as a number

```json
{
	"title": "My Post",
	"authorId": 1,
	"content": "Content here"
}
```

## Testing the API

### Get All Blogs

```bash
curl http://localhost:3000/api/blog
```

### Get All Authors

```bash
curl http://localhost:3000/api/authors
```

### Create a New Blog (Update: use authorId from authors list)

```bash
curl -X POST http://localhost:3000/api/blog ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"New Blog Post\",\"authorId\":1,\"content\":\"This is my new blog content\"}"
```

### Update a Blog

```bash
curl -X PUT http://localhost:3000/api/blog/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Updated Title\",\"authorId\":1,\"content\":\"Updated content\"}"
```

### Delete a Blog

```bash
curl -X DELETE http://localhost:3000/api/blog/1
```

### Create a New Author

```bash
curl -X POST http://localhost:3000/api/authors ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"New Author\",\"email\":\"newauthor@example.com\",\"number\":\"999-888-7777\"}"
```

### Update an Author

```bash
curl -X PUT http://localhost:3000/api/authors/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Updated Name\",\"email\":\"updated@example.com\",\"number\":\"123-456-7890\"}"
```

### Delete an Author (will also delete all their posts due to CASCADE)

```bash
curl -X DELETE http://localhost:3000/api/authors/1
```

## Benefits of the Migration:

✅ **Data Integrity:** Foreign key constraints ensure posts always have valid authors
✅ **Better Performance:** Database indexing and query optimization
✅ **Scalability:** Can handle much larger datasets
✅ **Concurrent Access:** Multiple users can safely read/write simultaneously
✅ **Advanced Queries:** Easy to filter, sort, and join data
✅ **Automatic Timestamps:** `createdAt` and `updatedAt` tracked automatically
✅ **Type Safety:** Prisma provides TypeScript-like type checking

## Important Notes:

1. **authorId is required** when creating/updating posts
2. **Get the authorId** by calling `/api/authors` first
3. **Response format changed**: Posts now include full author object
4. **One post skipped** during seed: "Dampak Medsos..." (author "Siapa weh" didn't exist)

## Prisma Commands:

-   **View data visually:** `npx prisma studio`
-   **Create migration:** `npx prisma migrate dev --name migration_name`
-   **Reset database:** `npx prisma migrate reset`
-   **Generate client:** `npx prisma generate`

## File Structure:

```
mini_project_2/
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.js             # Data seeding script
│   └── migrations/         # Migration history
├── src/
│   ├── utils/
│   │   └── prisma.js       # Prisma client instance
│   └── controllers/
│       └── apiController.js # Updated with Prisma queries
└── data/                   # Old JSON files (can be kept as backup)
```
