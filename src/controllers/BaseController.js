const ApiRes = require("../res/ApiRes");

function handleRequest(res, serviceMethod, message) {
  serviceMethod()
    .then(function (data) {
      ApiRes.success(res, message, data);
    })
    .catch(function (error) {
      ApiRes.error(res, error.message || "Lỗi hệ thống", error, 500);
    });
}

module.exports = handleRequest;
