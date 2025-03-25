const userModel = require('../user.model')
const { convert2ObjectId } = require('../../utils')

const AdminRepo = {
  // Teacher operations
  getAllTeachers: async ({ limit = 10, skip = 0 }) => {
    return userModel
      .find({ roles: 'teacher' })
      .select('-password')
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .lean()
  },

  getTeacherById: async (teacher_id) => {
    return userModel
      .findOne({ _id: convert2ObjectId(teacher_id), roles: 'teacher' })
      .select('-password')
      .lean()
  },

  updateTeacherStatus: async (teacher_id, { status }) => {
    return userModel
      .findOneAndUpdate(
        { _id: convert2ObjectId(teacher_id), roles: 'teacher' },
        { status },
        { new: true }
      )
      .select('-password')
      .lean()
  },

  // Student operations
  getAllStudents: async ({ limit = 10, skip = 0 }) => {
    return userModel
      .find({ roles: 'student' })
      .select('-password')
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .lean()
  },

  getStudentById: async (student_id) => {
    return userModel
      .findOne({ _id: convert2ObjectId(student_id), roles: 'student' })
      .select('-password')
      .lean()
  },

  updateStudentStatus: async (student_id, { status }) => {
    return userModel
      .findOneAndUpdate(
        { _id: convert2ObjectId(student_id), roles: 'student' },
        { status },
        { new: true }
      )
      .select('-password')
      .lean()
  },

  // Statistics
  getDashboardStats: async () => {
    const [totalTeachers, totalStudents, activeTeachers, activeStudents] = await Promise.all([
      userModel.countDocuments({ roles: 'teacher' }),
      userModel.countDocuments({ roles: 'student' }),
      userModel.countDocuments({ roles: 'teacher', status: 'active' }),
      userModel.countDocuments({ roles: 'student', status: 'active' })
    ])

    return {
      totalTeachers,
      totalStudents,
      activeTeachers,
      activeStudents,
      inactiveTeachers: totalTeachers - activeTeachers,
      inactiveStudents: totalStudents - activeStudents
    }
  }
}

module.exports = AdminRepo
