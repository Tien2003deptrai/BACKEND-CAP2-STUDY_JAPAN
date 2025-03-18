const validateRequiredFields = (fields, source) => {
  const missingFields = fields.filter((field) => !source[field])
  if (missingFields.length) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
  }
}

module.exports = { validateRequiredFields }
