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
  }
}

module.exports = DeckController
