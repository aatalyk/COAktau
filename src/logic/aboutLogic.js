import { createLogic } from 'redux-logic';

import { FETCH_ABOUT_US_REQUESTED, fetchAboutUsSucceeded, fetchAboutUsFailed } from '../actions';
import { url } from '../config';

const fetchAboutLogic = createLogic({
	type: FETCH_ABOUT_US_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/about`)
			.then(response => response.json())
			.then(json => {
				const aboutData = json[lang] ? json[lang] : [];
				dispatch(fetchAboutUsSucceeded(aboutData[0]));
			})
			.catch(error => {
				dispatch(fetchAboutUsFailed(error));
			})
			.then(() => done());
	}
});

export const aboutLogic = [fetchAboutLogic];
