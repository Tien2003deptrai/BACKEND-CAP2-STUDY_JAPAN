const express = require('express')
const CourseController = require('../controllers/course.controller')
const router = express.Router()

router.post('/register', CourseController.registerCourse)
router.post('/all', CourseController.getAllCourses)
router.post('', CourseController.createCourse)
router.patch('/:course_id', CourseController.updateCourse)

module.exports = router
