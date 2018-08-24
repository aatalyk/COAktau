import { FETCH_NOTIFS_REQUESTED, FETCH_NOTIFS_SUCCEEDED, FETCH_NOTIFS_FAILED } from './types';

export const fetchNotifsRequested = () => ({
	type: FETCH_NOTIFS_REQUESTED
});

export const fetchNotifsSucceeded = notifsItems => ({
	type: FETCH_NOTIFS_SUCCEEDED,
	notifsItems
});

export const fetchNotifsFailed = error => ({
	type: FETCH_NOTIFS_FAILED,
	error
});
