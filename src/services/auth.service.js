const progressionModel = require("../models/progression.model");
const userModel = require("../models/user.model");
const AuthValidator = require("../validators/auth.validator");
const bcrypt = require('bcrypt');
const { getInfoData, generateToken } = require("../utils");

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

  await progressionModel.create({
    user: newUser._id,
  })

  return { success: true, user: getInfoData({ fields: ["_id", "name", "email", "roles"], object: newUser }) };
};


AuthService.login = async function ({ email, password }) {
  AuthValidator.validatorLogin(email, password);

  const user = await userModel.findOne({ email });
  if (!user) {
    return { success: false, message: "Invalid email or password" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { success: false, message: "Invalid email or password" };
  }

  const token = generateToken(user);

  return {
    success: true,
    token,
    user: getInfoData({ fields: ["_id", "name", "email", "roles"], object: user }),
  };
};


module.exports = AuthService;
