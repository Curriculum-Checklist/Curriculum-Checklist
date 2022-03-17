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
import { DatabaseProvider } from './contexts/DatabaseContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<Router>
			<DeviceProvider>
				<Layout>
					<AuthProvider>
						<FirestoreProvider>
							<DatabaseProvider>
								<Routes>
									<Route path='/signup' element={<Signup />} />
									<Route path='/login' element={<Login />} />
									<Route path='/' element={<PrivateRoute />}>
										<Route path='/Collection' element={<Collection />} />
										<Route path='/Account' element={<Account />} />
										<Route path='/' element={<Dashboard />} />
									</Route>
								</Routes>
							</DatabaseProvider>
						</FirestoreProvider>
					</AuthProvider>
				</Layout>
			</DeviceProvider>
			<ToastContainer />
		</Router>
	);
}

export default App;
