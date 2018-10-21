import { ADD_TO_MY_SERVICES, REMOVE_FROM_MY_SERVICES } from '../actions';
import { REHYDRATE } from 'redux-persist';

const initialState = [];

export const myServicesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_MY_SERVICES:
			return state.length > 0 ? [...state, action.service] : [action.service];
		case REMOVE_FROM_MY_SERVICES:
			return [...state].filter(item => item.title !== action.service.title);
		case REHYDRATE: // rehydrating the state from the persisted store
			/* eslint-disable */
			if (action.payload) {
				const myServices = [...action.payload.myServices].filter(item => !!item.kaz); //removing the old data where kaz and rus entities didn't exist, because it might lead to crash
				return myServices;
			} else {
				return state;
			}
		default:
			return state;
	}
};
