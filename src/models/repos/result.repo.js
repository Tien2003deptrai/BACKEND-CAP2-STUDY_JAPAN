const resultModel = require('../result.model')

const ResultRepo = {
  // Find a result by ID
  findById: (id) => resultModel.findById(id).lean(),

  // Create a new result/attempt
  create: (data) => resultModel.create(data),

  // Update a result
  update: (id, data, isNew = true) =>
    resultModel.findByIdAndUpdate(id, data, { new: isNew }).lean(),

  // Find an in-progress attempt for a user and exam
  findInProgressAttempt: (userId, examId) =>
    resultModel
      .findOne({
        user: userId,
        exam: examId,
        status: 'in-progress'
      })
      .lean(),

  // Count number of attempts a user has made for an exam
  countAttempts: (userId, examId) =>
    resultModel.countDocuments({
      user: userId,
      exam: examId
    }),

  // Find results for a user with optional filters
  findByUser: (query) => {
    console.log('📡 Truy vấn Mongo:', JSON.stringify(query, null, 2))
    return resultModel
      .find(query)
      .populate('exam', 'title level tags')
      .sort({ startTime: -1 })
      .lean()
  },

  // Get latest results for all users for an exam
  getExamResults: (examId, limit = 10) =>
    resultModel
      .find({
        exam: examId,
        status: 'completed'
      })
      .populate('user', 'name email avatar')
      .sort({ totalScore: -1, timeSpent: 1 })
      .limit(limit)
      .lean(),

  // Delete results for an exam
  deleteByExam: (examId) => resultModel.deleteMany({ exam: examId }),

  // Delete all results for a user
  deleteByUser: (userId) => resultModel.deleteMany({ user: userId })
}

module.exports = ResultRepo
