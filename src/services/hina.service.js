const lessonModel = require('../models/lesson.model')
const progressionModel = require('../models/progression.model')
const CourseRepo = require('../models/repos/course.repo')
const HinaRepo = require('../models/repos/hina.repo')
const throwError = require('../res/throwError')
const { convert2ObjectId } = require('../utils')

const HinaService = {
  createHina: async (course_id, lesson_id, bodyData) => {
    const courseObjectId = convert2ObjectId(course_id)
    const lessonObjectId = convert2ObjectId(lesson_id)

    const foundCourse = await CourseRepo.findById(courseObjectId)
    if (!foundCourse) throwError('Course not found')

    const foundLesson = await lessonModel.findById(lessonObjectId)
    if (!foundLesson) throwError('Lesson not found')

    if (foundLesson.course.toString() !== courseObjectId.toString()) {
      throwError('Lesson does not belong to this Course')
    }

    return await HinaRepo.create(courseObjectId, lessonObjectId, bodyData)
  },

  getHinaByLesson: async ({ userId, lesson_id, course_id }) => {
    // Tìm Hina theo lesson_id
    const hinaData = await HinaRepo.findByLessonId(lesson_id)
    if (!hinaData) throwError(`Not found any Hina for lesson ${lesson_id}`)

    // Lấy tiến trình học của user
    const userProgress = await progressionModel.findOne({ user: convert2ObjectId(userId) })

    // Nếu user chưa có tiến trình học, trả về dữ liệu gốc
    if (!userProgress || !userProgress.progress) {
      return { ...hinaData, learnt: false }
    }

    // Kiểm tra xem user đã học bài học này chưa
    const registeredCourse = userProgress.progress.find((el) => el.course.toString() === course_id)

    let learnt = false
    if (registeredCourse && Array.isArray(registeredCourse.lessons)) {
      learnt = registeredCourse.lessons.some((lesson) => lesson.toString() === lesson_id)
    }

    // Trả về dữ liệu kèm trạng thái `learnt`
    return { ...hinaData, learnt }
  }
}

module.exports = HinaService
