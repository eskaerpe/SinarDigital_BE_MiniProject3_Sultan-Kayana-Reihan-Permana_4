const bcrypt = require("bcryptjs");
const prisma = require("../utils/prisma");
const { generateToken } = require("../utils/jwt");
const { sendSuccess, sendError } = require("../utils/response");
const { sendEmail } = require("../config/email");

class AuthController {
	static async register(req, res) {
		try {
			const { email, password, name } = req.body;

			const existingUser = await prisma.user.findUnique({
				where: { email },
			});

			if (existingUser) {
				return sendError(res, 400, "Email already registered");
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const user = await prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					name,
				},
				select: {
					id: true,
					email: true,
					name: true,
					createdAt: true,
				},
			});

			const token = generateToken({ userId: user.id, email: user.email });

			await sendEmail(email, "Welcome to Our Platform", `<h1>Welcome ${name}!</h1><p>Thank you for registering with us.</p>`);

			return sendSuccess(res, 201, "Registration successful", { user, token });
		} catch (error) {
			console.error("Registration error:", error);
			return sendError(res, 500, "Registration failed", error.message);
		}
	}

	static async login(req, res) {
		try {
			const { email, password } = req.body;

			const user = await prisma.user.findUnique({
				where: { email },
			});

			if (!user) {
				return sendError(res, 401, "Invalid credentials");
			}

			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (!isPasswordValid) {
				return sendError(res, 401, "Invalid credentials");
			}

			const token = generateToken({ userId: user.id, email: user.email });

			const userData = {
				id: user.id,
				email: user.email,
				name: user.name,
			};

			return sendSuccess(res, 200, "Login successful", { user: userData, token });
		} catch (error) {
			console.error("Login error:", error);
			return sendError(res, 500, "Login failed", error.message);
		}
	}

	static async logout(req, res) {
		return sendSuccess(res, 200, "Logout successful. Please delete the token on client side.");
	}

	static async getProfile(req, res) {
		try {
			return sendSuccess(res, 200, "Profile retrieved successfully", { user: req.user });
		} catch (error) {
			return sendError(res, 500, "Failed to get profile", error.message);
		}
	}
}

module.exports = AuthController;
