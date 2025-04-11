const { convert2ObjectId } = require('../../utils')
const renshuuModel = require('../renshuu.model')

const RenshuuRepo = {
  create: (data) => renshuuModel.create(data),

  findById: (renshuu_id) => renshuuModel.findById(convert2ObjectId(renshuu_id)).lean(),

  findByIdLesson: (lesson_id) => renshuuModel.findOne({ lesson: lesson_id }).lean(),

  findByTitle: (title) => renshuuModel.findOne({ title }).lean(),

  update: (renshuu_id, updateData, isNew = true) =>
    renshuuModel.findByIdAndUpdate(renshuu_id, updateData, { new: isNew }),

  delete: (renshuu_id) => renshuuModel.deleteOne({ _id: renshuu_id }),

  updateQuestion: (renshuuId, questionId, questionData) => {
    console.log(questionData, renshuuId, questionId)

    renshuuModel.updateOne(
      {
        _id: convert2ObjectId(renshuuId),
        'question._id': convert2ObjectId(questionId)
      },
      {
        $set: {
          'question.$.content': questionData.content,
          'question.$.correctAnswer': questionData.correctAnswer,
          'question.$.options': questionData.options
        }
      }
    )
  }
}

module.exports = RenshuuRepo
