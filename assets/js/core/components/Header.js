import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header id="header">
			<img src="http://wimoapp.com/wp-content/themes/wimo/dist/img/group-2.svg" />
			<br />
			<NavLink to={'/tasks_list'} >
				<h1>Tasks List</h1>
			</NavLink>
		</header>
	)
};

export default Header;