
const AuthService = require("../services/auth.service");
const handleRequest = require("./BaseController");
const validateRequiredFields = require("../validators").validateRequiredFields;

const AuthController = {
  signUp: function (req, res) {
    handleRequest(res, function () {
      validateRequiredFields(["name", "email"], req.body);
      return AuthService.signUp({ name: req.body.name, email: req.body.email });
    }, "Tạo tài khoản thành công");
  },

  login: function (req, res) {
    handleRequest(res, function () {
      validateRequiredFields(["email", "password"], req.body);
      return AuthService.login({ email: req.body.email, password: req.body.password });
    }, "Đăng nhập thành công!");
  }
};

module.exports = AuthController;
