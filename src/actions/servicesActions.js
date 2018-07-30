import { FETCH_SERVICES_REQUESTED, FETCH_SERVICES_SUCCEEDED, FETCH_SERVICES_FAILED } from './types';

export const fetchServicesRequested = () => ({
	type: FETCH_SERVICES_REQUESTED
});

export const fetchServicesSucceded = items => ({
	type: FETCH_SERVICES_SUCCEEDED,
	items: items
});

export const fetchServicesFailed = error => ({
	type: FETCH_SERVICES_FAILED,
	error: error
});
