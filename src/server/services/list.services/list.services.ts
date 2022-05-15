export const getListService = async (
  { ModelClass, methodNameOrFunction = 'find', requiredData, optionalData = {} }: ModelModels.ServiceFunctionParamsType
) => {
  const { start = -1, end = -1, count = -1, filter = {} } = optionalData || {}
  let items: Array<ItemModels.ItemType>
  if (typeof methodNameOrFunction === 'function') {
    items = await methodNameOrFunction(filter) as Array<ItemModels.ItemType>
  } else {
    items = await ModelClass[methodNameOrFunction](filter)
  }
  if (!items || !items.length) {
    throw new Error('No list items found...')
  }
  return items
}