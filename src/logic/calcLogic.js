import { createLogic } from 'redux-logic';

import {
	FETCH_CALC_PARAMS_REQUESTED,
	fetchCalcParamsSucceeded,
	fetchCalcParamsFailed,
	FETCH_CALC_FAQ_REQUESTED,
	fetchCalcFaqSucceeded,
	fetchCalcFaqFailed
} from '../actions';

const url = 'http://soaktau.kz/api/v1.00/calc';

const fetchCalcParamsLogic = createLogic({
	type: FETCH_CALC_PARAMS_REQUESTED,
	process: ({}, dispatch, done) => {
		fetch(`${url}/parameters`)
			.then(response => response.json())
			.then(json => {
				const results = json.results ? json.results : [];
				const params = {};
				results.forEach(result => {
					params[result.name] = result.value;
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
		fetch(`${url}/questions`)
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
