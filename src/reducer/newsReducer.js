import { FETCH_NEWS_REQUESTED, FETCH_NEWS_SUCCEEDED, FETCH_NEWS_FAILED } from '../actions';

const initialState = {
	newsItems: [],
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
		default:
			return state;
	}
};
