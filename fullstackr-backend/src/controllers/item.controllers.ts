import { RequestHandler } from 'express'
import * as itemServices from '../services/item.services/item.services'

export const createGetItemController: CommonModels.CreateControllerFunctionType<RequestHandler> = (
  StorageClass, methodData = {}, optionalData = {}
) => async (req, res, next) => {
  try {
    const { idParamName = 'itemId' } = optionalData
    const itemId = req.params[idParamName] || '';
    if (!itemId) {
      throw new Error('No id provided...')
    }
    let item = await itemServices.getItem({
      StorageClass,
      requiredData: {},
      optionalData: {
        filter: { _id: itemId }
      },
      methodData
    })
    if (item && (item as { toObject: Function }).toObject) {
      item = (item as { toObject: Function }).toObject({ getters: true })
    }
    res.json({ item })
  } catch (error) {
    next(error)
  }
}

export const createCreateItemController: CommonModels.CreateControllerFunctionType<RequestHandler> = (
  StorageClass, methodData = {}, optionalData = {}
) => async (req, res, next) => {
  try {
    const { item } = req.body || {}
    if (!item) {
      throw new Error('No item provided...')
    }
    let createdItem = await itemServices.createItem({
      StorageClass,
      requiredData: { item },
      methodData
    })
    if (createdItem && (createdItem as { toObject: Function }).toObject) {
      createdItem = (createdItem as { toObject: Function }).toObject({ getters: true })
    }
    res.json({ createdItem })
  } catch (error) {
    next(error)
  }
}

export const createUpdateItemController: CommonModels.CreateControllerFunctionType<RequestHandler> = (
  StorageClass, methodData = {}, optionalData = {}
) => async (req, res, next) => {
  try {
    const { itemId = '' } = req.params || {}
    const { dataToBeUpdated } = req.body || {}
    if (!itemId || !dataToBeUpdated) {
      throw new Error('No id or data to be updated provided...')
    }
    let updatedItem = await itemServices.updateItem({
      StorageClass,
      requiredData: { itemId, dataToBeUpdated },
      methodData
    })
    if (updatedItem && (updatedItem as { toObject: Function }).toObject) {
      updatedItem = (updatedItem as { toObject: Function }).toObject({ getters: true })
    }
    res.json({ updatedItem })
  } catch (error) {
    next(error)
  }
}

export const createDeleteItemController: CommonModels.CreateControllerFunctionType<RequestHandler> = (
  StorageClass, methodData = {}, optionalData = {}
) => async (req, res, next) => {
  try {
    const { itemId = '' } = req.params || {}
    if (!itemId) {
      throw new Error('No id provided...')
    }
    let deletedItem = await itemServices.deleteItem({
      StorageClass,
      requiredData: { itemId },
      methodData
    })
    if (deletedItem && (deletedItem as { toObject: Function }).toObject) {
      deletedItem = (deletedItem as { toObject: Function }).toObject({ getters: true })
    }
    res.json({ deletedItem })
  } catch (error) {
    next(error)
  }
}