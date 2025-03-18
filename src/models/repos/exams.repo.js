const examsModel = require('../exams.model')

const ExamsRepo = {
  findById: id => examsModel.findById(id).select('tags title contents -_id').lean(),

  findByTagAndLevel: (tags, level) => ExamsRepo.queryExams({ tags, level, isPublish: true }),

  getAll: () => examsModel.find().lean(),

  create: bodyData => examsModel.create(bodyData),

  update: (exam_id, bodyUpdate, isNew = true) =>
    examsModel.findByIdAndUpdate(exam_id, bodyUpdate, { new: isNew }),

  delete: exam_id => examsModel.deleteOne({ _id: exam_id }),

  queryExams: query => examsModel.find(query).select('-contents').lean()
}

module.exports = ExamsRepo
