AdminRepo = require('../models/repos/admin.repo')
const EnrollmentRepo = require('../models/repos/EnrollmentRepo')
const { getInfoData } = require('../utils')

const AdminService = {
  // Teacher
  getAllTeachers: async (params) => {
    const teachers = await AdminRepo.getAllTeachers(params)
    return teachers.map((t) =>
      getInfoData({
        fields: ['_id', 'name', 'email', 'phone', 'status', 'teacher_profile'],
        object: t
      })
    )
  },

  getTeacherById: async (id) => {
    const teacher = await AdminRepo.getTeacherById(id)
    if (!teacher) throw new Error('Không tìm thấy giáo viên')
    return getInfoData({
      fields: ['_id', 'name', 'email', 'phone', 'status', 'teacher_profile'],
      object: teacher
    })
  },

  updateTeacherStatus: async (id, { status }) => {
    const updated = await AdminRepo.updateTeacherStatus(id, { status })
    if (!updated) throw new Error('Không cập nhật được trạng thái')
    return getInfoData({
      fields: ['_id', 'name', 'email', 'status'],
      object: updated
    })
  },

  // Student
  getAllStudents: async (params) => {
    const students = await AdminRepo.getAllStudents(params)
    return students.map((s) =>
      getInfoData({
        fields: ['_id', 'name', 'email', 'phone', 'status', 'student_profile'],
        object: s
      })
    )
  },

  getStudentById: async (id) => {
    const student = await AdminRepo.getStudentById(id)
    if (!student) throw new Error('Không tìm thấy học viên')
    return getInfoData({
      fields: ['_id', 'name', 'email', 'phone', 'status', 'student_profile'],
      object: student
    })
  },

  updateStudentStatus: async (id, { status }) => {
    const updated = await AdminRepo.updateStudentStatus(id, { status })
    if (!updated) throw new Error('Không cập nhật được trạng thái')
    return getInfoData({
      fields: ['_id', 'name', 'email', 'status'],
      object: updated
    })
  },

  // Dashboard
  getDashboardStats: async () => {
    return await AdminRepo.getDashboardStats()
  },
  // ✅ Mục tiêu các chức năng:
  // Xem danh sách học viên của một khóa học
  // Xem học viên đã đăng ký những khóa nào
  // Ghi danh thủ công học viên vào khóa học
  // Huỷ ghi danh học viên khỏi khóa học
  getStudentsByCourse: async (courseId) => {
    const data = await EnrollmentRepo.getStudentsByCourse(courseId)
    return data.map((e) =>
      getInfoData({ fields: ['_id', 'user.name', 'user.email', 'user.avatar'], object: e })
    )
  },

  getCoursesByStudent: async (studentId) => {
    const data = await EnrollmentRepo.getCoursesByStudent(studentId)
    return data.map((e) =>
      getInfoData({ fields: ['_id', 'course.name', 'course.thumb', 'course.type'], object: e })
    )
  },

  enrollStudent: async ({ studentId, courseId }) => {
    await EnrollmentRepo.enrollStudent(studentId, courseId)
  },

  removeEnrollment: async ({ studentId, courseId }) => {
    await EnrollmentRepo.removeEnrollment(studentId, courseId)
  }
}

module.exports = AdminService
