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
    lesson_id: {
      type: String,
      required: true,
      unique: true
    },
    lesson_title: {
      type: String,
      required: true
    },
    video_url: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    },
    index: {
      type: Number,
      required: true
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

lessonSchema.index({ index: 1 })

module.exports = model(DOCUMENT_NAME, lessonSchema)
