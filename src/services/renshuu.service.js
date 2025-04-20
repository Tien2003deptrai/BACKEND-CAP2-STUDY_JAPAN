const RenshuuRepo = require('../models/repos/renshuu.repo')
const throwError = require('../res/throwError')
const { removeUnderfinedObjectKey, convert2ObjectId } = require('../utils')

const RenshuuService = {
  createRenshuu: async (bodyData) => {
    const lessonObjectId = convert2ObjectId(bodyData.lessonId)

    const existingRenshuu = await RenshuuRepo.findByIdLesson(lessonObjectId)

    if (existingRenshuu) {
      const newQuestion = {
        content: bodyData.question.content,
        correctAnswer: bodyData.question.correctAnswer,
        options: bodyData.question.options
      }

      return await RenshuuRepo.update(existingRenshuu._id, {
        $push: { questions: newQuestion }
      })
    } else {
      return await RenshuuRepo.create({
        lesson: lessonObjectId,
        questions: [
          {
            content: bodyData.content,
            correctAnswer: bodyData.correctAnswer,
            options: bodyData.options
          }
        ]
      })
    }
  },

  updateRenshuu: async (renshuu_id, bodyUpdate) => {
    if (!(await RenshuuRepo.findById(renshuu_id))) throwError('Renshuu not found')

    const cleanedData = removeUnderfinedObjectKey(bodyUpdate)
    return await RenshuuRepo.update(renshuu_id, cleanedData)
  },

  deleteRenshuu: async (renshuu_id) => {
    if (!(await RenshuuRepo.findById(renshuu_id))) throwError('Renshuu not found')
    return await RenshuuRepo.delete(renshuu_id)
  },
  getAllRenshuuByLessonId: async (lesson_id) => {
    const lessonObjectId = convert2ObjectId(lesson_id)
    const renshuu = await RenshuuRepo.findByIdLesson(lessonObjectId)
    if (!renshuu) return []
    return renshuu
  },

  updateQuestion: async (renshuuId, questionId, questionData) => {
    console.log(questionData, renshuuId, questionId)

    const renshuu = await RenshuuRepo.findById(renshuuId)
    if (!renshuu) throwError('Renshuu not found')

    const questionExists = renshuu.questions.some(
      (question) => question._id.toString() === questionId
    )
    if (!questionExists) throwError('Question not found')

    return RenshuuRepo.updateQuestion(renshuuId, questionId, questionData)
  },

  // submit
  submitRenshuu: async (renshuuId, answers) => {
    if (!Array.isArray(answers)) throw new Error('answers must be an array')

    // Ép kiểu ObjectId cho renshuuId
    const renshuu = await RenshuuRepo.findById(renshuuId)
    if (!renshuu) throw new Error('Renshuu not found')

    const results = []
    let correctCount = 0

    console.log(
      'All Question IDs in DB:',
      renshuu.questions.map((q) => q._id.toString())
    )

    for (const answer of answers) {
      let questionIdObj
      try {
        questionIdObj = convert2ObjectId(answer.questionId)
      } catch (error) {
        results.push({
          questionId: answer.questionId,
          status: 'invalid_id'
        })
        continue
      }

      const question = renshuu.questions.find((q) => q._id.equals(questionIdObj))
      if (!question) {
        results.push({
          questionId: answer.questionId,
          status: 'not_found'
        })
        continue
      }

      const isCorrect = question.correctAnswer === answer.selectedAnswer
      if (isCorrect) correctCount++

      results.push({
        questionId: question._id,
        question: question.content,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        status: isCorrect ? 'correct' : 'incorrect'
      })
    }

    return {
      totalQuestions: renshuu.questions.length,
      correctAnswers: correctCount,
      results
    }
  }
}

module.exports = RenshuuService
