
class AuthValidator {

  static validatorSignUp = (data) => {
    if (!data.name || data.name.length < 5) {
      throw new ForbiddenError('Name invalid')
    }
    if (!data.email || data.email.length < 8) {
      throw new ForbiddenError('Email invalid')
    }
    if (!data.password || data.password.length < 6) {
      throw new ForbiddenError('Password invalid')
    }
  }

  static validatorLogin = (data) => {
    if (!data.email || data.email.length < 8) {
      throw new ForbiddenError('Email invalid')
    }
    if (!data.password) {
      throw new ForbiddenError('Password invalid')
    }
  }
}

module.exports = AuthValidator