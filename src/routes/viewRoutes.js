const express = require("express");
const ViewController = require("../controllers/viewController");
const { upload } = require("../middlewares/upload");

const router = express.Router();

// List posts
router.get("/", ViewController.listPosts);

// Create
router.get("/new", ViewController.renderCreate);
router.post("/", upload.single("image"), ViewController.createPost);

// Update
router.get("/:id/edit", ViewController.renderEdit);
router.post("/:id/update", upload.single("image"), ViewController.updatePost);

// Delete
router.post("/:id/delete", ViewController.deletePost);

module.exports = router;
