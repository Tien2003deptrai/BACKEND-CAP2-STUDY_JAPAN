const express = require('express')
const DeckController = require('../controllers/deck.controller')
const router = express.Router()

router.post('/add', DeckController.createDeck)

module.exports = router
