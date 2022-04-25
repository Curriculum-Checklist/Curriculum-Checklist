import clsx from 'clsx';
import React, { useState } from 'react';
import addCircularImg from '../assets/add_circular.svg';
import { useDatabase } from '../contexts/DatabaseContext';
import styles from '../styles/CurriculumMetaDataList.module.css';
import CurriculumMetaData from './CurriculumMetaData';
import DeleteCurriculumModal from './DeleteCurriculumModal';

const CurriculumMetaDataList = ({ setShowCreateCurriculumModal }) => {
	const { user } = useDatabase();
	const [selectedCurriculumId, setSelectedCurriculumId] = useState();
	const [showDeleteCurriculumModal, setShowDeleteCurriculumModal] = useState(false);
	return (
		<div className={styles.curriculaGrid}>
			{Object.entries(user.curricula).map(([curriculumId, curriculum]) => {
				const selected = curriculumId === user.selectedCurriculum;
				return (
					<CurriculumMetaData
						key={curriculumId}
						curriculumId={curriculumId}
						curriculum={curriculum}
						selected={selected}
						setShowDeleteCurriculumModal={setShowDeleteCurriculumModal}
						setSelectedCurriculumId={setSelectedCurriculumId}
					/>
				);
			})}
			<CreateCurriculumButton setShowCreateCurriculumModal={setShowCreateCurriculumModal} />
			<DeleteCurriculumModal
				setShowDeleteCurriculumModal={setShowDeleteCurriculumModal}
				show={showDeleteCurriculumModal}
				selectedCurriculumId={selectedCurriculumId}
				setSelectedCurriculumId={setSelectedCurriculumId}
			/>
		</div>
	);
};

function CreateCurriculumButton({ setShowCreateCurriculumModal }) {
	return (
		<div
			className={clsx(styles.createCurriculumButton, 'unselectable')}
			onClick={() => setShowCreateCurriculumModal(true)}>
			<img src={addCircularImg} alt='Add icon' />
			<h3>Create Curriculum</h3>
		</div>
	);
}

export default CurriculumMetaDataList;
