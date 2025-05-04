const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Result'
const COLLECTION_NAME = 'Results'

const childAnswerSchema = new Schema({
  id: { type: String, required: true },
  content: { type: String, required: true },
  options: [{ text: String, id: String }],
  userAnswer: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
  score: { type: Number, default: 0 }
})

const answerSchema = new Schema({
  parentQuestionId: { type: String, required: true },
  paragraph: { type: String },
  imgUrl: { type: String },
  audioUrl: { type: String },
  childAnswers: [childAnswerSchema]
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
    isPassed: {
      type: Boolean,
      default: false
    },
    answers: [answerSchema], // Array of answers matching the structure of questions in the Exam model
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
