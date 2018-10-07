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
	FETCH_SERVICES_TITLES_FAILED,
	FETCH_SERVICES_POST_REQUESTED,
	FETCH_SERVICES_POST_SUCCEEDED,
	FETCH_SERVICES_POST_FAILED
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

export const fetchServicesTitlesRequested = (serviceId, id) => ({
	type: FETCH_SERVICES_TITLES_REQUESTED,
	serviceId,
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

export const fetchServicesPostRequested = (serviceId, subServiceId, id) => ({
	type: FETCH_SERVICES_POST_REQUESTED,
	serviceId,
	subServiceId,
	id
});

export const fetchServicesPostSucceded = post => ({
	type: FETCH_SERVICES_POST_SUCCEEDED,
	post
});

export const fetchServicesPostFailed = error => ({
	type: FETCH_SERVICES_POST_FAILED,
	error: error
});
