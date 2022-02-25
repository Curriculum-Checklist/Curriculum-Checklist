import React from 'react'

const Modal = props =>{

    return(
        <div onClick={props.onClose} className={`modal ${props.show ? 'show' : ''}`}>
            <div onClick={e => e.stopPropagation()} className='modalContent'>
                <div className='modalHeader'>
                    <h4 className='modalTitle'> {props.title} </h4>
                </div>

                <div className='modalBody'>
                    {props.children}
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