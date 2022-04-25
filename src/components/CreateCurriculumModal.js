import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Curriculum from '../classes/curriculum';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useDatabase } from '../contexts/DatabaseContext';
import { useFirestore } from '../contexts/FirestoreContext';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';

const CreateCurriculumModal = ({ show, setShowCreateCurriculumModal, initialProgramName, initialSchoolName }) => {
	const programNameInputRef = useRef();
	const schoolNameInputRef = useRef();
	const { firestoreHelper } = useFirestore();
	const { user, setUser } = useDatabase();
	const go_to = useNavigate();

	const submitCurriculum = async (e) => {
		e.preventDefault();
		const newCurriculum = new Curriculum(
			user.name,
			programNameInputRef.current.value,
			schoolNameInputRef.current.value,
			new Date(),
			false,
			'',
			[]
		);

		try {
			const curriculumId = await firestoreHelper.addCurriculum(newCurriculum);
			await firestoreHelper.setSelectedCurriculum(curriculumId);

			const newUser = user.duplicate();
			newUser.curricula[curriculumId] = newCurriculum;
			newUser.selectedCurriculum = curriculumId;
			LocalStorageHelper.set('user', newUser);
			setUser(newUser);
			setShowCreateCurriculumModal(false);
			go_to('/');
		} catch (e) {
			console.log('Failed to create curriculum', e.message);
		}
	};

	const onModalClose = (e) => {
		e.preventDefault();
		// curriculumTitleInputRef.current.value = '';
		programNameInputRef.current.value = '';
		schoolNameInputRef.current.value = '';
		setShowCreateCurriculumModal(false);
	};

	useEffect(() => {
		if (initialProgramName) programNameInputRef.current.value = initialProgramName;
		if (initialSchoolName) schoolNameInputRef.current.value = initialSchoolName;
	}, [initialProgramName, initialSchoolName, show]);
	return (
		<BaseForm onSubmit={submitCurriculum}>
			<BaseModal
				show={show}
				title={'Create Curriculum'}
				hasCancelButton
				hasActionButton
				actionIsSubmit
				onClose={onModalClose}>
				{/* <BaseInput label='Curriculum Title' required ref={curriculumTitleInputRef} /> */}
				<BaseInput label='Program Name' required ref={programNameInputRef} />
				<BaseInput label='School Name' required ref={schoolNameInputRef} />
			</BaseModal>
		</BaseForm>
	);
};

export default CreateCurriculumModal;
