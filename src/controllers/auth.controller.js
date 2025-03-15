const ApiResponse = require("../core/apiResponse");
const AuthService = require("../services/auth.service");


function AuthController() { }

AuthController.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = await AuthService.signUp({ name, email, password });
    return ApiResponse.success(res, 'Đăng ký thành công', data);
  } catch (error) {
    return ApiResponse.serverError(res, error.message);
  }
}

AuthController.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login({ email, password });

    if (!result.success) {
      return ApiResponse.error(res, result.message);
    }

    return ApiResponse.success(res, "Đăng nhập thành công!", {
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    return ApiResponse.serverError(res, error.message);
  }
};


module.exports = AuthController;