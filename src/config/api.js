export const url = 'https://soaktau.kz/api/v1.00';

import { fetchNewsItemRequested } from '../actions';

export function addViewCount(type, id) {
	const postURL = type === 'news' ? `${url}/news/counter` : `${url}/my_city/counter`;
	fetch(postURL, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify({ id })
	})
		.then(function(res) {
			console.log('res res');
			fetchNewsItemRequested(id);
		})
		.catch(function(error) {
			console.log('err', error);
		});
}
