const ApiRes = require("../res/ApiRes");

function errorHandler(err, req, res, next) {
  console.error("🚨 Error:", err.stack || err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errorDetail = typeof err === "object" ? err.stack || JSON.stringify(err) : err;

  return ApiRes.error(res, message, errorDetail, status);
}

module.exports = errorHandler;
