//@ts-nocheck
const SubCategory = require('../../models/SubCategory')

exports.createSubCategory = async (subCategory) => {
  if (!subCategory) { throw new Error('No sub category provided...') }
  const newSubCategory = new SubCategory(subCategory)
  const response = await newSubCategory.save()
  if (!response) { throw new Error('Failed to create sub category...') }
  return response
}

exports.getSubCategories = async () => {
  const response = await SubCategory.find()
  if (!response || !response.length) { throw new Error('No Sub Categories found...') }
  return response
}

exports.getSubCategory = async (subCategoryId) => {
  if (!subCategoryId) { throw new Error('No sub category id provided...') }
  const response = await SubCategory.findById(subCategoryId)
  if (!response) { throw new Error('No subCategory found with provided id...') }
  return response
}