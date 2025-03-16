const courseModel = require("../models/course.model");
const hinaModel = require("../models/hina.model");
const lessonModel = require("../models/lesson.model");
const progressionModel = require("../models/progression.model");
const LessonRepo = require("../models/repos/lesson.repo");
const { convert2ObjectId, removeUnderfinedObjectKey } = require("../utils");

function LessonService() { }

/**
 * Tạo bài học mới
 */
LessonService.createLesson = async ({ course_id, lesson_title, ...bodyData }) => {
  const courseObjectId = convert2ObjectId(course_id)

  if (!(await courseModel.exists({ _id: courseObjectId }))) {
    throw new Error("Course not found");
  }

  if (await lessonModel.findOne({ course: courseObjectId, lesson_title })) {
    throw new Error("Lesson already exists");
  }

  const newLesson = await lessonModel.create({
    course: courseObjectId,
    lesson_title,
    ...bodyData
  });

  if (!newLesson) throw new Error("New lesson not found");
  return newLesson;
}

/**
 * Lấy danh sách bài học của khóa học
 */

LessonService.getAllLesson = async ({ userId, course_id }) => {
  const userObjectId = convert2ObjectId(userId);
  const courseObjectId = convert2ObjectId(course_id)
  const courseExists = await courseModel.findById(courseObjectId).select('name type').lean();
  if (!courseExists) throw new Error("Course not found");

  const userProgression = await progressionModel.findOne({ userId: userObjectId });
  if (!userProgression) throw new Error("User progression not found");

  const listRegistered = userProgression.progress;
  if (courseExists.type == 'Hina') {
    let listLessons = await hinaModel.find({ courseId: courseObjectId }).select("lesson_id lesson_title").lean();
    let arr = [];
    for (let i = 0; i < listRegistered.length; i++) {
      for (let j = 0; j < listLessons.length; j++) {
        if (userObjectId.toString() === listRegistered[i].course.toString()) {
          arr = listRegistered[i].lessons;
        }
      }
    }

    listLessons.forEach((lesson, idx) => {
      for (let i = 0; i < arr.length; i++) {
        if (lesson._id.toString() === arr[i].toString()) {
          listLessons[idx] = {
            ...listLessons[idx],
            learnt: true,
          }
        }
      }
    })

    return {
      course: courseExists,
      listLessons: listLessons,
      type: 'Hina'
    }
  } else {
    let listLessons = await LessonRepo.getAll(courseObjectId);
    if (listLessons.length == 0) return null
    return {
      course: courseExists,
      listLessons: listLessons,
      type: 'Course'
    }
  }
}

/**
 * Lấy một bài học
 */
LessonService.getOneLesson = async function (lesson_id) {
  const lesson = await LessonRepo.findOne(lesson_id);
  if (!lesson) throw new Error("Lesson not found");
  return lesson;
};

/**
 * Cập nhật bài học
 */
LessonService.updateLesson = async (lesson_id, { course_id, lesson_title, ...bodyUpdate }) => {
  if (lesson_title && await LessonRepo.findByTitle(convert2ObjectId(course_id), lesson_title, lesson_id)) {
    throw new Error("Lesson already exists");
  }
  return await LessonRepo.update(lesson_id, removeUnderfinedObjectKey(bodyUpdate));
}

/**
 * Xuất bản bài học
 */
LessonService.releaseLesson = async function (lesson_id) {
  return await LessonRepo.releaseLesson(lesson_id);
};

/**
 * Gỡ xuất bản bài học
 */
LessonService.unReleaseLesson = async (lesson_id) => {
  return await LessonRepo.unReleaseLesson(lesson_id);
}

/**
 * Lấy danh sách bài học nháp
 */
LessonService.findAllDraftLesson = async function ({ limit = 25, skip = 0 }) {
  return await LessonRepo.findAllDraft({ query: { isDraft: true }, limit, skip });
};

/**
 * Lấy danh sách bài học đã phát hành
 */
LessonService.findAllReleaseLesson = async function ({ course_id, limit = 25, skip = 0 }) {
  return await LessonRepo.findAllRelease({ query: { course: course_id, isRelease: true }, limit, skip });
};


module.exports = LessonService; 