import { combineReducers } from 'redux';
import { faqReducer } from './faqReducer';
import { settingsReducer } from './settingsReducer';

export const rootReducer = combineReducers({
  faq: faqReducer,
  settings: settingsReducer,
});
