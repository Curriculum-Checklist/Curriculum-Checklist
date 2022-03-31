import clsx from 'clsx';
import React, { useContext } from 'react';
import { DashboardContext } from '../pages/Dashboard';
import styles from '../styles/CourseRow.module.css';

const themeColors = ['red', 'yellow', 'green', 'blue', 'orange'];

const CourseRow = ({ course, index }) => {
	const color = themeColors[index % themeColors.length];

	const { editMode, showEditCourseModal, setShowEditCourseModal, setSelectedCourse } = useContext(DashboardContext);

	const onClick = () => {
		if (editMode && !showEditCourseModal) {
			setSelectedCourse(course);
			setShowEditCourseModal(true);
		}
	};

	// function changeStatus() {
	// 	if (course.status === 'Not Taken') {
	// 		course.status = 'Taking';
	// 	} else if (course.status === 'Taking') {
	// 		course.status = 'Taken';
	// 	} else if (course.status === 'Taken') {
	// 		course.status = 'Not Taken';
	// 	}
	// }

	return (
		<div
			className={clsx(styles.container, editMode && !showEditCourseModal && [styles.clickable, 'unselectable'])}
			style={
				course.status === 'Taking'
					? {
							background: `linear-gradient(to right, var(--${color}-alpha-theme), transparent)`,
							opacity: 1,
					  }
					: course.status === 'Taken'
					? { background: 'none', opacity: 0.6 }
					: { background: 'none', opacity: 1 }
			}
			onClick={onClick}>
			<div className={styles.leftOuter}>
				<div className={styles.color} style={{ backgroundColor: `var(--${color}-theme)` }} />
				<div className={styles.leftInner}>
					<h5 className={styles.code}>{course.code}</h5>
					<p className={styles.title}>{course.title}</p>
				</div>
			</div>

			<div className={styles.right}>
				{editMode && (
					<button type='button' className={styles.middle}>
						<p className={styles.status}>{course.status}</p>
					</button>
				)}
				<p className={styles.units}>{course.units}</p>
			</div>
		</div>
	);
};

export default CourseRow;
