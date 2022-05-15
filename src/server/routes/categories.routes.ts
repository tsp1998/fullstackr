//@ts-nocheck
const { Router } = require('express')
const categoriesControllers = require('../controllers/categories.controllers')

const router = Router()

router.get('/', categoriesControllers.getCategories)
router.get('/:categoryId', categoriesControllers.getCategory)
router.post('/', categoriesControllers.createCategory)

module.exports = router