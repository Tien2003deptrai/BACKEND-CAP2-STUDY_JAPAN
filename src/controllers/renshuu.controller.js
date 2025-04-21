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
  deleteQuestion: async (req, res) => {
    handleRequest(res, () => {
      RenshuuService.deleteQuestion(req.params.renshuu_id, req.params.question_id),
        'Xóa câu hỏi thành công'
    })
  },
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

  submitRenshuu: async (req, res) =>
    handleRequest(
      res,
      () => {
        const { renshuuId } = req.params
        const { answers } = req.body
        return RenshuuService.submitRenshuu(renshuuId, answers)
      },
      'Nộp bài thành công'
    )
}

module.exports = RenshuuController
