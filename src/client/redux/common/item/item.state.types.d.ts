declare namespace ItemStateTypes {
	export interface ItemReducerModel {
		loading?: boolean;
		errorMessage?: string | null;
		[key: string]: any;
	}

	export type ItemReducerReturnType<T = {}> = (
		state: ItemReducerModel,
		action: ReduxTypes.ActionModel
	) => ItemReducerModel & T;

	interface FetchItemActionPayloadModel {
		reducerName: string;
		optionalActionData?: CommonStateModels.OptionalActionDataModel;
		requestBody: APITypes.RequestBody;
	}

	export interface FetchItemActionModel extends ReduxTypes.ActionModel {
		payload: FetchItemActionPayloadModel;
	}

	export interface FetchItemSuccessActionModel extends ReduxTypes.ActionModel {
		payload: Partial<ItemResponseModels.FetchItemResponseModel> & {
			reducerName: string;
		};
	}

	export interface FetchItemFailActionModel extends ReduxTypes.ActionModel {
		payload: { reducerName: string; errorMessage: string };
	}

	export interface ReplaceItemInItemActionModel extends ReduxTypes.ActionModel {
		payload: { reducerName: string; item: ItemModels.ItemType };
	}

	export interface CreateItemActionModel extends ReduxTypes.ActionModel {
		payload: {
			apiEndpoint: string;
			reducerName: string;
			item: ItemModels.ItemType;
			optionalRequestData: { [key: string]: ItemModels.ItemType };
			optionalActionData?: CommonStateModels.OptionalActionDataModel;
		};
	}
	/**
	 * @property payload - which will contain some of create Item response object props
	 */
	export interface CreateItemSuccessActionModel extends ReduxTypes.ActionModel {
		payload: Partial<ItemResponseModels.CreateItemResponseModel> & {
			reducerName: string;
		};
	}
	/**
	 * @property payload - object which will contain error object
	 */
	export interface CreateItemFailActionModel extends ReduxTypes.ActionModel {
		payload: { reducerName: string; errorMessage: string };
	}

	export interface SetItemActionModel extends ReduxTypes.ActionModel {
		payload: {
			reducerName: string;
			item: ItemReducerModel;
		};
	}

	export interface UpdateItemActionModel extends ReduxTypes.ActionModel {
		payload: {
			reducerName: string;
			item: Partial<ItemReducerModel>;
		};
	}
}
