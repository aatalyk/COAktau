import { FETCH_NEWS_ITEM_REQUESTED, FETCH_NEWS_ITEM_SUCCEEDED, FETCH_NEWS_ITEM_FAILED } from '../actions';

const initialState = {
	newsItem: {},
	loading: true,
	error: ''
};

export const newsItemReducer = (state = initialState, action) => {
	switch (action.type) {
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
