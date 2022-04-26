import React, { useContext, useEffect, useRef } from 'react';
import { DashboardContext } from '../pages/Dashboard';
import BaseForm from './BaseForm';
import BaseInput from './BaseInput';
import BaseModal from './BaseModal';

const EditRequiredGWAModal = ({ onSave }) => {
	const summaGWAInputRef = useRef();
	const magnaGWAInputRef = useRef();
	const laudeGWAInputRef = useRef();

	const { showEditRequiredGWAModal: show, 
		setShowEditRequiredGWAModal,
		summaGWA,
		magnaGWA,
		laudeGWA
	} = useContext(DashboardContext);

	const submitGWA = (e) => {
		e.preventDefault();
		onSave(
			summaGWAInputRef.current.value,
			magnaGWAInputRef.current.value,
			laudeGWAInputRef.current.value,
		);
		closeModal();
	};

	const closeModal = () => {
		setShowEditRequiredGWAModal(false);
	};

	useEffect(() => {
		if (summaGWA) summaGWAInputRef.current.value = summaGWA
		if (magnaGWA) magnaGWAInputRef.current.value = magnaGWA
		if (laudeGWA) laudeGWAInputRef.current.value = laudeGWA
	});

	return (
		<BaseForm onSubmit={submitGWA}>
			<BaseModal
				show={show}
				title={'Edit required GWAs'}
				hasCancelButton
				hasActionButton
				actionIsSubmit
				onClose={closeModal}>
				<BaseInput label='Summa Cum Laude Standing' type='number' step = '0.01' required ref={summaGWAInputRef} />
				<BaseInput label='Magna Cum Laude Standing' type='number' step = '0.01' required ref={magnaGWAInputRef} />
				<BaseInput label='Cum Laude Standing' type='number' step = '0.01' required  ref={laudeGWAInputRef} />
			</BaseModal>
		</BaseForm>
	);
};

export default EditRequiredGWAModal;
