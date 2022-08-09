import type { InitApiRequestArgs } from '../service/api/initApiRequest';
import initApiRequest from '../service/api/initApiRequest';
import type { Writable } from 'svelte/store';
import type { StoreData } from './store';
import toast from '../components/core/Toast';
import { RequestMethod } from '../service/api/api-enums';

const storeAction = async <T = unknown>(details: InitApiRequestArgs, store: Writable<StoreData>) => {
	store.update(state => ({ ...state, loading: true }));
	try {
		const response = await initApiRequest<T>(details);
		store.update(state => ({ ...state, loading: false, success: true, data: response }));
		if (details.apiDetails.requestMethod !== RequestMethod.GET) toast.success(response.data.message);
		return response.data;
	} catch (err: any) {
		toast.error(err.message);
		store.update(state => ({ ...state, data: err, loading: false, error: true }));
	}
};

export default storeAction;
