import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import BaseAvatar from '../components/BaseAvatar';
import BaseButton from '../components/BaseButton';
import EditNameModal from '../components/EditNameModal';
import { useAuth } from '../contexts/AuthContext';
import { useDatabase } from '../contexts/DatabaseContext';
import { useDevice } from '../contexts/DeviceContext';
import notify from '../function/notify';
import styles from '../styles/Account.module.css';

export default function Account() {
	const { currentUser } = useAuth();
	const { device } = useDevice();
	const { user, setUser } = useDatabase();
	const [error, setError] = useState('');
	const { logout } = useAuth();
	const go_to = useNavigate();
	const avatarSize = device === 'smartphone' ? 80 : 110;
	const [showEditNameModal, setShowEditNameModal] = useState(false);

	async function handleLogout() {
		setError('');

		try {
			setUser(undefined);
			LocalStorageHelper.clear();
			await logout();

			go_to('/login');
		} catch (e) {
			console.log(e.message);
			notify(error);
			setError('Failed to log out');
		}
	}

	//TODO - use dropdown to notify user on failed logout
	return (
		<div className={styles.container}>
			<h1>Account</h1>

			<div className={styles.infoWrapper}>
				<div className={styles.overview}>
					<div className={styles.overviewLeft}>
						<BaseAvatar
							photoURL={currentUser?.photoURL}
							size={avatarSize}
							letter={user.name}
							nonclickable
							onFrontAbsolute
						/>
					</div>
					<div className={styles.overviewRight}>
						<h2 className={styles.nameInOverview}>{user.name}</h2>
						<p className={styles.email}>{user.email}</p>
					</div>
				</div>

				<div className={styles.infoRow}>
					<div className={styles.infoRowLeft}>
						<p className={styles.infoRowTitle}>Display Name</p>
						<h4>{user.name}</h4>
					</div>
					<div className={styles.infoRowRight}>
						<BaseButton label='Edit' color='transparent-green' onClick={() => setShowEditNameModal(true)} />
					</div>
				</div>
			</div>
			<BaseButton color='black' label='Log Out' onClick={handleLogout} />
			<EditNameModal show={showEditNameModal} setShow={setShowEditNameModal} />
		</div>
	);
}
