const fs = require('fs')
const path = require('path')

const extractStudentDataFromFile = (filePath) => {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found')
    }

    // Read the workbook
    const workbook = xlsx.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    // Convert to JSON
    const data = xlsx.utils.sheet_to_json(worksheet, { defval: '' })

    if (!data || data.length === 0) {
      throw new Error('No data found in file')
    }

    // Map and clean the data
    const studentData = data
      .map((row) => {
        // Try to find student identification fields with various possible column names
        const studentId = row.studentId || row.student_id || row.id || row.ID || row.Id || ''
        const email = row.email || row.Email || row.EMAIL || ''
        const name = row.name || row.Name || row.NAME || row.fullName || row.full_name || ''

        // Return cleaned data
        return {
          studentId: studentId.toString().trim(),
          email: email.toString().trim(),
          name: name.toString().trim()
        }
      })
      .filter((student) => {
        // Filter out rows with no usable identification
        return student.studentId || student.email
      })

    // Delete the temporary file after processing
    fs.unlinkSync(filePath)

    return studentData
  } catch (error) {
    // Make sure we don't leave temporary files around on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    throw error
  }
}

module.exports = {
  extractStudentDataFromFile
}
