import React, { useContext, useEffect, useState } from 'react';
import { LocalStorageHelper } from '../classes/localStorageHelper';
import User from '../classes/user';
import { useAuth } from './AuthContext';
import { useFirestore } from './FirestoreContext';

const DatabaseContext = React.createContext();

export function useDatabase() {
	return useContext(DatabaseContext);
}

export const DatabaseProvider = ({ children }) => {
	const { currentUser } = useAuth();
	const { firestoreHelper } = useFirestore();
	const [user, setUser] = useState(User.fromLocalStorage());
	const [curriculum, setCurriculum] = useState();

	useEffect(() => {
		const localUser = User.fromLocalStorage();

		async function getUserFromFirestore() {
			const user = await User.fromFirestore(firestoreHelper);
			if (!user) return;
			setUser(user);
			LocalStorageHelper.set('user', user);
		}

		if (localUser) {
			setUser(localUser);
			return;
		} else {
			getUserFromFirestore();
		}
	}, [currentUser, firestoreHelper]);

	useEffect(() => {
		if (!user || !user.selectedCurriculum || !(user.selectedCurriculum in user.curricula)) {
			setCurriculum(undefined);
		} else {
			setCurriculum(user.curricula[user.selectedCurriculum]);
		}
	}, [user]);

	const value = { user, setUser, curriculum };
	return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};
