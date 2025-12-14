const prisma = require("../utils/prisma");
const { sendSuccess, sendError } = require("../utils/response");
const fs = require("fs");
const path = require("path");

// Normalize stored path to forward slashes for DB
const toDbPath = (filename) => path.posix.join("uploads", filename);

const deleteFileIfExists = (filePath) => {
	if (!filePath) return;
	const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
	if (fs.existsSync(absolutePath)) {
		try {
			fs.unlinkSync(absolutePath);
		} catch (err) {
			console.error(`Failed to delete file ${absolutePath}:`, err.message);
		}
	}
};

class Blog {
	static async getAllBlogs(req, res) {
		try {
			const blogs = await prisma.post.findMany({
				include: {
					author: true, // Include author information
				},
				orderBy: {
					createdAt: "desc",
				},
			});
			res.json(blogs);
		} catch (error) {
			res.status(500).json({ error: "Failed to fetch blogs", details: error.message });
		}
	}

	static async createBlog(req, res) {
		try {
			const { title, authorId, content } = req.body;
			const imagePath = req.file ? toDbPath(req.file.filename) : null;

			// Verify author exists
			const author = await prisma.author.findUnique({
				where: { id: parseInt(authorId) },
			});

			if (!author) {
				return res.status(404).json({ error: "Author not found" });
			}

			const newBlog = await prisma.post.create({
				data: {
					title,
					content,
					authorId: parseInt(authorId),
					...(imagePath && { imagePath }),
				},
				include: {
					author: true,
				},
			});

			res.json({ message: "Blog created successfully!", createdBlog: newBlog });
		} catch (error) {
			res.status(500).json({ error: "Failed to create blog", details: error.message });
		}
	}

	static async updateBlog(req, res) {
		try {
			const existingId = parseInt(req.params.id);
			const { title, authorId, content } = req.body;
			const incomingImagePath = req.file ? toDbPath(req.file.filename) : null;

			// Check if blog exists
			const existingBlog = await prisma.post.findUnique({
				where: { id: existingId },
			});

			if (!existingBlog) {
				return res.status(404).json({ error: "Blog not found" });
			}

			// If authorId is provided, verify author exists
			if (authorId) {
				const author = await prisma.author.findUnique({
					where: { id: parseInt(authorId) },
				});

				if (!author) {
					return res.status(404).json({ error: "Author not found" });
				}
			}

			// Handle image replacement
			if (incomingImagePath) {
				deleteFileIfExists(existingBlog.imagePath);
			}

			const updatedBlog = await prisma.post.update({
				where: { id: existingId },
				data: {
					title,
					content,
					...(authorId && { authorId: parseInt(authorId) }),
					...(incomingImagePath && { imagePath: incomingImagePath }),
				},
				include: {
					author: true,
				},
			});

			res.json({ message: "Blog updated successfully!", updated: updatedBlog });
		} catch (error) {
			res.status(500).json({ error: "Failed to update blog", details: error.message });
		}
	}

	static async deleteBlog(req, res) {
		try {
			const existingId = parseInt(req.params.id);

			// Check if blog exists
			const existingBlog = await prisma.post.findUnique({
				where: { id: existingId },
			});

			if (!existingBlog) {
				return res.status(404).json({ error: "Blog not found" });
			}

			const deleted = await prisma.post.delete({
				where: { id: existingId },
				include: {
					author: true,
				},
			});

			deleteFileIfExists(existingBlog.imagePath);

			res.json({ message: "Blog deleted successfully!", deleted });
		} catch (error) {
			res.status(500).json({ error: "Failed to delete blog", details: error.message });
		}
	}
}

class Author {
	static async getAllAuthors(req, res) {
		try {
			const authors = await prisma.author.findMany({
				include: {
					posts: true, // Include all posts by each author
				},
				orderBy: {
					name: "asc",
				},
			});
			res.json(authors);
		} catch (error) {
			res.status(500).json({ error: "Failed to fetch authors", details: error.message });
		}
	}

	static async createAuthor(req, res) {
		try {
			const { name, email, number } = req.body;

			const newAuthor = await prisma.author.create({
				data: {
					name,
					email,
					number,
				},
			});

			res.json({ message: "Author created successfully!", createdAuthor: newAuthor });
		} catch (error) {
			// Handle unique constraint violations
			if (error.code === "P2002") {
				return res.status(400).json({ error: "Email or phone number already exists" });
			}
			res.status(500).json({ error: "Failed to create author", details: error.message });
		}
	}

	static async updateAuthor(req, res) {
		try {
			const existingId = parseInt(req.params.id);
			const { name, email, number } = req.body;

			// Check if author exists
			const existingAuthor = await prisma.author.findUnique({
				where: { id: existingId },
			});

			if (!existingAuthor) {
				return res.status(404).json({ error: "Author not found" });
			}

			const updatedAuthor = await prisma.author.update({
				where: { id: existingId },
				data: {
					name,
					email,
					number,
				},
			});

			res.json({ message: "Author updated successfully!", updated: updatedAuthor });
		} catch (error) {
			if (error.code === "P2002") {
				return res.status(400).json({ error: "Email or phone number already exists" });
			}
			res.status(500).json({ error: "Failed to update author", details: error.message });
		}
	}

	static async deleteAuthor(req, res) {
		try {
			const existingId = parseInt(req.params.id);

			// Check if author exists
			const existingAuthor = await prisma.author.findUnique({
				where: { id: existingId },
			});

			if (!existingAuthor) {
				return res.status(404).json({ error: "Author not found" });
			}

			const deleted = await prisma.author.delete({
				where: { id: existingId },
			});

			res.json({ message: "Author deleted successfully!", deleted });
		} catch (error) {
			res.status(500).json({ error: "Failed to delete author", details: error.message });
		}
	}
}

module.exports = { Author, Blog };
