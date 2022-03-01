import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { FirestoreProvider } from './contexts/FirestoreContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
	return (
		<Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Router>
					<AuthProvider>
						<FirestoreProvider>
							<Routes>
								<Route path='/signup' element={<Signup />} />
								<Route path='/login' element={<Login />} />
								<Route path='/' element={<PrivateRoute />}>
									<Route path='/' element={<Dashboard />} />
								</Route>
							</Routes>
						</FirestoreProvider>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
}

export default App;
