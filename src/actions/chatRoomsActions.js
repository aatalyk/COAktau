import { FETCH_CHAT_ROOMS_REQUESTED, FETCH_CHAT_ROOMS_SUCCEEDED, FETCH_CHAT_ROOMS_FAILED } from './types';

export const fetchChatRoomsRequested = () => ({
	type: FETCH_CHAT_ROOMS_REQUESTED
});

export const fetchChatRoomsSucceeded = rooms => ({
	type: FETCH_CHAT_ROOMS_SUCCEEDED,
	rooms
});

export const fetchChatRoomsFailed = error => ({
	type: FETCH_CHAT_ROOMS_FAILED,
	error
});
