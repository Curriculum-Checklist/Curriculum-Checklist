import Semester from './semester';

export default class Curriculum {
	constructor(author, programName, schoolName, lastEdit, isShared, code, semesters) {
		this.author = author;
		this.programName = programName;
		this.schoolName = schoolName;
		this.lastEdit = lastEdit;
		this.isShared = isShared ?? false;
		this.code = code;
		this.semesters = semesters ?? [];
	}

	copyFrom(curriculum) {
		this.author = curriculum.author;
		this.programName = curriculum.programName;
		this.schoolName = curriculum.schoolName;
		this.lastEdit = curriculum.lastEdit;
		this.isShared = curriculum.isShared;
		this.code = curriculum.code;
		this.semesters = curriculum.semesters.map((sem) => sem.duplicate());
	}

	duplicate() {
		return new Curriculum(
			this.author,
			this.programName,
			this.schoolName,
			this.lastEdit,
			this.isShared,
			this.code,
			this.semesters.map((sem) => sem.duplicate())
		);
	}

	clear() {
		this.author = '';
		this.programName = '';
		this.schoolName = '';
		this.lastEdit = new Date();
		this.isShared = false;
		this.code = '';
		this.semesters = [];
	}

	toFirestore() {
		return {
			author: this.author,
			programName: this.programName,
			schoolName: this.schoolName,
			lastEdit: this.lastEdit,
			isShared: this.isShared,
			code: this.code,
			semesters: this.semesters.map((semester) => semester.toFirestore()),
		};
	}

	toSharedFirestore() {
		return {
			author: this.author,
			programName: this.programName,
			schoolName: this.schoolName,
			lastEdit: this.lastEdit,
			semesters: this.semesters.map((semester) => semester.toSharedFirestore()),
		};
	}

	static fromCurriculumData(curriculumData) {
		return new Curriculum(
			curriculumData.author,
			curriculumData.programName,
			curriculumData.schoolName,
			curriculumData.lastEdit,
			curriculumData.isShared,
			curriculumData.code,
			curriculumData.semesters.map((semesterData) => Semester.fromSemesterData(semesterData))
		);
	}

	static fromFirestoreCurriculumData(curriculumData) {
		const fireBaseTimestampToDate = (time) => new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
		return new Curriculum(
			curriculumData.author,
			curriculumData.programName,
			curriculumData.schoolName,
			fireBaseTimestampToDate(curriculumData.lastEdit),
			curriculumData.isShared,
			curriculumData.code,
			curriculumData.semesters.map((semesterData) => Semester.fromSemesterData(semesterData))
		);
	}

	static fromFirestoreSharedCurriculumData(curriculumData) {
		const fireBaseTimestampToDate = (time) => new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
		const firebaseDate = fireBaseTimestampToDate(curriculumData.lastEdit);
		return new Curriculum(
			curriculumData.author,
			curriculumData.programName,
			curriculumData.schoolName,
			isNaN(firebaseDate) ? curriculumData.lastEdit : firebaseDate,
			false,
			'',
			curriculumData.semesters.map((semesterData) => Semester.fromSemesterData(semesterData))
		);
	}
}
