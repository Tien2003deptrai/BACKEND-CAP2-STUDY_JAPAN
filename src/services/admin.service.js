const AdminRepo = require('../models/repos/admin.repo')
const throwError = require('../res/throwError')

const AdminService = {
  // Teacher operations
  getAllTeachers: async ({ limit, skip }) => {
    const teachers = await AdminRepo.getAllTeachers({ limit, skip })
    if (!teachers.length) throwError('No teachers found')
    return teachers
  },

  getTeacherById: async (teacher_id) => {
    const teacher = await AdminRepo.getTeacherById(teacher_id)
    if (!teacher) throwError('Teacher not found')
    return teacher
  },

  updateTeacherStatus: async (teacher_id, { status }) => {
    if (!['active', 'inactive'].includes(status)) {
      throwError('Invalid status. Must be either "active" or "inactive"')
    }

    const teacher = await AdminRepo.updateTeacherStatus(teacher_id, { status })
    if (!teacher) throwError('Teacher not found')
    return teacher
  },

  // Student operations
  getAllStudents: async ({ limit, skip }) => {
    const students = await AdminRepo.getAllStudents({ limit, skip })
    if (!students.length) throwError('No students found')
    return students
  },

  getStudentById: async (student_id) => {
    const student = await AdminRepo.getStudentById(student_id)
    if (!student) throwError('Student not found')
    return student
  },

  updateStudentStatus: async (student_id, { status }) => {
    if (!['active', 'inactive'].includes(status)) {
      throwError('Invalid status. Must be either "active" or "inactive"')
    }

    const student = await AdminRepo.updateStudentStatus(student_id, { status })
    if (!student) throwError('Student not found')
    return student
  },

  // Dashboard statistics
  getDashboardStats: async () => {
    return AdminRepo.getDashboardStats()
  }
}

module.exports = AdminService
