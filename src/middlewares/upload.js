const multer = require("multer");
const path = require("path");
const fs = require("fs");

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
	fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, UPLOAD_DIR);
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		const ext = path.extname(file.originalname);
		const safeName = file.fieldname + "-" + uniqueSuffix + ext;
		cb(null, safeName);
	},
});

// Basic image filter (optional)
const fileFilter = (req, file, cb) => {
	const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
	if (!allowed.includes(file.mimetype)) {
		return cb(new Error("Only image files are allowed (jpg, png, gif, webp)"));
	}
	cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = { upload, UPLOAD_DIR };
