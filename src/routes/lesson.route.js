const express = require('express')
const LessonController = require('../controllers/lesson.controller')
const { authorizeRole } = require('../middleware/auth.middleware')
const router = express.Router()

// Public routes - No authentication required
router.get('/all', LessonController.getAllLesson)
router.get('/all/titles', LessonController.getAllLessonTitles)

// Protected routes - Require authentication
// Student routes - Can view published lessons
router.get(
  '/release/all/:course_id',
  authorizeRole(['student', 'teacher', 'admin']),
  LessonController.getAllReleaseLesson
)
router.get(
  '/all/course/:course_id',
  authorizeRole(['student', 'teacher', 'admin']),
  LessonController.getAllLessonByCourse
)

// Teacher routes - Can manage their own lessons
router.post('/', authorizeRole(['teacher', 'admin']), LessonController.createLesson)
router.put('/:lesson_id', authorizeRole(['teacher', 'admin']), LessonController.updateLesson)
router.get('/drafts', authorizeRole(['teacher', 'admin']), LessonController.getAllDraftLesson)
router.patch(
  '/:lesson_id/release',
  authorizeRole(['teacher', 'admin']),
  LessonController.releaseLesson
)
router.patch(
  '/:lesson_id/unrelease',
  authorizeRole(['teacher', 'admin']),
  LessonController.unReleaseLesson
)

module.exports = router
