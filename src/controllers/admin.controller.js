const AdminService = require('../services/admin.service')
const handleRequest = require('./BaseController')

const AdminController = {
  // Teacher operations
  getAllTeachers: async (req, res) => {
    const { limit, skip } = req.query
    await handleRequest(
      res,
      () => AdminService.getAllTeachers({ limit, skip }),
      'Get all teachers successfully'
    )
  },

  getTeacherById: async (req, res) => {
    const { teacher_id } = req.params
    await handleRequest(
      res,
      () => AdminService.getTeacherById(teacher_id),
      'Get teacher by id successfully'
    )
  },

  updateTeacherStatus: async (req, res) => {
    const { teacher_id } = req.params
    const { status } = req.body
    await handleRequest(
      res,
      () => AdminService.updateTeacherStatus(teacher_id, { status }),
      'Update teacher status successfully'
    )
  },

  // Student operations
  getAllStudents: async (req, res) => {
    const { limit, skip } = req.query
    await handleRequest(
      res,
      () => AdminService.getAllStudents({ limit, skip }),
      'Get all students successfully'
    )
  },

  getStudentById: async (req, res) => {
    const { student_id } = req.params
    await handleRequest(
      res,
      () => AdminService.getStudentById(student_id),
      'Get student by id successfully'
    )
  },

  updateStudentStatus: async (req, res) => {
    const { student_id } = req.params
    const { status } = req.body
    await handleRequest(
      res,
      () => AdminService.updateStudentStatus(student_id, { status }),
      'Update student status successfully'
    )
  },

  // Dashboard statistics
  getDashboardStats: async (req, res) => {
    await handleRequest(
      res,
      () => AdminService.getDashboardStats(),
      'Get dashboard statistics successfully'
    )
  }
}

module.exports = AdminController
