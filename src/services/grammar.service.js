const grammarModel = require('../models/grammar.model')
const GrammarRepo = require('../models/repos/grammar.repo')
const LessonRepo = require('../models/repos/lesson.repo')
const throwError = require('../res/throwError')
const { convert2ObjectId } = require('../utils')

const GrammarService = {
  addGrammar: async ({ lesson_id, ...bodyData }) => {
    const grammarExists = await GrammarRepo.findById(convert2ObjectId(lesson_id))
    if (grammarExists) throwError('Grammar already exists')

    const newGrammar = await GrammarRepo.create({ lesson: lesson_id, ...bodyData })
    if (!newGrammar) throwError('Grammar creation failed')

    await LessonRepo.addGrammarIdToLesson({ lesson_id, grammar_id: newGrammar._id })
    return newGrammar
  },

  updateGrammar: async (lesson_id, { grammar_id, ...bodyUpdate }) => {
    const grammarById = await GrammarRepo.findById(grammar_id)
    if (!grammarById) throwError('Grammar not found')

    const grammarExist = await GrammarRepo.getAllByLesson(lesson_id)
    if (grammarExist.some((g) => g.structure === bodyUpdate.structure && g._id != grammar_id)) {
      throwError('Grammar already exists')
    }

    return await GrammarRepo.updateGrammar(grammar_id, bodyUpdate)
  },

  deleteExample: async (grammar_id, example_id) => {
    const grammar = await GrammarRepo.findById(grammar_id)
    if (!grammar) throwError('Grammar not found')

    // Kiểm tra example có tồn tại không
    const exampleIndex = grammar.examples.findIndex(
      (example) => example._id.toString() === example_id
    )
    if (exampleIndex === -1) throwError('Example not found')

    // Xóa example khỏi mảng
    grammar.examples.splice(exampleIndex, 1)
    await grammarModel.findByIdAndUpdate(grammar_id, { examples: grammar.examples })

    return grammar
  },

  updateMultipleGrammars: async (lesson_id, grammars) => {
    console.log('grammars', grammars)
    const convertedLessonId = convert2ObjectId(lesson_id)
    const foundLesson = await LessonRepo.findLessonById(convertedLessonId)
    if (!foundLesson) throwError('Lesson not found')

    const results = await Promise.all(
      grammars.map(async (grammar) => {
        const { grammar_id, ...data } = grammar

        if (!grammar_id) {
          // Create new grammar
          const newGrammar = await GrammarRepo.create({
            lesson: convertedLessonId,
            ...data
          })

          if (!newGrammar) throwError('Failed to create new grammar')

          await LessonRepo.addGrammarIdToLesson({
            lesson_id: convertedLessonId,
            grammar_id: newGrammar._id
          })

          return newGrammar
        }

        // Update existing grammar
        const existingGrammar = await GrammarRepo.findById(grammar_id)
        if (!existingGrammar) throwError(`Grammar with id ${grammar_id} not found`)

        return await GrammarRepo.updateGrammar(grammar_id, data)
      })
    )

    return results
  },

  deleteGrammar: async (grammar_id, { lesson_id }) => {
    const grammarExist = await GrammarRepo.findById(grammar_id)
    if (!grammarExist) throwError('Grammar not found')

    await LessonRepo.removeGrammarIdFromLesson({ lesson_id, grammar_id })
    return await GrammarRepo.delete(grammar_id)
  },

  getGrammarByLevel: async (level, page, limit) => {
    return await GrammarRepo.getGrammarByLevel(level, page, limit)
  },

  getAllGrammar: async ({ lesson_id }) => {
    const foundLesson = await LessonRepo.findLessonById(lesson_id)
    if (!foundLesson) throwError('Lesson not found')

    return await GrammarRepo.getAllByLesson(lesson_id)
  }
}

module.exports = GrammarService
