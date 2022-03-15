import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/Layout.module.css';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
	const location = useLocation();
	const showSidebar = !['/signup', '/login'].includes(location.pathname);
	return (
		<div className={styles.container}>
			{showSidebar && <Sidebar />}
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default Layout;
