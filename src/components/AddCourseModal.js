import React, { useState } from 'react';
import Course from '../classes/curriculum';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';
import BaseModal from './BaseModal';

const AddCourseModal = ({ show, setShowAddCourseModal }) => {
	const [coursecode, setCoursecode] = useState('');
	const [coursetitle, setCoursetitle] = useState('');
	const [courseunits, setCourseunits] = useState('');
    const [coursegrade, setCoursegrade] = useState('');
	const { currentUser } = useAuth();
	const { firestoreHelper } = useFirestore();

	const submitCourse = (e) => {
		e.preventDefault();
		const newCourse = new Course(coursecode, coursetitle, courseunits, coursegrade , []);
		firestoreHelper.setCourse(currentUser.uid, newCourse);
		LocalStorageHelper.set('course', newCourse);
		setShowAddCourseModal(false);
	};

	const onModalClose = (e) => {
		setShowAddCourseModal(false);
	};

	return (
		<BaseModal
			show={show}
			title={'Add Course'}
			hasCancelButton
			hasActionButton
			onActionButtonClick={submitCourse}
			onClose={onModalClose}>
            // need modify para sa course forms: code, name, units, grade
			{/* <form>
				<label>Curriculum Title:</label>
				<input
					type='text'
					required
					value={curriculumtitle}
					onChange={(e) => setCurriculumtitle(e.target.value)}
				/>
				<label>Program Name:</label>
				<input type='text' required value={programname} onChange={(e) => setProgramname(e.target.value)} />
				<label>School Name:</label>
				<input type='text' required value={schoolname} onChange={(e) => setSchoolname(e.target.value)} />
			</form> */}
            //
		</BaseModal>
	);
};

export default AddCourseModal;
