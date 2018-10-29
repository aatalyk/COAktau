import {
	FETCH_MY_CITY_REQUESTED,
	FETCH_MY_CITY_SUCCEEDED,
	FETCH_MY_CITY_FAILED,
	FETCH_MY_CITY_ITEM_REQUESTED,
	FETCH_MY_CITY_ITEM_SUCCEEDED,
	FETCH_MY_CITY_ITEM_FAILED
} from './types';

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

export const fetchMyCityItemRequested = id => ({
	type: FETCH_MY_CITY_ITEM_REQUESTED,
	id
});

export const fetchMyCityItemSucceeded = newsItem => ({
	type: FETCH_MY_CITY_ITEM_SUCCEEDED,
	newsItem
});

export const fetchMyCityItemFailed = error => ({
	type: FETCH_MY_CITY_ITEM_FAILED,
	error
});
