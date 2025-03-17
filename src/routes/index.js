const express = require("express");
const { authenticateJWT } = require("../middleware/auth.middleware");
const AuthRoute = require("./auth.route");
const CourseRoute = require("./course.route");
const LessonRoute = require("./lesson.route");
const router = express.Router();

// AUTH Routes * /api/auth/*
router.use("/auth", AuthRoute);
router.use("/course", authenticateJWT, CourseRoute);
router.use("/lesson", authenticateJWT, LessonRoute);

module.exports = router;
