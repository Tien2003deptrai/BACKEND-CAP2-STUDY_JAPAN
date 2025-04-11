const KanjiRepo = require('../models/repos/kanji.repo')
const throwError = require('../res/throwError')
const fs = require('fs')
const path = require('path')

const KanjiService = {
  getKanjiSvgContent: async (kanji) => {
    // Lấy giá trị Unicode và chuyển thành dạng hexadecimal
    let hex = kanji.codePointAt(0).toString(16)
    hex = hex.padStart(5, '0') // Đảm bảo mã hex có đủ 5 ký tự

    const filePath = path.join(__dirname, 'kanji-data', `${hex}.svg`)

    // Kiểm tra nếu không tồn tại file SVG
    if (!fs.existsSync(filePath)) {
      throwError(`SVG for Kanji "${kanji}" not found`)
    }

    // Đọc nội dung SVG
    const svg = fs.readFileSync(filePath, 'utf-8')
    return svg
  },

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
  },

  // new
  getNextKanji: async (kanji) => {
    // 1. Tìm Kanji hiện tại
    const currentKanji = await KanjiRepo.getKanjiByCharacter(kanji)
    if (!currentKanji) throwError(`Kanji "${kanji}" not found`)

    // 2. Tìm Kanji tiếp theo trong danh sách
    // Ở đây tôi giả sử bạn có thuộc tính "stroke_num" để xác định thứ tự Kanji
    const nextKanji = await KanjiRepo.getNextKanjiByStrokeNum(currentKanji.stroke_num)
    if (!nextKanji) throwError('No next Kanji found')

    return nextKanji
  }
}

module.exports = KanjiService
