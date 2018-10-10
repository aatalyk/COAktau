import { FETCH_CHAT_ROOMS_REQUESTED, FETCH_CHAT_ROOMS_SUCCEEDED, FETCH_CHAT_ROOMS_FAILED } from '../actions';

const initialState = {
	rooms: [],
	loading: false,
	error: ''
};

export const chatRoomsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_CHAT_ROOMS_REQUESTED:
			return { ...state, loading: true };
		case FETCH_CHAT_ROOMS_SUCCEEDED:
			return { ...state, rooms: action.rooms, loading: false };
		case FETCH_CHAT_ROOMS_FAILED:
			return { ...state, error: action.error, loading: false };
		default:
			return state;
	}
};
