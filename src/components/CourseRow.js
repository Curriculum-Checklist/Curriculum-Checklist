import React, { useState } from 'react';
import EditCourseModal from './EditCourseModal';
import styles from '../styles/CourseRow.module.css';
import clsx from 'clsx';

const themeColors = ['red', 'yellow', 'green', 'blue', 'orange'];

const CourseRow = ({ course, index, editMode }) => {
	const color = themeColors[index % themeColors.length];
	const [showEditCourseModal, setShowEditCourseModal] = useState(false);

	const editCourse = (courseTitle, courseCode, courseUnits, courseGrade) => {
		course.title = courseTitle;
		course.code = courseCode;
		course.units = courseUnits;
		course.grade = courseGrade;
	};

	const onClick = () => {
		if (editMode && !showEditCourseModal) {
			setShowEditCourseModal(true);
		}
	};

function changeStatus() {
	if (course.status === "Not Taken") {
		course.status = "Taking";
	} else if (course.status === "Taking"){
		course.status = "Taken";
	} else if (course.status === "Taken"){
		course.status = "Not Taken";
	}
}

	return (
		<div
			className={clsx(styles.container, editMode && !showEditCourseModal && [styles.clickable, 'unselectable'])}
			onClick={onClick}>
			<div className={styles.leftOuter}>
				<div className={styles.color} style={{ backgroundColor: `var(--${color}-theme)` }} />
				<div className={styles.leftInner}>
					<h5 className={styles.code}>{course.code}</h5>
					<p className={styles.title}>{course.title}</p>
				</div>
			</div>

			<button type="button" className={styles.middle}>
				<p className={styles.status}>{course.status}</p>
			</button>

			<EditCourseModal
				setShowEditCourseModal={setShowEditCourseModal}
				show={showEditCourseModal}
				editCourse={editCourse}
				courseTitle={course.title}
				courseCode={course.code}
				courseUnits={course.units}
				courseGrade={course.grade}
			/>

			<div className={styles.right}>
				<p className={styles.units}>{course.units}</p>
			</div>
		</div>
	);
};

export default CourseRow;
