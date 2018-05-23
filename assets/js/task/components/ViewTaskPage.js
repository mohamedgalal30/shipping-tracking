import React from 'react';
import { connect } from 'react-redux';
import Map from '../../core/components/common/Map';

class ViewtaskPage extends React.Component {
	constructor() {
		super();
		this.state = {
			origin: {},
			destination: {}
		}
	}
	componentWillMount() {
		const tasks = this.props.tasks;
		const taskId = this.props.match.params.id;
		const task = tasks.find(t => t.id == taskId) || {};

		if (task.fromLocation) {
			const latLng = task.fromLocation.split(", ")
			this.setState({ origin: { lat: latLng[0], lng: latLng[1] } })
		}
		if (task.toLocation) {
			const latLng = task.toLocation.split(", ")
			this.setState({ destination: { lat: latLng[0], lng: latLng[1] } })
		}

	}


	render() {
		return (
			<div>
				< Map
					origin={this.state.origin}
					destination={this.state.destination}
				/>
			</div >
		);
	}
}
function mapStateToProps(state) {
	return {
		tasks: state.tasks.list.data,
	};
}

export default connect(mapStateToProps, null)(ViewtaskPage);
// export default () => <div>view map</div>;
