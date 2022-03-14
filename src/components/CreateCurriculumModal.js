import React, { useRef } from 'react';
import Curriculum from '../classes/curriculum';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';
import { useNavigate } from 'react-router-dom';

const CreateCurriculumModal = ({ show, setShowCreateCurriculumModal }) => {
	const curriculumTitleInputRef = useRef();
	const programNameInputRef = useRef();
	const schoolNameInputRef = useRef();
	const { currentUser } = useAuth();
	const { firestoreHelper } = useFirestore();
	const go_to = useNavigate();

	const submitCurriculum = (e) => {
		e.preventDefault();
		const newCurriculum = new Curriculum(
			curriculumTitleInputRef.current.value,
			programNameInputRef.current.value,
			schoolNameInputRef.current.value,
			[]
		);
		firestoreHelper.setCurriculum(currentUser.uid, newCurriculum);
		LocalStorageHelper.set('curriculum', newCurriculum);
		console.log('wa');
		setShowCreateCurriculumModal(false);
		go_to('/Dashboard')
	};

	const onModalClose = (e) => {
		e.preventDefault();
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
				<BaseInput label='Curriculum Title' required ref={curriculumTitleInputRef} />
				<BaseInput label='Program Name' required ref={programNameInputRef} />
				<BaseInput label='School Name' required ref={schoolNameInputRef} />
			</BaseModal>
		</BaseForm>
	);
};

export default CreateCurriculumModal;
