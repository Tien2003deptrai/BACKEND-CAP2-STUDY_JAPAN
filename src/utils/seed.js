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

const createSeedData = async () => {
  const users = [
    {
      _id: '605c72ef5f5b2c1d4c8e1001',
      name: 'Nguyen Van An',
      email: 'nguyen.an@example.com',
      password: await hashPassword('admin123'),
      status: 'active',
      date_of_birth: new Date('1990-01-15'),
      sex: 'male',
      avatar: 'https://example.com/avatars/an.jpg',
      roles: 'admin',
      phone: '0901234567',
      admin_profile: {
        permissions: ['manage_users'],
        last_login_ip: '127.0.0.1',
        managed_users: []
      }
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1002',
      name: 'Tran Thi Bich',
      email: 'tran.bich@example.com',
      password: await hashPassword('teacher123'),
      status: 'active',
      date_of_birth: new Date('1995-06-20'),
      sex: 'female',
      avatar: '',
      roles: 'teacher',
      phone: '0912345678',
      teacher_profile: {
        bio: 'Giáo viên tiếng Nhật cấp cao',
        experience_years: 5,
        subjects: ['Ngữ pháp', 'Giao tiếp'],
        certificates: ['JLPT N1']
      }
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1003',
      name: 'Le Van Cuong',
      email: 'le.cuong@example.com',
      password: await hashPassword('student123'),
      status: 'active',
      date_of_birth: new Date('1988-03-10'),
      sex: 'male',
      avatar: '',
      roles: 'student',
      phone: '0923456789',
      student_profile: {
        learning_level: 'intermediate',
        enrolled_courses: [],
        progress: 20
      }
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1004',
      name: 'Pham Thi Dung',
      email: 'pham.dung@example.com',
      password: await hashPassword('teacher456'),
      status: 'active',
      date_of_birth: new Date('1992-11-25'),
      sex: 'female',
      avatar: 'https://example.com/avatars/dung.jpg',
      roles: 'teacher',
      phone: '0934567890',
      teacher_profile: {
        bio: 'Giảng viên luyện thi JLPT',
        experience_years: 3,
        subjects: ['Đọc hiểu'],
        certificates: []
      }
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1005',
      name: 'Hoang Van Em',
      email: 'hoang.em@example.com',
      password: await hashPassword('student456'),
      status: 'active',
      date_of_birth: new Date('1993-07-12'),
      sex: 'male',
      avatar: '',
      roles: 'student',
      phone: '0945678901',
      student_profile: {
        learning_level: 'beginner',
        enrolled_courses: [],
        progress: 0
      }
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1006',
      name: 'Vu Thi Phuong',
      email: 'vu.phuong@example.com',
      password: await hashPassword('admin456'),
      status: 'active',
      date_of_birth: new Date('1991-09-30'),
      sex: 'female',
      avatar: 'https://example.com/avatars/phuong.jpg',
      roles: 'admin',
      phone: '0956789012',
      admin_profile: {
        permissions: ['manage_teachers'],
        last_login_ip: '127.0.0.1',
        managed_users: []
      }
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1007',
      name: 'Do Van Giang',
      email: 'do.giang@example.com',
      password: await hashPassword('teacher789'),
      status: 'active',
      date_of_birth: new Date('1989-04-05'),
      sex: 'male',
      avatar: '',
      roles: 'teacher',
      phone: '0967890123',
      teacher_profile: {
        bio: '',
        experience_years: 0,
        subjects: [],
        certificates: []
      }
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1008',
      name: 'Bui Thi Hoa',
      email: 'bui.hoa@example.com',
      password: await hashPassword('student789'),
      status: 'active',
      date_of_birth: new Date('1996-12-15'),
      sex: 'female',
      avatar: 'https://example.com/avatars/hoa.jpg',
      roles: 'student',
      phone: '0978901234',
      student_profile: {
        learning_level: 'advanced',
        enrolled_courses: [],
        progress: 75
      }
    },
    {
      _id: '605c72ef5f5b2c1d4c8e1009',
      name: 'Dang Van Khanh',
      email: 'dang.khanh@example.com',
      password: await hashPassword('admin789'),
      status: 'active',
      date_of_birth: new Date('1987-08-22'),
      sex: 'male',
      avatar: '',
      roles: 'admin',
      phone: '0989012345',
      admin_profile: {
        permissions: [],
        managed_users: [],
        last_login_ip: ''
      }
    },
    {
      _id: '605c72ef5f5b2c1d4c8e100a',
      name: 'Ngo Thi Linh',
      email: 'ngo.linh@example.com',
      password: await hashPassword('teacher999'),
      status: 'active',
      date_of_birth: new Date('1994-02-28'),
      sex: 'female',
      avatar: 'https://example.com/avatars/linh.jpg',
      roles: 'teacher',
      phone: '0990123456',
      teacher_profile: {
        bio: 'Tốt nghiệp đại học Nhật Bản',
        experience_years: 2,
        subjects: ['Hội thoại cơ bản'],
        certificates: ['JLPT N2']
      }
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
    examples: [
      {
        ja: '山が高い',
        hira: 'やまがたかい',
        vi: 'Núi cao'
      }
    ],
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
    examples: [
      {
        ja: '川がきれい',
        hira: 'かわがきれい',
        vi: 'Sông đẹp'
      }
    ],
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
    examples: [
      {
        ja: '木が大きい',
        hira: 'きがおおきい',
        vi: 'Cây lớn'
      }
    ],
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
    examples: [
      {
        ja: '学校に行く',
        hira: 'がっこうにいく',
        vi: 'Đi đến trường'
      }
    ],
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
    examples: [
      {
        ja: '人が多い',
        hira: 'ひとがおおい',
        vi: 'Có nhiều người'
      }
    ],
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
    examples: [
      {
        ja: '日が昇る',
        hira: 'ひがのぼる',
        vi: 'Mặt trời mọc'
      }
    ],
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
    examples: [
      {
        ja: '月がきれい',
        hira: 'つきがきれい',
        vi: 'Mặt trăng đẹp'
      }
    ],
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
    examples: [
      {
        ja: '水が冷たい',
        hira: 'みずがつめたい',
        vi: 'Nước lạnh'
      }
    ],
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
    examples: [
      {
        ja: '火がつく',
        hira: 'ひがつく',
        vi: 'Lửa cháy'
      }
    ],
    explain: 'Chỉ lửa',
    jlpt: 'N5',
    kunyomi: ['ひ'],
    mean: 'Lửa',
    onyomi: ['カ'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: '706B'
  },
  {
    _id: 'seed_auto_00',
    kanji: '仮0',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮0の例文',
        hira: 'かり0のれいぶん',
        vi: 'Ví dụ cho ký tự 仮0'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり0'],
    mean: 'Nghĩa giả định 0',
    onyomi: ['カリ0'],
    stroke_num: 15,
    svg_path: 'path/to/svg',
    unicode: 'XXXX0'
  },
  {
    _id: 'seed_auto_01',
    kanji: '仮1',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮1の例文',
        hira: 'かり1のれいぶん',
        vi: 'Ví dụ cho ký tự 仮1'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり1'],
    mean: 'Nghĩa giả định 1',
    onyomi: ['カリ1'],
    stroke_num: 8,
    svg_path: 'path/to/svg',
    unicode: 'XXXX1'
  },
  {
    _id: 'seed_auto_02',
    kanji: '仮2',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮2の例文',
        hira: 'かり2のれいぶん',
        vi: 'Ví dụ cho ký tự 仮2'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり2'],
    mean: 'Nghĩa giả định 2',
    onyomi: ['カリ2'],
    stroke_num: 14,
    svg_path: 'path/to/svg',
    unicode: 'XXXX2'
  },
  {
    _id: 'seed_auto_03',
    kanji: '仮3',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮3の例文',
        hira: 'かり3のれいぶん',
        vi: 'Ví dụ cho ký tự 仮3'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり3'],
    mean: 'Nghĩa giả định 3',
    onyomi: ['カリ3'],
    stroke_num: 10,
    svg_path: 'path/to/svg',
    unicode: 'XXXX3'
  },
  {
    _id: 'seed_auto_04',
    kanji: '仮4',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮4の例文',
        hira: 'かり4のれいぶん',
        vi: 'Ví dụ cho ký tự 仮4'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり4'],
    mean: 'Nghĩa giả định 4',
    onyomi: ['カリ4'],
    stroke_num: 9,
    svg_path: 'path/to/svg',
    unicode: 'XXXX4'
  },
  {
    _id: 'seed_auto_05',
    kanji: '仮5',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮5の例文',
        hira: 'かり5のれいぶん',
        vi: 'Ví dụ cho ký tự 仮5'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり5'],
    mean: 'Nghĩa giả định 5',
    onyomi: ['カリ5'],
    stroke_num: 12,
    svg_path: 'path/to/svg',
    unicode: 'XXXX5'
  },
  {
    _id: 'seed_auto_06',
    kanji: '仮6',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮6の例文',
        hira: 'かり6のれいぶん',
        vi: 'Ví dụ cho ký tự 仮6'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり6'],
    mean: 'Nghĩa giả định 6',
    onyomi: ['カリ6'],
    stroke_num: 12,
    svg_path: 'path/to/svg',
    unicode: 'XXXX6'
  },
  {
    _id: 'seed_auto_07',
    kanji: '仮7',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮7の例文',
        hira: 'かり7のれいぶん',
        vi: 'Ví dụ cho ký tự 仮7'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり7'],
    mean: 'Nghĩa giả định 7',
    onyomi: ['カリ7'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: 'XXXX7'
  },
  {
    _id: 'seed_auto_08',
    kanji: '仮8',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮8の例文',
        hira: 'かり8のれいぶん',
        vi: 'Ví dụ cho ký tự 仮8'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり8'],
    mean: 'Nghĩa giả định 8',
    onyomi: ['カリ8'],
    stroke_num: 9,
    svg_path: 'path/to/svg',
    unicode: 'XXXX8'
  },
  {
    _id: 'seed_auto_09',
    kanji: '仮9',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮9の例文',
        hira: 'かり9のれいぶん',
        vi: 'Ví dụ cho ký tự 仮9'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり9'],
    mean: 'Nghĩa giả định 9',
    onyomi: ['カリ9'],
    stroke_num: 11,
    svg_path: 'path/to/svg',
    unicode: 'XXXX9'
  },
  {
    _id: 'seed_auto_10',
    kanji: '仮10',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮10の例文',
        hira: 'かり10のれいぶん',
        vi: 'Ví dụ cho ký tự 仮10'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり10'],
    mean: 'Nghĩa giả định 10',
    onyomi: ['カリ10'],
    stroke_num: 13,
    svg_path: 'path/to/svg',
    unicode: 'XXXX10'
  },
  {
    _id: 'seed_auto_11',
    kanji: '仮11',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮11の例文',
        hira: 'かり11のれいぶん',
        vi: 'Ví dụ cho ký tự 仮11'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり11'],
    mean: 'Nghĩa giả định 11',
    onyomi: ['カリ11'],
    stroke_num: 13,
    svg_path: 'path/to/svg',
    unicode: 'XXXX11'
  },
  {
    _id: 'seed_auto_12',
    kanji: '仮12',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮12の例文',
        hira: 'かり12のれいぶん',
        vi: 'Ví dụ cho ký tự 仮12'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり12'],
    mean: 'Nghĩa giả định 12',
    onyomi: ['カリ12'],
    stroke_num: 12,
    svg_path: 'path/to/svg',
    unicode: 'XXXX12'
  },
  {
    _id: 'seed_auto_13',
    kanji: '仮13',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮13の例文',
        hira: 'かり13のれいぶん',
        vi: 'Ví dụ cho ký tự 仮13'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり13'],
    mean: 'Nghĩa giả định 13',
    onyomi: ['カリ13'],
    stroke_num: 9,
    svg_path: 'path/to/svg',
    unicode: 'XXXX13'
  },
  {
    _id: 'seed_auto_14',
    kanji: '仮14',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮14の例文',
        hira: 'かり14のれいぶん',
        vi: 'Ví dụ cho ký tự 仮14'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり14'],
    mean: 'Nghĩa giả định 14',
    onyomi: ['カリ14'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: 'XXXX14'
  },
  {
    _id: 'seed_auto_15',
    kanji: '仮15',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮15の例文',
        hira: 'かり15のれいぶん',
        vi: 'Ví dụ cho ký tự 仮15'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり15'],
    mean: 'Nghĩa giả định 15',
    onyomi: ['カリ15'],
    stroke_num: 15,
    svg_path: 'path/to/svg',
    unicode: 'XXXX15'
  },
  {
    _id: 'seed_auto_16',
    kanji: '仮16',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮16の例文',
        hira: 'かり16のれいぶん',
        vi: 'Ví dụ cho ký tự 仮16'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり16'],
    mean: 'Nghĩa giả định 16',
    onyomi: ['カリ16'],
    stroke_num: 9,
    svg_path: 'path/to/svg',
    unicode: 'XXXX16'
  },
  {
    _id: 'seed_auto_17',
    kanji: '仮17',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮17の例文',
        hira: 'かり17のれいぶん',
        vi: 'Ví dụ cho ký tự 仮17'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり17'],
    mean: 'Nghĩa giả định 17',
    onyomi: ['カリ17'],
    stroke_num: 11,
    svg_path: 'path/to/svg',
    unicode: 'XXXX17'
  },
  {
    _id: 'seed_auto_18',
    kanji: '仮18',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮18の例文',
        hira: 'かり18のれいぶん',
        vi: 'Ví dụ cho ký tự 仮18'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり18'],
    mean: 'Nghĩa giả định 18',
    onyomi: ['カリ18'],
    stroke_num: 5,
    svg_path: 'path/to/svg',
    unicode: 'XXXX18'
  },
  {
    _id: 'seed_auto_19',
    kanji: '仮19',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮19の例文',
        hira: 'かり19のれいぶん',
        vi: 'Ví dụ cho ký tự 仮19'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり19'],
    mean: 'Nghĩa giả định 19',
    onyomi: ['カリ19'],
    stroke_num: 13,
    svg_path: 'path/to/svg',
    unicode: 'XXXX19'
  },
  {
    _id: 'seed_auto_30',
    kanji: '仮30',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮30の例文',
        hira: 'かり30のれいぶん',
        vi: 'Ví dụ cho ký tự 仮30'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり30'],
    mean: 'Nghĩa giả định 30',
    onyomi: ['カリ30'],
    stroke_num: 8,
    svg_path: 'path/to/svg',
    unicode: 'XXXX30'
  },
  {
    _id: 'seed_auto_31',
    kanji: '仮31',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮31の例文',
        hira: 'かり31のれいぶん',
        vi: 'Ví dụ cho ký tự 仮31'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり31'],
    mean: 'Nghĩa giả định 31',
    onyomi: ['カリ31'],
    stroke_num: 14,
    svg_path: 'path/to/svg',
    unicode: 'XXXX31'
  },
  {
    _id: 'seed_auto_32',
    kanji: '仮32',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮32の例文',
        hira: 'かり32のれいぶん',
        vi: 'Ví dụ cho ký tự 仮32'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり32'],
    mean: 'Nghĩa giả định 32',
    onyomi: ['カリ32'],
    stroke_num: 13,
    svg_path: 'path/to/svg',
    unicode: 'XXXX32'
  },
  {
    _id: 'seed_auto_33',
    kanji: '仮33',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮33の例文',
        hira: 'かり33のれいぶん',
        vi: 'Ví dụ cho ký tự 仮33'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり33'],
    mean: 'Nghĩa giả định 33',
    onyomi: ['カリ33'],
    stroke_num: 12,
    svg_path: 'path/to/svg',
    unicode: 'XXXX33'
  },
  {
    _id: 'seed_auto_34',
    kanji: '仮34',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮34の例文',
        hira: 'かり34のれいぶん',
        vi: 'Ví dụ cho ký tự 仮34'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり34'],
    mean: 'Nghĩa giả định 34',
    onyomi: ['カリ34'],
    stroke_num: 6,
    svg_path: 'path/to/svg',
    unicode: 'XXXX34'
  },
  {
    _id: 'seed_auto_35',
    kanji: '仮35',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮35の例文',
        hira: 'かり35のれいぶん',
        vi: 'Ví dụ cho ký tự 仮35'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり35'],
    mean: 'Nghĩa giả định 35',
    onyomi: ['カリ35'],
    stroke_num: 8,
    svg_path: 'path/to/svg',
    unicode: 'XXXX35'
  },
  {
    _id: 'seed_auto_36',
    kanji: '仮36',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮36の例文',
        hira: 'かり36のれいぶん',
        vi: 'Ví dụ cho ký tự 仮36'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり36'],
    mean: 'Nghĩa giả định 36',
    onyomi: ['カリ36'],
    stroke_num: 14,
    svg_path: 'path/to/svg',
    unicode: 'XXXX36'
  },
  {
    _id: 'seed_auto_37',
    kanji: '仮37',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮37の例文',
        hira: 'かり37のれいぶん',
        vi: 'Ví dụ cho ký tự 仮37'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり37'],
    mean: 'Nghĩa giả định 37',
    onyomi: ['カリ37'],
    stroke_num: 10,
    svg_path: 'path/to/svg',
    unicode: 'XXXX37'
  },
  {
    _id: 'seed_auto_38',
    kanji: '仮38',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮38の例文',
        hira: 'かり38のれいぶん',
        vi: 'Ví dụ cho ký tự 仮38'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり38'],
    mean: 'Nghĩa giả định 38',
    onyomi: ['カリ38'],
    stroke_num: 5,
    svg_path: 'path/to/svg',
    unicode: 'XXXX38'
  },
  {
    _id: 'seed_auto_39',
    kanji: '仮39',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮39の例文',
        hira: 'かり39のれいぶん',
        vi: 'Ví dụ cho ký tự 仮39'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり39'],
    mean: 'Nghĩa giả định 39',
    onyomi: ['カリ39'],
    stroke_num: 7,
    svg_path: 'path/to/svg',
    unicode: 'XXXX39'
  },
  {
    _id: 'seed_auto_40',
    kanji: '仮40',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮40の例文',
        hira: 'かり40のれいぶん',
        vi: 'Ví dụ cho ký tự 仮40'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり40'],
    mean: 'Nghĩa giả định 40',
    onyomi: ['カリ40'],
    stroke_num: 11,
    svg_path: 'path/to/svg',
    unicode: 'XXXX40'
  },
  {
    _id: 'seed_auto_41',
    kanji: '仮41',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮41の例文',
        hira: 'かり41のれいぶん',
        vi: 'Ví dụ cho ký tự 仮41'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり41'],
    mean: 'Nghĩa giả định 41',
    onyomi: ['カリ41'],
    stroke_num: 15,
    svg_path: 'path/to/svg',
    unicode: 'XXXX41'
  },
  {
    _id: 'seed_auto_42',
    kanji: '仮42',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮42の例文',
        hira: 'かり42のれいぶん',
        vi: 'Ví dụ cho ký tự 仮42'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり42'],
    mean: 'Nghĩa giả định 42',
    onyomi: ['カリ42'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: 'XXXX42'
  },
  {
    _id: 'seed_auto_43',
    kanji: '仮43',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮43の例文',
        hira: 'かり43のれいぶん',
        vi: 'Ví dụ cho ký tự 仮43'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり43'],
    mean: 'Nghĩa giả định 43',
    onyomi: ['カリ43'],
    stroke_num: 5,
    svg_path: 'path/to/svg',
    unicode: 'XXXX43'
  },
  {
    _id: 'seed_auto_44',
    kanji: '仮44',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮44の例文',
        hira: 'かり44のれいぶん',
        vi: 'Ví dụ cho ký tự 仮44'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり44'],
    mean: 'Nghĩa giả định 44',
    onyomi: ['カリ44'],
    stroke_num: 11,
    svg_path: 'path/to/svg',
    unicode: 'XXXX44'
  },
  {
    _id: 'seed_auto_45',
    kanji: '仮45',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮45の例文',
        hira: 'かり45のれいぶん',
        vi: 'Ví dụ cho ký tự 仮45'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり45'],
    mean: 'Nghĩa giả định 45',
    onyomi: ['カリ45'],
    stroke_num: 8,
    svg_path: 'path/to/svg',
    unicode: 'XXXX45'
  },
  {
    _id: 'seed_auto_46',
    kanji: '仮46',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮46の例文',
        hira: 'かり46のれいぶん',
        vi: 'Ví dụ cho ký tự 仮46'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり46'],
    mean: 'Nghĩa giả định 46',
    onyomi: ['カリ46'],
    stroke_num: 10,
    svg_path: 'path/to/svg',
    unicode: 'XXXX46'
  },
  {
    _id: 'seed_auto_47',
    kanji: '仮47',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮47の例文',
        hira: 'かり47のれいぶん',
        vi: 'Ví dụ cho ký tự 仮47'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり47'],
    mean: 'Nghĩa giả định 47',
    onyomi: ['カリ47'],
    stroke_num: 14,
    svg_path: 'path/to/svg',
    unicode: 'XXXX47'
  },
  {
    _id: 'seed_auto_48',
    kanji: '仮48',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮48の例文',
        hira: 'かり48のれいぶん',
        vi: 'Ví dụ cho ký tự 仮48'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり48'],
    mean: 'Nghĩa giả định 48',
    onyomi: ['カリ48'],
    stroke_num: 13,
    svg_path: 'path/to/svg',
    unicode: 'XXXX48'
  },
  {
    _id: 'seed_auto_49',
    kanji: '仮49',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮49の例文',
        hira: 'かり49のれいぶん',
        vi: 'Ví dụ cho ký tự 仮49'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり49'],
    mean: 'Nghĩa giả định 49',
    onyomi: ['カリ49'],
    stroke_num: 6,
    svg_path: 'path/to/svg',
    unicode: 'XXXX49'
  },
  {
    _id: 'seed_auto_50',
    kanji: '仮50',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮50の例文',
        hira: 'かり50のれいぶん',
        vi: 'Ví dụ cho ký tự 仮50'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり50'],
    mean: 'Nghĩa giả định 50',
    onyomi: ['カリ50'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: 'XXXX50'
  },
  {
    _id: 'seed_auto_51',
    kanji: '仮51',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮51の例文',
        hira: 'かり51のれいぶん',
        vi: 'Ví dụ cho ký tự 仮51'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり51'],
    mean: 'Nghĩa giả định 51',
    onyomi: ['カリ51'],
    stroke_num: 8,
    svg_path: 'path/to/svg',
    unicode: 'XXXX51'
  },
  {
    _id: 'seed_auto_52',
    kanji: '仮52',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮52の例文',
        hira: 'かり52のれいぶん',
        vi: 'Ví dụ cho ký tự 仮52'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり52'],
    mean: 'Nghĩa giả định 52',
    onyomi: ['カリ52'],
    stroke_num: 9,
    svg_path: 'path/to/svg',
    unicode: 'XXXX52'
  },
  {
    _id: 'seed_auto_53',
    kanji: '仮53',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮53の例文',
        hira: 'かり53のれいぶん',
        vi: 'Ví dụ cho ký tự 仮53'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり53'],
    mean: 'Nghĩa giả định 53',
    onyomi: ['カリ53'],
    stroke_num: 12,
    svg_path: 'path/to/svg',
    unicode: 'XXXX53'
  },
  {
    _id: 'seed_auto_54',
    kanji: '仮54',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮54の例文',
        hira: 'かり54のれいぶん',
        vi: 'Ví dụ cho ký tự 仮54'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり54'],
    mean: 'Nghĩa giả định 54',
    onyomi: ['カリ54'],
    stroke_num: 10,
    svg_path: 'path/to/svg',
    unicode: 'XXXX54'
  },
  {
    _id: 'seed_auto_55',
    kanji: '仮55',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮55の例文',
        hira: 'かり55のれいぶん',
        vi: 'Ví dụ cho ký tự 仮55'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり55'],
    mean: 'Nghĩa giả định 55',
    onyomi: ['カリ55'],
    stroke_num: 15,
    svg_path: 'path/to/svg',
    unicode: 'XXXX55'
  },
  {
    _id: 'seed_auto_56',
    kanji: '仮56',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮56の例文',
        hira: 'かり56のれいぶん',
        vi: 'Ví dụ cho ký tự 仮56'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり56'],
    mean: 'Nghĩa giả định 56',
    onyomi: ['カリ56'],
    stroke_num: 3,
    svg_path: 'path/to/svg',
    unicode: 'XXXX56'
  },
  {
    _id: 'seed_auto_57',
    kanji: '仮57',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮57の例文',
        hira: 'かり57のれいぶん',
        vi: 'Ví dụ cho ký tự 仮57'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり57'],
    mean: 'Nghĩa giả định 57',
    onyomi: ['カリ57'],
    stroke_num: 14,
    svg_path: 'path/to/svg',
    unicode: 'XXXX57'
  },
  {
    _id: 'seed_auto_58',
    kanji: '仮58',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮58の例文',
        hira: 'かり58のれいぶん',
        vi: 'Ví dụ cho ký tự 仮58'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり58'],
    mean: 'Nghĩa giả định 58',
    onyomi: ['カリ58'],
    stroke_num: 14,
    svg_path: 'path/to/svg',
    unicode: 'XXXX58'
  },
  {
    _id: 'seed_auto_59',
    kanji: '仮59',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮59の例文',
        hira: 'かり59のれいぶん',
        vi: 'Ví dụ cho ký tự 仮59'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり59'],
    mean: 'Nghĩa giả định 59',
    onyomi: ['カリ59'],
    stroke_num: 3,
    svg_path: 'path/to/svg',
    unicode: 'XXXX59'
  },
  {
    _id: 'seed_auto_60',
    kanji: '仮60',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮60の例文',
        hira: 'かり60のれいぶん',
        vi: 'Ví dụ cho ký tự 仮60'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり60'],
    mean: 'Nghĩa giả định 60',
    onyomi: ['カリ60'],
    stroke_num: 3,
    svg_path: 'path/to/svg',
    unicode: 'XXXX60'
  },
  {
    _id: 'seed_auto_61',
    kanji: '仮61',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮61の例文',
        hira: 'かり61のれいぶん',
        vi: 'Ví dụ cho ký tự 仮61'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり61'],
    mean: 'Nghĩa giả định 61',
    onyomi: ['カリ61'],
    stroke_num: 7,
    svg_path: 'path/to/svg',
    unicode: 'XXXX61'
  },
  {
    _id: 'seed_auto_62',
    kanji: '仮62',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮62の例文',
        hira: 'かり62のれいぶん',
        vi: 'Ví dụ cho ký tự 仮62'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり62'],
    mean: 'Nghĩa giả định 62',
    onyomi: ['カリ62'],
    stroke_num: 10,
    svg_path: 'path/to/svg',
    unicode: 'XXXX62'
  },
  {
    _id: 'seed_auto_63',
    kanji: '仮63',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮63の例文',
        hira: 'かり63のれいぶん',
        vi: 'Ví dụ cho ký tự 仮63'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり63'],
    mean: 'Nghĩa giả định 63',
    onyomi: ['カリ63'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: 'XXXX63'
  },
  {
    _id: 'seed_auto_64',
    kanji: '仮64',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮64の例文',
        hira: 'かり64のれいぶん',
        vi: 'Ví dụ cho ký tự 仮64'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり64'],
    mean: 'Nghĩa giả định 64',
    onyomi: ['カリ64'],
    stroke_num: 4,
    svg_path: 'path/to/svg',
    unicode: 'XXXX64'
  },
  {
    _id: 'seed_auto_65',
    kanji: '仮65',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮65の例文',
        hira: 'かり65のれいぶん',
        vi: 'Ví dụ cho ký tự 仮65'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり65'],
    mean: 'Nghĩa giả định 65',
    onyomi: ['カリ65'],
    stroke_num: 14,
    svg_path: 'path/to/svg',
    unicode: 'XXXX65'
  },
  {
    _id: 'seed_auto_66',
    kanji: '仮66',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮66の例文',
        hira: 'かり66のれいぶん',
        vi: 'Ví dụ cho ký tự 仮66'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり66'],
    mean: 'Nghĩa giả định 66',
    onyomi: ['カリ66'],
    stroke_num: 9,
    svg_path: 'path/to/svg',
    unicode: 'XXXX66'
  },
  {
    _id: 'seed_auto_67',
    kanji: '仮67',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮67の例文',
        hira: 'かり67のれいぶん',
        vi: 'Ví dụ cho ký tự 仮67'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり67'],
    mean: 'Nghĩa giả định 67',
    onyomi: ['カリ67'],
    stroke_num: 12,
    svg_path: 'path/to/svg',
    unicode: 'XXXX67'
  },
  {
    _id: 'seed_auto_68',
    kanji: '仮68',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮68の例文',
        hira: 'かり68のれいぶん',
        vi: 'Ví dụ cho ký tự 仮68'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり68'],
    mean: 'Nghĩa giả định 68',
    onyomi: ['カリ68'],
    stroke_num: 7,
    svg_path: 'path/to/svg',
    unicode: 'XXXX68'
  },
  {
    _id: 'seed_auto_69',
    kanji: '仮69',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮69の例文',
        hira: 'かり69のれいぶん',
        vi: 'Ví dụ cho ký tự 仮69'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり69'],
    mean: 'Nghĩa giả định 69',
    onyomi: ['カリ69'],
    stroke_num: 5,
    svg_path: 'path/to/svg',
    unicode: 'XXXX69'
  },
  {
    _id: 'seed_auto_70',
    kanji: '仮70',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮70の例文',
        hira: 'かり70のれいぶん',
        vi: 'Ví dụ cho ký tự 仮70'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり70'],
    mean: 'Nghĩa giả định 70',
    onyomi: ['カリ70'],
    stroke_num: 3,
    svg_path: 'path/to/svg',
    unicode: 'XXXX70'
  },
  {
    _id: 'seed_auto_71',
    kanji: '仮71',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮71の例文',
        hira: 'かり71のれいぶん',
        vi: 'Ví dụ cho ký tự 仮71'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり71'],
    mean: 'Nghĩa giả định 71',
    onyomi: ['カリ71'],
    stroke_num: 12,
    svg_path: 'path/to/svg',
    unicode: 'XXXX71'
  },
  {
    _id: 'seed_auto_72',
    kanji: '仮72',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮72の例文',
        hira: 'かり72のれいぶん',
        vi: 'Ví dụ cho ký tự 仮72'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり72'],
    mean: 'Nghĩa giả định 72',
    onyomi: ['カリ72'],
    stroke_num: 9,
    svg_path: 'path/to/svg',
    unicode: 'XXXX72'
  },
  {
    _id: 'seed_auto_73',
    kanji: '仮73',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮73の例文',
        hira: 'かり73のれいぶん',
        vi: 'Ví dụ cho ký tự 仮73'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり73'],
    mean: 'Nghĩa giả định 73',
    onyomi: ['カリ73'],
    stroke_num: 11,
    svg_path: 'path/to/svg',
    unicode: 'XXXX73'
  },
  {
    _id: 'seed_auto_74',
    kanji: '仮74',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮74の例文',
        hira: 'かり74のれいぶん',
        vi: 'Ví dụ cho ký tự 仮74'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N5',
    kunyomi: ['かり74'],
    mean: 'Nghĩa giả định 74',
    onyomi: ['カリ74'],
    stroke_num: 3,
    svg_path: 'path/to/svg',
    unicode: 'XXXX74'
  },
  {
    _id: 'seed_auto_75',
    kanji: '仮75',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮75の例文',
        hira: 'かり75のれいぶん',
        vi: 'Ví dụ cho ký tự 仮75'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N1',
    kunyomi: ['かり75'],
    mean: 'Nghĩa giả định 75',
    onyomi: ['カリ75'],
    stroke_num: 10,
    svg_path: 'path/to/svg',
    unicode: 'XXXX75'
  },
  {
    _id: 'seed_auto_76',
    kanji: '仮76',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮76の例文',
        hira: 'かり76のれいぶん',
        vi: 'Ví dụ cho ký tự 仮76'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり76'],
    mean: 'Nghĩa giả định 76',
    onyomi: ['カリ76'],
    stroke_num: 6,
    svg_path: 'path/to/svg',
    unicode: 'XXXX76'
  },
  {
    _id: 'seed_auto_77',
    kanji: '仮77',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮77の例文',
        hira: 'かり77のれいぶん',
        vi: 'Ví dụ cho ký tự 仮77'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N2',
    kunyomi: ['かり77'],
    mean: 'Nghĩa giả định 77',
    onyomi: ['カリ77'],
    stroke_num: 13,
    svg_path: 'path/to/svg',
    unicode: 'XXXX77'
  },
  {
    _id: 'seed_auto_78',
    kanji: '仮78',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮78の例文',
        hira: 'かり78のれいぶん',
        vi: 'Ví dụ cho ký tự 仮78'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N4',
    kunyomi: ['かり78'],
    mean: 'Nghĩa giả định 78',
    onyomi: ['カリ78'],
    stroke_num: 13,
    svg_path: 'path/to/svg',
    unicode: 'XXXX78'
  },
  {
    _id: 'seed_auto_79',
    kanji: '仮79',
    cn_vi_word: 'Giả định',
    component: ['人', '反'],
    examples: [
      {
        ja: '仮79の例文',
        hira: 'かり79のれいぶん',
        vi: 'Ví dụ cho ký tự 仮79'
      }
    ],
    explain: 'Từ giả định dùng để học',
    jlpt: 'N3',
    kunyomi: ['かり79'],
    mean: 'Nghĩa giả định 79',
    onyomi: ['カリ79'],
    stroke_num: 10,
    svg_path: 'path/to/svg',
    unicode: 'XXXX79'
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
    title: 'N5 Vocabulary Test',
    description: 'A test for basic vocabulary in N5 level.',
    time_limit: 60,
    total_points: 100,
    level: 'N5',
    sections: [
      {
        title: 'Vocabulary Section',
        description: 'Test your vocabulary knowledge.',
        type: 'vocabulary'
      }
    ],
    creator: '605c72ef5f5b2c1d4c8e1001', // Replace with a valid user ID
    course: '605c72ef5f5b2c1d4c8e2001', // Replace with a valid course ID
    tags: ['vocabulary', 'N5'],
    questions: [
      {
        parentQuestion: 'Vocabulary Section 1',
        paragraph: 'Translate the following words into Japanese.',
        imgUrl: null,
        childQuestions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            content: 'What is the Japanese word for "apple"?',
            instruction: 'Choose the correct answer.',
            options: [
              { id: 'a', text: 'りんご' },
              { id: 'b', text: 'みかん' },
              { id: 'c', text: 'ぶどう' }
            ],
            correctAnswer: 'a',
            point: 1
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            content: 'What is the Japanese word for "water"?',
            instruction: 'Choose the correct answer.',
            options: [
              { id: 'a', text: 'お茶' },
              { id: 'b', text: '水' },
              { id: 'c', text: '牛乳' }
            ],
            correctAnswer: 'b',
            point: 1
          }
        ]
      },
      {
        parentQuestion: 'Vocabulary Section 2',
        paragraph: 'Match the following words with their meanings.',
        imgUrl: 'https://example.com/image.jpg',
        childQuestions: [
          {
            id: 'q3',
            type: 'multiple_choice',
            content: 'What is the Japanese word for "dog"?',
            instruction: 'Choose the correct answer.',
            options: [
              { id: 'a', text: '猫' },
              { id: 'b', text: '犬' },
              { id: 'c', text: '鳥' }
            ],
            correctAnswer: 'b',
            point: 1
          }
        ]
      }
    ],
    allowedTime: 60,
    passingScore: 50,
    difficultyLevel: 'beginner',
    visibility: 'public',
    startTime: null,
    endTime: null,
    allowedAttempts: 3,
    settings: {
      shuffleQuestions: true,
      showResults: true,
      showAnswers: false,
      preventCopy: true,
      fullScreen: false
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
    examsProgress: [{ exam: '605c72ef5f5b2c1d4c8ec001', point: 85, note: 'Good' }],
    gameProgress: [
      {
        gameType: 'MemoryCard',
        correctPairs: 10,
        totalCards: 12,
        duration: 120
      }
    ]
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
    examsProgress: [],
    gameProgress: []
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
    examsProgress: [{ exam: '605c72ef5f5b2c1d4c8ec003', point: 70, note: 'OK' }],
    gameProgress: []
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
    examsProgress: [],
    gameProgress: []
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
    examsProgress: [{ exam: '605c72ef5f5b2c1d4c8ec005', point: 90, note: 'Excellent' }],
    gameProgress: []
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
    examsProgress: [],
    gameProgress: []
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
    examsProgress: [{ exam: '605c72ef5f5b2c1d4c8ec007', point: 65, note: 'Need practice' }],
    gameProgress: [
      {
        gameType: 'Flashcard',
        correctPairs: 8,
        totalCards: 10,
        duration: 90
      }
    ]
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
    examsProgress: [],
    gameProgress: []
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
    examsProgress: [{ exam: '605c72ef5f5b2c1d4c8ec009', point: 80, note: 'Good' }],
    gameProgress: []
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
    examsProgress: [],
    gameProgress: []
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
    lesson: '605c72ef5f5b2c1d4c8e5001',
    questions: [
      {
        content: 'こんにちは、お元気ですか？',
        correctAnswer: 'a',
        options: [
          { id: 'a', text: 'Xin chào, bạn khỏe không?' },
          { id: 'b', text: 'Tạm biệt' },
          { id: 'c', text: 'Cảm ơn' },
          { id: 'd', text: 'Xin lỗi' }
        ]
      },
      {
        content: 'ありがとう',
        correctAnswer: 'c',
        options: [
          { id: 'a', text: 'Xin chào' },
          { id: 'b', text: 'Tạm biệt' },
          { id: 'c', text: 'Cảm ơn' },
          { id: 'd', text: 'Không có gì' }
        ]
      },
      {
        content: 'さようなら',
        correctAnswer: 'b',
        options: [
          { id: 'a', text: 'Cảm ơn' },
          { id: 'b', text: 'Tạm biệt' },
          { id: 'c', text: 'Vâng' },
          { id: 'd', text: 'Không' }
        ]
      },
      {
        content: 'はい',
        correctAnswer: 'd',
        options: [
          { id: 'a', text: 'Không' },
          { id: 'b', text: 'Xin lỗi' },
          { id: 'c', text: 'Tạm biệt' },
          { id: 'd', text: 'Vâng' }
        ]
      },
      {
        content: 'いいえ',
        correctAnswer: 'a',
        options: [
          { id: 'a', text: 'Không' },
          { id: 'b', text: 'Có' },
          { id: 'c', text: 'Xin chào' },
          { id: 'd', text: 'Cảm ơn' }
        ]
      }
    ]
  },
  {
    lesson: '605c72ef5f5b2c1d4c8e5002',
    questions: [
      {
        content: 'こんにちは、お元気ですか？',
        correctAnswer: 'a',
        options: [
          { id: 'a', text: 'Xin chào, bạn khỏe không?' },
          { id: 'b', text: 'Tạm biệt' },
          { id: 'c', text: 'Cảm ơn' },
          { id: 'd', text: 'Xin lỗi' }
        ]
      },
      {
        content: 'ありがとう',
        correctAnswer: 'c',
        options: [
          { id: 'a', text: 'Xin chào' },
          { id: 'b', text: 'Tạm biệt' },
          { id: 'c', text: 'Cảm ơn' },
          { id: 'd', text: 'Không có gì' }
        ]
      },
      {
        content: 'さようなら',
        correctAnswer: 'b',
        options: [
          { id: 'a', text: 'Cảm ơn' },
          { id: 'b', text: 'Tạm biệt' },
          { id: 'c', text: 'Vâng' },
          { id: 'd', text: 'Không' }
        ]
      },
      {
        content: 'はい',
        correctAnswer: 'd',
        options: [
          { id: 'a', text: 'Không' },
          { id: 'b', text: 'Xin lỗi' },
          { id: 'c', text: 'Tạm biệt' },
          { id: 'd', text: 'Vâng' }
        ]
      },
      {
        content: 'いいえ',
        correctAnswer: 'a',
        options: [
          { id: 'a', text: 'Không' },
          { id: 'b', text: 'Có' },
          { id: 'c', text: 'Xin chào' },
          { id: 'd', text: 'Cảm ơn' }
        ]
      }
    ]
  },
  {
    lesson: '605c72ef5f5b2c1d4c8e5005',
    questions: [
      {
        content: 'おはようございます。dịch là?',
        correctAnswer: 'a',
        options: [
          { id: 'a', text: 'Chào buổi sáng' },
          { id: 'b', text: 'Xin chào' }
        ]
      }
    ]
  },
  {
    lesson: '605c72ef5f5b2c1d4c8e5007',
    questions: [
      {
        content: 'メニューをください。nghĩa là gì?',
        correctAnswer: 'a',
        options: [
          { id: 'a', text: 'Cho tôi thực đơn' },
          { id: 'b', text: 'Xin chào' }
        ]
      }
    ]
  },
  {
    lesson: '605c72ef5f5b2c1d4c8e5009',
    questions: [
      {
        content: '会社で働きます。dịch sang tiếng Việt?',
        correctAnswer: 'a',
        options: [
          { id: 'a', text: 'Làm việc ở công ty' },
          { id: 'b', text: 'Đi đến trường' }
        ]
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
