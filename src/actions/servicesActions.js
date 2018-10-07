import {
	FETCH_SERVICES_REQUESTED,
	FETCH_SERVICES_SUCCEEDED,
	FETCH_SERVICES_FAILED,
	ADD_TO_MY_SERVICES,
	REMOVE_FROM_MY_SERVICES,
	FETCH_SUBSERVICES_REQUESTED,
	FETCH_SUBSERVICES_SUCCEEDED,
	FETCH_SUBSERVICES_FAILED,
	FETCH_SERVICES_TITLES_REQUESTED,
	FETCH_SERVICES_TITLES_SUCCEEDED,
	FETCH_SERVICES_TITLES_FAILED
} from './types';

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

export const addToMyServices = service => ({
	type: ADD_TO_MY_SERVICES,
	service
});

export const removeFromMyServices = service => ({
	type: REMOVE_FROM_MY_SERVICES,
	service
});

export const fetchSubServicesRequested = id => ({
	type: FETCH_SUBSERVICES_REQUESTED,
	id
});

export const fetchSubServicesSucceded = subServices => ({
	type: FETCH_SUBSERVICES_SUCCEEDED,
	subServices
});

export const fetchSubServicesFailed = error => ({
	type: FETCH_SUBSERVICES_FAILED,
	error: error
});

export const fetchServicesTitlesRequested = (subServiceID, id) => ({
	type: FETCH_SERVICES_TITLES_REQUESTED,
	subServiceID,
	id
});

export const fetchServicesTitlesSucceded = titles => ({
	type: FETCH_SERVICES_TITLES_SUCCEEDED,
	titles
});

export const fetchServicesTitlesFailed = error => ({
	type: FETCH_SERVICES_TITLES_FAILED,
	error: error
});
