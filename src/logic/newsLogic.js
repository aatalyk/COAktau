import { createLogic } from 'redux-logic';

import {
	FETCH_NEWS_REQUESTED,
	fetchNewsSucceeded,
	fetchNewsFailed,
	FETCH_NEWS_ITEM_REQUESTED,
	fetchNewsItemSucceeded,
	fetchNewsItemFailed
} from '../actions';

const url = 'https://soaktau.kz/api/v1.00/news';

const fetchNewsLogic = createLogic({
	type: FETCH_NEWS_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(url)
			.then(response => response.json())
			.then(json => {
				const news = json[lang] ? json[lang] : [];
				dispatch(fetchNewsSucceeded(news));
			})
			.catch(error => {
				dispatch(fetchNewsFailed(error));
			})
			.then(() => done());
	}
});

const fetchNewsItemLogic = createLogic({
	type: FETCH_NEWS_ITEM_REQUESTED,
	process: ({ getState, action }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/${action.id}`)
			.then(response => response.json())
			.then(json => {
				const newsItem = json[lang] ? json[lang] : [];
				dispatch(fetchNewsItemSucceeded(newsItem));
			})
			.catch(error => {
				dispatch(fetchNewsItemFailed(error));
			})
			.then(() => done());
	}
});

export const newsLogic = [fetchNewsLogic, fetchNewsItemLogic];
