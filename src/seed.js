'use strict'

const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')
const slugify = require('slugify')

// Import Models
const User = require('./models/user.model')
const Role = require('./models/role.model')
const Course = require('./models/course.model')
const Lesson = require('./models/lesson.model')
const Vocabulary = require('./models/vocabulary.model')
const Kanji = require('./models/kanji.model')
const Grammar = require('./models/grammar.model')
const Deck = require('./models/deck.model')
const Flashcard = require('./models/flashcard.model')
const Exam = require('./models/exams.model')
const Progression = require('./models/progression.model')
const Notification = require('./models/notification.model')
const Resource = require('./models/resource.model')
const KeyToken = require('./models/keytoken.model')
const OtpLog = require('./models/otp.model')

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/japanese_learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const seedDatabase = async () => {
  try {
    // Xóa toàn bộ dữ liệu cũ
    await mongoose.connection.dropDatabase();

    // Tạo dữ liệu cho Resource
    const resources = await Resource.create([
      { src_name: 'Tài nguyên 1', src_slug: 'tai-nguyen-1', src_description: 'Mô tả tài nguyên 1' },
      { src_name: 'Tài nguyên 2', src_slug: 'tai-nguyen-2', src_description: 'Mô tả tài nguyên 2' },
    ]);

    // Tạo dữ liệu cho Role
    const roles = await Role.create([
      { rol_name: 'user', rol_slug: 'user', rol_status: 'active', rol_description: 'Người dùng thông thường', rol_grants: [{ resource: resources[0]._id, actions: ['read'], attributes: '*' }] },
      { rol_name: 'admin', rol_slug: 'admin', rol_status: 'active', rol_description: 'Quản trị viên', rol_grants: [{ resource: resources[1]._id, actions: ['read', 'write'], attributes: '*' }] },
    ]);

    // Tạo dữ liệu cho User
    const users = await User.create([
      { name: 'Người dùng 1', email: 'user1@example.com', password: 'password1', status: 'active', date_of_birth: new Date('1990-01-01'), sex: 1, avatar: 'avatar1.jpg', roles: roles[0]._id, phone: '0123456789' },
      { name: 'Người dùng 2', email: 'user2@example.com', password: 'password2', status: 'active', date_of_birth: new Date('1995-05-05'), sex: 0, avatar: 'avatar2.jpg', roles: roles[1]._id, phone: '0987654321' },
    ]);

    // Tạo dữ liệu cho KeyToken
    const keyTokens = await KeyToken.create([
      { user: users[0]._id, privateKey: 'privateKey1', publicKey: 'publicKey1', refreshTokensUsed: [], refreshToken: 'refreshToken1' },
      { user: users[1]._id, privateKey: 'privateKey2', publicKey: 'publicKey2', refreshTokensUsed: [], refreshToken: 'refreshToken2' },
    ]);

    // Tạo dữ liệu cho Course
    const courses = await Course.create([
      { name: 'Khóa học 1', thumb: 'thumb1.jpg', user: users[0]._id, course_slug: 'khoa-hoc-1', type: 'online', author: 'Tác giả 1', stu_num: 10 },
      { name: 'Khóa học 2', thumb: 'thumb2.jpg', user: users[1]._id, course_slug: 'khoa-hoc-2', type: 'offline', author: 'Tác giả 2', stu_num: 20 },
    ]);

    // Tạo dữ liệu cho Lesson
    const lessons = await Lesson.create([
      { course: courses[0]._id, lesson_title: 'Bài học 1', isPublic: true, contents: { vocabulary: [], grammar: [], kaiwa: [] } },
      { course: courses[1]._id, lesson_title: 'Bài học 2', isPublic: false, contents: { vocabulary: [], grammar: [], kaiwa: [] } },
    ]);

    // Tạo dữ liệu cho Vocabulary
    const vocabularies = await Vocabulary.create([
      { lesson: lessons[0]._id, word: 'Từ vựng 1', kanji: '漢字1', kana: 'かな1', hex_string: [], meaning: 'Nghĩa 1', audio: 'audio1.mp3', example: 'Ví dụ 1', tags: 'tag1', notes: 'Ghi chú 1' },
      { lesson: lessons[1]._id, word: 'Từ vựng 2', kanji: '漢字2', kana: 'かな2', hex_string: [], meaning: 'Nghĩa 2', audio: 'audio2.mp3', example: 'Ví dụ 2', tags: 'tag2', notes: 'Ghi chú 2' },
    ]);

    // Tạo dữ liệu cho Grammar
    const grammars = await Grammar.create([
      { lesson: lessons[0]._id, title: 'Ngữ pháp 1', structure: 'Cấu trúc 1', explain: 'Giải thích 1', examples: [{ ja: 'Ví dụ 1', vi: 'Ví dụ 1' }], level: 'N5', mean: 'Nghĩa 1' },
      { lesson: lessons[1]._id, title: 'Ngữ pháp 2', structure: 'Cấu trúc 2', explain: 'Giải thích 2', examples: [{ ja: 'Ví dụ 2', vi: 'Ví dụ 2' }], level: 'N4', mean: 'Nghĩa 2' },
    ]);

    // Tạo dữ liệu cho Kanji
    const kanjis = await Kanji.create([
      { kanji: '漢字1', cn_vi_word: 'Từ 1', component: ['Thành phần 1'], examples: [{ ja: 'Ví dụ 1', hira: 'ひらがな1', vi: 'Ví dụ 1' }], explain: 'Giải thích 1', jlpt: 'N5', kunyomi: ['くにょみ1'], mean: 'Nghĩa 1', onyomi: ['おにょみ1'], stroke_num: 5, svg_path: 'path1.svg', unicode: 'U+4E00' },
      { kanji: '漢字2', cn_vi_word: 'Từ 2', component: ['Thành phần 2'], examples: [{ ja: 'Ví dụ 2', hira: 'ひらがな2', vi: 'Ví dụ 2' }], explain: 'Giải thích 2', jlpt: 'N4', kunyomi: ['くにょみ2'], mean: 'Nghĩa 2', onyomi: ['おにょみ2'], stroke_num: 6, svg_path: 'path2.svg', unicode: 'U+4E01' },
    ]);

    // Tạo dữ liệu cho Deck
    const decks = await Deck.create([
      { user: users[0]._id, deck_title: 'Bộ thẻ 1' },
      { user: users[1]._id, deck_title: 'Bộ thẻ 2' },
    ]);

    // Tạo dữ liệu cho Flashcard
    const flashcards = await Flashcard.create([
      { grammar: grammars[0]._id, vocab: vocabularies[0]._id, kanji: kanjis[0]._id, deck: decks[0]._id, front: 'Mặt trước 1', back: 'Mặt sau 1', tags: ['tag1'], reviewDate: new Date(), interval: 1 },
      { grammar: grammars[1]._id, vocab: vocabularies[1]._id, kanji: kanjis[1]._id, deck: decks[1]._id, front: 'Mặt trước 2', back: 'Mặt sau 2', tags: ['tag2'], reviewDate: new Date(), interval: 2 },
    ]);

    // Tạo dữ liệu cho Exam
    const exams = await Exam.create([
      { title: 'Bài kiểm tra 1', time_limit: 60, total_points: 100, level: 'N5', isPublish: true, tags: 'tag1', contents: [{ type: 'type1', dokkai_text: 'Đọc hiểu 1', dokkai_ask: [{ content_text: 'Câu hỏi 1', value: 'Giá trị 1', quiz: ['Câu hỏi 1'], point: 10 }], content_text: 'Nội dung 1', point: 10, value: 'Giá trị 1', url_audio: 'audio1.mp3', quiz: ['Câu hỏi 1'] }] },
      { title: 'Bài kiểm tra 2', time_limit: 90, total_points: 200, level: 'N4', isPublish: false, tags: 'tag2', contents: [{ type: 'type2', dokkai_text: 'Đọc hiểu 2', dokkai_ask: [{ content_text: 'Câu hỏi 2', value: 'Giá trị 2', quiz: ['Câu hỏi 2'], point: 20 }], content_text: 'Nội dung 2', point: 20, value: 'Giá trị 2', url_audio: 'audio2.mp3', quiz: ['Câu hỏi 2'] }] },
    ]);

    // Tạo dữ liệu cho Progression
    const progressions = await Progression.create([
      { user: users[0]._id, achievements: [{ title: 'Thành tựu 1', image: 'image1.jpg' }], progress: [{ course: courses[0]._id, lessons: [lessons[0]._id], lessonType: 'Lesson' }], examsProgress: [{ exam: exams[0]._id, point: 100, note: 'Ghi chú 1' }] },
      { user: users[1]._id, achievements: [{ title: 'Thành tựu 2', image: 'image2.jpg' }], progress: [{ course: courses[1]._id, lessons: [lessons[1]._id], lessonType: 'Lesson' }], examsProgress: [{ exam: exams[1]._id, point: 200, note: 'Ghi chú 2' }] },
    ]);

    // Tạo dữ liệu cho Notification
    const notifications = await Notification.create([
      { noti_type: 'EXAM-001', noti_senderId: users[0]._id, noti_receivedId: 1, noti_content: 'Nội dung thông báo 1', noti_options: {} },
      { noti_type: 'EXAM-002', noti_senderId: users[1]._id, noti_receivedId: 2, noti_content: 'Nội dung thông báo 2', noti_options: {} },
    ]);

    // Tạo dữ liệu cho otp_log
    const otpLogs = await OtpLog.create([
      { otp_token: 'token1', otp_email: 'email1@example.com', expireAt: new Date() },
      { otp_token: 'token2', otp_email: 'email2@example.com', expireAt: new Date() },
    ]);

    console.log('Dữ liệu đã được seed thành công!');
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
