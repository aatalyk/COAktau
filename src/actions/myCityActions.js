import { FETCH_MY_CITY_REQUESTED, FETCH_MY_CITY_SUCCEEDED, FETCH_MY_CITY_FAILED } from './types';

export const fetchMyCityRequested = () => ({
	type: FETCH_MY_CITY_REQUESTED
});

export const fetchMyCitySucceeded = news => ({
	type: FETCH_MY_CITY_SUCCEEDED,
	news
});

export const fetchMyCityFailed = error => ({
	type: FETCH_MY_CITY_FAILED,
	error
});
