import { FETCH_NEWS_REQUESTED, FETCH_NEWS_SUCCEEDED, FETCH_NEWS_FAILED } from './types';

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
