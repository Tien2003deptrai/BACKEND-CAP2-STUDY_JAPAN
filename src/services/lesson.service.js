const courseModel = require('../models/course.model')
const hinaModel = require('../models/hina.model')
const lessonModel = require('../models/lesson.model')
const progressionModel = require('../models/progression.model')
const LessonRepo = require('../models/repos/lesson.repo')
const throwError = require('../res/throwError')
const { convert2ObjectId, removeUnderfinedObjectKey } = require('../utils')

const LessonService = {
  // private methods
  // Validate khóa học tồn tại
  async _validateCourse(courseId) {
    if (!(await courseModel.exists({ _id: courseId }))) throwError('Course not found')
  },

  // Kiểm tra bài học đã tồn tại
  async _checkLessonExists(courseId, lessonTitle) {
    if (await lessonModel.findOne({ course: courseId, lesson_title: lessonTitle })) {
      throwError('Lesson already exists')
    }
  },

  // public methods
  // Tạo bài học mới
  async createLesson({ course_id, lesson_title, ...bodyData }) {
    const courseObjectId = convert2ObjectId(course_id)
    await this._validateCourse(courseObjectId)
    await this._checkLessonExists(courseObjectId, lesson_title)

    const newLesson = await lessonModel.create({
      course: courseObjectId,
      lesson_title,
      ...bodyData
    })
    return newLesson || throwError('New lesson not found')
  },

  // Lấy danh sách bài học - Refactor ngắn gọn và clean
  async getAllLesson({ userId, course_id }) {
    const userObjectId = convert2ObjectId(userId)

    const course =
      (await courseModel.findById(course_id).select('name thumb author type').lean()) ||
      throwError('Course not found')

    const userProgression =
      (await progressionModel.findOne({ user: userObjectId })) ||
      throwError('User progression not found')

    const listLessons = await this._fetchLessons(course, course_id)
    if (!listLessons?.length) return null

    const result =
      course.type === 'Hina'
        ? this._mapHinaLessons(listLessons, userProgression, course_id)
        : { course, listLessons, type: 'Course' }

    return result
  },

  // Lấy danh sách bài học theo type
  async _fetchLessons(course, courseId) {
    return course.type === 'Hina'
      ? hinaModel.find({ course: courseId }).select('lesson_id lesson_title').lean()
      : LessonRepo.getAllLesson(courseId)
  },

  // Xử lý danh sách bài học Hina với progression
  _mapHinaLessons(listLessons, userProgression, courseId) {
    const courseProgress =
      (userProgression.progress || []).find((p) => p.course.toString() === courseId.toString())
        ?.lessons || []

    const lessonProgressSet = new Set(courseProgress.map(String))
    const mappedLessons = listLessons.map((lesson) => ({
      ...lesson,
      learnt: lessonProgressSet.has(lesson._id.toString())
    }))

    return { course: course, listLessons: mappedLessons, type: 'Hina' }
  },

  // Lấy một bài học
  async getOneLesson(lesson_id) {
    const lesson = (await LessonRepo.findOne(lesson_id)) || throwError('Lesson not found')
    return lesson
  },

  // Cập nhật bài học
  async updateLesson(lesson_id, { course_id, lesson_title, ...bodyUpdate }) {
    if (lesson_title) {
      await this._checkLessonExists(convert2ObjectId(course_id), lesson_title, lesson_id)
    }
    return await LessonRepo.updateLesson(lesson_id, removeUnderfinedObjectKey(bodyUpdate))
  },

  // Xuất bản bài học
  async releaseLesson(lesson_id) {
    return await LessonRepo.releaseLesson(lesson_id)
  },

  // Gỡ xuất bản bài học
  async unReleaseLesson(lesson_id) {
    return await LessonRepo.unReleaseLesson(lesson_id)
  },

  // Lấy danh sách bài học nháp
  async findAllDraftLesson({ limit = 25, skip = 0 }) {
    return await LessonRepo.findAllDraft({
      query: { isDraft: true },
      limit,
      skip
    })
  },

  // Lấy danh sách bài học đã phát hành
  async findAllReleaseLesson({ course_id, limit = 25, skip = 0 }) {
    return await LessonRepo.findAllRelease({
      query: { course: course_id, isRelease: true },
      limit,
      skip
    })
  },

  async getAllLessonTitles() {
    const courseTitles = await LessonRepo.getAllLessonTitles()
    if (!courseTitles?.length) throwError('No courses found')
    return courseTitles
  }
}

module.exports = LessonService
