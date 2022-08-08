import { writable } from 'svelte/store';

type ToastStyle = 'success' | 'error' | 'warn'

const showToast = writable(false);
const toastStyle = writable<ToastStyle>();
const toastMessage = writable('');

const toastCommon = (message: string, type: ToastStyle) => {
	toastStyle.update(() => type);
	showToast.update(() => true);
	toastMessage.update(() => message);
};

const toast = {
	error(message: string) {
		toastCommon(message, 'error');
	},
	success(message: string) {
		toastCommon(message, 'success');
	},
	warn(message: string) {
		toastCommon(message, 'warn');
	},
};

export { showToast, toastStyle, toastMessage };
export default toast;

