const { Schema, model } = require('mongoose')
const { JapaneseToUnicode } = require('../utils')

const DOCUMENT_NAME = 'Hina'
const COLLECTION_NAME = 'Hinas'

const hinaSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    name_type: {
      type: Number,
      enum: [0, 1] //0: hiragana, 1: katakana
    },
    points: Number,
    words: [
      {
        word: String,
        trans: String,
        audio: String,
        svg_path: [String],
        note: String
      }
    ],
    questions: [
      {
        content: String,
        image: String,
        trans: String,
        sentence: String,
        value: String,
        quiz: [String],
        point: Number
      }
    ]
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

hinaSchema.pre('save', async function (next) {
  this.words.forEach((w) => {
    if (w.word) {
      w.svg_path = (w.svg_path || []).concat(
        JapaneseToUnicode(w.word).map((v) => `colorized-kanji-stroke/${v}.svg`)
      )
    }
  })
  next()
})

module.exports = model(DOCUMENT_NAME, hinaSchema)
