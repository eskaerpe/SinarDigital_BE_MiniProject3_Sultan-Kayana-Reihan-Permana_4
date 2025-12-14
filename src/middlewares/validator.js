const Joi = require("joi");
const { sendError } = require("../utils/response");

const validate = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (error) {
			const errors = error.details.map((detail) => ({
				field: detail.path.join("."),
				message: detail.message,
			}));
			return sendError(res, 400, "Validation failed", errors);
		}

		next();
	};
};

function validateBlog(req, res, next) {
	const { title, authorId, content } = req.body;
	if (!title || !authorId || !content) {
		return res.status(400).json({
			status: "error",
			message: "Title, authorId, and content are required",
		});
	}
	if (isNaN(parseInt(authorId))) {
		return res.status(400).json({
			status: "error",
			message: "authorId must be a valid number",
		});
	}
	next();
}

module.exports = { validate, validateBlog };
