import React from 'react';
import blackBallImg from '../assets/black_ball.svg';
import blueBallImg from '../assets/blue_ball.svg';
import loginBottomImg from '../assets/login_bottom_path.svg';
import styles from '../styles/SignInWrapper.module.css';

const SignInWrapper = ({ children }) => {
	return (
		<div>
			<img src={blueBallImg} alt='Blue Ball' className={styles.blueBall} />
			<img src={blackBallImg} alt='Black Ball' className={styles.blackBall} />
			<div className={styles.loginBottomPathWrapper}>
				<img src={loginBottomImg} alt='Login Bottom Path' className={styles.loginBottomPath} />
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
};

export default SignInWrapper;
