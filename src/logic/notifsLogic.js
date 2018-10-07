import { createLogic } from 'redux-logic';

import { FETCH_NOTIFS_REQUESTED, fetchNotifsSucceeded, fetchNotifsFailed } from '../actions';
import { fetch } from '../config';

const url = 'http://soaktau.kz/api/v1.00/announcements';

const fetchNotifsLogic = createLogic({
	type: FETCH_NOTIFS_REQUESTED,
	warnTimeout: 0,
	process: async (_, dispatch, done) => {
		try {
			const items = await fetch('notifs');
			dispatch(fetchNotifsSucceeded(items));
		} catch (error) {
			dispatch(fetchNotifsFailed(error));
		}
		done();
	}
});

export const notifsLogic = [fetchNotifsLogic];
