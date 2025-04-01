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
  },

  getAllDeckByUserId: async ({ user_id }) => {
    console.log('user_id', user_id)
    const listDeck = await deckModel
      .find({
        user: convert2ObjectId(user_id)
      })
      .select('deck_title _id')
      .lean()
    if (!listDeck) throwError('Deck already exists')
    return listDeck
  },
  getAllDecks: async () => {
    const decks = await deckModel.find().select('deck_title _id').lean()
    return decks
  }
}

module.exports = DeckService
