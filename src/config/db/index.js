const mongoose = require('mongoose')
const MONGO_URI = process.env.DB_NAME || 'mongodb://localhost:27017/japanese_learning'

if (!mongoose.connection.readyState) {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log(`✅ MongoDB connected! ${MONGO_URI}`))
    .catch(err => console.error('❌ MongoDB connection error:', err))
}

const createCollections = async () => {
  try {
    const collections = [
      'Users',
      'Courses',
      'Lessons',
      'Hinas',
      'Vocabularys',
      'Grammars',
      'Kanjis',
      'Decks',
      'Flashcards',
      'Exams',
      'Progressions',
      'Notifications',
      'Renshuus'
    ]

    for (const collection of collections) {
      await mongoose.connection.db.createCollection(collection)
      // console.log(`✅ Created collection: ${collection}`);
    }
  } catch (err) {
    console.error('❌ Error creating collections:', err)
  }
}

mongoose.connection.once('open', () => {
  createCollections()
})

module.exports = mongoose
