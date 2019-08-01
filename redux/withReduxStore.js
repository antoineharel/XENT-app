import React from 'react';
import { initializeStore } from './store';

import Cookies from 'universal-cookie';
let cookies;
import { setUser } from '../redux/actions/auth';
import axios from 'axios';

import { api_route } from '../config';

const isServer = typeof window === 'undefined';

export function getOrCreateStore(state) {
	let user = null;
	if (state !== undefined) user = state.auth.user;
	// Always make a new store if server, otherwise state is shared between requests
	if (isServer) {
		let store = initializeStore(state);
		store.dispatch(setUser(user));
		return store;
	}

	// Create store if unavailable on the client and set it on the window object
	if (!window['__NEXT_REDUX_STORE__']) {
		window['__NEXT_REDUX_STORE__'] = initializeStore(state);
	}

	if (user !== null) window['__NEXT_REDUX_STORE__'].dispatch(setUser(user));
	return window['__NEXT_REDUX_STORE__'];
}

export default (App) => {
	return class AppWithRedux extends React.Component {
		static async getInitialProps(appContext) {
			const reduxStore = getOrCreateStore();

			if (appContext.ctx.req) cookies = new Cookies(appContext.ctx.req.headers.cookie);
			else cookies = new Cookies();
			let jwt = cookies.get('user_token');
			if (jwt == undefined) {
				reduxStore.dispatch(setUser(null));
			} else {
				let user = null;
				try {
					user = await axios.post(api_route('/token/decrypt'), {
						token: jwt
					});
					reduxStore.dispatch(setUser(user.data));
				} catch (error) {
					cookies.remove('user_token');
					reduxStore.dispatch(setUser(null));
				}
			}

			// Provide the store to getInitialProps of pages
			appContext.ctx.reduxStore = reduxStore;

			let appProps = {};
			if (typeof App.getInitialProps === 'function') {
				appProps = await App.getInitialProps(appContext);
			}

			return {
				...appProps,
				initialReduxState: reduxStore.getState()
			};
		}

		constructor(props) {
			super(props);
			this.reduxStore = getOrCreateStore(props.initialReduxState);
		}

		render() {
			return <App {...this.props} reduxStore={this.reduxStore} />;
		}
	};
};
