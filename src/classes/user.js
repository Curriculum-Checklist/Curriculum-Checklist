import Curriculum from './curriculum';
import { LocalStorageHelper } from './localStorageHelper';

export default class User {
	constructor(name, email, selectedCurriculum, curricula) {
		this.name = name;
		this.email = email;
		this.selectedCurriculum = selectedCurriculum;
		this.curricula = curricula;
	}

	duplicate() {
		const curricula = {};
		for (const curriculumId in this.curricula) {
			const curriculum = this.curricula[curriculumId];
			curricula[curriculumId] = curriculum.duplicate();
		}
		return new User(this.name, this.email, this.selectedCurriculum, curricula);
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

		return new User(userData.name, userData.email, userData.selectedCurriculum, curricula);
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
