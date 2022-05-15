import { RequestHandler } from 'express'
import * as listServices from '../services/list.services/list.services'

exports.createGetListController = (
  ModelClass: ModelModels.ModelType,
  methodNameOrFunction: ModelModels.MethodNameOrFunctionType,
): RequestHandler => async (req, res, next) => {
  try {
    const { start = -1, end = -1, count = -1 } = req.query || {}
    const {  filter = {} } = req.params || {}
    let items: Array<ItemModels.ItemType>
    if (typeof methodNameOrFunction === 'function') {
      items = await methodNameOrFunction(filter) as Array<ItemModels.ItemType>
    } else {
      items = await ModelClass[methodNameOrFunction](filter)
    }
    if (!items || !items.length) {
      throw new Error('No list items found...')
    }
    items = items.map(
      item => item && (item as { toObject: Function }).toObject ?
        (item as { toObject: Function }).toObject({ getters: true }) :
        item
    )
    res.json({ items })
  } catch (error) {
    next(error)
  }
}