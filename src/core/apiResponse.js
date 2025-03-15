function ApiResponse(status, success, message, data, error) {
  this.status = status;
  this.success = success;
  this.message = message || null;
  this.data = data || null;
  this.error = error || null;
}

ApiResponse.send = function (res, status, success, message, data, error) {
  return res.status(status).json(new ApiResponse(status, success, message, data, error));
};

// Response thành công
ApiResponse.success = function (res, message, data) {
  return ApiResponse.send(res, 200, true, message, data, null);
};

// Lỗi phía client (400)
ApiResponse.error = function (res, message, error) {
  return ApiResponse.send(res, 400, false, message, null, error);
};

// Lỗi phía server (500)
ApiResponse.serverError = function (res, message, error) {
  return ApiResponse.send(res, 500, false, message, null, error);
};

module.exports = ApiResponse;
