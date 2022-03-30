import React from 'react';
import styles from '../styles/CourseRow.module.css';

const themeColors = ['red', 'yellow', 'green', 'blue', 'orange'];

const CourseRow = ({ course, index }) => {
	const color = themeColors[index % themeColors.length];

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
		<div className={styles.container}>
			<div className={styles.leftOuter}>
				<div className={styles.color} style={{ backgroundColor: `var(--${color}-theme)` }} />
				<div className={styles.leftInner}>
					<h5 className={styles.code}>{course.code}</h5>
					<p className={styles.title}>{course.title}</p>
				</div>
			</div>
			<button type="button" onClick={changeStatus} className={styles.middle}>
				<p className={styles.status}>{course.status}</p>
			</button>
			<div className={styles.right}>
				<p className={styles.units}>{course.units}</p>
			</div>
		</div>
	);
};

export default CourseRow;
