const notificationModel = require("../models/notification.model");
const { convert2ObjectId } = require("../utils");

function NotificationService() { }

const TYPE = {
  Course: "COURSE-001",
  EXAM: "EXAM-001",
};

NotificationService.pushNotificationToSystem = async ({
  type = TYPE.Course,
  receivedIds = [],
  senderId = 1,
  option
}) => {
  if (!Array.isArray(receivedIds) || receivedIds.length === 0) {
    throw new Error("No recipients provided for the notification");
  }

  let notification_content;
  if (type === TYPE.Course) {
    notification_content = `@@@ create new course @@@`;
  } else if (type === TYPE.EXAM) {
    notification_content = `@@@ create new exam in @@@`;
  }

  const notifications = receivedIds.map(id => ({
    noti_type: type,
    noti_content: notification_content,
    noti_senderId: convert2ObjectId(senderId),
    noti_receivedId: convert2ObjectId(id),
    noti_options: option,
  }));

  return await notificationModel.insertMany(notifications);
};


module.exports = NotificationService;