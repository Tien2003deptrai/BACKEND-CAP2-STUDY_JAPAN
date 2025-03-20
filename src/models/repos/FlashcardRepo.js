const flashcardModel = require('../flashcard.model')

const FlashcardRepo = {
  create: async (data) => {
    return await flashcardModel.create(data)
  },

  findById: async (id) => {
    return await flashcardModel.findById(id).lean()
  },

  deleteById: async (id) => {
    return await flashcardModel.deleteOne({ _id: id })
  },

  findAllByDeck: async (deckId) => {
    return await flashcardModel
      .find({ deck: deckId })
      .populate('vocabulary', '')
      .populate('kanji', '')
      .populate('grammar', '')
      .select('vocab grammar interval reviewDate')
      .lean()
  },

  findReviewCards: async (deckId, reviewDate) => {
    return await flashcardModel
      .find({
        deck: deckId,
        reviewDate: { $lte: reviewDate }
      })
      .populate('vocabulary', '')
      .populate('kanji', '')
      .populate('grammar', '')
      .select('vocab grammar interval reviewDate')
      .lean()
  }
}

module.exports = FlashcardRepo
