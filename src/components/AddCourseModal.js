import React, { useRef, useState } from 'react';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';
import BaseModal from './BaseModal';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import Course from '../classes/course';
import BaseDropdown from './BaseDropdown';

const AddCourseModal = ({ show, setShowAddCourseModal, addCourse }) => {
	const codeInputRef = useRef();
	const titleInputRef = useRef();
	const unitsInputRef = useRef();
	const gradeInputRef = useRef();
	const { currentUser } = useAuth();
	const { firestoreHelper } = useFirestore();

	const clearInputs = () => {
		codeInputRef.current.value = '';
		titleInputRef.current.value = '';
		unitsInputRef.current.value = '';
		gradeInputRef.current.value = '1.00';
	};

	const submitCourse = (e) => {
		e.preventDefault();
		const newCourse = new Course(
			codeInputRef.current.value,
			titleInputRef.current.value,
			unitsInputRef.current.value,
			'to_take',
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

export default AddCourseModal;
