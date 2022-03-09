import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreateCurriculumModal from '../components/CreateCurriculumModal';
import AddCourseModal from '../components/AddCourseModal'
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Dashboard.module.css';
import addCircularImg from '../assets/add_circular.svg';
import clsx from 'clsx';

export default function Dashboard() {
	const [error, setError] = useState('');
	const [showAddCourseModal, setShowAddCourseModal] = useState(false);

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

			<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
				<div
					className={clsx(styles.addCourseButton, 'mt-2 unselectable')}
					alt='Add Course'
					style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
					onClick={() => setShowAddCourseModal(true)}>
						
					<div className={(styles.addCourseIcon)}>
						<img src={addCircularImg} alt='Add icon' width='24' height ='24' />
					</div>
					<div className={(styles.addCourseText)}>
						<h6>Add Course</h6>
					</div>

				</div>

				<AddCourseModal
					setShowAddCourseModal={setShowAddCourseModal}
					show={showAddCourseModal}
				/>
			</div>
			
			<div className='w-100 text-center mt-2'>
				<Button variant='link' onClick={handleLogout}>
					{' '}
					Log Out{' '}
				</Button>
			</div>
		</>
	);
}
