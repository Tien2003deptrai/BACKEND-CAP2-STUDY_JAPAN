const express = require("express");
const AuthRoutes = require("./auth.route");
// const user = require("./user-type");
const router = express.Router();

// AUTH Routes * /api/auth/*
router.use("/auth", AuthRoutes);
// router.use("/user", user);

module.exports = router;
