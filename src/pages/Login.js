import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import SignInWrapper from '../components/SignInWrapper';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/SignIn.module.css';

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
		<SignInWrapper>
			<div className={styles.card}>
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
					<Button disabled={loading} className={styles.signupButton} type='submit'>
						Log In
					</Button>
				</Form>
				<h4 className={styles.or}>or</h4>
				<Form onSubmit={googleSubmit}>
					<GoogleButton
						className={clsx('w-100 text-center mt-3 g-btn', styles.googleButton)}
						type='dark'
						onClick={googleSubmit}
					/>
				</Form>
			</div>

			<div className={styles.bottomText}>
				Don't have an account? <Link to='/signup'>Sign Up</Link>
			</div>
		</SignInWrapper>
	);
}
