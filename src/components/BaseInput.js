import React, { forwardRef } from 'react';
import styles from '../styles/BaseInput.module.css';

const BaseInput = forwardRef(({ label, value, required = false, type = 'text', needFloat = false }, ref) => {
	return (
		<>
			<label className={styles.label}>{label}</label>
			<input className={styles.input} type={type} required={required} value={value} ref={ref} step = {needFloat ? '0.5' : '1'} />
		</>
	);
});

export default BaseInput;
