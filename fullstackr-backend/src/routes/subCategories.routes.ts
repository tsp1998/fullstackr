//@ts-nocheck
const { Router } = require('express')
const subCategoriesControllers = require('../controllers/subCategories.controllers')

const router = Router()

router.get('/', subCategoriesControllers.getSubCategories)
router.get('/:subCategoryId', subCategoriesControllers.getSubCategory)
router.post('/', subCategoriesControllers.createSubCategory)

module.exports = router