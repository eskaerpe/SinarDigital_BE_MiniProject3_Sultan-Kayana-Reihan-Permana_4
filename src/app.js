const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const indexRoutes = require("./routes/index.js");
const apiRoutes = require("./routes/apiRoutes.js");
const viewRoutes = require("./routes/viewRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

// middleware
const errorHandler = require("./middlewares/errorHandler.js");
const { generalLimiter } = require("./middlewares/rateLimiter.js");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");
app.locals.title = "Blog";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Apply rate limiting to all routes
app.use(generalLimiter);

// ROUTES
app.use("/", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/blog-view", viewRoutes);

// use ERROR HANDLER
app.use(errorHandler);

module.exports = app;
