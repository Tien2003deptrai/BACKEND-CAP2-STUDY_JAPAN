const express = require('express')
const router = express.Router()
const ExamController = require('../controllers/exam.controller')
const { authenticateJWT } = require('../middleware/auth.middleware')

/**
 * Public routes (accessible without authentication)
 */
// Get list of available (published) exams
router.get('', ExamController.getExams)

// Get exams by user enrollment
router.get('/enrolled', authenticateJWT, ExamController.getExamsByUserEnrollment)
/**
 * Protected routes (require authentication)
 */
// Routes for taking an exam
router.get('/take/:exam_id', authenticateJWT, ExamController.getExamForTaking)
router.post('/start/:exam_id', authenticateJWT, ExamController.startExam)
router.post('/submit/:attemptId', authenticateJWT, ExamController.submitExam)

// Routes for viewing results
router.get('/result/:attemptId', authenticateJWT, ExamController.getExamResult)
router.get('/history', authenticateJWT, ExamController.getUserExamHistory)

// Routes for exam progress and features
router.get('/check-time/:attemptId', authenticateJWT, ExamController.checkExamTime)
router.post(
  '/handle-interruption/:attemptId',
  authenticateJWT,
  ExamController.handleExamInterruption
)
router.post('/save-progress/:attemptId', authenticateJWT, ExamController.saveExamProgress)
router.get('/progress/:attemptId', authenticateJWT, ExamController.getExamProgress)
router.post('/mark-question/:attemptId', authenticateJWT, ExamController.markQuestionForReview)
router.get('/validate/:attemptId', authenticateJWT, ExamController.validateExamAttempt)
router.get('/course/:courseId', authenticateJWT, ExamController.getExamsByCourseId)
// Get detailed info about a specific exam (should be after specific routes)
router.get('/:exam_id', ExamController.getExamDetails)

/**
 * Admin/Teacher routes
 */
// Create a new exam (admin/teacher only)
router.post('', authenticateJWT, ExamController.createExam)

// Delete an exam (admin/teacher only)
router.delete('/:id', authenticateJWT, ExamController.deleteExam)

// Update an exam (admin/teacher only)
router.put('/:id', authenticateJWT, ExamController.updateExam)

// Add questions to an exam (admin/teacher only)
// router.post('/:id/questions', authenticateJWT, ExamController.addExamQuestions)
router.post('/:examId/questions', authenticateJWT, ExamController.updateQuestion)

// Get exams by teacher (admin/teacher only)
router.get('/teacher/:userId', authenticateJWT, ExamController.getExamsByTeacher)

// Delete question in an exam
router.delete('/:examId/question/:questionId', authenticateJWT, ExamController.deleteExamQuestion)

// Update exam schedule (admin/teacher only)
router.put('/:examId/schedule', authenticateJWT, ExamController.updateExamSchedule)

router.get('/:examId/students', authenticateJWT, ExamController.getStudentsByExam)

module.exports = router
