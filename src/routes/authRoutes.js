const express = require("express");
const AuthController = require("../controllers/authController");
const { validate } = require("../middlewares/validator");
const { registerSchema, loginSchema } = require("../utils/validationSchemas");
const { authLimiter } = require("../middlewares/rateLimiter");
const authenticate = require("../middlewares/auth");

const router = express.Router();

router.post("/register", authLimiter, validate(registerSchema), AuthController.register);
router.post("/login", authLimiter, validate(loginSchema), AuthController.login);
router.post("/logout", authenticate, AuthController.logout);
router.get("/profile", authenticate, AuthController.getProfile);

module.exports = router;
