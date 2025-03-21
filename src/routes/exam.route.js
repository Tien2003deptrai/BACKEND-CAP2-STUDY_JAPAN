const express = require('express')
const router = express.Router()
const ExamController = require('../controllers/exam.controller')
const { authenticateJWT } = require('../middleware/auth.middleware')

/**
 * Public routes (accessible without authentication)
 */
// Get list of available (published) exams
router.get('', ExamController.getExams)

// Routes for viewing results
router.get('/history', authenticateJWT, ExamController.getUserExamHistory)

// Get detailed info about a specific exam
router.get('/:exam_id', ExamController.getExamDetails)

/**
 * Protected routes (require authentication)
 */
// Routes for taking an exam
router.get('/take/:exam_id', authenticateJWT, ExamController.getExamForTaking)
router.post('/start/:exam_id', authenticateJWT, ExamController.startExam)
router.post('/submit/:attemptId', authenticateJWT, ExamController.submitExam)

// Routes for viewing results
router.get('/result/:attemptId', authenticateJWT, ExamController.getExamResult)

/**
 * Admin/Teacher routes
 */
// Create a new exam (admin/teacher only)
router.post('', authenticateJWT, ExamController.createExam)

// Delete an exam (admin/teacher only)
router.delete('/:id', authenticateJWT, ExamController.deleteExam)

module.exports = router
