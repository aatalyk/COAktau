import {createLogic} from "redux-logic";

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
	fetchServicesPostFailed,
} from "../actions";

const url = "http://soaktau.kz/api/v1.00/services";

const fetchServicesLogic = createLogic({
	type: FETCH_SERVICES_REQUESTED,
	process: (_, dispatch, done) => {
		fetch(url)
			.then(response => response.json())
			.then(json => {
				const services = json.kaz.map((item, index) => {
					return {kaz: {...item}, rus: {...json.rus[index]}};
				});
				dispatch(fetchServicesSucceded(services));
			})
			.catch(error => {
				dispatch(fetchServicesFailed(`${error}`));
			})
			.then(() => done());
	},
});

const fetchSubServicesLogic = createLogic({
	type: FETCH_SUBSERVICES_REQUESTED,
	process: ({action}, dispatch, done) => {
		fetch(`${url}/${action.id}`)
			.then(response => response.json())
			.then(json => {
				const subServices = json.kaz.map((item, index) => ({
					kaz: {...item},
					rus: {...json.rus[index]},
				}));
				dispatch(fetchSubServicesSucceded(subServices));
			})
			.catch(error => {
				dispatch(fetchSubServicesFailed(error));
			})
			.then(() => done());
	},
});

const fetchServicesTitlesLogic = createLogic({
	type: FETCH_SERVICES_TITLES_REQUESTED,
	process: ({action}, dispatch, done) => {
		fetch(`${url}/${action.serviceId}/${action.id}`)
			.then(response => response.json())
			.then(json => {
				const titles = json.kaz.map((item, index) => ({
					kaz: item,
					rus: json.rus[index],
				}));
				dispatch(fetchServicesTitlesSucceded(titles));
			})
			.catch(error => {
				dispatch(fetchServicesTitlesFailed(error));
			})
			.then(() => done());
	},
});

const fetchServicesPostLogic = createLogic({
	type: FETCH_SERVICES_POST_REQUESTED,
	process: ({action}, dispatch, done) => {
		fetch(`${url}/${action.serviceId}/${action.subServiceId}/${action.id}`)
			.then(response => response.json())
			.then(json => {
				let postKaz = "";
				json.kaz.forEach(object => (postKaz = postKaz + object.text));
				let postRus = "";
				json.rus.forEach(object => (postRus = postRus + object.text));
				const post = {kaz: postKaz, rus: postRus};
				dispatch(fetchServicesPostSucceded(post));
			})
			.catch(error => {
				dispatch(fetchServicesPostFailed(error));
			})
			.then(() => done());
	},
});

export const servicesLogic = [
	fetchServicesLogic,
	fetchSubServicesLogic,
	fetchServicesTitlesLogic,
	fetchServicesPostLogic,
];
