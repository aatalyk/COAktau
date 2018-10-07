import { ADD_TO_MY_SERVICES, REMOVE_FROM_MY_SERVICES } from '../actions';

const initialState = [];

export const myServicesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_MY_SERVICES:
			return state.length > 0 ? [...state, action.service] : [action.service];
		case REMOVE_FROM_MY_SERVICES:
			return [...state].filter(item => item.title !== action.service.title);
		default:
			return state;
	}
};
