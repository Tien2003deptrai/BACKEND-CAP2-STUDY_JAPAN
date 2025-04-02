const deckModel = require('../models/deck.model')
const throwError = require('../res/throwError')
const { convert2ObjectId } = require('../utils')
const DeckRepo = require('../models/repos/deck.repo')

const TYPE = {
  VOCABULARY: 'vocabulary',
  GRAMMAR: 'grammar'
}

const DeckService = {
  createDeck: async ({ user_id, deck_title, type }) => {
    const deck = await deckModel.findOne({ deck_title }).lean()
    if (deck) throwError('Deck already exists')

    const newDeck = await deckModel.create({
      user: convert2ObjectId(user_id),
      deck_title,
      type
    })

    return newDeck
  },

  getAllDeckByUserId: async ({ user_id }) => {
    console.log('user_id', user_id)
    const listDeck = await deckModel
      .find({
        user: convert2ObjectId(user_id)
      })
      .select('deck_title _id type')
      .lean()
    if (!listDeck) throwError('Deck already exists')
    return listDeck
  },
  getAllDecks: async () => {
    const decks = await deckModel.find().select('deck_title _id type').lean()
    return decks
  },
  getDecksByType: async (type) => {
    if (!Object.values(TYPE).includes(type)) throwError('Type must be "vocabulary" or "grammar"')

    const decks = await DeckRepo.findDecksByType(type)

    return decks
  }
}

module.exports = DeckService
