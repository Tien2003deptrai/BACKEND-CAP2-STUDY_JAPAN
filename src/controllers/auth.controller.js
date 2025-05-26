const AuthService = require('../services/auth.service')
const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')

const AuthController = {
  signUp: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['name', 'email', 'phone'], req.body)

        const { name, email, phone, date_of_birth, sex, avatar, student_profile } = req.body

        return await AuthService.signUp({
          name,
          email,
          phone,
          date_of_birth,
          sex,
          avatar,
          student_profile
        })
      },
      'Tạo tài khoản học viên thành công'
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
