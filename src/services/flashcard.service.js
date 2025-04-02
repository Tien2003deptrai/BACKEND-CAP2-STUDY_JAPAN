const deckModel = require('../models/deck.model')
const flashcardModel = require('../models/flashcard.model')
const FlashcardRepo = require('../models/repos/FlashcardRepo')
const vocabularyModel = require('../models/vocabulary.model')
const throwError = require('../res/throwError')
const { convert2ObjectId, nextReviewDate } = require('../utils')
const moment = require('moment')

const TYPE = {
  VOCABULARY: 'vocabulary',
  GRAMMAR: 'grammar'
}

const FlashcardService = {
  createFlashcard: async ({ deck_title, type, level = 1, user_id, ...bodyData }) => {
    if (!Object.values(TYPE).includes(type)) throwError('Type must be "vocabulary" or "grammar"')

    let deckId
    if (deck_title) {
      const newDeck = await deckModel.create({
        user: convert2ObjectId(user_id),
        deck_title
      })
      deckId = newDeck._id
    } else {
      throwError('deck_title is required')
    }

    const { date, interval } = nextReviewDate(level)
    let createdFlashcards = []

    // vocabulary
    if (type === TYPE.VOCABULARY && bodyData.vocab) {
      for (let key in bodyData.vocab) {
        const vocabId = convert2ObjectId(bodyData.vocab[key])
        const vocab = await FlashcardRepo.findVocabById(vocabId)
        if (!vocab) throwError('Vocabulary not found')

        const newFlashcard = await FlashcardRepo.create({
          deck: deckId,
          vocab: vocabId,
          front: vocab.word,
          back: vocab.meaning,
          interval: interval,
          reviewDate: date
        })
        createdFlashcards.push(newFlashcard)
      }
    }
    // grammar
    else if (type === TYPE.GRAMMAR && bodyData.grammar) {
      for (let key in bodyData.grammar) {
        const grammarId = convert2ObjectId(bodyData.grammar[key])
        const grammar = await FlashcardRepo.findGrammarById(grammarId)
        if (!grammar) throwError('Grammar not found')

        const newFlashcard = await FlashcardRepo.create({
          deck: deckId,
          grammar: grammarId,
          front: grammar.structure,
          back: grammar.explain,
          interval: interval,
          reviewDate: date
        })
        createdFlashcards.push(newFlashcard)
      }
    } else {
      throwError('Invalid data for the specified type')
    }

    return {
      deck: {
        _id: deckId,
        deck_title
      },
      flashcards: createdFlashcards
    }
  },

  updateFlashcard: async ({ flashcard_id, level }) => {
    console.log('flashcard_id', flashcard_id)
    const flashcard = await FlashcardRepo.findById({ _id: flashcard_id })
    if (!flashcard) throwError('Không tìm thấy Flashcard')
    if (level == 0) {
      await FlashcardRepo.deleteById(flashcard_id)
      return
    }

    const { date, interval } = nextReviewDate(level)
    flashcard.reviewDate = date
    flashcard.interval = interval
    await flashcard.save()
    const updatedFlashcard = await flashcardModel
      .findById(flashcard_id)
      .select('_id reviewDate interval')

    return {
      _id: updatedFlashcard._id,
      reviewDate: moment(updatedFlashcard.reviewDate).format('YYYY-MM-DD HH:mm:ss'),
      interval: updatedFlashcard.interval
    }
  },

  getAllFlashcardByDeck: async ({ deck_id }) => {
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
    if (listDecks.length === 0) throwError('Không có thư mục ôn tập')

    let result = []
    const today = new Date()
    today.setUTCHours(23, 59, 59, 999)
    // 📅 today = 2025-03-20T23:59:59.999Z
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
