const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Deck'
const COLLECTION_NAME = 'Decks'

const deckSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    deck_title: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['grammar', 'vocabulary']
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

module.exports = model(DOCUMENT_NAME, deckSchema)
