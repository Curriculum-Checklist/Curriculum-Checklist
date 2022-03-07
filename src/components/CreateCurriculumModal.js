import React, { useState } from 'react';
import Curriculum from '../classes/curriculum';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';
import BaseModal from './BaseModal';

const CreateCurriculumModal = ({ show, setShowCreateCurriculumModal }) => {
	const [curriculumtitle, setCurriculumtitle] = useState('');
	const [programname, setProgramname] = useState('');
	const [schoolname, setSchoolname] = useState('');
	const { currentUser } = useAuth();
	const { firestoreHelper } = useFirestore();

	const submitCurriculum = (e) => {
		e.preventDefault();
		const newCurriculum = new Curriculum(curriculumtitle, programname, schoolname, []);
		firestoreHelper.setCurriculum(currentUser.uid, newCurriculum);
		LocalStorageHelper.set('curriculum', newCurriculum);
		setShowCreateCurriculumModal(false);
	};

	const onModalClose = (e) => {
		setShowCreateCurriculumModal(false);
	};

	return (
		<BaseModal
			show={show}
			title={'Create Curriculum'}
			hasCancelButton
			hasActionButton
			onActionButtonClick={submitCurriculum}
			onClose={onModalClose}>
			<form>
				<label>Curriculum Title:</label>
				<input
					type='text'
					required
					value={curriculumtitle}
					onChange={(e) => setCurriculumtitle(e.target.value)}
				/>
				<label>Program Name:</label>
				<input type='text' required value={programname} onChange={(e) => setProgramname(e.target.value)} />
				<label>School Name:</label>
				<input type='text' required value={schoolname} onChange={(e) => setSchoolname(e.target.value)} />
			</form>
		</BaseModal>
	);
};

export default CreateCurriculumModal;
