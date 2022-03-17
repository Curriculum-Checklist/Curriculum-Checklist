import React, { forwardRef } from 'react';
import styles from '../styles/BaseDropdown.module.css';

const BaseDropdown = forwardRef(({ label, value, options }, ref) => {
	return (
		<div style={{ paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
			<label className={styles.label}>{label}</label>
			<select className={styles.select} ref={ref} value={value}>
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
