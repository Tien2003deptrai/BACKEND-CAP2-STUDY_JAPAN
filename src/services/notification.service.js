const notificationModel = require('../models/notification.model')
const { convert2ObjectId } = require('../utils')

const NotificationService = {
  TYPE: {
    COURSE: 'COURSE-001',
    EXAM: 'EXAM-001'
  },

  pushNotificationToSystem: async ({ type, receivedIds, senderId, option }) => {
    if (!Array.isArray(receivedIds) || receivedIds.length === 0) {
      throw new Error('No recipients provided for the notification')
    }

    const notificationContent = NotificationService._getNotificationContent(
      type || NotificationService.TYPE.COURSE
    )

    const notifications = receivedIds.map((id) => ({
      noti_type: type || NotificationService.TYPE.COURSE,
      noti_content: notificationContent,
      noti_senderId: convert2ObjectId(senderId),
      noti_receivedId: convert2ObjectId(id),
      noti_options: option
    }))

    return await notificationModel.insertMany(notifications)
  },

  _getNotificationContent: (type) => {
    switch (type) {
      case NotificationService.TYPE.EXAM:
        return '@@@ create new exam in @@@'
      case NotificationService.TYPE.COURSE:
      default:
        return '@@@ create new course @@@'
    }
  }
}

module.exports = NotificationService
