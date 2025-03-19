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

mongoose.connect('mongodb://localhost:27017/japanese_learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const users = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Nguyễn Văn A',
    email: 'a@example.com',
    password: 'admin123',
    status: 'active',
    date_of_birth: new Date('1990-01-01'),
    sex: 1,
    avatar: 'avatar_a.jpg',
    roles: 'admin',
    phone: '0123456789'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Trần Thị B',
    email: 'b@example.com',
    password: 'teacher123',
    status: 'active',
    date_of_birth: new Date('1992-02-02'),
    sex: 0,
    avatar: 'avatar_b.jpg',
    roles: 'student',
    phone: '0123456788'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Lê Văn C',
    email: 'c@example.com',
    password: 'student123',
    status: 'pending',
    date_of_birth: new Date('1995-03-03'),
    sex: 1,
    avatar: 'avatar_c.jpg',
    roles: 'student',
    phone: '0123456787'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Phạm Thị D',
    email: 'd@example.com',
    password: 'password123',
    status: 'block',
    date_of_birth: new Date('1988-04-04'),
    sex: 0,
    avatar: 'avatar_d.jpg',
    roles: 'student',
    phone: '0123456786'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Nguyễn Văn E',
    email: 'e@example.com',
    password: 'password123',
    status: 'active',
    date_of_birth: new Date('1993-05-05'),
    sex: 1,
    avatar: 'avatar_e.jpg',
    roles: 'student',
    phone: '0123456785'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Trần Thị F',
    email: 'f@example.com',
    password: 'password123',
    status: 'pending',
    date_of_birth: new Date('1990-06-06'),
    sex: 0,
    avatar: 'avatar_f.jpg',
    roles: 'student',
    phone: '0123456784'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Lê Văn G',
    email: 'g@example.com',
    password: 'password123',
    status: 'block',
    date_of_birth: new Date('1991-07-07'),
    sex: 1,
    avatar: 'avatar_g.jpg',
    roles: 'student',
    phone: '0123456783'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Phạm Thị H',
    email: 'h@example.com',
    password: 'password123',
    status: 'active',
    date_of_birth: new Date('1994-08-08'),
    sex: 0,
    avatar: 'avatar_h.jpg',
    roles: 'student',
    phone: '0123456782'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Nguyễn Văn I',
    email: 'i@example.com',
    password: 'password123',
    status: 'pending',
    date_of_birth: new Date('1996-09-09'),
    sex: 1,
    avatar: 'avatar_i.jpg',
    roles: 'student',
    phone: '0123456781'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Trần Thị J',
    email: 'j@example.com',
    password: 'password123',
    status: 'block',
    date_of_birth: new Date('1989-10-10'),
    sex: 0,
    avatar: 'avatar_j.jpg',
    roles: 'student',
    phone: '0123456780'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Lê Văn K',
    email: 'k@example.com',
    password: 'password123',
    status: 'active',
    date_of_birth: new Date('1992-11-11'),
    sex: 1,
    avatar: 'avatar_k.jpg',
    roles: 'student',
    phone: '0123456799'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Phạm Thị L',
    email: 'l@example.com',
    password: 'password123',
    status: 'pending',
    date_of_birth: new Date('1995-12-12'),
    sex: 0,
    avatar: 'avatar_l.jpg',
    roles: 'student',
    phone: '0123456798'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Nguyễn Văn M',
    email: 'm@example.com',
    password: 'password123',
    status: 'block',
    date_of_birth: new Date('1990-01-13'),
    sex: 1,
    avatar: 'avatar_m.jpg',
    roles: 'student',
    phone: '0123456797'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Trần Thị N',
    email: 'n@example.com',
    password: 'password123',
    status: 'active',
    date_of_birth: new Date('1993-02-14'),
    sex: 0,
    avatar: 'avatar_n.jpg',
    roles: 'student',
    phone: '0123456796'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Lê Văn O',
    email: 'o@example.com',
    password: 'password123',
    status: 'pending',
    date_of_birth: new Date('1996-03-15'),
    sex: 1,
    avatar: 'avatar_o.jpg',
    roles: 'student',
    phone: '0123456795'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Phạm Thị P',
    email: 'p@example.com',
    password: 'password123',
    status: 'block',
    date_of_birth: new Date('1988-04-16'),
    sex: 0,
    avatar: 'avatar_p.jpg',
    roles: 'student',
    phone: '0123456794'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Nguyễn Văn Q',
    email: 'q@example.com',
    password: 'password123',
    status: 'active',
    date_of_birth: new Date('1991-05-17'),
    sex: 1,
    avatar: 'avatar_q.jpg',
    roles: 'student',
    phone: '0123456793'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Trần Thị R',
    email: 'r@example.com',
    password: 'password123',
    status: 'pending',
    date_of_birth: new Date('1994-06-18'),
    sex: 0,
    avatar: 'avatar_r.jpg',
    roles: 'student',
    phone: '0123456792'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Lê Văn S',
    email: 's@example.com',
    password: 'password123',
    status: 'block',
    date_of_birth: new Date('1992-07-19'),
    sex: 1,
    avatar: 'avatar_s.jpg',
    roles: 'student',
    phone: '0123456791'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Phạm Thị T',
    email: 't@example.com',
    password: 'password123',
    status: 'active',
    date_of_birth: new Date('1990-08-20'),
    sex: 0,
    avatar: 'avatar_t.jpg',
    roles: 'student',
    phone: '0123456790'
  }
]

const courses = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cơ bản',
    thumb: 'thumb1.jpg',
    user: users[0]._id,
    type: 'Online',
    author: 'Nguyễn Văn A',
    stu_num: 100
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật nâng cao',
    thumb: 'thumb2.jpg',
    user: users[1]._id,
    type: 'Offline',
    author: 'Trần Thị B',
    stu_num: 50
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật giao tiếp',
    thumb: 'thumb3.jpg',
    user: users[2]._id,
    type: 'Hybrid',
    author: 'Lê Văn C',
    stu_num: 30
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cho trẻ em',
    thumb: 'thumb4.jpg',
    user: users[3]._id,
    type: 'Online',
    author: 'Phạm Thị D',
    stu_num: 70
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật văn hóa',
    thumb: 'thumb5.jpg',
    user: users[4]._id,
    type: 'Offline',
    author: 'Nguyễn Văn E',
    stu_num: 40
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật du lịch',
    thumb: 'thumb6.jpg',
    user: users[5]._id,
    type: 'Hybrid',
    author: 'Trần Thị F',
    stu_num: 20
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cho người đi làm',
    thumb: 'thumb7.jpg',
    user: users[6]._id,
    type: 'Online',
    author: 'Lê Văn G',
    stu_num: 60
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật tổng quát',
    thumb: 'thumb8.jpg',
    user: users[7]._id,
    type: 'Offline',
    author: 'Phạm Thị H',
    stu_num: 80
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật qua phim ảnh',
    thumb: 'thumb9.jpg',
    user: users[8]._id,
    type: 'Hybrid',
    author: 'Nguyễn Văn I',
    stu_num: 90
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật qua bài hát',
    thumb: 'thumb10.jpg',
    user: users[9]._id,
    type: 'Online',
    author: 'Trần Thị J',
    stu_num: 110
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cho sinh viên',
    thumb: 'thumb11.jpg',
    user: users[10]._id,
    type: 'Offline',
    author: 'Lê Văn K',
    stu_num: 120
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cho người lớn tuổi',
    thumb: 'thumb12.jpg',
    user: users[11]._id,
    type: 'Hybrid',
    author: 'Phạm Thị L',
    stu_num: 130
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cho người mới bắt đầu',
    thumb: 'thumb13.jpg',
    user: users[12]._id,
    type: 'Online',
    author: 'Nguyễn Văn M',
    stu_num: 140
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cho người đi làm',
    thumb: 'thumb14.jpg',
    user: users[13]._id,
    type: 'Offline',
    author: 'Trần Thị N',
    stu_num: 150
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật qua trò chơi',
    thumb: 'thumb15.jpg',
    user: users[14]._id,
    type: 'Hybrid',
    author: 'Lê Văn O',
    stu_num: 160
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cho người cao tuổi',
    thumb: 'thumb16.jpg',
    user: users[15]._id,
    type: 'Online',
    author: 'Phạm Thị P',
    stu_num: 170
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cho trẻ em',
    thumb: 'thumb17.jpg',
    user: users[16]._id,
    type: 'Offline',
    author: 'Nguyễn Văn Q',
    stu_num: 180
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cho sinh viên',
    thumb: 'thumb18.jpg',
    user: users[17]._id,
    type: 'Hybrid',
    author: 'Trần Thị R',
    stu_num: 190
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật qua văn hóa',
    thumb: 'thumb19.jpg',
    user: users[18]._id,
    type: 'Online',
    author: 'Lê Văn S',
    stu_num: 200
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Tiếng Nhật cho người đi làm',
    thumb: 'thumb20.jpg',
    user: users[19]._id,
    type: 'Offline',
    author: 'Phạm Thị T',
    stu_num: 210
  }
]
const lessons = [
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'L1',
    lesson_title: 'Giới thiệu về tiếng Nhật',
    video_url: 'video1.mp4',
    description: 'Bài học giới thiệu về tiếng Nhật.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'L2',
    lesson_title: 'Học bảng chữ cái Hiragana',
    video_url: 'video2.mp4',
    description: 'Bài học về bảng chữ cái Hiragana.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'L3',
    lesson_title: 'Học bảng chữ cái Katakana',
    video_url: 'video3.mp4',
    description: 'Bài học về bảng chữ cái Katakana.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'L4',
    lesson_title: 'Ngữ pháp cơ bản',
    video_url: 'video4.mp4',
    description: 'Bài học ngữ pháp cơ bản.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[2]._id,
    lesson_id: 'L5',
    lesson_title: 'Từ vựng về gia đình',
    video_url: 'video5.mp4',
    description: 'Bài học từ vựng về gia đình.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[2]._id,
    lesson_id: 'L6',
    lesson_title: 'Câu hỏi và câu trả lời',
    video_url: 'video6.mp4',
    description: 'Bài học về cách đặt câu hỏi và trả lời.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[3]._id,
    lesson_id: 'L7',
    lesson_title: 'Học từ vựng về thời gian',
    video_url: 'video7.mp4',
    description: 'Bài học từ vựng về thời gian.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[3]._id,
    lesson_id: 'L8',
    lesson_title: 'Thì hiện tại đơn',
    video_url: 'video8.mp4',
    description: 'Bài học về thì hiện tại đơn.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[4]._id,
    lesson_id: 'L9',
    lesson_title: 'Học từ vựng về đồ vật',
    video_url: 'video9.mp4',
    description: 'Bài học từ vựng về đồ vật.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[4]._id,
    lesson_id: 'L10',
    lesson_title: 'Thì quá khứ đơn',
    video_url: 'video10.mp4',
    description: 'Bài học về thì quá khứ đơn.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[5]._id,
    lesson_id: 'L11',
    lesson_title: 'Học từ vựng về món ăn',
    video_url: 'video11.mp4',
    description: 'Bài học từ vựng về món ăn.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[5]._id,
    lesson_id: 'L12',
    lesson_title: 'Thì tương lai đơn',
    video_url: 'video12.mp4',
    description: 'Bài học về thì tương lai đơn.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[6]._id,
    lesson_id: 'L13',
    lesson_title: 'Học từ vựng về cảm xúc',
    video_url: 'video13.mp4',
    description: 'Bài học từ vựng về cảm xúc.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[6]._id,
    lesson_id: 'L14',
    lesson_title: 'Cách diễn đạt cảm xúc',
    video_url: 'video14.mp4',
    description: 'Bài học về cách diễn đạt cảm xúc.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[7]._id,
    lesson_id: 'L15',
    lesson_title: 'Học từ vựng về thời tiết',
    video_url: 'video15.mp4',
    description: 'Bài học từ vựng về thời tiết.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[7]._id,
    lesson_id: 'L16',
    lesson_title: 'Thì hiện tại tiếp diễn',
    video_url: 'video16.mp4',
    description: 'Bài học về thì hiện tại tiếp diễn.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[8]._id,
    lesson_id: 'L17',
    lesson_title: 'Học từ vựng về địa điểm',
    video_url: 'video17.mp4',
    description: 'Bài học từ vựng về địa điểm.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[8]._id,
    lesson_id: 'L18',
    lesson_title: 'Cách chỉ đường',
    video_url: 'video18.mp4',
    description: 'Bài học về cách chỉ đường.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[9]._id,
    lesson_id: 'L19',
    lesson_title: 'Học từ vựng về phương tiện',
    video_url: 'video19.mp4',
    description: 'Bài học từ vựng về phương tiện.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[9]._id,
    lesson_id: 'L20',
    lesson_title: 'Cách đặt câu hỏi',
    video_url: 'video20.mp4',
    description: 'Bài học về cách đặt câu hỏi.',
    isPublic: true,
    contents: { vocabulary: [], grammar: [], kaiwa: [] }
  }
]
const vocabularies = [
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[0]._id,
    word: 'こんにちは',
    kanji: '',
    kana: 'こんにちは',
    meaning: 'Xin chào',
    audio: 'audio1.mp3',
    example: 'こんにちは、私の名前はAです。',
    tags: 'greeting',
    notes: 'Lời chào thông thường.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[1]._id,
    word: 'さようなら',
    kanji: '',
    kana: 'さようなら',
    meaning: 'Tạm biệt',
    audio: 'audio2.mp3',
    example: 'さようなら、また会いましょう。',
    tags: 'farewell',
    notes: 'Sử dụng khi chia tay.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[2]._id,
    word: 'ありがとう',
    kanji: '',
    kana: 'ありがとう',
    meaning: 'Cảm ơn',
    audio: 'audio3.mp3',
    example: 'ありがとう、助かります。',
    tags: 'gratitude',
    notes: 'Lời cảm ơn.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[3]._id,
    word: 'はい',
    kanji: '',
    kana: 'はい',
    meaning: 'Vâng',
    audio: 'audio4.mp3',
    example: 'はい、そうです。',
    tags: 'affirmation',
    notes: 'Dùng để đồng ý.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[4]._id,
    word: 'いいえ',
    kanji: '',
    kana: 'いいえ',
    meaning: 'Không',
    audio: 'audio5.mp3',
    example: 'いいえ、違います。',
    tags: 'negation',
    notes: 'Dùng để từ chối.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[5]._id,
    word: 'おはよう',
    kanji: '',
    kana: 'おはよう',
    meaning: 'Chào buổi sáng',
    audio: 'audio6.mp3',
    example: 'おはよう、今日も頑張りましょう。',
    tags: 'greeting',
    notes: 'Lời chào buổi sáng.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[6]._id,
    word: 'こんばんは',
    kanji: '',
    kana: 'こんばんは',
    meaning: 'Chào buổi tối',
    audio: 'audio7.mp3',
    example: 'こんばんは、いい夜を。',
    tags: 'greeting',
    notes: 'Lời chào buổi tối.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[7]._id,
    word: 'すみません',
    kanji: '',
    kana: 'すみません',
    meaning: 'Xin lỗi',
    audio: 'audio8.mp3',
    example: 'すみません、遅れました。',
    tags: 'apology',
    notes: 'Dùng để xin lỗi.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[8]._id,
    word: 'お元気ですか',
    kanji: '',
    kana: 'おげんきですか',
    meaning: 'Bạn khỏe không?',
    audio: 'audio9.mp3',
    example: 'お元気ですか、久しぶりですね。',
    tags: 'inquiry',
    notes: 'Hỏi thăm sức khỏe.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[9]._id,
    word: '行きます',
    kanji: '行く',
    kana: 'いきます',
    meaning: 'Đi',
    audio: 'audio10.mp3',
    example: '私は学校に行きます。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động đi.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[10]._id,
    word: '食べます',
    kanji: '食べる',
    kana: 'たべます',
    meaning: 'Ăn',
    audio: 'audio11.mp3',
    example: '私はご飯を食べます。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động ăn.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[11]._id,
    word: '飲みます',
    kanji: '飲む',
    kana: 'のみます',
    meaning: 'Uống',
    audio: 'audio12.mp3',
    example: '私は水を飲みます。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động uống.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[12]._id,
    word: '見ます',
    kanji: '見る',
    kana: 'みます',
    meaning: 'Xem',
    audio: 'audio13.mp3',
    example: '私は映画を見ます。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động xem.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[13]._id,
    word: '聞きます',
    kanji: '聞く',
    kana: 'ききます',
    meaning: 'Nghe',
    audio: 'audio14.mp3',
    example: '私は音楽を聞きます。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động nghe.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[14]._id,
    word: '話します',
    kanji: '話す',
    kana: 'はなします',
    meaning: 'Nói',
    audio: 'audio15.mp3',
    example: '私は日本語を話します。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động nói.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[15]._id,
    word: '書きます',
    kanji: '書く',
    kana: 'かきます',
    meaning: 'Viết',
    audio: 'audio16.mp3',
    example: '私は手紙を書きます。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động viết.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[16]._id,
    word: '買います',
    kanji: '買う',
    kana: 'かいます',
    meaning: 'Mua',
    audio: 'audio17.mp3',
    example: '私は本を買います。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động mua.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[17]._id,
    word: '売ります',
    kanji: '売る',
    kana: 'うります',
    meaning: 'Bán',
    audio: 'audio18.mp3',
    example: '私は果物を売ります。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động bán.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[18]._id,
    word: '遊びます',
    kanji: '遊ぶ',
    kana: 'あそびます',
    meaning: 'Chơi',
    audio: 'audio19.mp3',
    example: '私は友達と遊びます。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động chơi.'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[19]._id,
    word: '寝ます',
    kanji: '寝る',
    kana: 'ねます',
    meaning: 'Ngủ',
    audio: 'audio20.mp3',
    example: '私は早く寝ます。',
    tags: 'verb',
    notes: 'Động từ chỉ hành động ngủ.'
  }
]

const grammars = [
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[0]._id,
    title: 'Câu khẳng định',
    structure: 'S + V + O',
    explain: 'Câu khẳng định được sử dụng để diễn đạt một hành động.',
    examples: [{ ja: '私は日本に行きます。', vi: 'Tôi đi Nhật Bản.' }],
    level: 'N5',
    mean: 'Câu khẳng định'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[1]._id,
    title: 'Câu phủ định',
    structure: 'S + V + ない',
    explain: 'Câu phủ định được sử dụng để diễn đạt một hành động không xảy ra.',
    examples: [{ ja: '私は行きません。', vi: 'Tôi không đi.' }],
    level: 'N5',
    mean: 'Câu phủ định'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[2]._id,
    title: 'Câu hỏi',
    structure: 'S + V + か',
    explain: 'Câu hỏi được sử dụng để yêu cầu thông tin.',
    examples: [{ ja: 'あなたは学生ですか？', vi: 'Bạn là sinh viên phải không?' }],
    level: 'N5',
    mean: 'Câu hỏi'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[3]._id,
    title: 'Thì hiện tại',
    structure: 'S + V',
    explain: 'Thì hiện tại diễn tả hành động đang diễn ra hoặc thói quen.',
    examples: [{ ja: '彼は毎日勉強します。', vi: 'Anh ấy học mỗi ngày.' }],
    level: 'N5',
    mean: 'Thì hiện tại'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[4]._id,
    title: 'Thì quá khứ',
    structure: 'S + Vた',
    explain: 'Thì quá khứ diễn tả hành động đã xảy ra.',
    examples: [{ ja: '私は昨日映画を見ました。', vi: 'Tôi đã xem phim hôm qua.' }],
    level: 'N5',
    mean: 'Thì quá khứ'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[5]._id,
    title: 'Thì tương lai',
    structure: 'S + V sẽ',
    explain: 'Thì tương lai diễn tả hành động sẽ xảy ra.',
    examples: [{ ja: '私は明日行きます。', vi: 'Tôi sẽ đi ngày mai.' }],
    level: 'N5',
    mean: 'Thì tương lai'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[6]._id,
    title: 'Câu điều kiện',
    structure: 'S + V + ば',
    explain: 'Câu điều kiện diễn tả điều kiện cần thiết để một hành động xảy ra.',
    examples: [{ ja: '雨が降れば、行きません。', vi: 'Nếu trời mưa, tôi sẽ không đi.' }],
    level: 'N5',
    mean: 'Câu điều kiện'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[7]._id,
    title: 'Câu mệnh lệnh',
    structure: 'Vてください',
    explain: 'Câu mệnh lệnh được sử dụng để yêu cầu ai đó làm gì.',
    examples: [{ ja: 'これを見てください。', vi: 'Hãy xem cái này.' }],
    level: 'N5',
    mean: 'Câu mệnh lệnh'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[8]._id,
    title: 'Câu so sánh',
    structure: 'AはBよりC',
    explain: 'Câu so sánh được sử dụng để so sánh hai đối tượng.',
    examples: [{ ja: '彼は私より背が高い。', vi: 'Anh ấy cao hơn tôi.' }],
    level: 'N5',
    mean: 'Câu so sánh'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[9]._id,
    title: 'Câu phức',
    structure: 'S1 + V + から, S2',
    explain: 'Câu phức được sử dụng để diễn đạt mối quan hệ giữa hai hành động.',
    examples: [{ ja: '私は疲れたから、寝ます。', vi: 'Tôi mệt nên tôi sẽ ngủ.' }],
    level: 'N5',
    mean: 'Câu phức'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[10]._id,
    title: 'Thì hiện tại tiếp diễn',
    structure: 'S + Vています',
    explain: 'Thì hiện tại tiếp diễn diễn tả hành động đang diễn ra tại thời điểm nói.',
    examples: [{ ja: '私は今勉強しています。', vi: 'Tôi đang học bây giờ.' }],
    level: 'N5',
    mean: 'Thì hiện tại tiếp diễn'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[11]._id,
    title: 'Câu hỏi đuôi',
    structure: 'S + V + ね',
    explain: 'Câu hỏi đuôi được sử dụng để xác nhận thông tin.',
    examples: [{ ja: '今日も暑いですね。', vi: 'Hôm nay cũng nóng nhỉ?' }],
    level: 'N5',
    mean: 'Câu hỏi đuôi'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[12]._id,
    title: 'Thì quá khứ tiếp diễn',
    structure: 'S + Vていました',
    explain: 'Thì quá khứ tiếp diễn diễn tả hành động đang diễn ra trong quá khứ.',
    examples: [{ ja: '私はその時、勉強していました。', vi: 'Tôi đang học vào lúc đó.' }],
    level: 'N5',
    mean: 'Thì quá khứ tiếp diễn'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[13]._id,
    title: 'Câu hỏi với trợ từ',
    structure: 'S + V + かどうか',
    explain: 'Câu hỏi với trợ từ được sử dụng để hỏi về sự thật.',
    examples: [{ ja: '彼が来るかどうか分からない。', vi: 'Tôi không biết anh ấy có đến không.' }],
    level: 'N5',
    mean: 'Câu hỏi với trợ từ'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[14]._id,
    title: 'Thì hiện tại hoàn thành',
    structure: 'S + Vたことがある',
    explain:
      'Thì hiện tại hoàn thành diễn tả hành động đã xảy ra trong quá khứ và có liên quan đến hiện tại.',
    examples: [{ ja: '私は日本に行ったことがあります。', vi: 'Tôi đã từng đi Nhật Bản.' }],
    level: 'N5',
    mean: 'Thì hiện tại hoàn thành'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[15]._id,
    title: 'Câu khẳng định phủ định',
    structure: 'S + V + ない',
    explain: 'Câu khẳng định phủ định được sử dụng để phủ nhận một điều khẳng định.',
    examples: [{ ja: '私は学生ではない。', vi: 'Tôi không phải là sinh viên.' }],
    level: 'N5',
    mean: 'Câu khẳng định phủ định'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[16]._id,
    title: 'Câu điều kiện với たら',
    structure: 'S + Vたら',
    explain: 'Câu điều kiện với たら diễn tả điều kiện và kết quả.',
    examples: [{ ja: '雨が降ったら、行きません。', vi: 'Nếu trời mưa, tôi sẽ không đi.' }],
    level: 'N5',
    mean: 'Câu điều kiện với たら'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[17]._id,
    title: 'Câu nhấn mạnh',
    structure: 'S + V + も',
    explain: 'Câu nhấn mạnh được sử dụng để nhấn mạnh một điều gì đó.',
    examples: [{ ja: '何があっても行きます。', vi: 'Dù có chuyện gì xảy ra tôi cũng sẽ đi.' }],
    level: 'N5',
    mean: 'Câu nhấn mạnh'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[18]._id,
    title: 'Câu hỏi với trợ từ も',
    structure: 'S + V + も',
    explain: 'Câu hỏi với trợ từ も được sử dụng để hỏi về nhiều sự vật.',
    examples: [{ ja: '彼も来ますか？', vi: 'Cô ấy cũng đến phải không?' }],
    level: 'N5',
    mean: 'Câu hỏi với trợ từ も'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    lesson: lessons[19]._id,
    title: 'Câu nhấn mạnh với も',
    structure: 'S + V + も',
    explain: 'Câu nhấn mạnh với も được sử dụng để nhấn mạnh một điều gì đó.',
    examples: [{ ja: '私も行きます。', vi: 'Tôi cũng sẽ đi.' }],
    level: 'N5',
    mean: 'Câu nhấn mạnh với も'
  }
]

const kanjis = [
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '日',
    cn_vi_word: 'Ngày',
    component: ['Nguyệt', 'Nhật'],
    examples: [
      { ja: '今日はいい天気です。', hira: 'きょうはいいてんきです。', vi: 'Hôm nay thời tiết đẹp.' }
    ],
    explain: 'Ngày, mặt trời',
    jlpt: 'N5',
    kunyomi: ['ひ', 'か'],
    mean: 'Ngày',
    onyomi: ['ニチ', 'ジツ'],
    stroke_num: 4,
    svg_path: 'path_to_svg',
    unicode: 'U+65E5'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '月',
    cn_vi_word: 'Tháng',
    component: ['Nguyệt'],
    examples: [
      { ja: '今月は忙しいです。', hira: 'こんげつはいそがしいです。', vi: 'Tháng này bận rộn.' }
    ],
    explain: 'Tháng, mặt trăng',
    jlpt: 'N5',
    kunyomi: ['つき'],
    mean: 'Tháng',
    onyomi: ['ゲツ', 'ガツ'],
    stroke_num: 4,
    svg_path: 'path_to_svg',
    unicode: 'U+6708'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '火',
    cn_vi_word: 'Lửa',
    component: ['Hỏa'],
    examples: [{ ja: '火事が起きました。', hira: 'かじがおきました。', vi: 'Đã xảy ra hỏa hoạn.' }],
    explain: 'Lửa',
    jlpt: 'N5',
    kunyomi: ['ひ'],
    mean: 'Lửa',
    onyomi: ['カ'],
    stroke_num: 4,
    svg_path: 'path_to_svg',
    unicode: 'U+706B'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '水',
    cn_vi_word: 'Nước',
    component: ['Thủy'],
    examples: [{ ja: '水を飲みます。', hira: 'みずをのみます。', vi: 'Tôi uống nước.' }],
    explain: 'Nước',
    jlpt: 'N5',
    kunyomi: ['みず'],
    mean: 'Nước',
    onyomi: ['スイ'],
    stroke_num: 4,
    svg_path: 'path_to_svg',
    unicode: 'U+6C34'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '木',
    cn_vi_word: 'Cây',
    component: ['Mộc'],
    examples: [
      { ja: '木がたくさんあります。', hira: 'きがたくさんあります。', vi: 'Có nhiều cây.' }
    ],
    explain: 'Cây',
    jlpt: 'N5',
    kunyomi: ['き'],
    mean: 'Cây',
    onyomi: ['ボク', 'モク'],
    stroke_num: 4,
    svg_path: 'path_to_svg',
    unicode: 'U+6728'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '金',
    cn_vi_word: 'Vàng',
    component: ['Kim'],
    examples: [{ ja: '金が好きです。', hira: 'きんがすきです。', vi: 'Tôi thích vàng.' }],
    explain: 'Vàng, tiền',
    jlpt: 'N5',
    kunyomi: ['かね'],
    mean: 'Vàng',
    onyomi: ['キン', 'コン'],
    stroke_num: 8,
    svg_path: 'path_to_svg',
    unicode: 'U+91D1'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '土',
    cn_vi_word: 'Đất',
    component: ['Thổ'],
    examples: [{ ja: '土が柔らかいです。', hira: 'つちがやわらかいです。', vi: 'Đất mềm.' }],
    explain: 'Đất',
    jlpt: 'N5',
    kunyomi: ['つち'],
    mean: 'Đất',
    onyomi: ['ド', 'ト'],
    stroke_num: 3,
    svg_path: 'path_to_svg',
    unicode: 'U+571F'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '山',
    cn_vi_word: 'Núi',
    component: ['Sơn'],
    examples: [{ ja: '山に登ります。', hira: 'やまにのぼります。', vi: 'Tôi leo núi.' }],
    explain: 'Núi',
    jlpt: 'N5',
    kunyomi: ['やま'],
    mean: 'Núi',
    onyomi: ['サン', 'ザン'],
    stroke_num: 3,
    svg_path: 'path_to_svg',
    unicode: 'U+5C71'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '川',
    cn_vi_word: 'Sông',
    component: ['Xuyên'],
    examples: [{ ja: '川で泳ぎます。', hira: 'かわでおよぎます。', vi: 'Tôi bơi ở sông.' }],
    explain: 'Sông',
    jlpt: 'N5',
    kunyomi: ['かわ'],
    mean: 'Sông',
    onyomi: ['セン'],
    stroke_num: 5,
    svg_path: 'path_to_svg',
    unicode: 'U+5DDD'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '田',
    cn_vi_word: 'Ruộng',
    component: ['Điền'],
    examples: [
      { ja: '田んぼで働きます。', hira: 'たんぼではたらきます。', vi: 'Tôi làm việc ở ruộng.' }
    ],
    explain: 'Ruộng',
    jlpt: 'N5',
    kunyomi: ['た'],
    mean: 'Ruộng',
    onyomi: ['デン'],
    stroke_num: 5,
    svg_path: 'path_to_svg',
    unicode: 'U+7530'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '空',
    cn_vi_word: 'Trời',
    component: ['Không'],
    examples: [{ ja: '空は青いです。', hira: 'そらはあおいです。', vi: 'Trời xanh.' }],
    explain: 'Trời',
    jlpt: 'N5',
    kunyomi: ['そら'],
    mean: 'Trời',
    onyomi: ['クウ'],
    stroke_num: 8,
    svg_path: 'path_to_svg',
    unicode: 'U+7A7A'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '雨',
    cn_vi_word: 'Mưa',
    component: ['Vũ'],
    examples: [{ ja: '雨が降っています。', hira: 'あめがふっています。', vi: 'Trời đang mưa.' }],
    explain: 'Mưa',
    jlpt: 'N5',
    kunyomi: ['あめ'],
    mean: 'Mưa',
    onyomi: ['ウ'],
    stroke_num: 8,
    svg_path: 'path_to_svg',
    unicode: 'U+96E8'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '風',
    cn_vi_word: 'Gió',
    component: ['Phong'],
    examples: [{ ja: '風が強いです。', hira: 'かぜがつよいです。', vi: 'Gió mạnh.' }],
    explain: 'Gió',
    jlpt: 'N5',
    kunyomi: ['かぜ'],
    mean: 'Gió',
    onyomi: ['フウ'],
    stroke_num: 9,
    svg_path: 'path_to_svg',
    unicode: 'U+98A8'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '光',
    cn_vi_word: 'Ánh sáng',
    component: ['Quang'],
    examples: [
      { ja: '光が眩しいです。', hira: 'ひかりがまぶしいです。', vi: 'Ánh sáng chói mắt.' }
    ],
    explain: 'Ánh sáng',
    jlpt: 'N5',
    kunyomi: ['ひかり'],
    mean: 'Ánh sáng',
    onyomi: ['コウ'],
    stroke_num: 9,
    svg_path: 'path_to_svg',
    unicode: 'U+5149'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '音',
    cn_vi_word: 'Âm thanh',
    component: ['Âm'],
    examples: [
      { ja: '音が聞こえます。', hira: 'おとがきこえます。', vi: 'Có thể nghe thấy âm thanh.' }
    ],
    explain: 'Âm thanh',
    jlpt: 'N5',
    kunyomi: ['おと'],
    mean: 'Âm thanh',
    onyomi: ['オン'],
    stroke_num: 9,
    svg_path: 'path_to_svg',
    unicode: 'U+97F3'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '音',
    cn_vi_word: 'Âm thanh',
    component: ['Âm'],
    examples: [
      { ja: '音が聞こえます。', hira: 'おとがきこえます。', vi: 'Có thể nghe thấy âm thanh.' }
    ],
    explain: 'Âm thanh',
    jlpt: 'N5',
    kunyomi: ['おと'],
    mean: 'Âm thanh',
    onyomi: ['オン'],
    stroke_num: 9,
    svg_path: 'path_to_svg',
    unicode: 'U+97F3'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '色',
    cn_vi_word: 'Màu sắc',
    component: ['Sắc'],
    examples: [{ ja: '色がきれいです。', hira: 'いろがきれいです。', vi: 'Màu sắc đẹp.' }],
    explain: 'Màu sắc',
    jlpt: 'N5',
    kunyomi: ['いろ'],
    mean: 'Màu sắc',
    onyomi: ['ショク', 'シキ'],
    stroke_num: 6,
    svg_path: 'path_to_svg',
    unicode: 'U+8272'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '花',
    cn_vi_word: 'Hoa',
    component: ['Hoa'],
    examples: [{ ja: '花が咲いています。', hira: 'はながさいています。', vi: 'Hoa đang nở.' }],
    explain: 'Hoa',
    jlpt: 'N5',
    kunyomi: ['はな'],
    mean: 'Hoa',
    onyomi: ['カ'],
    stroke_num: 7,
    svg_path: 'path_to_svg',
    unicode: 'U+82B1'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '鳥',
    cn_vi_word: 'Chim',
    component: ['Điểu'],
    examples: [{ ja: '鳥が飛んでいます。', hira: 'とりがとんでいます。', vi: 'Chim đang bay.' }],
    explain: 'Chim',
    jlpt: 'N5',
    kunyomi: ['とり'],
    mean: 'Chim',
    onyomi: ['チョウ'],
    stroke_num: 11,
    svg_path: 'path_to_svg',
    unicode: 'U+9CE5'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '魚',
    cn_vi_word: 'Cá',
    component: ['Ngư'],
    examples: [{ ja: '魚が泳いでいます。', hira: 'さかながおよいでいます。', vi: 'Cá đang bơi.' }],
    explain: 'Cá',
    jlpt: 'N5',
    kunyomi: ['さかな'],
    mean: 'Cá',
    onyomi: ['ギョ'],
    stroke_num: 11,
    svg_path: 'path_to_svg',
    unicode: 'U+9B5A'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '米',
    cn_vi_word: 'Gạo',
    component: ['Mễ'],
    examples: [{ ja: '米が美味しいです。', hira: 'こめがおいしいです。', vi: 'Gạo rất ngon.' }],
    explain: 'Gạo',
    jlpt: 'N5',
    kunyomi: ['こめ'],
    mean: 'Gạo',
    onyomi: ['ベイ', 'マイ'],
    stroke_num: 6,
    svg_path: 'path_to_svg',
    unicode: 'U+7C73'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '肉',
    cn_vi_word: 'Thịt',
    component: ['Nhục'],
    examples: [{ ja: '肉が好きです。', hira: 'にくがすきです。', vi: 'Tôi thích thịt.' }],
    explain: 'Thịt',
    jlpt: 'N5',
    kunyomi: ['にく'],
    mean: 'Thịt',
    onyomi: ['ニク'],
    stroke_num: 6,
    svg_path: 'path_to_svg',
    unicode: 'U+8089'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '野',
    cn_vi_word: 'Đồng ruộng',
    component: ['Dã'],
    examples: [
      { ja: '野原で遊びます。', hira: 'のはらであそびます。', vi: 'Tôi chơi ở đồng ruộng.' }
    ],
    explain: 'Đồng ruộng',
    jlpt: 'N5',
    kunyomi: ['の'],
    mean: 'Đồng ruộng',
    onyomi: ['ヤ'],
    stroke_num: 8,
    svg_path: 'path_to_svg',
    unicode: '91CE'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '空',
    cn_vi_word: 'Bầu trời',
    component: ['Không'],
    examples: [{ ja: '空が青いです。', hira: 'そらがあおいです。', vi: 'Bầu trời xanh.' }],
    explain: 'Bầu trời',
    jlpt: 'N5',
    kunyomi: ['そら'],
    mean: 'Bầu trời',
    onyomi: ['クウ'],
    stroke_num: 8,
    svg_path: 'path_to_svg',
    unicode: 'U+7A7A'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    kanji: '道',
    cn_vi_word: 'Đường',
    component: ['Đạo'],
    examples: [{ ja: '道を歩きます。', hira: 'みちをあるきます。', vi: 'Tôi đi bộ trên đường.' }],
    explain: 'Đường',
    jlpt: 'N5',
    kunyomi: ['みち'],
    mean: 'Đường',
    onyomi: ['ドウ'],
    stroke_num: 12,
    svg_path: 'path_to_svg',
    unicode: 'U+9053'
  }
]

const decks = [
  { _id: new mongoose.Types.ObjectId(), user: users[0]._id, deck_title: 'Deck 1 - Từ vựng cơ bản' },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[0]._id,
    deck_title: 'Deck 2 - Ngữ pháp cơ bản'
  },
  { _id: new mongoose.Types.ObjectId(), user: users[1]._id, deck_title: 'Deck 3 - Kanji cơ bản' },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[1]._id,
    deck_title: 'Deck 4 - Từ vựng về gia đình'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[2]._id,
    deck_title: 'Deck 5 - Từ vựng về thời gian'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[2]._id,
    deck_title: 'Deck 6 - Ngữ pháp nâng cao'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[3]._id,
    deck_title: 'Deck 7 - Từ vựng về món ăn'
  },
  { _id: new mongoose.Types.ObjectId(), user: users[3]._id, deck_title: 'Deck 8 - Kanji nâng cao' },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[4]._id,
    deck_title: 'Deck 9 - Câu hỏi và câu trả lời'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[4]._id,
    deck_title: 'Deck 10 - Từ vựng về cảm xúc'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[5]._id,
    deck_title: 'Deck 11 - Từ vựng về địa điểm'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[5]._id,
    deck_title: 'Deck 12 - Ngữ pháp phức tạp'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[6]._id,
    deck_title: 'Deck 13 - Từ vựng về đồ vật'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[6]._id,
    deck_title: 'Deck 14 - Thì hiện tại hoàn thành'
  },
  { _id: new mongoose.Types.ObjectId(), user: users[7]._id, deck_title: 'Deck 15 - Câu điều kiện' },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[7]._id,
    deck_title: 'Deck 16 - Từ vựng về thời tiết'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[8]._id,
    deck_title: 'Deck 17 - Từ vựng về phương tiện'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[8]._id,
    deck_title: 'Deck 18 - Ngữ pháp với trợ từ'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[9]._id,
    deck_title: 'Deck 19 - Từ vựng về hoạt động hàng ngày'
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[9]._id,
    deck_title: 'Deck 20 - Câu hỏi với trợ từ'
  }
]

const flashcards = [
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[0]._id,
    vocab: vocabularies[0]._id,
    kanji: kanjis[0]._id,
    deck: decks[0]._id,
    front: 'こんにちは',
    back: 'Xin chào',
    tags: ['greeting'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[1]._id,
    vocab: vocabularies[1]._id,
    kanji: kanjis[1]._id,
    deck: decks[0]._id,
    front: 'さようなら',
    back: 'Tạm biệt',
    tags: ['farewell'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[2]._id,
    vocab: vocabularies[2]._id,
    kanji: kanjis[2]._id,
    deck: decks[1]._id,
    front: 'ありがとう',
    back: 'Cảm ơn',
    tags: ['gratitude'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[3]._id,
    vocab: vocabularies[3]._id,
    kanji: kanjis[3]._id,
    deck: decks[1]._id,
    front: 'はい',
    back: 'Vâng',
    tags: ['affirmation'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[4]._id,
    vocab: vocabularies[4]._id,
    kanji: kanjis[4]._id,
    deck: decks[2]._id,
    front: 'いいえ',
    back: 'Không',
    tags: ['negation'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[5]._id,
    vocab: vocabularies[5]._id,
    kanji: kanjis[5]._id,
    deck: decks[2]._id,
    front: 'おはよう',
    back: 'Chào buổi sáng',
    tags: ['greeting'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[6]._id,
    vocab: vocabularies[6]._id,
    kanji: kanjis[6]._id,
    deck: decks[3]._id,
    front: 'こんばんは',
    back: 'Chào buổi tối',
    tags: ['greeting'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[7]._id,
    vocab: vocabularies[7]._id,
    kanji: kanjis[7]._id,
    deck: decks[3]._id,
    front: 'すみません',
    back: 'Xin lỗi',
    tags: ['apology'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[8]._id,
    vocab: vocabularies[8]._id,
    kanji: kanjis[8]._id,
    deck: decks[4]._id,
    front: 'お元気ですか',
    back: 'Bạn khỏe không?',
    tags: ['inquiry'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[9]._id,
    vocab: vocabularies[9]._id,
    kanji: kanjis[9]._id,
    deck: decks[4]._id,
    front: '行きます',
    back: 'Đi',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[10]._id,
    vocab: vocabularies[10]._id,
    kanji: kanjis[10]._id,
    deck: decks[5]._id,
    front: '食べます',
    back: 'Ăn',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[11]._id,
    vocab: vocabularies[11]._id,
    kanji: kanjis[11]._id,
    deck: decks[5]._id,
    front: '飲みます',
    back: 'Uống',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[12]._id,
    vocab: vocabularies[12]._id,
    kanji: kanjis[12]._id,
    deck: decks[6]._id,
    front: '見ます',
    back: 'Xem',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[13]._id,
    vocab: vocabularies[13]._id,
    kanji: kanjis[13]._id,
    deck: decks[6]._id,
    front: '聞きます',
    back: 'Nghe',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[14]._id,
    vocab: vocabularies[14]._id,
    kanji: kanjis[14]._id,
    deck: decks[7]._id,
    front: '話します',
    back: 'Nói',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[15]._id,
    vocab: vocabularies[15]._id,
    kanji: kanjis[15]._id,
    deck: decks[7]._id,
    front: '書きます',
    back: 'Viết',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[16]._id,
    vocab: vocabularies[16]._id,
    kanji: kanjis[16]._id,
    deck: decks[8]._id,
    front: '買います',
    back: 'Mua',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[17]._id,
    vocab: vocabularies[17]._id,
    kanji: kanjis[17]._id,
    deck: decks[8]._id,
    front: '売ります',
    back: 'Bán',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[18]._id,
    vocab: vocabularies[18]._id,
    kanji: kanjis[18]._id,
    deck: decks[9]._id,
    front: '遊びます',
    back: 'Chơi',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  },
  {
    _id: new mongoose.Types.ObjectId(),
    grammar: grammars[19]._id,
    vocab: vocabularies[19]._id,
    kanji: kanjis[19]._id,
    deck: decks[9]._id,
    front: '寝ます',
    back: 'Ngủ',
    tags: ['verb'],
    reviewDate: new Date(),
    interval: 1
  }
]
const exams = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Kiểm tra Ngữ pháp Cơ bản',
    time_limit: 30,
    total_points: 100,
    level: 'N5',
    isPublish: true,
    tags: 'ngữ pháp, cơ bản',
    contents: [
      {
        type: 'Ngữ pháp',
        dokkai_text: 'Đọc hiểu đoạn văn ngắn.',
        dokkai_ask: [
          {
            content_text: 'Câu nào sau đây là đúng?',
            value: 'A',
            quiz: ['A. Đúng', 'B. Sai'],
            point: 10
          }
        ],
        content_text: 'Hãy chọn câu đúng.',
        point: 10,
        value: 'A',
        url_audio: null,
        quiz: ['Câu hỏi 1', 'Câu hỏi 2']
      },
      {
        type: 'Từ vựng',
        dokkai_text: 'Hãy nghe và chọn từ đúng.',
        dokkai_ask: [
          {
            content_text: "Từ nào có nghĩa là 'Cá'?",
            value: 'Cá',
            quiz: ['Cá', 'Chó'],
            point: 10
          }
        ],
        content_text: 'Chọn từ đúng.',
        point: 10,
        value: 'Cá',
        url_audio: 'url_to_audio_file',
        quiz: ['Câu hỏi 3', 'Câu hỏi 4']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Kiểm tra Từ vựng Nâng cao',
    time_limit: 45,
    total_points: 100,
    level: 'N3',
    isPublish: true,
    tags: 'từ vựng, nâng cao',
    contents: [
      {
        type: 'Từ vựng',
        dokkai_text: 'Hãy nghe và chọn từ đúng.',
        dokkai_ask: [
          {
            content_text: "Từ nào có nghĩa là 'Hạnh phúc'?",
            value: 'Hạnh phúc',
            quiz: ['Hạnh phúc', 'Buồn'],
            point: 10
          }
        ],
        content_text: 'Chọn từ đúng.',
        point: 10,
        value: 'Hạnh phúc',
        url_audio: 'url_to_audio_file',
        quiz: ['Câu hỏi 1', 'Câu hỏi 2']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Kiểm tra Nghe hiểu',
    time_limit: 20,
    total_points: 50,
    level: 'N4',
    isPublish: false,
    tags: 'nghe hiểu',
    contents: [
      {
        type: 'Nghe',
        dokkai_text: 'Hãy nghe đoạn hội thoại.',
        dokkai_ask: [
          {
            content_text: 'Ai là người nói chuyện?',
            value: 'Người A',
            quiz: ['Người A', 'Người B'],
            point: 10
          }
        ],
        content_text: 'Chọn người nói.',
        point: 10,
        value: 'Người A',
        url_audio: 'url_to_audio_file',
        quiz: ['Câu hỏi 1', 'Câu hỏi 2']
      }
    ]
  }
]
const progressions = [
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[0]._id,
    achievements: [
      { title: 'Hoàn thành khóa học Ngữ pháp', image: 'url_to_image' },
      { title: 'Đạt điểm cao trong bài kiểm tra', image: 'url_to_image' }
    ],
    progress: [
      {
        course: courses[0]._id,
        lessons: [lessons[0]._id, lessons[1]._id],
        lessonType: 'Lesson'
      },
      {
        course: courses[1]._id,
        lessons: [lessons[2]._id],
        lessonType: 'Hina'
      }
    ],
    examsProgress: [
      {
        exam: exams[0]._id,
        point: 90,
        note: 'Làm tốt'
      },
      {
        exam: exams[1]._id,
        point: 85,
        note: 'Cần cải thiện'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    user: users[1]._id,
    achievements: [{ title: 'Hoàn thành tất cả các bài kiểm tra', image: 'url_to_image' }],
    progress: [
      {
        course: courses[0]._id,
        lessons: [lessons[1]._id],
        lessonType: 'Lesson'
      }
    ],
    examsProgress: [
      {
        exam: exams[2]._id,
        point: 75,
        note: 'Cần ôn lại'
      }
    ]
  }
]
const notifications = [
  {
    _id: new mongoose.Types.ObjectId(),
    noti_type: 'EXAM-001',
    noti_senderId: users[1]._id,
    noti_receivedId: users[2]._id,
    noti_content: 'Bài kiểm tra mới đã được tạo.',
    noti_options: { examId: new mongoose.Types.ObjectId() }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    noti_type: 'EXAM-002',
    noti_senderId: users[1]._id,
    noti_receivedId: users[3]._id,
    noti_content: 'Thời gian bài kiểm tra sắp kết thúc.',
    noti_options: { examId: new mongoose.Types.ObjectId() }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    noti_type: 'COURSE-001',
    noti_senderId: users[1]._id,
    noti_receivedId: users[3]._id,
    noti_content: 'Khóa học mới đã được tạo.',
    noti_options: { courseId: new mongoose.Types.ObjectId() }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    noti_type: 'EXAM-001',
    noti_senderId: users[1]._id,
    noti_receivedId: users[4]._id,
    noti_content: 'Bài kiểm tra mới đã được tạo.',
    noti_options: { examId: new mongoose.Types.ObjectId() }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    noti_type: 'COURSE-001',
    noti_senderId: users[1]._id,
    noti_receivedId: users[5]._id,
    noti_content: 'Khóa học mới đã được tạo.',
    noti_options: { courseId: new mongoose.Types.ObjectId() }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    noti_type: 'EXAM-002',
    noti_senderId: users[1]._id,
    noti_receivedId: users[6]._id,
    noti_content: 'Thời gian bài kiểm tra sắp kết thúc.',
    noti_options: { examId: new mongoose.Types.ObjectId() }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    noti_type: 'EXAM-001',
    noti_senderId: users[1]._id,
    noti_receivedId: users[7]._id,
    noti_content: 'Bài kiểm tra mới đã được tạo.',
    noti_options: { examId: new mongoose.Types.ObjectId() }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    noti_type: 'COURSE-001',
    noti_senderId: users[1]._id,
    noti_receivedId: users[8]._id,
    noti_content: 'Khóa học mới đã được tạo.',
    noti_options: { courseId: new mongoose.Types.ObjectId() }
  },
  {
    _id: new mongoose.Types.ObjectId(),
    noti_type: 'EXAM-002',
    noti_senderId: users[1]._id,
    noti_receivedId: users[9]._id,
    noti_content: 'Thời gian bài kiểm tra sắp kết thúc.',
    noti_options: { examId: new mongoose.Types.ObjectId() }
  }
]
const hinas = [
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'HINA-001',
    lesson_title: 'Hiragana Cơ bản',
    name_type: 0,
    points: 20,
    words: [
      { word: 'あ', trans: 'A', audio: 'audio/a.mp3', svg_path: ['a'], note: 'Âm A' },
      { word: 'い', trans: 'I', audio: 'audio/i.mp3', svg_path: ['i'], note: 'Âm I' }
    ],
    questions: [
      {
        content: 'Câu nào là Hiragana?',
        image: 'image/hiragana.png',
        trans: 'Câu hỏi về Hiragana',
        sentence: 'Hãy chọn đúng.',
        value: 'あ',
        quiz: ['あ', 'ア'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'HINA-002',
    lesson_title: 'Katakana Cơ bản',
    name_type: 1,
    points: 20,
    words: [
      { word: 'ア', trans: 'A', audio: 'audio/a.mp3', svg_path: ['a'], note: 'Âm A Katakana' },
      { word: 'イ', trans: 'I', audio: 'audio/i.mp3', svg_path: ['i'], note: 'Âm I Katakana' }
    ],
    questions: [
      {
        content: 'Câu nào là Katakana?',
        image: 'image/katakana.png',
        trans: 'Câu hỏi về Katakana',
        sentence: 'Hãy chọn đúng.',
        value: 'ア',
        quiz: ['ア', 'あ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'HINA-003',
    lesson_title: 'Âm Vowels',
    name_type: 0,
    points: 30,
    words: [
      { word: 'う', trans: 'U', audio: 'audio/u.mp3', svg_path: ['u'], note: 'Âm U' },
      { word: 'え', trans: 'E', audio: 'audio/e.mp3', svg_path: ['e'], note: 'Âm E' }
    ],
    questions: [
      {
        content: 'Câu nào là âm U?',
        image: 'image/vowel.png',
        trans: 'Câu hỏi về âm U',
        sentence: 'Hãy chọn đúng.',
        value: 'う',
        quiz: ['う', 'ウ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'HINA-004',
    lesson_title: 'Âm Consonants',
    name_type: 1,
    points: 30,
    words: [
      { word: 'カ', trans: 'KA', audio: 'audio/ka.mp3', svg_path: ['ka'], note: 'Âm KA' },
      { word: 'キ', trans: 'KI', audio: 'audio/ki.mp3', svg_path: ['ki'], note: 'Âm KI' }
    ],
    questions: [
      {
        content: 'Câu nào là âm KA?',
        image: 'image/consonant.png',
        trans: 'Câu hỏi về âm KA',
        sentence: 'Hãy chọn đúng.',
        value: 'カ',
        quiz: ['カ', 'か'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'HINA-005',
    lesson_title: 'Hiragana Cách phát âm',
    name_type: 0,
    points: 25,
    words: [
      { word: 'お', trans: 'O', audio: 'audio/o.mp3', svg_path: ['o'], note: 'Âm O' },
      { word: 'ん', trans: 'N', audio: 'audio/n.mp3', svg_path: ['n'], note: 'Âm N' }
    ],
    questions: [
      {
        content: 'Câu nào là âm O?',
        image: 'image/hiragana_sound.png',
        trans: 'Câu hỏi về âm O',
        sentence: 'Hãy chọn đúng.',
        value: 'お',
        quiz: ['お', 'オ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'HINA-006',
    lesson_title: 'Katakana Cách phát âm',
    name_type: 1,
    points: 25,
    words: [
      { word: 'モ', trans: 'MO', audio: 'audio/mo.mp3', svg_path: ['mo'], note: 'Âm MO' },
      { word: 'ン', trans: 'N', audio: 'audio/n_ka.mp3', svg_path: ['n'], note: 'Âm N Katakana' }
    ],
    questions: [
      {
        content: 'Câu nào là âm MO?',
        image: 'image/katakana_sound.png',
        trans: 'Câu hỏi về âm MO',
        sentence: 'Hãy chọn đúng.',
        value: 'モ',
        quiz: ['モ', 'も'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'HINA-007',
    lesson_title: 'Hiragana Phát âm đôi',
    name_type: 0,
    points: 20,
    words: [
      { word: 'きゃ', trans: 'KYA', audio: 'audio/kya.mp3', svg_path: ['kya'], note: 'Âm KYA' },
      { word: 'きゅ', trans: 'KYU', audio: 'audio/kyu.mp3', svg_path: ['kyu'], note: 'Âm KYU' }
    ],
    questions: [
      {
        content: 'Câu nào là âm KYA?',
        image: 'image/hiragana_double.png',
        trans: 'Câu hỏi về âm KYA',
        sentence: 'Hãy chọn đúng.',
        value: 'きゃ',
        quiz: ['きゃ', 'キャ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'HINA-008',
    lesson_title: 'Katakana Phát âm đôi',
    name_type: 1,
    points: 20,
    words: [
      {
        word: 'キャ',
        trans: 'KYA',
        audio: 'audio/kya_ka.mp3',
        svg_path: ['kya'],
        note: 'Âm KYA Katakana'
      },
      {
        word: 'キュ',
        trans: 'KYU',
        audio: 'audio/kyu_ka.mp3',
        svg_path: ['kyu'],
        note: 'Âm KYU Katakana'
      }
    ],
    questions: [
      {
        content: 'Câu nào là âm KYA Katakana?',
        image: 'image/katakana_double.png',
        trans: 'Câu hỏi về âm KYA Katakana',
        sentence: 'Hãy chọn đúng.',
        value: 'キャ',
        quiz: ['キャ', 'きゃ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'HINA-009',
    lesson_title: 'Hiragana Tổng hợp',
    name_type: 0,
    points: 30,
    words: [
      { word: 'さ', trans: 'SA', audio: 'audio/sa.mp3', svg_path: ['sa'], note: 'Âm SA' },
      { word: 'し', trans: 'SHI', audio: 'audio/shi.mp3', svg_path: ['shi'], note: 'Âm SHI' }
    ],
    questions: [
      {
        content: 'Câu nào là âm SA?',
        image: 'image/hiragana_summary.png',
        trans: 'Câu hỏi về âm SA',
        sentence: 'Hãy chọn đúng.',
        value: 'さ',
        quiz: ['さ', 'サ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'HINA-010',
    lesson_title: 'Katakana Tổng hợp',
    name_type: 1,
    points: 30,
    words: [
      {
        word: 'サ',
        trans: 'SA',
        audio: 'audio/sa_ka.mp3',
        svg_path: ['sa'],
        note: 'Âm SA Katakana'
      },
      {
        word: 'シ',
        trans: 'SHI',
        audio: 'audio/shi_ka.mp3',
        svg_path: ['shi'],
        note: 'Âm SHI Katakana'
      }
    ],
    questions: [
      {
        content: 'Câu nào là âm SA Katakana?',
        image: 'image/katakana_summary.png',
        trans: 'Câu hỏi về âm SA Katakana',
        sentence: 'Hãy chọn đúng.',
        value: 'サ',
        quiz: ['サ', 'さ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'HINA-011',
    lesson_title: 'Hiragana Thực hành',
    name_type: 0,
    points: 25,
    words: [
      { word: 'た', trans: 'TA', audio: 'audio/ta.mp3', svg_path: ['ta'], note: 'Âm TA' },
      { word: 'ち', trans: 'CHI', audio: 'audio/chi.mp3', svg_path: ['chi'], note: 'Âm CHI' }
    ],
    questions: [
      {
        content: 'Câu nào là âm TA?',
        image: 'image/hiragana_practice.png',
        trans: 'Câu hỏi về âm TA',
        sentence: 'Hãy chọn đúng.',
        value: 'た',
        quiz: ['た', 'タ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'HINA-012',
    lesson_title: 'Katakana Thực hành',
    name_type: 1,
    points: 25,
    words: [
      {
        word: 'タ',
        trans: 'TA',
        audio: 'audio/ta_ka.mp3',
        svg_path: ['ta'],
        note: 'Âm TA Katakana'
      },
      {
        word: 'チ',
        trans: 'CHI',
        audio: 'audio/chi_ka.mp3',
        svg_path: ['chi'],
        note: 'Âm CHI Katakana'
      }
    ],
    questions: [
      {
        content: 'Câu nào là âm TA Katakana?',
        image: 'image/katakana_practice.png',
        trans: 'Câu hỏi về âm TA Katakana',
        sentence: 'Hãy chọn đúng.',
        value: 'タ',
        quiz: ['タ', 'た'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'HINA-013',
    lesson_title: 'Hiragana Kiểm tra',
    name_type: 0,
    points: 30,
    words: [
      { word: 'な', trans: 'NA', audio: 'audio/na.mp3', svg_path: ['na'], note: 'Âm NA' },
      { word: 'に', trans: 'NI', audio: 'audio/ni.mp3', svg_path: ['ni'], note: 'Âm NI' }
    ],
    questions: [
      {
        content: 'Câu nào là âm NA?',
        image: 'image/hiragana_test.png',
        trans: 'Câu hỏi về âm NA',
        sentence: 'Hãy chọn đúng.',
        value: 'な',
        quiz: ['な', 'ナ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'HINA-014',
    lesson_title: 'Katakana Kiểm tra',
    name_type: 1,
    points: 30,
    words: [
      {
        word: 'ナ',
        trans: 'NA',
        audio: 'audio/na_ka.mp3',
        svg_path: ['na'],
        note: 'Âm NA Katakana'
      },
      {
        word: 'ニ',
        trans: 'NI',
        audio: 'audio/ni_ka.mp3',
        svg_path: ['ni'],
        note: 'Âm NI Katakana'
      }
    ],
    questions: [
      {
        content: 'Câu nào là âm NA Katakana?',
        image: 'image/katakana_test.png',
        trans: 'Câu hỏi về âm NA Katakana',
        sentence: 'Hãy chọn đúng.',
        value: 'ナ',
        quiz: ['ナ', 'な'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'HINA-015',
    lesson_title: 'Hiragana Nâng cao',
    name_type: 0,
    points: 35,
    words: [
      { word: 'ま', trans: 'MA', audio: 'audio/ma.mp3', svg_path: ['ma'], note: 'Âm MA' },
      { word: 'み', trans: 'MI', audio: 'audio/mi.mp3', svg_path: ['mi'], note: 'Âm MI' }
    ],
    questions: [
      {
        content: 'Câu nào là âm MA?',
        image: 'image/hiragana_advanced.png',
        trans: 'Câu hỏi về âm MA',
        sentence: 'Hãy chọn đúng.',
        value: 'ま',
        quiz: ['ま', 'マ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'HINA-016',
    lesson_title: 'Katakana Nâng cao',
    name_type: 1,
    points: 35,
    words: [
      {
        word: 'マ',
        trans: 'MA',
        audio: 'audio/ma_ka.mp3',
        svg_path: ['ma'],
        note: 'Âm MA Katakana'
      },
      {
        word: 'ミ',
        trans: 'MI',
        audio: 'audio/mi_ka.mp3',
        svg_path: ['mi'],
        note: 'Âm MI Katakana'
      }
    ],
    questions: [
      {
        content: 'Câu nào là âm MA Katakana?',
        image: 'image/katakana_advanced.png',
        trans: 'Câu hỏi về âm MA Katakana',
        sentence: 'Hãy chọn đúng.',
        value: 'マ',
        quiz: ['マ', 'ま'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'HINA-017',
    lesson_title: 'Hiragana Ôn tập',
    name_type: 0,
    points: 40,
    words: [
      { word: 'や', trans: 'YA', audio: 'audio/ya.mp3', svg_path: ['ya'], note: 'Âm YA' },
      { word: 'ゆ', trans: 'YU', audio: 'audio/yu.mp3', svg_path: ['yu'], note: 'Âm YU' }
    ],
    questions: [
      {
        content: 'Câu nào là âm YA?',
        image: 'image/hiragana_review.png',
        trans: 'Câu hỏi về âm YA',
        sentence: 'Hãy chọn đúng.',
        value: 'や',
        quiz: ['や', 'ヤ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'HINA-018',
    lesson_title: 'Katakana Ôn tập',
    name_type: 1,
    points: 40,
    words: [
      {
        word: 'ヤ',
        trans: 'YA',
        audio: 'audio/ya_ka.mp3',
        svg_path: ['ya'],
        note: 'Âm YA Katakana'
      },
      {
        word: 'ユ',
        trans: 'YU',
        audio: 'audio/yu_ka.mp3',
        svg_path: ['yu'],
        note: 'Âm YU Katakana'
      }
    ],
    questions: [
      {
        content: 'Câu nào là âm YA Katakana?',
        image: 'image/katakana_review.png',
        trans: 'Câu hỏi về âm YA Katakana',
        sentence: 'Hãy chọn đúng.',
        value: 'ヤ',
        quiz: ['ヤ', 'や'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[0]._id,
    lesson_id: 'HINA-019',
    lesson_title: 'Hiragana Kiểm tra cuối khóa',
    name_type: 0,
    points: 50,
    words: [
      { word: 'ら', trans: 'RA', audio: 'audio/ra.mp3', svg_path: ['ra'], note: 'Âm RA' },
      { word: 'り', trans: 'RI', audio: 'audio/ri.mp3', svg_path: ['ri'], note: 'Âm RI' }
    ],
    questions: [
      {
        content: 'Câu nào là âm RA?',
        image: 'image/hiragana_final.png',
        trans: 'Câu hỏi về âm RA',
        sentence: 'Hãy chọn đúng.',
        value: 'ら',
        quiz: ['ら', 'ラ'],
        point: 10
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    course: courses[1]._id,
    lesson_id: 'HINA-020',
    lesson_title: 'Katakana Kiểm tra cuối khóa',
    name_type: 1,
    points: 50,
    words: [
      {
        word: 'ラ',
        trans: 'RA',
        audio: 'audio/ra_ka.mp3',
        svg_path: ['ra'],
        note: 'Âm RA Katakana'
      },
      {
        word: 'リ',
        trans: 'RI',
        audio: 'audio/ri_ka.mp3',
        svg_path: ['ri'],
        note: 'Âm RI Katakana'
      }
    ],
    questions: [
      {
        content: 'Câu nào là âm RA Katakana?',
        image: 'image/katakana_final.png',
        trans: 'Câu hỏi về âm RA Katakana',
        sentence: 'Hãy chọn đúng.',
        value: 'ラ',
        quiz: ['ラ', 'ら'],
        point: 10
      }
    ]
  }
]

const renshuus = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 1: Hiragana Basics',
    lesson: lessons[0]._id, // Giả sử bạn đã có một mảng lessons chứa các lesson đã tạo
    total_points: 100,
    contents: [
      {
        content_text: 'Học cách phát âm chữ あ (A)',
        point: 10,
        value: 'あ',
        url_audio: 'audio/a.mp3',
        quiz: ['あ', 'ア']
      },
      {
        content_text: 'Học cách phát âm chữ い (I)',
        point: 10,
        value: 'い',
        url_audio: 'audio/i.mp3',
        quiz: ['い', 'イ']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 2: Katakana Basics',
    lesson: lessons[1]._id,
    total_points: 100,
    contents: [
      {
        content_text: 'Học cách phát âm chữ ア (A)',
        point: 10,
        value: 'ア',
        url_audio: 'audio/a_ka.mp3',
        quiz: ['ア', 'あ']
      },
      {
        content_text: 'Học cách phát âm chữ イ (I)',
        point: 10,
        value: 'イ',
        url_audio: 'audio/i_ka.mp3',
        quiz: ['イ', 'い']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 3: Vowel Sounds',
    lesson: lessons[0]._id,
    total_points: 120,
    contents: [
      {
        content_text: 'Học cách phát âm chữ う (U)',
        point: 15,
        value: 'う',
        url_audio: 'audio/u.mp3',
        quiz: ['う', 'ウ']
      },
      {
        content_text: 'Học cách phát âm chữ え (E)',
        point: 15,
        value: 'え',
        url_audio: 'audio/e.mp3',
        quiz: ['え', 'エ']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 4: Consonant Sounds',
    lesson: lessons[1]._id,
    total_points: 130,
    contents: [
      {
        content_text: 'Học cách phát âm chữ カ (KA)',
        point: 20,
        value: 'カ',
        url_audio: 'audio/ka.mp3',
        quiz: ['カ', 'か']
      },
      {
        content_text: 'Học cách phát âm chữ キ (KI)',
        point: 20,
        value: 'キ',
        url_audio: 'audio/ki.mp3',
        quiz: ['キ', 'き']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 5: Mixed Sounds',
    lesson: lessons[0]._id,
    total_points: 150,
    contents: [
      {
        content_text: 'Học cách phát âm chữ さ (SA)',
        point: 25,
        value: 'さ',
        url_audio: 'audio/sa.mp3',
        quiz: ['さ', 'サ']
      },
      {
        content_text: 'Học cách phát âm chữ し (SHI)',
        point: 25,
        value: 'し',
        url_audio: 'audio/shi.mp3',
        quiz: ['し', 'シ']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 6: Advanced Hiragana',
    lesson: lessons[1]._id,
    total_points: 200,
    contents: [
      {
        content_text: 'Học cách phát âm chữ た (TA)',
        point: 30,
        value: 'た',
        url_audio: 'audio/ta.mp3',
        quiz: ['た', 'タ']
      },
      {
        content_text: 'Học cách phát âm chữ ち (CHI)',
        point: 30,
        value: 'ち',
        url_audio: 'audio/chi.mp3',
        quiz: ['ち', 'チ']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 7: Advanced Katakana',
    lesson: lessons[0]._id,
    total_points: 200,
    contents: [
      {
        content_text: 'Học cách phát âm chữ マ (MA)',
        point: 30,
        value: 'マ',
        url_audio: 'audio/ma_ka.mp3',
        quiz: ['マ', 'ま']
      },
      {
        content_text: 'Học cách phát âm chữ ミ (MI)',
        point: 30,
        value: 'ミ',
        url_audio: 'audio/mi_ka.mp3',
        quiz: ['ミ', 'み']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 8: Pronunciation Practice',
    lesson: lessons[1]._id,
    total_points: 250,
    contents: [
      {
        content_text: 'Học cách phát âm chữ ら (RA)',
        point: 40,
        value: 'ら',
        url_audio: 'audio/ra.mp3',
        quiz: ['ら', 'ラ']
      },
      {
        content_text: 'Học cách phát âm chữ り (RI)',
        point: 40,
        value: 'り',
        url_audio: 'audio/ri.mp3',
        quiz: ['り', 'リ']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 9: Final Review',
    lesson: lessons[0]._id,
    total_points: 300,
    contents: [
      {
        content_text: 'Ôn tập chữ あ, い, う, え, お',
        point: 50,
        value: 'あい',
        url_audio: 'audio/ai.mp3',
        quiz: ['あ', 'い', 'う', 'え', 'お']
      },
      {
        content_text: 'Ôn tập chữ カ, キ, ク, ケ, コ',
        point: 50,
        value: 'かき',
        url_audio: 'audio/ka_ki.mp3',
        quiz: ['カ', 'キ', 'ク', 'ケ', 'コ']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 10: Sentence Practice',
    lesson: lessons[1]._id,
    total_points: 350,
    contents: [
      {
        content_text: 'Học cách tạo câu đơn giản',
        point: 60,
        value: 'こんにちは',
        url_audio: 'audio/konichiwa.mp3',
        quiz: ['こんにちは', 'こんばんは']
      },
      {
        content_text: 'Học cách hỏi tên',
        point: 60,
        value: 'あなたの名前は何ですか？',
        url_audio: 'audio/what_is_your_name.mp3',
        quiz: ['あなたの名前は何ですか？', 'お名前は？']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 11: Daily Conversations',
    lesson: lessons[0]._id,
    total_points: 400,
    contents: [
      {
        content_text: 'Học cách chào hỏi',
        point: 70,
        value: 'おはようございます',
        url_audio: 'audio/good_morning.mp3',
        quiz: ['おはようございます', 'こんにちは']
      },
      {
        content_text: 'Học cách nói cảm ơn',
        point: 70,
        value: 'ありがとうございます',
        url_audio: 'audio/thank_you.mp3',
        quiz: ['ありがとうございます', 'すみません']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 12: Food Vocabulary',
    lesson: lessons[1]._id,
    total_points: 450,
    contents: [
      {
        content_text: 'Học từ vựng về thực phẩm',
        point: 80,
        value: 'ごはん',
        url_audio: 'audio/rice.mp3',
        quiz: ['ごはん', 'パン']
      },
      {
        content_text: 'Học từ vựng về đồ uống',
        point: 80,
        value: 'お茶',
        url_audio: 'audio/tea.mp3',
        quiz: ['お茶', 'コーヒー']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 13: Weather Vocabulary',
    lesson: lessons[0]._id,
    total_points: 500,
    contents: [
      {
        content_text: 'Học từ vựng về thời tiết',
        point: 90,
        value: '晴れ',
        url_audio: 'audio/sunny.mp3',
        quiz: ['晴れ', '雨']
      },
      {
        content_text: 'Học từ vựng về mùa',
        point: 90,
        value: '春',
        url_audio: 'audio/spring.mp3',
        quiz: ['春', '夏']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 14: Family Vocabulary',
    lesson: lessons[1]._id,
    total_points: 550,
    contents: [
      {
        content_text: 'Học từ vựng về gia đình',
        point: 100,
        value: 'お母さん',
        url_audio: 'audio/mother.mp3',
        quiz: ['お母さん', 'お父さん']
      },
      {
        content_text: 'Học từ vựng về anh chị em',
        point: 100,
        value: '兄弟',
        url_audio: 'audio/siblings.mp3',
        quiz: ['兄弟', '姉妹']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 15: Hobbies Vocabulary',
    lesson: lessons[0]._id,
    total_points: 600,
    contents: [
      {
        content_text: 'Học từ vựng về sở thích',
        point: 110,
        value: '趣味',
        url_audio: 'audio/hobby.mp3',
        quiz: ['趣味', '遊び']
      },
      {
        content_text: 'Học từ vựng về thể thao',
        point: 110,
        value: 'スポーツ',
        url_audio: 'audio/sport.mp3',
        quiz: ['スポーツ', 'ゲーム']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 16: Travel Vocabulary',
    lesson: lessons[1]._id,
    total_points: 650,
    contents: [
      {
        content_text: 'Học từ vựng về du lịch',
        point: 120,
        value: '旅行',
        url_audio: 'audio/travel.mp3',
        quiz: ['旅行', '出張']
      },
      {
        content_text: 'Học từ vựng về địa điểm',
        point: 120,
        value: 'ホテル',
        url_audio: 'audio/hotel.mp3',
        quiz: ['ホテル', 'レストラン']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 17: Shopping Vocabulary',
    lesson: lessons[0]._id,
    total_points: 700,
    contents: [
      {
        content_text: 'Học từ vựng về mua sắm',
        point: 130,
        value: '買い物',
        url_audio: 'audio/shopping.mp3',
        quiz: ['買い物', 'ショッピング']
      },
      {
        content_text: 'Học từ vựng về giá cả',
        point: 130,
        value: '値段',
        url_audio: 'audio/price.mp3',
        quiz: ['値段', '価格']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 18: Health Vocabulary',
    lesson: lessons[1]._id,
    total_points: 750,
    contents: [
      {
        content_text: 'Học từ vựng về sức khoẻ',
        point: 140,
        value: '健康',
        url_audio: 'audio/health.mp3',
        quiz: ['健康', '病気']
      },
      {
        content_text: 'Học từ vựng về bác sĩ',
        point: 140,
        value: '医者',
        url_audio: 'audio/doctor.mp3',
        quiz: ['医者', '看護師']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 19: Technology Vocabulary',
    lesson: lessons[0]._id,
    total_points: 800,
    contents: [
      {
        content_text: 'Học từ vựng về công nghệ',
        point: 150,
        value: '技術',
        url_audio: 'audio/technology.mp3',
        quiz: ['技術', 'テクノロジー']
      },
      {
        content_text: 'Học từ vựng về máy tính',
        point: 150,
        value: 'コンピュータ',
        url_audio: 'audio/computer.mp3',
        quiz: ['コンピュータ', 'パソコン']
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: 'Renshuu 20: Final Vocabulary Review',
    lesson: lessons[1]._id,
    total_points: 1000,
    contents: [
      {
        content_text: 'Ôn tập từ vựng tổng hợp',
        point: 200,
        value: '言葉',
        url_audio: 'audio/vocabulary.mp3',
        quiz: ['言葉', '単語']
      },
      {
        content_text: 'Ôn tập câu giao tiếp',
        point: 200,
        value: '会話',
        url_audio: 'audio/conversation.mp3',
        quiz: ['会話', '対話']
      }
    ]
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
    await Lesson.insertMany(lessons)
    await Vocabulary.insertMany(vocabularies)
    await Grammar.insertMany(grammars)
    await Kanji.insertMany(kanjis)
    await Deck.insertMany(decks)
    await Flashcard.insertMany(flashcards)
    await Exam.insertMany(exams)
    await Progression.insertMany(progressions)
    await Notification.insertMany(notifications)
    await Hina.insertMany(hinas)
    await Renshuu.insertMany(renshuus)

    console.log('Dữ liệu đã được seed thành công!')
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedDatabase()
