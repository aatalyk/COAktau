import { combineReducers } from 'redux';
import { faqReducer } from './faqReducer';

export const rootReducer = combineReducers({
	faq: faqReducer
});
