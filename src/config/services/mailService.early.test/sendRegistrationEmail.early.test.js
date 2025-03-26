const { sendRegistrationEmail } = require('../mailService')
const { transporter } = require('../../mail/email.config')
const registerEmailTemplate = require('../../template')

// Import necessary modules and functions
// Mock the dependencies
jest.mock('../../mail/email.config', () => ({
  transporter: {
    sendMail: jest.fn()
  }
}))

jest.mock('../../template', () => jest.fn())

describe('sendRegistrationEmail() sendRegistrationEmail method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should send an email successfully with valid inputs', async () => {
      // Arrange
      const name = 'John Doe'
      const email = 'john.doe@example.com'
      const password = 'securePassword123'
      const infoResponse = { response: '250 OK' }

      transporter.sendMail.mockImplementation((mailOptions, callback) => {
        callback(null, infoResponse)
      })

      registerEmailTemplate.mockReturnValue('<html>Email Content</html>')

      // Act
      await sendRegistrationEmail(name, email, password)

      // Assert
      expect(transporter.sendMail).toHaveBeenCalledWith(
        {
          to: email,
          subject: 'Chào mừng bạn đến với Japanese Learning!',
          html: '<html>Email Content</html>'
        },
        expect.any(Function)
      )
      expect(registerEmailTemplate).toHaveBeenCalledWith(name, email, password)
    })
  })

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should throw an error if sendMail fails', async () => {
      // Arrange
      const name = 'Jane Doe'
      const email = 'jane.doe@example.com'
      const password = 'anotherSecurePassword'
      const errorMessage = 'SMTP connection error'

      transporter.sendMail.mockImplementation((mailOptions, callback) => {
        callback(new Error(errorMessage), null)
      })

      registerEmailTemplate.mockReturnValue('<html>Email Content</html>')

      // Act & Assert
      await expect(sendRegistrationEmail(name, email, password)).rejects.toThrow(
        'Lỗi gửi email đăng ký: ' + errorMessage
      )
    })

    it('should handle empty email gracefully', async () => {
      // Arrange
      const name = 'Empty Email'
      const email = ''
      const password = 'password123'
      const errorMessage = 'Invalid email address'

      transporter.sendMail.mockImplementation((mailOptions, callback) => {
        callback(new Error(errorMessage), null)
      })

      registerEmailTemplate.mockReturnValue('<html>Email Content</html>')

      // Act & Assert
      await expect(sendRegistrationEmail(name, email, password)).rejects.toThrow(
        'Lỗi gửi email đăng ký: ' + errorMessage
      )
    })

    it('should handle invalid email format', async () => {
      // Arrange
      const name = 'Invalid Email'
      const email = 'invalid-email-format'
      const password = 'password123'
      const errorMessage = 'Invalid email format'

      transporter.sendMail.mockImplementation((mailOptions, callback) => {
        callback(new Error(errorMessage), null)
      })

      registerEmailTemplate.mockReturnValue('<html>Email Content</html>')

      // Act & Assert
      await expect(sendRegistrationEmail(name, email, password)).rejects.toThrow(
        'Lỗi gửi email đăng ký: ' + errorMessage
      )
    })
  })
})
