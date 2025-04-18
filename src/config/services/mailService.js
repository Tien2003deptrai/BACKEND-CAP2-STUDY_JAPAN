const { transporter } = require('../mail/email.config')
const { registerEmailTemplate, resetPasswordTemplate } = require('../template')

async function sendRegistrationEmail(name, email, password) {
  transporter.sendMail(
    {
      to: email,
      subject: 'Chào mừng bạn đến với Japanese Learning!',
      html: registerEmailTemplate(name, email, password)
    },
    function (error, info) {
      if (error) {
        console.error('Lỗi gửi email đăng ký:', error)
        throw new Error('Lỗi gửi email đăng ký: ' + error.message)
      } else {
        console.log('Email đăng ký đã gửi thành công!', info.response)
      }
    }
  )
}

async function sendResetPasswordEmail(name, email, link) {
  await transporter.sendMail({
    to: email,
    subject: 'Yêu cầu đặt lại mật khẩu - StudyJapan',
    html: resetPasswordTemplate(name, link)
  })
}

module.exports = { sendRegistrationEmail, sendResetPasswordEmail }
