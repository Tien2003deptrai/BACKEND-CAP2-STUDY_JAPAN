// services/dashboardChart.service.js
const User = require('../models/user.model')
const Enrollment = require('../models/enrollment.model')
const Progression = require('../models/progression.model')

const getStudentGrowth = async () => {
  return await User.aggregate([
    { $match: { roles: 'student' } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ])
}

const getCourseRegistrations = async () => {
  return await Enrollment.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$enrolledAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ])
}

const getLearningLevels = async () => {
  return await User.aggregate([
    { $match: { roles: 'student' } },
    {
      $group: {
        _id: '$student_profile.learning_level',
        count: { $sum: 1 }
      }
    }
  ])
}

const getCompletionRate = async () => {
  return await User.aggregate([
    { $match: { roles: 'student' } },
    {
      $group: {
        _id: null,
        avgProgress: { $avg: '$student_profile.progress' }
      }
    }
  ])
}

const getGameActivity = async () => {
  return await Progression.aggregate([
    { $unwind: '$gameProgress' },
    {
      $group: {
        _id: '$gameProgress.gameType',
        count: { $sum: 1 },
        avgScore: { $avg: '$gameProgress.score' }
      }
    }
  ])
}

module.exports = {
  getStudentGrowth,
  getCourseRegistrations,
  getLearningLevels,
  getCompletionRate,
  getGameActivity
}
