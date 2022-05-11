declare namespace ItemRequestModels {
	export interface ItemRequestModel {
		itemName?: string;
		apiEndpoint?: string;
		api?: string;
		optionalRequestData?: { [key: string]: ItemModels.ItemType };
		defaultError?: string;
	}
	export interface FetchItemRequestModel extends ItemRequestModel {
		nameOfId: string;
		valueOfId: string | number;
	}

	export interface CreateItemRequestModel extends ItemRequestModel {
		item: ItemModels.ItemType;
	}

	export interface UpdateItemRequestModel extends ItemRequestModel {
		item: ItemModels.ItemType;
	}

	export interface DeleteItemRequestModel extends ItemRequestModel {
		nameOfId: string;
		valueOfId: string | number;
	}
}
