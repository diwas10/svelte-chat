import { writable } from 'svelte/store';

const store = (initialData: any) => {
	return writable(initialData);
};

export default store;
