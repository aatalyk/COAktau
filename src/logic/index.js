import { createLogic } from 'redux-logic';

import { FETCH_FAQ_REQUESTED } from '../actions';
import { api } from '../config';

const authLogic = createLogic({
	type: FETCH_FAQ_REQUESTED,
	process: async ({ action }, dispatch, done) => {
		try {
			const items = await api.fetch();
			console.warn(items);
		} catch (error) {
			console.warn(error);
		}
		done();
	}
});

export const logicArr = [authLogic];
