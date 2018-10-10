import { FETCH_CONTACT_REQUESTED, FETCH_CONTACT_SUCCEEDED, FETCH_CONTACT_FAILED } from '../actions';

const initialState = {
	contact: {},
	loading: true,
	error: ''
};

export const contactReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CONTACT_REQUESTED:
			return { ...state, loading: true };
		case FETCH_CONTACT_SUCCEEDED:
			return { ...state, contact: action.contact, loading: false };
		case FETCH_CONTACT_FAILED:
			return { ...state, error: action.error, loading: false };
		default:
			return state;
	}
};
