import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Course from '../classes/course';
import { DashboardContext } from '../pages/Dashboard';
import BaseDropdown from './BaseDropdown';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';
import BaseSlidingBar from './BaseSlidingBar';
import styles from '../styles/CourseRow.module.css';

const EditCourseModal = ({ onSave, index }) => {
	const codeInputRef = useRef();
	const titleInputRef = useRef();
	const unitsInputRef = useRef();
	const statusInputRef = useRef();
	const gradeInputRef = useRef();
	const [requiredGrade, setRequiredGrade] = useState(true);

	const { showEditCourseModal: show, setShowEditCourseModal, selectedCourse: selected_course, selectedSem: sem, setSems} = useContext(DashboardContext);

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

	const deleteCourse = () => {
		console.log("HI");
		console.log(sem);
		console.log(selected_course)

		var course_list = [];

		for (let i = 0; i < sem.courses.length; i++){
			if (sem.courses[i] === selected_course){
				course_list = sem.courses ;
				course_list.splice(i,1);
				sem.courses = course_list;
			}
		}
		setSems((sems)=>sems.map((sem) => sem.duplicate()));
	}

	const closeModal = () => {
		setShowEditCourseModal(false);
	};

	useEffect(() => {
		if (selected_course) {
			codeInputRef.current.value = selected_course.code;
			titleInputRef.current.value = selected_course.title;
			unitsInputRef.current.value = selected_course.units;
			statusInputRef.current.value = selected_course.status;
			gradeInputRef.current.value = selected_course.grade;
			setRequiredGrade(selected_course.requiredGrade);
		}
	}, [selected_course, show]);

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
				<BaseInput label='Units' type='number' required step='0.5' ref={unitsInputRef} />
				<BaseDropdown label='Status' options={['Not Taken', 'Taking', 'Taken']} ref={statusInputRef} />
				<BaseDropdown label='Course Grade' options={Course.gradeOptions} ref={gradeInputRef} />
				<BaseSlidingBar
					label='Included in Grade Computation'
					value={requiredGrade}
					setValue={setRequiredGrade}
				/>
				<Button className={styles.deleteCourse} onClick={deleteCourse}>Delete Course</Button>
			</BaseModal>
		</BaseForm>
	);
};

export default EditCourseModal;
