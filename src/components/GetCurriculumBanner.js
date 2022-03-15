import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/GetCurriculumBanner.module.css';
import BaseButton from './BaseButton';
import emptyDataImg from '../assets/empty_data.svg';

const GetCurriculumBanner = () => {
	const go_to = useNavigate();

	return (
		<div className={styles.container}>
			<img className={styles.emptyDataImg} src={emptyDataImg} alt='Empty Data' />
			<h1 className={styles.title}>Create Curriculum</h1>
			<p className={styles.subtitle}>
				To get started, you must search a curriculum you <br /> want to use or create one on your own
			</p>
			<BaseButton color='ocean-blue' label='Continue' onClick={() => go_to('/Collection')} />
		</div>
	);
};

export default GetCurriculumBanner;
