import clsx from 'clsx';
import React from 'react';
import styles from '../styles/BaseModal.module.css';

const BaseModal = ({
	show,
	title,
	children,
	onClose,
	hasCancelButton = false,
	hasActionButton = false,
	onActionButtonClick,
	actionButtonText = 'Save',
	actionButtonColor = 'var(--red)',
}) => {
	return (
		<div onClick={onClose} className={clsx(styles.modal, show && styles.show)}>
			<div onClick={(e) => e.stopPropagation()} className={styles.modalContent}>
				<div className={styles.modalHeader}>
					<h4 className={styles.modalTitle}> {title} </h4>
				</div>

				<div className={styles.modalBody}>{children}</div>

				<div className={styles.modalFooter}>
					{hasCancelButton && (
						<button onClick={onClose} className={styles.cancelButton}>
							Cancel
						</button>
					)}
					{hasActionButton && (
						<button
							onClick={onActionButtonClick}
							className={styles.submitButton}
							style={{ backgroundColor: actionButtonColor }}>
							{actionButtonText}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default BaseModal;
