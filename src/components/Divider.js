import React from 'react';

const Divider = ({ margin = 8, opacity = 0.5, color = 'gray' }) => {
	const style = {
		height: '1px',
		width: `calc(100% - ${2 * margin}px`,
		backgroundColor: color,
		opacity: opacity,
	};

	return <div style={style} />;
};

export default Divider;
