const express = require('express')
const CourseController = require('../controllers/course.controller')
const router = express.Router()

router.post('/register', CourseController.registerCourse)
router.get('/all', CourseController.getAllCourses)
router.get('/enrolled', CourseController.getAllEnrolledCourses)
router.post('', CourseController.createCourse)
router.put('/:course_id', CourseController.updateCourse)
router.get('/teacher/:teacher_id', CourseController.getCoursesByTeacher)
router.get('/:course_id/students', CourseController.getEnrolledStudents)
router.post('/unenroll', CourseController.unenrollStudent)
router.post('/students/enroll', CourseController.bulkAddStudents)
router.post('/teacher/enroll', CourseController.assignTeacher)

module.exports = router
