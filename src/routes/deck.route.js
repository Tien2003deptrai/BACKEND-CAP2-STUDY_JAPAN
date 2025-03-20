const express = require('express')
const DeckController = require('../controllers/deck.controller')
const router = express.Router()

router.post('/add', DeckController.createDeck)
router.get('/user', DeckController.getAllDeckByUser)

module.exports = router
