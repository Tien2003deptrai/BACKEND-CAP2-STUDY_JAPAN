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

  updateQuestion: async (renshuuId, questionId, questionData) => {
    console.log(questionData, renshuuId, questionId)

    const result = await renshuuModel.updateOne(
      {
        _id: convert2ObjectId(renshuuId),
        'questions._id': convert2ObjectId(questionId)
      },
      {
        $set: {
          'questions.$.content': questionData.content,
          'questions.$.correctAnswer': questionData.correctAnswer,
          'questions.$.options': questionData.options
        }
      }
    )
    console.log('Matched:', result.matchedCount)
    console.log('Modified:', result.modifiedCount)
  }
}

module.exports = RenshuuRepo
