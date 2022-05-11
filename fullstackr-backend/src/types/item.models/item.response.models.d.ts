declare namespace ItemResponseModels {
	export interface ItemResponseModel extends CommonResponseModels.ResponseModel {}
	export interface FetchItemResponseModel extends ItemResponseModel {
		item: ItemModels.ItemType;
	}

	export interface CreateItemResponseModel extends ItemResponseModel {
		createdItem: ItemModels.ItemType;
	}

	export interface UpdateItemResponseModel extends ItemResponseModel {
		updatedItem: ItemModels.ItemType;
	}

	export interface DeleteItemResponseModel extends ItemResponseModel {}
}
