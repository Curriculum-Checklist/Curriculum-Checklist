import Semester from './semester';
import { LocalStorageHelper } from './localStorageHelper';

export default class Curriculum {
	constructor(programName, schoolName, semesters) {
		this.programName = programName;
		this.schoolName = schoolName;
		this.semesters = semesters ?? [];
	}

	copyFrom(curriculum) {
		this.programName = curriculum.programName;
		this.schoolName = curriculum.schoolName;
		this.semesters = curriculum.semesters.map((sem) => sem.duplicate());
		// this.semesters = [];
		// for (const semester of curriculum.semesters) {
		// 	const newSemester = new Semester(semester.title, []);
		// 	for (const course of semester.courses) {
		// 		const newCourse = new Course(course.code, course.title, course.units, course.status, course.grade);
		// 		newSemester.courses.push(newCourse);
		// 	}
		// 	this.semesters.push(newSemester);
		// }
	}

	duplicate() {
		return new Curriculum(
			this.programName,
			this.schoolName,
			this.semesters.map((sem) => sem.duplicate())
		);
	}

	clear() {
		this.programName = '';
		this.schoolName = '';
		this.semesters = [];
	}

	toFirestore() {
		return {
			programName: this.programName,
			schoolName: this.schoolName,
			semesters: this.semesters.map((semester) => semester.toFirestore()),
		};
	}

	static fromCurriculumData(curriculumData) {
		return new Curriculum(
			curriculumData.programName,
			curriculumData.schoolName,
			curriculumData.semesters.map((semesterData) => Semester.fromFirestore(semesterData))
		);
	}

	static fromLocalStorage() {
		const curriculumData = LocalStorageHelper.get('curriculum');
		if (!curriculumData) return;
		return Curriculum.fromCurriculumData(curriculumData);
	}

	static async fromFirestore(firestoreHelper) {
		try {
			const curriculumData = await firestoreHelper.getCurriculum();
			if (!curriculumData) return;
			return Curriculum.fromCurriculumData(curriculumData);
		} catch (e) {
			console.log(e.message);
			return;
		}
	}
}
