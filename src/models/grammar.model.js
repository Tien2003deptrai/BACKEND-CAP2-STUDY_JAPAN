const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Grammar'
const COLLECTION_NAME = 'Grammars'

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
    examples: [
      {
        ja: String,
        vi: String
      }
    ],
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

module.exports = model(DOCUMENT_NAME, grammarSchema)
