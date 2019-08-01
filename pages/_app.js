import React from 'react';
import App, { Container } from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import Head from 'next/head';

import withReduxStore from '../redux/withReduxStore';

import { Provider } from 'react-redux';

import LayoutController from '../components/LayoutController';

class Main extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};
		let layoutProps = { user: null };

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		return { pageProps, layoutProps };
	}

	render() {
		const { Component, pageProps, layoutProps, reduxStore } = this.props;
		return (
			<Provider store={reduxStore}>
				<Container>
					<Head>
						<title>--app-name--</title>
					</Head>
					<LayoutController {...layoutProps}>
						<Component {...pageProps} />
					</LayoutController>
				</Container>
			</Provider>
		);
	}
}

export default withReduxStore(Main);
