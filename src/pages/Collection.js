import React, { useState } from 'react';
import CreateCurriculumModal from '../components/CreateCurriculumModal';
import CurriculumMetaDataList from '../components/CurriculumMetaDataList';
import styles from '../styles/Collection.module.css';

export default function Collection() {
	const [showCreateCurriculumModal, setShowCreateCurriculumModal] = useState(false);
	return (
		<div className={styles.container}>
			<h1>Collection</h1>
			<CurriculumMetaDataList setShowCreateCurriculumModal={setShowCreateCurriculumModal} />
			<CreateCurriculumModal
				setShowCreateCurriculumModal={setShowCreateCurriculumModal}
				show={showCreateCurriculumModal}
			/>
		</div>
	);
}
