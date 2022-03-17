import React, { useState } from 'react';
import AddCourseModal from '../components/AddCourseModal';
import styles from '../styles/SemCard.module.css';
import addCircularImg from '../assets/add_circular.svg';
import clsx from 'clsx';
import Divider from './Divider';
import CourseRow from './CourseRow';

// import 'react-perfect-scrollbar/dist/css/styles.css';
// import PerfectScrollbar from 'react-perfect-scrollbar';

const SemCard = ({ sem }) => {
	const [showAddCourseModal, setShowAddCourseModal] = useState(false);
	const [courses, setCourses] = useState([...sem.courses]);

	const addCourse = (course) => {
		sem.courses.push(course);
		setCourses([...courses, course]);
		setShowAddCourseModal(false);
	};

	return (
		<div className={styles.semCard}>
			<h2 className={styles.title}>{sem.title}</h2>
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
		</div>
	);
};

export default SemCard;
