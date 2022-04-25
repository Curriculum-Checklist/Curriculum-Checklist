import React from 'react';

const Divider = ({ verticalMargin = 0, horizontalMargin = 8, opacity = 0.5, color = 'gray' }) => {
	const style = {
		height: '1px',
		width: `calc(100% - ${2 * horizontalMargin}px`,
		margin: `${verticalMargin}px 0`,
		backgroundColor: color,
		opacity: opacity,
	};

	return <div style={style} />;
};

export default Divider;
