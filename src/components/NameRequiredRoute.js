import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDatabase } from '../contexts/DatabaseContext';

const NameRequiredRoute = () => {
	const { user } = useDatabase();
	const hasName = user && user.name;
	return hasName ? <Outlet /> : <Navigate to='/Intro' />;
};

export default NameRequiredRoute;
