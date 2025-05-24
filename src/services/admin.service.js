const progressionModel = require('../models/progression.model')
const AdminRepo = require('../models/repos/admin.repo')
const EnrollmentRepo = require('../models/repos/EnrollmentRepo')
const userModel = require('../models/user.model')
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

  getStudentsByCourse: async (courseId) => {
    const data = await EnrollmentRepo.getStudentsByCourse(courseId)
    return data.map((e) =>
      getInfoData({ fields: ['_id', 'user.name', 'user.email', 'user.avatar'], object: e })
    )
  },

  getCoursesByStudent: async (studentId) => {
    const data = await EnrollmentRepo.getCoursesByStudent(studentId)
    console.log('📦 ENROLLMENTS:', data) // Kiểm tra xem có course không
    return data
      .filter((e) => e.course)
      .map((e) => ({
        _id: e._id,
        enrolledAt: e.enrolledAt,
        course: {
          _id: e.course._id,
          name: e.course.name,
          thumb: e.course.thumb,
          type: e.course.type,
          stu_num: e.course.stu_num
        }
      }))
  },
  enrollStudent: async ({ studentId, courseId }) => {
    await EnrollmentRepo.enrollStudent(studentId, courseId)
  },

  removeEnrollment: async ({ studentId, courseId }) => {
    await EnrollmentRepo.removeEnrollment(studentId, courseId)
  },

  getRecentStudents: async (limit = 5) => {
    const users = await userModel
      .find({ roles: 'student' })
      .sort({ last_active_at: -1 }) // Ưu tiên học viên hoạt động gần đây
      .limit(limit)
      .lean()

    const progressionMap = await progressionModel
      .find({
        user: { $in: users.map((u) => u._id) }
      })
      .select('user progress')
      .lean()

    const progressDict = {}
    progressionMap.forEach((p) => {
      progressDict[p.user.toString()] = p
    })

    return users.map((u) => ({
      id: u._id,
      name: u.name,
      level: u.student_profile?.learning_level || 'N5',
      progress: u.student_profile?.progress || 0,
      lastActive: AdminService.formatTimeAgo(u.last_active_at)
    }))
  },

  formatTimeAgo: (date) => {
    if (!date) return 'Chưa hoạt động'
    const diff = Date.now() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 60) return `${minutes} phút trước`
    if (hours < 24) return `${hours} giờ trước`
    return `${days} ngày trước`
  }
}

module.exports = AdminService
