const courseModel = require('../course.model')

const CourseRepo = {
  findById: course_id => courseModel.findById(course_id).lean(),
  findByName: name => courseModel.findOne({ name }).lean(),
  getAll: () => courseModel.find().lean(),
  updateCourse: (course_id, bodyUpdate, isNew = true) =>
    courseModel.findByIdAndUpdate(course_id, bodyUpdate, { new: isNew })
}

module.exports = CourseRepo
