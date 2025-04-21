const express = require('express')
const FlashcardController = require('../controllers/flashcard.controller')

const router = express.Router()

router.post('/', FlashcardController.addFlashcardToDeck)
router.put('/:deckId', FlashcardController.updateDeckFlashcards)
router.get('/review', FlashcardController.getFlashCardReview)
router.get('/:deck_id', FlashcardController.getAllFlashcardByDeck)
router.delete('/:flashcard_id', FlashcardController.deleteFlashcard)

module.exports = router
