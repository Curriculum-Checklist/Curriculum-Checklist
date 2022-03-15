import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { FirestoreProvider } from './contexts/FirestoreContext';
import Collection from './pages/Collection';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import { DeviceProvider } from './contexts/DeviceContext';

function App() {
	return (
		<Router>
			<DeviceProvider>
				<Layout>
					<AuthProvider>
						<FirestoreProvider>
							<Routes>
								<Route path='/signup' element={<Signup />} />
								<Route path='/login' element={<Login />} />
								<Route path='/' element={<PrivateRoute />}>
									<Route path='/Collection' element={<Collection />} />
									<Route path='/Account' element={<Account />} />
									<Route path='/' element={<Dashboard />} />
								</Route>
							</Routes>
						</FirestoreProvider>
					</AuthProvider>
				</Layout>
			</DeviceProvider>
		</Router>
	);
}

export default App;
