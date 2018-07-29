import { createLogic } from 'redux-logic';

import { FETCH_SERVICES_REQUESTED, fetchServicesSucceded, fetchServicesFailed } from '../actions';
import { fetch } from '../config';

const fetchServicesLogic = createLogic({
	type: FETCH_SERVICES_REQUESTED,
	process: async (_, dispatch, done) => {
		try {
			const items = await fetch('services');
			dispatch(fetchServicesSucceded(items));
		} catch (error) {
			dispatch(fetchServicesFailed(error));
		}
		done();
	}
});

export const servicesLogic = [fetchServicesLogic];
