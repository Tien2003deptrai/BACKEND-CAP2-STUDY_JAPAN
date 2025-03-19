const KanjiService = require('../services/kanji.service')
const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')

const KanjiController = {
  getAllKanji: (req, res) => {
    validateRequiredFields(['level'], req.params)
    handleRequest(
      res,
      () => KanjiService.getAllKanji(req.params.level),
      'Lấy tất cả kanji thành công'
    )
  },

  getSvgContent: (req, res) => {
    validateRequiredFields(['kanji'], req.body)
    handleRequest(res, () => KanjiService.getSvgContent(req.body), 'Lấy SVG thành công')
  },

  getAllKanjiByLevel: (req, res) => {
    validateRequiredFields(['level', 'page'], req.params)
    handleRequest(
      res,
      () => KanjiService.getAllKanjiByLevel(req.params.level, req.params.page),
      'Lấy tất cả kanji theo cấp độ thành công'
    )
  },

  addKanji: (req, res) => {
    validateRequiredFields(['kanji'], req.body)
    handleRequest(res, () => KanjiService.addKanji(req.body), 'Thêm kanji thành công')
  },

  getKanjiByName: (req, res) => {
    validateRequiredFields(['name'], req.params)
    handleRequest(
      res,
      () => KanjiService.getKanjiByName(req.params.name),
      'Lấy kanji theo tên thành công'
    )
  }
}

module.exports = KanjiController
