import { createLogicMiddleware } from 'redux-logic';

import { rootReducer } from '../reducer';
import { logicArr } from '../logic';
import { applyMiddleware, createStore } from 'redux';

export const configureStore = () => {
	const logicMiddleware = createLogicMiddleware(logicArr);
	const store = createStore(rootReducer, applyMiddleware(logicMiddleware));

	return store;
};
