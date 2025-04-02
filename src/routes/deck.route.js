const express = require('express')
const DeckController = require('../controllers/deck.controller')
const router = express.Router()

router.get('/type/:type', DeckController.getDecksByType)

router.post('/add', DeckController.createDeck)
router.get('/user', DeckController.getAllDeckByUser)
router.get('/all', DeckController.getAllDecks)

module.exports = router
