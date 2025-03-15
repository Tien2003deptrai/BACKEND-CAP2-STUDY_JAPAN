const ApiResponse = require("../core/apiResponse");

function errorHandler(err, req, res, next) {
  console.error(err); // Log lỗi chi tiết
  return ApiResponse.serverError(res, 'Internal Server Error', err.message || err);
}

module.exports = errorHandler;
