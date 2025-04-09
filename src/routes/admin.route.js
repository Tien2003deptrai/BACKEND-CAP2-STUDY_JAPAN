const express = require('express')
const AdminController = require('../controllers/admin.controller')
const { authorizeRole } = require('../middleware/auth.middleware')
const CourseController = require('../controllers/course.controller')
const LessonController = require('../controllers/lesson.controller')
const router = express.Router()

// Apply authentication and admin role check to all admin routes
router.use(authorizeRole(['admin']))

// Dashboard statistics - Admin only
router.get('/dashboard', AdminController.getDashboardStats)

// Teacher management - Admin only
router.get('/teachers', AdminController.getAllTeachers)
router.get('/teachers/:teacher_id', AdminController.getTeacherById)
router.patch('/teachers/:teacher_id/status', AdminController.updateTeacherStatus)

// Student management - Admin only
router.get('/students', AdminController.getAllStudents)
router.get('/students/:student_id', AdminController.getStudentById)
router.patch('/students/:student_id/status', AdminController.updateStudentStatus)

// Course management - Admin only
router.get('/courses', CourseController.getAllCourses)
router.get('/all/course/:course_id', LessonController.getAllLessonByCourse)

// Enrollment management
router.get('/courses/:course_id/students', AdminController.getStudentsByCourse)
router.get('/students/:student_id/courses', AdminController.getCoursesByStudent)
router.post('/enrollments', AdminController.enrollStudent)
router.delete('/enrollments', AdminController.removeEnrollment)

module.exports = router
