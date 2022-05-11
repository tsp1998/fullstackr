interface ServiceFunctionParams {
  StorageClass: any;
  methodData: CommonModels.MethodData;
  requiredData: CommonModels.KeyValue;
  optionalData?: CommonModels.KeyValue;
}
export const getItem = async (
  { StorageClass, methodData = {}, requiredData, optionalData = {} }: ServiceFunctionParams
) => {
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
  return item
}

export const createItem = async (
  { StorageClass, methodData = {}, requiredData, optionalData = {} }: ServiceFunctionParams
) => {
  let { methodNameOfStorageClass, customMethod } = methodData
  methodNameOfStorageClass = 'save'
  const { item } = requiredData
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
  return createdItem
}

export const updateItem = async (
  { StorageClass, methodData = {}, requiredData, optionalData = {} }: ServiceFunctionParams
) => {
  let { methodNameOfStorageClass, customMethod } = methodData
  methodNameOfStorageClass = 'findByIdAndUpdate'
  const { itemId, dataToBeUpdated } = requiredData
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
  return updatedItem
}

export const deleteItem = async (
  { StorageClass, methodData = {}, requiredData, optionalData = {} }: ServiceFunctionParams
) => {
  let { methodNameOfStorageClass, customMethod } = methodData
  methodNameOfStorageClass = 'findByIdAndDelete'
  const { itemId } = requiredData
  let deletedItem: ItemModels.ItemType
  if (customMethod) {
    deletedItem = await customMethod(itemId)
  } else {
    deletedItem = await StorageClass[methodNameOfStorageClass](itemId)
  }
  if (!deletedItem) {
    throw new Error('Item not deleted...')
  }
  return deletedItem
}