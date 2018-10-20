import { createLogic } from 'redux-logic';

import { FETCH_NOTIFS_REQUESTED, fetchNotifsSucceeded, fetchNotifsFailed } from '../actions';

const url = 'https://soaktau.kz/api/v1.00/announcements';

const fetchNotifsLogic = createLogic({
	type: FETCH_NOTIFS_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(url)
			.then(response => response.json())
			.then(json => {
				const notifs = json[lang] ? json[lang] : [];
				dispatch(fetchNotifsSucceeded(notifs));
			})
			.catch(error => {
				dispatch(fetchNotifsFailed(error));
			})
			.then(() => done());
	}
});

export const notifsLogic = [fetchNotifsLogic];
