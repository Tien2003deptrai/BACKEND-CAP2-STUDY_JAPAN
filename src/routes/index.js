const express = require("express");
const AuthRoute = require("./auth.route");
const CourseRoute = require("./course.route");
const { authenticateJWT } = require("../middleware/auth.middleware");
const router = express.Router();

// AUTH Routes * /api/auth/*
router.use("/auth", AuthRoute);
router.use("/course", authenticateJWT, CourseRoute);

module.exports = router;
