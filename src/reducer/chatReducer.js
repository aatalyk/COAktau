import { SAVE_CHAT_HISTORY, CLEAR_CHAT_HISTORY } from '../actions';

const initialState = [];

export const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_CHAT_HISTORY:
			return state.length > 0 ? [...state, action.chat] : [action.chat];
		case CLEAR_CHAT_HISTORY:
			console.log('chatReducer', action.chat, [...state]);
			return [...state].filter(item => {
				console.log(item.id !== action.chat.id && item.lang !== action.chat.lang);
				return item.id !== action.chat.id || item.lang !== action.chat.lang;
			});
		default:
			return state;
	}
};
