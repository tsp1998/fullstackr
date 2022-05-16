import { ItemReducerConstants } from '../../../constants/item.constants'
export const setItem = (
  reducerName: string, item: ItemStateTypes.ItemReducerModel
): ItemStateTypes.SetItemActionModel => ({
  type: `${ItemReducerConstants.SET_ITEM}_${reducerName}`,
  payload: { reducerName, item },
});

export const updateItem = (
  reducerName: string, item: Partial<ItemStateTypes.ItemReducerModel>
): ItemStateTypes.UpdateItemActionModel => ({
  type: `${ItemReducerConstants.UPDATE_ITEM}_${reducerName}`,
  payload: { reducerName, item },
});