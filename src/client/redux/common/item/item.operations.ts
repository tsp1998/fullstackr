import { takeEvery, call, put, all } from 'redux-saga/effects';
//actions
import * as itemApiActions from './item.api.actions';
//apis
import restApi from '../../../apis/rest';
import { ItemReducerConstants } from '../../../constants/item.constants';

function* fetchItem(action: ItemStateTypes.FetchItemActionModel) {
	const {
		payload: { reducerName, requestBody, optionalActionData },
	} = action;
	try {
		yield put({ type: `${ItemReducerConstants.FETCH_ITEM_START}_${reducerName}` });
		const response: APITypes.ResponseModel = yield call<any>(restApi, requestBody);
		if (response.status === 'error') {
			throw new Error('Failed to fetch Item');
		}
		yield put(itemApiActions.fetchItemSuccess(reducerName, response.data!));
	} catch (error) {
		yield put(itemApiActions.fetchItemFail(reducerName, (error as Error).message));
	}
}

function* onFetchItem() {
	yield takeEvery(ItemReducerConstants.FETCH_ITEM_START, fetchItem);
}

export function* itemSagas() {
	yield all([call(onFetchItem)]);
}
