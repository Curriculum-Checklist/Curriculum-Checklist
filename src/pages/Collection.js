import clsx from 'clsx';
import React, { useState } from 'react';
import addCircularImg from '../assets/add_circular.svg';
import CreateCurriculumModal from '../components/CreateCurriculumModal';
import styles from '../styles/Collection.module.css';

export default function Collection() {
	const [showCreateCurriculumModal, setShowCreateCurriculumModal] = useState(false);

	return (
		<div className={styles.container}>
			<h1>Collection</h1>
			<div
				className={clsx(styles.createCurriculumButton, 'unselectable')}
				onClick={() => setShowCreateCurriculumModal(true)}>
				<img src={addCircularImg} alt='Add icon' />
				<h3>Create Curriculum</h3>
			</div>
			<CreateCurriculumModal
				setShowCreateCurriculumModal={setShowCreateCurriculumModal}
				show={showCreateCurriculumModal}
			/>
		</div>
	);
}
