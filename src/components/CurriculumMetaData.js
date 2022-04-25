import React, { useState } from 'react';
import styles from '../styles/CurriculumMetaData.module.css';
import Divider from './Divider';
import clsx from 'clsx';
import BaseButton from './BaseButton';
import checkImg from '../assets/check.svg';
import shareImg from '../assets/share.svg';
import deleteImg from '../assets/delete.svg';
import { useDatabase } from '../contexts/DatabaseContext';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useFirestore } from '../contexts/FirestoreContext';
import { useNavigate } from 'react-router-dom';

const CurriculumMetaData = ({
	curriculumId,
	curriculum,
	selected = false,
	setShowDeleteCurriculumModal,
	setSelectedCurriculumId,
}) => {
	const { user, setUser } = useDatabase();
	const { firestoreHelper } = useFirestore();
	const [buttonStatus, setButtonStatus] = useState('default');
	const go_to = useNavigate();

	const date = new Date(curriculum.lastEdit);

	const parsedDate = date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}); // Oct 12, 2011

	// console.log(curriculum.lastEdit);
	// console.log(date);
	// console.log(parsedDate);

	const selectCurriculum = async () => {
		setButtonStatus('loading');
		const newUser = user.duplicate();
		newUser.selectedCurriculum = curriculumId;
		LocalStorageHelper.set('user', newUser);
		try {
			await firestoreHelper.setSelectedCurriculum(curriculumId);
		} catch (e) {
			console.log('Error updating selected curriculum online', e.message);
		}
		setUser(newUser);
		go_to('/');
	};

	const shareCurriculum = async () => {
		setButtonStatus('loading');
		if (curriculum.isShared) {
			console.log('Curriculum is already shared');
			setButtonStatus('default');
			return;
		}

		try {
			const sharedCurriculumId = await firestoreHelper.shareCurriculum(curriculumId, curriculum);
			const newUser = user.duplicate();
			const localCurriculum = newUser.curricula[curriculumId];
			localCurriculum.isShared = true;
			localCurriculum.code = sharedCurriculumId;
			LocalStorageHelper.set('user', newUser);
			setUser(newUser);
		} catch (e) {
			console.log('Failed to share curriculum online', e.message);
		}
		console.log('Shared curriculum online!');
		setButtonStatus('default');
	};

	const unShareCurriculum = async () => {
		setButtonStatus('loading');
		if (!curriculum.isShared) {
			console.log('Curriculum is already not shared');
			setButtonStatus('default');
			return;
		}

		try {
			await firestoreHelper.unShareCurriculum(curriculumId, curriculum.code);
			const newUser = user.duplicate();
			const localCurriculum = newUser.curricula[curriculumId];
			localCurriculum.isShared = false;
			localCurriculum.code = '';
			LocalStorageHelper.set('user', newUser);
			setUser(newUser);
		} catch (e) {
			console.log('Failed to unshare curriculum online', e.message);
		}
		console.log('Unshared curriculum online!');
		setButtonStatus('default');
	};

	const deleteCurriculum = () => {
		setShowDeleteCurriculumModal(true);
		setSelectedCurriculumId(curriculumId);
	};

	return (
		<div key={curriculumId} className={clsx(styles.container, selected && styles.selected)}>
			<h2>{curriculum.programName}</h2>
			<h3>{curriculum.schoolName}</h3>
			<Divider horizontalMargin={0} verticalMargin={8} />
			<div className={styles.innerContent}>
				<h4>Last Update: {parsedDate}</h4>
			</div>
			<div className={styles.bottom}>
				<h4>{curriculum.author}</h4>
			</div>
			{selected && (
				<div className={styles.containerTopLabel}>
					<h5>Currently in use</h5>
				</div>
			)}
			{curriculum.isShared && (
				<div className={styles.containerBottomLabel}>
					<h4>
						Code: <span className={styles.code}>{curriculum.code}</span>
					</h4>
				</div>
			)}
			<div className={styles.overlay}>
				<BaseButton
					label='Select'
					color='green'
					icon={checkImg}
					onClick={selectCurriculum}
					small
					disabled={buttonStatus === 'loading'}
				/>
				{curriculum.isShared ? (
					<BaseButton
						label='Unshare'
						color='black-ocean-blue'
						icon={shareImg}
						onClick={unShareCurriculum}
						small
						disabled={buttonStatus === 'loading'}
					/>
				) : (
					<BaseButton
						label='Share'
						color='ocean-blue'
						icon={shareImg}
						onClick={shareCurriculum}
						small
						disabled={buttonStatus === 'loading'}
					/>
				)}
				<BaseButton
					label='Delete'
					color='black-red'
					icon={deleteImg}
					onClick={deleteCurriculum}
					small
					disabled={buttonStatus === 'loading'}
				/>
			</div>
		</div>
	);
};

export default CurriculumMetaData;
