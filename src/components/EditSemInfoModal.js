import React, { useEffect, useRef } from 'react';
import BaseDropdown from './BaseDropdown';
import BaseForm from './BaseForm';
import BaseModal from './BaseModal';

const EditSemInfoModal = ({ show, setShow, onSave, semInfo }) => {
	const semInputRef = useRef();
	const yearInputRef = useRef();

	const submitSemTitle = (e) => {
		e.preventDefault();
		onSave(yearInputRef.current.value + 'Y-' + semInputRef.current.value + 'S');
		setShow(false);
	};

	const onModalClose = (e) => {
		e.preventDefault();
		setShow(false);
	};

	useEffect(() => {
		if (semInfo) {
			semInputRef.current.value = semInfo.slice(3, 4);
			yearInputRef.current.value = semInfo.slice(0, 1);
		}
	}, [semInfo, show]);

	return (
		<BaseForm onSubmit={submitSemTitle}>
			<BaseModal
				show={show}
				title={'Edit Semester'}
				hasCancelButton
				hasActionButton
				actionIsSubmit
				onClose={onModalClose}>
				{/* <BaseInput label='Curriculum Title' required ref={curriculumTitleInputRef} /> */}
				<BaseDropdown
					label='Year'
					options={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
					required
					ref={yearInputRef}
				/>
				<BaseDropdown label='Semester' options={['1', '2', 'M']} required ref={semInputRef} />
			</BaseModal>
		</BaseForm>
	);
};

export default EditSemInfoModal;
