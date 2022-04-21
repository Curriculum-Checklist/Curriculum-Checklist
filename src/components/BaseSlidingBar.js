import clsx from 'clsx';
import React from 'react';
import styles from '../styles/BaseSlidingBar.module.css';

const BaseSlidingBar = ({ label, value, setValue }) => {
	const toggleValue = () => {
		setValue(!value);
	};

	return (
		<div className={styles.container}>
			<label className={styles.label}>{label}</label>
			<div
				className={clsx(styles.slidingBar, value ? styles.onSlidingBar : styles.offSlidingBar)}
				onClick={toggleValue}>
				<div className={styles.innerCircle} />
			</div>
		</div>
	);
};

export default BaseSlidingBar;
