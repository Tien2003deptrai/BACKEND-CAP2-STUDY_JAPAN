const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Notification'
const COLLECTION_NAME = 'Notifications'

//EXAM-001: new exam create
//EXAM-002: end time of exam
//COURSE-001: new course created
//....

const notificationSchema = new Schema(
  {
    noti_type: {
      type: String,
      enum: ['EXAM-001', 'EXAM-002', 'COURSE-001'],
      required: true,
    },
    noti_senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    noti_receivedId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    noti_content: {
      type: String,
      required: true,
    },
    noti_options: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
)

module.exports = model(DOCUMENT_NAME, notificationSchema)
