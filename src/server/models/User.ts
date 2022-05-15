//@ts-nocheck
const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true },
  email: { type: String },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: { type: String }
}, {
  timestamps: true
})

module.exports = model('User', UserSchema)