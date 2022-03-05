import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Layout.module.css';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
	const location = useLocation();
	return (
		<div className={styles.container}>
			{!['/signup', '/login'].includes(location.pathname) && <Sidebar />}
			<div>{children}</div>
		</div>
	);
};

export default Layout;
