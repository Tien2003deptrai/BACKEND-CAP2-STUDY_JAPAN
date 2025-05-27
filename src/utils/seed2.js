'use strict'

const mongoose = require('mongoose')
const User = require('../models/user.model')
const Course = require('../models/course.model')
const Lesson = require('../models/lesson.model')
const Vocabulary = require('../models/vocabulary.model')
const Kanji = require('../models/kanji.model')
const Grammar = require('../models/grammar.model')
const Deck = require('../models/deck.model')
const Flashcard = require('../models/flashcard.model')
const Hina = require('../models/hina.model')
const Renshuu = require('../models/renshuu.model')
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
      _id: new mongoose.Types.ObjectId(),
      name: 'Nguyen Van An',
      email: 'nguyen.an@gmail.com',
      password: await hashPassword('admin123'),
      status: 'active',
      date_of_birth: new Date('1990-01-15'),
      sex: 'male',
      avatar: 'https://gmail.com/avatars/an.jpg',
      roles: 'admin',
      phone: '0901234567',
      admin_profile: {
        permissions: ['manage_users'],
        last_login_ip: '127.0.0.1',
        managed_users: []
      }
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: 'Tran Thi Bich',
      email: 'tran.bich@gmail.com',
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
      _id: new mongoose.Types.ObjectId(),
      name: 'Le Van Cuong',
      email: 'le.cuong@gmail.com',
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
      _id: new mongoose.Types.ObjectId(),
      name: 'Pham Thi Dung',
      email: 'pham.dung@gmail.com',
      password: await hashPassword('teacher456'),
      status: 'active',
      date_of_birth: new Date('1992-11-25'),
      sex: 'female',
      avatar: 'https://gmail.com/avatars/dung.jpg',
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
      _id: new mongoose.Types.ObjectId(),
      name: 'Hoang Van Em',
      email: 'hoang.em@gmail.com',
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
      _id: new mongoose.Types.ObjectId(),
      name: 'Vu Thi Phuong',
      email: 'vu.phuong@gmail.com',
      password: await hashPassword('admin456'),
      status: 'active',
      date_of_birth: new Date('1991-09-30'),
      sex: 'female',
      avatar: 'https://gmail.com/avatars/phuong.jpg',
      roles: 'admin',
      phone: '0956789012',
      admin_profile: {
        permissions: ['manage_teachers'],
        last_login_ip: '127.0.0.1',
        managed_users: []
      }
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: 'Do Van Giang',
      email: 'do.giang@gmail.com',
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
      _id: new mongoose.Types.ObjectId(),
      name: 'Bui Thi Hoa',
      email: 'bui.hoa@gmail.com',
      password: await hashPassword('student789'),
      status: 'active',
      date_of_birth: new Date('1996-12-15'),
      sex: 'female',
      avatar: 'https://gmail.com/avatars/hoa.jpg',
      roles: 'student',
      phone: '0978901234',
      student_profile: {
        learning_level: 'advanced',
        enrolled_courses: [],
        progress: 75
      }
    },
    {
      _id: new mongoose.Types.ObjectId(),
      name: 'Dang Van Khanh',
      email: 'dang.khanh@gmail.com',
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
      _id: new mongoose.Types.ObjectId(),
      name: 'Ngo Thi Linh',
      email: 'ngo.linh@gmail.com',
      password: await hashPassword('teacher999'),
      status: 'active',
      date_of_birth: new Date('1994-02-28'),
      sex: 'female',
      avatar: 'https://gmail.com/avatars/linh.jpg',
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

  // Tạo 20 vocabularies
  const vocabularies = Array(20).fill().map((_, i) => ({
    _id: new mongoose.Types.ObjectId(),
    word: ['こんにちは', 'ありがとう', 'さようなら', '学生', '先生', '会社', '学校', '家', '車', '電車', '本', '猫', '犬', '水', '食べる', '飲む', '行く', '来る', '見る', '聞く'][i],
    kanji: ['学生', '先生', '会社', '学校', '家', '車', '電車', '本', '猫', '犬', '水', '食べる', '飲む', '行く', '来る', '見る', '聞く'][i % 17], // hoặc null nếu không có
    kana: ['がくせい', 'せんせい', 'かいしゃ', 'がっこう', 'いえ', 'くるま', 'でんしゃ', 'ほん', 'ねこ', 'いぬ', 'みず', 'たべる', 'のむ', 'いく', 'くる', 'みる', 'きく'][i % 17],
    meaning: ['Học sinh', 'Giáo viên', 'Công ty', 'Trường học', 'Nhà', 'Xe hơi', 'Tàu điện', 'Sách', 'Mèo', 'Chó', 'Nước', 'Ăn', 'Uống', 'Đi', 'Đến', 'Nhìn', 'Nghe'][i % 17],
    example: `これは${['学生', '先生', '会社', '学校', '家'][i % 5]}です。`,
    tags: 'N5',
    notes: '',
    audio: `audio/vocab_${i + 1}.mp3`
  }))

  // Tạo 20 grammars
  const grammars = Array(20).fill().map((_, i) => ({
    _id: new mongoose.Types.ObjectId(),
    title: [`N です`, `N じゃありません`, `N ですか`, `V ます`, `V ません`, `V ました`, `V ませんでした`, `い-Adj です`, `い-Adj くないです`, `な-Adj です`, `な-Adj じゃないです`, `N が あります/います`, `N を V`, `N に V`, `N から N まで`, `N と N`, `N や N`, `V て-form`, `V ている`, `V たい`][i],
    structure: [`N + です`, `N + じゃありません`, `N + ですか`, `V(ます形)`, `V(ません形)`, `V(ました形)`, `V(ませんでした形)`, `い-Adj + です`, `い-Adj + くないです`, `な-Adj + です`, `な-Adj + じゃないです`, `N + が + あります/います`, `N + を + V`, `N + に + V`, `N + から + N + まで`, `N + と + N`, `N + や + N`, `V(て形)`, `V(て形) + いる`, `V(辞書形) + たい`][i],
    mean: [`Là`, `Không phải là`, `Có phải là ... không?`, `Làm`, `Không làm`, `Đã làm`, `Không làm (quá khứ)`, `Là (tính từ i)`, `Không (tính từ i)`, `Là (tính từ na)`, `Không (tính từ na)`, `Có`, `Làm`, `Đến`, `Từ ... đến ...`, `Và`, `Và (không đầy đủ)`, `Thể te`, `Đang làm`, `Muốn làm`][i],
    use: [`Dùng để xác nhận danh tính`, `Phủ định danh tính`, `Hỏi danh tính`, `Diễn tả hành động`, `Phủ định hành động`, `Hành động quá khứ`, `Phủ định quá khứ`, `Miêu tả tính từ i`, `Phủ định tính từ i`, `Miêu tả tính từ na`, `Phủ định tính từ na`, `Diễn tả sự tồn tại`, `Đối tượng hành động`, `Nơi xảy ra hành động`, `Chỉ phạm vi`, `Liệt kê đầy đủ`, `Liệt kê không đầy đủ`, `Nối hành động`, `Tiếp diễn`, `Thể hiện mong muốn`][i],
    explain: `Cấu trúc ngữ pháp số ${i + 1} dùng trong trình độ N${i < 10 ? 5 : 4}.`, // ✅ THÊM explain đầy đủ ở đây
    level: i < 10 ? 'N5' : 'N4',
    examples: [{
      ja: `例文${i + 1}です。`,
      hira: `れいぶん${i + 1}です。`,
      vi: `Đây là ví dụ ${i + 1}.`
    }]
  }))

  // Tạo 20 kanjis
  const kanjis = Array(20).fill().map((_, i) => ({
    _id: new mongoose.Types.ObjectId(),
    kanji: ['日', '月', '火', '水', '木', '金', '土', '山', '川', '田', '人', '子', '女', '男', '口', '手', '足', '目', '耳', '車'][i],
    cn_vi_word: ['Nhật', 'Nguyệt', 'Hỏa', 'Thủy', 'Mộc', 'Kim', 'Thổ', 'Sơn', 'Xuyên', 'Điền', 'Nhân', 'Tử', 'Nữ', 'Nam', 'Khẩu', 'Thủ', 'Túc', 'Mục', 'Nhĩ', 'Xa'][i],
    component: [['Nhật'], ['Nguyệt'], ['Hỏa'], ['Thủy'], ['Mộc'], ['Kim'], ['Thổ'], ['Sơn'], ['Xuyên'], ['Điền'], ['Nhân'], ['Tử'], ['Nữ'], ['Nam'], ['Khẩu'], ['Thủ'], ['Túc'], ['Mục'], ['Nhĩ'], ['Xa']][i],
    examples: [{
      ja: `${['日', '月', '火', '水', '木', '金', '土', '山', '川', '田', '人', '子', '女', '男', '口', '手', '足', '目', '耳', '車'][i]}曜日`,
      hira: `${['にち', 'げつ', 'か', 'すい', 'もく', 'きん', 'ど', 'やま', 'かわ', 'た', 'ひと', 'こ', 'おんな', 'おとこ', 'くち', 'て', 'あし', 'め', 'みみ', 'くるま'][i]}ようび`,
      vi: `Thứ ${['Nhật', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Núi', 'Sông', 'Ruộng', 'Người', 'Con', 'Nữ', 'Nam', 'Miệng', 'Tay', 'Chân', 'Mắt', 'Tai', 'Xe'][i]}`
    }],
    explain: [`Ngày, mặt trời`, `Tháng, mặt trăng`, `Lửa`, `Nước`, `Cây`, `Vàng, kim loại`, `Đất`, `Núi`, `Sông`, `Ruộng`, `Người`, `Con`, `Nữ, phụ nữ`, `Nam, đàn ông`, `Miệng`, `Tay`, `Chân`, `Mắt`, `Tai`, `Xe`][i],
    jlpt: i < 10 ? 'N5' : 'N4',
    kunyomi: [[`ひ`, `か`], [`つき`], [`ひ`], [`みず`], [`き`], [`かね`], [`つち`], [`やま`], [`かわ`], [`た`], [`ひと`], [`こ`], [`おんな`], [`おとこ`], [`くち`], [`て`], [`あし`], [`め`], [`みみ`], [`くるま`]][i],
    mean: [`Ngày`, `Tháng`, `Lửa`, `Nước`, `Cây`, `Vàng`, `Đất`, `Núi`, `Sông`, `Ruộng`, `Người`, `Con`, `Nữ`, `Nam`, `Miệng`, `Tay`, `Chân`, `Mắt`, `Tai`, `Xe`][i],
    onyomi: [[`ニチ`, `ジツ`], [`ゲツ`, `ガツ`], [`カ`], [`スイ`], [`モク`, `ボク`], [`キン`, `コン`], [`ド`, `ト`], [`サン`], [`セン`], [`デン`], [`ジン`, `ニン`], [`シ`, `ス`], [`ジョ`, `ニョ`], [`ダン`, `ナン`], [`コウ`, `ク`], [`シュ`], [`ソク`], [`モク`], [`ジ`], [`シャ`]][i],
    stroke_num: [4, 4, 4, 4, 4, 8, 3, 3, 3, 5, 2, 3, 3, 7, 3, 4, 7, 5, 6, 7][i],
    svg_path: `path_to_svg_${i + 1}`,
    unicode: [`U+65E5`, `U+6708`, `U+706B`, `U+6C34`, `U+6728`, `U+91D1`, `U+571F`, `U+5C71`, `U+5DDD`, `U+7530`, `U+4EBA`, `U+5B50`, `U+5973`, `U+7537`, `U+53E3`, `U+624B`, `U+8DB3`, `U+76EE`, `U+8033`, `U+8ECA`][i]
  }));

  const hinas = [
    {
      _id: new mongoose.Types.ObjectId(),
      course: '68344ff81afccadec5a40517',
      lesson_id: '68344ff81afccadec5a40519',
      lesson_title: 'あいさつ',
      name_type: 0,
      points: 20,
      words: [
        {
          word: 'こんにちは',
          trans: 'Xin chào',
          audio: 'https://gmail.com/audio/konnichiwa.mp3',
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
      _id: new mongoose.Types.ObjectId(),
      course: '68344ff81afccadec5a40517',
      lesson_id: '68344ff81afccadec5a40519',
      lesson_title: '漢字の基本',
      name_type: 1,
      points: 15,
      words: [
        {
          word: 'ヤマ',
          trans: 'Núi',
          audio: 'https://gmail.com/audio/yama.mp3',
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
  ]

  return {
    users,
    // courses,
    // lessons,
    vocabularies,
    grammars,
    kanjis,
    hinas,
    // renshuus
  }

}
const seedDatabase = async () => {
  try {
    // Xóa toàn bộ dữ liệu cũ
    // await mongoose.connection.dropDatabase()
    console.log('Đã xóa toàn bộ dữ liệu cũ!')
    const {
      // users,
      // vocabularies, grammars,
      // kanjis,
      hinas,
      // renshuus
    } = await createSeedData()


    // Chèn dữ liệu mới
    // await User.insertMany(users)
    // await Course.insertMany(courses)
    // await Lesson.insertMany(lessons)
    // await Vocabulary.insertMany(vocabularies)
    // await Grammar.insertMany(grammars)
    // await Kanji.insertMany(kanjis)
    await Hina.insertMany(hinas)
    // await Renshuu.insertMany(renshuus)

    console.log('Dữ liệu đã được seed thành công!')
  } catch (error) {
    console.error('Lỗi khi seed dữ liệu:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedDatabase()
