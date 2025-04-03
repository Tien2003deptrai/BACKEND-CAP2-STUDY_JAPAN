'use strict'

const mongoose = require('mongoose')
// Import Models
const User = require('../models/user.model')
const Course = require('../models/course.model')
const Lesson = require('../models/lesson.model')
const Vocabulary = require('../models/vocabulary.model')
const Kanji = require('../models/kanji.model')
const Grammar = require('../models/grammar.model')
const Deck = require('../models/deck.model')
const Flashcard = require('../models/flashcard.model')
const Exam = require('../models/exams.model')
const Progression = require('../models/progression.model')
const Notification = require('../models/notification.model')
const Hina = require('../models/hina.model')
const Renshuu = require('../models/renshuu.model')
const Enrollment = require('../models/enrollment.model')
const Result = require('../models/result.model')

const bcrypt = require('bcrypt')

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/japanese_learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

// Dữ liệu seed giả (copy từ các mảng mình đã gửi)
const createSeedData = async () => {
  const users = [
    {
      _id: '605c72ef5f5b2c1d4c8e1001',
      name: 'Nguyen Van An',
      email: 'nguyen.an@example.com',
      password: await hashPassword('admin123'),
      status: 'active',
      date_of_birth: new Date('1990-01-15'),
      sex: 1,
      avatar: 'https://example.com/avatars/an.jpg',
      roles: 'admin',
      phone: '0901234567'
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1002',
      name: 'Tran Thi Bich',
      email: 'tran.bich@example.com',
      password: await hashPassword('teacher123'),
      status: 'pending',
      date_of_birth: new Date('1995-06-20'),
      sex: 0,
      avatar: '',
      roles: 'teacher',
      phone: '0912345678'
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1003',
      name: 'Le Van Cuong',
      email: 'le.cuong@example.com',
      password: await hashPassword('student123'),
      status: 'block',
      date_of_birth: new Date('1988-03-10'),
      sex: 1,
      avatar: '',
      roles: 'student',
      phone: '0923456789'
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1004',
      name: 'Pham Thi Dung',
      email: 'pham.dung@example.com',
      password: 'hashed_password_101',
      status: 'active',
      date_of_birth: new Date('1992-11-25'),
      sex: 0,
      avatar: 'https://example.com/avatars/dung.jpg',
      roles: 'teacher',
      phone: '0934567890'
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1005',
      name: 'Hoang Van Em',
      email: 'hoang.em@example.com',
      password: 'hashed_password_202',
      status: 'pending',
      date_of_birth: new Date('1993-07-12'),
      sex: 1,
      avatar: '',
      roles: 'student',
      phone: '0945678901'
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1006',
      name: 'Vu Thi Phuong',
      email: 'vu.phuong@example.com',
      password: 'hashed_password_303',
      status: 'active',
      date_of_birth: new Date('1991-09-30'),
      sex: 0,
      avatar: 'https://example.com/avatars/phuong.jpg',
      roles: 'admin',
      phone: '0956789012'
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1007',
      name: 'Do Van Giang',
      email: 'do.giang@example.com',
      password: 'hashed_password_404',
      status: 'pending',
      date_of_birth: new Date('1989-04-05'),
      sex: 1,
      avatar: '',
      roles: 'teacher',
      phone: '0967890123'
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1008',
      name: 'Bui Thi Hoa',
      email: 'bui.hoa@example.com',
      password: 'hashed_password_505',
      status: 'active',
      date_of_birth: new Date('1996-12-15'),
      sex: 0,
      avatar: 'https://example.com/avatars/hoa.jpg',
      roles: 'student',
      phone: '0978901234'
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1009',
      name: 'Dang Van Khanh',
      email: 'dang.khanh@example.com',
      password: 'hashed_password_606',
      status: 'block',
      date_of_birth: new Date('1987-08-22'),
      sex: 1,
      avatar: '',
      roles: 'admin',
      phone: '0989012345'
    },
    {
      _id: '605c72ef5f5b2c1d4c8e100a',
      name: 'Ngo Thi Linh',
      email: 'ngo.linh@example.com',
      password: 'hashed_password_707',
      status: 'active',
      date_of_birth: new Date('1994-02-28'),
      sex: 0,
      avatar: 'https://example.com/avatars/linh.jpg',
      roles: 'teacher',
      phone: '0990123456'
    }
  ]
  return users
}

const courses = [
  {
    _id: '605c72ef5f5b2c1d4c8e2001',
    name: '日本語初級コース',
    thumb: 'https://example.com/thumbs/nihongo1.jpg',
    user: '605c72ef5f5b2c1d4c8e1001',
    course_slug: 'nihongo-shokyu-kosu',
    type: 'Beginner',
    author: 'Tanaka Hiroshi',
    stu_num: 25
  },
  {
    _id: '605c72ef5f5b2c1d4c8e2002',
    name: '漢字マスターN5',
    thumb: 'https://example.com/thumbs/kanji_n5.jpg',
    user: '605c72ef5f5b2c1d4c8e1002',
    course_slug: 'kanji-masuta-n5',
    type: 'Kanji',
    author: 'Yamada Aiko',
    stu_num: 15
  },
  {
    _id: '605c72ef5f5b2c1d4c8e2003',
    name: '会話練習中級',
    thumb: 'https://example.com/thumbs/kaiwa.jpg',
    user: '605c72ef5f5b2c1d4c8e1003',
    course_slug: 'kaiwa-renshu-chukyu',
    type: 'Conversation',
    author: 'Sato Kenji',
    stu_num: 10
  },
  {
    _id: '605c72ef5f5b2c1d4c8e2004',
    name: '文法N4基礎',
    thumb: 'https://example.com/thumbs/bunpo_n4.jpg',
    user: '605c72ef5f5b2c1d4c8e1004',
    course_slug: 'bunpo-n4-kiso',
    type: 'Grammar',
    author: 'Nakamura Yumi',
    stu_num: 20
  },
  {
    _id: '605c72ef5f5b2c1d4c8e2005',
    name: '日本語中級コース',
    thumb: 'https://example.com/thumbs/nihongo2.jpg',
    user: '605c72ef5f5b2c1d4c8e1005',
    course_slug: 'nihongo-chukyu-kosu',
    type: 'Intermediate',
    author: 'Kobayashi Taro',
    stu_num: 18
  },
  {
    _id: '605c72ef5f5b2c1d4c8e2006',
    name: '漢字マスターN3',
    thumb: 'https://example.com/thumbs/kanji_n3.jpg',
    user: '605c72ef5f5b2c1d4c8e1006',
    course_slug: 'kanji-masuta-n3',
    type: 'Kanji',
    author: 'Suzuki Mika',
    stu_num: 12
  },
  {
    _id: '605c72ef5f5b2c1d4c8e2007',
    name: '会話練習初級',
    thumb: 'https://example.com/thumbs/kaiwa2.jpg',
    user: '605c72ef5f5b2c1d4c8e1007',
    course_slug: 'kaiwa-renshu-shokyu',
    type: 'Conversation',
    author: 'Ito Daichi',
    stu_num: 8
  },
  {
    _id: '605c72ef5f5b2c1d4c8e2008',
    name: '文法N5入門',
    thumb: 'https://example.com/thumbs/bunpo_n5.jpg',
    user: '605c72ef5f5b2c1d4c8e1008',
    course_slug: 'bunpo-n5-nyumon',
    type: 'Grammar',
    author: 'Watanabe Rina',
    stu_num: 22
  },
  {
    _id: '605c72ef5f5b2c1d4c8e2009',
    name: '日本語上級コース',
    thumb: 'https://example.com/thumbs/nihongo3.jpg',
    user: '605c72ef5f5b2c1d4c8e1009',
    course_slug: 'nihongo-jokyu-kosu',
    type: 'Advanced',
    author: 'Takahashi Sho',
    stu_num: 5
  },
  {
    _id: '605c72ef5f5b2c1d4c8e200a',
    name: '漢字マスターN2',
    thumb: 'https://example.com/thumbs/kanji_n2.jpg',
    user: '605c72ef5f5b2c1d4c8e100a',
    course_slug: 'kanji-masuta-n2',
    type: 'Kanji',
    author: 'Fujita Emi',
    stu_num: 14
  }
]

const lessons = [
  {
    _id: '605c72ef5f5b2c1d4c8e5001',
    course: '605c72ef5f5b2c1d4c8e2001',
    lesson_id: 'L1',
    lesson_title: 'Giới thiệu về tiếng Nhật',
    video_url: 'https://www.youtube.com/watch?v=FkESMTeT9As',
    description: 'Bài học giới thiệu về tiếng Nhật.',
    status: 'published',
    index: 1,
    contents: {
      vocabulary: ['605c72ef5f5b2c1d4c8e7001'],
      grammar: ['605c72ef5f5b2c1d4c8e8001'],
      kaiwa: ['こんにちは。']
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8e5002',
    course: '605c72ef5f5b2c1d4c8e2002',
    lesson_id: 'L2',
    lesson_title: 'Học bảng chữ cái Hiragana',
    video_url: 'https://www.youtube.com/watch?v=FkESMTeT9As',
    description: 'Bài học về bảng chữ cái Hiragana.',
    status: 'published',
    index: 1,
    contents: {
      vocabulary: ['605c72ef5f5b2c1d4c8e7002'],
      grammar: ['605c72ef5f5b2c1d4c8e8002'],
      kaiwa: ['ありがとうございます。']
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8e5003',
    course: '605c72ef5f5b2c1d4c8e2003',
    lesson_id: 'L3',
    lesson_title: 'Học bảng chữ cái Katakana',
    video_url: 'https://www.youtube.com/watch?v=FkESMTeT9As',
    description: 'Bài học về bảng chữ cái Katakana.',
    status: 'published',
    index: 1,
    contents: {
      vocabulary: ['605c72ef5f5b2c1d4c8e7003'],
      grammar: ['605c72ef5f5b2c1d4c8e8003'],
      kaiwa: ['さようなら。']
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8e5004',
    course: '605c72ef5f5b2c1d4c8e2004',
    lesson_id: 'L4',
    lesson_title: 'Ngữ pháp cơ bản',
    video_url: 'https://www.youtube.com/watch?v=FkESMTeT9As',
    description: 'Bài học ngữ pháp cơ bản.',
    status: 'draft',
    index: 1,
    contents: {
      vocabulary: ['605c72ef5f5b2c1d4c8e7004'],
      grammar: ['605c72ef5f5b2c1d4c8e8004'],
      kaiwa: ['おはようございます。']
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8e5005',
    course: '605c72ef5f5b2c1d4c8e2005',
    lesson_id: 'L5',
    lesson_title: '日常会話',
    video_url: 'https://www.youtube.com/watch?v=FkESMTeT9As',
    description: 'Hội thoại trong cuộc sống hàng ngày.',
    status: 'published',
    index: 1,
    contents: {
      vocabulary: ['605c72ef5f5b2c1d4c8e7005'],
      grammar: ['605c72ef5f5b2c1d4c8e8004'],
      kaiwa: ['おはようございます。']
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8e5006',
    course: '605c72ef5f5b2c1d4c8e2006',
    lesson_id: 'L6',
    lesson_title: '漢字の読み方',
    video_url: 'https://www.youtube.com/watch?v=FkESMTeT9As',
    description: 'Học cách đọc chữ Hán đúng cách.',
    status: 'draft',
    index: 1,
    contents: {
      vocabulary: ['605c72ef5f5b2c1d4c8e7006'],
      grammar: [],
      kaiwa: []
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8e5007',
    course: '605c72ef5f5b2c1d4c8e2007',
    lesson_id: 'L7',
    lesson_title: 'レストランで',
    video_url: 'https://www.youtube.com/watch?v=FkESMTeT9As',
    description: 'Tiếng Nhật giao tiếp khi ở nhà hàng.',
    status: 'published',
    index: 1,
    contents: {
      vocabulary: ['605c72ef5f5b2c1d4c8e7007'],
      grammar: ['605c72ef5f5b2c1d4c8e8005'],
      kaiwa: ['メニューをください。']
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8e5008',
    course: '605c72ef5f5b2c1d4c8e2008',
    lesson_id: 'L8',
    lesson_title: '助詞の使い方',
    video_url: 'https://www.youtube.com/watch?v=FkESMTeT9As',
    description: 'Cách sử dụng các trợ từ trong tiếng Nhật.',
    status: 'draft',
    index: 1,
    contents: {
      vocabulary: ['605c72ef5f5b2c1d4c8e7008'],
      grammar: ['605c72ef5f5b2c1d4c8e8006'],
      kaiwa: []
    }
  }
]

const vocabularies = [
  {
    _id: '605c72ef5f5b2c1d4c8e7001',
    lesson: '605c72ef5f5b2c1d4c8e5001',
    word: 'こんにちは',
    kanji: '',
    kana: 'こんにちは',
    hex_string: [],
    meaning: 'Xin chào',
    audio: 'https://example.com/audio/konnichiwa.mp3',
    example: 'こんにちは、お元気ですか？',
    tags: 'greetings',
    notes: ''
  },
  {
    _id: '605c72ef5f5b2c1d4c8e7002',
    lesson: '605c72ef5f5b2c1d4c8e5002',
    word: '山',
    kanji: '山',
    kana: 'やま',
    hex_string: ['5C71'],
    meaning: 'Núi',
    audio: 'https://example.com/audio/yama.mp3',
    example: '山が高いです。',
    tags: 'nature',
    notes: '漢字基本'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e7003',
    lesson: '605c72ef5f5b2c1d4c8e5003',
    word: 'はじめまして',
    kanji: '',
    kana: 'はじめまして',
    hex_string: [],
    meaning: 'Rất vui được gặp bạn',
    audio: 'https://example.com/audio/hajimemashite.mp3',
    example: 'はじめまして、私は佐藤です。',
    tags: 'greetings',
    notes: ''
  },
  {
    _id: '605c72ef5f5b2c1d4c8e7004',
    lesson: '605c72ef5f5b2c1d4c8e5004',
    word: '行く',
    kanji: '行く',
    kana: 'いく',
    hex_string: ['884C'],
    meaning: 'Đi',
    audio: 'https://example.com/audio/iku.mp3',
    example: '学校に行きます。',
    tags: 'verb',
    notes: 'Động từ nhóm 1'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e7005',
    lesson: '605c72ef5f5b2c1d4c8e5005',
    word: 'おはよう',
    kanji: '',
    kana: 'おはよう',
    hex_string: [],
    meaning: 'Chào buổi sáng',
    audio: 'https://example.com/audio/ohayou.mp3',
    example: 'おはようございます。',
    tags: 'greetings',
    notes: ''
  },
  {
    _id: '605c72ef5f5b2c1d4c8e7006',
    lesson: '605c72ef5f5b2c1d4c8e5006',
    word: '川',
    kanji: '川',
    kana: 'かわ',
    hex_string: ['5DDD'],
    meaning: 'Sông',
    audio: 'https://example.com/audio/kawa.mp3',
    example: '川がきれいです。',
    tags: 'nature',
    notes: '漢字基本'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e7007',
    lesson: '605c72ef5f5b2c1d4c8e5007',
    word: 'メニュー',
    kanji: '',
    kana: 'メニュー',
    hex_string: [],
    meaning: 'Thực đơn',
    audio: 'https://example.com/audio/menyu.mp3',
    example: 'メニューをください。',
    tags: 'food',
    notes: ''
  },
  {
    _id: '605c72ef5f5b2c1d4c8e7008',
    lesson: '605c72ef5f5b2c1d4c8e5008',
    word: '学校',
    kanji: '学校',
    kana: 'がっこう',
    hex_string: ['5B66', '6821'],
    meaning: 'Trường học',
    audio: 'https://example.com/audio/gakkou.mp3',
    example: '学校に行きます。',
    tags: 'place',
    notes: ''
  },
  {
    _id: '605c72ef5f5b2c1d4c8e7009',
    lesson: '605c72ef5f5b2c1d4c8e5009',
    word: '会社',
    kanji: '会社',
    kana: 'かいしゃ',
    hex_string: ['4F1A', '793E'],
    meaning: 'Công ty',
    audio: 'https://example.com/audio/kaisha.mp3',
    example: '会社で働きます。',
    tags: 'business',
    notes: ''
  },
  {
    _id: '605c72ef5f5b2c1d4c8e700a',
    lesson: '605c72ef5f5b2c1d4c8e500a',
    word: '木',
    kanji: '木',
    kana: 'き',
    hex_string: ['6728'],
    meaning: 'Cây',
    audio: 'https://example.com/audio/ki.mp3',
    example: '木が大きいです。',
    tags: 'nature',
    notes: '漢字基本'
  }
]

const grammars = [
  {
    _id: '605c72ef5f5b2c1d4c8e8001',
    lesson: '605c72ef5f5b2c1d4c8e5001',
    title: 'です',
    structure: 'N + です',
    explain: 'Dùng để khẳng định hoặc lịch sự hóa câu.',
    examples: [{ ja: 'これは本です。', vi: 'Đây là sách.' }],
    level: 'N5',
    mean: 'Là'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e8002',
    lesson: '605c72ef5f5b2c1d4c8e5003',
    title: 'は',
    structure: 'N1 + は + N2 + です',
    explain: 'Dùng để giới thiệu chủ đề.',
    examples: [{ ja: '私は佐藤です。', vi: 'Tôi là Sato.' }],
    level: 'N5',
    mean: 'Chủ đề'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e8003',
    lesson: '605c72ef5f5b2c1d4c8e5004',
    title: 'ます',
    structure: 'V-masu',
    explain: 'Dạng lịch sự của động từ.',
    examples: [{ ja: '行きます。', vi: 'Tôi đi.' }],
    level: 'N5',
    mean: 'Lịch sự'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e8004',
    lesson: '605c72ef5f5b2c1d4c8e5005',
    title: 'ございます',
    structure: 'N + ございます',
    explain: 'Dạng kính ngữ của あります.',
    examples: [{ ja: 'おはようございます。', vi: 'Chào buổi sáng.' }],
    level: 'N4',
    mean: 'Có (kính ngữ)'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e8005',
    lesson: '605c72ef5f5b2c1d4c8e5007',
    title: 'を',
    structure: 'N + を + V',
    explain: 'Đánh dấu tân ngữ trực tiếp.',
    examples: [{ ja: 'メニューをください。', vi: 'Cho tôi thực đơn.' }],
    level: 'N5',
    mean: 'Tân ngữ'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e8006',
    lesson: '605c72ef5f5b2c1d4c8e5008',
    title: 'に',
    structure: 'N + に + V',
    explain: 'Chỉ đích đến của hành động.',
    examples: [{ ja: '学校に行きます。', vi: 'Tôi đi đến trường.' }],
    level: 'N5',
    mean: 'Đích đến'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e8007',
    lesson: '605c72ef5f5b2c1d4c8e5009',
    title: 'で',
    structure: 'N + で + V',
    explain: 'Chỉ địa điểm diễn ra hành động.',
    examples: [{ ja: '会社で働きます。', vi: 'Tôi làm việc ở công ty.' }],
    level: 'N5',
    mean: 'Địa điểm'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e8008',
    lesson: '605c72ef5f5b2c1d4c8e5001',
    title: 'か',
    structure: 'Câu + か',
    explain: 'Dùng để đặt câu hỏi.',
    examples: [{ ja: 'お元気ですか？', vi: 'Bạn khỏe không?' }],
    level: 'N5',
    mean: 'Câu hỏi'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e8009',
    lesson: '605c72ef5f5b2c1d4c8e5003',
    title: 'ね',
    structure: 'Câu + ね',
    explain: 'Dùng để nhấn mạnh hoặc xác nhận.',
    examples: [{ ja: 'いい天気ですね。', vi: 'Thời tiết đẹp nhỉ.' }],
    level: 'N5',
    mean: 'Nhấn mạnh'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e800a',
    lesson: '605c72ef5f5b2c1d4c8e5005',
    title: 'よ',
    structure: 'Câu + よ',
    explain: 'Dùng để thông báo hoặc nhấn mạnh.',
    examples: [{ ja: '今日ですよ。', vi: 'Hôm nay đấy.' }],
    level: 'N5',
    mean: 'Thông báo'
  }
]

const kanjis = [
  {
    _id: '605c72ef5f5b2c1d4c8e9001',
    kanji: '山',
    cn_vi_word: 'Sơn',
    component: ['丨', '凵'],
    examples: [{ ja: '山が高い', hira: 'やまがたかい', vi: 'Núi cao' }],
    explain: 'Chỉ núi',
    jlpt: 'N5',
    kunyomi: ['やま'],
    mean: 'Núi',
    onyomi: ['サン'],
    stroke_num: 3,
    svg_path: 'path/to/svg',
    unicode: '5C71'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e9002',
    kanji: '川',
    cn_vi_word: 'Xuyên',
    component: ['丿', '丨'],
    examples: [{ ja: '川がきれい', hira: 'かわがきれい', vi: 'Sông đẹp' }],
    explain: 'Chỉ sông',
    jlpt: 'N5',
    kunyomi: ['かわ'],
    mean: 'Sông',
    onyomi: ['セン'],
    stroke_num: 3,
    svg_path: 'path/to/svg',
    unicode: '5DDD'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e9003',
    kanji: '木',
    cn_vi_word: 'Mộc',
    component: ['十', '丨'],
    examples: [{ ja: '木が大きい', hira: 'きがおおきい', vi: 'Cây lớn' }],
    explain: 'Chỉ cây',
    jlpt: 'N5',
    kunyomi: ['き'],
    mean: 'Cây',
    onyomi: ['モク'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: '6728'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e9004',
    kanji: '学校',
    cn_vi_word: 'Học hiệu',
    component: ['学', '校'],
    examples: [{ ja: '学校に行く', hira: 'がっこうにいく', vi: 'Đi đến trường' }],
    explain: 'Chỉ trường học',
    jlpt: 'N4',
    kunyomi: [],
    mean: 'Trường học',
    onyomi: ['ガッコウ'],
    stroke_num: 10,
    svg_path: 'path/to/svg',
    unicode: '5B66 6821'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e9005',
    kanji: '会社',
    cn_vi_word: 'Hội xã',
    component: ['会', '社'],
    examples: [
      {
        ja: '会社で働く',
        hira: 'かいしゃではたらく',
        vi: 'Làm việc ở công ty'
      }
    ],
    explain: 'Chỉ công ty',
    jlpt: 'N4',
    kunyomi: [],
    mean: 'Công ty',
    onyomi: ['カイシャ'],
    stroke_num: 11,
    svg_path: 'path/to/svg',
    unicode: '4F1A 793E'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e9006',
    kanji: '人',
    cn_vi_word: 'Nhân',
    component: ['丿', '乀'],
    examples: [{ ja: '人が多い', hira: 'ひとがおおい', vi: 'Có nhiều người' }],
    explain: 'Chỉ người',
    jlpt: 'N5',
    kunyomi: ['ひと'],
    mean: 'Người',
    onyomi: ['ジン'],
    stroke_num: 2,
    svg_path: 'path/to/svg',
    unicode: '4EBA'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e9007',
    kanji: '日',
    cn_vi_word: 'Nhật',
    component: ['口', '一'],
    examples: [{ ja: '日が昇る', hira: 'ひがのぼる', vi: 'Mặt trời mọc' }],
    explain: 'Chỉ ngày/mặt trời',
    jlpt: 'N5',
    kunyomi: ['ひ'],
    mean: 'Ngày',
    onyomi: ['ニチ'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: '65E5'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e9008',
    kanji: '月',
    cn_vi_word: 'Nguyệt',
    component: ['冂', '二'],
    examples: [{ ja: '月がきれい', hira: 'つきがきれい', vi: 'Mặt trăng đẹp' }],
    explain: 'Chỉ tháng/mặt trăng',
    jlpt: 'N5',
    kunyomi: ['つき'],
    mean: 'Tháng',
    onyomi: ['ゲツ'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: '6708'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e9009',
    kanji: '水',
    cn_vi_word: 'Thủy',
    component: ['丶', '亅'],
    examples: [{ ja: '水が冷たい', hira: 'みずがつめたい', vi: 'Nước lạnh' }],
    explain: 'Chỉ nước',
    jlpt: 'N5',
    kunyomi: ['みず'],
    mean: 'Nước',
    onyomi: ['スイ'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: '6C34'
  },
  {
    _id: '605c72ef5f5b2c1d4c8e900a',
    kanji: '火',
    cn_vi_word: 'Hỏa',
    component: ['丷', '人'],
    examples: [{ ja: '火がつく', hira: 'ひがつく', vi: 'Lửa cháy' }],
    explain: 'Chỉ lửa',
    jlpt: 'N5',
    kunyomi: ['ひ'],
    mean: 'Lửa',
    onyomi: ['カ'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: '706B'
  }
]

const decks = [
  {
    _id: '605c72ef5f5b2c1d4c8ea001',
    user: '605c72ef5f5b2c1d4c8e1001',
    deck_title: 'N5単語',
    type: 'vocabulary'
  },
  {
    _id: '605c72ef5f5b2c1d4c8ea002',
    user: '605c72ef5f5b2c1d4c8e1002',
    deck_title: '漢字N5',
    type: 'vocabulary'
  },
  {
    _id: '605c72ef5f5b2c1d4c8ea003',
    user: '605c72ef5f5b2c1d4c8e1003',
    deck_title: '会話練習',
    type: 'grammar'
  },
  {
    _id: '605c72ef5f5b2c1d4c8ea004',
    user: '605c72ef5f5b2c1d4c8e1004',
    deck_title: '文法N4',
    type: 'grammar'
  },
  {
    _id: '605c72ef5f5b2c1d4c8ea005',
    user: '605c72ef5f5b2c1d4c8e1005',
    deck_title: '日常単語',
    type: 'vocabulary'
  },
  {
    _id: '605c72ef5f5b2c1d4c8ea006',
    user: '605c72ef5f5b2c1d4c8e1006',
    deck_title: '漢字N3',
    type: 'vocabulary'
  },
  {
    _id: '605c72ef5f5b2c1d4c8ea007',
    user: '605c72ef5f5b2c1d4c8e1007',
    deck_title: 'レストラン会話',
    type: 'grammar'
  },
  {
    _id: '605c72ef5f5b2c1d4c8ea008',
    user: '605c72ef5f5b2c1d4c8e1008',
    deck_title: 'N5文法',
    type: 'grammar'
  },
  {
    _id: '605c72ef5f5b2c1d4c8ea009',
    user: '605c72ef5f5b2c1d4c8e1009',
    deck_title: 'ビジネス単語',
    type: 'vocabulary'
  },
  {
    _id: '605c72ef5f5b2c1d4c8ea00a',
    user: '605c72ef5f5b2c1d4c8e100a',
    deck_title: '漢字N2',
    type: 'vocabulary'
  }
]

const flashcards = [
  {
    _id: '605c72ef5f5b2c1d4c8eb001',
    grammar: '605c72ef5f5b2c1d4c8e8001', // "です"
    vocab: '605c72ef5f5b2c1d4c8e7001', // Thêm "こんにちは" từ vocabularies
    kanji: null,
    deck: '605c72ef5f5b2c1d4c8ea001',
    front: 'N + です',
    back: 'Là',
    tags: ['grammar', 'N5'],
    reviewDate: new Date('2025-03-20'),
    interval: 1
  },
  {
    _id: '605c72ef5f5b2c1d4c8eb002',
    grammar: null,
    vocab: '605c72ef5f5b2c1d4c8e7002', // "山"
    kanji: '605c72ef5f5b2c1d4c8e9001', // "山"
    deck: '605c72ef5f5b2c1d4c8ea002',
    front: '山',
    back: 'Núi',
    tags: ['kanji', 'N5'],
    reviewDate: new Date('2025-03-21'),
    interval: 2
  },
  {
    _id: '605c72ef5f5b2c1d4c8eb003',
    grammar: null,
    vocab: '605c72ef5f5b2c1d4c8e7003', // "はじめまして"
    kanji: null,
    deck: '605c72ef5f5b2c1d4c8ea003',
    front: 'はじめまして',
    back: 'Rất vui được gặp bạn',
    tags: ['vocab', 'greetings'],
    reviewDate: new Date('2025-03-22'),
    interval: 1
  },
  {
    _id: '605c72ef5f5b2c1d4c8eb004',
    grammar: '605c72ef5f5b2c1d4c8e8003', // "ます"
    vocab: '605c72ef5f5b2c1d4c8e7004', // Thêm "行く" từ vocabularies
    kanji: null,
    deck: '605c72ef5f5b2c1d4c8ea004',
    front: 'V-masu',
    back: 'Lịch sự',
    tags: ['grammar', 'N5'],
    reviewDate: new Date('2025-03-23'),
    interval: 3
  },
  {
    _id: '605c72ef5f5b2c1d4c8eb005',
    grammar: null,
    vocab: '605c72ef5f5b2c1d4c8e7005', // "おはよう"
    kanji: null,
    deck: '605c72ef5f5b2c1d4c8ea005',
    front: 'おはよう',
    back: 'Chào buổi sáng',
    tags: ['vocab', 'greetings'],
    reviewDate: new Date('2025-03-24'),
    interval: 1
  },
  {
    _id: '605c72ef5f5b2c1d4c8eb006',
    grammar: null,
    vocab: '605c72ef5f5b2c1d4c8e7006', // "川"
    kanji: '605c72ef5f5b2c1d4c8e9002', // "川"
    deck: '605c72ef5f5b2c1d4c8ea006',
    front: '川',
    back: 'Sông',
    tags: ['kanji', 'N5'],
    reviewDate: new Date('2025-03-25'),
    interval: 2
  },
  {
    _id: '605c72ef5f5b2c1d4c8eb007',
    grammar: '605c72ef5f5b2c1d4c8e8005', // "を"
    vocab: '605c72ef5f5b2c1d4c8e7007', // "メニュー"
    kanji: null,
    deck: '605c72ef5f5b2c1d4c8ea007',
    front: 'メニューをください',
    back: 'Cho tôi thực đơn',
    tags: ['grammar', 'vocab'],
    reviewDate: new Date('2025-03-26'),
    interval: 1
  },
  {
    _id: '605c72ef5f5b2c1d4c8eb008',
    grammar: '605c72ef5f5b2c1d4c8e8006', // "に"
    vocab: '605c72ef5f5b2c1d4c8e7008', // "学校"
    kanji: '605c72ef5f5b2c1d4c8e9004', // "学校"
    deck: '605c72ef5f5b2c1d4c8ea008',
    front: '学校に行きます',
    back: 'Đi đến trường',
    tags: ['grammar', 'vocab'],
    reviewDate: new Date('2025-03-27'),
    interval: 2
  },
  {
    _id: '605c72ef5f5b2c1d4c8eb009',
    grammar: '605c72ef5f5b2c1d4c8e8007', // "で"
    vocab: '605c72ef5f5b2c1d4c8e7009', // "会社"
    kanji: '605c72ef5f5b2c1d4c8e9005', // "会社"
    deck: '605c72ef5f5b2c1d4c8ea009',
    front: '会社で働きます',
    back: 'Làm việc ở công ty',
    tags: ['grammar', 'vocab'],
    reviewDate: new Date('2025-03-28'),
    interval: 3
  },
  {
    _id: '605c72ef5f5b2c1d4c8eb00a',
    grammar: null,
    vocab: '605c72ef5f5b2c1d4c8e700a', // "木"
    kanji: '605c72ef5f5b2c1d4c8e9003', // "木"
    deck: '605c72ef5f5b2c1d4c8ea00a',
    front: '木',
    back: 'Cây',
    tags: ['kanji', 'N5'],
    reviewDate: new Date('2025-03-20'),
    interval: 2
  }
]

const exams = [
  {
    _id: '605c72ef5f5b2c1d4c8ec001',
    title: 'N5模擬試験1',
    description: 'Bài kiểm tra mô phỏng JLPT N5 đầu tiên',
    time_limit: 60,
    total_points: 100,
    level: 'N5',
    sections: [
      {
        title: 'Phần nghe',
        description: 'Kiểm tra khả năng nghe hiểu',
        type: 'listening'
      },
      {
        title: 'Phần đọc',
        description: 'Kiểm tra khả năng đọc hiểu',
        type: 'reading'
      }
    ],
    creator: '605c72ef5f5b2c1d4c8e1001',
    isPublished: true,
    tags: ['mock', 'N5', 'beginner'],
    questions: [
      {
        id: 'q001',
        type: 'listening',
        content: 'Nghe đoạn hội thoại và chọn câu trả lời đúng',
        instruction: 'Hãy nghe đoạn hội thoại và chọn câu trả lời đúng',
        mediaUrl: 'https://example.com/audio/exam1.mp3',
        options: [
          { id: 'a', text: 'Xin chào' },
          { id: 'b', text: 'Tạm biệt' },
          { id: 'c', text: 'Cảm ơn' },
          { id: 'd', text: 'Xin lỗi' }
        ],
        correctAnswer: 'a',
        point: 10
      },
      {
        id: 'q002',
        type: 'multiple_choice',
        content: 'こんにちは nghĩa là gì?',
        options: [
          { id: 'a', text: 'Xin chào' },
          { id: 'b', text: 'Tạm biệt' },
          { id: 'c', text: 'Cảm ơn' },
          { id: 'd', text: 'Xin lỗi' }
        ],
        correctAnswer: 'a',
        point: 10
      },
      {
        id: 'q003',
        type: 'fill_in',
        content: 'Hoàn thành câu: わたしは＿＿＿です。',
        correctAnswer: 'がくせい',
        point: 15
      }
    ],
    difficultyLevel: 'beginner',
    passingScore: 60,
    allowedAttempts: 2,
    allowedTime: 60,
    visibility: 'public',
    allowedUsers: [],
    allowedGroups: [],
    startTime: new Date('2024-01-01T00:00:00Z'),
    endTime: new Date('2024-12-31T23:59:59Z'),
    settings: {
      shuffleQuestions: true,
      showResults: true,
      showAnswers: false,
      preventCopy: true,
      fullScreen: true
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ec002',
    title: '漢字N5テスト',
    description: 'Bài kiểm tra chữ Hán trình độ N5',
    time_limit: 30,
    total_points: 50,
    level: 'N5',
    sections: [
      {
        title: 'Phần đọc chữ Hán',
        description: 'Kiểm tra cách đọc chữ Hán',
        type: 'reading'
      }
    ],
    creator: '605c72ef5f5b2c1d4c8e1002',
    isPublished: false,
    tags: ['kanji', 'N5', 'beginner'],
    questions: [
      {
        id: 'q001',
        type: 'multiple_choice',
        content: '山 đọc là gì?',
        options: [
          { id: 'a', text: 'やま' },
          { id: 'b', text: 'かわ' },
          { id: 'c', text: 'もり' },
          { id: 'd', text: 'うみ' }
        ],
        correctAnswer: 'a',
        point: 5
      },
      {
        id: 'q002',
        type: 'multiple_choice',
        content: '川 đọc là gì?',
        options: [
          { id: 'a', text: 'やま' },
          { id: 'b', text: 'かわ' },
          { id: 'c', text: 'もり' },
          { id: 'd', text: 'うみ' }
        ],
        correctAnswer: 'b',
        point: 5
      }
    ],
    difficultyLevel: 'beginner',
    passingScore: 30,
    allowedAttempts: 3,
    allowedTime: 30,
    visibility: 'private',
    allowedUsers: ['605c72ef5f5b2c1d4c8e1001', '605c72ef5f5b2c1d4c8e1002'],
    allowedGroups: [],
    startTime: new Date('2024-01-01T00:00:00Z'),
    endTime: new Date('2024-12-31T23:59:59Z'),
    settings: {
      shuffleQuestions: true,
      showResults: true,
      showAnswers: true,
      preventCopy: true,
      fullScreen: false
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ec003',
    title: 'N4文法試験',
    description: 'Bài kiểm tra ngữ pháp N4',
    time_limit: 45,
    total_points: 80,
    level: 'N4',
    sections: [
      {
        title: 'Ngữ pháp cơ bản',
        description: 'Kiểm tra kiến thức ngữ pháp cơ bản N4',
        type: 'grammar'
      },
      {
        title: 'Ngữ pháp nâng cao',
        description: 'Kiểm tra kiến thức ngữ pháp nâng cao N4',
        type: 'grammar'
      }
    ],
    creator: '605c72ef5f5b2c1d4c8e1004',
    isPublished: true,
    tags: ['grammar', 'N4', 'intermediate'],
    questions: [
      {
        id: 'q001',
        type: 'multiple_choice',
        content: '＿＿＿ とても きれいです。',
        instruction: 'Chọn trợ từ thích hợp điền vào chỗ trống',
        options: [
          { id: 'a', text: 'が' },
          { id: 'b', text: 'に' },
          { id: 'c', text: 'を' },
          { id: 'd', text: 'で' }
        ],
        correctAnswer: 'a',
        point: 10
      },
      {
        id: 'q002',
        type: 'multiple_choice',
        content: '学校＿＿＿ いきます。',
        instruction: 'Chọn trợ từ thích hợp điền vào chỗ trống',
        options: [
          { id: 'a', text: 'が' },
          { id: 'b', text: 'に' },
          { id: 'c', text: 'を' },
          { id: 'd', text: 'で' }
        ],
        correctAnswer: 'b',
        point: 10
      }
    ],
    difficultyLevel: 'intermediate',
    passingScore: 60,
    allowedAttempts: 2,
    allowedTime: 45,
    visibility: 'group',
    allowedUsers: [],
    allowedGroups: ['N4_GROUP', 'ADVANCED_GROUP'],
    startTime: new Date('2024-01-01T00:00:00Z'),
    endTime: new Date('2024-12-31T23:59:59Z'),
    settings: {
      shuffleQuestions: true,
      showResults: true,
      showAnswers: false,
      preventCopy: true,
      fullScreen: true
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ec004',
    title: '会話N5テスト',
    description: 'Bài kiểm tra hội thoại N5',
    time_limit: 20,
    total_points: 40,
    level: 'N5',
    sections: [
      {
        title: 'Hội thoại cơ bản',
        description: 'Kiểm tra khả năng giao tiếp cơ bản',
        type: 'listening'
      }
    ],
    creator: '605c72ef5f5b2c1d4c8e1002',
    isPublished: false,
    tags: ['conversation', 'N5', 'beginner'],
    questions: [
      {
        id: 'q001',
        type: 'listening',
        content: 'Nghe đoạn hội thoại và chọn câu trả lời đúng',
        mediaUrl: 'https://example.com/audio/ohayou.mp3',
        options: [
          { id: 'a', text: 'Chào buổi sáng' },
          { id: 'b', text: 'Chào buổi chiều' },
          { id: 'c', text: 'Chào buổi tối' },
          { id: 'd', text: 'Tạm biệt' }
        ],
        correctAnswer: 'a',
        point: 10
      }
    ],
    difficultyLevel: 'beginner',
    passingScore: 30,
    allowedAttempts: 2,
    allowedTime: 20,
    visibility: 'private',
    allowedUsers: ['605c72ef5f5b2c1d4c8e1001'],
    allowedGroups: [],
    startTime: new Date('2024-01-01T00:00:00Z'),
    endTime: new Date('2024-12-31T23:59:59Z'),
    settings: {
      shuffleQuestions: false,
      showResults: true,
      showAnswers: true,
      preventCopy: false,
      fullScreen: false
    }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ec005',
    title: 'N3模擬試験',
    description: 'Bài kiểm tra mô phỏng JLPT N3',
    time_limit: 90,
    total_points: 120,
    level: 'N3',
    sections: [
      {
        title: 'Ngữ pháp và Từ vựng',
        description: 'Kiểm tra ngữ pháp và từ vựng N3',
        type: 'grammar'
      },
      {
        title: 'Đọc hiểu',
        description: 'Kiểm tra kỹ năng đọc hiểu N3',
        type: 'reading'
      }
    ],
    creator: '605c72ef5f5b2c1d4c8e1004',
    isPublished: true,
    tags: ['mock', 'N3', 'intermediate'],
    questions: [
      {
        id: 'q001',
        type: 'reading',
        content: 'Đọc đoạn văn sau và trả lời câu hỏi',
        readingPassage: '川がきれいです。山も高いです。空も青いです。',
        instruction: '川はどうですか？',
        options: [
          { id: 'a', text: 'きれいです' },
          { id: 'b', text: '高いです' },
          { id: 'c', text: '青いです' },
          { id: 'd', text: '大きいです' }
        ],
        correctAnswer: 'a',
        point: 10
      }
    ],
    difficultyLevel: 'intermediate',
    passingScore: 80,
    allowedAttempts: 2,
    allowedTime: 90,
    visibility: 'public',
    allowedUsers: [],
    allowedGroups: [],
    startTime: new Date('2024-01-01T00:00:00Z'),
    endTime: new Date('2024-12-31T23:59:59Z'),
    settings: {
      shuffleQuestions: true,
      showResults: true,
      showAnswers: false,
      preventCopy: true,
      fullScreen: true
    }
  }
]

const progressions = [
  {
    _id: '605c72ef5f5b2c1d4c8ed001',
    user: '605c72ef5f5b2c1d4c8e1001',
    achievements: [{ title: 'N5合格', image: 'https://example.com/achieve/n5.jpg' }],
    progress: [
      {
        course: '605c72ef5f5b2c1d4c8e2001',
        lessons: ['605c72ef5f5b2c1d4c8e5001'],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: [{ exam: '605c72ef5f5b2c1d4c8ec001', point: 85, note: 'Good' }]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ed002',
    user: '605c72ef5f5b2c1d4c8e1002',
    achievements: [],
    progress: [
      {
        course: '605c72ef5f5b2c1d4c8e2002',
        lessons: ['605c72ef5f5b2c1d4c8e5002'],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: []
  },
  {
    _id: '605c72ef5f5b2c1d4c8ed003',
    user: '605c72ef5f5b2c1d4c8e1003',
    achievements: [],
    progress: [
      {
        course: '605c72ef5f5b2c1d4c8e2003',
        lessons: ['605c72ef5f5b2c1d4c8e5003'],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: [{ exam: '605c72ef5f5b2c1d4c8ec003', point: 70, note: 'OK' }]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ed004',
    user: '605c72ef5f5b2c1d4c8e1004',
    achievements: [{ title: 'N4合格', image: 'https://example.com/achieve/n4.jpg' }],
    progress: [
      {
        course: '605c72ef5f5b2c1d4c8e2004',
        lessons: ['605c72ef5f5b2c1d4c8e5004'],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: []
  },
  {
    _id: '605c72ef5f5b2c1d4c8ed005',
    user: '605c72ef5f5b2c1d4c8e1005',
    achievements: [],
    progress: [
      {
        course: '605c72ef5f5b2c1d4c8e2005',
        lessons: ['605c72ef5f5b2c1d4c8e5005'],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: [{ exam: '605c72ef5f5b2c1d4c8ec005', point: 90, note: 'Excellent' }]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ed006',
    user: '605c72ef5f5b2c1d4c8e1006',
    achievements: [],
    progress: [
      {
        course: '605c72ef5f5b2c1d4c8e2006',
        lessons: ['605c72ef5f5b2c1d4c8e5006'],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: []
  },
  {
    _id: '605c72ef5f5b2c1d4c8ed007',
    user: '605c72ef5f5b2c1d4c8e1007',
    achievements: [],
    progress: [
      {
        course: '605c72ef5f5b2c1d4c8e2007',
        lessons: ['605c72ef5f5b2c1d4c8e5007'],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: [{ exam: '605c72ef5f5b2c1d4c8ec007', point: 65, note: 'Need practice' }]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ed008',
    user: '605c72ef5f5b2c1d4c8e1008',
    achievements: [{ title: 'N5合格', image: 'https://example.com/achieve/n5.jpg' }],
    progress: [
      {
        course: '605c72ef5f5b2c1d4c8e2008',
        lessons: ['605c72ef5f5b2c1d4c8e5008'],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: []
  },
  {
    _id: '605c72ef5f5b2c1d4c8ed009',
    user: '605c72ef5f5b2c1d4c8e1009',
    achievements: [],
    progress: [
      {
        course: '605c72ef5f5b2c1d4c8e2009',
        lessons: ['605c72ef5f5b2c1d4c8e5009'],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: [{ exam: '605c72ef5f5b2c1d4c8ec009', point: 80, note: 'Good' }]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ed00a',
    user: '605c72ef5f5b2c1d4c8e100a',
    achievements: [],
    progress: [
      {
        course: '605c72ef5f5b2c1d4c8e200a',
        lessons: ['605c72ef5f5b2c1d4c8e500a'],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: []
  }
]

const notifications = [
  {
    _id: '605c72ef5f5b2c1d4c8ee001',
    noti_type: 'EXAM-001',
    noti_senderId: '605c72ef5f5b2c1d4c8e1001',
    noti_receivedId: '605c72ef5f5b2c1d4c8e1001', // Sửa thành ObjectId hợp lệ
    noti_content: '新しい試験「N5模擬試験1」が作成されました。',
    noti_options: { examId: '605c72ef5f5b2c1d4c8ec001' }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ee002',
    noti_type: 'COURSE-001',
    noti_senderId: '605c72ef5f5b2c1d4c8e1002',
    noti_receivedId: '605c72ef5f5b2c1d4c8e1002', // Sửa thành ObjectId hợp lệ
    noti_content: '新しいコース「漢字マスターN5」が追加されました。',
    noti_options: { courseId: '605c72ef5f5b2c1d4c8e2002' }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ee003',
    noti_type: 'EXAM-002',
    noti_senderId: '605c72ef5f5b2c1d4c8e1003',
    noti_receivedId: '605c72ef5f5b2c1d4c8e1003', // Sửa thành ObjectId hợp lệ
    noti_content: '試験「N4文法試験」の終了時間が近づきました。',
    noti_options: { examId: '605c72ef5f5b2c1d4c8ec003' }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ee004',
    noti_type: 'COURSE-001',
    noti_senderId: '605c72ef5f5b2c1d4c8e1004',
    noti_receivedId: '605c72ef5f5b2c1d4c8e1004', // Sửa thành ObjectId hợp lệ
    noti_content: '新しいコース「文法N4基礎」が追加されました。',
    noti_options: { courseId: '605c72ef5f5b2c1d4c8e2004' }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ee005',
    noti_type: 'EXAM-001',
    noti_senderId: '605c72ef5f5b2c1d4c8e1005',
    noti_receivedId: '605c72ef5f5b2c1d4c8e1005', // Sửa thành ObjectId hợp lệ
    noti_content: '新しい試験「N3模擬試験」が作成されました。',
    noti_options: { examId: '605c72ef5f5b2c1d4c8ec005' }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ee006',
    noti_type: 'COURSE-001',
    noti_senderId: '605c72ef5f5b2c1d4c8e1006',
    noti_receivedId: '605c72ef5f5b2c1d4c8e1006', // Sửa thành ObjectId hợp lệ
    noti_content: '新しいコース「漢字マスターN3」が追加されました。',
    noti_options: { courseId: '605c72ef5f5b2c1d4c8e2006' }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ee007',
    noti_type: 'EXAM-002',
    noti_senderId: '605c72ef5f5b2c1d4c8e1007',
    noti_receivedId: '605c72ef5f5b2c1d4c8e1007', // Sửa thành ObjectId hợp lệ
    noti_content: '試験「N5実践試験」の終了時間が近づきました。',
    noti_options: { examId: '605c72ef5f5b2c1d4c8ec007' }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ee008',
    noti_type: 'COURSE-001',
    noti_senderId: '605c72ef5f5b2c1d4c8e1008',
    noti_receivedId: '605c72ef5f5b2c1d4c8e1008', // Sửa thành ObjectId hợp lệ
    noti_content: '新しいコース「文法N5入門」が追加されました。',
    noti_options: { courseId: '605c72ef5f5b2c1d4c8e2008' }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ee009',
    noti_type: 'EXAM-001',
    noti_senderId: '605c72ef5f5b2c1d4c8e1009',
    noti_receivedId: '605c72ef5f5b2c1d4c8e1009', // Sửa thành ObjectId hợp lệ
    noti_content: '新しい試験「ビジネス会話試験」が作成されました。',
    noti_options: { examId: '605c72ef5f5b2c1d4c8ec009' }
  },
  {
    _id: '605c72ef5f5b2c1d4c8ee00a',
    noti_type: 'COURSE-001',
    noti_senderId: '605c72ef5f5b2c1d4c8e100a',
    noti_receivedId: '605c72ef5f5b2c1d4c8e100a', // Sửa thành ObjectId hợp lệ
    noti_content: '新しいコース「漢字マスターN2」が追加されました。',
    noti_options: { courseId: '605c72ef5f5b2c1d4c8e200a' }
  }
]

const hinas = [
  {
    _id: '605c72ef5f5b2c1d4c8ef001',
    course: '605c72ef5f5b2c1d4c8e2001',
    lesson_id: '605c72ef5f5b2c1d4c8e5001',
    lesson_title: 'あいさつ',
    name_type: 0,
    points: 20,
    words: [
      {
        word: 'こんにちは',
        trans: 'Xin chào',
        audio: 'https://example.com/audio/konnichiwa.mp3',
        svg_path: ['304B', '3093', '306B', '3061', '306F'],
        note: 'Lời chào cơ bản'
      }
    ],
    questions: [
      {
        content: 'Lời chào buổi chiều là gì?',
        image: '',
        trans: 'Xin chào',
        sentence: 'こんにちは、お元気ですか？',
        value: 'こんにちは',
        quiz: ['こんにちは', 'おはよう'],
        point: 10
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef002',
    course: '605c72ef5f5b2c1d4c8e2002',
    lesson_id: '605c72ef5f5b2c1d4c8e5002',
    lesson_title: '漢字の基本',
    name_type: 1,
    points: 15,
    words: [
      {
        word: 'ヤマ',
        trans: 'Núi',
        audio: 'https://example.com/audio/yama.mp3',
        svg_path: ['5C71'],
        note: 'Âm katakana của 山'
      }
    ],
    questions: [
      {
        content: '漢字 山 đọc là gì?',
        image: '',
        trans: 'Núi',
        sentence: 'ヤマが高いです。',
        value: 'ヤマ',
        quiz: ['ヤマ', 'カワ'],
        point: 5
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef003',
    course: '605c72ef5f5b2c1d4c8e2005',
    lesson_id: '605c72ef5f5b2c1d4c8e5005',
    lesson_title: '日常会話',
    name_type: 0,
    points: 25,
    words: [
      {
        word: 'おはよう',
        trans: 'Chào buổi sáng',
        audio: 'https://example.com/audio/ohayou.mp3',
        svg_path: ['304A', '306F', '3088', '3046'],
        note: 'Lời chào buổi sáng'
      }
    ],
    questions: [
      {
        content: 'Lời chào buổi sáng là gì?',
        image: '',
        trans: 'Chào buổi sáng',
        sentence: 'おはようございます。',
        value: 'おはよう',
        quiz: ['おはよう', 'こんにちは'],
        point: 10
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef004',
    course: '605c72ef5f5b2c1d4c8e2007',
    lesson_id: '605c72ef5f5b2c1d4c8e5007',
    lesson_title: 'レストランで',
    name_type: 1,
    points: 15,
    words: [
      {
        word: 'メニュー',
        trans: 'Thực đơn',
        audio: 'https://example.com/audio/menyu.mp3',
        svg_path: ['30E1', '30CB', '30E5', '30FC'],
        note: 'Từ mượn tiếng Anh'
      }
    ],
    questions: [
      {
        content: 'Yêu cầu thực đơn nói thế nào?',
        image: '',
        trans: 'Thực đơn',
        sentence: 'メニューをください。',
        value: 'メニュー',
        quiz: ['メニュー', 'こんにちは'],
        point: 5
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef005',
    course: '605c72ef5f5b2c1d4c8e2009',
    lesson_id: '605c72ef5f5b2c1d4c8e5009',
    lesson_title: 'ビジネス会話',
    name_type: 0,
    points: 30,
    words: [
      {
        word: 'かいしゃ',
        trans: 'Công ty',
        audio: 'https://example.com/audio/kaisha.mp3',
        svg_path: ['4F1A', '793E'],
        note: 'Từ vựng kinh doanh'
      }
    ],
    questions: [
      {
        content: 'Nơi làm việc là gì?',
        image: '',
        trans: 'Công ty',
        sentence: 'かいしゃで働きます。',
        value: 'かいしゃ',
        quiz: ['かいしゃ', 'がっこう'],
        point: 10
      }
    ]
  }
]

const renshuus = [
  {
    _id: '605c72ef5f5b2c1d4c8ef101',
    title: 'Luyện tập chào hỏi N5',
    lesson: '605c72ef5f5b2c1d4c8e5001',
    total_points: 20,
    contents: [
      {
        content_text: 'こんにちは、お元気ですか？',
        point: 10,
        value: 'Xin chào',
        url_audio: 'https://example.com/audio/konnichiwa.mp3',
        quiz: ['Xin chào', 'Tạm biệt']
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef102',
    title: 'Luyện tập kanji N5',
    lesson: '605c72ef5f5b2c1d4c8e5002',
    total_points: 15,
    contents: [
      {
        content_text: '山',
        point: 5,
        value: 'やま',
        url_audio: 'https://example.com/audio/yama.mp3',
        quiz: ['やま', 'かわ']
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef103',
    title: 'Luyện tập hội thoại N5',
    lesson: '605c72ef5f5b2c1d4c8e5005',
    total_points: 25,
    contents: [
      {
        content_text: 'おはようございます。',
        point: 10,
        value: 'Chào buổi sáng',
        url_audio: 'https://example.com/audio/ohayou.mp3',
        quiz: ['Chào buổi sáng', 'Xin chào']
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef104',
    title: 'Luyện tập tại nhà hàng',
    lesson: '605c72ef5f5b2c1d4c8e5007',
    total_points: 15,
    contents: [
      {
        content_text: 'メニューをください。',
        point: 5,
        value: 'Cho tôi thực đơn',
        url_audio: 'https://example.com/audio/menyu.mp3',
        quiz: ['Cho tôi thực đơn', 'Xin chào']
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef105',
    title: 'Luyện tập kinh doanh N3',
    lesson: '605c72ef5f5b2c1d4c8e5009',
    total_points: 30,
    contents: [
      {
        content_text: '会社で働きます。',
        point: 10,
        value: 'Làm việc ở công ty',
        url_audio: 'https://example.com/audio/kaisha.mp3',
        quiz: ['Làm việc ở công ty', 'Đi đến trường']
      }
    ]
  }
]

const enrollments = [
  {
    _id: '605c72ef5f5b2c1d4c8ef201',
    user: '605c72ef5f5b2c1d4c8e1003', // Le Van Cuong (student)
    course: '605c72ef5f5b2c1d4c8e2001', // 日本語初級コース
    enrolledAt: new Date('2023-01-15')
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef202',
    user: '605c72ef5f5b2c1d4c8e1003', // Le Van Cuong (student)
    course: '605c72ef5f5b2c1d4c8e2002', // 漢字マスターN5
    enrolledAt: new Date('2023-02-10')
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef203',
    user: '605c72ef5f5b2c1d4c8e1005', // Hoang Van Em (student)
    course: '605c72ef5f5b2c1d4c8e2001', // 日本語初級コース
    enrolledAt: new Date('2023-01-20')
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef204',
    user: '605c72ef5f5b2c1d4c8e1005', // Hoang Van Em (student)
    course: '605c72ef5f5b2c1d4c8e2004', // 文法N4基礎
    enrolledAt: new Date('2023-03-05')
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef205',
    user: '605c72ef5f5b2c1d4c8e1008', // Bui Thi Hoa (student)
    course: '605c72ef5f5b2c1d4c8e2001', // 日本語初級コース
    enrolledAt: new Date('2023-02-01')
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef206',
    user: '605c72ef5f5b2c1d4c8e1008', // Bui Thi Hoa (student)
    course: '605c72ef5f5b2c1d4c8e2002', // 漢字マスターN5
    enrolledAt: new Date('2023-02-15')
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef207',
    user: '605c72ef5f5b2c1d4c8e1008', // Bui Thi Hoa (student)
    course: '605c72ef5f5b2c1d4c8e2003', // 会話練習中級
    enrolledAt: new Date('2023-03-10')
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef208',
    user: '605c72ef5f5b2c1d4c8e1008', // Bui Thi Hoa (student)
    course: '605c72ef5f5b2c1d4c8e2006', // 漢字マスターN3
    enrolledAt: new Date('2023-04-01')
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef209',
    user: '605c72ef5f5b2c1d4c8e1005', // Hoang Van Em (student)
    course: '605c72ef5f5b2c1d4c8e2007', // 会話練習初級
    enrolledAt: new Date('2023-02-20')
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef210',
    user: '605c72ef5f5b2c1d4c8e1003', // Le Van Cuong (student)
    course: '605c72ef5f5b2c1d4c8e2008', // 文法N5入門
    enrolledAt: new Date('2023-03-15')
  }
]

const results = [
  {
    _id: '605c72ef5f5b2c1d4c8ef301',
    user: '605c72ef5f5b2c1d4c8e1003', // Le Van Cuong (student)
    exam: '605c72ef5f5b2c1d4c8ec001', // N5模擬試験1
    startTime: new Date('2023-03-15T10:00:00'),
    endTime: new Date('2023-03-15T11:00:00'),
    totalScore: 85,
    status: 'completed',
    timeSpent: 3600,
    answers: [
      {
        questionId: 'q001',
        userAnswer: 'a',
        isCorrect: true,
        score: 10
      },
      {
        questionId: 'q002',
        userAnswer: 'a',
        isCorrect: true,
        score: 10
      },
      {
        questionId: 'q003',
        userAnswer: 'がくせい',
        isCorrect: true,
        score: 15
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef302',
    user: '605c72ef5f5b2c1d4c8e1005', // Hoang Van Em (student)
    exam: '605c72ef5f5b2c1d4c8ec001', // N5模擬試験1
    startTime: new Date('2023-03-16T09:00:00'),
    endTime: new Date('2023-03-16T10:00:00'),
    totalScore: 70,
    status: 'completed',
    timeSpent: 3600,
    answers: [
      {
        questionId: 'q001',
        userAnswer: 'a',
        isCorrect: true,
        score: 10
      },
      {
        questionId: 'q002',
        userAnswer: 'a',
        isCorrect: true,
        score: 10
      },
      {
        questionId: 'q003',
        userAnswer: 'せんせい',
        isCorrect: false,
        score: 0
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef303',
    user: '605c72ef5f5b2c1d4c8e1008', // Bui Thi Hoa (student)
    exam: '605c72ef5f5b2c1d4c8ec003', // N4文法試験
    startTime: new Date('2023-03-17T14:00:00'),
    endTime: new Date('2023-03-17T15:00:00'),
    totalScore: 20,
    status: 'completed',
    timeSpent: 3600,
    answers: [
      {
        questionId: 'q001',
        userAnswer: 'a',
        isCorrect: true,
        score: 10
      },
      {
        questionId: 'q002',
        userAnswer: 'a',
        isCorrect: false,
        score: 0
      }
    ]
  },
  {
    _id: '605c72ef5f5b2c1d4c8ef304',
    user: '605c72ef5f5b2c1d4c8e1003', // Le Van Cuong (student)
    exam: '605c72ef5f5b2c1d4c8ec005', // N3模擬試験
    startTime: new Date('2023-03-20T10:00:00'),
    endTime: null,
    totalScore: 0,
    status: 'in-progress',
    timeSpent: 0,
    answers: []
  }
]

const seedDatabase = async () => {
  try {
    // Xóa toàn bộ dữ liệu cũ
    await mongoose.connection.dropDatabase()
    console.log('Đã xóa toàn bộ dữ liệu cũ!')

    // Chèn dữ liệu mới
    const users = await createSeedData()
    await User.insertMany(users)
    await Course.insertMany(courses)
    await Notification.insertMany(notifications)
    await Enrollment.insertMany(enrollments)
    await Lesson.insertMany(lessons)
    await Vocabulary.insertMany(vocabularies)
    await Grammar.insertMany(grammars)
    await Kanji.insertMany(kanjis)
    await Deck.insertMany(decks)
    await Flashcard.insertMany(flashcards)
    await Exam.insertMany(exams)
    await Progression.insertMany(progressions)
    await Hina.insertMany(hinas)
    await Renshuu.insertMany(renshuus)
    await Result.insertMany(results)

    console.log('Dữ liệu đã được seed thành công!')
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedDatabase()
