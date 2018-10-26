import { createLogic } from 'redux-logic';

import {
	FETCH_CALC_PARAMS_REQUESTED,
	fetchCalcParamsSucceeded,
	fetchCalcParamsFailed,
	FETCH_CALC_FAQ_REQUESTED,
	fetchCalcFaqSucceeded,
	fetchCalcFaqFailed
} from '../actions';
import { url } from '../config';

const fetchCalcParamsLogic = createLogic({
	type: FETCH_CALC_PARAMS_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		fetch(`${url}/calc/parameters`)
			.then(response => response.json())
			.then(json => {
				const results = json.results ? json.results : [];
				const params = {};
				results.forEach(result => {
					params[result.name] = parseFloat(result.value);
				});
				dispatch(fetchCalcParamsSucceeded(params));
			})
			.catch(error => {
				dispatch(fetchCalcParamsFailed(error));
			})
			.then(() => done());
	}
});

const fetchCalcFaqLogic = createLogic({
	type: FETCH_CALC_FAQ_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/calc/questions`)
			.then(response => response.json())
			.then(json => {
				const faq = json[lang] ? json[lang] : [];
				dispatch(fetchCalcFaqSucceeded(faq));
			})
			.catch(error => {
				dispatch(fetchCalcFaqFailed(error));
			})
			.then(() => done());
	}
});

export const calcLogic = [fetchCalcParamsLogic, fetchCalcFaqLogic];
