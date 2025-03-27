const express = require('express')
const VocabularyController = require('../controllers/vocabulary.controller')
const { authorizeRole } = require('../middleware/auth.middleware')
const router = express.Router()

// Protected routes - Require authentication
// Student routes - Can view vocabulary
router.get(
  '/lesson/:lesson_id',
  authorizeRole(['student', 'teacher', 'admin']),
  VocabularyController.getAllVocabularies
)

// Teacher routes - Can manage vocabulary
router.post(
  '/lesson/:lesson_id',
  authorizeRole(['teacher', 'admin']),
  VocabularyController.addVocabulary
)
router.put('/:vocab_id', authorizeRole(['teacher', 'admin']), VocabularyController.updateVocabulary)
router.delete(
  '/:vocab_id',
  authorizeRole(['teacher', 'admin']),
  VocabularyController.deleteVocabulary
)
router.put(
  '/lesson/:lesson_id/batch',
  authorizeRole(['teacher', 'admin']),
  VocabularyController.updateMultipleVocabularies
)

module.exports = router
