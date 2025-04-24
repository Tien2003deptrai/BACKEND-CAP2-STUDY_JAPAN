const DeckService = require('../services/deck.service')
const { validateRequiredFields } = require('../validators')
const handleRequest = require('./BaseController')

const DeckController = {
  createDeck: (req, res) => {
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['userId'], req.user)
        return await DeckService.createDeck({
          user_id: req.user.userId,
          ...req.body
        })
      },
      'Tạo bộ thẻ thành công'
    )
  },

  getAllDeckByUser: (req, res) => {
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['userId'], req.user)
        return await DeckService.getAllDeckByUserId({
          user_id: req.user.userId
        })
      },
      'Lấy danh sách bộ thẻ của người dùng thành công'
    )
  },
  getAllDecks: (req, res) => {
    handleRequest(
      res,
      async () => {
        return await DeckService.getAllDecks()
      },
      'Lấy tất cả bộ flashcards thành công'
    )
  },
  getDecksByType: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['type'], req.params)
        return await DeckService.getDecksByType(req.params.type)
      },
      'Lấy danh sách deck theo loại thành công'
    ),

  deleteDeck: (req, res) =>
    handleRequest(
      res,
      async () => {
        validateRequiredFields(['deck_id'], req.params)
        return await DeckService.deleteDeckById({
          deck_id: req.params.deck_id
        })
      },
      'Xóa bộ flashcard thành công'
    ),

  getAllDecksAndFlashcards: (req, res) => {
    handleRequest(
      res,
      async () => {
        return await DeckService.getAllDecksAndFlashcards()
      },
      'Lấy tất cả bộ data flashcards thành công'
    )
  }
}

module.exports = DeckController
