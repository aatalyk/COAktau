import {
	FETCH_SERVICES_REQUESTED,
	FETCH_SERVICES_SUCCEEDED,
	FETCH_SERVICES_FAILED,
	FETCH_SUBSERVICES_REQUESTED,
	FETCH_SUBSERVICES_SUCCEEDED,
	FETCH_SUBSERVICES_FAILED,
	FETCH_SERVICES_TITLES_REQUESTED,
	FETCH_SERVICES_TITLES_SUCCEEDED,
	FETCH_SERVICES_TITLES_FAILED,
	FETCH_SERVICES_POST_REQUESTED,
	FETCH_SERVICES_POST_SUCCEEDED,
	FETCH_SERVICES_POST_FAILED
} from '../actions';

const initialState = {
	services: [],
	subServices: [],
	post: '',
	titles: [],
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
				services: action.items,
				loading: false
			};
		case FETCH_SERVICES_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case FETCH_SUBSERVICES_REQUESTED:
			return {
				...state,
				loading: true
			};
		case FETCH_SUBSERVICES_SUCCEEDED:
			return {
				...state,
				subServices: action.subServices,
				loading: false
			};
		case FETCH_SUBSERVICES_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case FETCH_SERVICES_TITLES_REQUESTED:
			return {
				...state,
				loading: true
			};
		case FETCH_SERVICES_TITLES_SUCCEEDED:
			return {
				...state,
				titles: action.titles,
				loading: false
			};
		case FETCH_SERVICES_TITLES_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case FETCH_SERVICES_POST_REQUESTED:
			return {
				...state,
				loading: true
			};
		case FETCH_SERVICES_POST_SUCCEEDED:
			return {
				...state,
				post: action.post,
				loading: false
			};
		case FETCH_SERVICES_POST_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		default:
			return state;
	}
};
