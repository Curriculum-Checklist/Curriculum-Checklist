import { doc, getDoc, setDoc } from 'firebase/firestore';

export class FirestoreHelper {
	constructor(db, currentUser) {
		this.db = db;
		this.uid = currentUser?.uid ?? '';
	}

	async setCurriculum(curriculum) {
		if (!this.uid) return;
		await setDoc(doc(this.db, 'users', this.uid), curriculum.toFirestore());
	}

	async getCurriculum() {
		if (!this.uid) return;
		const curriculumDoc = await getDoc(doc(this.db, 'users', this.uid));
		const curriculumData = curriculumDoc.data();
		return curriculumData;
	}
}
