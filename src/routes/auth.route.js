const express = require('express')
const AuthController = require('../controllers/auth.controller')
const router = express.Router()

router.post('/signup', AuthController.signUp)
router.post('/login', AuthController.login)

module.exports = router
