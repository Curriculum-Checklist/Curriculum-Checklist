import React, { useState } from 'react'

const Modal = props =>{
    const [curriculumtitle, setCurriculumtitle] = useState('');
    const [programname, setProgramname] = useState('');
    const [schoolname, setSchoolname] = useState('');

    return(
        <div onClick={props.onClose} className={`modal ${props.show ? 'show' : ''}`}>
            <div onClick={e => e.stopPropagation()} className='modalContent'>
                <div className='modalHeader'>
                    <h4 className='modalTitle'> {props.title} </h4>
                </div>

                <div className='modalBody'>
                    {props.children}
                    <form>
                        <label>Curriculum Title:</label>
                        <input
                        type='text'
                        required
                        value={curriculumtitle}
                        onChange={(e) => setCurriculumtitle(e.target.value)}
                        />
                        <label>Program Name:</label>
                        <input
                        type='text'
                        required
                        value={programname}
                        onChange={(e) => setProgramname(e.target.value)}
                        />
                        <label>School Name:</label>
                        <input
                        type='text'
                        required
                        value={schoolname}
                        onChange={(e) => setSchoolname(e.target.value)}
                        />
                    </form>
                </div>
                <div className='modalFooter'>
                    <button className = 'submitButton'>Submit</button>
                    <button onClick = {props.onClose} 
                    className='cancelButton'
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Modal