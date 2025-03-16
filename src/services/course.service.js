const courseModel = require("../models/course.model");
const progressionModel = require("../models/progression.model");
const CourseRepo = require("../models/repos/course.repo");
const userModel = require("../models/user.model");
const { removeUnderfinedObjectKey, convert2ObjectId } = require("../utils");
const NotificationService = require("./notification.service");


function CourseSerivce() { }

CourseSerivce.registerCourse = async function ({ userId, courseId }) {
  const userExists = await userModel.findById(userId);
  if (!userExists) throw new Error("User not found");
  const foundCourse = await courseModel.findById(courseId);
  if (!foundCourse) throw new Error("Course not found");
  const userProgession = await progressionModel.findOne({ user: userId });

  userProgession.progress.forEach((prog) => {
    if (prog.course.toString() == courseId) {
      throw new Error("User has already registered this course");
    }
  })

  foundCourse.stu_num += 1;
  await foundCourse.save();
  userProgession.progress.push({ course: courseId });
  await userProgession.save();
  return 1
};

CourseSerivce.getAllCourse = async function (userId) {
  const listCourse = await CourseRepo.getAll();
  if (listCourse.length === 0) return null;

  const userProgression = await progressionModel.findOne({ user: userId });

  if (!userProgression) return listCourse;

  const listRegistered = userProgression.progress;

  return listCourse.map(course => {
    const registeredCourse = listRegistered.find(reg =>
      reg.course.toString() === course._id.toString()
    );

    return registeredCourse ? {
      ...registeredCourse,
      course: course,
      registered: true
    } : course;
  });
};

CourseSerivce.createCourse = async function ({ name, thumb, user }) {
  const course = await CourseRepo.findByName(name);
  if (course) throw new Error("Course name already exists");
  const author = await userModel.findById(convert2ObjectId(user)).lean();
  if (!author) throw new Error("Author not found");
  const newCourse = await courseModel.create({
    name,
    thumb,
    user: convert2ObjectId(user),
    author: author.name
  });
  NotificationService.pushNotificationToSystem({
    type: "COURSE-001",
    receivedId: 1,
    senderId: user,
    option: {
      course_name: newCourse.name
    }
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));

  if (!newCourse) throw new Error("Create course failed");
  return newCourse;
}

CourseSerivce.updateCourse = async function (course_id, bodyUpdate) {
  const courseExists = await CourseRepo.findById(course_id);
  if (!courseExists) throw new Error("Course not found");
  return await CourseRepo.updateCourse(course_id, removeUnderfinedObjectKey(bodyUpdate));
}

module.exports = CourseSerivce;