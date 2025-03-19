const AuthService = require('../services/auth.service')
const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')

const AuthController = {
  signUp: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['name', 'email'], req.body)
        AuthService.signUp(req.body)
      },
      'Tạo tài khoản thành công'
    ),

  login: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['email', 'password'], req.body)
        AuthService.login(req.body)
      },
      'Đăng nhập thành công!'
    )
}

module.exports = AuthController
