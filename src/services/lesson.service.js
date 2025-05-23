const courseModel = require('../models/course.model')
const hinaModel = require('../models/hina.model')
const lessonModel = require('../models/lesson.model')
const progressionModel = require('../models/progression.model')
const enrollmentModel = require('../models/enrollment.model')
const LessonRepo = require('../models/repos/lesson.repo')
const throwError = require('../res/throwError')
const { convert2ObjectId, removeUnderfinedObjectKey } = require('../utils')

const LessonService = {
  // private methods
  _validateCourse: async (courseId) => {
    if (!(await courseModel.exists({ _id: courseId }))) throwError('Course not found')
  },

  _checkLessonExists: async (courseId, lessonTitle, excludeLessonId = null) => {
    const lesson = await lessonModel.findOne({ course: courseId, lesson_title: lessonTitle })
    if (lesson && (!excludeLessonId || lesson._id.toString() !== excludeLessonId.toString())) {
      throwError('Lesson already exists')
    }
  },

  _checkUserEnrollment: async (userId, courseId) => {
    // Check if user is enrolled in the course
    const isEnrolled = await enrollmentModel.exists({
      user: userId,
      course: courseId
    })

    if (!isEnrolled) throwError('User is not enrolled in this course')
  },

  // public methods
  createLesson: async ({ course_id, lesson_title, ...bodyData }) => {
    const courseObjectId = convert2ObjectId(course_id)
    await LessonService._validateCourse(courseObjectId)
    await LessonService._checkLessonExists(courseObjectId, lesson_title)

    const newLesson = await lessonModel.create({
      course: courseObjectId,
      lesson_title,
      ...bodyData
    })
    if (!newLesson) throwError('Create lesson failed')
    return newLesson
  },

  getAllLesson: async ({ userId, course_id }) => {
    const userObjectId = convert2ObjectId(userId)
    const courseObjectId = convert2ObjectId(course_id)

    // Check if user is enrolled in this course
    await LessonService._checkUserEnrollment(userObjectId, courseObjectId)

    const course =
      (await courseModel.findById(course_id).select('name thumb author type').lean()) ||
      throwError('Course not found')
    const userProgression =
      (await progressionModel.findOne({ user: userObjectId })) ||
      throwError('User progression not found')

    const listLessons = await LessonService._fetchLessons(course, course_id)
    if (!listLessons?.length) return null

    return course.type === 'Hina'
      ? LessonService._mapHinaLessons(listLessons, userProgression, course_id)
      : { course, listLessons, type: 'Course' }
  },

  _fetchLessons: async (course, courseId) => {
    return course.type === 'Hina'
      ? hinaModel.find({ course: courseId }).select('lesson_id lesson_title').lean()
      : LessonRepo.getAllLesson(courseId)
  },

  _mapHinaLessons: (listLessons, userProgression, courseId) => {
    const courseProgress =
      (userProgression.progress || []).find((p) => p.course.toString() === courseId.toString())
        ?.lessons || []
    const lessonProgressSet = new Set(courseProgress.map(String))

    return {
      course,
      listLessons: listLessons.map((lesson) => ({
        ...lesson,
        learnt: lessonProgressSet.has(lesson._id.toString())
      })),
      type: 'Hina'
    }
  },

  getOneLesson: async (lesson_id, userId) => {
    // Lấy lesson từ repo
    const lesson = (await LessonRepo.findOne(lesson_id)) || throwError('Lesson not found')

    if (userId) {
      // Kiểm tra nếu cần xác thực enrollment
      try {
        // Kiểm tra xem course có _id không
        if (lesson.course && typeof lesson.course === 'object' && !lesson.course._id) {
          // Nếu không có _id, cần lấy lại course từ database
          const courseInfo = await courseModel
            .findOne({
              name: lesson.course.name,
              author: lesson.course.author
            })
            .lean()

          if (!courseInfo) {
            throwError('Course not found')
          }

          // Kiểm tra enrollment với courseInfo._id
          const userObjectId = convert2ObjectId(userId)
          await LessonService._checkUserEnrollment(userObjectId, courseInfo._id)
        } else {
          // Xử lý như trước nếu có _id
          const userObjectId = convert2ObjectId(userId)
          const courseId = lesson.course._id || lesson.course
          await LessonService._checkUserEnrollment(userObjectId, courseId)
        }
      } catch (error) {
        // Xử lý trường hợp không thể kiểm tra enrollment
        if (error.message.includes('Cast to ObjectId failed')) {
          throwError('Invalid course information')
        } else {
          throw error
        }
      }
    }

    return lesson
  },

  updateLesson: async (lesson_id, { ...bodyUpdate }) => {
    const updatedLesson = await LessonRepo.updateLesson(
      lesson_id,
      removeUnderfinedObjectKey(bodyUpdate)
    )
    console.log(lesson_id)

    if (!updatedLesson) throwError('Lesson not found')
    return updatedLesson
  },

  releaseLesson: async (lesson_id) => {
    const result = await LessonRepo.releaseLesson(lesson_id)
    if (!result) throwError('Lesson not found')
    return { message: 'Lesson released successfully' }
  },

  unReleaseLesson: async (lesson_id) => {
    const result = await LessonRepo.unReleaseLesson(lesson_id)
    if (!result) throwError('Lesson not found')
    return { message: 'Lesson unpublished successfully' }
  },

  findAllDraft: async ({ query, limit, skip }) => {
    const lessons = await LessonRepo.findAllDraft({ query, limit, skip })
    if (!lessons) throwError('Draft lessons not found')
    return lessons
  },

  findAllRelease: async ({ query, limit, skip }) => {
    const lessons = await LessonRepo.findAllRelease({ query, limit, skip })
    if (!lessons) throwError('Published lessons not found')
    return lessons
  },

  getAllLessonTitles: async () => {
    const titles = await LessonRepo.getAllLessonTitles()
    if (!titles) throwError('Lesson titles not found')
    return titles
  },

  getAlllessonByCourse: async (course_id) => {
    const courseObjectId = convert2ObjectId(course_id)
    const course = await courseModel.findById(course_id).lean()
    if (!course) throwError('Course not found')
    const lessons = await lessonModel.find({ course: courseObjectId }).lean()
    return { course, lessons }
  },

  createMultipleLessons: async ({ course_id, lessons }) => {
    if (!course_id) {
      throwError('course_id is required')
    }

    const courseObjectId = convert2ObjectId(course_id)

    const courseExists = await courseModel.findById(courseObjectId).lean()
    if (!courseExists) {
      throwError('Course not found')
    }

    if (!Array.isArray(lessons) || lessons.length === 0) {
      throwError('Lessons list is empty or invalid')
    }

    const lessonsToInsert = lessons.map((lesson) => {
      if (!lesson.lesson_title) {
        throwError('Each lesson must have a lesson_title')
      }
      return {
        course: courseObjectId,
        lesson_title: lesson.lesson_title
      }
    })

    const insertedLessons = await lessonModel.insertMany(lessonsToInsert)

    if (!insertedLessons || insertedLessons.length === 0) {
      throwError('Failed to create lessons')
    }

    return insertedLessons
  }
}

module.exports = LessonService
