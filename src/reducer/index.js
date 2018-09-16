import { combineReducers } from 'redux';
import { faqReducer } from './faqReducer';
import { settingsReducer } from './settingsReducer';
import { newsReducer } from './newsReducer';
import { notifsReducer } from './notifsReducer';
import { servicesReducer } from './servicesReducer';
import { aboutReducer } from './aboutReducer';
import { myServicesReducer } from './myServicesReducer';
import { chatReducer } from './chatReducer';

export const rootReducer = combineReducers({
	faq: faqReducer,
	settings: settingsReducer,
	news: newsReducer,
	notifs: notifsReducer,
	services: servicesReducer,
	myServices: myServicesReducer,
	about: aboutReducer,
	chat: chatReducer
});
