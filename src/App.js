import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from "./Signup"
import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Container 
        className = "d-flex align-items-center justify-content-center"
        style = {{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px"}}>
          <Signup />
        </div>
      </Container>
    </AuthProvider>
  )
}
  // (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
// }

export default App;
