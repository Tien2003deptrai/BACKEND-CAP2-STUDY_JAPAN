const { convert2ObjectId } = require('../../utils')
const renshuuModel = require('../renshuu.model')

const RenshuuRepo = {
  create: (data) => renshuuModel.create(data),

  findById: (renshuu_id) => renshuuModel.findById(convert2ObjectId(renshuu_id)).lean(),

  findByIdLesson: (lesson_id) => renshuuModel.findOne({ lesson: lesson_id }).lean(),

  findByTitle: (title) => renshuuModel.findOne({ title }).lean(),

  update: (renshuu_id, bodyUpdate, isNew = true) =>
    renshuuModel.findByIdAndUpdate(renshuu_id, bodyUpdate, { new: isNew }),

  delete: (renshuu_id) => renshuuModel.deleteOne({ _id: renshuu_id })
}

module.exports = RenshuuRepo
