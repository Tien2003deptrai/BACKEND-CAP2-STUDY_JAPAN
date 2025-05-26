const ChartService = require('../services/chart.service')

const getChartStudentGrowth = async (req, res) => {
  const data = await ChartService.getStudentGrowth()
  res.json({ success: true, data })
}

const getChartCourseRegistrations = async (req, res) => {
  const data = await ChartService.getCourseRegistrations()
  res.json({ success: true, data })
}

const getChartLearningLevels = async (req, res) => {
  const data = await ChartService.getLearningLevels()
  res.json({ success: true, data })
}

const getChartCompletionRate = async (req, res) => {
  const data = await ChartService.getCompletionRate()
  res.json({ success: true, data })
}

const getChartGameActivity = async (req, res) => {
  const data = await ChartService.getGameActivity()
  res.json({ success: true, data })
}

module.exports = {
  getChartStudentGrowth,
  getChartCourseRegistrations,
  getChartLearningLevels,
  getChartCompletionRate,
  getChartGameActivity
}
