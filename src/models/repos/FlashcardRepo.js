const flashcardModel = require('../flashcard.model')

const FlashcardRepo = {
  create: async (data) => {
    return await flashcardModel.create(data)
  },

  findById: async (id) => {
    return await flashcardModel.findById(id)
  },

  deleteById: async (id) => {
    return await flashcardModel.deleteOne({ _id: id })
  },

  findAllByDeck: async (deckId) => {
    return await flashcardModel
      .find({ deck: deckId })
      .populate('vocab', 'word kanji kana meaning audio example')
      .populate('kanji', 'kanji explain')
      .populate('grammar', 'title')
      .select('vocab grammar kanji interval reviewDate front back')
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
