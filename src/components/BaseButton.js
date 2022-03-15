import clsx from 'clsx';
import React from 'react';
import styles from '../styles/BaseButton.module.css';

const BaseButton = ({ label, onClick, icon, color = 'red', type = 'button', tight = false }) => {
	return (
		<div>
			<button
				onClick={onClick}
				className={clsx(styles.baseButton, styles[color], tight && styles.tight)}
				type={type}>
				{icon && <img className={styles.icon} src={icon} alt='pencil' />}
				{label}
			</button>
		</div>
	);
};

export default BaseButton;
