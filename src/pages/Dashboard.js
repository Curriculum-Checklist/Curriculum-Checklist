import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Dashboard.module.css';
import addCircularImg from '../assets/add_circular.svg';
import clsx from 'clsx';
import SemCard from '../components/SemCard';

export default function Dashboard() {
	const [error, setError] = useState('');
	const [showAddCourseModal, setShowAddCourseModal] = useState(false);
	const [sems, setSems] = useState([]); //List of sems for teting only

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
	
	//Need to actually add sem in database
	const addSem = () => {
		const newList = sems.concat({})
		setSems(newList);
	}

	//TODO - use dropdown to notify user on failed logout
	return (
		<>

			<div className={clsx(styles.grid)}>
				{sems.map((sem) => (<SemCard/>))}
				<div 
					style={{backgroundColor: 'var(--gray-2)'}} 
					className={clsx(styles.addSemCard)}
					onClick={addSem}>
					
					<div className={(styles.addCourseIcon)}>
                        <img src={addCircularImg} alt='Add icon' width='71' height ='71' />
                    </div>

					<div className={(styles.addCourseText)}>
                            <h3>Add Sem</h3>
                    </div>
				</div>
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
