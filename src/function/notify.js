import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = { duration: 2000, type: 'error' };

const notify = (text, options) => {
	options = { ...defaultOptions, ...options };

	toast(text, {
		position: 'top-center',
		autoClose: options.duration,
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		type: options.type,
	});
};

export default notify;
