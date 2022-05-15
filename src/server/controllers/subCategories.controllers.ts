//@ts-nocheck
const subCategoriesServices = require('../services/mongodb.services/subCategories.services')

exports.createSubCategory = async (req, res, next) => {
  try {
    const { subCategory } = req.body
    const result = await subCategoriesServices.createSubCategory(subCategory)
    res.json({
      status: 'success',
      createdSubCategory: result.toObject({ getters: true })
    })
  } catch (error) {
    next(error)
  }
}

exports.getSubCategories = async (req, res, next) => {
  try {
    const result = await subCategoriesServices.getSubCategories()
    res.json({
      status: 'success',
      subCategories: result.map(subCategory => subCategory.toObject({ getters: true }))
    })
  } catch (error) {
    next(error)
  }
}

exports.getSubCategory = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params
    const result = await subCategoriesServices.getSubCategory(subCategoryId)
    res.json({
      status: 'success',
      subCategory: result.toObject({ getters: true })
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteSubCategory = async (req, res, next) => {

}

exports.updateSubCategory = async (req, res, next) => {

}