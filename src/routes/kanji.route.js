const express = require('express')
const KanjiController = require('../controllers/kanji.controller')
const router = express.Router()

router.post('/svg', KanjiController.getSvgContent)
router.post('/add', KanjiController.addKanji)
router.post('/:jlpt/:page', KanjiController.getAllKanjiByLevel)
router.post('/:level', KanjiController.getAllKanji)
router.get('/', KanjiController.getKanjiByName)

module.exports = router
