import React from 'react';
import styles from '../styles/Sidebar.module.css';
import Divider from './Divider';
import AccountLogo from './sidebarIcons/AccountLogo';
import CollectionLogo from './sidebarIcons/CollectionLogo';
import DashboardLogo from './sidebarIcons/DashboardLogo';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDevice } from '../contexts/DeviceContext';
import { motion } from 'framer-motion/dist/framer-motion';

const tabOrdering = ['/', '/Collection', '/Account'];
let pastTwoTabIndices = [-1, -1];
const updateTabIndices = (newIndex) => {
	if (pastTwoTabIndices[0] === newIndex) return pastTwoTabIndices;
	pastTwoTabIndices = [newIndex, pastTwoTabIndices[0]];
};

const Sidebar = () => {
	const go_to = useNavigate();
	const location = useLocation();
	const { device } = useDevice();
	const path = location.pathname;
	updateTabIndices(tabOrdering.indexOf(path));

	function goDashboard() {
		go_to('/');
	}

	function goCollections() {
		go_to('/Collection');
	}

	function goAccounts() {
		go_to('/Account');
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
				<motion.div
					key={pastTwoTabIndices[1]}
					animate={
						device === 'smartphone' || device === 'tablet'
							? {
									top: 0,
									left: `calc(100vw / ${tabOrdering.length} * ${pastTwoTabIndices[0]})`,
							  }
							: { left: 'auto', top: 60 * pastTwoTabIndices[0] }
					}
					initial={
						pastTwoTabIndices[1] === -1
							? undefined
							: device === 'smartphone' || device === 'tablet'
							? {
									top: 0,
									left:
										pastTwoTabIndices[1] < 0
											? 0
											: `calc(100vw / ${tabOrdering.length} * ${pastTwoTabIndices[1]})`,
							  }
							: { left: 'auto', top: Math.max(0, 60 * pastTwoTabIndices[1]) }
					}
					className={styles.selectedBarWrapper}>
					<div className={styles.selectedBar} />
				</motion.div>
				<Tab onClick={goDashboard}>
					<DashboardLogo selected={path === '/'} />
				</Tab>
				<Tab onClick={goCollections}>
					<CollectionLogo selected={path === '/Collection'} />
				</Tab>
				<Tab onClick={goAccounts}>
					<AccountLogo selected={path === '/Account'} />
				</Tab>
			</div>
		</div>
	);
};

export default Sidebar;

const Tab = ({ onClick, children }) => {
	return (
		<div className={styles.tab} onClick={onClick}>
			<div className={styles.tabLogoWrapper}>{children}</div>
		</div>
	);
};
