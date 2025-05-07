const throwError = require('../res/throwError')
const examService = require('../services/exam.service')
const handleRequest = require('./BaseController')
const ExamService = require('../services/exam.service')

const examController = {
  // Public routes
  getExams: async (req, res) =>
    handleRequest(
      res,
      async () => {
        const filters = {
          level: req.query.level,
          tags: req.query.tags,
          difficulty: req.query.difficulty,
          searchTerm: req.query.search
        }
        return await examService.listAvailableExams(filters)
      },
      'Danh sách bài kiểm tra'
    ),

  getExamDetails: async (req, res) =>
    handleRequest(
      res,
      async () => {
        return await examService.getExamsById(req.params.exam_id)
      },
      'Chi tiết bài kiểm tra'
    ),

  // Protected routes for taking exam
  getExamForTaking: async (req, res) =>
    handleRequest(
      res,
      async () => {
        return await examService.getExamForTaking(req.params.exam_id, req.user.userId)
      },
      'Thông tin bài kiểm tra'
    ),

  startExam: async (req, res) =>
    handleRequest(
      res,
      async () => {
        const { attemptId, startTime, exam } = await examService.startExam(
          req.params.exam_id,
          req.user.userId
        )
        return {
          attemptId,
          startTime,
          examTitle: exam.title,
          timeLimit: exam.time_limit,
          totalQuestions: exam.questions.length
        }
      },
      'Bắt đầu bài kiểm tra thành công'
    ),

  submitExam: async (req, res) =>
    handleRequest(
      res,
      async () => {
        const { attemptId } = req.params
        const { answers } = req.body
        if (!answers || !Array.isArray(answers)) {
          throwError('Câu trả lời không hợp lệ')
        }
        return await examService.submitExam(attemptId, answers, req.user.userId)
      },
      'Nộp bài kiểm tra thành công'
    ),

  getExamResult: async (req, res) =>
    handleRequest(
      res,
      async () => {
        return await examService.getExamResult(req.params.attemptId, req.user.userId)
      },
      'Kết quả bài kiểm tra'
    ),

  getUserExamHistory: async (req, res) =>
    handleRequest(
      res,
      async () => {
        const filters = {
          examId: req.query.examId,
          status: req.query.status
        }
        return await examService.getUserExamHistory(req.user.userId, filters)
      },
      'Lịch sử kiểm tra'
    ),

  // Admin/Teacher routes
  createExam: async (req, res) =>
    handleRequest(
      res,
      async () => {
        if (req.user.roles !== 'admin' && req.user.roles !== 'teacher') {
          throwError('Không có quyền tạo bài kiểm tra')
        }

        const examData = { ...req.body, creator: req.user.userId }
        const createdExam = await examService.createExam(examData)
        return { examId: createdExam._id }
      },
      'Tạo bài kiểm tra thành công'
    ),

  deleteExam: async (req, res) =>
    handleRequest(
      res,
      async () => {
        if (req.user.roles !== 'admin' && req.user.roles !== 'teacher') {
          throwError('Không có quyền xóa bài kiểm tra')
        }
        return await examService.deleteExam(req.params.id)
      },
      'Xóa bài kiểm tra thành công'
    ),

  getExamsByTeacher: async (req, res) =>
    handleRequest(
      res,
      async () => {
        if (req.user.roles !== 'admin' && req.user.roles !== 'teacher') {
          throwError('Không có quyền xem danh sách bài kiểm tra của giáo viên')
        }
        return await examService.getExamsByTeacher(req.params.userId)
      },
      'Danh sách bài kiểm tra của giáo viên'
    ),

  updateExam: async (req, res) =>
    handleRequest(
      res,
      async () => {
        if (req.user.roles !== 'admin' && req.user.roles !== 'teacher') {
          throwError('Không có quyền cập nhật bài kiểm tra')
        }
        return await examService.updateExam(req.params.id, req.body)
      },
      'Cập nhật bài kiểm tra thành công'
    ),

  updateQuestion: async (req, res) =>
    handleRequest(
      res,
      async () => {
        if (req.user.roles !== 'admin' && req.user.roles !== 'teacher') {
          throwError('Không có quyền cập nhật câu hỏi bài kiểm tra')
        }
        return await examService.updateQuestion(req.params.examId, req.body.newQuestions)
      },
      'Cập nhật câu hỏi bài kiểm tra thành công'
    ),

  addExamQuestions: async (req, res) =>
    handleRequest(
      res,
      async () => {
        if (req.user.roles !== 'admin' && req.user.roles !== 'teacher') {
          throwError('Không có quyền thêm câu hỏi bài kiểm tra')
        }
        return await examService.addExamQuestions(req.params.id, req.body.questions)
      },
      'Thêm câu hỏi bài kiểm tra thành công'
    ),

  deleteExamQuestion: async (req, res) => {
    handleRequest(
      res,
      async () => {
        if (req.user.roles !== 'admin' && req.user.roles !== 'teacher') {
          throwError('Không có quyền cập nhật câu hỏi bài kiểm tra')
        }
        return await examService.deleteExamQuestion(req.params.examId, req.params.questionId)
      },
      'Xóa câu hỏi bài kiểm tra thành công'
    )
  },

  getExamsByUserEnrollment: async (req, res) =>
    handleRequest(
      res,
      async () => {
        const userId = req.user.userId

        const exams = await examService.listExamsByEnrolledCourses(userId)
        return exams
      },
      'Danh sách bài kiểm tra theo khóa học đã đăng ký'
    ),

  getExamsByCourseId: async (req, res) =>
    handleRequest(
      res,
      async () => {
        if (req.user.roles !== 'admin' && req.user.roles !== 'teacher') {
          throwError('Không có quyền xem danh sách bài kiểm tra của giáo viên')
        }
        return await examService.getExamsByCourseId(req.params.courseId)
      },
      'Danh sách bài kiểm tra của khóa học'
    ),

  // New routes for exam features
  checkExamTime: async (req, res) =>
    handleRequest(
      res,
      async () => {
        return await examService.checkExamTimeLimit(req.params.attemptId)
      },
      'Kiểm tra thời gian làm bài'
    ),

  handleExamInterruption: async (req, res) =>
    handleRequest(
      res,
      async () => {
        return await examService.handleExamInterruption(req.params.attemptId)
      },
      'Xử lý gián đoạn bài thi'
    ),

  saveExamProgress: async (req, res) =>
    handleRequest(
      res,
      async () => {
        const { answers } = req.body
        if (!answers || !Array.isArray(answers)) {
          throwError('Câu trả lời không hợp lệ')
        }
        return await examService.saveExamProgress(req.params.attemptId, answers)
      },
      'Lưu tiến độ làm bài thành công'
    ),

  getExamProgress: async (req, res) =>
    handleRequest(
      res,
      async () => {
        return await examService.getExamProgress(req.params.attemptId)
      },
      'Thông tin tiến độ làm bài'
    ),

  markQuestionForReview: async (req, res) =>
    handleRequest(
      res,
      async () => {
        const { questionId } = req.body
        if (!questionId) throwError('Question ID bắt buộc')
        return await examService.markQuestionForReview(req.params.attemptId, questionId)
      },
      'Đánh dấu câu hỏi thành công'
    ),

  validateExamAttempt: async (req, res) =>
    handleRequest(
      res,
      async () => {
        return await examService.validateExamAttempt(req.params.attemptId, req.user.userId)
      },
      'Kiểm tra hợp lệ bài thi'
    ),

  getExamAnalytics: async (req, res) =>
    handleRequest(
      res,
      async () => {
        if (req.user.roles !== 'admin' && req.user.roles !== 'teacher') {
          throwError('Không có quyền xem thống kê')
        }
        return await examService.getExamAnalytics(req.params.examId)
      },
      'Thống kê bài thi'
    ),

  updateExamSchedule: async (req, res) =>
    handleRequest(
      res,
      async () => {
        const { startTime, endTime } = req.body

        // Validate input
        if (!startTime || !endTime) {
          throwError('Cần cung cấp cả startTime và endTime')
        }

        return await examService.updateExamSchedule(req.params.examId, req.body)
      },
      'Cập nhật thời gian bài kiểm tra thành công'
    ),

  getStudentsByExam: async (req, res) => {
    try {
      const { examId } = req.params

      if (!examId) {
        return res.status(400).json({ message: 'Exam ID is required' })
      }

      const students = await ExamService.getStudentsByExam(examId)

      return res.status(200).json(students)
    } catch (error) {
      console.error('Error in getStudentsByExam:', error)
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  },

  getResultByExamAndStudent: async (req, res) => {
    try {
      const { examId, studentId } = req.params

      if (!examId || !studentId) {
        return res.status(400).json({ message: 'Exam ID and Student ID are required' })
      }

      const result = await ExamService.getResultByExamAndStudent(examId, studentId)

      return res.status(200).json(result)
    } catch (error) {
      console.error('Error in getResultByExamAndStudent:', error)
      return res.status(error.statusCode || 500).json({ message: error.message })
    }
  }
}

module.exports = examController
