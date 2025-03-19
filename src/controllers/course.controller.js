const { validateRequiredFields } = require('../validators')
const handleRequest = require('./BaseController')
const CourseService = require('../services/course.service')

const CourseController = {
  registerCourse: (req, res) =>
    handleRequest(
      res,
      () => CourseService.registerCourse({ ...req.body, userId: req.user.userId }),
      'Đăng ký khóa học thành công'
    ),

  getAllCourses: (req, res) =>
    handleRequest(
      res,
      () => CourseService.getAllCourse(req.user.userId),
      'Lấy thông tin tất cả khóa học thành công'
    ),

  createCourse: (req, res) => {
    validateRequiredFields(['name', 'thumb'], req.body)
    handleRequest(
      res,
      () => CourseService.createCourse({ ...req.body, user: req.user.userId }),
      'Tạo khóa học thành công'
    )
  },

  updateCourse: (req, res) => {
    validateRequiredFields(['course_id'], req.params)
    handleRequest(
      res,
      () => CourseService.updateCourse(req.params.course_id, req.body),
      'Cập nhật khóa học thành công'
    )
  }
}

module.exports = CourseController
