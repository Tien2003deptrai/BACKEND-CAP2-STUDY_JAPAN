const express = require('express')
const HinaController = require('../controllers/hina.controller')
const router = express.Router()

router.post('/', HinaController.createHina)
router.get('/:course_id/:lesson_id', HinaController.getHinaByLesson)

module.exports = router
