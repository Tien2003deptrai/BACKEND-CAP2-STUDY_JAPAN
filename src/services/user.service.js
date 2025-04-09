// 📁 services/user.service.js
const userModel = require('../models/user.model')
const throwError = require('../res/throwError')
const { sendResetPasswordEmail } = require('../config/services/mailService')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const progressionModel = require('../models/progression.model')
const { convert2ObjectId } = require('../utils')

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
  },

  // add
  getProfileUser: async (userId) => {
    const objectId = convert2ObjectId(userId)

    console.log('objectId', objectId)
    // 1. Lấy thông tin người dùng
    const user = await userModel
      .findById(objectId)
      .select('-password -reset_password_token -reset_password_expires')
      .lean()

    if (!user) throwError('Người dùng không tồn tại')

    // 2. Lấy tiến độ học tập nếu có (student hoặc teacher đều có thể có progression)
    const progression = await progressionModel
      .findOne({ user: objectId })
      .populate({
        path: 'progress.course',
        select: 'name thumb author'
      })
      .populate({
        path: 'progress.lessons',
        select: 'title' // hoặc tuỳ loại bài học
      })
      .populate({
        path: 'examsProgress.exam',
        select: 'title' // nếu có bảng exam riêng
      })
      .lean()

    // 3. Lấy danh sách khóa học đã đăng ký (student)
    let enrolledCourses = []
    if (user.roles === 'student' && user.student_profile?.enrolled_courses?.length) {
      enrolledCourses = await Course.find({
        _id: { $in: user.student_profile.enrolled_courses }
      })
        .select('name thumb author')
        .lean()
    }

    // 4. Gộp dữ liệu lại
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      phone: user.phone,
      roles: user.roles,
      status: user.status,
      student_profile: user.student_profile || null,
      teacher_profile: user.teacher_profile || null,
      admin_profile: user.admin_profile || null,
      enrolledCourses,
      progression: progression || null
    }
  }
}

module.exports = UserService
