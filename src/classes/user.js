import Course from './course';
import Curriculum from './curriculum';
import { LocalStorageHelper } from './localStorageHelper';

export default class User {
	constructor(name, email, selectedCurriculum, curricula, summaGWA = 1.2, magnaGWA = 1.45, laudeGWA = 1.75) {
		this.name = name;
		this.email = email;
		this.selectedCurriculum = selectedCurriculum;
		this.curricula = curricula;
		this.summaGWA = summaGWA;
		this.magnaGWA = magnaGWA;
		this.laudeGWA = laudeGWA;
	}

	duplicate() {
		const curricula = {};
		for (const curriculumId in this.curricula) {
			const curriculum = this.curricula[curriculumId];
			curricula[curriculumId] = curriculum.duplicate();
		}
		return new User(
			this.name,
			this.email,
			this.selectedCurriculum,
			curricula,
			this.summaGWA,
			this.magnaGWA,
			this.laudeGWA
		);
	}

	computeGWA() {
		let gradePerUnit = 0;
		let totalUnits = 0;

		const sems = this.curricula[this.selectedCurriculum].semesters;

		sems.forEach((sem) =>
			sem.courses.forEach((course) => {
				if (course.isValidGrade()) {
					gradePerUnit += parseFloat(course.grade) * parseFloat(course.units);
					totalUnits += parseFloat(course.units);
				}
			})
		);

		return Math.round((gradePerUnit / totalUnits) * 100) / 100;
	}

	getGradesCounter() {
		const gradesCounter = {};
		Course.numericalGradeOptions.forEach((gradeOption) => (gradesCounter[gradeOption] = 0));

		const sems = this.curricula[this.selectedCurriculum].semesters;

		sems.forEach((sem) =>
			sem.courses.forEach((course) => {
				if (course.isValidGrade()) {
					gradesCounter[course.grade]++;
				}
			})
		);

		return gradesCounter;
	}

	getStanding(GWA) {
		if (GWA <= this.summaGWA) return 'summa';
		if (GWA <= this.magnaGWA) return 'magna';
		if (GWA <= this.laudeGWA) return 'laude';
	}

	static fromUserData(userData, fromFirestore) {
		const curricula = {};
		for (const curriculumId in userData.curricula) {
			const curriculumData = userData.curricula[curriculumId];
			if (fromFirestore) {
				curricula[curriculumId] = Curriculum.fromFirestoreCurriculumData(curriculumData);
			} else {
				curricula[curriculumId] = Curriculum.fromCurriculumData(curriculumData);
			}
		}

		return new User(
			userData.name,
			userData.email,
			userData.selectedCurriculum,
			curricula,
			userData.summaGWA,
			userData.magnaGWA,
			userData.laudeGWA
		);
	}

	static fromLocalStorage() {
		const userData = LocalStorageHelper.get('user');
		if (!userData) return;
		return User.fromUserData(userData, false);
	}

	static async fromFirestore(firestoreHelper) {
		try {
			const userData = await firestoreHelper.getUserData();
			if (!userData) return;
			return User.fromUserData(userData, true);
		} catch (e) {
			console.log(e.message);
			return;
		}
	}
}
