import fs from 'fs'
import path from 'path'
import createRouter from './createRouter'
import users from '../data/users.json'

const usersFilePath = path.resolve(__dirname, '..', 'data', 'users.json');

export const userRouter = createRouter({
  '/:userId-get': {
    controller: (req, res) => res.json(users.find((user: any) => user.id === req.params.userId)),
    // controllerData: {
    //     StorageClass: {},
    //     methodData: {
    //         customMethod: () => Promise.resolve('Shubham')
    //     },
    // },
    idParamName: 'userId'
  },
  '/': {
    controller: (req, res) => {
      fs.writeFileSync(usersFilePath, JSON.stringify([...users, req.body.data]), 'utf-8')
      res.json(req.body.data)
    },
    // controllerData: {
    //     StorageClass: {},
    //     methodData: {
    //         customMethod: () => Promise.resolve('Shubham Tandsle')
    //     },
    // },
    idParamName: 'userId'
  },
  '/:userId-patch': {
    controller: (req, res) => {
      let u;
      let updatedUsers = users.map((user: any) => {
        if (user.id === req.params.userId) {
          u = { ...user, ...req.body.data }
          return u
        }
        return user
      })
      fs.writeFileSync(
        usersFilePath,
        JSON.stringify(updatedUsers),
        'utf-8'
      )
      res.json(u)
    },
  },
  '/:userId-delete': {
    controller: (req, res) => {
      fs.writeFileSync(usersFilePath, JSON.stringify(users.filter((user: any) => user.id !== req.params.userId)), 'utf-8')
      res.json({})
    },
    // controllerData: {
    //     StorageClass: {},
    //     methodData: {
    //         customMethod: () => Promise.resolve('Shubham Tandsle')
    //     },
    // },
    idParamName: 'userId'
  },
})

export const usersRouter = createRouter({
  '/-get': {
    controller: (req, res) => setTimeout(() => res.json(users), 2000)
  },
  '/all-get': {
    controller: (req, res, next) => next(new Error('Shubham Tandale'))
  },
})