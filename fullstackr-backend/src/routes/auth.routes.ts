//@ts-nocheck
import { Router } from 'express'
import User from '../models/User'
import * as authControllers from '../controllers/auth.controllers'
import * as itemControllers from '../controllers/item.controllers'
import * as userMiddlewares from '../middlewares/user.middlewares'
const router = Router()

router.post('/login', authControllers.login)
router.post(
  '/signup',
  userMiddlewares.usernameModifier,
  userMiddlewares.passwordHasher,
  itemControllers.createCreateItemController(User)
)

module.exports = router