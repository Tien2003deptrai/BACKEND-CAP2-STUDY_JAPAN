const ApiResponse = require("../core/apiResponse");
const CourseService = require("../services/course.service");


function CourseController() { }

CourseController.registerCourse = async (req, res) => {
  try {
    const data = await CourseService.registerCourse({ ...req.body, userId: req.user.userId });
    return ApiResponse.success(res, "Đăng ký khóa học thành công", data);
  } catch (error) {
    return ApiResponse.serverError(res, error.message);
  }
}

CourseController.getAllCourse = async function (req, res) {
  try {
    const data = await CourseService.getAllCourse(req.user.userId);
    return ApiResponse.success(res, "Lấy thông tin tất cả khóa học thành công", data);
  } catch (error) {
    return ApiResponse.serverError(res, error.message);
  }
};

CourseController.createCourse = async function (req, res) {
  try {
    const { name, thumb } = req.body;
    if (!name || !thumb) throw new Error("Name and thumbnail are required");
    const data = await CourseService.createCourse({ name, thumb, user: req.user.userId });
    return ApiResponse.success(res, "Tạo khóa học thành công", data);
  } catch (error) {
    return ApiResponse.serverError(res, error.message);
  }
};

CourseController.updateCourse = async function (req, res) {
  try {
    const { course_id } = req.params;
    if (!course_id) throw new Error("Course ID is required");
    const data = await CourseService.updateCourse(course_id, req.body);
    return ApiResponse.success(res, "Cập nhật khóa học thành công", data);
  } catch (error) {
    return ApiResponse.serverError(res, error.message);
  }
};

module.exports = CourseController;