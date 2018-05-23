import React from 'react';
import { Route } from 'react-router-dom';

class MainContent extends React.Component {
	render() {
		let { component: Component } = this.props;
		return (
			<div className="container ">
					<Route component={Component} />
			</div>



		);
	}
}

export default MainContent;