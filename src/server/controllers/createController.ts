import connectToMongoDB from '../db/connectToMongoDB'
import { Request, RequestHandler } from "express"

const currentConnectionData: {id: string; disconnectFunction: Function} = {
  id: '',
  disconnectFunction: () => undefined
}

const useDB = async (req: Request) => {
  const match = req.originalUrl.match(/\/api\/(.*)\//)
  let id = match ? match[1] : ''
  const slashIndex = id.indexOf('/')
  if (slashIndex !== -1) {
    id = id.slice(0, slashIndex)
  }
  if (id !== currentConnectionData.id) {
    currentConnectionData.id = id;
    currentConnectionData.disconnectFunction()
    currentConnectionData.disconnectFunction = await connectToMongoDB({ local: true, MONGO_DB_NAME: id })
  }
}

const createController: ControllerTypes.createControllerFunctionType = (
  { requestType, dataType = 'item', StorageClass, methodData = {}, optionalData = {} }
): RequestHandler => async (req, res, next) => {
  try {
    let data: any, errorMessage: string;
    switch (requestType) {
      case 'get': {
        await useDB(req);
        const { idParamName = 'itemId', itemName = 'item' } = optionalData
        errorMessage = `No ${itemName} found with this id...`
        let itemId: string;
        if (dataType === 'item') {
          itemId = req.params[idParamName] || '';
          if (!itemId) {
            throw new Error('No id provided...')
          }
        }
        const { filter = {} } = optionalData
        const methodsDataByDataType = {
          item: { data: itemId!, methodName: 'findById' },
          list: { data: filter, methodName: 'find' }
        }
        let { methodNameOfStorageClass = methodsDataByDataType[dataType].methodName, customMethod } = methodData
        if (customMethod) {
          data = await customMethod(methodsDataByDataType[dataType].data)
        } else {
          data = await StorageClass[methodNameOfStorageClass](methodsDataByDataType[dataType].data)
        }
      } break;
      case 'post': {
        await useDB(req);
        errorMessage = 'Failed to create item...';
        const { data: comingData } = req.body || {}
        if (!comingData) { throw new Error('No item provided...') }
        let { methodNameOfStorageClass = 'save', customMethod } = methodData
        // const finalMethod = customMethod || (new StorageClass(comingData))[methodNameOfStorageClass];
        // data = await finalMethod() // TODO: check why not working
        if (customMethod) {
          data = await customMethod();
        } else {
          const item = new StorageClass(comingData);
          data = await item[methodNameOfStorageClass]();
        }
      } break;
      case 'patch': {
        await useDB(req);
        const { idParamName = 'itemId', itemName = 'item' } = optionalData
        errorMessage = `${itemName} not updated...`
        const itemId = req.params[idParamName] || '';
        const { data: dataToBeUpdated } = req.body || {}
        if (!itemId || !dataToBeUpdated) {
          throw new Error('No id or data to be updated provided...')
        }
        const { configuration = { new: true } } = optionalData
        let { methodNameOfStorageClass = 'findByIdAndUpdate', customMethod } = methodData
        if (customMethod) {
          data = await customMethod(itemId, dataToBeUpdated, configuration)
        } else {
          data = await StorageClass[methodNameOfStorageClass](itemId, dataToBeUpdated, configuration)
        }
      } break;
      case 'delete': {
        await useDB(req);
        const { idParamName = 'itemId', itemName = 'item' } = optionalData
        errorMessage = `${itemName} not deleted...`
        const itemId = req.params[idParamName] || '';
        if (!itemId) {
          throw new Error('No id provided...')
        }
        let { methodNameOfStorageClass = 'findByIdAndDelete', customMethod } = methodData
        if (customMethod) {
          data = await customMethod(itemId)
        } else {
          data = await StorageClass[methodNameOfStorageClass](itemId)
        }
      } break;
    }
    if (!data) { throw new Error(errorMessage!) }
    if (Array.isArray(data)) {
      data = data.map(
        item => item && (item as { toObject: Function }).toObject ?
          (item as { toObject: Function }).toObject({ getters: true }) :
          item
      )
    } else {
      data = (data as { toObject: Function }).toObject({ getters: true })
    }
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export default createController