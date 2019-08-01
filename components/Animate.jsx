import { Transition } from 'semantic-ui-react';

class Animate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: this.props.delay === 0
		};
		if (this.props.delay > 0) {
			setTimeout(() => this.setState({ show: true }), this.props.delay);
		}
	}

	render() {
		return (
			<Transition
				visible={this.state.show}
				transitionOnMount
				animation={this.props.animation}
				duration={this.props.duration}
			>
				<div>{this.props.children}</div>
			</Transition>
		);
	}
}

Animate.defaultProps = {
	visible: true,
	delay: 0,
	duration: 200,
	animation: 'fade up'
};

export default Animate;
