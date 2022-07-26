import TokenService from '../service/Token/token.service';

const parseJwt = <T = { [key: string]: string }>(token = TokenService.getToken()): T | null => {
	if (!token) return null;

	try {
		const base64Url: string = token.split('.')[1];
		const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload: string = decodeURIComponent(
			atob(base64)
				.split('')
				.map(function(c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join(''),
		);
		return JSON.parse(jsonPayload) as T;
	} catch (e) {
		console.warn('Error validating token');
		return null;
	}
};

export default parseJwt;
