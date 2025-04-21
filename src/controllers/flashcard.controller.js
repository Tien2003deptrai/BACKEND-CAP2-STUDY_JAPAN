const FlashcardService = require('../services/flashcard.service')
const { validateRequiredFields } = require('../validators')
const handleRequest = require('./BaseController')

const FlashcardController = {
  addFlashcardToDeck: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['userId'], req.user)
        return await FlashcardService.createFlashcard({
          ...req.body,
          user_id: req.user.userId
        })
      },
      'Tạo flashcard thành công'
    ),

  updateDeckFlashcards: (req, res) =>
    handleRequest(
      res,
      async () => {
        const { deckId } = req.params
        const { deck_title, flashcard_type, flashcards } = req.body
        return await FlashcardService.updateFlashcard({
          deckId,
          deck_title,
          flashcard_type,
          flashcards
        })
      },
      'Cập nhật flashcard thành công'
    ),

  getAllFlashcardByDeck: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['deck_id'], req.params)
        return await FlashcardService.getAllFlashcardByDeck(req.params)
      },
      'Lấy tất cả flashcard theo deck thành công'
    ),

  getFlashCardReview: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['userId'], req.user)
        return await FlashcardService.getFlashCardReview({
          user_id: req.user.userId
        })
      },
      'Lấy flashcard để ôn tập thành công'
    ),

  deleteFlashcard: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['flashcard_id'], req.params)
        return await FlashcardService.deleteFlashcard({
          flashcard_id: req.params.flashcard_id
        })
      },
      'Xóa flashcard thành công'
    )
}

module.exports = FlashcardController
