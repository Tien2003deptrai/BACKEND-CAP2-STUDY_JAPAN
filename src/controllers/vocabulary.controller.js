const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')
const VocabularyService = require('../services/vocabulary.service')
const throwError = require('../res/throwError')

const VocabularyController = {
  addVocabulary: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await VocabularyService.addVocabulary(req.body)
      },
      'Thêm từ vựng thành công'
    ),

  getAllVocabularies: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_id'], req.params)
        return await VocabularyService.getAllVocabularies(req.params)
      },
      'Lấy danh sách từ vựng thành công'
    ),

  getAllVocabulariesWithoutLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await VocabularyService.getAllVocabulariesWithoutLesson()
      },
      'Lấy danh sách từ vựng thành công'
    ),

  updateVocabulary: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['vocab_id', 'lesson_id'], {
          ...req.params,
          ...req.body
        })
        return await VocabularyService.updateVocabulary(req.params.vocab_id, req.body)
      },
      'Cập nhật từ vựng thành công'
    ),

  updateMultipleVocabularies: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_id', 'vocabularies'], req.body)
        if (!Array.isArray(req.body.vocabularies)) {
          throwError('vocabularies must be an array')
        }
        return await VocabularyService.updateMultipleVocabularies(
          req.body.lesson_id,
          req.body.vocabularies
        )
      },
      'Cập nhật nhiều từ vựng thành công'
    ),

  deleteVocabulary: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['vocab_id'], req.params)
        return await VocabularyService.deleteVocabulary(req.params.vocab_id, req.body)
      },
      'Xóa từ vựng thành công'
    ),

  deleteVocabularyNoLesson: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['vocab_id'], req.params)
        return await VocabularyService.deleteVocabulary(req.params.vocab_id)
      },
      'Xóa từ vựng thành công'
    ),

  getAllVocabulariesAI: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await VocabularyService.getAllVocabulariesAI()
      },
      'Lấy danh sách từ vựng thành công'
    ),

  getVocabularyById: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['vocab_id'], req.params)
        return await VocabularyService.getVocabularyById(req.params.vocab_id)
      },
      'Lấy từ vựng thành công'
    ),

  addVocabulary: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await VocabularyService.addVocabulary(req.body)
      },
      'Thêm từ vựng (không có lesson) thành công'
    )
}

module.exports = VocabularyController
