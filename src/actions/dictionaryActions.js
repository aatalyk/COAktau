import { FETCH_DICTIONARY_REQUESTED, FETCH_DICTIONARY_SUCCEEDED, FETCH_DICTIONARY_FAILED } from './types';

export const fetchDictionaryRequested = () => ({
	type: FETCH_DICTIONARY_REQUESTED
});

export const fetchDictionarySucceeded = helpers => ({
	type: FETCH_DICTIONARY_SUCCEEDED,
	helpers
});

export const fetchDictionaryFailed = error => ({
	type: FETCH_DICTIONARY_FAILED,
	error
});
