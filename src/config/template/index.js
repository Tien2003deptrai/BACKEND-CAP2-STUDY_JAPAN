const registerEmailTemplate = (name, email, password) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Chào mừng bạn đến với Japanese Learning</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; margin: 20px auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

        <!-- Header -->
        <tr>
          <td style="background-color: #4CAF50; padding: 20px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Chào mừng bạn đến với Japanese Learning!</h1>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding: 20px; color: #333333;">
            <p>Xin chào <strong>${name}</strong>,</p>
            <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>Japanese Learning</strong>.</p>
            <p>Thông tin tài khoản của bạn:</p>
            <ul>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Mật khẩu:</strong> ${password}</li>
            </ul>
            <p>Hãy sử dụng thông tin trên để đăng nhập và bắt đầu hành trình học tiếng Nhật của bạn nhé!</p>
            <p>Chúc bạn học tập thật hiệu quả!</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #f4f4f4; padding: 20px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; font-size: 14px; color: #777777;">
            Japanese Learning &copy; 2025. All rights reserved.
          </td>
        </tr>

      </table>
    </body>
    </html>
  `
}

const resetPasswordTemplate = (name, resetLink) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="background-color: #1e88e5; padding: 20px;">
          <h2 style="color: #fff; margin: 0;">Yêu cầu đặt lại mật khẩu</h2>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Xin chào <strong>${name}</strong>,</p>
          <p style="font-size: 15px;">Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Vui lòng nhấn nút bên dưới để tiếp tục quá trình:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background: #1e88e5; color: #fff; padding: 14px 28px; font-weight: bold; border-radius: 6px; text-decoration: none; display: inline-block;">Đặt lại mật khẩu</a>
          </div>
          <p style="font-size: 14px; color: #555;">Nếu bạn không yêu cầu hành động này, hãy bỏ qua email này. Mật khẩu của bạn sẽ không thay đổi cho đến khi bạn thực hiện bước trên.</p>
          <p style="font-size: 14px; color: #888;">Trân trọng,<br/>Đội ngũ hỗ trợ <strong>StudyJapan</strong></p>
        </div>
        <div style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} StudyJapan. All rights reserved.
        </div>
      </div>
    </div>
  `
}

module.exports = { registerEmailTemplate, resetPasswordTemplate }
