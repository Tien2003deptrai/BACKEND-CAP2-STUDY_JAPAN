const hinaModel = require('../hina.model')

const HinaRepo = {
  findByLessonId: lesson_id => hinaModel.findOne({ lesson_id }).lean(),

  findById: hina_id => hinaModel.findById(hina_id).lean(),

  getAll: () => hinaModel.find().lean(),

  create: (course_id, bodyData) => hinaModel.create({ course: course_id, ...bodyData }),

  update: (hina_id, bodyUpdate, isNew = true) =>
    hinaModel.findByIdAndUpdate(hina_id, bodyUpdate, { new: isNew }),

  delete: hina_id => hinaModel.deleteOne({ _id: hina_id })
}

module.exports = HinaRepo
