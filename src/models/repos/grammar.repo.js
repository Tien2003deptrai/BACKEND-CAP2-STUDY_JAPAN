const { convert2ObjectId } = require('../../utils')
const grammarModel = require('../grammar.model')

const GrammarRepo = {
  findById: (grammar_id) => grammarModel.findById(convert2ObjectId(grammar_id)).lean(),

  getAllByLesson: (lesson_id) => grammarModel.find({ lesson: convert2ObjectId(lesson_id) }).lean(),

  getAll: () => grammarModel.find().lean(),

  create: (bodyData) => grammarModel.create(bodyData),

  updateGrammar: (grammar_id, bodyUpdate, isNew = true) =>
    grammarModel.findByIdAndUpdate(grammar_id, bodyUpdate, { new: isNew }),

  delete: (grammar_id) => grammarModel.deleteOne({ _id: grammar_id }),

  getGrammarByLevel: async (level, page, limit = 12) => {
    if (page < 1) throw new Error('Invalid page number')

    const grammars = await grammarModel
      .find({ level: level.toUpperCase() })
      .limit(limit)
      .skip(limit * (page - 1))
      .lean()

    const count = await grammarModel.countDocuments({ level: level.toUpperCase() })

    if (!grammars.length) throw new Error(`No grammar found for level ${level}`)

    return { grammars, count }
  }
}

module.exports = GrammarRepo
