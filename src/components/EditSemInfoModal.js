import React, { useContext, useEffect, useRef } from 'react';
import { DashboardContext } from '../pages/Dashboard';
import BaseDropdown from './BaseDropdown';
import BaseForm from './BaseForm';
import BaseModal from './BaseModal';
import styles from '../styles/EditSemInfoModal.module.css';
import deleteImg from '../assets/delete_red.svg';

const EditSemInfoModal = ({ onSave }) => {
	const semInputRef = useRef();
	const yearInputRef = useRef();

	const {
		showEditSemInfoModal: show,
		setShowEditSemInfoModal: setShow,
		selectedSem: sem,
		setSems,
		editingCurriculum,
	} = useContext(DashboardContext);

	const submitSemTitle = (e) => {
		e.preventDefault();
		onSave(yearInputRef.current.value + 'Y-' + semInputRef.current.value + 'S');
		setShow(false);
	};

	const deleteSem = () => {
		setSems((sems) =>
			sems.filter(function (remainingSem) {
				return remainingSem !== sem;
			})
		);
		var i = editingCurriculum.semesters.indexOf(sem);
		editingCurriculum.semesters.splice(i, 1);
		setShow(false);
	};

	const onModalClose = (e) => {
		e.preventDefault();
		setShow(false);
	};

	useEffect(() => {
		if (sem) {
			semInputRef.current.value = sem.title.slice(3, 4);
			yearInputRef.current.value = sem.title.slice(0, 1);
		}
	}, [sem, show]);

	return (
		<BaseForm onSubmit={submitSemTitle}>
			<BaseModal
				show={show}
				title={'Edit Semester'}
				hasCancelButton
				hasActionButton
				actionIsSubmit
				upperRightComponent={
					<img className={styles.deleteButton} alt='Delete Button' onClick={deleteSem} src={deleteImg} />
				}
				onClose={onModalClose}>
				<BaseDropdown
					label='Year'
					options={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
					required
					ref={yearInputRef}
				/>
				<BaseDropdown label='Semester' options={['1', '2', 'M']} required ref={semInputRef} />
			</BaseModal>
		</BaseForm>
	);
};

export default EditSemInfoModal;
