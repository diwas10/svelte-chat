import type { InitApiRequestArgs } from '../service/api/initApiRequest';
import type { Writable } from 'svelte/store';
import type { StoreData } from './store';
import initApiRequest from '../service/api/initApiRequest';

const storeAction = async <T = any>(details: InitApiRequestArgs, store: Writable<StoreData>) => {
	store.update(state => ({ ...state, loading: true }));
	try {
		const response = await initApiRequest<T>(details);
		store.update(state => ({ ...state, loading: false, success: true, data: response.data }));
		return response;
	} catch (err) {
		store.update(state => ({ ...state, data: err, loading: false, error: true }));
	}
};

export default storeAction;
