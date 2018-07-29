import { FETCH_SERVICES_REQUESTED, FETCH_SERVICES_SUCCEEDED, FETCH_SERVICES_FAILED } from '../actions';

const initialState = {
	data: [],
	loading: false,
	error: null
};

export const servicesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SERVICES_REQUESTED:
			return {
				...state,
				loading: true
			};
		case FETCH_SERVICES_SUCCEEDED:
			return {
				...state,
				data: action.items,
				loading: false
			};
		case FETCH_SERVICES_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		default:
			return state;
	}
};
