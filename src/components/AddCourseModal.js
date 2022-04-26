import React, { useRef } from 'react';
import Course from '../classes/course';
import BaseDropdown from './BaseDropdown';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';

const AddCourseModal = ({ show, setShowAddCourseModal, addCourse }) => {
	const codeInputRef = useRef();
	const titleInputRef = useRef();
	const unitsInputRef = useRef();
	const gradeInputRef = useRef();
	const statusInputRef = useRef();

	const clearInputs = () => {
		codeInputRef.current.value = '';
		titleInputRef.current.value = '';
		unitsInputRef.current.value = '';
		statusInputRef.current.value = 'Not Taken';
		gradeInputRef.current.value = '1.00';
	};

	const submitCourse = (e) => {
		e.preventDefault();
		const newCourse = new Course(
			codeInputRef.current.value,
			titleInputRef.current.value,
			unitsInputRef.current.value,
			statusInputRef.current.value,
			gradeInputRef.current.value
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
				<BaseInput label='Title' required ref={titleInputRef} />
				<BaseInput label='Code' required ref={codeInputRef} />
				<BaseInput label='Units' type='number' required needFloat ref={unitsInputRef} />
				<BaseDropdown label='Status' options={['Not Taken', 'Taking', 'Taken']} ref={statusInputRef} />
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
						'N/A',
					]}
					ref={gradeInputRef}
				/>
			</BaseModal>
		</BaseForm>
	);
};

export default AddCourseModal;
