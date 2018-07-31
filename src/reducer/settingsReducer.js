import { SET_LANG, ENABLE_NOTIFICATION, DISABLE_NOTIFICATION } from '../actions';

const initialState = {
	lang: 'kaz',
	notifsEnabled: true
};

export const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LANG:
			return {
				...state,
				lang: action.lang
			};
		case ENABLE_NOTIFICATION:
			return {
				...state,
				notifsEnabled: true
			};
		case DISABLE_NOTIFICATION:
			return {
				...state,
				notifsEnabled: false
			};
		default:
			return state;
	}
};
