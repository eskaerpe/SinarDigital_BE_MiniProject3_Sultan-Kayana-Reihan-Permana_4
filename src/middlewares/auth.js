const { verifyToken } = require("../utils/jwt");
const { sendError } = require("../utils/response");
const prisma = require("../utils/prisma");

const authenticate = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return sendError(res, 401, "Access denied. No token provided.");
		}

		const token = authHeader.split(" ")[1];

		try {
			const decoded = verifyToken(token);

			const user = await prisma.user.findUnique({
				where: { id: decoded.userId },
				select: { id: true, email: true, name: true },
			});

			if (!user) {
				return sendError(res, 401, "User not found.");
			}

			req.user = user;
			next();
		} catch (error) {
			return sendError(res, 401, "Invalid or expired token.");
		}
	} catch (error) {
		return sendError(res, 500, "Authentication error.", error.message);
	}
};

module.exports = authenticate;
