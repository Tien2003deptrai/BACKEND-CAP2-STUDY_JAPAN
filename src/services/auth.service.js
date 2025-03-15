const { BadRequestError } = require("../core/error.response");
const roleModel = require("../models/role.model");
const userModel = require("../models/user.model");
const AuthValidator = require("../validators/auth.validator");
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require("./keyToken.service");

const RoleApp = {
  Admin: 'admin',
  User: 'user',
  Teacher: 'teacher'
}

class AuthService {
  static signUp = async ({ name, email, password }) => {
    // Implement signup logic here
    AuthValidator.validatorSignUp(name, email, password)

    const userExists = userModel.findOne({ email }).lean();

    if (userExists) {
      throw new BadRequestError("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const roleUser = await userModel.findOne({ roles: RoleApp.roles }).lean();
    const newUser = await userModel.create({ name, email, password: passwordHash, role: roleUser._id });

    if (newUser) {
      const publicKey = crypto.randomBytes(64).toString('hex');
      const privateKey = crypto.randomBytes(64).toString('hex');

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newUser._id,
        publicKey,
        privateKey,
      })

      if (!keyStore) {
        throw new BadRequestError("Key store error");
      }

    }
  }
}

module.exports = AuthService;