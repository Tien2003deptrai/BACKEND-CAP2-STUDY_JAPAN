const LessonRepo = require('../models/repos/lesson.repo')
const VocabularyRepo = require('../models/repos/vocabulary.repo')
const vocabularyModel = require('../models/vocabulary.model')
const throwError = require('../res/throwError')
const { convert2ObjectId, JapaneseToUnicode } = require('../utils')

const VocabularyService = {
  // private methods
  _checkLessonExists: async (lesson_id) => {
    const lesson = await LessonRepo.findLessonById(lesson_id)
    if (!lesson) throwError('Lesson not found')
    return lesson
  },

  _checkVocabExists: async (lesson_id, word) => {
    return await vocabularyModel.findOne({ lesson: convert2ObjectId(lesson_id), word }).lean()
  },

  // public methods

  addVocabulary: async ({ lesson_id, ...bodyData }) => {
    await VocabularyService._checkLessonExists(lesson_id)

    if (await VocabularyService._checkVocabExists(lesson_id, bodyData.word)) {
      throwError('Vocabulary already exists')
    }

    const newVocab = await vocabularyModel.create({
      lesson: convert2ObjectId(lesson_id),
      ...bodyData
    })

    if (!newVocab) throwError('Vocabulary creation failed')

    await LessonRepo.addVocabIdToLesson({
      lesson_id: convert2ObjectId(lesson_id),
      vocab_id: newVocab._id
    })
    return newVocab
  },

  getAllVocabularies: async ({ lesson_id }) => {
    await VocabularyService._checkLessonExists(lesson_id)

    const listVocab = await VocabularyRepo.getAllByLesson(lesson_id)
    if (!listVocab.length) throwError('No vocabulary found')

    return listVocab
  },

  updateVocabulary: async (vocab_id, { lesson_id, ...bodyUpdate }) => {
    // console.log('vocab_id', vocab_id)
    const vocab = await vocabularyModel.findById(vocab_id).lean()
    if (!vocab) throwError('Vocabulary not found')

    if (await VocabularyService._checkVocabExists(lesson_id, bodyUpdate.word)) {
      throwError('Vocabulary already exists')
    }

    if (bodyUpdate.kanji) {
      bodyUpdate.hex_string = JapaneseToUnicode(bodyUpdate.kanji)
    }

    return VocabularyRepo.update(vocab_id, bodyUpdate)
  },

  deleteVocab: async (vocab_id, { lesson_id }) => {
    const vocab = await vocabularyModel.findById(vocab_id).lean()
    if (!vocab) throwError('Vocabulary not found')

    await LessonRepo.removeVocabIdFromLesson({ lesson_id, vocab_id })
    await vocabularyModel.deleteOne({ _id: vocab_id })

    return true
  }
}

module.exports = VocabularyService
