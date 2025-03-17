const LessonRepo = require("../models/repos/lesson.repo");
const VocabularyRepo = require("../models/repos/vocabulary.repo");
const vocabularyModel = require("../models/vocabulary.model");
const throwError = require("../res/throwError");
const { convert2ObjectId, JapaneseToUnicode } = require("../utils");

const VocabularyService = {
  async addVocabulary({ lesson_id, ...bodyData }) {
    const lessonObjectId = convert2ObjectId(lesson_id);
    const vocabExists = await vocabularyModel.findOne({ lesson: lessonObjectId, word: bodyData.word }).lean();
    if (vocabExists) throwError("Vocabulary already exists");
    const newVocal = await vocabularyModel.create({
      lesson: lessonObjectId,
      ...bodyData
    })
    if (!newVocal) throwError("Vocabulary not found");
    await LessonRepo.addVocabIdToLesson({ lessonObjectId, vocab_id: newVocal._id });
    return newVocal;
  },

  async getAllVocabularies({ lesson_id }) {
    const lessonExists = await LessonRepo.findLessonById(lesson_id);
    if (!lessonExists) throwError("Lesson not found");
    const listVocab = await VocabularyRepo.getAllByLesson(lesson_id);
    if (listVocab.length === 0) throwError("Vocabulary not found");
    return listVocab;
  },

  async updateVocalary(vocab_id, { lesson_id, ...bodyUpdate }) {
    const vocab = await vocabularyModel.findById(vocab_id).lean();
    if (!vocab) throwError("Vocabulary not found");
    const vocabExists = await vocabularyModel.findOne({ lesson: convert2ObjectId(lesson_id), word: bodyUpdate?.word }).lean();
    if (vocabExists) throwError("Vocabulary already exists");
    if (bodyUpdate.kanji) {
      bodyUpdate.hex_string = JapaneseToUnicode(bodyUpdate.kanji);
    }
    return VocabularyRepo.updateVocalary(vocab_id, removeEventListener(bodyUpdate));
  },

  async deleteVocab(vocab_id, { lesson_id }) {
    const vocabExist = await vocabularyModel.findById(vocab_id).lean();
    if (!vocabExist) throwError("Vocabulary not found");
    await LessonRepo.removeVocabIdFromLesson({ lesson_id, vocab_id });
    await vocabularyModel.deleteOne({ _id: vocab_id });
    return true;
  }
}

module.exports = VocabularyService;