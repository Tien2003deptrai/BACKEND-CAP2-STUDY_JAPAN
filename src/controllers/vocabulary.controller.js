const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')
const VocabularyService = require('../services/vocabulary.service')

const VocabularyController = {
  addVocabulary: (req, res) =>
    handleRequest(res, () => VocabularyService.addVocabulary(req.body), 'Thêm từ vựng thành công'),

  getAllVocabularies: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['lesson_id'], req.params)
        VocabularyService.getAllVocabularies(req.params)
      },
      'Lấy danh sách từ vựng thành công'
    ),

  updateVocabulary: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['vocab_id', 'lesson_id'], {
          ...req.params,
          ...req.body
        })
        VocabularyService.updateVocabulary(req.params.vocab_id, req.body)
      },
      'Cập nhật từ vựng thành công'
    ),

  deleteVocabulary: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['vocab_id'], req.params)
        VocabularyService.deleteVocab(req.params.vocab_id, req.body)
      },
      'Xóa từ vựng thành công'
    )
}

module.exports = VocabularyController
