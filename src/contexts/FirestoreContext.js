import React, { useContext } from 'react';
import { FirestoreHelper } from '../classes/firestoreHelper';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const FirestoreContext = React.createContext();

export function useFirestore() {
	return useContext(FirestoreContext);
}

export const FirestoreProvider = ({ children }) => {
	const { currentUser } = useAuth();
	const firestoreHelper = new FirestoreHelper(db, currentUser);
	const value = { db, firestoreHelper };

	return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};
