import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header id="header">
			<img src="http://wimoapp.com/wp-content/themes/wimo/dist/img/group-2.svg" />
			<br />
			<NavLink to={'/tasks'} >
				Tasks List
			</NavLink>
		</header>
	)
};

export default Header;