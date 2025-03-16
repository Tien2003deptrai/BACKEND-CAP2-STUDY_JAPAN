const lessonModel = require('../lesson.model');
const { convert2ObjectId } = require('../../utils');
const { NotFoundError } = require('../../core/error.response');

const LessonRepo = {
  findById: async (lesson_id) => lessonModel.findById(convert2ObjectId(lesson_id)).lean(),

  findOne: async (lesson_id) => lessonModel
    .findOne({ _id: convert2ObjectId(lesson_id) })
    .populate('course', 'name author -_id')
    .populate({ path: 'contents', populate: { path: 'vocabulary' } })
    .populate({ path: 'contents', populate: { path: 'grammar' } })
    .lean()
    .exec(),

  getAll: async (course_id) => lessonModel.find({ course: convert2ObjectId(course_id) }).lean(),

  update: async (lesson_id, bodyUpdate, isNew = true) => lessonModel.findByIdAndUpdate(
    convert2ObjectId(lesson_id),
    bodyUpdate,
    { new: isNew }
  ),

  findAllDraft: async ({ query, limit, skip }) => LessonRepo.query({ query, limit, skip }),
  findAllRelease: async ({ query, limit, skip }) => LessonRepo.query({ query, limit, skip }),

  query: async ({ query, limit, skip }) => lessonModel
    .find(query)
    .populate('course', 'name author -_id')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec(),

  toggleReleaseStatus: async (lesson_id, isReleased) => {
    const lesson = await lessonModel.findById(convert2ObjectId(lesson_id));
    if (!lesson) return null;
    lesson.isRelease = isReleased;
    lesson.isDraft = !isReleased;
    const { modifiedCount } = await lessonModel.updateOne({ _id: lesson._id }, lesson);
    return modifiedCount;
  },

  addContent: async (lesson_id, type, content_id) => {
    const lesson = await lessonModel.findById(convert2ObjectId(lesson_id));
    if (!lesson) throw new NotFoundError('Lesson not found');
    lesson.contents[type].push(content_id);
    await lesson.save();
  },

  removeContent: async (lesson_id, type, content_id) => {
    const lesson = await lessonModel.findById(convert2ObjectId(lesson_id));
    if (!lesson) throw new NotFoundError('Lesson not found');
    lesson.contents[type] = lesson.contents[type].filter(id => id.toString() !== content_id.toString());
    await lesson.save();
  },

  releaseLesson: async (lesson_id) => LessonRepo.toggleReleaseStatus(lesson_id, true),
  unReleaseLesson: async (lesson_id) => LessonRepo.toggleReleaseStatus(lesson_id, false),

  addGrammarIdToLesson: async ({ lesson_id, grammar_id }) => LessonRepo.addContent(lesson_id, 'grammar', grammar_id),
  addVocabIdToLesson: async ({ lesson_id, vocab_id }) => LessonRepo.addContent(lesson_id, 'vocabulary', vocab_id),

  removeGrammarIdFromLesson: async ({ lesson_id, grammar_id }) => LessonRepo.removeContent(lesson_id, 'grammar', grammar_id),
  removeVocabIdFromLesson: async ({ lesson_id, vocab_id }) => LessonRepo.removeContent(lesson_id, 'vocabulary', vocab_id),
};

module.exports = LessonRepo;
