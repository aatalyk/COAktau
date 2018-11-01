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
import { images } from '../assets';

const params = {
	title: 'Taxi Econom',
	icon: images.bus,
	tels: ['+1231231321', '+1231321321']
};

const fetchTaxiParamsLogic = createLogic({
	type: FETCH_TAXI_PARAMS_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		fetch(`${url}/calc/parameters`)
			.then(response => response.json())
			.then(json => {
				const results = json.results ? json.results : [];
				console.warn('par', params);
				dispatch(fetchTaxiParamsSucceeded(params));
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
		fetch(`${url}/calc/questions`)
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
