class AuthValidator {
  static validatorSignUp = (data) => {
    if (!data.name || data.name.length < 5) {
      throw new Error('Name invalid');
    }
    if (!data.email || data.email.length < 8) {
      throw new Error('Email invalid');
    }
  }

  static validatorLogin = (data) => {
    if (!data.email || data.email.length < 8) {
      throw new Error('Email invalid');
    }
    if (!data.password) {
      throw new Error('Password invalid');
    }
  }
}

module.exports = AuthValidator;
