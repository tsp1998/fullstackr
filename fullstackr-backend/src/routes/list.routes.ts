//@ts-nocheck
const { Router } = require('express')
const listControllers = require('../controllers/list.controllers')

// interface MiddlewaresMapModel {
// [pathNameWithMethodName: string]: Array<Function>
// }
// interface ControllersMap {
//   [pathNameWithMethodName: string]: MongooseModel
//   default: MongooseModel
// }
const createListRouter = (routerName, controllersMap, middlewaresMap = {}) => {
  const router = Router()
  router.get(
    `/`,
    ...(middlewaresMap[`/${routerName}_get`] || []),
    listControllers.createGetListController(
      controllersMap[`/${routerName}_get`] || controllersMap.default
    )
  )

  return router
}

module.exports = createListRouter