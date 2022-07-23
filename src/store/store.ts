import { writable } from 'svelte/store';

export const storeInitialData = {
	data: null,
	error: false,
	success: false,
	loading: false,
};

export interface StoreData<T = any> {
	data: T | null,
	error: boolean,
	success: boolean,
	loading: boolean
}

const store = (initialData: any) => {
	return writable(initialData);
};

export default store;
