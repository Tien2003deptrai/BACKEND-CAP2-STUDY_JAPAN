const KanjiService = require('../services/kanji.service')
const handleRequest = require('./BaseController')
const { validateRequiredFields } = require('../validators')

const KanjiController = {
  getAllKanji: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['level'], req.params)
        return await KanjiService.getAllKanji(req.params.level)
      },
      'Lấy tất cả kanji thành công'
    ),

  // getSvgContent: (req, res) =>
  //   handleRequest(
  //     res,
  //     async () => {
  //       validateRequiredFields(['kanji'], req.body)
  //       return await KanjiService.getSvgContent(req.body)
  //     },
  //     'Lấy SVG thành công'
  //   ),

  getAllKanjiByLevel: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['jlpt', 'page'], req.params)
        return await KanjiService.getAllKanjiByLevel(req.params.jlpt, req.params.page)
      },
      'Lấy tất cả kanji theo cấp độ thành công'
    ),

  addKanji: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['kanji'], req.body)
        return await KanjiService.addKanji(req.body)
      },
      'Thêm kanji thành công'
    ),

  getKanjiByName: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['word'], req.query)
        return await KanjiService.kanjiByName(req.query.word)
      },
      'Lấy kanji theo tên thành công'
    ),

  getKanjiById: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await KanjiService.getKanjiById(req.params.kanji_id)
      },
      'Lấy kanji thành công'
    ),

  getRelatedKanji: (req, res) =>
    handleRequest(
      res,
      async () => {
        return await KanjiService.getRelatedKanji(req.params.kanji_id)
      },
      'Lấy kanji thành công'
    )
}

module.exports = KanjiController
