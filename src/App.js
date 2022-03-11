import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { FirestoreProvider } from './contexts/FirestoreContext';
import Collections from './pages/Collections';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Accounts from './pages/Accounts';

function App() {
	return (
		<Router>
			<Layout>
				<AuthProvider>
					<FirestoreProvider>
						<Routes>
							<Route path='/signup' element={<Signup />} />
							<Route path='/login' element={<Login />} />
							<Route path='/' element={<PrivateRoute />}>
								<Route path='/Collections' element={<Collections />} />
								<Route path='/Dashboard' element={<Dashboard />} />
								<Route path='/Accounts' element={<Accounts />} />
							</Route>
						</Routes>
					</FirestoreProvider>
				</AuthProvider>
			</Layout>
		</Router>
	);
}

export default App;
