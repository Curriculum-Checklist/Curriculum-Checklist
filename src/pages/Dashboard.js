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
import { PieChart } from 'react-minimal-pie-chart';

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

	function updateSemInfo(newSemTitle) {
		selectedSem.title = newSemTitle;
	}

	const updateCourse = (courseTitle, courseCode, courseUnits, courseStatus, courseGrade, requiredGrade) => {
		selectedCourse.title = courseTitle;
		selectedCourse.code = courseCode;
		selectedCourse.units = courseUnits;
		selectedCourse.status = courseStatus;
		selectedCourse.grade = courseGrade;
		selectedCourse.requiredGrade = requiredGrade;
	};

	//TODO - use dropdown to notify user on failed logout
	if (!curriculum) {
		return <div className={styles.container}>{!curriculum && <GetCurriculumBanner />}</div>;
	};
	
	// For GWA Computation
	var GWA = 0;
	var GradePerUnit = 0;
	var TotalUnits = 0;
	var g100 = 0;
	var g125 = 0;
	var g150 = 0;
	var g175 = 0;
	var g200 = 0;
	var g225 = 0;
	var g250 = 0;
	var g275 = 0;
	var g300 = 0;
	var g400 = 0;
	var g500 = 0;

	const computeGWA = () => {
		sems.map((sem) => (
			sem.courses.map((course) => (
				ifValidGrade(course)
			))
		))
		GWA = GradePerUnit / TotalUnits;
	}

	const ifValidGrade = (course) => {
		if (['1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.50', '2.75', '3.00', '4.00', '5.00'].includes(course.grade) &&
			course.requiredGrade === true) {
			GradePerUnit = GradePerUnit + (parseFloat(course.grade) * parseFloat(course.units));
			TotalUnits = TotalUnits + parseFloat(course.units);

			if (course.grade === '1.00') {
				g100 = g100 + 1;
			}

			if (course.grade === '1.25') {
				g125 = g125 + 1;
			}
			
			if (course.grade === '1.50') {
				g150 = g150 + 1;
			}
			
			if (course.grade === '1.75') {
				g175 = g175 + 1;
			}
			
			if (course.grade === '2.00') {
				g200 = g200 + 1;
			}
			
			if (course.grade === '2.25') {
				g225 = g225 + 1;
			}
			
			if (course.grade === '2.50') {
				g250 = g250 + 1;
			}
			
			if (course.grade === '2.75') {
				g275 = g275 + 1;
			}
			
			if (course.grade === '3.00') {
				g300 = g300 + 1;
			}
			
			if (course.grade === '4.00') {
				g400 = g400 + 1;
			}
			
			if (course.grade === '5.00') {
				g500 = g500 + 1;
			}
			
		}
	}

	const hasGrade = (dataEntry) => {
		if (dataEntry.value > 0) {
			return (dataEntry.title)
		}
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
				
				<div className={styles.viewGWACard}>
					<div>
					<p className={styles.gwaTitle}> GWA </p>
					{computeGWA()}
					<p className={styles.gwaValue}> {Math.round(GWA * 100) / 100} </p>
					</div>
					<div className={styles.gwaChart}>
						<PieChart
							data={[
								{ title: '1.00', value: g100, color: 'red'},
								{ title: '1.25', value: g125, color: 'blue'},
								{ title: '1.50', value: g150, color: 'green'},
								{ title: '1.75', value: g175, color: 'orange'},
								{ title: '2.00', value: g200, color: 'yellow'},
								{ title: '2.25', value: g225, color: 'purple'},
								{ title: '2.50', value: g250, color: 'pink'},
								{ title: '2.75', value: g275, color: 'brown'},
								{ title: '3.00', value: g300, color: 'white'},
								{ title: '4.00', value: g400, color: 'gray'},
								{ title: '5.00', value: g500, color: 'black'},
							]}
							lineWidth={15}
							label={({ dataEntry }) => hasGrade(dataEntry)}
							labelStyle={() => ({
								fill: 'white',
								fontSize: '10px',
								fontFamily: 'sans-serif',
							})}
							radius={25}
							labelPosition={120}
						/>
					</div>
				</div>
				<EditCurriculumInfoModal onSave={updateCurriculumInfo} />
				<EditSemInfoModal onSave={updateSemInfo} />
				<EditCourseModal onSave={updateCourse} />
			</div>
		</DashboardContext.Provider>
	);
}
