import clsx from 'clsx';
import React, { useState } from 'react';
import addCircularImg from '../assets/add_circular.svg';
import GetCurriculumBanner from '../components/GetCurriculumBanner';
import SemCard from '../components/SemCard';
import { useDatabase } from '../contexts/DatabaseContext';
import styles from '../styles/Dashboard.module.css';
import BaseButton from '../components/BaseButton';
import pencilImg from '../assets/pencil.svg';

export default function Dashboard() {
	const { curriculum } = useDatabase();
	const [editMode, setEditMode] = useState(false);
	const [sems, setSems] = useState(curriculum?.semesters ?? []); //List of sems for teting only

	//Need to actually add sem in database
	const addSem = () => {
		const newList = sems.concat({});
		setSems(newList);
	};

	function discardChanges() {
		setSems(curriculum?.semesters ?? []);
		setEditMode(false);
	}
	function saveChanges() {}

	//TODO - use dropdown to notify user on failed logout
	if (!curriculum) {
		return <div className={styles.container}>{!curriculum && <GetCurriculumBanner />}</div>;
	}

	return (
		<div className={styles.container}>
			<h1>{curriculum.programName}</h1>
			<h5>{curriculum.schoolName}</h5>
			{editMode ? (
				<div className={styles.saveDiscardButtonsWrapper}>
					<BaseButton label='Discard' color='transparent-ocean-blue' onClick={discardChanges} />
					<BaseButton label='Save' color='red' onClick={saveChanges} />
				</div>
			) : (
				<BaseButton label='Edit' color='green' icon={pencilImg} tight onClick={() => setEditMode(true)} />
			)}
			{editMode && (
				<div className={styles.grid}>
					{sems.map((sem, i) => (
						<SemCard key={i} />
					))}
					<div className={clsx(styles.addSemCard, 'unselectable')} onClick={addSem}>
						<img src={addCircularImg} alt='Add icon' />
						<h3>Add Sem</h3>
					</div>
				</div>
			)}
		</div>
	);
}
