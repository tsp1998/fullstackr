//@ts-nocheck
const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: String },
  category: { type: String, ref: 'Category' },
  subCategory: { type: String, ref: 'SubCategory' },
}, {
  timestamps: true
})

module.exports = model('Product', ProductSchema)