const express = require('express')
const router = express.Router()
const ProgressionController = require('../controllers/progression.controller')

router.post('/game-result', ProgressionController.saveGameResult)
router.get('/game-history', ProgressionController.getGameHistory)

router.post('/mini-rpg-result', ProgressionController.saveMiniRPGResult)
router.get('/mini-rpg-history', ProgressionController.getMiniRPGHistory)

module.exports = router
