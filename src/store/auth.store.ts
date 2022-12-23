import { writable } from 'svelte/store';
import TokenService from '../service/Token/token.service';
import type { ApiDetailType } from '../service/api/api-enums';
import { RequestMethod } from '../service/api/api-enums';
import { storeInitialData } from './schema';
import storeAction from './storeAction';

export const isAuthenticated = writable(!!TokenService.getToken());
export const userState = writable({ ...storeInitialData, data: TokenService.getTokenData() });

const apiDetails: ApiDetailType = {
	requestMethod: RequestMethod.POST,
	apiEndPoint: '/auth/token',
};

export interface LoginData {
	username: string;
	password: string;
}

interface LoginResponse {
	username: string;
	id: string;
	token: string;
}

export const loginAction = async (requestData: LoginData) => {
	const login = await storeAction<LoginResponse>({ apiDetails, requestData }, userState);

	if (login?.status) {
		TokenService.setToken(login.data?.token);
		isAuthenticated.update(() => true);
	}
	debugger;

	return login?.data;
};
