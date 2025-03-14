const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'pending', 'block'],
      default: 'pending',
    },
    date_of_birth: {
      type: Date,
      default: null,
    },
    sex: {
      type: Number,
    },
    avatar: {
      type: String,
      default: '',
    },
    roles: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
    phone: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
)

module.exports = model(DOCUMENT_NAME, userSchema)