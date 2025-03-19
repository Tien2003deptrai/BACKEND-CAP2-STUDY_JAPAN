const courseModel = require('../models/course.model')
const progressionModel = require('../models/progression.model')
const userModel = require('../models/user.model')
const { removeUnderfinedObjectKey, convert2ObjectId } = require('../utils')
const NotificationService = require('./notification.service')
const CourseRepo = require('../models/repos/course.repo')
const throwError = require('../res/throwError')

const CourseService = {
  registerCourse: async ({ userId, courseId }) => {
    const userObjectId = convert2ObjectId(userId)
    const courseObjectId = convert2ObjectId(courseId)

    const [user, course, userProgression] = await Promise.all([
      CourseService._validateUser(userObjectId),
      CourseService._validateCourse(courseObjectId),
      CourseService._getUserProgression(userObjectId)
    ])

    CourseService._checkCourseRegistration(userProgression, courseId)

    course.stu_num += 1
    userProgression.progress.push({ course: courseObjectId })
    await Promise.all([course.save(), userProgression.save()])
    return 1
  },

  getAllCourse: async (userId) => {
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

  createCourse: async ({ name, thumb, user }) => {
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

    const allStudents = await userModel.find({ roles: 'student' }).distinct('_id')

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

  updateCourse: async (course_id, bodyUpdate) => {
    const courseObjectId = convert2ObjectId(course_id)
    await CourseService._validateCourse(courseObjectId)
    return await CourseRepo.updateCourse(courseObjectId, removeUnderfinedObjectKey(bodyUpdate))
  },

  _validateUser: async (userId) => {
    return (await userModel.findById(userId)) || throwError('User not found')
  },

  _validateCourse: async (courseId) => {
    return (await courseModel.findById(courseId)) || throwError('Course not found')
  },

  _getUserProgression: async (userId) => {
    return (
      (await progressionModel.findOne({ user: userId })) ||
      throwError('User progression data not found')
    )
  },

  _checkCourseRegistration: (userProgression, courseId) => {
    const isRegistered = userProgression.progress.some(
      (prog) => prog.course.toString() === courseId
    )
    if (isRegistered) throwError('User has already registered this course')
  },

  getCoursesByTeacher: async (teacher_id) => {
    const teacher = await userModel.findOne({ _id: teacher_id, roles: 'teacher' }).lean()
    if (!teacher) {
      throwError('User is not a teacher')
    }

    const courses = await courseModel.find({ user: convert2ObjectId(teacher_id) }).lean()
    if (!courses || courses.length === 0) {
      throwError('No courses found for this teacher')
    }

    return courses
  }
}

module.exports = CourseService
