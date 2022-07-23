import { writable } from 'svelte/store';
import TokenService from '../service/Token/token.service';
import { RequestMethod } from '../service/api/api-enums';
import type { ApiDetailType } from '../service/api/api-enums';
import { storeInitialData } from './store';
import storeAction from './storeAction';

const isAuthenticated = writable(!!TokenService.getToken());
const user = writable({ ...storeInitialData, data: TokenService.getTokenData() });

const apiDetails: ApiDetailType = {
	requestMethod: RequestMethod.POST,
	apiEndPoint: '/auth/token',
};

interface LoginData {
	username: string;
	password: string;
}

interface LoginResponse {
	username: string;
	id: string;
	token: string;
}

const loginAction = async (requestData: LoginData) => {
	const login = await storeAction<LoginResponse>({ apiDetails, requestData }, user);

	if (login?.status) {
		TokenService.setToken(login.data?.token);
		isAuthenticated.update(() => true);
	}
	return login?.data;
};

const handleLogin = { userState: user, loginAction };

export { isAuthenticated, handleLogin };
export type { LoginData };
