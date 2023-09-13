// Requiring express
const router = require("express").Router();
const apiRoutes = require("./api");

// Mounting the API routes under the /api prefix
router.use("/api", apiRoutes);

// Exporting
module.exports = router;