const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Renshuu'
const COLLECTION_NAME = 'Renshuus'

const renshuuSchema = new Schema(
  {
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    questions: [
      {
        content: { type: String, required: true },
        correctAnswer: { type: String, required: true }, //correct answer
        options: [
          {
            id: { type: String, required: true }, //a, b, c, d
            text: { type: String, required: true }
          }
        ]
      }
    ]
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true
  }
)

module.exports = model(DOCUMENT_NAME, renshuuSchema)
