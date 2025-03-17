const CourseService = require("../services/course.service");
const { validateRequiredFields } = require("../validators");
const handleRequest = require("./BaseController");

const CourseController = {
  registerCourse: (req, res) =>
    handleRequest(res, () => {
      const payload = { ...req.body, userId: req.user.userId };
      return CourseService.registerCourse(payload);
    }, "Đăng ký khóa học thành công"),

  getAllCourses: (req, res) =>
    handleRequest(res, () => 
      CourseService.getAllCourse(req.user.userId),
      "Lấy thông tin tất cả khóa học thành công"
    ),

  createCourse: (req, res) =>
    handleRequest(res, () => {
      validateRequiredFields(["name", "thumb"], req.body);
      return CourseService.createCourse({ ...req.body, user: req.user.userId });
    }, "Tạo khóa học thành công"),

  updateCourse: (req, res) =>
    handleRequest(res, () => {
      validateRequiredFields(["course_id"], req.params);
      return CourseService.updateCourse(req.params.course_id, req.body);
    }, "Cập nhật khóa học thành công"),
};

module.exports = CourseController;
