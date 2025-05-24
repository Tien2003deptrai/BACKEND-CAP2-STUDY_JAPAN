const AdminService = require('../services/admin.service')
const handleRequest = require('./BaseController')

const AdminController = {
  // Teacher operations
  getAllTeachers: async (req, res) => {
    const { limit, skip } = req.query
    console.log('user', req.user.roles)
    await handleRequest(
      res,
      () => AdminService.getAllTeachers({ limit, skip }),
      'Lấy danh sách giáo viên thành công'
    )
  },

  getTeacherById: async (req, res) => {
    const { teacher_id } = req.params
    await handleRequest(
      res,
      () => AdminService.getTeacherById(teacher_id),
      'Lấy thông tin giáo viên thành công'
    )
  },

  updateTeacherStatus: async (req, res) => {
    const { teacher_id } = req.params
    const { status } = req.body
    await handleRequest(
      res,
      () => AdminService.updateTeacherStatus(teacher_id, { status }),
      'Cập nhật trạng thái giáo viên thành công'
    )
  },

  // Student operations
  getAllStudents: async (req, res) => {
    const { limit, skip } = req.query
    await handleRequest(
      res,
      () => AdminService.getAllStudents({ limit, skip }),
      'Lấy danh sách học viên thành công'
    )
  },

  getStudentById: async (req, res) => {
    const { student_id } = req.params
    await handleRequest(
      res,
      () => AdminService.getStudentById(student_id),
      'Lấy thông tin học viên thành công'
    )
  },

  updateStudentStatus: async (req, res) => {
    const { student_id } = req.params
    const { status } = req.body
    await handleRequest(
      res,
      () => AdminService.updateStudentStatus(student_id, { status }),
      'Cập nhật trạng thái học viên thành công'
    )
  },

  // Dashboard statistics
  getDashboardStats: async (req, res) => {
    await handleRequest(
      res,
      () => AdminService.getDashboardStats(),
      'Lấy thống kê tổng quan thành công'
    )
  },

  // Enrollment
  getStudentsByCourse: (req, res) =>
    handleRequest(
      res,
      () => AdminService.getStudentsByCourse(req.params.course_id),
      'Lấy danh sách học viên theo khóa học'
    ),

  getCoursesByStudent: (req, res) =>
    handleRequest(
      res,
      () => AdminService.getCoursesByStudent(req.params.student_id),
      'Lấy danh sách khóa học của học viên'
    ),

  enrollStudent: (req, res) => {
    const { studentId, courseId } = req.body
    return handleRequest(
      res,
      () => AdminService.enrollStudent({ studentId, courseId }),
      'Ghi danh học viên thành công'
    )
  },

  removeEnrollment: (req, res) => {
    const { studentId, courseId } = req.body
    return handleRequest(
      res,
      () => AdminService.removeEnrollment({ studentId, courseId }),
      'Huỷ ghi danh học viên thành công'
    )
  },

  getRecentStudents: async (req, res) => {
    handleRequest(
      res,
      () => AdminService.getRecentStudents(),
      'Lấy danh sách học viên gần đây thành công'
    )
  }
}

module.exports = AdminController
