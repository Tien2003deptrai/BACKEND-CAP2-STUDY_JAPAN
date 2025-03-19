const kanjiModel = require('../kanji.model')

const KanjiRepo = {
  add: (data) => kanjiModel.create(data),

  getAllKanjiByLevel: async (level, page = 1, limit = 25) => {
    const kanjiList = await kanjiModel
      .find({ jlpt: level })
      .limit(limit)
      .skip(limit * (page - 1))
      .lean()

    const count = await kanjiModel.countDocuments({ jlpt: level })

    return { kanji: kanjiList, count }
  },

  getKanjiByCharacter: (kanji) => {
    return kanjiModel.findOne({ kanji: kanji }).lean()
  },

  getAllKanji: async (level) => {
    const kanjiList = await kanjiModel.find({ jlpt: level }).lean()
    const count = await kanjiModel.countDocuments({ jlpt: level })

    return { kanji: kanjiList, count }
  }
}

module.exports = KanjiRepo
