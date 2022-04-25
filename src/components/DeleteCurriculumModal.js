import React from 'react';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useDatabase } from '../contexts/DatabaseContext';
import { useFirestore } from '../contexts/FirestoreContext';
import BaseForm from './BaseForm';
import BaseModal from './BaseModal';
import styles from '../styles/DeleteCurriculumModal.module.css';

const DeleteCurriculumModal = ({
	show,
	setShowDeleteCurriculumModal,
	selectedCurriculumId,
	setSelectedCurriculumId,
}) => {
	const { user, setUser } = useDatabase();
	const { firestoreHelper } = useFirestore();
	const curriculum = user.curricula[selectedCurriculumId];

	const deleteCurriculum = async (e) => {
		e.preventDefault();
		const newUser = user.duplicate();
		delete newUser.curricula[selectedCurriculumId];

		if (newUser.selectedCurriculum === selectedCurriculumId) {
			newUser.selectedCurriculum = '';
			try {
				await firestoreHelper.setSelectedCurriculum('');
			} catch (e) {
				console.log('Error updating selected curriculum: ', e.message);
			}
		}

		LocalStorageHelper.set('user', newUser);

		try {
			await firestoreHelper.deleteCurriculum(selectedCurriculumId, curriculum);
		} catch (e) {
			console.log('Failed to delete curriculum: ', e.message);
		}
		setShowDeleteCurriculumModal(false);
		setUser(newUser);
	};

	const onModalClose = (e) => {
		e.preventDefault();
		// curriculumTitleInputRef.current.value = '';
		setSelectedCurriculumId('');
		setShowDeleteCurriculumModal(false);
	};

	return (
		<BaseForm onSubmit={deleteCurriculum}>
			<BaseModal
				show={show}
				title={'Delete Curriculum'}
				hasCancelButton
				hasActionButton
				actionIsSubmit
				onClose={onModalClose}>
				<p className={styles.description}>
					Are you sure you want to delete{' '}
					<span className={styles.descriptionHighlight}>
						{curriculum?.programName} - {curriculum?.schoolName}
					</span>{' '}
					?
				</p>
			</BaseModal>
		</BaseForm>
	);
};

export default DeleteCurriculumModal;
