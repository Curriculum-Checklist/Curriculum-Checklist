import { doc, setDoc } from 'firebase/firestore';

export class FirestoreHelper {
	constructor(db) {
		this.db = db;
	}

	async setCurriculum(id, curriculum) {
		await setDoc(doc(this.db, 'users', id), curriculum);
	}
}
