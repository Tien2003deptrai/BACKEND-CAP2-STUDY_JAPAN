const express = require('express')
const AdminController = require('../controllers/admin.controller')
const router = express.Router()

// Dashboard statistics
router.get('/dashboard', AdminController.getDashboardStats)

// Teacher routes
router.get('/teachers', AdminController.getAllTeachers)
router.get('/teachers/:teacher_id', AdminController.getTeacherById)
router.patch('/teachers/:teacher_id/status', AdminController.updateTeacherStatus)

// Student routes
router.get('/students', AdminController.getAllStudents)
router.get('/students/:student_id', AdminController.getStudentById)
router.patch('/students/:student_id/status', AdminController.updateStudentStatus)

module.exports = router
