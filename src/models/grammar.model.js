const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Grammar'
const COLLECTION_NAME = 'Grammars'

const exampleSchema = new Schema({
  _id: { type: String },
  ja: { type: String, required: true },
  vi: { type: String, required: true }
})

const grammarSchema = new Schema(
  {
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    title: {
      type: String
    },
    structure: {
      type: String,
      required: true
    },
    explain: {
      type: String,
      required: true
    },
    examples: [exampleSchema],
    level: {
      type: String
    },
    mean: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

// Ensure _id is handled by MongoDB
grammarSchema.set('_id', true)

module.exports = model(DOCUMENT_NAME, grammarSchema)
