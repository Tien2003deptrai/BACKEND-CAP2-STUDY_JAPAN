const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const ApiResponse = require("../core/apiResponse");

const authenticateJWT = async (req, res, next) => {
  try {
    console.log("Authorization header:", req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return ApiResponse.error(res, "Unauthorized: No valid token provided");
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    if (!token) {
      return ApiResponse.error(res, "Unauthorized: Token missing");
    }

    const decoded = jwt.verify(token, "default_secret");
    // console.log("Decoded token:", decoded);
    if (!decoded || !decoded.id) {
      return ApiResponse.error(res, "Invalid token payload");
    }

    const user = await userModel.findById(decoded.id).select("-password").lean();
    // console.log("User from DB:", user);
    if (!user) {
      return ApiResponse.error(res, "User not found");
    }

    req.user = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      roles: user.roles,
    };

    next();
  } catch (error) {
    console.log("Error in authenticateJWT:", error.message, error.stack);
    return ApiResponse.error(res, "Invalid token", error.message);
  }
};

const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.roles)) {
    return ApiResponse.error(res, "Forbidden: Access denied");
  }
  next();
};

module.exports = { authenticateJWT, authorizeRole };
