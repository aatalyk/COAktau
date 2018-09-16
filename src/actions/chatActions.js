import { SAVE_CHAT_HISTORY, CLEAR_CHAT_HISTORY } from './types';

export const saveChatHistory = chat => ({
	type: SAVE_CHAT_HISTORY,
	chat
});

export const clearChatHistory = chat => ({
	type: CLEAR_CHAT_HISTORY,
	chat
});
