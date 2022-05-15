//@ts-nocheck
const Category = require('../../models/Category')

exports.createCategory = async (category) => {
  if (!category) { throw new Error('No category provided...') }
  const newCategory = new Category(category)
  const response = await newCategory.save()
  if (!response) { throw new Error('Failed to create category...') }
  return response
}

exports.getCategories = async () => {
  const response = await Category.find()
  if (!response || !response.length) { throw new Error('No Categories found...') }
  return response
}

exports.getCategory = async (categoryId) => {
  if (!categoryId) { throw new Error('No category id provided...') }
  const response = await Category.findById(categoryId)
  if (!response) { throw new Error('No Category found with provided id...') }
  return response
}