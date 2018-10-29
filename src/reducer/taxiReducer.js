import {
	FETCH_TAXI_PARAMS_REQUESTED,
	FETCH_TAXI_PARAMS_SUCCEEDED,
	FETCH_TAXI_PARAMS_FAILED,
	FETCH_TAXI_FAQ_REQUESTED,
	FETCH_TAXI_FAQ_SUCCEEDED,
	FETCH_TAXI_FAQ_FAILED
} from '../actions';

const initialState = {
	params: {},
	faq: [],
	loading: false,
	error: null
};

export const taxiReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TAXI_PARAMS_REQUESTED:
			return {
				...state,
				loading: true
			};
		case FETCH_TAXI_PARAMS_SUCCEEDED:
			return {
				...state,
				params: action.params,
				loading: false
			};
		case FETCH_TAXI_PARAMS_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case FETCH_TAXI_FAQ_REQUESTED:
			return {
				...state,
				loading: true
			};
		case FETCH_TAXI_FAQ_SUCCEEDED:
			return {
				...state,
				faq: action.faq,
				loading: false
			};
		case FETCH_TAXI_FAQ_FAILED:
			return {
				...state,
				error: action.error,
				loading: false
			};
		default:
			return state;
	}
};
