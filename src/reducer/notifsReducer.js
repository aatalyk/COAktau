import { FETCH_NOTIFS_REQUESTED, FETCH_NOTIFS_SUCCEEDED, FETCH_NOTIFS_FAILED } from '../actions';

const initialState = {
	notifsItems: [],
	loading: false,
	error: null
};

export const notifsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NOTIFS_REQUESTED:
			return {
				...state,
				loading: true
			};
		case FETCH_NOTIFS_SUCCEEDED:
			return {
				...state,
				notifsItems: action.notifsItems,
				loading: false
			};
		case FETCH_NOTIFS_FAILED:
			return {
				...state,
				loading: false,
				error: action.error
			};
		default:
			return state;
	}
};
