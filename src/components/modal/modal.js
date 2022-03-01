import styles from './modal.module.css';
import React, { useState } from 'react';
import clsx from 'clsx';

const Modal = (props) => {
	const [curriculumtitle, setCurriculumtitle] = useState('');
	const [programname, setProgramname] = useState('');
	const [schoolname, setSchoolname] = useState('');

	return (
		<div onClick={props.onClose} className={clsx('what', styles.modal, props.show && styles.show)}>
			<div onClick={(e) => e.stopPropagation()} className={styles.modalContent}>
				<div className={styles.modalHeader}>
					<h4 className={styles.modalTitle}> {props.title} </h4>
				</div>

				<div className={styles.modalBody}>
					{props.children}
					<form>
						<label>Curriculum Title:</label>
						<input
							type='text'
							required
							value={curriculumtitle}
							onChange={(e) => setCurriculumtitle(e.target.value)}
						/>
						<label>Program Name:</label>
						<input
							type='text'
							required
							value={programname}
							onChange={(e) => setProgramname(e.target.value)}
						/>
						<label>School Name:</label>
						<input
							type='text'
							required
							value={schoolname}
							onChange={(e) => setSchoolname(e.target.value)}
						/>
					</form>
				</div>
				<div className={styles.modalFooter}>
					<button className={styles.submitButton}>Submit</button>
					<button onClick={props.onClose} className={styles.cancelButton}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;