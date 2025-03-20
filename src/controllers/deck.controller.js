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
  }
}

module.exports = DeckController
