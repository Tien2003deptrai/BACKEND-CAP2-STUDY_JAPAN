const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER || 'trungducloz11111@gmail.com',
    pass: process.env.SMTP_PASS || 'lwrs nhre roew efns',
  },
});
