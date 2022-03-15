import React, { forwardRef } from 'react';
import styles from '../styles/BaseInput.module.css';

const BaseInput = forwardRef(({ label, value, required = false, type = 'text' }, ref) => {
	return (
		<>
			<label className={styles.label}>{label}</label>
			<input className={styles.input} type={type} required={required} value={value} ref={ref} />
		</>
	);
});

export default BaseInput;
