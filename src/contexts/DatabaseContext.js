import React, { useContext, useEffect, useState } from 'react';
import Curriculum from '../classes/curriculum';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import { useAuth } from './AuthContext';
import { useFirestore } from './FirestoreContext';

const DatabaseContext = React.createContext();

export function useDatabase() {
	return useContext(DatabaseContext);
}

export const DatabaseProvider = ({ children }) => {
	const { currentUser } = useAuth();
	const { firestoreHelper } = useFirestore();
	const [curriculum, setCurriculum] = useState(Curriculum.fromLocalStorage());

	useEffect(() => {
		const localCurriculum = Curriculum.fromLocalStorage();

		async function getCurriculumFromFirestore() {
			const curriculum = await Curriculum.fromFirestore(firestoreHelper);
			if (!curriculum) return;
			setCurriculum(curriculum);
			LocalStorageHelper.set('curriculum', curriculum);
		}

		if (localCurriculum) {
			setCurriculum(localCurriculum);
			return;
		} else {
			getCurriculumFromFirestore();
		}
	}, [currentUser, firestoreHelper]);

	const value = { curriculum };
	return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};
