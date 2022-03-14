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
			title={'Course Creator'}
			hasCancelButton
			hasActionButton
			onActionButtonClick={submitCourse}
			onClose={onModalClose}>
			<form>
				<label>Course Title:</label>
				<input
					type='text'
					required
					value={coursetitle}
					onChange={(e) => setCoursetitle(e.target.value)}
				/>
				<label>Course Code:</label>
				<input
					type='text'
					required
					value={coursecode}
					onChange={(e) => setCoursecode(e.target.value)}
				/>
				<label>Course Units:</label>
				<input
					type='number'
					required
					value={courseunits}
					onChange={(e) => setCourseunits(e.target.value)}
				/>
				<div style={{paddingTop: 8, display: 'flex', justifyContent:'space-between'}}>
					<label>Course Grade:</label>
					<select onChange={(e) => setCoursegrade(e.target.value)}>
						<option value="1.00">1.00</option>
						<option value="1.25">1.25</option>
						<option value="1.50">1.50</option>
						<option value="1.75">1.75</option>
						<option value="2.00">2.00</option>
						<option value="2.25">2.25</option>
						<option value="2.50">2.50</option>
						<option value="2.75">2.75</option>
						<option value="3.00">3.00</option>
						<option value="4.00">4.00</option>
						<option value="5.00">5.00</option>
						<option value="INC">INC</option>
						<option value="DRP">DRP</option>
					</select>
				</div>
			</form>
		</BaseModal>
	);
};

export default AddCourseModal;
