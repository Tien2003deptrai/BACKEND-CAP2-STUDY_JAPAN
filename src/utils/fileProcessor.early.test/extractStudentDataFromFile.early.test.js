const { extractStudentDataFromFile } = require('../fileProcessor')
const xlsx = require('xlsx')
const fs = require('fs')
jest.mock('fs')
jest.mock('xlsx')

describe('extractStudentDataFromFile() extractStudentDataFromFile method', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Happy Paths', () => {
    it('should extract student data correctly from a valid file', () => {
      // Arrange
      const filePath = 'path/to/valid/file.xlsx'
      const mockData = [
        { studentId: '123', email: 'student@example.com', name: 'John Doe' },
        { student_id: '456', Email: 'jane@example.com', fullName: 'Jane Smith' }
      ]
      const expectedData = [
        { studentId: '123', email: 'student@example.com', name: 'John Doe' },
        { studentId: '456', email: 'jane@example.com', name: 'Jane Smith' }
      ]

      fs.existsSync.mockReturnValue(true)
      xlsx.readFile.mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: { Sheet1: {} }
      })
      xlsx.utils.sheet_to_json.mockReturnValue(mockData)

      // Act
      const result = extractStudentDataFromFile(filePath)

      // Assert
      expect(result).toEqual(expectedData)
      expect(fs.unlinkSync).toHaveBeenCalledWith(filePath)
    })

    it('should handle different column name cases for studentId, email, and name', () => {
      // Arrange
      const filePath = 'path/to/valid/file.xlsx'
      const mockData = [{ ID: '789', EMAIL: 'another@example.com', NAME: 'Another Student' }]
      const expectedData = [
        { studentId: '789', email: 'another@example.com', name: 'Another Student' }
      ]

      fs.existsSync.mockReturnValue(true)
      xlsx.readFile.mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: { Sheet1: {} }
      })
      xlsx.utils.sheet_to_json.mockReturnValue(mockData)

      // Act
      const result = extractStudentDataFromFile(filePath)

      // Assert
      expect(result).toEqual(expectedData)
      expect(fs.unlinkSync).toHaveBeenCalledWith(filePath)
    })
  })

  describe('Edge Cases', () => {
    it('should throw an error if the file does not exist', () => {
      // Arrange
      const filePath = 'path/to/nonexistent/file.xlsx'

      fs.existsSync.mockReturnValue(false)

      // Act & Assert
      expect(() => extractStudentDataFromFile(filePath)).toThrow('File not found')
      expect(fs.unlinkSync).not.toHaveBeenCalled()
    })

    it('should throw an error if the file contains no data', () => {
      // Arrange
      const filePath = 'path/to/empty/file.xlsx'

      fs.existsSync.mockReturnValue(true)
      xlsx.readFile.mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: { Sheet1: {} }
      })
      xlsx.utils.sheet_to_json.mockReturnValue([])

      // Act & Assert
      expect(() => extractStudentDataFromFile(filePath)).toThrow('No data found in file')
      expect(fs.unlinkSync).toHaveBeenCalledWith(filePath)
    })

    it('should filter out rows with no usable identification', () => {
      // Arrange
      const filePath = 'path/to/file.xlsx'
      const mockData = [
        { studentId: '', email: '', name: 'No ID or Email' },
        { studentId: '101', email: '', name: 'Valid Student' }
      ]
      const expectedData = [{ studentId: '101', email: '', name: 'Valid Student' }]

      fs.existsSync.mockReturnValue(true)
      xlsx.readFile.mockReturnValue({
        SheetNames: ['Sheet1'],
        Sheets: { Sheet1: {} }
      })
      xlsx.utils.sheet_to_json.mockReturnValue(mockData)

      // Act
      const result = extractStudentDataFromFile(filePath)

      // Assert
      expect(result).toEqual(expectedData)
      expect(fs.unlinkSync).toHaveBeenCalledWith(filePath)
    })
  })
})
