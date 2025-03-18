const ApiRes = require('../res/ApiRes')

module.exports = (res, serviceMethod, message) =>
  serviceMethod()
    .then(data => ApiRes.success(res, message, data))
    .catch(err => ApiRes.error(res, err.message || 'Lỗi hệ thống', err.status || 500))
