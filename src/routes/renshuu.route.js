const express = require('express')
const RenshuuController = require('../controllers/renshuu.controller')
const router = express.Router()

router.post('/', RenshuuController.createRenshuu)
// router.put('/:renshuu_id', RenshuuController.updateRenshuu)
router.delete('/:renshuu_id', RenshuuController.deleteRenshuu)
router.get('/:lesson_id', RenshuuController.getAllRenshuuByLessonId)
router.put('/question', RenshuuController.updateQuestion)

module.exports = router
