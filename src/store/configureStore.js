import {createLogicMiddleware} from "redux-logic";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {rootReducer} from "../reducer";
import {logicArr} from "../logic";
import {applyMiddleware, createStore} from "redux";

const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"settings",
		"news",
		"notifs",
		"about",
		"services",
		"myServices",
		"chat",
		"dictionary",
		"myCity",
		"contact",
		"calc",
	], // reducers to be persisted in the store
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => {
	const logicMiddleware = createLogicMiddleware(logicArr);
	const store = createStore(persistedReducer, applyMiddleware(logicMiddleware));
	const persistor = persistStore(store);

	return {store, persistor};
};
