import { FETCH_ABOUT_US_REQUESTED, FETCH_ABOUT_US_SUCCEEDED, FETCH_ABOUT_US_FAILED } from '../actions';

const initialState = {
	loading: false,
	aboutData: {},
	error: ''
};

export const aboutReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ABOUT_US_REQUESTED:
			return {
				...state,
				loading: true
			};
		case FETCH_ABOUT_US_SUCCEEDED:
			return {
				...state,
				aboutData: action.aboutData,
				loading: false
			};
		case FETCH_ABOUT_US_FAILED:
			return {
				...state,
				error: action.error,
				loading: false
			};
		default:
			return state;
	}
};
