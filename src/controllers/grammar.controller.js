const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')
const GrammarService = require('../services/grammar.service')

const GrammarController = {
  addGrammar: (req, res) =>
    handleRequest(
      res,
      () => {
        return GrammarService.addGrammar(req.body)
      },
      'Thêm ngữ pháp thành công'
    ),

  updateGrammar: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['lesson_id'], req.params)
        return GrammarService.updateGrammar(req.params.lesson_id, { ...req.body })
      },
      'Cập nhật ngữ pháp thành công'
    ),

  deleteGrammar: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['lesson_id', 'grammar_id'], req.params)
        return GrammarService.deleteGrammar(req.params.grammar_id, req.params)
      },
      'Xóa ngữ pháp thành công'
    ),

  getGrammarByLevel: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['level', 'page'], req.query)
        return GrammarService.getGrammarByLevel(req.query.level, Number(req.query.page))
      },
      'Lấy danh sách ngữ pháp theo cấp độ'
    ),

  getAllGrammar: (req, res) =>
    handleRequest(
      res,
      () => {
        validateRequiredFields(['lesson_id'], req.params)
        return GrammarService.getAllGrammar(req.params)
      },
      'Lấy tất cả ngữ pháp của bài học'
    )
}

module.exports = GrammarController
