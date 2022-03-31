import clsx from 'clsx';
import React from 'react';
import styles from '../styles/BaseModal.module.css';
import BaseButton from './BaseButton';

const BaseModal = ({
	show,
	title,
	children,
	onClose,
	hasCancelButton = false,
	hasActionButton = false,
	actionIsSubmit = false,
	onActionButtonClick,
	actionButtonText = 'Save',
	actionButtonColor = 'red',
}) => {
	return (
		<div className={clsx(styles.modal, show && styles.show)}>
			<div onClick={onClose} className={styles.overlay} />
			<div className={styles.modalContent}>
				<div className={styles.modalHeader}>
					<h4 className={styles.modalTitle}> {title} </h4>
				</div>

				<div className={styles.modalBody}>{children}</div>

				<div className={styles.modalFooter}>
					{hasCancelButton && <BaseButton label='Cancel' onClick={onClose} color='transparent' />}
					{hasActionButton && (
						<BaseButton
							label={actionButtonText}
							onClick={onActionButtonClick} //! NOTE: use only if actionIsSubmit is false
							type={actionIsSubmit ? 'submit' : 'button'}
							color={actionButtonColor}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default BaseModal;
