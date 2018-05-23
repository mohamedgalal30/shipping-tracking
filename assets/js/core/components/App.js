import React from 'react';
import routes from '../../routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component {

	render() {
		return (
			<Router>
				<Switch>
					{
						routes.map(({ layout: Layout, component: component, path, exact, ...rest }, index) => {
							return <Route key={index} path={path} exact={exact} render={
								props => <Layout {...props} component={component} />
							}
							/>;
						})
					}
				</Switch>
			</Router>
		);
	}

}

export default App;

