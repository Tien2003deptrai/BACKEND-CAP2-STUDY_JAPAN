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
  },

  getKanjiById: async (id) => {
    const kanji = await kanjiModel.findById(id).lean()
    if (!kanji) throw new Error(`Kanji with id ${id} not found`)
    return kanji
  },

  getKanjiByOnyomiOrKunyomi: (onyomi, kunyomi) => {
    return kanjiModel
      .find({
        $or: [{ onyomi: { $in: onyomi } }, { kunyomi: { $in: kunyomi } }]
      })
      .lean()
  }
}

module.exports = KanjiRepo
