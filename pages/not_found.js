import Layout from './layouts/layout';
import Page from '../components/Page';

class NotFound extends React.Component {
	state = {};
	render() {
		return <h1>404</h1>;
	}
}

export default Page(NotFound, { layout: Layout });
