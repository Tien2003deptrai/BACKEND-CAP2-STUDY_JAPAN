const express = require('express')
const router = express.Router()
const GrammarController = require('../controllers/grammar.controller')

router.post('/', GrammarController.addGrammar)
router.patch('/:lesson_id', GrammarController.updateGrammar)
router.delete('/:lesson_id/:grammar_id', GrammarController.deleteGrammar)
router.get('/level', GrammarController.getGrammarByLevel)
router.get('/:lesson_id', GrammarController.getAllGrammar)

module.exports = router
