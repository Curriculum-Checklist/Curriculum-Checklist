import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Curriculum from '../classes/curriculum';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useFirestore } from '../contexts/FirestoreContext';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';

const CreateCurriculumModal = ({ show, setShowCreateCurriculumModal }) => {
	// const curriculumTitleInputRef = useRef();
	const programNameInputRef = useRef();
	const schoolNameInputRef = useRef();
	const { firestoreHelper } = useFirestore();
	const go_to = useNavigate();

	const submitCurriculum = (e) => {
		e.preventDefault();
		const newCurriculum = new Curriculum(
			// curriculumTitleInputRef.current.value,
			programNameInputRef.current.value,
			schoolNameInputRef.current.value,
			[]
		);
		firestoreHelper.setCurriculum(newCurriculum);
		LocalStorageHelper.set('curriculum', newCurriculum);
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
