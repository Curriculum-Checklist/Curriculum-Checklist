import React from 'react';
import styles from '../styles/Sidebar.module.css';
import Divider from './Divider';
import AccountLogo from './sidebarIcons/AccountLogo';
import CollectionLogo from './sidebarIcons/CollectionLogo';
import DashboardLogo from './sidebarIcons/DashboardLogo';
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';

const Sidebar = () => {

	const go_to = useNavigate();

	function goDashboard(){
		go_to('/Dashboard');
	}

	function goCollections(){
		go_to('/Collections');
	}

	function goAccounts(){
		go_to('/Accounts');
	}

	return (
		<div className={styles.container}>
			<div className={styles.logoWrapper}>
				<img src='/img/icons/logo_transparent_32.png' alt='logo' className={styles.logo} />
			</div>
			<div className={styles.dividerWrapper}>
				<Divider />
			</div>
			<div className={styles.tabs}>
				<Tab onClick={goDashboard}>
					<div onClick={goDashboard}>
						<DashboardLogo />					
					</div>

				</Tab>
				<Tab>
					<div onClick={goCollections}>
						<CollectionLogo />
					</div>
				</Tab>
				<Tab>
					<div onClick={goAccounts}>
						<AccountLogo />
					</div>
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
