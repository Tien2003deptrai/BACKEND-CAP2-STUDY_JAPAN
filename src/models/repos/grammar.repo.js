const grammarModel = require('../grammar.model')
const { convert2ObjectId } = require('../../utils')

const GrammarRepo = {
  findById: (grammar_id) => grammarModel.findById(grammar_id).lean(),

  getAllByLesson: (lesson_id) => grammarModel.find({ lesson: convert2ObjectId(lesson_id) }).lean(),

  getAll: () => grammarModel.find().lean(),

  create: (bodyData) => grammarModel.create(bodyData),

  update: (grammar_id, bodyUpdate, isNew = true) =>
    grammarModel.findByIdAndUpdate(grammar_id, bodyUpdate, { new: isNew }),

  delete: (grammar_id) => grammarModel.deleteOne({ _id: grammar_id })
}

module.exports = GrammarRepo
