const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Enrollment'
const COLLECTION_NAME = 'Enrollments'

const enrollmentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolledAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

// Create a compound index to ensure uniqueness of user-course pairs
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true })

module.exports = model(DOCUMENT_NAME, enrollmentSchema)
