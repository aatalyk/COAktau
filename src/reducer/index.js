import { combineReducers } from 'redux';
import { faqReducer } from './faqReducer';
import { settingsReducer } from './settingsReducer';
import { newsReducer } from './newsReducer';
import { newsItemReducer } from './newsItemReducer';
import { notifsReducer } from './notifsReducer';
import { servicesReducer } from './servicesReducer';
import { aboutReducer } from './aboutReducer';
import { myServicesReducer } from './myServicesReducer';
import { chatReducer } from './chatReducer';
import { calcReducer } from './calcReducer';
import { dictionaryReducer } from './dictionaryReducer';
import { myCityReducer } from './myCityReducer';
import { contactReducer } from './contactReducer';
import { taxiReducer } from './taxiReducer';

export const rootReducer = combineReducers({
	faq: faqReducer,
	settings: settingsReducer,
	news: newsReducer,
	newsItem: newsItemReducer,
	notifs: notifsReducer,
	services: servicesReducer,
	myServices: myServicesReducer,
	about: aboutReducer,
	chat: chatReducer,
	calc: calcReducer,
	dictionary: dictionaryReducer,
	myCity: myCityReducer,
	contact: contactReducer,
	taxi: taxiReducer
});
