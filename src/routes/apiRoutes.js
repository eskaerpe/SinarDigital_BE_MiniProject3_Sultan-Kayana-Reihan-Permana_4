const express = require("express");
const { Blog, Author } = require("../controllers/apiController.js");
const { validateBlog } = require("../middlewares/validator.js");
const { upload } = require("../middlewares/upload.js");

const router = express.Router();

// route for blog
router.get("/blog", Blog.getAllBlogs);
router.post("/blog", upload.single("image"), validateBlog, Blog.createBlog);
router.put("/blog/:id", upload.single("image"), validateBlog, Blog.updateBlog);
router.delete("/blog/:id", Blog.deleteBlog);

// defining route for authors
router.get("/authors", Author.getAllAuthors);
router.post("/authors", Author.createAuthor);
router.put("/authors/:id", Author.updateAuthor);
router.delete("/authors/:id", Author.deleteAuthor);

module.exports = router; // biar bisa di import di file lain
