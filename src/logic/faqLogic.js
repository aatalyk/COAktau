import { createLogic } from 'redux-logic';

import { FETCH_FAQ_REQUESTED, fetchFAQSucceeded, fetchFAQFailed } from '../actions';

const url = 'https://soaktau.kz/api/v1.00/questions';

const fetchFaqLogic = createLogic({
	type: FETCH_FAQ_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(url)
			.then(response => response.json())
			.then(json => {
				const faqs = json[lang] ? json[lang] : [];
				dispatch(fetchFAQSucceeded(faqs));
			})
			.catch(error => {
				dispatch(fetchFAQFailed(error));
			})
			.then(() => done());
	}
});

export const faqLogic = [fetchFaqLogic];
