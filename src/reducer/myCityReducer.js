import {
	FETCH_MY_CITY_REQUESTED,
	FETCH_MY_CITY_SUCCEEDED,
	FETCH_MY_CITY_FAILED,
	FETCH_MY_CITY_ITEM_REQUESTED,
	FETCH_MY_CITY_ITEM_SUCCEEDED,
	FETCH_MY_CITY_ITEM_FAILED
} from '../actions';

const initialState = {
	news: [],
	newsItem: {},
	loading: true,
	error: ''
};

export const myCityReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_MY_CITY_REQUESTED:
			return { ...state, loading: true };
		case FETCH_MY_CITY_SUCCEEDED:
			return { ...state, news: action.news, loading: false };
		case FETCH_MY_CITY_FAILED:
			return { ...state, error: action.error, loading: false };
		case FETCH_MY_CITY_ITEM_REQUESTED:
			return { ...state, loading: true };
		case FETCH_MY_CITY_ITEM_SUCCEEDED:
			return { ...state, newsItem: action.newsItem, loading: false };
		case FETCH_MY_CITY_ITEM_FAILED:
			return { ...state, error: action.error, loading: false };
		default:
			return state;
	}
};
