import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { BaseButton } from '../components/BaseButton';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Account.module.css';

export default function Account() {
	const [error, setError] = useState('');
	const { logout } = useAuth();
	const go_to = useNavigate();

	async function handleLogout() {
		setError('');

		try {
			await logout();
			go_to('/login');
			LocalStorageHelper.clear();
		} catch {
			setError('Failed to log out');
		}
	}

	//TODO - use dropdown to notify user on failed logout
	return (
		<div className={styles.container}>
			<h1>Account</h1>
			<BaseButton color='black' label='Log Out' onClick={handleLogout} />
		</div>
	);
}
