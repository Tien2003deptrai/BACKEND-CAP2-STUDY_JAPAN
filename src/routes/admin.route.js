const express = require('express')
const AdminController = require('../controllers/admin.controller')
const { authorizeRole } = require('../middleware/auth.middleware')
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

module.exports = router
