import clsx from 'clsx';
import React, { useEffect, useState, useContext } from 'react';
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
import EditRequiredGWAModal from '../components/EditRequiredGWAModal';
import Course from '../classes/course';
import notify from '../function/notify';

const editingCurriculum = new Curriculum();

export const DashboardContext = React.createContext();

export default function Dashboard() {
	const { user, curriculum } = useDatabase();
	const [editMode, setEditMode] = useState(false);
	const [buttonStatus, setButtonStatus] = useState('default');

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

	useEffect(() => {
		if (curriculum) {
			const curriculumCopy = curriculum.duplicate();
			setProgramName(curriculumCopy.programName);
			setSchoolName(curriculumCopy.schoolName);
			setSems(curriculumCopy.semesters);
		}
	}, [curriculum]);

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

	async function saveChanges() {
		setButtonStatus('loading');
		curriculum.copyFrom(editingCurriculum);
		try {
			await firestoreHelper.setCurriculum(user.selectedCurriculum, curriculum);
		} catch (e) {
			console.log('Failed to save curriculum online', e.message);
		}
		const newUser = user.duplicate();
		newUser.curricula[user.selectedCurriculum] = curriculum;
		LocalStorageHelper.set('user', newUser);

		setCurriculumTo(curriculum);
		setEditMode(false);
		setButtonStatus('default');
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
	}

	return (
		<DashboardContext.Provider
			value={{
				editMode,
				setSems,
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
				editingCurriculum,

				//! Course editing
				showEditCourseModal,
				setShowEditCourseModal,
				selectedCourse,
				setSelectedCourse,
			}}>
			<div className={styles.container}>
				<Header
					onDiscard={discardChanges}
					onSave={saveChanges}
					onEdit={startEditing}
					buttonStatus={buttonStatus}
				/>

				<SemesterGrid sems={sems} onAddSemClick={addSem} />

				<GWAWrapper sems={sems} />

				{/* MODALS */}
				<EditCurriculumInfoModal onSave={updateCurriculumInfo} />
				<EditSemInfoModal onSave={updateSemInfo} />
				<EditCourseModal onSave={updateCourse} />
			</div>
		</DashboardContext.Provider>
	);
}

export const GWAWrapperContext = React.createContext();

function GWAWrapper() {
	const { user, setUser } = useDatabase();
	const { firestoreHelper } = useFirestore();

	const GWA = user.computeGWA();
	const gradesCounter = user.getGradesCounter();
	const standing = user.getStanding(GWA);

	const [summaGWA, setSummaGWA] = useState(1.2);
	const [magnaGWA, setMagnaGWA] = useState(1.45);
	const [laudeGWA, setLaudeGWA] = useState(1.75);

	useEffect(() => {
		setSummaGWA(user.summaGWA);
		setMagnaGWA(user.magnaGWA);
		setLaudeGWA(user.laudeGWA);
	}, [user]);

	const [showEditRequiredGWAModal, setShowEditRequiredGWAModal] = useState(false);

	async function saveGWA(newSummaGWA, newMagnaGWA, newLaudeGWA) {
		const newUser = user.duplicate();
		newUser.summaGWA = newSummaGWA;
		newUser.magnaGWA = newMagnaGWA;
		newUser.laudeGWA = newLaudeGWA;
		LocalStorageHelper.set('user', newUser);

		setUser(newUser);
		try {
			await firestoreHelper.setGWARequired(newUser);
		} catch (e) {
			console.log('Failed to save GWA online', e.message);
			notify('Failed to save GWA online');
		}
	}

	return (
		<GWAWrapperContext.Provider
			value={{
				showEditRequiredGWAModal,
				setShowEditRequiredGWAModal,
				summaGWA,
				magnaGWA,
				laudeGWA,
				GWA,
				gradesCounter,
				standing,
			}}>
			<div className={styles.GWAWrapperContainer}>
				<ViewGWACard />
				<ReqGWACard />
				<EditRequiredGWAModal onSave={saveGWA} />;
			</div>
		</GWAWrapperContext.Provider>
	);
}

function ViewGWACard() {
	const { GWA, gradesCounter } = useContext(GWAWrapperContext);
	const hasGrade = (dataEntry) => {
		if (dataEntry.value > 0) {
			return dataEntry.title;
		}
	};

	return (
		<div className={styles.viewGWACard}>
			<div>
				<p className={styles.gwaTitle}> GWA </p>
				{GWA ? (
					<p className={styles.gwaValue}> {GWA} </p>
				) : (
					<p className={styles.noGWAText}>Please enter your grades in the curriculum to see your GWA</p>
				)}
			</div>
			<div className={styles.gwaChart}>
				<PieChart
					data={Course.numericalGradeOptions.map((gradeOption) => ({
						title: gradeOption,
						value: gradesCounter[gradeOption],
						color: Course.numericalGradeToColor[gradeOption],
					}))}
					lineWidth={15}
					label={({ dataEntry }) => hasGrade(dataEntry)}
					labelStyle={() => ({
						fill: 'white',
						fontSize: '0.5rem',
						fontFamily: 'sans-serif',
					})}
					radius={25}
					labelPosition={120}
				/>
			</div>
		</div>
	);
}

function ReqGWACard() {
	const { editMode } = useContext(DashboardContext);
	const { setShowEditRequiredGWAModal, summaGWA, magnaGWA, laudeGWA, standing } = useContext(GWAWrapperContext);

	return (
		<div className={styles.reqGWACard}>
			<p className={styles.gwaTitle}>
				GWA Required
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
				<div className={clsx(styles.honorRow, standing === 'summa' && styles.selectedHonorRow)}>
					<p>Summa Cum Laude</p>
					<p>{parseFloat(summaGWA).toFixed(2)}</p>
				</div>
				<div className={clsx(styles.honorRow, standing === 'magna' && styles.selectedHonorRow)}>
					<p>Magna Cum Laude</p>
					<p>{parseFloat(magnaGWA).toFixed(2)}</p>
				</div>
				<div className={clsx(styles.honorRow, standing === 'laude' && styles.selectedHonorRow)}>
					<p>Cum Laude</p>
					<p>{parseFloat(laudeGWA).toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
}

function SemesterGrid({ sems, onAddSemClick }) {
	const { editMode } = useContext(DashboardContext);
	return (
		<div className={styles.grid}>
			{sems.map((sem, i) => (
				<SemCard sem={sem} key={i} />
			))}
			{editMode && (
				<div className={clsx(styles.addSemCard, 'unselectable')} onClick={onAddSemClick}>
					<img src={addCircularImg} alt='Add icon' />
					<h3>Add Sem</h3>
				</div>
			)}
		</div>
	);
}

function Header({ onDiscard, onSave, onEdit, buttonStatus }) {
	const { programName, schoolName, editMode, setShowEditCurriculumInfoModal } = useContext(DashboardContext);
	return (
		<div>
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
					<BaseButton
						label='Discard'
						color='transparent-ocean-blue'
						onClick={onDiscard}
						disabled={buttonStatus === 'loading'}
					/>
					<BaseButton label='Save' color='red' onClick={onSave} disabled={buttonStatus === 'loading'} />
				</div>
			) : (
				<BaseButton
					label='Edit'
					color='green'
					icon={pencilWhiteImg}
					tight
					onClick={onEdit}
					disabled={buttonStatus === 'loading'}
				/>
			)}
		</div>
	);
}
