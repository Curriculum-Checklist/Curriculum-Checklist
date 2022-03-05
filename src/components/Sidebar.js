import React from 'react';
import styles from '../styles/Sidebar.module.css';
import Divider from './Divider';
import AccountLogo from './sidebarIcons/AccountLogo';
import CollectionLogo from './sidebarIcons/CollectionLogo';
import DashboardLogo from './sidebarIcons/DashboardLogo';

const Sidebar = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logoWrapper}>
				<img src='/img/icons/logo_transparent_32.png' alt='logo' className={styles.logo} />
			</div>
			<div className={styles.dividerWrapper}>
				<Divider />
			</div>
			<div className={styles.tabs}>
				<Tab>
					<DashboardLogo />
				</Tab>
				<Tab>
					<CollectionLogo />
				</Tab>
				<Tab>
					<AccountLogo />
				</Tab>
			</div>
		</div>
	);
};

export default Sidebar;

const Tab = ({ children }) => {
	return (
		<div className={styles.tab}>
			<div className={styles.tabLogoWrapper}>{children}</div>
		</div>
	);
};
