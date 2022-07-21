import parseJwt from '../../utils/parse-jwt';

const tokenKey = 'TOKEN';

const getToken = () => {
	let token = '';
	try {
		token = localStorage.getItem(btoa(tokenKey)) ?? '';
	} catch (err) {
		console.log('Local Storage Get Error');
	}
	return token;
};

const setToken = (token: string) => {
	try {
		localStorage.setItem(atob(tokenKey), token);
	} catch (err) {
		console.log('Local Storage Set Error');
	}
};

const clearToken = () => {
	try {
		localStorage.removeItem(btoa(tokenKey));
	} catch (err) {
		console.log('Local Storage Remove Error');
	}
};

const getTokenData = () => {
	let data = null;
	try {
		data = parseJwt();
	} catch (err) {
		console.log('Parse JWT Error');
	}
	return data;
};

const TokenService = {
	getToken,
	setToken,
	clearToken,
	getTokenData
};

export default TokenService;
