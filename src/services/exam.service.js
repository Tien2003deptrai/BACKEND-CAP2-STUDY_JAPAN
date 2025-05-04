const enrollmentModel = require('../models/enrollment.model')
const examsModel = require('../models/exams.model')
const ExamsRepo = require('../models/repos/exams.repo')
const ResultRepo = require('../models/repos/result.repo')
const resultModel = require('../models/result.model')
const throwError = require('../res/throwError')
const { convert2ObjectId } = require('../utils')

const ExamService = {
  createExam: async (exam) => {
    try {
      if (!exam.courseId) throwError('Course ID bắt buộc')
      if (!exam.title) throwError('Title bắt buộc')
      if (!exam.level) throwError('Level bắt buộc')
      if (!exam.time_limit || typeof exam.time_limit !== 'number') {
        throwError('Time limit phải là số')
      }

      // Convert courseId to ObjectId
      exam.courseId = convert2ObjectId(exam.courseId)

      return await ExamsRepo.create(exam)
    } catch (error) {
      console.error('Error in createExam:', error)
      throwError(error.message, error.statusCode || 500)
    }
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

    const query = {}

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
    // if (!exam.isPublished) throwError('Bài kiểm tra này chưa được công bố')

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

    // Process answers to match the nested structure
    const processedAnswers = exam.questions.map((parentQuestion) => {
      const submittedParentAnswer = answers.find(
        (a) => a.parentQuestionId === parentQuestion._id.toString()
      )

      return {
        parentQuestionId: parentQuestion._id,
        paragraph: parentQuestion.paragraph,
        imgUrl: parentQuestion.imgUrl,
        audioUrl: parentQuestion.audioUrl,
        childAnswers: parentQuestion.childQuestions.map((childQuestion) => {
          const submittedChildAnswer = submittedParentAnswer?.childAnswers?.find(
            (ca) => ca.id === childQuestion._id.toString()
          )

          const isCorrect = submittedChildAnswer?.userAnswer === childQuestion.correctAnswer

          return {
            id: childQuestion._id,
            content: childQuestion.content,
            options: childQuestion.options,
            userAnswer: submittedChildAnswer?.userAnswer || null,
            isCorrect: isCorrect,
            correctAnswer: childQuestion.correctAnswer,
            score: isCorrect ? 10 : 0
          }
        })
      }
    })

    // Calculate total score
    const totalScore = processedAnswers.reduce((total, parentAnswer) => {
      return (
        total +
        parentAnswer.childAnswers.reduce((childTotal, childAnswer) => {
          return childTotal + childAnswer.score
        }, 0)
      )
    }, 0)

    const passingScores = {
      N1: 100,
      N2: 90,
      N3: 95,
      N4: 90,
      N5: 80
    }

    const passed = totalScore >= (passingScores[exam.level] || 80)

    const result = await ResultRepo.update(attemptObjectId, {
      endTime,
      timeSpent,
      totalScore,
      answers: processedAnswers,
      isPassed: passed,
      status: 'completed'
    })

    return {
      attemptId: result._id,
      totalScore: result.totalScore,
      timeSpent: result.timeSpent,
      passed,
      scoredAnswers: processedAnswers
    }
  },

  getExamResult: async (attemptId, userId) => {
    if (!attemptId) throwError('Attempt ID bắt buộc')

    const attemptObjectId = convert2ObjectId(attemptId)
    const result = await ResultRepo.findById(attemptObjectId)

    if (!result) throwError('Không tìm thấy kết quả')

    if (!result.user || !result.user.toString) throwError('Dữ liệu người dùng không hợp lệ')

    if (result.user.toString() !== userId.toString())
      throwError('Không có quyền truy cập kết quả này')

    const exam = await ExamsRepo.findWithAnswers(result.exam)
    if (!exam) throwError('Không tìm thấy bài kiểm tra')

    const passed = result.totalScore >= exam.passingScore

    // 🔁 Gắn correctAnswer cho từng answer
    const answersWithCorrect = result.answers.map((answer) => {
      const matchedQuestion = exam.questions.find((q) => q.id === answer.questionId)
      return {
        ...answer,
        correctAnswer: matchedQuestion ? matchedQuestion.correctAnswer : null
      }
    })

    return {
      attemptId: result._id,
      examId: exam._id,
      examTitle: exam.title,
      totalScore: result.totalScore,
      time: formatTimeSpent(result.startTime, result.endTime),
      status: result.status,
      answers: answersWithCorrect,
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
      // if (!exam.isPublished) {
      //   throwError('Bài thi chưa được công bố', 400)
      // }

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
  },

  getExamsByTeacher: async (teacherId) => {
    try {
      if (!teacherId) throwError('Teacher ID bắt buộc')

      const exams = await ExamsRepo.queryExams({ creator: teacherId }).sort({ createdAt: -1 })

      return exams
    } catch (error) {
      console.error('Error in getExamsByTeacher:', error)
      throwError(error)
    }
  },

  updateExam: async (examId, updateData) => {
    try {
      if (!examId) throwError('Exam ID bắt buộc')

      const allowedUpdates = ['title', 'description', 'time_limit', 'courseId']
      const updates = {}

      for (const field of allowedUpdates) {
        if (updateData[field] !== undefined) {
          if (field === 'time_limit' && typeof updateData[field] !== 'number') {
            throwError('time_limit phải là số')
          }
          if (field === 'courseId') {
            if (!updateData[field]) throwError('Course ID không được để trống')
            updates[field] = updateData[field]
          } else {
            updates[field] = updateData[field]
          }
        }
      }

      // Check if there are any valid updates
      if (Object.keys(updates).length === 0) {
        throwError('Không có trường nào được cập nhật')
      }

      // Update the exam
      const updatedExam = await ExamsRepo.update(examId, updates)
      if (!updatedExam) throwError('Không tìm thấy bài kiểm tra')

      return updatedExam
    } catch (error) {
      console.error('Error in updateExam:', error)
      throwError(error.message, error.statusCode || 500)
    }
  },

  updateQuestion: async (examId, newQuestions) => {
    try {
      if (!examId) throwError('Exam ID bắt buộc')
      if (!Array.isArray(newQuestions)) throwError('Questions phải là một mảng')

      // Find the exam by ID
      const currentExam = await ExamsRepo.findById(examId)
      if (!currentExam) throwError('Không tìm thấy bài kiểm tra')

      // Validate the new questions
      const processedNewQuestions = newQuestions.map((question, index) => {
        // Validate required fields
        if (!question.parentQuestion) throwError(`Câu hỏi ${index + 1} thiếu trường parentQuestion`)
        if (!Array.isArray(question.childQuestions)) {
          throwError(`Câu hỏi ${index + 1} thiếu trường childQuestions hoặc không phải là mảng`)
        }

        // Validate child questions
        question.childQuestions.forEach((child, childIndex) => {
          if (!child.content) {
            throwError(
              `Câu hỏi con ${childIndex + 1} của câu hỏi ${index + 1} thiếu trường content`
            )
          }
          if (!child.correctAnswer) {
            throwError(
              `Câu hỏi con ${childIndex + 1} của câu hỏi ${index + 1} thiếu trường correctAnswer`
            )
          }
        })

        return question
      })

      console.log(processedNewQuestions)

      // Replace the existing questions with the new questions
      currentExam.questions = processedNewQuestions

      // Save the updated exam to the database
      await ExamsRepo.update(examId, { questions: currentExam.questions })

      return true
    } catch (error) {
      console.error('Error in updateQuestion:', error)
      throwError(error.message, error.statusCode || 500)
    }
  },

  addExamQuestions: async (examId, newQuestions) => {
    try {
      if (!examId) throwError('Exam ID bắt buộc')
      if (!Array.isArray(newQuestions)) throwError('Questions phải là một mảng')

      // Get the current exam to get existing questions
      const currentExam = await ExamsRepo.findById(examId)
      if (!currentExam) throwError('Không tìm thấy bài kiểm tra')

      // Create a map of existing question IDs for quick lookup
      const existingQuestionIds = new Set()
      const existingQuestions = currentExam.questions || []
      existingQuestions.forEach((q) => existingQuestionIds.add(q.id))

      // Process and validate each new question
      const processedNewQuestions = newQuestions.map((question, index) => {
        // Generate a new ID if the question doesn't have one
        if (!question.id) {
          // Generate a new ID in format 'qXXX' where XXX is a number
          let newId
          let counter = 1
          do {
            newId = `q${String(counter).padStart(3, '0')}`
            counter++
          } while (existingQuestionIds.has(newId))

          question.id = newId
          existingQuestionIds.add(newId)
        } else if (existingQuestionIds.has(question.id)) {
          throwError(`Câu hỏi ${index + 1} có ID đã tồn tại`)
        }

        // Validate required fields
        if (!question.type) throwError(`Câu hỏi ${index + 1} thiếu trường type`)
        if (!question.content) throwError(`Câu hỏi ${index + 1} thiếu trường content`)
        if (!question.correctAnswer) throwError(`Câu hỏi ${index + 1} thiếu trường correctAnswer`)

        // Validate question type
        const validTypes = ['multiple_choice', 'fill_in', 'ordering', 'listening', 'reading']
        if (!validTypes.includes(question.type)) {
          throwError(
            `Câu hỏi ${index + 1} có type không hợp lệ. Phải là một trong: ${validTypes.join(', ')}`
          )
        }

        // Validate options for multiple choice questions
        if (
          question.type === 'multiple_choice' &&
          (!question.options || !Array.isArray(question.options))
        ) {
          throwError(
            `Câu hỏi ${index + 1} là multiple_choice nhưng thiếu options hoặc options không phải là mảng`
          )
        }

        return question
      })

      // Combine existing questions with new questions
      const allQuestions = [...existingQuestions, ...processedNewQuestions]
      console.log(allQuestions)

      // Update the exam with all questions
      const updatedExam = await ExamsRepo.update(examId, { questions: allQuestions })
      if (!updatedExam) throwError('Không tìm thấy bài kiểm tra')

      return updatedExam
    } catch (error) {
      console.error('Error in addExamQuestions:', error)
      throwError(error.message, error.statusCode || 500)
    }
  },

  deleteExamQuestion: async (examId, questionId) => {
    try {
      if (!examId) throwError('Exam ID bắt buộc')
      if (!questionId) throwError('Question ID bắt buộc')

      // Find the exam by ID
      const currentExam = await ExamsRepo.findById(examId)
      if (!currentExam) throwError('Không tìm thấy bài kiểm tra')

      // Find the parent question that contains the child question
      const parentQuestion = currentExam.questions.find((q) =>
        q.childQuestions.some((child) => child.id === questionId)
      )
      if (!parentQuestion) throwError('Không tìm thấy câu hỏi trong bài kiểm tra')

      // Remove the child question from the parent question
      parentQuestion.childQuestions = parentQuestion.childQuestions.filter(
        (child) => child.id !== questionId
      )

      // Update the exam in the database
      await ExamsRepo.update(examId, { questions: currentExam.questions })

      return true
    } catch (error) {
      console.error('Error in deleteExamQuestion:', error)
      throwError(error.message, error.statusCode || 500)
    }
  },
  getExamsByCourseId: async (courseId) => {
    try {
      if (!courseId) throwError('Course ID bắt buộc')

      const exams = await ExamsRepo.queryExams({ courseId })
      return exams
    } catch (error) {
      console.error('Error in getExamsByCourseId:', error)
      throwError(error.message, error.statusCode || 500)
    }
  },

  async listExamsByEnrolledCourses(userId) {
    const enrollments = await enrollmentModel.find({ user: userId }).select('course')
    const courseIds = enrollments.map((e) => e.course)

    if (courseIds.length === 0) return []

    const now = new Date()

    const exams = await examsModel.find({
      course: { $in: courseIds }
      // startTime: { $gt: now }
    })

    return exams
  },

  updateExamSchedule: async (examId, body) => {
    try {
      if (!examId) throwError('Exam ID bắt buộc')

      const now = new Date()
      if (body.startTime) {
        const start = new Date(body.startTime)
        if (start < now) {
          throwError('Thời gian bắt đầu không được ở quá khứ')
        }
      }
      const updateData = {}

      if (body.startTime || body.endTime) {
        const start = new Date(body.startTime)
        const end = new Date(body.endTime)

        if (start >= end) {
          throwError('Thời gian bắt đầu phải trước thời gian kết thúc')
        }

        // if (body.time_limit !== undefined) {
        //   const timeLimitInMs = body.time_limit * 60 * 1000
        //   const timeRangeInMs = end - start

        //   if (timeRangeInMs < timeLimitInMs) {
        //     throwError('Khoảng thời gian bắt đầu và kết thúc không phù hợp')
        //   }
        // }

        updateData.startTime = start
        updateData.endTime = end
      }

      if (body.time_limit !== undefined) {
        updateData.time_limit = body.time_limit
      }

      if (body.level !== undefined) {
        const validLevels = ['N1', 'N2', 'N3', 'N4', 'N5']
        if (!validLevels.includes(body.level)) {
          throwError(`Level không hợp lệ. Phải là một trong: ${validLevels.join(', ')}`)
        }
        updateData.level = body.level
      }

      if (body.title !== undefined) {
        if (!body.title.trim()) {
          throwError('Title không được để trống')
        }
        updateData.title = body.title
      }

      if (body.description !== undefined) {
        updateData.description = body.description
      }

      if (body.courseId !== undefined) {
        if (!body.courseId.trim()) {
          throwError('Course không được để trống')
        }
        updateData.courseId = body.courseId
      }

      // Update the exam
      const updatedExam = await ExamsRepo.update(examId, updateData)
      if (!updatedExam) throwError('Không tìm thấy bài kiểm tra')

      return updatedExam
    } catch (error) {
      console.error('Error in updateExamSchedule:', error)
      throwError(error.message, error.statusCode || 500)
    }
  },

  getStudentsByExam: async (examId) => {
    try {
      if (!examId) throwError('Exam ID is required')

      const examObjectId = convert2ObjectId(examId)

      const results = await resultModel.find({ exam: examObjectId }).populate('user', 'name email')

      if (!results || results.length === 0) {
        return []
      }

      const students = results.map((result) => ({
        userId: result.user._id,
        name: result.user.name,
        email: result.user.email,
        totalScore: result.totalScore,
        isPassed: result.isPassed,
        timeSpent: result.timeSpent
      }))

      return students
    } catch (error) {
      console.error('Error in getStudentsByExam:', error)
      throwError(error.message, error.statusCode || 500)
    }
  }
}

function formatTimeSpent(startTime, endTime) {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const diffMs = end - start // milliseconds
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  return `${diffMinutes} phút`
}

module.exports = ExamService
