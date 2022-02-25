import React from 'react';
import './App.css';
import Signup from "./Signup"
import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signedin from "./Signedin"
import Login from "./Login"


function App() {
  return (
    <Container 
      className = "d-flex align-items-center justify-content-center"
      style = {{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px"}}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path = "/" element = {<Signedin/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App;
