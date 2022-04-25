import React, { useState } from 'react';
import CreateCurriculumModal from '../components/CreateCurriculumModal';
import CurriculumMetaDataList from '../components/CurriculumMetaDataList';
import SearchCurriculumModal from '../components/SearchCurriculumModal';
import styles from '../styles/Collection.module.css';

export default function Collection() {
	const [showCreateCurriculumModal, setShowCreateCurriculumModal] = useState(false);
	const [showSearchCurriculumModal, setShowSearchCurriculumModal] = useState(false);
	return (
		<div className={styles.container}>
			<h1>Collection</h1>
			<CurriculumMetaDataList
				setShowCreateCurriculumModal={setShowCreateCurriculumModal}
				setShowSearchCurriculumModal={setShowSearchCurriculumModal}
			/>
			<CreateCurriculumModal
				setShowCreateCurriculumModal={setShowCreateCurriculumModal}
				show={showCreateCurriculumModal}
			/>
			<SearchCurriculumModal
				setShowSearchCurriculumModal={setShowSearchCurriculumModal}
				show={showSearchCurriculumModal}
			/>
		</div>
	);
}
