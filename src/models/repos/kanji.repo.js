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
  },

  // new
  getNextKanjiByStrokeNum: async (strokeNum) => {
    // Giả sử Kanji có thuộc tính stroke_num để xác định thứ tự
    const nextKanji = await kanjiModel
      .findOne({ stroke_num: { $gt: strokeNum } }) // Lấy Kanji có stroke_num lớn hơn
      .sort({ stroke_num: 1 }) // Sắp xếp theo thứ tự tăng dần
      .lean()

    return nextKanji
  }
}

module.exports = KanjiRepo
