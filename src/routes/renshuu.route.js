const express = require('express')
const RenshuuController = require('../controllers/renshuu.controller')
const router = express.Router()

router.post('/', RenshuuController.createRenshuu)
// router.put('/:renshuu_id', RenshuuController.updateRenshuu)
router.delete('/:renshuu_id', RenshuuController.deleteRenshuu)
router.delete('/:renshuu_id/question/:question_id', RenshuuController.deleteQuestion)
router.get('/:lesson_id', RenshuuController.getAllRenshuuByLessonId)
router.put('/question', RenshuuController.updateQuestion)
router.post('/submit/:renshuuId', RenshuuController.submitRenshuu)

module.exports = router
