const RenshuuRepo = require('../models/repos/renshuu.repo')
const throwError = require('../res/throwError')
const { removeUnderfinedObjectKey, convert2ObjectId } = require('../utils')

const RenshuuService = {
  createRenshuu: async (bodyData) => {
    const lessonObjectId = convert2ObjectId(bodyData.lesson)
    if (!(await RenshuuRepo.findByIdLesson(lessonObjectId))) throwError('Lesson not found')
    if (await RenshuuRepo.findByTitle(bodyData.title)) throwError('Title already exists')

    return await RenshuuRepo.create({ lesson: lessonObjectId, ...bodyData })
  },

  updateRenshuu: async (renshuu_id, bodyUpdate) => {
    if (!(await RenshuuRepo.findById(renshuu_id))) throwError('Renshuu not found')

    const cleanedData = removeUnderfinedObjectKey(bodyUpdate)
    return await RenshuuRepo.update(renshuu_id, cleanedData)
  },

  deleteRenshuu: async (renshuu_id) => {
    if (!(await RenshuuRepo.findById(renshuu_id))) throwError('Renshuu not found')
    return await RenshuuRepo.delete(renshuu_id)
  }
}

module.exports = RenshuuService
