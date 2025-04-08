const throwError = require('../../res/throwError')
const { convert2ObjectId } = require('../../utils')
const enrollmentModel = require('../enrollment.model')

const EnrollmentRepo = {
  getStudentsByCourse: async (courseId) => {
    return enrollmentModel
      .find({ course: convert2ObjectId(courseId) })
      .populate('user', 'name email avatar')
      .lean()
  },

  getCoursesByStudent: async (studentId) => {
    return enrollmentModel
      .find({ user: convert2ObjectId(studentId) })
      .populate('course', 'name type thumb')
      .lean()
  },

  enrollStudent: async (studentId, courseId) => {
    try {
      return await enrollmentModel.create({
        user: convert2ObjectId(studentId),
        course: convert2ObjectId(courseId)
      })
    } catch (err) {
      if (err.code === 11000) {
        throwError('Học viên đã được ghi danh vào khóa học này')
      }
      throw err
    }
  },

  removeEnrollment: async (studentId, courseId) => {
    return enrollmentModel.deleteOne({
      user: convert2ObjectId(studentId),
      course: convert2ObjectId(courseId)
    })
  }
}

module.exports = EnrollmentRepo
