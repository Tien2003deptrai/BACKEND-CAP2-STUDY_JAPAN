const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Result'
const COLLECTION_NAME = 'Results'

const answerSchema = new Schema({
  questionId: { type: String, required: true },
  userAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
  score: { type: Number, default: 0 }
})

const resultSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    exam: {
      type: Schema.Types.ObjectId,
      ref: 'Exam',
      required: true
    },
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: {
      type: Date
    },
    totalScore: {
      type: Number,
      default: 0
    },
    answers: [answerSchema],
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'abandoned'],
      default: 'in-progress'
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

// Tạo index để tối ưu truy vấn
resultSchema.index({ user: 1, exam: 1, startTime: -1 })

module.exports = model(DOCUMENT_NAME, resultSchema)
