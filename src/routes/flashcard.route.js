const express = require('express')
const FlashcardController = require('../controllers/flashcard.controller')

const router = express.Router()

router.post('/', FlashcardController.addFlashcardToDeck)

router.patch('/', FlashcardController.updateFlashcard)

router.get('/:deck_id', FlashcardController.getAllFlCardByDeck)

router.get('/review', FlashcardController.getFlashCardReview)

module.exports = router
