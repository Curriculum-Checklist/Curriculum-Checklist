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
import EditCourseModal from '../components/EditCourseModal';
import EditSemInfoModal from '../components/EditSemInfoModal';
import EditRequiredGWAModal from '../components/EditRequiredGWAModal';

const editingCurriculum = new Curriculum();

export const DashboardContext = React.createContext();

export default function Dashboard() {
	const { curriculum } = useDatabase();
	const [editMode, setEditMode] = useState(false);

	//! Curriculum Editing
	const [showEditCurriculumInfoModal, setShowEditCurriculumInfoModal] = useState(false);
	const [programName, setProgramName] = useState(curriculum ? curriculum.programName : '');
	const [schoolName, setSchoolName] = useState(curriculum ? curriculum.schoolName : '');

	//! Semester Editing
	const [showEditSemInfoModal, setShowEditSemInfoModal] = useState(false);
	const [selectedSem, setSelectedSem] = useState();

	//! Course Editing
	const [showEditCourseModal, setShowEditCourseModal] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState();

	const [sems, setSems] = useState(curriculum ? [...curriculum.semesters] : []); //List of sems for teting only
	const { firestoreHelper } = useFirestore();

	//! GWA Editing
	const [showEditRequiredGWAModal, setShowEditRequiredGWAModal] = useState(false);
	const summaGWA = LocalStorageHelper.get('summa', 1.20)
	const magnaGWA = LocalStorageHelper.get('magna', 1.45)
	const laudeGWA = LocalStorageHelper.get('laude', 1.75)
	

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

	function saveGWA(newSummaGWA, newMagnaGWA, newLaudeGWA){
		LocalStorageHelper.set('laude', newLaudeGWA);
		LocalStorageHelper.set('summa', newSummaGWA);
		LocalStorageHelper.set('magna', newMagnaGWA);
	}

	function updateCurriculumInfo(newProgramName, newSchoolName) {
		editingCurriculum.programName = newProgramName;
		editingCurriculum.schoolName = newSchoolName;
		setProgramName(newProgramName);
		setSchoolName(newSchoolName);
	}

	function updateSemInfo(newSemTitle) {
		selectedSem.title = newSemTitle;
	}

	const updateCourse = (courseTitle, courseCode, courseUnits, courseGrade, courseStatus) => {
		selectedCourse.title = courseTitle;
		selectedCourse.code = courseCode;
		selectedCourse.units = courseUnits;
		selectedCourse.grade = courseGrade;
		selectedCourse.status = courseStatus;
	};

	//TODO - use dropdown to notify user on failed logout
	if (!curriculum) {
		return <div className={styles.container}>{!curriculum && <GetCurriculumBanner />}</div>;
	}

	return (
		<DashboardContext.Provider
			value={{
				editMode,

				//! Curriculum editing
				showEditCurriculumInfoModal,
				setShowEditCurriculumInfoModal,
				programName,
				schoolName,

				//! Semester editing
				showEditSemInfoModal,
				setShowEditSemInfoModal,
				selectedSem,
				setSelectedSem,

				//! Course editing
				showEditCourseModal,
				setShowEditCourseModal,
				selectedCourse,
				setSelectedCourse,

				//! GWA editing
				showEditRequiredGWAModal,
				setShowEditRequiredGWAModal,
				summaGWA, magnaGWA, laudeGWA
			}}>
			<div className={styles.container}>
				<div className={styles.programNameWrapper}>
					<h1>{programName}</h1>
					{editMode && (
						<img
							className='pencilGreenImg'
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
				{/* GWA Required Card} */}
				<div className={styles.reqGWACard}>
					<p className={styles.gwaTitle}>GWA Required   
					{editMode && (
						<img
							className='pencilGreenImg'
							src={pencilGreenImg}
							alt='Edit Required GWA'
							onClick={() => setShowEditRequiredGWAModal(true)}
						/>
					)}

					</p>
					<div className={styles.honorDiv}>
						<div className={styles.honorCol}>
							<p>Summa Cum Laude</p>
							<p>Magna Cum Laude</p>
							<p>Cum Laude</p>
						</div>
						<div className={styles.honorCol}>
							<p>{parseFloat(summaGWA).toFixed(2)}</p>
							<p>{parseFloat(magnaGWA).toFixed(2)}</p>
							<p>{parseFloat(laudeGWA).toFixed(2)}</p>
						</div>
					</div>
				</div>

				<EditCurriculumInfoModal onSave={updateCurriculumInfo} />
				<EditSemInfoModal onSave={updateSemInfo} />
				<EditCourseModal onSave={updateCourse} />
				<EditRequiredGWAModal onSave={saveGWA} />
			</div>
		</DashboardContext.Provider>
	);
}
