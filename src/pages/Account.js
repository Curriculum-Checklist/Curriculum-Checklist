import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import BaseButton from '../components/BaseButton';
import { useAuth } from '../contexts/AuthContext';
import { useDatabase } from '../contexts/DatabaseContext';
import notify from '../function/notify';
import styles from '../styles/Account.module.css';

export default function Account() {
	const { setCurriculum } = useDatabase();
	const [error, setError] = useState('');
	const { logout } = useAuth();
	const go_to = useNavigate();

	async function handleLogout() {
		setError('');

		try {
			setCurriculum(undefined);
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
			<BaseButton color='black' label='Log Out' onClick={handleLogout} />
		</div>
	);
}
