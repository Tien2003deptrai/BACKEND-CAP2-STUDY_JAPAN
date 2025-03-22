const RenshuuService = require('../services/renshuu.service')
const handleRequest = require('./BaseController')

const RenshuuController = {
  createRenshuu: async (req, res) =>
    handleRequest(res, () => RenshuuService.createRenshuu(req.body), 'Tạo Renshuu thành công'),

  updateRenshuu: async (req, res) =>
    handleRequest(
      res,
      () => RenshuuService.updateRenshuu(req.params.renshuu_id, req.body),
      'Cập nhật Renshuu thành công'
    ),

  deleteRenshuu: async (req, res) =>
    handleRequest(
      res,
      () => RenshuuService.deleteRenshuu(req.params.renshuu_id),
      'Xóa Renshuu thành công'
    )
}

module.exports = RenshuuController
