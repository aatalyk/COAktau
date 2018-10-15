import { createLogic } from 'redux-logic';

import { FETCH_CONTACT_REQUESTED, fetchContactSucceeded, fetchContactFailed } from '../actions';
import { url } from '../config';

const fetchContactLogic = createLogic({
	type: FETCH_CONTACT_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/address`)
			.then(response => response.json())
			.then(json => {
				const contacts = json[lang] ? json[lang] : [];
				dispatch(fetchContactSucceeded(contacts[0]));
			})
			.catch(error => {
				dispatch(fetchContactFailed(error));
			})
			.then(() => done());
	}
});

export const contactLogic = [fetchContactLogic];
