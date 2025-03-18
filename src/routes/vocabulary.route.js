const express = require('express')
const VocabularyController = require('../controllers/vocabulary.controller')

const router = express.Router()

router.post('/', VocabularyController.addVocabulary)
router.get('/:lesson_id', VocabularyController.getAllVocabularies)
router.patch('/:vocab_id', VocabularyController.updateVocabulary)
router.delete('/:vocab_id', VocabularyController.deleteVocabulary)

module.exports = router
