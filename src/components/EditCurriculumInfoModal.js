import React, { useEffect, useRef } from 'react';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';

const EditCurriculumInfoModal = ({ show, setShow, onSave, initialProgramName, initialSchoolName }) => {
	const programNameInputRef = useRef();
	const schoolNameInputRef = useRef();

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
		if (programNameInputRef) programNameInputRef.current.value = initialProgramName;
		if (schoolNameInputRef) schoolNameInputRef.current.value = initialSchoolName;
	}, [initialProgramName, initialSchoolName, show]);

	return (
		<BaseForm onSubmit={submitCurriculum}>
			<BaseModal
				show={show}
				title={'Edit Curriculum Info'}
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

export default EditCurriculumInfoModal;
