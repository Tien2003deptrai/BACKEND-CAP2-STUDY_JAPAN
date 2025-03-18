const vocabularyModel = require('../vocabulary.model')
const { convert2ObjectId } = require('../../utils')

const VocabularyRepo = {
  update: (vocab_id, bodyUpdate, isNew = true) =>
    vocabularyModel.findByIdAndUpdate(vocab_id, bodyUpdate, { new: isNew }),

  getAllByLesson: lesson_id => vocabularyModel.find({ lesson: convert2ObjectId(lesson_id) }).lean()
}

module.exports = VocabularyRepo
