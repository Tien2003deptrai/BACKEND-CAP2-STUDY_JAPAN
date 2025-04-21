const Progression = require('../models/progression.model')

const ProgressionService = {
  saveGameResult: async ({ userId, gameType, correctPairs, totalCards, duration }) => {
    return await Progression.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          gameProgress: {
            gameType,
            correctPairs,
            totalCards,
            duration,
            playedAt: new Date()
          }
        }
      },
      { upsert: true, new: true }
    )
  },

  getGameHistory: async ({ userId, gameType }) => {
    const prog = await Progression.findOne({ user: userId }).lean()
    if (!prog || !prog.gameProgress) return []

    return prog.gameProgress
      .filter((g) => g.gameType === gameType)
      .sort((a, b) => new Date(b.playedAt) - new Date(a.playedAt))
  },

  saveMiniRPGResult: async ({ userId, name, score, totalQuestions, duration }) => {
    return await Progression.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          gameProgress: {
            gameType: 'MiniRPG',
            score,
            name, // 👈 THÊM DÒNG NÀY
            totalQuestions,
            duration,
            playedAt: new Date()
          }
        }
      },
      { upsert: true, new: true }
    )
  },
  getMiniRPGHistory: async (userId) => {
    const prog = await Progression.findOne({ user: userId }).lean()
    if (!prog || !prog.gameProgress) return []

    return prog.gameProgress
      .filter((g) => g.gameType === 'MiniRPG')
      .sort((a, b) => new Date(b.playedAt) - new Date(a.playedAt))
  }
}

module.exports = ProgressionService
