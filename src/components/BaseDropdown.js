import React, { forwardRef } from 'react';
import styles from '../styles/BaseDropdown.module.css';

const BaseDropdown = forwardRef(({ label, value, options }, ref) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>{label}</label>
			<select className={styles.select} ref={ref} defaultValue={value}>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
});

export default BaseDropdown;
