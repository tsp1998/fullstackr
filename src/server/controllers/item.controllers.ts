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
    const { methodNameOfStorageClass = 'findOne', customMethod } = methodData
    const { filter = {} } = optionalData
    let item: ItemModels.ItemType
    if (customMethod) {
      item = await customMethod(filter)
    } else {
      item = await StorageClass[methodNameOfStorageClass](filter)
    }
    if (!item) {
      throw new Error('No item found with this data...')
    }
    item = (item as { toObject: Function }).toObject({ getters: true })
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
    let { methodNameOfStorageClass, customMethod } = methodData
    methodNameOfStorageClass = 'save'
    let createdItem: ItemModels.ItemType
    if (customMethod) {
      createdItem = await customMethod()
    } else {
      const newItem = new StorageClass(item)
      createdItem = await newItem[methodNameOfStorageClass]()
    }
    if (!createdItem) {
      throw new Error('Failed to create item...')
    }
    createdItem = (createdItem as { toObject: Function }).toObject({ getters: true })
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
    let { methodNameOfStorageClass, customMethod } = methodData
    methodNameOfStorageClass = 'findByIdAndUpdate'
    const { configuration = { new: true } } = optionalData
    let updatedItem: ItemModels.ItemType
    if (customMethod) {
      updatedItem = await customMethod(itemId, dataToBeUpdated, configuration)
    } else {
      updatedItem = await StorageClass[methodNameOfStorageClass](itemId, dataToBeUpdated, configuration)
    }
    if (!updatedItem) {
      throw new Error('Item not updated...')
    }
    updatedItem = (updatedItem as { toObject: Function }).toObject({ getters: true })
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
    let { methodNameOfStorageClass, customMethod } = methodData
    methodNameOfStorageClass = 'findByIdAndDelete'
    let deletedItem: ItemModels.ItemType
    if (customMethod) {
      deletedItem = await customMethod(itemId)
    } else {
      deletedItem = await StorageClass[methodNameOfStorageClass](itemId)
    }
    if (!deletedItem) {
      throw new Error('Item not deleted...')
    }
    deletedItem = (deletedItem as { toObject: Function }).toObject({ getters: true })
    res.json({ deletedItem })
  } catch (error) {
    next(error)
  }
}