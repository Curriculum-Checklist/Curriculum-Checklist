import React, { useContext } from 'react';
import { FirestoreHelper } from '../classes/FirestoreHelper';
import { db } from '../firebase';

const FirestoreContext = React.createContext();

export function useFirestore() {
	return useContext(FirestoreContext);
}

export const FirestoreProvider = ({ children }) => {
	const firestoreHelper = new FirestoreHelper(db);
	const value = { db, firestoreHelper };

	return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
};
