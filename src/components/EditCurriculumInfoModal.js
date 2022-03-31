import React, { useContext, useEffect, useRef } from 'react';
import { DashboardContext } from '../pages/Dashboard';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';

const EditCurriculumInfoModal = ({ onSave }) => {
	const programNameInputRef = useRef();
	const schoolNameInputRef = useRef();

	const {
		showEditCurriculumInfoModal: show,
		setShowEditCurriculumInfoModal: setShow,
		programName,
		schoolName,
	} = useContext(DashboardContext);

	const submitCurriculum = (e) => {
		e.preventDefault();
		onSave(programNameInputRef.current.value, schoolNameInputRef.current.value);
		setShow(false);
	};

	const onModalClose = (e) => {
		e.preventDefault();
		setShow(false);
	};

	useEffect(() => {
		if (programName) programNameInputRef.current.value = programName;
		if (schoolName) schoolNameInputRef.current.value = schoolName;
	}, [programName, schoolName, show]);

	return (
		<BaseForm onSubmit={submitCurriculum}>
			<BaseModal
				show={show}
				title={'Edit Curriculum Info'}
				hasCancelButton
				hasActionButton
				actionIsSubmit
				onClose={onModalClose}>
				<BaseInput label='Program Name' required ref={programNameInputRef} />
				<BaseInput label='School Name' required ref={schoolNameInputRef} />
			</BaseModal>
		</BaseForm>
	);
};

export default EditCurriculumInfoModal;
