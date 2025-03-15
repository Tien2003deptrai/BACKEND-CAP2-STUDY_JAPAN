const userModel = require("../models/user.model");
const { getInfoData } = require("../utils");
const AuthValidator = require("../validators/auth.validator");
const bcrypt = require('bcrypt');

function AuthService() { }

AuthService.signUp = async function ({ name, email, password }) {
  AuthValidator.validatorSignUp(name, email, password);

  const userExists = await userModel.findOne({ email }).lean(); // Thêm `await`

  if (userExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    roles: 'user',
  });

  return getInfoData(newUser, ['_id', 'name', 'email', 'roles', 'status']);
};

module.exports = AuthService;
