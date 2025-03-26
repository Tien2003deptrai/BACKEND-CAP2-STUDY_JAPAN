const ExamsRepo = require('../models/repos/exams.repo')
const ResultRepo = require('../models/repos/result.repo')
const resultModel = require('../models/result.model')
const throwError = require('../res/throwError')
const { convert2ObjectId } = require('../utils')

const ExamService = {
  createExam: async (exam) => {
    return await ExamsRepo.create(exam)
  },

  getExamsByTag: async ({ tags, level }) => {
    const result = await ExamsRepo.findByTagAndLevel(tags, level.toUpperCase())
    if (!result || result.length === 0) throwError('Không tìm thấy bài kiểm tra nào')
    return result
  },

  getExamsById: async (exam_id) => {
    if (!exam_id) throwError('Exam ID bắt buộc')

    const examObjectId = convert2ObjectId(exam_id)
    const result = await ExamsRepo.findById(examObjectId)

    if (!result) throwError('Không tìm thấy bài kiểm tra nào')
    return result
  },

  deleteExam: async (exam_id) => {
    if (!exam_id) throwError('Exam ID bắt buộc')

    const examObjectId = convert2ObjectId(exam_id)
    const existExam = await ExamsRepo.findById(examObjectId)
    if (!existExam) throwError('Exam không tìm thấy')

    return await ExamsRepo.delete(examObjectId)
  },

  listAvailableExams: async (filters = {}) => {
    const { level, tags, difficulty, searchTerm } = filters

    const query = { isPublished: true }

    if (level) query.level = level.toUpperCase()
    if (tags) query.tags = { $in: Array.isArray(tags) ? tags : [tags] }
    if (difficulty) query.difficultyLevel = difficulty
    if (searchTerm) query.title = { $regex: searchTerm, $options: 'i' }

    const exams = await ExamsRepo.queryExams(query)
    return exams
  },

  getExamForTaking: async (examId, userId) => {
    if (!examId) throwError('Exam ID bắt buộc')

    const examObjectId = convert2ObjectId(examId)
    const existingAttempt = await ResultRepo.findInProgressAttempt(userId, examObjectId)

    if (existingAttempt) {
      return {
        exam: await ExamsRepo.findForTaking(examObjectId),
        attemptId: existingAttempt._id,
        startTime: existingAttempt.startTime
      }
    }

    const exam = await ExamsRepo.findForTaking(examObjectId)
    if (!exam) throwError('Không tìm thấy bài kiểm tra')

    return { exam }
  },

  startExam: async (examId, userId) => {
    if (!examId || !userId) throwError('ExamId và userId bắt buộc')

    const examObjectId = convert2ObjectId(examId)
    const exam = await ExamsRepo.findById(examObjectId)

    if (!exam) throwError('Không tìm thấy bài kiểm tra')
    if (!exam.isPublished) throwError('Bài kiểm tra này chưa được công bố')

    const attemptCount = await ResultRepo.countAttempts(userId, examObjectId)
    if (exam.allowedAttempts && attemptCount >= exam.allowedAttempts) {
      throwError(`Bạn đã vượt quá số lần thử cho phép (${exam.allowedAttempts})`)
    }

    const existingAttempt = await ResultRepo.findInProgressAttempt(userId, examObjectId)
    if (existingAttempt) {
      return existingAttempt
    }

    const attempt = await ResultRepo.create({
      user: userId,
      exam: examObjectId,
      startTime: new Date(),
      status: 'in-progress',
      answers: []
    })

    return {
      attemptId: attempt._id,
      startTime: attempt.startTime,
      exam
    }
  },

  submitExam: async (attemptId, answers, userId) => {
    if (!attemptId) throwError('Attempt ID bắt buộc')

    const attemptObjectId = convert2ObjectId(attemptId)
    const attempt = await ResultRepo.findById(attemptObjectId)

    if (!attempt) throwError('Không tìm thấy bài làm')
    if (attempt.user.toString() !== userId.toString())
      throwError('Không có quyền truy cập bài làm này')
    if (attempt.status === 'completed') throwError('Bài kiểm tra này đã hoàn thành')

    const exam = await ExamsRepo.findWithAnswers(attempt.exam)
    if (!exam) throwError('Không tìm thấy bài kiểm tra')

    const endTime = new Date()
    const timeSpent = Math.floor((endTime - attempt.startTime) / 1000)

    const { scoredAnswers, totalScore } = await scoreExam(exam, answers)

    const result = await ResultRepo.update(attemptObjectId, {
      endTime,
      timeSpent,
      totalScore,
      answers: scoredAnswers,
      status: 'completed'
    })

    return {
      attemptId: result._id,
      totalScore: result.totalScore,
      timeSpent: result.timeSpent,
      passingScore: exam.passingScore,
      passed: result.totalScore >= exam.passingScore
    }
  },

  getExamResult: async (attemptId, userId) => {
    if (!attemptId) throwError('Attempt ID bắt buộc')

    const attemptObjectId = convert2ObjectId(attemptId)
    const result = await ResultRepo.findById(attemptObjectId)

    if (!result) throwError('Không tìm thấy kết quả')

    if (!result.user || !result.user.toString) throwError('Dữ liệu người dùng không hợp lệ')

    console.log('result.user.toString()', result.user.toString())
    console.log('userId', userId)

    if (result.user.toString() !== userId.toString())
      throwError('Không có quyền truy cập kết quả này')

    const exam = await ExamsRepo.findWithAnswers(result.exam)
    if (!exam) throwError('Không tìm thấy bài kiểm tra')

    const passed = result.totalScore >= exam.passingScore

    return {
      attemptId: result._id,
      examId: exam._id,
      examTitle: exam.title,
      totalScore: result.totalScore,
      timeSpent: result.timeSpent,
      startTime: result.startTime,
      endTime: result.endTime,
      status: result.status,
      answers: result.answers,
      passingScore: exam.passingScore,
      passed
    }
  },

  getUserExamHistory: async (userId, filters = {}) => {
    try {
      if (!userId) throwError('User ID bắt buộc')

      // Convert userId to ObjectId
      const userObjectId = convert2ObjectId(userId)

      const query = { user: userObjectId }

      // Add filters
      if (filters.examId) {
        query.exam = convert2ObjectId(filters.examId)
      }
      if (filters.status) {
        query.status = filters.status
      }

      // Add pagination
      const page = parseInt(filters.page) || 1
      const limit = parseInt(filters.limit) || 10
      const skip = (page - 1) * limit

      // Get results with pagination and sorting
      const results = await resultModel.find(query).sort({ startTime: -1 }).skip(skip).limit(limit)

      // Get total count for pagination
      const total = await resultModel.countDocuments(query)

      // Populate exam details
      const populatedResults = await Promise.all(
        results.map(async (result) => {
          const exam = await ExamsRepo.findById(result.exam)
          return {
            ...result.toObject(),
            exam: exam
              ? {
                  _id: exam._id,
                  title: exam.title,
                  level: exam.level,
                  time_limit: exam.time_limit,
                  passingScore: exam.passingScore
                }
              : null
          }
        })
      )

      return {
        results: populatedResults,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      }
    } catch (error) {
      throwError(error.message, error.statusCode || 500)
    }
  },

  checkExamTimeLimit: async (attemptId) => {
    const attempt = await ResultRepo.findById(attemptId)
    if (!attempt) throwError('Không tìm thấy bài làm')

    const exam = await ExamsRepo.findById(attempt.exam)
    if (!exam) throwError('Không tìm thấy bài thi')

    const currentTime = new Date()
    const timeSpent = Math.floor((currentTime - attempt.startTime) / 1000)
    const timeLimitInSeconds = exam.time_limit * 60

    if (timeSpent >= timeLimitInSeconds) {
      // Tự động nộp bài khi hết giờ
      await ExamService.submitExam(attemptId, attempt.answers, attempt.user)
      return {
        status: 'time_up',
        message: 'Đã hết thời gian làm bài'
      }
    }

    return {
      status: 'in_progress',
      remainingTime: timeLimitInSeconds - timeSpent
    }
  },

  handleExamInterruption: async (attemptId) => {
    const attempt = await ResultRepo.findById(attemptId)
    if (!attempt) throwError('Không tìm thấy bài làm')

    // Kiểm tra thời gian gián đoạn
    const lastActivity = attempt.lastActivity || attempt.startTime
    const currentTime = new Date()
    const timeDiff = Math.floor((currentTime - lastActivity) / 1000)

    // Nếu gián đoạn quá 5 phút, đánh dấu bài thi bị hủy
    if (timeDiff > 300) {
      await ResultRepo.update(attemptId, {
        status: 'abandoned',
        endTime: currentTime,
        timeSpent: Math.floor((currentTime - attempt.startTime) / 1000)
      })
      return {
        status: 'abandoned',
        message: 'Bài thi đã bị hủy do không hoạt động quá lâu'
      }
    }

    // Cập nhật thời gian hoạt động cuối cùng
    await ResultRepo.update(attemptId, {
      lastActivity: currentTime
    })

    return {
      status: 'resumed',
      message: 'Có thể tiếp tục làm bài'
    }
  },

  getExamAnalytics: async (examId) => {
    const results = await ResultRepo.findByExam(examId)
    const exam = await ExamsRepo.findById(examId)

    const analytics = {
      totalAttempts: results.length,
      averageScore: 0,
      passRate: 0,
      questionStats: {},
      timeStats: {
        average: 0,
        min: Infinity,
        max: 0
      }
    }

    // Tính toán các thống kê
    results.forEach((result) => {
      // Tính điểm trung bình
      analytics.averageScore += result.totalScore

      // Tính tỷ lệ đỗ
      if (result.totalScore >= exam.passingScore) {
        analytics.passRate++
      }

      // Thống kê thời gian
      analytics.timeStats.average += result.timeSpent
      analytics.timeStats.min = Math.min(analytics.timeStats.min, result.timeSpent)
      analytics.timeStats.max = Math.max(analytics.timeStats.max, result.timeSpent)

      // Thống kê từng câu hỏi
      result.answers.forEach((answer) => {
        if (!analytics.questionStats[answer.questionId]) {
          analytics.questionStats[answer.questionId] = {
            correct: 0,
            total: 0
          }
        }
        analytics.questionStats[answer.questionId].total++
        if (answer.isCorrect) {
          analytics.questionStats[answer.questionId].correct++
        }
      })
    })

    // Tính trung bình
    analytics.averageScore /= results.length
    analytics.passRate = (analytics.passRate / results.length) * 100
    analytics.timeStats.average /= results.length

    return analytics
  },

  saveExamProgress: async (attemptId, answers) => {
    // Lưu tiến độ làm bài
    await ResultRepo.update(attemptId, {
      answers,
      lastSaved: new Date()
    })
  },

  getExamProgress: async (attemptId) => {
    const attempt = await ResultRepo.findById(attemptId)
    return {
      answeredQuestions: attempt.answers.length,
      lastSaved: attempt.lastSaved,
      remainingTime: await ExamService.getRemainingTime(attemptId)
    }
  },

  markQuestionForReview: async (attemptId, questionId) => {
    // Đánh dấu câu hỏi cần xem lại
    await ResultRepo.update(attemptId, {
      $addToSet: { markedQuestions: questionId }
    })
  },

  getRemainingTime: async (attemptId) => {
    const attempt = await ResultRepo.findById(attemptId)
    if (!attempt) throwError('Không tìm thấy bài làm')

    const exam = await ExamsRepo.findById(attempt.exam)
    if (!exam) throwError('Không tìm thấy bài thi')

    const currentTime = new Date()
    const timeSpent = Math.floor((currentTime - attempt.startTime) / 1000)
    const timeLimitInSeconds = exam.time_limit * 60
    const remainingTime = timeLimitInSeconds - timeSpent

    return {
      remainingTime: Math.max(0, remainingTime),
      timeSpent,
      timeLimit: timeLimitInSeconds,
      isTimeUp: remainingTime <= 0
    }
  },

  checkUserAccess: async (userId, examId) => {
    const exam = await ExamsRepo.findById(examId)
    if (!exam) throwError('Không tìm thấy bài thi')

    // Kiểm tra visibility
    switch (exam.visibility) {
      case 'public':
        return true
      case 'private':
        // Kiểm tra xem user có được phép làm bài thi này không
        const hasAccess = await ExamsRepo.checkUserAccess(userId, examId)
        return hasAccess
      case 'group':
        // Kiểm tra xem user có thuộc nhóm được phép làm bài thi không
        const userGroups = await getUserGroups(userId) // Implement this function
        return exam.allowedGroups.some((group) => userGroups.includes(group))
      default:
        return false
    }
  },

  /**
   * Validate exam attempt
   * @param {string} attemptId - ID of the exam attempt
   * @returns {Promise<Object>} Validation result
   */
  async validateExamAttempt(attemptId) {
    try {
      // Get attempt details
      const attempt = await ResultRepo.findById(attemptId)
      if (!attempt) {
        throwError('Không tìm thấy kết quả bài thi', 404)
      }

      // Get exam details
      const exam = await ExamsRepo.findById(attempt.exam)
      if (!exam) {
        throwError('Không tìm thấy bài thi', 404)
      }

      // Check if exam is published
      if (!exam.isPublished) {
        throwError('Bài thi chưa được công bố', 400)
      }

      // Check if exam is within allowed time window
      const now = new Date()
      if (exam.startTime && now < exam.startTime) {
        throwError('Bài thi chưa bắt đầu', 400)
      }
      if (exam.endTime && now > exam.endTime) {
        throwError('Bài thi đã kết thúc', 400)
      }

      // Check if user has exceeded max attempts
      const userAttempts = await ResultRepo.countAttempts(attempt.user, attempt.exam)
      if (userAttempts >= exam.maxAttempts) {
        throwError('Bạn đã đạt số lần làm bài tối đa', 400)
      }

      // Check if attempt is still valid
      if (attempt.status === 'completed') {
        throwError('Bài thi đã hoàn thành', 400)
      }

      // Check if attempt has expired
      const timeSpent = (now - attempt.startTime) / 1000 // Convert to seconds
      if (timeSpent > exam.allowedTime) {
        throwError('Thời gian làm bài đã hết', 400)
      }

      return {
        isValid: true,
        attempt,
        exam,
        remainingTime: exam.allowedTime - timeSpent
      }
    } catch (error) {
      throwError(error.message, error.statusCode || 500)
    }
  }
}

async function scoreExam(exam, submittedAnswers) {
  const scoredAnswers = []
  let totalScore = 0

  for (const answer of submittedAnswers) {
    const { questionId, userAnswer } = answer

    const question = exam.questions.find((q) => q.id === questionId)
    if (!question) continue

    const isCorrect = checkAnswer(question, userAnswer)

    const score = isCorrect ? question.point : 0
    totalScore += score

    scoredAnswers.push({
      questionId,
      userAnswer,
      isCorrect,
      score
    })
  }

  return { scoredAnswers, totalScore }
}

function checkAnswer(question, userAnswer) {
  switch (question.type) {
    case 'multiple_choice':
      return question.correctAnswer === userAnswer
    case 'fill_in':
      return question.correctAnswer.toLowerCase() === userAnswer.toLowerCase()
    case 'listening':
      return question.correctAnswer === userAnswer
    case 'reading':
      return question.correctAnswer === userAnswer
    default:
      return false
  }
}

module.exports = ExamService
