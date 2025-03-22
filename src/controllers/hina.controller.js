const HinaService = require('../services/hina.service')
const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')

const HinaController = {
  createHina: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['course_id', 'lesson_id'], req.body)
        const { course_id, lesson_id, ...bodyData } = req.body
        return await HinaService.createHina(course_id, lesson_id, bodyData)
      },
      'Tạo Hina thành công'
    ),

  getHinaByLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        const { userId } = req.user
        const { lesson_id, course_id } = req.params
        return await HinaService.getHinaByLesson({ userId, lesson_id, course_id })
      },
      'Lấy danh sách Hina thành công'
    )
}

module.exports = HinaController
