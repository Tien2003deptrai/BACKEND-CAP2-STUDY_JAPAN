const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Lesson'
const COLLECTION_NAME = 'Lessons'

const lessonSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    lesson_title: {
      type: String,
      required: true
    },
    isPublic: {
      type: Boolean,
      default: false,
      index: true
      // select: false,
    },
    contents: {
      vocabulary: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Vocabulary'
        }
      ],
      grammar: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Grammar'
        }
      ],
      kaiwa: {
        type: Array
      }
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

module.exports = model(DOCUMENT_NAME, lessonSchema)
