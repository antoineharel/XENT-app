import Animate from './Animate';
import app_config, { api_route } from '../config';

let store = require('../redux/withReduxStore').getOrCreateStore();
import Router from '../routes';
import axios from 'axios';
import { setUser } from '../redux/actions/auth';

const Page = (Wrapped, config = null) => {
	let layout;
	if (config !== null) layout = config.layout;

	class Wrap extends React.Component {
		constructor(props) {
			super(props);
			this.state = {};
		}

		static async getInitialProps(ctx) {
			let pageProps = {};
			let needsReload = false;

			let needsAuth = config.needsAuth;

			if (typeof needsAuth !== undefined && needsAuth) {
				let jwt = undefined;
				if (jwt == undefined) {
					if (ctx.req) ctx.res.redirect(app_config.LOGIN_ERROR_REDIRECT_ROUTE.server);
					else Router.pushRoute(app_config.LOGIN_ERROR_REDIRECT_ROUTE.client);
					store.dispatch(setUser(null));
				} else {
					try {
						await axios.post(api_route('/token/decrypt'), {
							token: jwt
						});
						console.log(jwt);
					} catch (error) {
						cookies.remove('user_token');
						if (ctx.req) ctx.res.redirect(app_config.LOGIN_ERROR_REDIRECT_ROUTE.server);
						else Router.pushRoute(app_config.LOGIN_ERROR_REDIRECT_ROUTE.client);
						store.dispatch(setUser(null));
					}
				}
			}

			if (Wrapped.getInitialProps) pageProps = await Wrapped.getInitialProps(ctx);
			if (config !== null) {
				if (config.needsReload !== undefined && ctx.req === undefined) needsReload = config.needsReload;
			}

			return { pageProps, needsReload };
		}

		render() {
			let user = store.getState().auth.user;
			if (typeof config.needsAuth !== undefined && config.needsAuth && user == null) {
				return null;
			}

			if (this.props.needsReload) {
				window.location.reload();
				return null;
			}
			return (
				<div id="page-container">
					<Animate>
						<Wrapped {...this.props.pageProps} />
					</Animate>
				</div>
			);
		}
	}

	if (layout != null) Wrap.layout = layout;

	return Wrap;
};

export default Page;
