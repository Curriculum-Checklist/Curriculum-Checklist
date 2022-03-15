import React from 'react';
const BaseForm = ({ onSubmit, children }) => {
	return (
		<form onSubmit={onSubmit} onAbort={() => console.log('aborted hehe')}>
			{children}
		</form>
	);
};

export default BaseForm;
