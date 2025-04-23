const vocabularyModel = require('../vocabulary.model')
const { convert2ObjectId } = require('../../utils')

const VocabularyRepo = {
  // Basic CRUD operations
  create: async (data) => vocabularyModel.create(data),

  findById: async (id) => vocabularyModel.findById(convert2ObjectId(id)).lean(),

  update: async (id, data) =>
    vocabularyModel.findByIdAndUpdate(convert2ObjectId(id), data, { new: true }).lean(),

  delete: async (id) => vocabularyModel.findByIdAndDelete(convert2ObjectId(id)).lean(),

  // Query operations
  findAll: async () => vocabularyModel.find().lean(),

  findByLesson: async (lesson_id) =>
    vocabularyModel.find({ lesson: convert2ObjectId(lesson_id) }).lean(),

  findByWord: async (lesson_id, word) =>
    vocabularyModel
      .findOne({
        lesson: convert2ObjectId(lesson_id),
        word
      })
      .lean(),

  findByWordOnly: async (word) => vocabularyModel.findOne({ word }).lean(),

  findByWordExcludingId: async (lesson_id, word, exclude_id) =>
    vocabularyModel
      .findOne({
        lesson: convert2ObjectId(lesson_id),
        word,
        _id: { $ne: convert2ObjectId(exclude_id) }
      })
      .lean(),

  // Batch operations
  createMany: async (data) => vocabularyModel.insertMany(data),

  updateMany: async (filter, update) =>
    vocabularyModel.updateMany(filter, update, { new: true }).lean(),

  deleteMany: async (filter) => vocabularyModel.deleteMany(filter)
}

module.exports = VocabularyRepo
