import React, { useState } from 'react';
import Modal from './modal';
import './modal.css';
import createButton from './button_create.png';
import React from 'react';
import './App.css';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signedin from './Signedin';
import Login from './Login';

function App() {
	const [show, setShow] = useState(false);
	return (
		<Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Router>
					<AuthProvider>
						<Routes>
							<Route path='/signup' element={<Signup />} />
							<Route path='/login' element={<Login />} />
							<Route exact path='/' element={<Signedin />} />
						</Routes>
					</AuthProvider>
				</Router>
			</div>
			<img src={createButton} alt='Create my Curriculum' onClick={() => setShow(true)} />
			<Modal title='Create a New Curriculum' onClose={() => setShow(false)} show={show}></Modal>
		</Container>
	);
}

export default App;
