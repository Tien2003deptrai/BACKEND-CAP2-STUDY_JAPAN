const deckModel = require('../models/deck.model')
const throwError = require('../res/throwError')
const { convert2ObjectId } = require('../utils')
const DeckRepo = require('../models/repos/deck.repo')
const flashcardModel = require('../models/flashcard.model')

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
    const decks = await deckModel
      .find()
      .select('deck_title _id type')
      .populate({
        path: 'user',
        select: 'name avatar'
      })
      .lean()

    // Đếm số lượng flashcards thuộc mỗi deck
    for (const deck of decks) {
      const flashcardCount = await flashcardModel.countDocuments({ deck: deck._id })
      deck.flashcardCount = flashcardCount // Thêm thuộc tính flashcardCount vào mỗi deck
    }

    return decks
  },
  getDecksByType: async (type) => {
    if (!Object.values(TYPE).includes(type)) throwError('Type must be "vocabulary" or "grammar"')

    const decks = await DeckRepo.findDecksByType(type)

    return decks
  },
  deleteDeckById: async ({ deck_id }) => {
    const deck = await deckModel.findById(convert2ObjectId(deck_id))
    if (!deck) throwError('Không tìm thấy bộ flashcard')

    await flashcardModel.deleteMany({ deck: convert2ObjectId(deck_id) })

    await deckModel.findByIdAndDelete(deck_id)

    return {
      deck_id
    }
  },

  getAllDecksAndFlashcards: async () => {
    const decks = await deckModel.find().lean()

    const flashcards = await flashcardModel.find().select('deck front back').lean()

    decks.forEach((deck) => {
      deck.flashcards = flashcards.filter(
        (flashcard) => flashcard.deck.toString() === deck._id.toString()
      )
    })

    return decks
  }
}

module.exports = DeckService
