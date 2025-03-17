const ApiRes = require("../res/ApiRes");

function errorHandler(err, req, res, next) {
  console.error(err); // Log lỗi chi tiết
  return ApiRes.serverError(res, 'Internal Server Error', err.message || err);
}

module.exports = errorHandler;
