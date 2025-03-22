const express = require('express')
const RenshuuController = require('../controllers/renshuu.controller')
const router = express.Router()

router.post('/', RenshuuController.createRenshuu)
router.patch('/:renshuu_id', RenshuuController.updateRenshuu)
router.delete('/:renshuu_id', RenshuuController.deleteRenshuu)

module.exports = router
