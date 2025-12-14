const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.redirect("/blog-view");
});

module.exports = router; // biar bisa di import di file lain
