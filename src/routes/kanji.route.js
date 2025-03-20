const express = require('express')
const KanjiController = require('../controllers/kanji.controller')
const router = express.Router()

router.get('/', KanjiController.getKanjiByName)
router.post('/svg', KanjiController.getSvgContent)
router.post('/add', KanjiController.addKanji)
router.get('/:jlpt/:page', KanjiController.getAllKanjiByLevel)
router.get('/:level', KanjiController.getAllKanji)

module.exports = router
