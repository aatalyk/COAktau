import { createLogic } from 'redux-logic';

import { FETCH_CHAT_ROOMS_REQUESTED, fetchChatRoomsSucceeded, fetchChatRoomsFailed } from '../actions';
import { url } from '../config';

const fetchChatRoomsLogic = createLogic({
	type: FETCH_CHAT_ROOMS_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/chats`)
			.then(response => response.json())
			.then(json => {
				const chats = json[lang] ? json[lang] : [];
				dispatch(fetchChatRoomsSucceeded(getRooms(chats)));
			})
			.catch(error => {
				dispatch(fetchChatRoomsFailed(error));
			})
			.then(() => done());
	}
});

function getRooms(chats) {
	const rooms = chats.map(chat => ({
		...chat,
		messages: getMessages(chat)
	}));
	return rooms;
}

function getMessages(chat) {
	const messages = chat.messages.map(messsage => ({
		...messsage,
		createdAt: new Date(),
		user: {
			_id: 2,
			avatar: null
		}
	}));
	return messages;
}

export const chatRoomsLogic = [fetchChatRoomsLogic];
