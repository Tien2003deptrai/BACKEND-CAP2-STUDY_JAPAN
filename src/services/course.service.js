const courseModel = require('../models/course.model')
const progressionModel = require('../models/progression.model')
const userModel = require('../models/user.model')
const { removeUnderfinedObjectKey, convert2ObjectId } = require('../utils')
const NotificationService = require('./notification.service')
const CourseRepo = require('../models/repos/course.repo')
const throwError = require('../res/throwError')

const CourseService = {
  // Đăng ký khóa học
  async registerCourse({ userId, courseId }) {
    const userObjectId = convert2ObjectId(userId)
    const courseObjectId = convert2ObjectId(courseId)

    const [user, course, userProgression] = await Promise.all([
      this._validateUser(userObjectId),
      this._validateCourse(courseObjectId),
      this._getUserProgression(userObjectId)
    ])

    this._checkCourseRegistration(userProgression, courseId)

    course.stu_num += 1
    userProgression.progress.push({ course: courseObjectId })
    await Promise.all([course.save(), userProgression.save()])
    return 1
  },

  // Lấy tất cả khóa học
  async getAllCourse(userId) {
    const userObjectId = convert2ObjectId(userId)
    const [listCourse, userProgression] = await Promise.all([
      CourseRepo.getAll(),
      progressionModel.findOne({ user: userObjectId }).lean()
    ])

    if (!listCourse.length) return []

    const registeredCourses = new Set(
      (userProgression?.progress || []).map((p) => p.course.toString())
    )

    return listCourse.map((course) => ({
      _id: course._id,
      name: course.name,
      thumb: course.thumb,
      user: course.user,
      course_slug: course.course_slug || '',
      type: course.type,
      author: course.author,
      stu_num: course.stu_num,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      registered: registeredCourses.has(course._id.toString())
    }))
  },

  // Tạo khóa học mới
  async createCourse({ name, thumb, user }) {
    const userObjectId = convert2ObjectId(user)

    if (await CourseRepo.findByName(name)) throwError('Course name already exists')
    const author = (await userModel.findById(userObjectId).lean()) || throwError('Author not found')

    const newCourse =
      (await courseModel.create({
        name,
        thumb,
        user: userObjectId,
        author: author.name
      })) || throwError('Create course failed')

    const allStudents = await userModel.find({ roles: 'user' }).distinct('_id')

    if (allStudents.length > 0) {
      NotificationService.pushNotificationToSystem({
        type: 'COURSE-001',
        receivedIds: allStudents,
        senderId: userObjectId,
        option: { course_name: newCourse.name }
      }).catch(console.error)
    }

    return newCourse
  },

  // Cập nhật khóa học
  async updateCourse(course_id, bodyUpdate) {
    const courseObjectId = convert2ObjectId(course_id)
    await this._validateCourse(courseObjectId)
    return await CourseRepo.updateCourse(courseObjectId, removeUnderfinedObjectKey(bodyUpdate))
  },

  // Helper: Validate user tồn tại
  async _validateUser(userId) {
    return (await userModel.findById(userId)) || throwError('User not found')
  },

  // Helper: Validate course tồn tại
  async _validateCourse(courseId) {
    return (await courseModel.findById(courseId)) || throwError('Course not found')
  },

  // Helper: Lấy progression của user
  async _getUserProgression(userId) {
    return (
      (await progressionModel.findOne({ user: userId })) ||
      throwError('User progression data not found')
    )
  },

  // Helper: Kiểm tra xem user đã đăng ký course chưa
  _checkCourseRegistration(userProgression, courseId) {
    const isRegistered = userProgression.progress.some(
      (prog) => prog.course.toString() === courseId
    )
    if (isRegistered) throwError('User has already registered this course')
  }
}

module.exports = CourseService
