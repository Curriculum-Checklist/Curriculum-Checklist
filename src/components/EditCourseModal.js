import React, { useContext, useEffect, useRef, useState } from 'react';
import { DashboardContext } from '../pages/Dashboard';
import BaseDropdown from './BaseDropdown';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';
import BaseSlidingBar from './BaseSlidingBar';

const EditCourseModal = ({ onSave }) => {
	const codeInputRef = useRef();
	const titleInputRef = useRef();
	const unitsInputRef = useRef();
	const statusInputRef = useRef();
	const gradeInputRef = useRef();
	const [requiredGrade, setRequiredGrade] = useState(true);

	const { showEditCourseModal: show, setShowEditCourseModal, selectedCourse: course } = useContext(DashboardContext);

	const submitCourse = (e) => {
		e.preventDefault();
		onSave(
			titleInputRef.current.value,
			codeInputRef.current.value,
			unitsInputRef.current.value,
			statusInputRef.current.value,
			gradeInputRef.current.value,
			requiredGrade
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
			statusInputRef.current.value = course.status;
			gradeInputRef.current.value = course.grade;
			setRequiredGrade(course.requiredGrade);
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
				<BaseInput label='Code' required ref={codeInputRef} />
				<BaseInput label='Title' required ref={titleInputRef} />
				<BaseInput label='Units' type='number' required ref={unitsInputRef} />
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
				<BaseSlidingBar
					label='Included in Grade Computation'
					value={requiredGrade}
					setValue={setRequiredGrade}
				/>
			</BaseModal>
		</BaseForm>
	);
};

export default EditCourseModal;
