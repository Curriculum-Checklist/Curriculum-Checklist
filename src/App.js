import React, { useState } from 'react';
import Modal from './modal';
import './modal.css';
import createButton from './button_create.png';

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className="App"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  }}>
        <img src={createButton}
        alt = "Create my Curriculum"
        onClick ={() => setShow(true)}/> 
      <Modal title = "Create a New Curriculum" onClose = {() => setShow(false)} show = {show}>   
      </Modal>
    </div>
  );
}

export default App;
