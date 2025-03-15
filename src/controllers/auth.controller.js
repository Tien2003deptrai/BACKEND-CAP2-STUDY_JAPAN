const ApiResponse = require("../core/apiResponse");
const AuthService = require("../services/auth.service");


function AuthController() { }

AuthController.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const data = await AuthService.signUp({ name, email, password });
    return ApiResponse.success(res, 'Sign up successfully', data);
  } catch (error) {
    return ApiResponse.error(res, 'Sign up failed', error);
  }
}

module.exports = new AuthController();