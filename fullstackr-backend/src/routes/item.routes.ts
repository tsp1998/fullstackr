//@ts-nocheck
const { Router } = require('express')
const itemControllers = require('../controllers/item.controllers')

// interface MiddlewaresMapModel {
// [pathNameWithMethodName: string]: Array<Function>
// }
// interface ControllersMap {
//   [pathNameWithMethodName: string]: MongooseModel
// }
const createItemRouter = (routerName, controllersMap, middlewaresMap = {}) => {
  const router = Router()
  router.get(
    `/:itemId`,
    ...(middlewaresMap[`/${routerName}_get`] || []),
    itemControllers.createGetItemController(
      controllersMap[`/${routerName}_get`] || controllersMap.default
    )
  )

  router.post(
    `/`,
    ...(middlewaresMap[`/${routerName}_post`] || []),
    itemControllers.createCreateItemController(
      controllersMap[`/${routerName}_post`] || controllersMap.default
    )
  )

  router.patch(
    `/:itemId`,
    ...(middlewaresMap[`/${routerName}_patch`] || []),
    itemControllers.createUpdateItemController(
      controllersMap[`/${routerName}_patch`] || controllersMap.default
    )
  )

  router.delete(
    `/:itemId`,
    ...(middlewaresMap[`/${routerName}_delete`] || []),
    itemControllers.createDeleteItemController(
      controllersMap[`/${routerName}_delete`] || controllersMap.default
    )
  )

  return router
}

module.exports = createItemRouter