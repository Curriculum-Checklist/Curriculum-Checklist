import clsx from 'clsx';
import React from 'react';
import styles from '../styles/BaseButton.module.css';

const alignToFlexJustifyMapping = { left: 'flex-start', center: 'center', right: 'flex-end' };

const BaseButton = ({
	label,
	onClick,
	icon,
	color = 'red',
	type = 'button',
	tight = false,
	align = 'left',
	small = false,
	disabled = false,
}) => {
	return (
		<div className={styles.container} style={{ justifyContent: alignToFlexJustifyMapping[align] }}>
			<button
				onClick={onClick}
				disabled={disabled}
				className={clsx(
					styles.baseButton,
					styles[color],
					tight && styles.tightContainer,
					small && styles.smallContainer,
					disabled && styles.disabled
				)}
				type={type}>
				{icon && <img className={clsx(styles.icon, small && styles.smallIcon)} src={icon} alt='pencil' />}
				{label}
			</button>
		</div>
	);
};

export default BaseButton;
