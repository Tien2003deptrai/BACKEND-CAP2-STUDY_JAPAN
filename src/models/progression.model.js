const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Progression'
const COLLECTION_NAME = 'Progressions'

const progressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    achievements: [
      {
        title: String,
        image: String
      }
    ], //later
    progress: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: 'Course'
        },
        lessons: [
          {
            type: Schema.Types.ObjectId,
            refPath: 'progress.lessonType'
          }
        ],
        lessonType: {
          type: String,
          enum: ['Lesson', 'Hina']
        }
      }
    ],
    examsProgress: [
      {
        exam: {
          type: Schema.Types.ObjectId,
          ref: 'Exam'
        },
        point: Number,
        note: String
      }
    ],
    gameProgress: [
      {
        gameType: {
          type: String,
          enum: ['MemoryCard', 'Flashcard', 'Other', 'MiniRPG']
        },
        correctPairs: Number,
        totalCards: Number,
        duration: Number,
        score: Number,
        name: String, // <- ✨ Thêm field name để lưu tên người chơi
        playedAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

module.exports = model(DOCUMENT_NAME, progressSchema)
