import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import addCircularImg from '../assets/add_circular.svg';
import clsx from 'clsx';
import SemCard from '../components/SemCard';

export default function Dashboard() {
	const [sems, setSems] = useState([]); //List of sems for teting only

	//Need to actually add sem in database
	const addSem = () => {
		const newList = sems.concat({});
		setSems(newList);
	};

	//TODO - use dropdown to notify user on failed logout
	return (
		<>
			<div className={styles.grid}>
				{sems.map((sem, i) => (
					<SemCard key={i} />
				))}
				<div className={clsx(styles.addSemCard, 'unselectable')} onClick={addSem}>
					<img src={addCircularImg} alt='Add icon' />
					<h3>Add Sem</h3>
				</div>
			</div>
		</>
	);
}
