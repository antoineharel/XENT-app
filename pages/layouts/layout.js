import { Menu, Container, Dropdown, Button, Image } from 'semantic-ui-react';
import { Link } from '../../routes';
import '../../css/main.css';
import { connect } from 'react-redux';

class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Menu fixed="top" borderless size="huge">
					<Link route="home">
						<Menu.Item header>--app-name--</Menu.Item>
					</Link>
					<Link route="home">
						<Menu.Item>Other link</Menu.Item>
					</Link>
				</Menu>
				<div className="pageContent">
					<Container>{this.props.children}</Container>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(Layout);
