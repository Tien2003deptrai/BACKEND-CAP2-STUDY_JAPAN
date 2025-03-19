const express = require('express')
const { authenticateJWT } = require('../middleware/auth.middleware')
const AuthRoute = require('./auth.route')
const CourseRoute = require('./course.route')
const LessonRoute = require('./lesson.route')
const VocabularyRoute = require('./vocabulary.route')
const GrammarRoute = require('./grammar.route')
const TranslateRoute = require('./translate/translate.route')
const router = express.Router()

// AUTH Routes * /api/auth/*
router.use('/auth', AuthRoute)
router.use('/course', authenticateJWT, CourseRoute)
router.use('/lesson', authenticateJWT, LessonRoute)
router.use('/vocabulary', authenticateJWT, VocabularyRoute)
router.use('/grammar', authenticateJWT, GrammarRoute)
router.use('/language', TranslateRoute)

module.exports = router
