const express = require('express')
const CourseController = require('../controllers/course.controller')
const router = express.Router()

router.post('/register', CourseController.registerCourse)
router.get('/all', CourseController.getAllCourses)
router.post('', CourseController.createCourse)
router.patch('/:course_id', CourseController.updateCourse)
router.get('/teacher/:teacher_id', CourseController.getCoursesByTeacher)
router.get('/:course_id/students', CourseController.getEnrolledStudents)
router.post('/unenroll', CourseController.unenrollStudent)

module.exports = router
