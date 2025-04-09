const progressionModel = require('../models/progression.model')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const { getInfoData, generateToken, generateRandomPassword } = require('../utils')
const { sendRegistrationEmail } = require('../config/services/mailService')
const throwError = require('../res/throwError')

// Trả về thông tin user đã lọc
const filterUserData = (user) =>
  getInfoData({ fields: ['_id', 'name', 'email', 'roles'], object: user })

const AuthService = {
  signUp: async ({ name, email }) => {
    await AuthService._checkUserExists(email)

    const randomPassword = generateRandomPassword(10)
    const hashedPassword = await AuthService._hashPassword(randomPassword)
    console.log('randomPassword', randomPassword)

    const newUser =
      (await userModel.create({
        name,
        email,
        password: hashedPassword,
        roles: 'user'
      })) || throwError('User creation failed')

    await progressionModel.create({ user: newUser._id })
    await sendRegistrationEmail(name, email, randomPassword)

    return { success: true, user: filterUserData(newUser) }
  },

  login: async ({ email, password }) => {
    const user = await AuthService._validateUserCredentials(email, password)

    if (user.status !== 'active') {
      throwError('Tài khoản chưa được kích hoạt hoặc đã bị khóa')
    }

    user.last_login_at = new Date()
    await user.save()

    const token = generateToken(user) // nên include _id, roles
    return {
      success: true,
      token,
      user: filterUserData(user)
    }
  },

  _checkUserExists: async (email) => {
    if (await userModel.findOne({ email }).lean()) {
      throwError('User already exists')
    }
  },

  _hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  },

  _validateUserCredentials: async (email, password) => {
    const user =
      (await userModel.findOne({ email }).select('+password')) ||
      throwError('Invalid email or password')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throwError('Invalid email or password')
    return user
  }
}

module.exports = AuthService
