import React, { useContext, useEffect, useRef } from 'react';
import { DashboardContext } from '../pages/Dashboard';
import BaseDropdown from './BaseDropdown';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';

const EditCourseModal = ({ onSave }) => {
	const codeInputRef = useRef();
	const titleInputRef = useRef();
	const unitsInputRef = useRef();
	const gradeInputRef = useRef();
	const statusInputRef = useRef();

	const { showEditCourseModal: show, setShowEditCourseModal, selectedCourse: course } = useContext(DashboardContext);

	const submitCourse = (e) => {
		e.preventDefault();
		onSave(
			titleInputRef.current.value,
			codeInputRef.current.value,
			unitsInputRef.current.value,
			gradeInputRef.current.value,
			statusInputRef.current.value
		);
		closeModal();
	};

	const closeModal = () => {
		setShowEditCourseModal(false);
	};

	useEffect(() => {
		if (course) {
			codeInputRef.current.value = course.code;
			titleInputRef.current.value = course.title;
			unitsInputRef.current.value = course.units;
			gradeInputRef.current.value = course.grade;
			statusInputRef.current.value = course.status;
		}
	}, [course, show]);

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

export default EditCourseModal;
