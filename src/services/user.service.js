// 📁 services/user.service.js
const userModel = require('../models/user.model')
const throwError = require('../res/throwError')
const { sendResetPasswordEmail } = require('../config/services/mailService')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const UserService = {
  forgotPassword: async (email) => {
    const user = await userModel.findOne({ email })
    if (!user) throwError('Email không tồn tại')

    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 15 * 60 * 1000)

    user.reset_password_token = token
    user.reset_password_expires = expires
    await user.save()

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
    await sendResetPasswordEmail(user.name, email, resetLink)
  },

  resetPassword: async (token, newPassword) => {
    const user = await userModel.findOne({
      reset_password_token: token,
      reset_password_expires: { $gt: Date.now() }
    })
    if (!user) throwError('Token không hợp lệ hoặc đã hết hạn')

    user.password = await bcrypt.hash(newPassword, 10)
    user.reset_password_token = null
    user.reset_password_expires = null
    await user.save()
  },

  changePassword: async (userId, oldPass, newPass) => {
    const user = await userModel.findById(userId).select('+password')
    if (!user) throw new Error('Không tìm thấy người dùng')

    const isMatch = await bcrypt.compare(oldPass, user.password)
    if (!isMatch) throw new Error('Mật khẩu cũ không đúng')

    user.password = await bcrypt.hash(newPass, 10)
    await user.save()
  },

  updateProfile: async (userId, payload) => {
    const allowFields = ['name', 'phone', 'avatar', 'date_of_birth', 'sex']
    const updateData = {}
    for (const key of allowFields) {
      if (payload[key] !== undefined) updateData[key] = payload[key]
    }
    await userModel.findByIdAndUpdate(userId, updateData)
  },

  logoutAllSessions: async (userId) => {
    await userModel.findByIdAndUpdate(userId, { token_version: Date.now() })
  }
}

module.exports = UserService
