const ApiResponse = require("../core/apiResponse");
const LessonService = require("../services/lesson.service");

function LessonController() { }

LessonController.createLesson = async (req, res) => {
  try {
    const { course_id } = req.params;
    const { lesson_title, ...bodyData } = req.body;
    const data = await LessonService.createLesson({ course_id, lesson_title, ...bodyData });
    return ApiResponse.success(res, "Tạo bài học thành công", data);
  } catch (error) {
    return ApiResponse.serverError(res, error.message);
  }
}

LessonController.getAllLesson = async (req, res) => {
  try {
    const { userId } = req.user.userId;
    const { course_id, } = req.params;
    const data = await LessonService.getAllLesson({ userId, course_id });
    return ApiResponse.success(res, "Lấy thông tin tất cả bài học", data);
  } catch (error) {
    return ApiResponse.serverError(res, error.message);
  }
}

module.exports = LessonController;