import parseJwt from '../../utils/parse-jwt';

const tokenKey = 'TOKEN';

interface TokenData {
	username: string;
	id: string;
}

const getToken = () => {
	let token = '';
	try {
		token = localStorage.getItem(tokenKey) ?? '';
	} catch (err) {
		console.log('Local Storage Get Error');
	}
	return token;
};

const setToken = (token: string) => {
	try {
		localStorage.setItem(tokenKey, token);
	} catch (err) {
		console.log('Local Storage Set Error', err);
	}
};

const clearToken = () => {
	try {
		localStorage.removeItem(tokenKey);
	} catch (err) {
		console.log('Local Storage Remove Error');
	}
};

const getTokenData = () => {
	let data: TokenData | null = null;
	try {
		data = parseJwt<TokenData>();
	} catch (err) {
		console.log('Parse JWT Error');
	}
	return data;
};

const TokenService = {
	getToken,
	setToken,
	clearToken,
	getTokenData,
};

export default TokenService;
