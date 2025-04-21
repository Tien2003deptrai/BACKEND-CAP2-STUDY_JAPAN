const ProgressionService = require('../services/progression.service')

const ProgressionController = {
  saveGameResult: async (req, res) => {
    const { userId, gameType, correctPairs, totalCards, duration } = req.body
    const result = await ProgressionService.saveGameResult({
      userId,
      gameType,
      correctPairs,
      totalCards,
      duration
    })
    res.json({ message: 'Game result saved!', data: result })
  },

  getGameHistory: async (req, res) => {
    const { userId, gameType } = req.query
    const result = await ProgressionService.getGameHistory({ userId, gameType })
    res.json({ message: 'Game history fetched!', data: result })
  },

  saveMiniRPGResult: async (req, res) => {
    const { userId, name, score, duration } = req.body
    const result = await ProgressionService.saveMiniRPGResult({ userId, name, score, duration })
    res.json({ message: 'MiniRPG result saved!', data: result })
  },

  getMiniRPGHistory: async (req, res) => {
    const { userId } = req.query
    const result = await ProgressionService.getMiniRPGHistory(userId)
    res.json({ message: 'MiniRPG history fetched!', data: result })
  }
}

module.exports = ProgressionController
