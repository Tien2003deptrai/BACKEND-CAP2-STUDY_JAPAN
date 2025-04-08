// 📁 controllers/user.controller.js
const UserService = require('../services/user.service')
const handleRequest = require('./BaseController')

const UserController = {
  forgotPassword: (req, res) =>
    handleRequest(
      res,
      () => UserService.forgotPassword(req.body.email),
      'Đã gửi email đặt lại mật khẩu'
    ),

  resetPassword: (req, res) =>
    handleRequest(
      res,
      () => {
        const { token, newPassword } = req.body
        return UserService.resetPassword(token, newPassword)
      },
      'Đặt lại mật khẩu thành công'
    ),

  changePassword: (req, res) =>
    handleRequest(
      res,
      () => {
        const { oldPassword, newPassword } = req.body
        return UserService.changePassword(req.user.userId, oldPassword, newPassword)
      },
      'Đổi mật khẩu thành công'
    ),

  updateProfile: (req, res) =>
    handleRequest(
      res,
      () => UserService.updateProfile(req.user.userId, req.body),
      'Cập nhật thông tin thành công'
    ),

  logoutAll: (req, res) =>
    handleRequest(
      res,
      () => UserService.logoutAllSessions(req.user.userId),
      'Đã đăng xuất khỏi tất cả thiết bị'
    )
}

module.exports = UserController
