const admin = require('firebase-admin')
const dotenv = require('dotenv')

dotenv.config()

admin.initializeApp({
  credential: admin.credential.cert(require('./../utils/firebase-adminsdk.json')),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
})

const bucket = admin.storage().bucket()

module.exports = { bucket }
