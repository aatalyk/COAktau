import { createLogic } from 'redux-logic';

import {
	FETCH_TAXI_PARAMS_REQUESTED,
	fetchTaxiParamsSucceeded,
	fetchTaxiParamsFailed,
	FETCH_TAXI_FAQ_REQUESTED,
	fetchTaxiFaqSucceeded,
	fetchTaxiFaqFailed
} from '../actions';
import { url } from '../config';

const fetchTaxiParamsLogic = createLogic({
	type: FETCH_TAXI_PARAMS_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/taxi/data`)
			.then(response => response.json())
			.then(json => {
				const params = json ? json[lang] : [];
				dispatch(fetchTaxiParamsSucceeded(params[0]));
			})
			.catch(error => {
				dispatch(fetchTaxiParamsFailed(error));
			})
			.then(() => done());
	}
});

const fetchTaxiFaqLogic = createLogic({
	type: FETCH_TAXI_FAQ_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/taxi/questions`)
			.then(response => response.json())
			.then(json => {
				const faq = json[lang] ? json[lang] : [];
				dispatch(fetchTaxiFaqSucceeded(faq));
			})
			.catch(error => {
				dispatch(fetchTaxiFaqFailed(error));
			})
			.then(() => done());
	}
});

export const taxiLogic = [fetchTaxiParamsLogic, fetchTaxiFaqLogic];
