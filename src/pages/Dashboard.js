import clsx from 'clsx';
import React, { useState } from 'react';
import addCircularImg from '../assets/add_circular.svg';
import GetCurriculumBanner from '../components/GetCurriculumBanner';
import SemCard from '../components/SemCard';
import { useDatabase } from '../contexts/DatabaseContext';
import styles from '../styles/Dashboard.module.css';
import BaseButton from '../components/BaseButton';
import pencilWhiteImg from '../assets/pencil_white.svg';
import pencilGreenImg from '../assets/pencil_green.svg';
import Curriculum from '../classes/curriculum';
import Semester from '../classes/semester';
import { getNextSem } from '../function/utils';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useFirestore } from '../contexts/FirestoreContext';
import EditCurriculumInfoModal from '../components/EditCurriculumInfoModal';

const editingCurriculum = new Curriculum();

export default function Dashboard() {
	const { curriculum } = useDatabase();
	const [editMode, setEditMode] = useState(false);
	const [showEditCurriculumInfoModal, setShowEditCurriculumInfoModal] = useState(false);
	const [programName, setProgramName] = useState(curriculum ? curriculum.programName : '');
	const [schoolName, setSchoolName] = useState(curriculum ? curriculum.schoolName : '');
	const [sems, setSems] = useState(curriculum ? [...curriculum.semesters] : []); //List of sems for teting only
	const { firestoreHelper } = useFirestore();

	const addSem = () => {
		const title = sems.length === 0 ? '1Y-1S' : getNextSem(sems[sems.length - 1].title);
		const newSem = new Semester(title, []);
		editingCurriculum.semesters.push(newSem);
		setSems([...sems, newSem]);
	};

	function setCurriculumTo(curriculum) {
		setProgramName(curriculum.programName);
		setSchoolName(curriculum.schoolName);
		setSems([...curriculum.semesters]);
	}

	function startEditing() {
		if (!curriculum) return;
		editingCurriculum.copyFrom(curriculum);
		setCurriculumTo(editingCurriculum);
		setEditMode(true);
	}

	function discardChanges() {
		setCurriculumTo(curriculum);
		setEditMode(false);
	}

	function saveChanges() {
		curriculum.copyFrom(editingCurriculum);
		try {
			firestoreHelper.setCurriculum(curriculum);
		} catch (e) {
			console.log('Failed to save curriculum online', e.message);
		}
		LocalStorageHelper.set('curriculum', curriculum);
		setCurriculumTo(curriculum);
		setEditMode(false);
	}

	function updateCurriculumInfo(newProgramName, newSchoolName) {
		editingCurriculum.programName = newProgramName;
		editingCurriculum.schoolName = newSchoolName;
		setProgramName(newProgramName);
		setSchoolName(newSchoolName);
	}

	//TODO - use dropdown to notify user on failed logout
	if (!curriculum) {
		return <div className={styles.container}>{!curriculum && <GetCurriculumBanner />}</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.programNameWrapper}>
				<h1>{programName}</h1>
				{editMode && (
					<img
						className={styles.pencilGreenImg}
						src={pencilGreenImg}
						alt='Edit Program Name'
						onClick={() => setShowEditCurriculumInfoModal(true)}
					/>
				)}
			</div>
			<h5>{schoolName}</h5>
			{editMode ? (
				<div className={styles.saveDiscardButtonsWrapper}>
					<BaseButton label='Discard' color='transparent-ocean-blue' onClick={discardChanges} />
					<BaseButton label='Save' color='red' onClick={saveChanges} />
				</div>
			) : (
				<BaseButton label='Edit' color='green' icon={pencilWhiteImg} tight onClick={startEditing} />
			)}

			<div className={styles.grid}>
				{sems.map((sem, i) => (
					<SemCard sem={sem} key={i} />
				))}
				{editMode && (
					<div className={clsx(styles.addSemCard, 'unselectable')} onClick={addSem}>
						<img src={addCircularImg} alt='Add icon' />
						<h3>Add Sem</h3>
					</div>
				)}
			</div>

			<EditCurriculumInfoModal
				show={showEditCurriculumInfoModal}
				setShow={setShowEditCurriculumInfoModal}
				onSave={updateCurriculumInfo}
				initialProgramName={programName}
				initialSchoolName={schoolName}
			/>
		</div>
	);
}
