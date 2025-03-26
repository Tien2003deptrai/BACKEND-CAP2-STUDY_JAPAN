const AuthService = require('../../services/auth.service')
const handleRequest = require('../BaseController')
const { validateRequiredFields } = require('../../validators')

// jest.mock("../../src/services/auth.service");
// jest.mock("../../src/controllers/BaseController");
// jest.mock("../../src/validators");

describe('AuthController() AuthController method', () => {
  let req, res

  beforeEach(() => {
    req = { body: {} }
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
  })

  describe('Happy paths', () => {
    it('should sign up successfully with valid data', async () => {
      // Arrange
      req.body = { name: 'John Doe', email: 'john@example.com' }
      AuthService.signUp.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' })
      handleRequest.mockImplementation((res, fn, successMessage) =>
        fn().then((data) => res.json({ message: successMessage, data }))
      )

      // Act
      await AuthController.signUp(req, res)

      // Assert
      expect(validateRequiredFields).toHaveBeenCalledWith(['name', 'email'], req.body)
      expect(AuthService.signUp).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Tạo tài khoản thành công',
        data: { id: 1, name: 'John Doe', email: 'john@example.com' }
      })
    })

    it('should log in successfully with valid credentials', async () => {
      // Arrange
      req.body = { email: 'john@example.com', password: 'password123' }
      AuthService.login.mockResolvedValue({ token: 'abc123' })
      handleRequest.mockImplementation((res, fn, successMessage) =>
        fn().then((data) => res.json({ message: successMessage, data }))
      )

      // Act
      await AuthController.login(req, res)

      // Assert
      expect(validateRequiredFields).toHaveBeenCalledWith(['email', 'password'], req.body)
      expect(AuthService.login).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Đăng nhập thành công!',
        data: { token: 'abc123' }
      })
    })
  })

  describe('Edge cases', () => {
    it('should handle missing required fields for sign up', async () => {
      // Arrange
      req.body = { email: 'john@example.com' } // Missing 'name'
      const error = new Error('Missing required fields: name')
      validateRequiredFields.mockImplementation(() => {
        throw error
      })
      handleRequest.mockImplementation((res, fn) =>
        fn().catch((err) => res.status(400).json({ error: err.message }))
      )

      // Act
      await AuthController.signUp(req, res)

      // Assert
      expect(validateRequiredFields).toHaveBeenCalledWith(['name', 'email'], req.body)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields: name' })
    })

    it('should handle missing required fields for login', async () => {
      // Arrange
      req.body = { email: 'john@example.com' } // Missing 'password'
      const error = new Error('Missing required fields: password')
      validateRequiredFields.mockImplementation(() => {
        throw error
      })
      handleRequest.mockImplementation((res, fn) =>
        fn().catch((err) => res.status(400).json({ error: err.message }))
      )

      // Act
      await AuthController.login(req, res)

      // Assert
      expect(validateRequiredFields).toHaveBeenCalledWith(['email', 'password'], req.body)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields: password' })
    })

    it('should handle AuthService signUp failure', async () => {
      // Arrange
      req.body = { name: 'John Doe', email: 'john@example.com' }
      const error = new Error('Sign up failed')
      AuthService.signUp.mockRejectedValue(error)
      handleRequest.mockImplementation((res, fn) =>
        fn().catch((err) => res.status(500).json({ error: err.message }))
      )

      // Act
      await AuthController.signUp(req, res)

      // Assert
      expect(AuthService.signUp).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ error: 'Sign up failed' })
    })

    it('should handle AuthService login failure', async () => {
      // Arrange
      req.body = { email: 'john@example.com', password: 'password123' }
      const error = new Error('Login failed')
      AuthService.login.mockRejectedValue(error)
      handleRequest.mockImplementation((res, fn) =>
        fn().catch((err) => res.status(500).json({ error: err.message }))
      )

      // Act
      await AuthController.login(req, res)

      // Assert
      expect(AuthService.login).toHaveBeenCalledWith(req.body)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ error: 'Login failed' })
    })
  })
})
