class ApiRes {
  constructor({ status, success, message = null, data = null, error = null }) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static send(res, options) {
    if (!res || typeof res.status !== "function") throw new Error("Invalid response object");
    return res.status(options.status).json(new ApiRes(options));
  }

  static success(res, message, data = null) {
    return this.send(res, { status: 200, success: true, message, data });
  }

  static error(res, message, error, status = 400) {
    return this.send(res, { status, success: false, message, error });
  }
}

module.exports = ApiRes;
