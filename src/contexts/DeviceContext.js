import React, { useState, useEffect, useContext } from 'react';

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

const DeviceContext = React.createContext();

export function useDevice() {
	return useContext(DeviceContext);
}

export function DeviceProvider({ children }) {
	const [device, setDevice] = useState('smartphone');

	useEffect(() => {
		function handleResize() {
			let newDevice = 'smartphone';
			if (getWindowDimensions().width > 600) newDevice = 'tablet';
			if (getWindowDimensions().width > 900) newDevice = 'desktop';
			setDevice(newDevice);
		}
		handleResize();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return <DeviceContext.Provider value={{ device }}>{children}</DeviceContext.Provider>;
}
