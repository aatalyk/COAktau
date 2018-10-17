import { createLogic } from 'redux-logic';

import { FETCH_DICTIONARY_REQUESTED, fetchDictionarySucceeded, fetchDictionaryFailed } from '../actions';
import { url } from '../config';

const fetchDictionaryLogic = createLogic({
	type: FETCH_DICTIONARY_REQUESTED,
	process: ({ getState }, dispatch, done) => {
		const { lang } = getState().settings;
		fetch(`${url}/chats`)
			.then(response => response.json())
			.then(json => {
				const helpers = json[lang] ? json[lang] : [];
				dispatch(fetchDictionarySucceeded(getDictionary(helpers)));
			})
			.catch(error => {
				dispatch(fetchDictionaryFailed(error));
			})
			.then(() => done());
	}
});

function getDictionary(helpers) {
	const list = helpers.map(helper => ({
		...helper,
		messages: getMessages(helper)
	}));
	return list;
}

function getMessages(helper) {
	const messages = helper.messages.map(messsage => ({
		...messsage,
		id: messsage._id,
		createdAt: new Date(),
		user: {
			_id: 2,
			avatar: null
		}
	}));
	return messages;
}

export const dictionaryLogic = [fetchDictionaryLogic];
