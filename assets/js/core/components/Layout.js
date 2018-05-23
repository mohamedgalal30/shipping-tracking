import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';

class Layout extends React.Component {
	
	render() {

		return (
			<div className="margin-body">
				<div className='wrapper'>
					<Header />
					<MainContent component={this.props.component} {...this.props} />
					<Footer />
				</div>
			</div>
		);
	}

}


export default Layout;