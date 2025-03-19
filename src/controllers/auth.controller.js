const AuthService = require('../services/auth.service')
const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')

const AuthController = {
  signUp: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['name', 'email'], req.body)
        return await AuthService.signUp(req.body)
      },
      'Tạo tài khoản thành công'
    ),

  login: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['email', 'password'], req.body)
        return await AuthService.login(req.body)
      },
      'Đăng nhập thành công!'
    )
}

module.exports = AuthController
