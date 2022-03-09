import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreateCurriculumModal from '../components/CreateCurriculumModal';
import AddCourseModal from '../components/AddCourseModal'
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Dashboard.module.css';
import addCircularImg from '../assets/add_circular.svg';
import clsx from 'clsx';

export default function Collections() {
	const [error, setError] = useState('');
	const [showCreateCurriculumModal, setShowCreateCurriculumModal] = useState(false);

	const { logout } = useAuth();
	const go_to = useNavigate(); 

	async function handleLogout() {
		setError('');

		try {
			await logout();
			go_to('/login');
		} catch {
			setError('Failed to log out');
		}
	}
	//TODO - use dropdown to notify user on failed logout
	return (
		<>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<div
					className={clsx(styles.createCurriculumButton, 'unselectable')}
					alt='Create my Curriculum'
					onClick={() => setShowCreateCurriculumModal(true)}>
					<img src={addCircularImg} alt='Add icon' />
					<h3>Create Curriculum</h3>
				</div>
				<CreateCurriculumModal
					setShowCreateCurriculumModal={setShowCreateCurriculumModal}
					show={showCreateCurriculumModal}
				/>
			</div>
			
			{/* <div className='w-100 text-center mt-2'>
				<Button variant='link' onClick={handleLogout}>
					{' '}
					Log Out{' '}
				</Button>
			</div> */}
		</>
	);
}
