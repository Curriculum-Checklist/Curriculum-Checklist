import clsx from 'clsx';
import React from 'react';
import styles from '../styles/BaseButton.module.css';

export const BaseButton = ({ label, onClick, color, type = 'button' }) => {
	return (
		<div>
			<button onClick={onClick} className={clsx(styles.baseButton, styles[color])} type={type}>
				{label}
			</button>
		</div>
	);
};
