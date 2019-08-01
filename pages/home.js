import { Link } from '../routes';
import Head from 'next/head';
import Layout from './layouts/layout';
import Page from '../components/Page';

class Home extends React.Component {
	state = {};
	render() {
		return <div>Home</div>;
	}
}

Home.layout = Layout;

export default Page(Home, {
	layout: Layout
});
