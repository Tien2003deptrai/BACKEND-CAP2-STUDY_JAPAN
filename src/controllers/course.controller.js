const { validateRequiredFields } = require('../validators')
const handleRequest = require('./BaseController')
const CourseService = require('../services/course.service')

const CourseController = {
  registerCourse: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await CourseService.registerCourse({ ...req.body, userId: req.user.userId })
      },
      'Đăng ký khóa học thành công'
    ),

  assignTeacher: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['courseId', 'teacherId'], req.body)
        return await CourseService.assignTeacher(req.body.courseId, req.body.teacherId)
      },
      'Gán giáo viên cho khóa học thành công'
    ),

  getAllCourses: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await CourseService.getAllCourse(req.user.userId)
      },
      'Lấy thông tin tất cả khóa học thành công'
    ),

  getAllEnrolledCourses: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['userId'], req.user)
        return await CourseService.getAllEnrolledCourses(req.user.userId)
      },
      'Lấy thông tin tất cả khóa học đã đăng ký thành công'
    ),

  createCourse: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['name'], req.body)
        return await CourseService.createCourse({ ...req.body, user: req.user.userId })
      },
      'Tạo khóa học và bài học thành công'
    ),

  updateCourse: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['course_id'], req.params)
        return await CourseService.updateCourse(req.params.course_id, req.body)
      },
      'Cập nhật khóa học thành công'
    ),

  getCoursesByTeacher: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['userId'], req.user)
        return await CourseService.getCoursesByTeacher(req.user.userId)
      },
      'Lấy danh sách khoá học theo giáo viên thành công'
    ),

  getEnrolledStudents: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['course_id'], req.params)
        return await CourseService.getEnrolledStudents(req.params.course_id)
      },
      'Lấy danh sách học viên đã đăng ký khóa học thành công'
    ),

  unenrollStudent: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['courseId', 'studentId'], req.body)
        return await CourseService.unenrollStudent({
          userId: req.body.studentId,
          courseId: req.body.courseId
        })
      },
      'Hủy đăng ký khóa học thành công'
    ),

  bulkAddStudents: async (req, res) => {
    const { studentIds, courseId } = req.body
    const result = await CourseService.addMultipleStudentsToClass({
      courseId,
      studentIds,
      adminId: req.user.userId
    })

    res.status(200).json({
      message: 'Thêm sinh viên vào khóa học thành công',
      result
    })
  }
}

module.exports = CourseController
