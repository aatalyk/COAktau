import {
	FETCH_NEWS_REQUESTED,
	FETCH_NEWS_SUCCEEDED,
	FETCH_NEWS_FAILED,
	FETCH_NEWS_ITEM_REQUESTED,
	FETCH_NEWS_ITEM_SUCCEEDED,
	FETCH_NEWS_ITEM_FAILED
} from '../actions';

const initialState = {
	newsItems: [],
	newsItem: {},
	loading: false,
	error: ''
};

export const newsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NEWS_REQUESTED:
			return { ...state, loading: true };
		case FETCH_NEWS_SUCCEEDED:
			return { ...state, newsItems: action.newsItems, loading: false };
		case FETCH_NEWS_FAILED:
			return { ...state, error: action.error, loading: false };
		case FETCH_NEWS_ITEM_REQUESTED:
			return { ...state, loading: true };
		case FETCH_NEWS_ITEM_SUCCEEDED:
			return { ...state, newsItem: action.newsItem, loading: false };
		case FETCH_NEWS_ITEM_FAILED:
			return { ...state, error: action.error, loading: false };
		default:
			return state;
	}
};
