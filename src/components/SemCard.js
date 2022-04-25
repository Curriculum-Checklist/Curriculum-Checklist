import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import addCircularImg from '../assets/add_circular.svg';
import pencilGreenImg from '../assets/pencil_green.svg';
import AddCourseModal from '../components/AddCourseModal';
import { DashboardContext } from '../pages/Dashboard';
import styles from '../styles/SemCard.module.css';
import CourseRow from './CourseRow';
import Divider from './Divider';

// import 'react-perfect-scrollbar/dist/css/styles.css';
// import PerfectScrollbar from 'react-perfect-scrollbar';

const SemCard = ({ sem }) => {
	const [showAddCourseModal, setShowAddCourseModal] = useState(false);
	const [courses, setCourses] = useState([...sem.courses]);
	const { editMode, setShowEditSemInfoModal, setSelectedSem } = useContext(DashboardContext);

	const addCourse = (course) => {
		sem.courses.push(course);
		setCourses([...courses, course]);
		setShowAddCourseModal(false);
	};

	const onEdit = () => {
		setSelectedSem(sem);
		setShowEditSemInfoModal(true);
	};

	useEffect(() => {
		setCourses([...sem.courses]);
	}, [sem]);

	return (
		<div className={styles.semCard}>
			<h2 className={styles.title}>
				{sem.title}
				{editMode && (
					<img className='pencilGreenImg' src={pencilGreenImg} alt='Edit Semester' onClick={onEdit} />
				)}
			</h2>
			<Divider horizontalMargin={0} />
			{courses.map((course, index) => (
				<CourseRow key={course.title} course={course} index={index} />
			))}

			{editMode && (
				<div
					className={clsx(styles.addCourseButton, 'unselectable')}
					onClick={() => setShowAddCourseModal(true)}>
					<img src={addCircularImg} alt='Add icon' width='24' height='24' />
					<div className={styles.addCourseText}>
						<h6>Add Course</h6>
					</div>
				</div>
			)}

			<AddCourseModal
				addCourse={addCourse}
				setShowAddCourseModal={setShowAddCourseModal}
				show={showAddCourseModal}
			/>
		</div>
	);
};

export default SemCard;
