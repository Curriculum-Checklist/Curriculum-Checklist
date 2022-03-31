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
	const { setCurriculum } = useDatabase();
	const go_to = useNavigate();

	const submitCurriculum = (e) => {
		e.preventDefault();
		const newCurriculum = new Curriculum(programNameInputRef.current.value, schoolNameInputRef.current.value, []);
		try {
			firestoreHelper.setCurriculum(newCurriculum);
		} catch (e) {
			console.log('Failed to save curriculum online', e.message);
		}

		LocalStorageHelper.set('curriculum', newCurriculum);
		setCurriculum(newCurriculum);
		setShowCreateCurriculumModal(false);
		go_to('/');
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
