import { Dimmer, Loader } from 'semantic-ui-react';
import Animate from './Animate';

class LayoutController extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			layout: this.props.children.type.layout,
			same: true
		};
	}
	static async getInitialProps(ctx) {
		return { lcontr: 'joazeifj' };
	}

	render() {
		let Layout;
		Layout = this.props.children.type.layout;
		if (Layout != this.state.layout) {
			if (this.state.same) this.setState({ same: false });
			if (window != undefined) window.location.reload();
		}

		if (Layout === undefined) Layout = () => <div>{this.props.children}</div>;

		if (!this.state.same) {
			return (
				<Dimmer inverted active>
					<Loader>Chargement...</Loader>
				</Dimmer>
			);
		}
		return <Layout {...this.props}>{this.props.children}</Layout>;
	}
}

export default LayoutController;
