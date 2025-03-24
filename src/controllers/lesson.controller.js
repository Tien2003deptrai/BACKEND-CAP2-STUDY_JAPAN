const LessonService = require('../services/lesson.service')
const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')
const lessonModel = require('../models/lesson.model')

const LessonController = {
  createLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_title', 'course_id'], req.body)
        const newLesson = await LessonService.createLesson(req.body)
        if (Array.isArray(req.body.lessons) && req.body.lessons.length > 0) {
          const lessonsToInsert = req.body.lessons.map((lesson) => ({
            course: newLesson._id,
            lesson_id: lesson.lesson_id,
            lesson_title: lesson.title
          }))
          await lessonModel.insertMany(lessonsToInsert)
        }
        return newLesson
      },
      'Tạo bài học thành công'
    ),

  getAllLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await LessonService.getAllLesson({ userId: req.user.userId, ...req.body })
      },
      'Lấy thông tin tất cả bài học'
    ),

  getOneLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_id'], req.params)
        return await LessonService.getOneLesson(req.params.lesson_id, req.user.userId)
      },
      'Lấy thông tin bài học'
    ),

  updateLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_id'], req.params)
        return await LessonService.updateLesson(req.params.lesson_id, req.body)
      },
      'Cập nhật bài học thành công'
    ),

  releaseLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_id'], req.params)
        return await LessonService.releaseLesson(req.params.lesson_id)
      },
      'Xuất bản bài học thành công'
    ),

  unReleaseLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_id'], req.params)
        return await LessonService.unReleaseLesson(req.params.lesson_id)
      },
      'Gỡ bài học xuất bản thành công'
    ),

  getAllDraftLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        const { limit = 25, skip = 0 } = req.query
        return await LessonService.findAllDraft({ limit: +limit, skip: +skip })
      },
      'Lấy danh sách bài học nháp'
    ),

  getAllReleaseLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['course_id'], req.params)
        const { course_id } = req.params
        const { limit = 25, skip = 0 } = req.query
        return await LessonService.findAllRelease({
          course_id,
          limit: +limit,
          skip: +skip
        })
      },
      'Lấy danh sách bài học phát hành'
    ),

  getAllLessonTitles: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await LessonService.getAllLessonTitles()
      },
      'Lấy danh sách tiêu đề tất cả khóa học thành công'
    ),

  getAllLessonByCourse: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await LessonService.getAlllessonByCourse(req.params.course_id)
      },
      'Lấy danh sách bài học theo khóa học'
    )
}

module.exports = LessonController
