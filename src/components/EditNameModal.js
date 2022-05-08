import React, { useEffect, useRef } from 'react';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useDatabase } from '../contexts/DatabaseContext';
import { useFirestore } from '../contexts/FirestoreContext';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';

const EditNameModal = ({ show, setShow }) => {
	const { user, setUser } = useDatabase();
	const { firestoreHelper } = useFirestore();
	const nameInputRef = useRef();

	const saveName = async (e) => {
		e.preventDefault();
		const newName = nameInputRef.current.value;
		const newUser = user.duplicate();
		newUser.name = newName;
		console.log(newName);

		try {
			await firestoreHelper.setName(newName);
		} catch (e) {
			console.log(e);
		}

		LocalStorageHelper.set('user', newUser);
		setUser(newUser);

		closeModal();
	};

	const closeModal = () => {
		setShow(false);
	};

	useEffect(() => {
		if (user) nameInputRef.current.value = user.name ?? '';
	}, [user, show]);

	return (
		<BaseForm onSubmit={saveName}>
			<BaseModal
				show={show}
				title={'Edit Name'}
				hasCancelButton
				hasActionButton
				actionIsSubmit
				onClose={closeModal}>
				<BaseInput label='Display name' required ref={nameInputRef} />
			</BaseModal>
		</BaseForm>
	);
};

export default EditNameModal;
