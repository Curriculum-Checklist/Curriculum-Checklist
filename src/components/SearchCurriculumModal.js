import React, { useRef } from 'react';
import Curriculum from '../classes/curriculum';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useDatabase } from '../contexts/DatabaseContext';
import { useFirestore } from '../contexts/FirestoreContext';
import notify from '../function/notify';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';

const SearchCurriculumModal = ({ show, setShowSearchCurriculumModal }) => {
	const codeInputRef = useRef();
	const { firestoreHelper } = useFirestore();
	const { user, setUser } = useDatabase();

	const searchCurriculum = async (e) => {
		e.preventDefault();
		const code = codeInputRef.current.value;
		if (!code) return;

		try {
			const newCurriculumData = await firestoreHelper.getCurriculumByCode(code);
			if (!newCurriculumData) {
				notify('Curriculum not found');
				return;
			}

			const newCurriculum = Curriculum.fromFirestoreSharedCurriculumData(newCurriculumData);
			const curriculumId = await firestoreHelper.addCurriculum(newCurriculum);
			await firestoreHelper.setSelectedCurriculum(curriculumId);

			const newUser = user.duplicate();
			newUser.curricula[curriculumId] = newCurriculum;
			newUser.selectedCurriculum = curriculumId;
			LocalStorageHelper.set('user', newUser);
			setUser(newUser);
			setShowSearchCurriculumModal(false);
		} catch (e) {
			console.log('Failed to search curriculum', e.message);
			notify('Failed to search curriculum');
			return;
		}
	};

	const onModalClose = (e) => {
		e.preventDefault();
		codeInputRef.current.value = '';
		setShowSearchCurriculumModal(false);
	};

	return (
		<BaseForm onSubmit={searchCurriculum}>
			<BaseModal
				show={show}
				title={'Search Curriculum'}
				hasCancelButton
				hasActionButton
				actionIsSubmit
				actionButtonText={'Search'}
				onClose={onModalClose}>
				{/* <BaseInput label='Curriculum Title' required ref={curriculumTitleInputRef} /> */}
				<BaseInput label='Curriculum Code' required ref={codeInputRef} />
			</BaseModal>
		</BaseForm>
	);
};

export default SearchCurriculumModal;
