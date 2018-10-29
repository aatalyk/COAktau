import {
	FETCH_NEWS_REQUESTED,
	FETCH_NEWS_SUCCEEDED,
	FETCH_NEWS_FAILED,
	FETCH_NEWS_ITEM_REQUESTED,
	FETCH_NEWS_ITEM_SUCCEEDED,
	FETCH_NEWS_ITEM_FAILED
} from './types';

export const fetchNewsRequested = () => ({
	type: FETCH_NEWS_REQUESTED
});

export const fetchNewsSucceeded = newsItems => ({
	type: FETCH_NEWS_SUCCEEDED,
	newsItems
});

export const fetchNewsFailed = error => ({
	type: FETCH_NEWS_FAILED,
	error
});

export const fetchNewsItemRequested = id => ({
	type: FETCH_NEWS_ITEM_REQUESTED,
	id
});

export const fetchNewsItemSucceeded = newsItem => ({
	type: FETCH_NEWS_ITEM_SUCCEEDED,
	newsItem
});

export const fetchNewsItemFailed = error => ({
	type: FETCH_NEWS_ITEM_FAILED,
	error
});
