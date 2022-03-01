import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const { googleSignIn } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const go_to = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			go_to('/');
		} catch {
			setError('Failed to sign in');
		}
	}

	async function googleSubmit(e) {
		e.preventDefault();

		try {
			await googleSignIn();
			go_to('/');
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-3'>Log In</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' ref={passwordRef} required />
						</Form.Group>
						<Button disabled={loading} className='w-100 text-center mt-3' type='submit'>
							Log In
						</Button>
					</Form>
					<Form onSubmit={googleSubmit}>
						<GoogleButton className='w-100 text-center mt-3 g-btn' type='dark' onClick={googleSubmit} />
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Don't have an account? <Link to='/signup'>Sign Up</Link>
			</div>
		</>
	);
}
