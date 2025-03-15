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
          <td style="padding: 30px; color: #333333;">
            <p style="font-size: 16px; line-height: 1.5;">Xin chào <strong>${name}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.5;">Cảm ơn bạn đã đăng ký tài khoản tại Japanese Learning. Dưới đây là thông tin tài khoản của bạn:</p>
            <table style="width: 100%; background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <tr>
                <td style="font-size: 16px; padding: 8px;"><strong>Email:</strong></td>
                <td style="font-size: 16px; padding: 8px;">${email}</td>
              </tr>
              <tr>
                <td style="font-size: 16px; padding: 8px;"><strong>Mật khẩu:</strong></td>
                <td style="font-size: 16px; padding: 8px;">${password}</td>
              </tr>
            </table>
            <p style="font-size: 16px; line-height: 1.5;">Vui lòng đăng nhập và đổi mật khẩu để bảo mật tài khoản của bạn. Nếu bạn không thực hiện đăng ký này, hãy liên hệ với chúng tôi ngay lập tức.</p>
            <a href="http://localhost:3000/login" style="display: inline-block; padding: 12px 25px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">Đăng nhập ngay</a>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color: #f1f1f1; padding: 20px; text-align: center; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
            <p style="font-size: 14px; color: #666666; margin: 0;">Trân trọng,<br>Đội ngũ Japanese Learning</p>
            <p style="font-size: 12px; color: #999999; margin: 10px 0 0;">© 2025 Japanese Learning. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

module.exports = registerEmailTemplate;