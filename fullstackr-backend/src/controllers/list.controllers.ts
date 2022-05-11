import { RequestHandler } from 'express'
import * as listServices from '../services/list.services/list.services'

exports.createGetListController = (
  ModelClass: ModelModels.ModelType,
  methodNameOrFunction: ModelModels.MethodNameOrFunctionType,
): RequestHandler => async (req, res, next) => {
  try {
    const { start = -1, end = -1, count = -1 } = req.query || {}
    let items = await listServices.getListService({
      ModelClass,
      requiredData: {},
      optionalData: {
        start, end, count
      },
      ...(methodNameOrFunction ? { methodNameOrFunction } : {})
    })
    if (items && items.length) {
      items.map(
        item => item && (item as { toObject: Function }).toObject ?
          (item as { toObject: Function }).toObject({ getters: true }) :
          item
      )
    }
    res.json({ items })
  } catch (error) {
    next(error)
  }
}