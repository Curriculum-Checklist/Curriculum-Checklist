import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';

export class FirestoreHelper {
	constructor(db, currentUser) {
		this.db = db;
		this.uid = currentUser?.uid ?? '';
	}

	async createUser(name, email) {
		if (!this.uid) return;
		await setDoc(doc(this.db, 'users', this.uid), {
			name: name,
			email: email,
			selectedCurriculum: '',
		});
	}

	async addCurriculum(curriculum) {
		if (!this.uid) return;
		const curriculumDocRef = await addDoc(
			collection(this.db, 'users', this.uid, 'curricula'),
			curriculum.toFirestore()
		);
		return curriculumDocRef.id;
	}

	async setCurriculum(selectedCurriculum, curriculum) {
		if (!this.uid) return;
		const newDate = new Date();
		const curriculumToShare = curriculum.toFirestore();
		curriculumToShare.lastEdit = newDate;
		await setDoc(doc(this.db, 'users', this.uid, 'curricula', selectedCurriculum), curriculumToShare);
		if (curriculum.isShared) {
			const curriculumToShareToFirestore = curriculum.toSharedFirestore();
			curriculumToShareToFirestore.lastEdit = newDate;
			await setDoc(doc(this.db, 'sharedCurricula', curriculum.code), curriculumToShareToFirestore);
		}
	}

	async deleteCurriculum(curriculumId, curriculum) {
		if (!this.uid) return;
		await deleteDoc(doc(this.db, 'users', this.uid, 'curricula', curriculumId));
		if (curriculum.isShared) {
			await deleteDoc(doc(this.db, 'sharedCurricula', curriculum.code));
		}
	}

	async getUserCurricula() {
		if (!this.uid) return;
		const curricula = {};

		const q = query(collection(this.db, 'users', this.uid, 'curricula'));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((curriculumDoc) => {
			const curriculumData = curriculumDoc.data();
			curricula[curriculumDoc.id] = curriculumData;
		});

		return curricula;
	}

	async getUserData() {
		if (!this.uid) return;
		const userDoc = await getDoc(doc(this.db, 'users', this.uid));
		if (!userDoc.exists()) return;
		const userData = userDoc.data();

		userData['curricula'] = await this.getUserCurricula();

		return userData;
	}

	async setName(name) {
		if (!this.uid) return;
		await updateDoc(doc(this.db, 'users', this.uid), { name: name });
	}

	async setSelectedCurriculum(curriculumId) {
		if (!this.uid) return;
		await updateDoc(doc(this.db, 'users', this.uid), { selectedCurriculum: curriculumId });
	}

	async shareCurriculum(curriculumId, curriculum) {
		if (!this.uid) return;
		const curriculumDocRef = await addDoc(collection(this.db, 'sharedCurricula'), curriculum.toSharedFirestore());
		await updateDoc(doc(this.db, 'users', this.uid, 'curricula', curriculumId), {
			isShared: true,
			code: curriculumDocRef.id,
		});
		return curriculumDocRef.id;
	}

	async unShareCurriculum(curriculumId, sharedCurriculumId) {
		if (!this.uid) return;
		await updateDoc(doc(this.db, 'users', this.uid, 'curricula', curriculumId), {
			isShared: false,
			code: '',
		});
		await deleteDoc(doc(this.db, 'sharedCurricula', sharedCurriculumId));
	}
}
