function errorHandler(err, req, res, next) {
	console.error(err);
	res.status(500).json({
		status: "error",
		message: err.message,
	});
}

module.exports = errorHandler; // biar bisa di import di file lain
