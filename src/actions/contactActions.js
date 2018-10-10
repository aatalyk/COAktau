import { FETCH_CONTACT_REQUESTED, FETCH_CONTACT_SUCCEEDED, FETCH_CONTACT_FAILED } from './types';

export const fetchContactRequested = () => ({
	type: FETCH_CONTACT_REQUESTED
});

export const fetchContactSucceeded = contact => ({
	type: FETCH_CONTACT_SUCCEEDED,
	contact
});

export const fetchContactFailed = error => ({
	type: FETCH_CONTACT_FAILED,
	error
});
