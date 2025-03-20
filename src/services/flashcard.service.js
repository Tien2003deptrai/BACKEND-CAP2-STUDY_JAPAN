const deckModel = require('../models/deck.model')
const FlashcardRepo = require('../models/repos/FlashcardRepo')
const throwError = require('../res/throwError')
const { convert2ObjectId, nextReviewDate } = require('../utils')

const TYPE = 'vocabulary'

const FlashcardService = {
  createFlashcard: async ({ desk_id, type, level = 1, ...bodyData }) => {
    const deckExist = await deckModel.findById(convert2ObjectId(desk_id)).lean()
    if (!deckExist) throwError('Deck not found')
    const { date, interval } = nextReviewDate(level)
    if (type === TYPE) {
      for (let key in bodyData.vocab) {
        await FlashcardRepo.create({
          deck: convert2ObjectId(desk_id),
          vocab: convert2ObjectId(bodyData.vocab[key]),
          interval: interval,
          reviewDate: date
        })
      }
    }
    return 1
  },

  updateFlashcard: async ({ flashcard_id, level }) => {
    const flashcard = await FlashcardRepo.findById(flashcard_id)
    if (!flashcard) throwError('Flashcard not found')
    if (level == 0) {
      await FlashcardRepo.deleteById(flashcard_id)
      return
    }

    const { date, interval } = nextReviewDate(level)
    flashcard.reviewDate = date
    flashcard.interval = interval
    await flashcard.save()
    const result = await FlashcardRepo.findById(flashcard_id)
    return {
      ...result,
      reviewDate: moment(new Date(result.reviewDate)).format()
    }
  },

  getAllFlCardByDeck: async ({ deck_id }) => {
    const foundDeck = await deckModel
      .findById(convert2ObjectId(deck_id))
      .select('deck_title -_id')
      .lean()

    if (!foundDeck) throwError('Không tìm thấy thư mục')
    const listFlcards = await FlashcardRepo.findAllByDeck(convert2ObjectId(deck_id))

    if (listFlcards.length == 0) throwError('Chưa có từ nào được thêm!')

    return {
      flashcard: listFlcards,
      ...foundDeck
    }
  },

  getFlashCardReview: async ({ user_id }) => {
    const listDecks = await deckModel.find({ user: convert2ObjectId(user_id) }).lean()
    if (listDecks.length <= 0) throwError('Không có thư mục ôn tập')
    let result = []
    const today = new Date()
    await Promise.all(
      listDecks.map(async (deck) => {
        const flReview = await FlashcardRepo.findReviewCards(deck._id, today)
        flReview.forEach((fl) => result.push(fl))
      })
    )

    return result
  }
}

module.exports = FlashcardService
