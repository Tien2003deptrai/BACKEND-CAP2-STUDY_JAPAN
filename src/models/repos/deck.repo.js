const deckModel = require('../deck.model')

const DeckRepo = {
  findDecksByType: async (type) => {
    console.log('heheh')

    return await deckModel.find({ type: type }).select('_id deck_title type').lean()
  }
}

module.exports = DeckRepo
