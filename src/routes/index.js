const express = require('express')
const { authenticateJWT } = require('../middleware/auth.middleware')
const AuthRoute = require('./auth.route')
const CourseRoute = require('./course.route')
const LessonRoute = require('./lesson.route')
const VocabularyRoute = require('./vocabulary.route')
const GrammarRoute = require('./grammar.route')
const KanjiRoute = require('./kanji.route')
const DeckRoute = require('./deck.route')
const FlashcardRoute = require('./flashcard.route')
const ExamRoute = require('./exam.route')

// Configuration Routes * /api/config/*
const TranslateRoute = require('./translation/translate.route')
const router = express.Router()

// AUTH Routes * /api/auth/*
router.use('/auth', AuthRoute)
router.use('/course', authenticateJWT, CourseRoute)
router.use('/lesson', authenticateJWT, LessonRoute)
router.use('/vocabulary', authenticateJWT, VocabularyRoute)
router.use('/grammar', authenticateJWT, GrammarRoute)
router.use('/kanji', authenticateJWT, KanjiRoute)
router.use('/deck', authenticateJWT, DeckRoute)
router.use('/flashcard', authenticateJWT, FlashcardRoute)
router.use('/exam', authenticateJWT, ExamRoute)

// Translation Routes * /api/language/*
router.use('/language', TranslateRoute)

module.exports = router
