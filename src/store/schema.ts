export interface StoreData<T = any> {
	data: T | null;
	error: boolean;
	success: boolean;
	loading: boolean;
}

export const storeInitialData: StoreData = {
	data: null,
	error: false,
	loading: false,
	success: false,
};
