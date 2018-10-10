import { createLogic } from 'redux-logic';

import { FETCH_CHAT_ROOMS_REQUESTED, fetchChatRoomsSucceeded, fetchChatRoomsFailed } from '../actions';

const url = 'http://soaktau.kz/api/v1.00/services';

const rooms = [
	{
		title: 'Room One',
		id: 1,
		messages: [
			{
				_id: 1,
				text: 'First message',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: null
				}
			}
		]
	},
	{
		title: 'Room Two',
		id: 1,
		messages: [
			{
				_id: 1,
				text: 'First message',
				createdAt: new Date(),
				user: {
					_id: 2,
					avatar: null
				}
			}
		]
	}
];

const fetchChatRoomsLogic = createLogic({
	type: FETCH_CHAT_ROOMS_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(url)
			.then(response => response.json())
			.then(json => {
				const results = json[lang] ? json[lang] : [];
				console.warn(rooms);
				dispatch(fetchChatRoomsSucceeded(rooms));
			})
			.catch(error => {
				dispatch(fetchChatRoomsFailed(error));
			})
			.then(() => done());
	}
});

export const chatRoomsLogic = [fetchChatRoomsLogic];
