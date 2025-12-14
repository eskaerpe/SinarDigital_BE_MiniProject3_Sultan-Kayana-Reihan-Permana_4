const { PrismaClient } = require("@prisma/client");
const authorsData = require("../data/authors.json");
const blogData = require("../data/blog.json");

const prisma = new PrismaClient();

async function main() {
	console.log("Starting database seed...");

	// Clear existing data (optional - remove if you want to keep existing data)
	console.log("Clearing existing data...");
	await prisma.post.deleteMany({});
	await prisma.author.deleteMany({});

	// Seed Authors
	console.log("Seeding authors...");
	const authorMap = new Map(); // To store author name -> author id mapping

	for (const authorData of authorsData) {
		const author = await prisma.author.create({
			data: {
				name: authorData.name,
				email: authorData.email,
				number: authorData.number,
			},
		});
		authorMap.set(author.name, author.id);
		console.log(`Created author: ${author.name}`);
	}

	// Seed Posts (Blogs)
	console.log("Seeding posts...");
	for (const postData of blogData) {
		// Find the author id from the author name
		const authorId = authorMap.get(postData.author);

		if (authorId) {
			await prisma.post.create({
				data: {
					title: postData.title,
					content: postData.content,
					authorId: authorId,
				},
			});
			console.log(`Created post: ${postData.title} by ${postData.author}`);
		} else {
			// If author not found, create a default author or skip
			console.warn(`Author "${postData.author}" not found for post "${postData.title}". Skipping...`);
		}
	}

	console.log("Seed completed successfully!");
}

main()
	.catch((e) => {
		console.error("Error seeding database:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
