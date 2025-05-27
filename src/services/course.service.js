const courseModel = require('../models/course.model')
const progressionModel = require('../models/progression.model')
const userModel = require('../models/user.model')
const enrollmentModel = require('../models/enrollment.model')
const { removeUnderfinedObjectKey, convert2ObjectId } = require('../utils')
const NotificationService = require('./notification.service')
const CourseRepo = require('../models/repos/course.repo')
const throwError = require('../res/throwError')
const lessonModel = require('../models/lesson.model')
const LessonRepo = require('../models/repos/lesson.repo')

const CourseService = {
  registerCourse: async ({ userId, courseId }) => {
    const userObjectId = convert2ObjectId(userId)
    const courseObjectId = convert2ObjectId(courseId)

    const [user, course] = await Promise.all([
      CourseService._validateUser(userObjectId),
      CourseService._validateCourse(courseObjectId)
    ])

    // Check if user is already enrolled in this course
    const existingEnrollment = await enrollmentModel.findOne({
      user: userObjectId,
      course: courseObjectId
    })

    if (existingEnrollment) throwError('User has already registered this course')

    // Create enrollment record
    await enrollmentModel.create({
      user: userObjectId,
      course: courseObjectId
    })

    // Update course student count
    course.stu_num += 1
    await course.save()

    // Also update user progression for backward compatibility
    const userProgression = await CourseService._getUserProgression(userObjectId)
    if (!userProgression.progress.some((prog) => prog.course.toString() === courseId)) {
      userProgression.progress.push({ course: courseObjectId })
      await userProgression.save()
    }

    return 1
  },

  getAllCourse: async (userId) => {
    const userObjectId = convert2ObjectId(userId)

    // Get all courses
    const listCourse = await CourseRepo.getAll().populate('teacher', 'name email avatar')
    if (!listCourse.length) return []

    // Get user enrollments
    const userEnrollments = await enrollmentModel.find({ user: userObjectId }).lean()
    const registeredCourses = new Set(
      userEnrollments.map((enrollment) => enrollment.course.toString())
    )

    // Get all enrollments for each course
    const courseEnrollments = await Promise.all(
      listCourse.map(async (course) => {
        const enrollments = await enrollmentModel
          .find({ course: course._id })
          .populate('user', 'name email avatar')
          .lean()

        return {
          courseId: course._id,
          enrollments: enrollments.map((enrollment) => ({
            ...enrollment.user,
            enrolledAt: enrollment.enrolledAt
          }))
        }
      })
    )

    // Create a map of course enrollments for easy lookup
    const enrollmentMap = new Map(
      courseEnrollments.map((ce) => [ce.courseId.toString(), ce.enrollments])
    )

    return listCourse.map((course) => ({
      _id: course._id,
      name: course.name,
      thumb: course.thumb,
      description: course.description,
      user: course.user,
      course_slug: course.course_slug || '',
      type: course.type,
      author: course.author,
      stu_num: course.stu_num,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      teacher: course.teacher,
      registered: registeredCourses.has(course._id.toString()),
      enrolledStudents: enrollmentMap.get(course._id.toString()) || []
    }))
  },
  getAllEnrolledCourses: async (userId) => {
    const userObjectId = convert2ObjectId(userId)

    // Get all enrollments for the user
    const userEnrollments = await enrollmentModel.find({ user: userObjectId }).lean()
    const enrolledCourseIds = new Set(
      userEnrollments.map((enrollment) => enrollment.course.toString())
    )

    // Get all courses
    const listCourse = await CourseRepo.getByStudent()
    if (!listCourse.length) return []

    // Filter courses to only include enrolled courses
    const enrolledCourses = listCourse.filter((course) =>
      enrolledCourseIds.has(course._id.toString())
    )

    // Map enrolled courses to include additional information
    return enrolledCourses.map((course) => ({
      _id: course._id,
      name: course.name,
      thumb: course.thumb,
      description: course.description,
      user: course.user,
      course_slug: course.course_slug || '',
      type: course.type,
      author: course.author,
      stu_num: course.stu_num,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      teacher: course.teacher,
      enrolledStudents: CourseService._getEnrolledStudents(course._id)
    }))
  },
  // write function get all course for student enrollmented

  _getEnrolledStudents: async (courseId) => {
    const enrollments = await enrollmentModel
      .find({ course: courseId })
      .populate('user', 'name email avatar')
      .lean()
    return enrollments.map((enrollment) => ({
      ...enrollment.user,
      enrolledAt: enrollment.enrolledAt
    }))
  },

  createCourse: async ({ name, thumb, description, user, lessons = [] }) => {
    const userObjectId = convert2ObjectId(user)

    if (await CourseRepo.findByName(name)) throwError('Course name already exists')
    const author = (await userModel.findById(userObjectId).lean()) || throwError('Author not found')

    const newCourse =
      (await courseModel.create({
        name,
        thumb,
        description,
        user: userObjectId,
        author: author.name
      })) || throwError('Create course failed')

    console.log('newCourse', newCourse)

    // Create lessons if provided
    if (Array.isArray(lessons) && lessons.length > 0) {
      const lessonsToInsert = lessons.map((lesson) => ({
        course: newCourse._id,
        lesson_id: lesson.lesson_id,
        lesson_title: lesson.lesson_title,
        index: lesson.index
      }))

      await lessonModel.insertMany(lessonsToInsert)
    }

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

  assignTeacher: async (courseId, teacherId) => {
    const courseObjectId = convert2ObjectId(courseId)
    const teacherObjectId = convert2ObjectId(teacherId)

    const course = await courseModel.findById(courseObjectId)
    if (!course) throwError('Course not found')

    if (course.user.toString() === teacherObjectId.toString()) {
      throwError('Teacher cannot be the owner of the course')
    }

    course.teacher = teacherObjectId
    await course.save()

    return course
  },
  updateCourse: async (course_id, bodyUpdate) => {
    const courseObjectId = convert2ObjectId(course_id)
    await CourseService._validateCourse(courseObjectId)
    await CourseRepo.updateCourse(courseObjectId, removeUnderfinedObjectKey(bodyUpdate))

    if (bodyUpdate.lessons && bodyUpdate.lessons.length >= 0) {
      const existingLessons = await lessonModel.find({ course: courseObjectId })
      const incomingLessonIds = bodyUpdate.lessons.map((lesson) => lesson.lesson_id)

      for (let lesson of bodyUpdate.lessons) {
        const lessonData = removeUnderfinedObjectKey(lesson)

        const existingLesson = await lessonModel.findOne({ lesson_id: lesson.lesson_id })

        if (existingLesson) {
          await LessonRepo.updateLesson(lesson.lesson_id, lessonData)
        } else {
          const newLesson = new lessonModel({ ...lessonData, course: courseObjectId })
          await newLesson.save()
        }
      }

      const lessonsToDelete = existingLessons.filter(
        (lesson) => !incomingLessonIds.includes(lesson.lesson_id)
      )
      if (lessonsToDelete.length > 0) {
        const lessonIdsToDelete = lessonsToDelete.map((lesson) => lesson.lesson_id)
        await lessonModel.deleteMany({ lesson_id: { $in: lessonIdsToDelete } })
      }
    }
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

  getCoursesByTeacher: async (userId) => {
    console.log('userId', userId)
    const teacher = await userModel.findOne({ _id: userId }).lean()
    console.log('teacher', teacher)
    if (!teacher) {
      throwError('User is not a teacher')
    }

    const courses =
      (await courseModel.find({ teacher: convert2ObjectId(userId), isVisible: true }).lean()) || []

    return courses
  },

  // New method to get all enrolled students for a course
  getEnrolledStudents: async (courseId) => {
    const courseObjectId = convert2ObjectId(courseId)
    await CourseService._validateCourse(courseObjectId)

    const enrollments = await enrollmentModel
      .find({ course: courseObjectId })
      .populate('user', 'name email avatar')
      .lean()

    return enrollments.map((enrollment) => ({
      ...enrollment.user,
      enrolledAt: enrollment.enrolledAt
    }))
  },

  // New method to unenroll a student from a course
  unenrollStudent: async ({ userId, courseId }) => {
    console.log('unenrolling student', userId, courseId)
    const userObjectId = convert2ObjectId(userId)
    const courseObjectId = convert2ObjectId(courseId)

    const [user, course] = await Promise.all([
      CourseService._validateUser(userObjectId),
      CourseService._validateCourse(courseObjectId)
    ])

    // Check if enrollment exists
    const existingEnrollment = await enrollmentModel.findOne({
      user: userObjectId,
      course: courseObjectId
    })

    if (!existingEnrollment) throwError('User is not enrolled in this course')

    // Delete enrollment
    await enrollmentModel.deleteOne({
      user: userObjectId,
      course: courseObjectId
    })

    // Update course student count
    if (course.stu_num > 0) {
      course.stu_num -= 1
      await course.save()
    }

    // Also update progression for backward compatibility
    const userProgression = await progressionModel.findOne({ user: userObjectId })
    if (userProgression) {
      userProgression.progress = userProgression.progress.filter(
        (prog) => prog.course.toString() !== courseId
      )
      await userProgression.save()
    }

    return 1
  },

  addMultipleStudentsToClass: async ({ courseId, studentIds, adminId }) => {
    try {
      // Start performance measurement
      const startTime = Date.now()

      // Validate course existence
      const courseObjectId = convert2ObjectId(courseId)
      const course = await CourseService._validateCourse(courseObjectId)

      console.log('admin', adminId)

      // Validate teacher permission (must be course owner or admin)
      const admin = await userModel.findById(convert2ObjectId(adminId))
      if (!admin) throwError('Admin not found')

      // Check if teacher has permission to add students to this course
      if (admin.roles !== 'admin' && course.user.toString() !== adminId) {
        throwError('You do not have permission to add students to this course')
      }

      // Validate student IDs
      if (!Array.isArray(studentIds) || studentIds.length === 0) {
        throwError('No valid student IDs provided')
      }

      // Store results
      const results = {
        successful: [],
        failed: [],
        totalAdded: 0,
        totalFailed: 0,
        totalTime: 0
      }

      // Process each student sequentially
      const enrolledUserIds = []

      for (const studentId of studentIds) {
        try {
          const userObjectId = convert2ObjectId(studentId)

          // Find user by ID
          const user = await userModel.findById(userObjectId)

          if (!user) {
            throw new Error(`User with ID ${studentId} not found`)
          }

          // Check if user is already enrolled
          const existingEnrollment = await enrollmentModel.findOne({
            user: userObjectId,
            course: courseObjectId
          })

          if (existingEnrollment) {
            return // Skip if already enrolled
          }

          // Create enrollment record
          await enrollmentModel.create({
            user: userObjectId,
            course: courseObjectId
          })

          // Update user progression for backward compatibility
          const userProgression = await progressionModel.findOne({ user: userObjectId })
          if (
            userProgression &&
            !userProgression.progress.some((prog) => prog.course.toString() === courseId)
          ) {
            userProgression.progress.push({ course: courseObjectId })
            await userProgression.save()
          }

          // Add to successful results
          results.successful.push({
            _id: user._id,
            email: user.email,
            name: user.name,
            status: 'enrolled'
          })

          enrolledUserIds.push(userObjectId) // For notifications
        } catch (error) {
          // Add to failed results
          results.failed.push({
            studentId: studentId,
            reason: error.message
          })
        }
      }

      // Update course student count
      if (enrolledUserIds.length > 0) {
        course.stu_num += enrolledUserIds.length
        await course.save()

        // Send notifications to enrolled students
        NotificationService.pushNotificationToSystem({
          type: 'COURSE-001',
          receivedIds: enrolledUserIds,
          senderId: convert2ObjectId(adminId),
          option: { course_name: course.name }
        }).catch(console.error)
      }

      // Update results
      results.totalAdded = results.successful.length
      results.totalFailed = results.failed.length

      // Calculate total time
      results.totalTime = Date.now() - startTime

      return results
    } catch (error) {
      throwError(`Error in addMultipleStudentsToClass: ${error.message}`)
      throw error
    }
  },

  getCourseDetails: async (courseId) => {
    const courseObjectId = convert2ObjectId(courseId)
    const course = await CourseService._validateCourse(courseObjectId)

    const lessons = await lessonModel.find({ course: courseObjectId }).sort({ index: 1 }).lean()

    const teacher = await userModel.findById(course.teacher).select('name email avatar').lean()

    return {
      ...course.toObject(),
      lessons,
      teacher
    }
  },

  updateCourseVisibility: async (courseId) => {
    const courseObjectId = convert2ObjectId(courseId)
    console.log('courseObjectId', courseObjectId)

    const course = await CourseService._validateCourse(courseObjectId)

    course.isVisible = !course.isVisible

    await course.save()

    return course
  },
  deleteCourse: async (courseId) => {
    const courseObjectId = convert2ObjectId(courseId)
    const course = await CourseService._validateCourse(courseObjectId)

    await lessonModel.deleteMany({ course: courseObjectId })

    await enrollmentModel.deleteMany({ course: courseObjectId })

    await courseModel.deleteOne({ _id: courseObjectId })

    return { message: 'Course deleted successfully' }
  }
}

module.exports = CourseService
