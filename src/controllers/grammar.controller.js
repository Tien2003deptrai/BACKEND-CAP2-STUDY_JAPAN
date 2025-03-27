const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')
const GrammarService = require('../services/grammar.service')

const GrammarController = {
  addGrammar: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await GrammarService.addGrammar(req.body)
      },
      'Thêm ngữ pháp thành công'
    ),

  updateGrammar: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_id'], req.params)
        return await GrammarService.updateGrammar(req.params.lesson_id, { ...req.body })
      },
      'Cập nhật ngữ pháp thành công'
    ),

  updateMultipleGrammars: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_id', 'grammars'], req.body)
        if (!Array.isArray(req.body.grammars)) {
          throwError('grammars must be an array')
        }
        return await GrammarService.updateMultipleGrammars(req.body.lesson_id, req.body.grammars)
      },
      'Cập nhật nhiều ngữ pháp thành công'
    ),

  deleteGrammar: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_id', 'grammar_id'], req.params)
        return await GrammarService.deleteGrammar(req.params.grammar_id, req.params)
      },
      'Xóa ngữ pháp thành công'
    ),

  getGrammarByLevel: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['level', 'page'], req.query)
        return await GrammarService.getGrammarByLevel(req.query.level, Number(req.query.page))
      },
      'Lấy danh sách ngữ pháp theo cấp độ'
    ),

  getAllGrammar: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['lesson_id'], req.params)
        return await GrammarService.getAllGrammar(req.params)
      },
      'Lấy tất cả ngữ pháp của bài học'
    )
}

module.exports = GrammarController
