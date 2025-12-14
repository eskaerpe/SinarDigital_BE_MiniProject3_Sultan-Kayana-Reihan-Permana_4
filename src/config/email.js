const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST || "smtp.gmail.com",
	port: process.env.EMAIL_PORT || 587,
	secure: false,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const sendEmail = async (to, subject, html) => {
	try {
		if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
			console.log("Email not configured. Skipping email send.");
			return { success: false, message: "Email not configured" };
		}

		const mailOptions = {
			from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
			to,
			subject,
			html,
		};

		const info = await transporter.sendMail(mailOptions);
		return { success: true, messageId: info.messageId };
	} catch (error) {
		console.error("Email send error:", error);
		return { success: false, error: error.message };
	}
};

module.exports = { sendEmail };
