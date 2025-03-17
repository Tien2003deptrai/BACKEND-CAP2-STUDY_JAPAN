const LessonService = require("../services/lesson.service");
const handleRequest = require("./BaseController");
const validateRequiredFields = require("../validators").validateRequiredFields;

const LessonController = {
  createLesson: function (req, res) {
    handleRequest(res, function () {
      validateRequiredFields(["lesson_title"], req.body);
      const lessonData = Object.assign({}, req.body, { course_id: req.params.course_id });
      return LessonService.createLesson(lessonData);
    }, "Tạo bài học thành công");
  },

  getAllLesson: function (req, res) {
    handleRequest(res, function () {
      return LessonService.getAllLesson({ userId: req.user.userId, ...req.body });
    }, "Lấy thông tin tất cả bài học");
  },

  getOneLesson: function (req, res) {
    handleRequest(res, function () {
      validateRequiredFields(["lesson_id"], req.params);
      return LessonService.getOneLesson(req.params.lesson_id);
    }, "Lấy thông tin bài học");
  },

  updateLesson: function (req, res) {
    handleRequest(res, function () {
      validateRequiredFields(["lesson_id"], req.params);
      const updateData = Object.assign({}, req.body, { course_id: req.body.course_id });
      return LessonService.updateLesson(req.params.lesson_id, updateData);
    }, "Cập nhật bài học thành công");
  },

  releaseLesson: function (req, res) {
    handleRequest(res, function () {
      validateRequiredFields(["lesson_id"], req.params);
      return LessonService.releaseLesson(req.params.lesson_id);
    }, "Xuất bản bài học thành công");
  },

  unReleaseLesson: function (req, res) {
    handleRequest(res, function () {
      validateRequiredFields(["lesson_id"], req.params);
      return LessonService.unReleaseLesson(req.params.lesson_id);
    }, "Gỡ bài học xuất bản thành công");
  },

  getAllDraftLesson: function (req, res) {
    handleRequest(res, function () {
      return LessonService.findAllDraftLesson({ limit: req.query.limit, skip: req.query.skip });
    }, "Lấy danh sách bài học nháp");
  },

  getAllReleaseLesson: function (req, res) {
    handleRequest(res, function () {
      return LessonService.findAllReleaseLesson({ limit: req.query.limit, skip: req.query.skip });
    }, "Lấy danh sách bài học phát hành");
  }
};

module.exports = LessonController;
