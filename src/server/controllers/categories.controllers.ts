//@ts-nocheck
const categoriesServices = require('../services/mongodb.services/categories.services')

exports.createCategory = async (req, res, next) => {
  try {
    const { category } = req.body
    const result = await categoriesServices.createCategory(category)
    res.json({
      status: 'success',
      createdCategory: result.toObject({ getters: true })
    })
  } catch (error) {
    next(error)
  }
}

exports.getCategories = async (req, res, next) => {
  try {
    const result = await categoriesServices.getCategories()
    res.json({
      status: 'success',
      categories: result.map(category => category.toObject({ getters: true }))
    })
  } catch (error) {
    next(error)
  }
}

exports.getCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params
    const result = await categoriesServices.getCategory(categoryId)
    res.json({
      status: 'success',
      category: result.toObject({ getters: true })
    })
  } catch (error) {
    next(error)
  }
}

exports.deleteCategory = async (req, res, next) => {

}

exports.updateCategory = async (req, res, next) => {

}