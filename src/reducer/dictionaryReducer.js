import { FETCH_DICTIONARY_REQUESTED, FETCH_DICTIONARY_SUCCEEDED, FETCH_DICTIONARY_FAILED } from '../actions';

const initialState = {
	helpers: [],
	loading: false,
	error: ''
};

export const dictionaryReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_DICTIONARY_REQUESTED:
			return { ...state, loading: true };
		case FETCH_DICTIONARY_SUCCEEDED:
			return { ...state, helpers: action.helpers, loading: false };
		case FETCH_DICTIONARY_FAILED:
			return { ...state, error: action.error, loading: false };
		default:
			return state;
	}
};
