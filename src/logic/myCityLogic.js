import { createLogic } from 'redux-logic';

import {
	FETCH_MY_CITY_REQUESTED,
	fetchMyCitySucceeded,
	fetchMyCityFailed,
	FETCH_MY_CITY_ITEM_REQUESTED,
	fetchMyCityItemSucceeded,
	fetchMyCityItemFailed
} from '../actions';
import { url } from '../config';

const fetchMyCityLogic = createLogic({
	type: FETCH_MY_CITY_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/my_city`)
			.then(response => response.json())
			.then(json => {
				const news = json[lang] ? json[lang] : [];
				dispatch(fetchMyCitySucceeded(news));
			})
			.catch(error => {
				dispatch(fetchMyCityFailed(error));
			})
			.then(() => done());
	}
});

const fetchMyCityItemLogic = createLogic({
	type: FETCH_MY_CITY_ITEM_REQUESTED,
	process: ({ getState, action }, dispatch, done) => {
		const { lang } = getState().settings;
		console.log('my city rq');
		fetch(`${url}/my_city/${action.id}`)
			.then(response => response.json())
			.then(json => {
				const newsItem = json[lang] ? json[lang] : [];
				console.log('my city', newsItem);
				dispatch(fetchMyCityItemSucceeded(newsItem));
			})
			.catch(error => {
				dispatch(fetchMyCityItemFailed(error));
			})
			.then(() => done());
	}
});

export const myCityLogic = [fetchMyCityLogic, fetchMyCityItemLogic];
