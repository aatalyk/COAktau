import { createLogic } from 'redux-logic';

import { FETCH_CALC_PARAMS_REQUESTED, fetchCalcParamsSucceeded, fetchCalcParamsFailed } from '../actions';

const url = 'http://soaktau.kz/api/v1.00/questions';

const fetchCalcParamsLogic = createLogic({
	type: FETCH_CALC_PARAMS_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(url)
			.then(response => response.json())
			.then(json => {
				const faqs = json[lang] ? json[lang] : [];
				dispatch(fetchCalcParamsSucceeded(faqs));
			})
			.catch(error => {
				dispatch(fetchCalcParamsFailed(error));
			})
			.then(() => done());
	}
});

export const calcLogic = [fetchCalcParamsLogic];
