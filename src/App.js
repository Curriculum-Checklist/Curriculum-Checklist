import React, { useState } from 'react';
import Modal from './modal';
import './modal.css';

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <button onClick ={() => setShow(true)}> Create a Curriculum </button>
      <Modal title = "Create a New Curriculum" onClose = {() => setShow(false)} show = {show}>
        <p> Please add form content here tysm :3 </p>  
      </Modal>
    </div>
  );
}

export default App;
