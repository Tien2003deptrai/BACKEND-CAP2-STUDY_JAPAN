const RenshuuService = require('../services/renshuu.service')
const handleRequest = require('./BaseController')

const RenshuuController = {
  createRenshuu: async (req, res) =>
    handleRequest(res, () => RenshuuService.createRenshuu(req.body), 'Tạo Renshuu thành công'),

  updateRenshuu: async (req, res) =>
    handleRequest(
      res,
      () => RenshuuService.updateRenshuu(req.params.renshuu_id, req.body),
      'Cập nhật Renshuu thành công'
    ),

  deleteRenshuu: async (req, res) =>
    handleRequest(
      res,
      () => RenshuuService.deleteRenshuu(req.params.renshuu_id),
      'Xóa Renshuu thành công'
    ),
  getAllRenshuuByLessonId: async (req, res) =>
    handleRequest(
      res,
      () => RenshuuService.getAllRenshuuByLessonId(req.params.lesson_id),
      'Lấy danh sách Renshuu theo lesson_id thành công'
    ),

  updateQuestion: async (req, res) =>
    handleRequest(
      res,
      () =>
        RenshuuService.updateQuestion(req.body.renshuuId, req.body.question._id, req.body.question),
      'Cập nhật câu hỏi thành công'
    ),

  etPracticeQuestions: async (req, res, next) => {
    try {
      const { lessonId } = req.params
      const { limit = 5 } = req.query // mặc định 5 câu nếu không truyền
      const result = await RenshuuService.getPracticeQuestions(lessonId, Number(limit))
      res.status(200).json({ success: true, data: result })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = RenshuuController
