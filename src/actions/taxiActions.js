import {
	FETCH_TAXI_PARAMS_REQUESTED,
	FETCH_TAXI_PARAMS_SUCCEEDED,
	FETCH_TAXI_PARAMS_FAILED,
	FETCH_TAXI_FAQ_REQUESTED,
	FETCH_TAXI_FAQ_SUCCEEDED,
	FETCH_TAXI_FAQ_FAILED
} from './types';

export const fetchTaxiParamsRequested = () => ({
	type: FETCH_TAXI_PARAMS_REQUESTED
});

export const fetchTaxiParamsSucceeded = params => ({
	type: FETCH_TAXI_PARAMS_SUCCEEDED,
	params
});

export const fetchTaxiParamsFailed = error => ({
	type: FETCH_TAXI_PARAMS_FAILED,
	error
});

export const fetchTaxiFaqRequested = () => ({
	type: FETCH_TAXI_FAQ_REQUESTED
});

export const fetchTaxiFaqSucceeded = faq => ({
	type: FETCH_TAXI_FAQ_SUCCEEDED,
	faq
});

export const fetchTaxiFaqFailed = error => ({
	type: FETCH_TAXI_FAQ_FAILED,
	error
});
