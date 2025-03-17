const ApiRes = require("../res/ApiRes");

module.exports = (err, req, res, next) => ApiRes.error(res, err.message, err.status || 500);
