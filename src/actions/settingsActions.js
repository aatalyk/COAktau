import { SET_LANG, ENABLE_NOTIFICATION, DISABLE_NOTIFICATION } from './types';

export const setLang = lang => ({
	type: SET_LANG,
	lang
});

export const enableNotification = () => ({
	type: ENABLE_NOTIFICATION,
	notifsEnabled: true
});

export const disableNotification = () => ({
	type: DISABLE_NOTIFICATION,
	notifsEnabled: false
});
