import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CreateCurriculumModal from '../components/CreateCurriculumModal';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
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
			{/* <Card>
				<Card.Body>
					<h2 className='text-center mb-3'>SIGN IN TEST</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
				</Card.Body>
			</Card> */}
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<button alt='Create my Curriculum' onClick={() => setShowCreateCurriculumModal(true)}>
					Create Curriculum
				</button>
				<CreateCurriculumModal
					title='Create a New Curriculum'
					setShowCreateCurriculumModal={setShowCreateCurriculumModal}
					show={showCreateCurriculumModal}
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
