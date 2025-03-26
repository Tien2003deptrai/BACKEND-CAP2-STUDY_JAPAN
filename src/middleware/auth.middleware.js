const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const ApiRes = require('../res/ApiRes')

const authenticateJWT = async (req, res, next) => {
  try {
    // console.log("Authorization header:", req.headers.authorization);
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiRes.error(res, 'Unauthorized: No valid token provided')
    }

    const token = authHeader.split(' ')[1]
    // console.log("Token:", token);
    if (!token) {
      return ApiRes.error(res, 'Unauthorized: Token missing')
    }

    const decoded = jwt.verify(token, 'default_secret')
    // console.log("Decoded token:", decoded);
    if (!decoded || !decoded.id) {
      return ApiRes.error(res, 'Invalid token payload')
    }

    const user = await userModel.findById(decoded.id).select('-password').lean()
    // console.log("User from DB:", user);
    if (!user) {
      return ApiRes.error(res, 'User not found')
    }

    req.user = {
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
      roles: user.roles
    }

    next()
  } catch (error) {
    console.log('Error in authenticateJWT:', error.message, error.stack)
    return ApiRes.error(res, 'Invalid token', error.message)
  }
}

const authorizeRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.roles)) {
    return ApiRes.error(res, 'Forbidden: Access denied')
  }
  console.log('roles', req.user.roles)
  next()
}

module.exports = { authenticateJWT, authorizeRole }
