declare namespace ListResponseModels {
	export interface FetchListResponseModel extends CommonResponseModels.ResponseModel {
		items?: Array<ItemModels.ItemType>;
	}
}
