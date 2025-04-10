const KanjiRepo = require('../models/repos/kanji.repo')
const throwError = require('../res/throwError')
// const axios = require('axios')

// const folderPath = 'images'

const KanjiService = {
  // getSvgContent: async ({ kanji }) => {
  //   const filePath = `${folderPath}/${kanji}.svg`
  //   const file = bucket.file(filePath)

  //   const [url] = await file.getSignedUrl({
  //     action: 'read',
  //     expires: Date.now() + 1000 * 3600 * 48
  //   })

  //   try {
  //     const res = await axios.get(url)
  //     return res.data
  //   } catch (error) {
  //     throwError(`Error fetching SVG content for Kanji: ${kanji}`, error)
  //   }
  // },

  getAllKanji: async (level) => {
    const result = await KanjiRepo.getAllKanji(level.toUpperCase())
    if (!result?.kanji?.length) throwError(`No Kanji found for level ${level}`)
    return result
  },

  getAllKanjiByLevel: async (level, page) => {
    const result = await KanjiRepo.getAllKanjiByLevel(level.toUpperCase(), page)
    if (!result?.kanji?.length) throwError(`No Kanji found for level ${level}`)
    return result
  },

  addKanji: async (bodyData) => {
    const newKanji = await KanjiRepo.add(bodyData)
    if (!newKanji) throwError('Error adding new Kanji')
    return newKanji
  },

  kanjiByName: async (word) => {
    // console.log('Received word:', word)
    if (!word) throwError('Invalid kanji query parameter')
    const result = await KanjiRepo.getKanjiByCharacter(word)
    if (!result) throwError(`Kanji with word '${word}' not found`)
    return result
  },

  // New method to get Kanji by ID
  getKanjiById: async (kanji_id) => {
    const kanji = await KanjiRepo.getKanjiById(kanji_id)
    return kanji
  },

  getRelatedKanji: async (kanji_id) => {
    // Tìm Kanji hiện tại dựa trên ID
    const kanji = await KanjiRepo.getKanjiById(kanji_id)
    if (!kanji) throwError('Kanji not found')

    const relatedKanji = await KanjiRepo.getKanjiByOnyomiOrKunyomi(kanji.onyomi, kanji.kunyomi)
    return relatedKanji
  }
}

module.exports = KanjiService
