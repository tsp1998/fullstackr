import { RequestHandler } from 'express'

exports.createGetListController = (
  ModelClass: ControllerTypes.ModelClassType,
  methodNameOrFunction: ControllerTypes.ModelClassMethodNameOrCustomMethod,
): RequestHandler => async (req, res, next) => {
  try {
    const { start = -1, end = -1, count = -1 } = req.query || {}
    const {  filter = {} } = req.params || {}
    let items: ListAndItemTypes.List
    if (typeof methodNameOrFunction === 'function') {
      items = await methodNameOrFunction(filter) as ListAndItemTypes.List
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