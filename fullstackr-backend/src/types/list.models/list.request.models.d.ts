declare namespace ListRequestModels {
	export interface FetchListRequestModel {
		listName?: string;
		apiEndpoint?: string;
		api?: string;
		optionalRequestData?: object;
		defaultError?: string;
	}
}
