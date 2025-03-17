const CourseService = require("../services/course.service");
const { validateRequiredFields } = require("../validators");
const handleRequest = require("./BaseController");

const CourseController = {
  registerCourse: function (req, res) {
    handleRequest(res, function () {
      var payload = Object.assign({}, req.body, { userId: req.user.userId });
      return CourseService.registerCourse(payload);
    }, "Đăng ký khóa học thành công");
  },

  getAllCourses: function (req, res) {
    handleRequest(res, function () {
      return CourseService.getAllCourse(req.user.userId);
    }, "Lấy thông tin tất cả khóa học thành công");
  },

  createCourse: function (req, res) {
    handleRequest(res, function () {
      validateRequiredFields(["name", "thumb"], req.body);
      var courseData = { name: req.body.name, thumb: req.body.thumb, user: req.user.userId };
      return CourseService.createCourse(courseData);
    }, "Tạo khóa học thành công");
  },

  updateCourse: function (req, res) {
    handleRequest(res, function () {
      validateRequiredFields(["course_id"], req.params);
      return CourseService.updateCourse(req.params.course_id, req.body);
    }, "Cập nhật khóa học thành công");
  }
};

module.exports = CourseController;
