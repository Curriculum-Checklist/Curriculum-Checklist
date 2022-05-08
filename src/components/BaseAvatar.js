import React from 'react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import styles from '../styles/BaseAvatar.module.css';

const BaseAvatar = ({ photoURL, size = 30, letter = 'K', className, nonclickable = false, onClick }) => {
	const [hasValidPhotoURL, setHasValidPhotoURL] = useState(photoURL !== undefined && photoURL !== '');
	useEffect(() => {
		setHasValidPhotoURL(photoURL);
	}, [photoURL]);

	return (
		<div
			style={{
				height: size,
				width: size,
				cursor: nonclickable ? 'default' : 'pointer',
			}}
			className={clsx(styles.container, className)}
			onClick={onClick}>
			{hasValidPhotoURL ? (
				<img
					className={clsx(styles.avatar, className, 'unselectable')}
					src={photoURL}
					alt='avatar'
					width={size}
					draggable={false}
					height={size}
					onError={() => setHasValidPhotoURL(false)}
				/>
			) : (
				<Avatar name={letter.charAt(0).toUpperCase()} round={true} size={`100%`} />
			)}
		</div>
	);
};

export default BaseAvatar;
