declare namespace ModelModels {
  export type ModelType = any;
  type MethodOrFunctionParamsType =
    [_findMethod_filter: ItemModels.KeyValueType] | // find
    [_saveMethod_item: ItemModels.ItemType] | // save
    [
      _updateMethod_itemId: string | number,
      _updateMethod_dataToBeUpdated: ItemModels.ItemType,
      _updateMethod_configuration: ItemModels.KeyValueType
    ] | // update
    [_deleteMethod_itemId: string | number] // delete
  export type MethodNameOrFunctionType = string | (
    (...params: MethodOrFunctionParamsType) =>
      ItemModels.ItemType |
      Promise<ItemModels.ItemType> |
      Array<ItemModels.ItemType> |
      Promise<Array<ItemModels.ItemType>>
  )
  export type ServiceFunctionParamsType = {
    ModelClass: ModelModels.ModelType,
    methodNameOrFunction?: ModelModels.MethodNameOrFunctionType,
    requiredData: ItemModels.KeyValueType,
    optionalData?: ItemModels.KeyValueType
  }
}