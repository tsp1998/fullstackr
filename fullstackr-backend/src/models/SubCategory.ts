//@ts-nocheck
const { Schema, model, Types } = require('mongoose')

const SubCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  category: { type: Types.ObjectId, ref: 'category', default: 'root' }
}, {
  timestamps: true
})

module.exports = model('SubCategory', SubCategorySchema)