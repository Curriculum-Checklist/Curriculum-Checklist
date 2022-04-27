import React, { forwardRef } from 'react';
import styles from '../styles/BaseInput.module.css';

const BaseInput = forwardRef(({ label, value, required = false, type = 'text', step='1' }, ref) => {
	return (
		<>
			<label className={styles.label}>{label}</label>
			<input className={styles.input} type={type} required={required} value={value} ref={ref} step={step} />
		</>
	);
});

export default BaseInput;
