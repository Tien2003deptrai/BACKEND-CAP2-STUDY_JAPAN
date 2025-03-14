const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Flashcard'
const COLLECTION_NAME = 'Flashcards'

const flcardSchema = new Schema(
  {
    grammar: { type: Schema.Types.ObjectId, ref: 'Grammar' },
    vocab: { type: Schema.Types.ObjectId, ref: 'Vocabulary' },
    kanji: { type: Schema.Types.ObjectId, ref: 'Kanji' },
    deck: { type: Schema.Types.ObjectId, ref: 'Deck', required: true },
    front: { type: String },
    back: { type: String },
    tags: [String],
    reviewDate: Date,
    interval: Number,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
)

module.exports = model(DOCUMENT_NAME, flcardSchema)
