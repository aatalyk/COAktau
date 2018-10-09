import { createLogic } from 'redux-logic';

import {
	FETCH_SERVICES_REQUESTED,
	fetchServicesSucceded,
	fetchServicesFailed,
	FETCH_SUBSERVICES_REQUESTED,
	fetchSubServicesSucceded,
	fetchSubServicesFailed,
	FETCH_SERVICES_TITLES_REQUESTED,
	fetchServicesTitlesSucceded,
	fetchServicesTitlesFailed,
	fetchServicesPostSucceded,
	FETCH_SERVICES_POST_REQUESTED,
	fetchServicesPostFailed
} from '../actions';

const url = 'http://soaktau.kz/api/v1.00/services';

const fetchServicesLogic = createLogic({
	type: FETCH_SERVICES_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(url)
			.then(response => response.json())
			.then(json => {
				const services = json[lang];
				dispatch(fetchServicesSucceded(services));
			})
			.catch(error => {
				dispatch(fetchServicesFailed(`${error}`));
			})
			.then(() => done());
	}
});

const fetchSubServicesLogic = createLogic({
	type: FETCH_SUBSERVICES_REQUESTED,
	process: ({ getState, action }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/${action.id}`)
			.then(response => response.json())
			.then(json => {
				const subServices = json[lang] ? json[lang] : [];
				dispatch(fetchSubServicesSucceded(subServices));
			})
			.catch(error => {
				dispatch(fetchSubServicesFailed(error));
			})
			.then(() => done());
	}
});

const fetchServicesTitlesLogic = createLogic({
	type: FETCH_SERVICES_TITLES_REQUESTED,
	process: ({ getState, action }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/${action.serviceId}/${action.id}`)
			.then(response => response.json())
			.then(json => {
				const titles = json[lang] ? json[lang] : [];
				dispatch(fetchServicesTitlesSucceded(titles));
			})
			.catch(error => {
				dispatch(fetchServicesTitlesFailed(error));
			})
			.then(() => done());
	}
});

const fetchServicesPostLogic = createLogic({
	type: FETCH_SERVICES_POST_REQUESTED,
	process: ({ getState, action }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/${action.serviceId}/${action.subServiceId}/${action.id}`)
			.then(response => response.json())
			.then(json => {
				const texts = json[lang] ? json[lang] : [];
				let post = '';
				texts.forEach(object => (post = post + object.text));
				dispatch(fetchServicesPostSucceded(post));
			})
			.catch(error => {
				dispatch(fetchServicesPostFailed(error));
			})
			.then(() => done());
	}
});

export const servicesLogic = [
	fetchServicesLogic,
	fetchSubServicesLogic,
	fetchServicesTitlesLogic,
	fetchServicesPostLogic
];
