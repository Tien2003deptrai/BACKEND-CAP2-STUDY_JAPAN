const nodemailer = require('nodemailer')

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER || 'congthanh0121@gmail.com',
    pass: process.env.SMTP_PASS || 'auvr hcic zozm yrzx'
  },
  logger: true, // <-- thêm dòng này
  debug: true // <-- thêm dòng này
})
