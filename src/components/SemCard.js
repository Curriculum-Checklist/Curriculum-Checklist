import React, { useState } from 'react';
import AddCourseModal from '../components/AddCourseModal'
import styles from '../styles/Dashboard.module.css';
import addCircularImg from '../assets/add_circular.svg';
import clsx from 'clsx';

const SemCard = () => {
    const AddCourseButton = () => {
        const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <div
                            className={clsx(styles.addCourseButton, 'mt-2 unselectable')}
                            alt='Add Course'
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}
                            onClick={() => setShowAddCourseModal(true)}>
                                
                            <div className={(styles.addCourseIcon)}>
                                <img src={addCircularImg} alt='Add icon' width='24' height ='24' />
                            </div>
                            <div className={(styles.addCourseText)}>
                                <h6>Add Course</h6>
                            </div>
    
                        </div>
    
                        <AddCourseModal
                            setShowAddCourseModal={setShowAddCourseModal}
                            show={showAddCourseModal}
                        />
                    </div>
                    
            </div>
        );
    }
    
    return (
        <div className={clsx(styles.semCard)}>
            <AddCourseButton/>
        </div>
    );
}

export default SemCard