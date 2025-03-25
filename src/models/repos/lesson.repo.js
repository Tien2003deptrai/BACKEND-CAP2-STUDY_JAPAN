const lessonModel = require('../lesson.model')
const { convert2ObjectId } = require('../../utils')

const LessonRepo = {
  findLessonById: async (lesson_id) => lessonModel.findById(convert2ObjectId(lesson_id)).lean(),

  findOne: async (lesson_id) =>
    lessonModel
      .findOne({ _id: convert2ObjectId(lesson_id) })
      .populate('course', 'name author')
      .populate({ path: 'contents', populate: { path: 'vocabulary' } })
      .populate({ path: 'contents', populate: { path: 'grammar' } })
      .lean()
      .exec(),

  getAllLesson: async (course_id) =>
    lessonModel.find({ course: convert2ObjectId(course_id) }).lean(),

  updateLesson: async (lesson_id, bodyUpdate, isNew = true) =>
    lessonModel.findByIdAndUpdate(convert2ObjectId(lesson_id), bodyUpdate, {
      new: isNew
    }),

  findAllDraft: async ({ query, limit, skip }) =>
    LessonRepo.query({
      query: { ...query, status: 'draft' },
      limit,
      skip
    }),

  findAllRelease: async ({ query, limit, skip }) =>
    LessonRepo.query({
      query: { ...query, status: 'published' },
      limit,
      skip
    }),

  query: async ({ query, limit, skip }) =>
    lessonModel
      .find(query)
      .populate('course', 'name author -_id')
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec(),

  toggleStatus: async (lesson_id, status) => {
    const lesson = await lessonModel.findById(convert2ObjectId(lesson_id))
    if (!lesson) return null
    lesson.status = status
    const { modifiedCount } = await lessonModel.updateOne({ _id: lesson._id }, lesson)
    return modifiedCount
  },

  releaseLesson: async (lesson_id) => LessonRepo.toggleStatus(lesson_id, 'published'),
  unReleaseLesson: async (lesson_id) => LessonRepo.toggleStatus(lesson_id, 'draft'),

  getAllLessonTitles: async () => lessonModel.find().select('lesson_title').lean(),

  addVocabIdToLesson: async ({ lesson_id, vocab_id }) => {
    const lesson = await lessonModel.findById(convert2ObjectId(lesson_id))
    if (!lesson) return null

    // Check if vocab_id already exists
    if (lesson.contents.vocabulary.includes(convert2ObjectId(vocab_id))) {
      return lesson
    }

    // Add vocab_id to vocabulary array
    lesson.contents.vocabulary.push(convert2ObjectId(vocab_id))
    const { modifiedCount } = await lessonModel.updateOne(
      { _id: lesson._id },
      { $push: { 'contents.vocabulary': convert2ObjectId(vocab_id) } }
    )
    return modifiedCount
  },

  removeVocabIdFromLesson: async ({ lesson_id, vocab_id }) => {
    const lesson = await lessonModel.findById(convert2ObjectId(lesson_id))
    if (!lesson) return null

    // Remove vocab_id from vocabulary array
    const { modifiedCount } = await lessonModel.updateOne(
      { _id: lesson._id },
      { $pull: { 'contents.vocabulary': convert2ObjectId(vocab_id) } }
    )
    return modifiedCount
  },

  addGrammarIdToLesson: async ({ lesson_id, grammar_id }) => {
    const lesson = await lessonModel.findById(convert2ObjectId(lesson_id))
    if (!lesson) return null

    // Check if grammar_id already exists
    if (lesson.contents.grammar.includes(convert2ObjectId(grammar_id))) {
      return lesson
    }

    // Add grammar_id to grammar array
    lesson.contents.grammar.push(convert2ObjectId(grammar_id))
    const { modifiedCount } = await lessonModel.updateOne(
      { _id: lesson._id },
      { $push: { 'contents.grammar': convert2ObjectId(grammar_id) } }
    )
    return modifiedCount
  },

  removeGrammarIdFromLesson: async ({ lesson_id, grammar_id }) => {
    const lesson = await lessonModel.findById(convert2ObjectId(lesson_id))
    if (!lesson) return null

    // Remove grammar_id from grammar array
    const { modifiedCount } = await lessonModel.updateOne(
      { _id: lesson._id },
      { $pull: { 'contents.grammar': convert2ObjectId(grammar_id) } }
    )
    return modifiedCount
  }
}

module.exports = LessonRepo
