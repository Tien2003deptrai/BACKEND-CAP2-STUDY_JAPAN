const throwError = require('../res/throwError')
const examService = require('../services/exam.service')
const handleRequest = require('./BaseController')

const examController = {
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
        console.log('filters', filters)

        return await examService.getUserExamHistory(req.user.userId, filters)
      },
      'Lịch sử kiểm tra'
    ),

  createExam: async (req, res) =>
    handleRequest(
      res,
      async () => {
        if (req.user.roles !== 'admin' && req.user.roles !== 'teacher') {
          console.log('req.user.role', req.user.role)
          throwError('Không có quyền tạo bài kiểm tra')
        }
        const examData = { ...req.body, creator: req.user.id }
        const createdExam = await examService.createExam(examData)
        return { examId: createdExam._id }
      },
      'Tạo bài kiểm tra thành công'
    ),

  deleteExam: async (req, res) =>
    handleRequest(
      res,
      async () => {
        if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
          throw new BadRequestError('Không có quyền xóa bài kiểm tra')
        }
        return await examService.deleteExam(req.params.id)
      },
      'Xóa bài kiểm tra thành công'
    )
}

module.exports = examController
