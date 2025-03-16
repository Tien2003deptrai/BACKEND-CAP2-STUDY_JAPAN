const notificationModel = require("../models/notification.model");
const { convert2ObjectId } = require("../utils");

function NotificationService() { }

const TYPE = {
  Course: "COURSE-001",
  EXAM: "EXAM-001",
};

NotificationService.pushNotificationToSystem = async ({ type = TYPE.Course, receivedId = 1, senderId = 1, option }) => {
  let notification_content;

  if (type === TYPE.Course) {
    notification_content = `@@@ create new course @@@`;
  } else if (type === TYPE.EXAM) {
    notification_content = `@@@ create new exam in @@@`;
  }

  const newNotifications = await notificationModel.create({
    noti_type: type,
    noti_content: notification_content,
    noti_senderId: convert2ObjectId(senderId),
    noti_receivedId: receivedId,
    noti_options: option,
  });

  return newNotifications;
};

module.exports = NotificationService;