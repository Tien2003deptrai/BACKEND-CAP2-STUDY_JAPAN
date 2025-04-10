const express = require('express')
const KanjiController = require('../controllers/kanji.controller')
const router = express.Router()

router.get('/', KanjiController.getKanjiByName)
// router.post('/svg', KanjiController.getSvgContent)
router.post('/add', KanjiController.addKanji)
router.get('/level/:level', KanjiController.getAllKanji)
router.get('/:kanji_id', KanjiController.getKanjiById)
router.get('/related/:kanji_id', KanjiController.getRelatedKanji)
router.get('/:jlpt/:page', KanjiController.getAllKanjiByLevel)

module.exports = router
