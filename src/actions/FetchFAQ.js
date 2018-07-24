import { FETCH_FAQ_REQUESTED, FETCH_FAQ_SUCCEEDED, FETCH_FAQ_FAILED } from './types';
import * as api from '../config';

export const fetchFAQ = () => {
	return dispatch => {
		dispatch(fetchFAQRequested);
		api.fetchFAQ((items, error) => {
			if (error) {
				dispatch(fetchFAQFailed(error));
				return;
			}
			dispatch(fetchFAQSucceeded(items));
		});
	};
};

export const fetchFAQRequested = () => ({
	type: FETCH_FAQ_REQUESTED
});

export const fetchFAQSucceeded = items => ({
	type: FETCH_FAQ_SUCCEEDED,
	payload: items
});

export const fetchFAQFailed = error => ({
	type: FETCH_FAQ_FAILED,
	payload: error
});
