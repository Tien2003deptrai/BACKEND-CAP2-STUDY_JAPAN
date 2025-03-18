const LessonService = require('../services/lesson.service')
const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')

const LessonController = {
  createLesson: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['lesson_title', 'course_id'], req.body)
        return LessonService.createLesson(req.body)
      },
      'Tạo bài học thành công'
    ),

  getAllLesson: (req, res) =>
    handleRequest(
      res,
      () => LessonService.getAllLesson({ userId: req.user.userId, ...req.body }),
      'Lấy thông tin tất cả bài học'
    ),

  getOneLesson: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['lesson_id'], req.params)
        return LessonService.getOneLesson(req.params.lesson_id)
      },
      'Lấy thông tin bài học'
    ),

  updateLesson: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['lesson_id'], req.params)
        return LessonService.updateLesson(req.params.lesson_id, {
          ...req.body
        })
      },
      'Cập nhật bài học thành công'
    ),

  releaseLesson: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['lesson_id'], req.params)
        return LessonService.releaseLesson(req.params.lesson_id)
      },
      'Xuất bản bài học thành công'
    ),

  unReleaseLesson: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['lesson_id'], req.params)
        return LessonService.unReleaseLesson(req.params.lesson_id)
      },
      'Gỡ bài học xuất bản thành công'
    ),

  getAllDraftLesson: (req, res) =>
    handleRequest(
      res,
      () => {
        const { limit = 25, skip = 0 } = req.query
        return LessonService.findAllDraftLesson({ limit: +limit, skip: +skip })
      },
      'Lấy danh sách bài học nháp'
    ),

  getAllReleaseLesson: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['course_id'], req.params)
        const { course_id } = req.params
        const { limit = 25, skip = 0 } = req.query
        return LessonService.findAllReleaseLesson({
          course_id,
          limit: +limit,
          skip: +skip
        })
      },
      'Lấy danh sách bài học phát hành'
    )
}

module.exports = LessonController
