const flashcardModel = require('../flashcard.model')
const vocabularyModel = require('../vocabulary.model')
const grammarModel = require('../grammar.model')
const { convert2ObjectId } = require('../../utils')

const FlashcardRepo = {
  create: async (data) => {
    return await flashcardModel.create(data)
  },

  findById: async (id) => {
    return await flashcardModel.findById(convert2ObjectId(id)).lean()
  },

  findVocabById: async (id) => {
    return await vocabularyModel.findById(convert2ObjectId(id)).lean()
  },

  findGrammarById: async (id) => {
    return await grammarModel.findById(convert2ObjectId(id)).lean()
  },

  deleteById: async (id) => {
    return await flashcardModel.findByIdAndDelete(convert2ObjectId(id)).lean()
  },

  findAllByDeck: async (deck_id) => {
    return await flashcardModel
      .find({ deck: convert2ObjectId(deck_id) })
      .populate('vocab', 'word kanji kana meaning')
      .populate('grammar', 'title structure explain examples')
      .lean()
  },

  findReviewCards: async (deckId, reviewDate) => {
    return await flashcardModel
      .find({
        deck: deckId,
        reviewDate: { $lte: reviewDate }
      })
      .populate('vocab', '')
      .populate('kanji', '')
      .populate('grammar', '')
      .select('vocab grammar interval reviewDate')
      .lean()
  }
}

module.exports = FlashcardRepo
