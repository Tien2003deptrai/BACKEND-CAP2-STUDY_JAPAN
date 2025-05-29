const LessonRepo = require('../models/repos/lesson.repo')
const VocabularyRepo = require('../models/repos/vocabulary.repo')
const vocabularyModel = require('../models/vocabulary.model')
const throwError = require('../res/throwError')
const { convert2ObjectId, JapaneseToUnicode } = require('../utils')

const VocabularyService = {
  // Private methods
  _validateLesson: async (lesson_id) => {
    try {
      const lesson = await LessonRepo.findLessonById(lesson_id)
      if (!lesson) throwError('Lesson not found')
      return lesson
    } catch (error) {
      if (error.name === 'CastError') throwError('Invalid lesson ID format')
      throw error
    }
  },

  _processKanji: (data) => {
    if (data.kanji) {
      data.hex_string = JapaneseToUnicode(data.kanji)
    }
    return data
  },

  getAllVocabulariesWithoutLesson: async () => {
    const vocabularies = await VocabularyRepo.findAll()
    return vocabularies
  },

  addVocabulary: async ({ lesson_id, ...data }) => {
    await VocabularyService._validateLesson(lesson_id)

    const existingWord = await VocabularyRepo.findByWord(lesson_id, data.word)
    if (existingWord) throwError('Vocabulary already exists')

    const processedData = VocabularyService._processKanji({
      lesson: convert2ObjectId(lesson_id),
      ...data
    })

    const newVocab = await VocabularyRepo.create(processedData)
    if (!newVocab) throwError('Vocabulary creation failed')

    await LessonRepo.addVocabIdToLesson({
      lesson_id: convert2ObjectId(lesson_id),
      vocab_id: newVocab._id
    })

    return newVocab
  },

  getAllVocabularies: async ({ lesson_id }) => {
    await VocabularyService._validateLesson(lesson_id)
    const vocabularies = await VocabularyRepo.findByLesson(lesson_id)
    return vocabularies
  },

  updateVocabulary: async (vocab_id, { lesson_id, ...data }) => {
    const existingVocab = await VocabularyRepo.findById(vocab_id)
    if (!existingVocab) throwError('Vocabulary not found')

    if (data.word) {
      const existingWord = await VocabularyRepo.findByWordExcludingId(
        lesson_id,
        data.word,
        vocab_id
      )
      if (existingWord) throwError('Vocabulary already exists')
    }

    const processedData = this._processKanji(data)
    return VocabularyRepo.update(vocab_id, processedData)
  },

  updateMultipleVocabularies: async (lesson_id, vocabularies) => {
    const convertedLessonId = convert2ObjectId(lesson_id)
    await VocabularyService._validateLesson(convertedLessonId)

    const results = await Promise.all(
      vocabularies.map(async (vocab) => {
        const { vocab_id, ...data } = vocab
        const processedData = VocabularyService._processKanji(data)

        if (!vocab_id) {
          // Create new vocabulary
          const newVocab = await VocabularyRepo.create({
            lesson: convertedLessonId,
            ...processedData
          })

          if (!newVocab) throwError('Failed to create new vocabulary')

          await LessonRepo.addVocabIdToLesson({
            lesson_id: convertedLessonId,
            vocab_id: newVocab._id
          })

          return newVocab
        }

        // Update existing vocabulary
        const existingVocab = await VocabularyRepo.findById(vocab_id)
        if (!existingVocab) throwError(`Vocabulary with id ${vocab_id} not found`)

        return VocabularyRepo.update(vocab_id, processedData)
      })
    )

    return results
  },

  deleteVocabulary: async (vocab_id, { lesson_id }) => {
    const existingVocab = await VocabularyRepo.findById(vocab_id)
    if (!existingVocab) throwError('Vocabulary not found')

    await Promise.all([
      LessonRepo.removeVocabIdFromLesson({ lesson_id, vocab_id }),
      VocabularyRepo.delete(vocab_id)
    ])

    return true
  },

  deleteVocabularyNoLesson: async (vocab_id) => {
    const existingVocab = await VocabularyRepo.findById(vocab_id)
    if (!existingVocab) throwError('Vocabulary not found')

    return VocabularyRepo.delete(vocab_id)
  },

  getAllVocabulariesAI: async () => {
    const vocabularies = await VocabularyRepo.findAll()
    return vocabularies
  },
  getVocabularyById: async (vocab_id) => {
    const vocabulary = await VocabularyRepo.findById(vocab_id)
    if (!vocabulary) throwError('Vocabulary not found')
    return vocabulary
  },

  addVocabulary: async (data) => {
    const existingVocab = await VocabularyRepo.findByWordOnly(data.word)
    if (existingVocab) throwError('Vocabulary already exists')

    const processedData = VocabularyService._processKanji(data)

    const newVocab = await VocabularyRepo.create(processedData)
    if (!newVocab) throwError('Vocabulary creation failed')

    return newVocab
  },

  fetchLatestVocabularies: async (limit = 10) => {
    return vocabularyModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}

module.exports = VocabularyService
