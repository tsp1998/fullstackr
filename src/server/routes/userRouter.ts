import fs from 'fs'
import path from 'path'
import createRouter from './createRouter'
import users from '../data/users.json'
import User from '../models/User'

const usersFilePath = path.resolve(__dirname, '..', 'data', 'users.json');

export const userRouter = createRouter({
  '/:userId-get': {
    controllerData: { StorageClass: User },
    idParamName: 'userId'
  },
  '/': { controllerData: { StorageClass: User } },
  '/:userId-patch': {
    controllerData: { StorageClass: User },
    idParamName: 'userId'
  },
  '/:userId-delete': {
    controllerData: { StorageClass: User },
    idParamName: 'userId'
  },
})

export const usersRouter = createRouter({
  '/-get': { controllerData: { StorageClass: User, dataType: 'list' }, },
})