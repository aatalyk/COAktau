import {
	FETCH_CALC_PARAMS_REQUESTED,
	FETCH_CALC_PARAMS_SUCCEEDED,
	FETCH_CALC_PARAMS_FAILED,
	FETCH_CALC_FAQ_REQUESTED,
	FETCH_CALC_FAQ_SUCCEEDED,
	FETCH_CALC_FAQ_FAILED
} from '../actions';

const initialState = {
	params: {},
	faq: [],
	loading: false,
	error: null
};

export const calcReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CALC_PARAMS_REQUESTED:
			return {
				...state,
				loading: true
			};
		case FETCH_CALC_PARAMS_SUCCEEDED:
			return {
				...state,
				params: action.params,
				loading: false
			};
		case FETCH_CALC_PARAMS_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case FETCH_CALC_FAQ_REQUESTED:
			return {
				...state,
				loading: true
			};
		case FETCH_CALC_FAQ_SUCCEEDED:
			return {
				...state,
				faq: action.faq
			};
		case FETCH_CALC_FAQ_FAILED:
			return {
				...state,
				error: action.error
			};
		default:
			return state;
	}
};
