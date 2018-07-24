import { FETCH_FAQ_BEGIN, FETCH_FAQ_SUCCESS, FETCH_FAQ_FAIL } from '../actions';

const initialState = {
	data: [],
	loading: false,
	error: null
};

export const faqReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_FAQ_BEGIN:
			return {
				...state,
				loading: true
			};
		case FETCH_FAQ_SUCCESS:
			return {
				...state,
				data: action.payload,
				loading: false
			};
		case FETCH_FAQ_FAIL:
			return {
				...state,
				loading: false,
				error: action.error
			};
		default:
			return state;
	}
};
