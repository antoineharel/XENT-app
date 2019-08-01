import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer, { defaultStore as authDefaultStore } from './reducers/auth';

import { composeWithDevTools } from 'redux-devtools-extension';

let composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export const initializeStore = (initialState = { auth: authDefaultStore }) => {
	return createStore(combineReducers({ auth: authReducer }), initialState, composeEnhancers(applyMiddleware(thunk)));
};
