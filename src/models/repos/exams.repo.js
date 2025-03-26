const examsModel = require('../exams.model')

const ExamsRepo = {
  findById: (id) => examsModel.findById(id).lean(),

  findByTagAndLevel: (tags, level) => ExamsRepo.queryExams({ tags, level, isPublished: true }),

  getAll: () => examsModel.find().lean(),

  create: (bodyData) => examsModel.create(bodyData),

  update: (exam_id, bodyUpdate, isNew = true) =>
    examsModel.findByIdAndUpdate(exam_id, bodyUpdate, { new: isNew }),

  delete: (exam_id) => examsModel.deleteOne({ _id: exam_id }),

  queryExams: (query) => examsModel.find(query).select('-contents').lean(),

  // Find exam for taking (without answers)
  findForTaking: (id) =>
    examsModel
      .findById(id)
      .select(
        '_id title description time_limit total_points level sections tags questions difficultyLevel passingScore allowedAttempts'
      )
      .lean()
      .then((exam) => {
        if (!exam) return null

        // Remove correct answers from questions
        if (exam.questions) {
          exam.questions = exam.questions.map((q) => ({
            ...q,
            correctAnswer: undefined
          }))
        }

        return exam
      }),

  // Find exam with answers for scoring
  findWithAnswers: (id) =>
    examsModel.findById(id).select('_id title questions passingScore').lean(),

  checkUserAccess: async (userId, examId) => {
    // Kiểm tra xem user có được phép làm bài thi này không
    const exam = await examsModel
      .findOne({
        _id: examId,
        $or: [{ allowedUsers: userId }, { creator: userId }]
      })
      .lean()

    return !!exam
  }
}

module.exports = ExamsRepo
