const prisma = require("../utils/prisma");
const fs = require("fs");
const path = require("path");

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

class ViewController {
	static async listPosts(req, res) {
		try {
			const posts = await prisma.post.findMany({
				include: { author: true },
				orderBy: { createdAt: "desc" },
			});
			res.render("blog/list", { posts });
		} catch (err) {
			res.status(500).send("Failed to load posts");
		}
	}

	static async renderCreate(req, res) {
		try {
			const authors = await prisma.author.findMany({ orderBy: { name: "asc" } });
			res.render("blog/form", { mode: "create", post: null, authors });
		} catch (err) {
			res.status(500).send("Failed to load form");
		}
	}

	static async createPost(req, res) {
		try {
			const { title, authorId, content } = req.body;
			const imagePath = req.file ? toDbPath(req.file.filename) : null;
			await prisma.post.create({
				data: {
					title,
					content,
					authorId: parseInt(authorId),
					...(imagePath && { imagePath }),
				},
			});
			res.redirect("/blog-view");
		} catch (err) {
			res.status(500).send("Failed to create post");
		}
	}

	static async renderEdit(req, res) {
		try {
			const id = parseInt(req.params.id);
			const post = await prisma.post.findUnique({
				where: { id },
				include: { author: true },
			});
			if (!post) return res.status(404).send("Post not found");
			const authors = await prisma.author.findMany({ orderBy: { name: "asc" } });
			res.render("blog/form", { mode: "edit", post, authors });
		} catch (err) {
			res.status(500).send("Failed to load form");
		}
	}

	static async updatePost(req, res) {
		try {
			const id = parseInt(req.params.id);
			const { title, authorId, content } = req.body;
			const incomingImagePath = req.file ? toDbPath(req.file.filename) : null;
			const existing = await prisma.post.findUnique({ where: { id } });
			if (!existing) return res.status(404).send("Post not found");

			if (incomingImagePath) {
				deleteFileIfExists(existing.imagePath);
			}

			await prisma.post.update({
				where: { id },
				data: {
					title,
					content,
					...(authorId && { authorId: parseInt(authorId) }),
					...(incomingImagePath && { imagePath: incomingImagePath }),
				},
			});
			res.redirect("/blog-view");
		} catch (err) {
			res.status(500).send("Failed to update post");
		}
	}

	static async deletePost(req, res) {
		try {
			const id = parseInt(req.params.id);
			const existing = await prisma.post.findUnique({ where: { id } });
			if (!existing) return res.status(404).send("Post not found");

			await prisma.post.delete({ where: { id } });
			deleteFileIfExists(existing.imagePath);
			res.redirect("/blog-view");
		} catch (err) {
			res.status(500).send("Failed to delete post");
		}
	}
}

module.exports = ViewController;
