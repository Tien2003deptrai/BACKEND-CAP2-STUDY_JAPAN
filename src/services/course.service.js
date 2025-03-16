const courseModel = require("../models/course.model");
const progressionModel = require("../models/progression.model");
const userModel = require("../models/user.model");
const { removeUnderfinedObjectKey, convert2ObjectId } = require("../utils");
const NotificationService = require("./notification.service");
const CourseRepo = require("../models/repos/course.repo");


function CourseService() { }

CourseService.registerCourse = async function ({ userId, courseId }) {
  const userObjectId = convert2ObjectId(userId);
  const courseObjectId = convert2ObjectId(courseId);

  const userExists = await userModel.findById(userObjectId);
  if (!userExists) throw new Error("User not found");

  const foundCourse = await courseModel.findById(courseObjectId);
  if (!foundCourse) throw new Error("Course not found");

  const userProgession = await progressionModel.findOne({ user: userObjectId });

  if (!userProgession) {
    throw new Error("User progression data not found");
  }
  userProgession.progress.forEach((prog) => {
    if (prog.course.toString() == courseId) {
      throw new Error("User has already registered this course");
    }
  });

  foundCourse.stu_num += 1;
  await foundCourse.save();
  userProgession.progress.push({ course: courseObjectId });
  await userProgession.save();
  return 1
};

CourseService.getAllCourse = async function (userId) {
  const userObjectId = convert2ObjectId(userId);

  const listCourse = await CourseRepo.getAll();
  if (listCourse.length === 0) return [];

  const userProgression = await progressionModel.findOne({ user: userObjectId }).lean() || { progress: [] };
  const registeredCourses = new Set(userProgression ? userProgression.progress.map(p => p.course.toString()) : []);

  return listCourse.map(course => ({
    _id: course._id,
    name: course.name,
    thumb: course.thumb,
    user: course.user,
    course_slug: course.course_slug || "",
    type: course.type,
    author: course.author,
    stu_num: course.stu_num,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    registered: registeredCourses.has(course._id.toString())
  }));
};

CourseService.createCourse = async function ({ name, thumb, user }) {
  const userObjectId = convert2ObjectId(user);

  const course = await CourseRepo.findByName(name);
  if (course) throw new Error("Course name already exists");
  const author = await userModel.findById(userObjectId).lean();
  if (!author) throw new Error("Author not found");
  const newCourse = await courseModel.create({
    name,
    thumb,
    user: userObjectId,
    author: author.name
  });
  NotificationService.pushNotificationToSystem({
    type: "COURSE-001",
    receivedId: 1,
    senderId: userObjectId,
    option: {
      course_name: newCourse.name
    }
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));

  if (!newCourse) throw new Error("Create course failed");
  return newCourse;
}

CourseService.updateCourse = async function (course_id, bodyUpdate) {
  const courseObjectId = convert2ObjectId(course_id);

  const courseExists = await CourseRepo.findById(courseObjectId);
  if (!courseExists) throw new Error("Course not found");
  return await CourseRepo.updateCourse(courseObjectId, removeUnderfinedObjectKey(bodyUpdate));
}

module.exports = CourseService;