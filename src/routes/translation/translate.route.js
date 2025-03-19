const express = require('express')
const axios = require('axios')
const handleRequest = require('../../controllers/BaseController')
const router = express.Router()

const translateViToJa = async (text) => {
  const searchText = encodeURIComponent(text)
  const response = await axios.get(
    `https://translate.google.com/translate_a/single?q=${searchText}&sl=vi&tl=ja&hl=en&client=it&otf=2&dj=1&ie=UTF-8&oe=UTF-8&dt=t&dt=rmt&dt=bd&dt=rms&dt=qca&dt=ss&dt=md&dt=ld&dt=ex&dt=rw`
  )
  return response.data
}

// Hàm tra từ điển từ Tracau.vn
const lookupDictionary = async (text) => {
  const searchText = encodeURIComponent(text)
  const response = await axios.get(`https://api.tracau.vn/WBBcwnwQpV89/dj/${searchText}`)
  return response.data
}

router.post('/translate/vi-to-ja', (req, res) => {
  handleRequest(res, () => translateViToJa(req.body.text), 'Dịch thành công')
})

router.post('/dictionary/lookup', (req, res) => {
  handleRequest(res, () => lookupDictionary(req.body.text), 'Tra cứu thành công')
})

module.exports = router
