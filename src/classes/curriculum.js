import { LocalStorageHelper } from './localStorageHelper';
import Semester from './semester';

export default class Curriculum {
	constructor(programName, schoolName, semesters) {
		this.programName = programName;
		this.schoolName = schoolName;
		this.semesters = semesters;
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
