import { ItemReducerConstants } from '../../../constants/item.constants';

const normalReducer = (
  reducerName: string, state: ItemStateTypes.ItemReducerModel, action: ReduxTypes.ActionModel
): ItemStateTypes.ItemReducerModel | null => {
  switch (action.type) {
    case `${ItemReducerConstants.SET_ITEM}_${reducerName}`: {
      const {
        payload: { item },
      } = action as ItemStateTypes.SetItemActionModel;
      return item;
    }

    case `${ItemReducerConstants.UPDATE_ITEM}_${reducerName}`: {
      const {
        payload: { item },
      } = action as ItemStateTypes.UpdateItemActionModel;
      return { ...state, ...item };
    }
    default: {
      return null;
    }
  }
}

const apiReducer = (
  reducerName: string, state: ItemStateTypes.ItemReducerModel, action: ReduxTypes.ActionModel
): ItemStateTypes.ItemReducerModel | null => {
  switch (action.type) {
    case `${ItemReducerConstants.FETCH_ITEM_START}_${reducerName}`: {
      return { ...state, loading: true, errorMessage: null };
    }

    case `${ItemReducerConstants.FETCH_ITEM_SUCCESS}_${reducerName}`: {
      const {
        payload: { item, itemKey },
      } = action as ItemStateTypes.FetchItemSuccessActionModel;
      return { ...state, loading: false, [itemKey!]: item! };
    }

    case `${ItemReducerConstants.FETCH_ITEM_FAIL}_${reducerName}`: {
      const {
        payload: { errorMessage: errorMessageLocal },
      } = action as ItemStateTypes.FetchItemFailActionModel;
      return { ...state, loading: false, errorMessage: errorMessageLocal };
    }
    default: {
      return null;
    }
  }
}

const reducers = {
  normalReducer, apiReducer
}

const createItemReducer = (
  reducerName: string,
  initialState?: Partial<ItemStateTypes.ItemReducerModel>,
  reducersToApply: Array<keyof typeof reducers> = ['normalReducer']
): ItemStateTypes.ItemReducerReturnType => {
  return (
    state = initialState as ItemStateTypes.ItemReducerModel, action: ReduxTypes.ActionModel
  ): ItemStateTypes.ItemReducerModel => {
    let updatedState: ItemStateTypes.ItemReducerModel | null;
    for (const reducer of reducersToApply) {
      updatedState = reducers[reducer](reducerName, state, action);
      if (updatedState) {
        break;
      }
    }
    return updatedState! || state;
  };
};

export default createItemReducer;
