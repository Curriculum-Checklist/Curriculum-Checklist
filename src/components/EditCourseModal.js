import React, { useEffect, useRef } from 'react';
import BaseDropdown from './BaseDropdown';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';

const EditCourseModal = ({
	show,
	setShowEditCourseModal,
	editCourse,
	courseTitle,
	courseCode,
	courseUnits,
	courseGrade,
}) => {
	const codeInputRef = useRef();
	const titleInputRef = useRef();
	const unitsInputRef = useRef();
	const gradeInputRef = useRef();

	const clearInputs = () => {
		codeInputRef.current.value = courseCode;
		titleInputRef.current.value = courseTitle;
		unitsInputRef.current.value = courseUnits;
		gradeInputRef.current.value = courseGrade;
	};

	const submitCourse = (e) => {
		e.preventDefault();
		editCourse(
			titleInputRef.current.value,
			codeInputRef.current.value,
			unitsInputRef.current.value,
			gradeInputRef.current.value
		);
		closeModal();
	};

	const closeModal = (e) => {
		clearInputs();
		setShowEditCourseModal(false);
	};

	useEffect(() => {
		if (courseCode) codeInputRef.current.value = courseCode;
		if (courseTitle) titleInputRef.current.value = courseTitle;
		if (courseUnits) unitsInputRef.current.value = courseUnits;
		if (courseGrade) gradeInputRef.current.value = courseGrade;
	}, [courseCode, courseTitle, courseUnits, courseGrade, show]);

	return (
		<BaseForm onSubmit={submitCourse}>
			<BaseModal
				show={show}
				title={'Edit Course'}
				hasCancelButton
				hasActionButton
				actionIsSubmit
				onClose={closeModal}>
				<BaseInput label='Title' required ref={titleInputRef} />
				<BaseInput label='Code' required ref={codeInputRef} />
				<BaseInput label='Units' type='number' required ref={unitsInputRef} />
				<BaseDropdown
					label='Course Grade'
					options={[
						'1.00',
						'1.25',
						'1.50',
						'1.75',
						'2.00',
						'2.25',
						'2.50',
						'2.75',
						'3.00',
						'4.00',
						'5.00',
						'INC',
						'DRP',
					]}
					ref={gradeInputRef}
				/>
			</BaseModal>
		</BaseForm>
	);
};

export default EditCourseModal;
