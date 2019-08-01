import Layout from './layouts/layout';
import Page from '../components/Page';

class NotFound extends React.Component {
	state = {};
	static async getInitialProps(ctx) {
		if (ctx.res) ctx.res.statusCode = 404;
	}
	render() {
		return <h1>404</h1>;
	}
}

export default Page(NotFound, { layout: Layout });
