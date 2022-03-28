import React, { useState } from 'react';
import AddCourseModal from '../components/AddCourseModal';
import styles from '../styles/SemCard.module.css';
import addCircularImg from '../assets/add_circular.svg';
import pencilWhiteImg from '../assets/pencil_white.svg';
import clsx from 'clsx';
import Divider from './Divider';
import CourseRow from './CourseRow';
import EditSemInfoModal from '../components/EditSemInfoModal';

// import 'react-perfect-scrollbar/dist/css/styles.css';
// import PerfectScrollbar from 'react-perfect-scrollbar';

const SemCard = ({ sem, editMode }) => {
	const [showAddCourseModal, setShowAddCourseModal] = useState(false);
	const [showEditSemInfoModal, setShowEditSemInfoModal] = useState(false);
	const [courses, setCourses] = useState([...sem.courses]);

	const addCourse = (course) => {
		sem.courses.push(course);
		setCourses([...courses, course]);
		setShowAddCourseModal(false);
	};
	function updateSemInfo(newSemTitle) {
		sem.title = newSemTitle;
	}

	return (
		<div className={styles.semCard}>
			<h2 className={styles.title}>
				{sem.title}
				{editMode && <img
					className={styles.pencilWhiteImg}
					src={pencilWhiteImg}
					alt='Edit Semester'
					onClick={() => setShowEditSemInfoModal(true)}
				/>}
			</h2>
			<Divider margin={0} />
			{courses.map((course, index) => (
				<CourseRow key={course.title} course={course} index={index} />
			))}

			<div
				className={clsx(styles.addCourseButton, 'unselectable')}
				// style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
				onClick={() => setShowAddCourseModal(true)}>
				<img src={addCircularImg} alt='Add icon' width='24' height='24' />
				<div className={styles.addCourseText}>
					<h6>Add Course</h6>
				</div>
			</div>

			<AddCourseModal
				addCourse={addCourse}
				setShowAddCourseModal={setShowAddCourseModal}
				show={showAddCourseModal}
			/>
			<EditSemInfoModal
				show={showEditSemInfoModal}
				setShow={setShowEditSemInfoModal}
				onSave={updateSemInfo}
				semInfo={sem.title}
			/>
		</div>
	);
};

export default SemCard;
