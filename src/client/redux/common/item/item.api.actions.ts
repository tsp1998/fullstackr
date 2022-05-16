
import { ItemReducerConstants } from '../../../constants/item.constants'
export interface FetchItemActionParamsModel {
  reducerName: string;
  requestBody: APITypes.RequestBody;
  optionalActionData?: ReduxTypes.OptionalActionDataModel;
}

export const fetchItem = ({
  reducerName, requestBody, optionalActionData,
}: FetchItemActionParamsModel): ItemStateTypes.FetchItemActionModel => ({
  type: `${ItemReducerConstants.FETCH_ITEM_START}_${reducerName}`,
  payload: {
    requestBody,
    reducerName,
    optionalActionData,
  },
});

export const fetchItemSuccess = (
  reducerName: string,
  item: ListAndItemTypes.Item
): ItemStateTypes.FetchItemSuccessActionModel => ({
  type: `${ItemReducerConstants.FETCH_ITEM_SUCCESS}_${reducerName}`,
  payload: { reducerName, item },
});

export const fetchItemFail = (reducerName: string, errorMessage: string): ItemStateTypes.FetchItemFailActionModel => ({
  type: `${ItemReducerConstants.FETCH_ITEM_FAIL}_${reducerName}`,
  payload: { reducerName, errorMessage },
});