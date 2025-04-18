const express = require('express')
const GrammarController = require('../controllers/grammar.controller')
const { authenticateJWT, authorizeRole } = require('../middleware/auth.middleware')
const router = express.Router()

// Protected routes - Require authentication
router.use(authenticateJWT)

// Student routes - Can view grammar
router.get(
  '/all',
  authorizeRole(['student', 'teacher', 'admin']),
  GrammarController.getAllGrammarsWithoutLesson
)

router.get(
  '/lesson/:lesson_id',
  authorizeRole(['student', 'teacher', 'admin']),
  GrammarController.getAllGrammar
)
router.put(
  '/lesson/:lesson_id/batch',
  authorizeRole(['teacher', 'admin']),
  GrammarController.updateMultipleGrammars
)
router.delete(
  '/:grammar_id/example/:example_id',
  authorizeRole(['teacher', 'admin']),
  GrammarController.deleteExample
)
// Teacher routes - Can manage grammar
router.delete(
  '/:lesson_id/:grammar_id',
  authorizeRole(['teacher', 'admin']),
  GrammarController.deleteGrammar
)
router.post('/lesson/:lesson_id', authorizeRole(['teacher', 'admin']), GrammarController.addGrammar)
router.put('/:grammar_id', authorizeRole(['teacher', 'admin']), GrammarController.updateGrammar)

module.exports = router
