// Requiring express
const router = require("express").Router();
const userRoutes = require("./users-routes");
const thoughtRoutes = require("./thoughts-routes");

// Using modular routes for users and thoughts
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

// Exporting
module.exports = router;