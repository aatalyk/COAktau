import { createLogic } from 'redux-logic';

import { FETCH_CONTACT_REQUESTED, fetchContactSucceeded, fetchContactFailed } from '../actions';

const url = 'http://soaktau.kz/api/v1.00/news';

const contact = {
	location: {
		lat: 43.65635,
		lon: 51.155778
	},
	markers: [
		{
			lat: 43.65635,
			lon: 51.155778
		},
		{
			lat: 43.66,
			lon: 51.155778
		}
	],
	tels: ['+77292432670', '+77292432652'],
	addresses: ['Address'],
	busStops: ['bus1'],
	email: 'soaktau@gmail.com'
};

const fetchContactLogic = createLogic({
	type: FETCH_CONTACT_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		console.log('fetchContactLogic', contact);
		fetch(url)
			.then(response => response.json())
			.then(json => {
				const news = json[lang] ? json[lang] : [];
				dispatch(fetchContactSucceeded(contact));
			})
			.catch(error => {
				dispatch(fetchContactFailed(error));
			})
			.then(() => done());
	}
});

export const contactLogic = [fetchContactLogic];
