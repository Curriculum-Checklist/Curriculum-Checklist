import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import User from '../classes/user';
import BaseButton from '../components/BaseButton';
import BaseForm from '../components/BaseForm';
import BaseInput from '../components/BaseInput';
import SignInWrapper from '../components/SignInWrapper';
import { useAuth } from '../contexts/AuthContext';
import { useDatabase } from '../contexts/DatabaseContext';
import { useFirestore } from '../contexts/FirestoreContext';
import styles from '../styles/Intro.module.css';

const Intro = () => {
	const { firestoreHelper } = useFirestore();
	const { user, setUser } = useDatabase();
	const nameInputRef = useRef();
	const go_to = useNavigate();
	const { currentUser } = useAuth();

	// useEffect(() => {

	//     async function getUserFromFirestore() {
	//         const user = await User.fromFirestore(firestoreHelper);
	//         if (!user) return;
	//         setUser(user);
	//         LocalStorageHelper.set('user', user);
	//     }

	//     getUserFromFirestore();
	// }, [firestoreHelper, setUser]);

	const submitName = async (e) => {
		e.preventDefault();
		const name = nameInputRef.current.value;
		const newUser = new User(name, currentUser.email, '', {});
		LocalStorageHelper.set('user', newUser);
		try {
			await firestoreHelper.createUser(newUser);
		} catch (e) {
			console.log('Failed to create user', e.message);
		}
		setUser(newUser);
		go_to('/');
	};

	useEffect(() => {
		if (user) go_to('/');
	}, [user, go_to]);

	return (
		<SignInWrapper>
			<div className={styles.container}>
				<img src='/img/icons/logo_transparent.png' alt='Logo' width={150} />
				<h1 className={styles.title}>Aloha!</h1>
				<p className={styles.description}>What should we call you?</p>
				<div className={styles.formContainer}>
					<BaseForm onSubmit={submitName}>
						<BaseInput label='Name' required ref={nameInputRef} />
						<BaseButton label='Continue' color='ocean-blue' type='submit' align='center' />
					</BaseForm>
				</div>
			</div>
		</SignInWrapper>
	);
};

export default Intro;
