import { FETCH_FAQ_BEGIN, FETCH_FAQ_SUCCESS, FETCH_FAQ_FAIL } from './types';
import * as api from '../config';

export const fetchFAQ = () => {
	return dispatch => {
		dispatch(fetchFAQBegin);
		api.fetchFAQ((items, error) => {
			if (error) {
				dispatch(fetchFAQFail(error));
				return;
			}
			dispatch(fetchFAQSuccess(items));
		});
	};
};

const fetchFAQBegin = () => ({
	type: FETCH_FAQ_BEGIN
});

const fetchFAQSuccess = items => ({
	type: FETCH_FAQ_SUCCESS,
	payload: items
});

const fetchFAQFail = error => ({
	type: FETCH_FAQ_FAIL,
	payload: error
});
