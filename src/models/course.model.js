const { model, Schema } = require('mongoose')
const slugify = require('slugify')

const DOCUMENT_NAME = 'Course'
const COLLECTION_NAME = 'Courses'

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    course_slug: {
      type: String,
    },
    type: String,
    author: {
      type: String,
    },
    stu_num: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
)
courseSchema.pre('save', function (next) {
  this.course_slug = slugify(this.name, { lower: true })
  next()
})

module.exports = model(DOCUMENT_NAME, courseSchema)
