import { createLogic } from 'redux-logic';

import { FETCH_MY_CITY_REQUESTED, fetchMyCitySucceeded, fetchMyCityFailed } from '../actions';
import { url } from '../config';

const fetchMyCityLogic = createLogic({
	type: FETCH_MY_CITY_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/my_city`)
			.then(response => response.json())
			.then(json => {
				const myCity = json[lang] ? json[lang] : [];
				dispatch(fetchMyCitySucceeded(myCity));
			})
			.catch(error => {
				dispatch(fetchMyCityFailed(error));
			})
			.then(() => done());
	}
});

export const myCityLogic = [fetchMyCityLogic];
