const mongoose = require('../config/db') // Import Mongoose đã kết nối từ config/db.js

const db = {}
db.mongoose = mongoose

db.user = require('./user.model')
db.course = require('./course.model')
db.lesson = require('./lesson.model')
db.vocabulary = require('./vocabulary.model')
db.grammar = require('./grammar.model')
db.kanji = require('./kanji.model')
db.deck = require('./deck.model')
db.flashcard = require('./flashcard.model')
db.exams = require('./exams.model')
db.progression = require('./progression.model')
db.notification = require('./notification.model')
db.hina = require('./hina.model')
db.renshuu = require('./renshuu.model')

console.log('📌 DB Models Loaded:', Object.keys(db))

module.exports = db // Xuất models để dùng trong toàn bộ ứng dụng
