const deckModel = require('../models/deck.model')
const throwError = require('../res/throwError')
const { convert2ObjectId } = require('../utils')

const DeckService = {
  createDeck: async ({ user_id, deck_title }) => {
    const deck = await deckModel.findOne({ deck_title }).lean()
    if (deck) throwError('Deck already exists')

    const newDeck = await deckModel.create({
      user: convert2ObjectId(user_id),
      deck_title
    })

    return newDeck
  }
}

module.exports = DeckService
