const kanjiModel = require('../kanji.model')

const KanjiRepo = {
  add: (data) => kanjiModel.create(data),

  getByLevel: async (level, page = 1, limit = 25) => {
    const kanjiList = await kanjiModel
      .find({ jlpt: level })
      .limit(limit)
      .skip(limit * (page - 1))
      .lean()

    const count = await kanjiModel.countDocuments({ jlpt: level })

    return { kanji: kanjiList, count }
  },

  findByCharacter: (kanji) => kanjiModel.findOne({ kanji }).lean(),

  getAllByLevel: async (level) => {
    const kanjiList = await kanjiModel.find({ jlpt: level }).lean()
    const count = await kanjiModel.countDocuments({ jlpt: level })

    return { kanji: kanjiList, count }
  }
}

module.exports = KanjiRepo
