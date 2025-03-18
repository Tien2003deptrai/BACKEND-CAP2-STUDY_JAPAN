const express = require('express')
const LessonController = require('../controllers/lesson.controller')

const router = express.Router()

router.post('', LessonController.createLesson)
router.post('/all', LessonController.getAllLesson)
router.post('/:lesson_id', LessonController.getOneLesson)
router.patch('/:lesson_id', LessonController.updateLesson)
router.post('/release/:lesson_id', LessonController.releaseLesson)
router.post('/unRelease/:lesson_id', LessonController.unReleaseLesson)
/**
 * @desc get all darft of lesson (All no need id course)
 * @param {Number} limit
 * @param {Number} skip
 * @return {JSON}
 */
router.get('/drafts', LessonController.getAllDraftLesson)
router.get('/release/all/:course_id', LessonController.getAllReleaseLesson)
router.get('/all/titles', LessonController.getAllCourseTitles)

module.exports = router
