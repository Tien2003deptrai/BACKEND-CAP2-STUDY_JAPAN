const ExamsRepo = require('../models/repos/exams.repo')
const ResultRepo = require('../models/repos/result.repo')
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

  // getUserExamHistory: async (userId, filters = {}) => {
  //   if (!userId) throwError('User ID bắt buộc')

  //   const query = { user: userId }

  //   if (filters.examId) query.exam = convert2ObjectId(filters.examId)
  //   if (filters.status) query.status = filters.status

  //   const results = await ResultRepo.findByUser(query)
  //   return results
  // }
  getUserExamHistory: async (userId, filters = {}) => {
    if (!userId) throwError('User ID bắt buộc')

    const query = { user: userId }

    if (filters.examId) query.exam = convert2ObjectId(filters.examId)
    if (filters.status) query.status = filters.status

    console.log('📌 Mongo Query:', JSON.stringify(query, null, 2))

    const results = await ResultRepo.findByUser(query)
    console.log('📊 Kết quả từ Mongo:', results)

    return results
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
