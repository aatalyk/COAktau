import {
	FETCH_CALC_PARAMS_REQUESTED,
	FETCH_CALC_PARAMS_SUCCEEDED,
	FETCH_CALC_PARAMS_FAILED,
	FETCH_CALC_FAQ_REQUESTED,
	FETCH_CALC_FAQ_SUCCEEDED,
	FETCH_CALC_FAQ_FAILED
} from './types';

export const fetchCalcParamsRequested = () => ({
	type: FETCH_CALC_PARAMS_REQUESTED
});

export const fetchCalcParamsSucceeded = params => ({
	type: FETCH_CALC_PARAMS_SUCCEEDED,
	params
});

export const fetchCalcParamsFailed = error => ({
	type: FETCH_CALC_PARAMS_FAILED,
	error
});

export const fetchCalcFaqRequested = () => ({
	type: FETCH_CALC_FAQ_REQUESTED
});

export const fetchCalcFaqSucceeded = faq => ({
	type: FETCH_CALC_FAQ_SUCCEEDED,
	faq
});

export const fetchCalcFaqFailed = error => ({
	type: FETCH_CALC_FAQ_FAILED,
	error
});
