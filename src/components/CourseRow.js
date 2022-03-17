import clsx from 'clsx';
import React from 'react';
import styles from '../styles/CourseRow.module.css';

const themeColors = ['red', 'yellow', 'green', 'blue', 'orange'];

const CourseRow = ({ course, index }) => {
	const color = themeColors[index % themeColors.length];

	return (
		<div className={styles.container}>
			<div className={styles.leftOuter}>
				<div className={styles.color} style={{ backgroundColor: `var(--${color}-theme)` }} />
				<div className={styles.leftInner}>
					<h5 className={styles.code}>{course.code}</h5>
					<p className={styles.title}>{course.title}</p>
				</div>
			</div>
			<div className={styles.right}>
				<p className={styles.units}>{course.units}</p>
			</div>
		</div>
	);
};

export default CourseRow;
