import React, { useRef, useState } from 'react';
import Course from '../classes/course';
import BaseDropdown from './BaseDropdown';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';
import BaseSlidingBar from './BaseSlidingBar';

const AddCourseModal = ({ show, setShowAddCourseModal, addCourse }) => {
	const codeInputRef = useRef();
	const titleInputRef = useRef();
	const unitsInputRef = useRef();
	const statusInputRef = useRef();
	const gradeInputRef = useRef();
	const [requiredGrade, setRequiredGrade] = useState(true);

	const clearInputs = () => {
		codeInputRef.current.value = '';
		titleInputRef.current.value = '';
		unitsInputRef.current.value = '';
		statusInputRef.current.value = 'Not Taken';
		gradeInputRef.current.value = '1.00';
		setRequiredGrade(true);
	};

	const submitCourse = (e) => {
		e.preventDefault();
		const newCourse = new Course(
			codeInputRef.current.value,
			titleInputRef.current.value,
			unitsInputRef.current.value,
			statusInputRef.current.value,
			gradeInputRef.current.value,
			requiredGrade
		);
		addCourse(newCourse);
		closeModal();
	};

	const closeModal = (e) => {
		clearInputs();
		setShowAddCourseModal(false);
	};

	return (
		<BaseForm onSubmit={submitCourse}>
			<BaseModal
				show={show}
				title={'Course Creator'}
				hasCancelButton
				hasActionButton
				actionIsSubmit
				onClose={closeModal}>
				<BaseInput label='Code' required ref={codeInputRef} />
				<BaseInput label='Title' required ref={titleInputRef} />
				<BaseInput label='Units' type='number' required step='0.5' ref={unitsInputRef} />
				<BaseDropdown label='Status' options={['Not Taken', 'Taking', 'Taken']} ref={statusInputRef} />
				<BaseDropdown label='Course Grade' options={Course.gradeOptions} ref={gradeInputRef} value='N/A' />
				<BaseSlidingBar
					label='Included in Grade Computation'
					value={requiredGrade}
					setValue={setRequiredGrade}
				/>
			</BaseModal>
		</BaseForm>
	);
};

export default AddCourseModal;
