import { createLogic } from 'redux-logic';

import { FETCH_NEWS_REQUESTED, fetchNewsSucceeded, fetchNewsFailed } from '../actions';
import { fetch } from '../config';

const fetchNewsLogic = createLogic({
	type: FETCH_NEWS_REQUESTED,
	warnTimeout: 0,
	process: async (_, dispatch, done) => {
		try {
			const items = await fetch('news');
			dispatch(fetchNewsSucceeded(items));
			console.log(items);
		} catch (error) {
			dispatch(fetchNewsFailed(error));
			console.error(error);
		}
		done();
	}
});

export const newsLogic = [fetchNewsLogic];
