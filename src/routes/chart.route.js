const express = require('express')
const ChartController = require('../controllers/chart.controller')
const router = express.Router()

router.get('/students-growth', ChartController.getChartStudentGrowth)
router.get('/course-registrations', ChartController.getChartCourseRegistrations)
router.get('/learning-levels', ChartController.getChartLearningLevels)
router.get('/completion-rates', ChartController.getChartCompletionRate)
router.get('/game-activity', ChartController.getChartGameActivity)

module.exports = router
