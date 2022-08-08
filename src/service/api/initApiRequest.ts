import Axios from 'axios';
import type {
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	CancelTokenSource,
	CancelTokenStatic,
} from 'axios';
import type { ApiDetailType } from './api-enums';
import { getRequestHeaders, manageErrorResponse, transformRequestData } from './utils';
import { sanitizeController } from './utils';
import { getEnvVar } from '../../utils/getEnvVariable';

interface RequestParam {
	[key: string]: any;
}

// Cancel a request using a cancel token.
const cancelToken: CancelTokenStatic = Axios.CancelToken;
const source: CancelTokenSource = cancelToken.source();

export interface InitApiRequestArgs {
	apiDetails: ApiDetailType,
	requestData?: any,
	params?: RequestParam,
	pathVariables?: { [key: string]: number | string }
	cancelSource?: CancelTokenSource
}

const initApiRequest = <TResponse = unknown>(
	{ apiDetails, requestData, params, pathVariables, cancelSource }: InitApiRequestArgs,
): Promise<AxiosResponse<ApiResponse<TResponse>>> => {
	// get Request Headers based on apiDetails
	const headers = getRequestHeaders(apiDetails);
	// transform Request data
	const transformedRequestData = transformRequestData(apiDetails, requestData);
	// sanitize apiEnd points, replace path variables placeholder with actual value
	const sanitizedApiDetails = sanitizeController(apiDetails, pathVariables);

	let axiosReqParams: AxiosRequestConfig = {
		baseURL: getEnvVar('VITE_ENDPOINT'),
		url: sanitizedApiDetails.apiEndPoint,
		method: sanitizedApiDetails.requestMethod,
		responseType: 'json',
		timeout: 60 * 3 * 1000,
		cancelToken: cancelSource ? cancelSource.token : source.token,
		headers: headers,
		...transformedRequestData,
	};

	if (params) {
		axiosReqParams = {
			...axiosReqParams,
			params: params,
		};
	}

	return Axios.request(axiosReqParams)
		.then((response: AxiosResponse) => response.data)
		.catch((error: AxiosError) => {
			return manageErrorResponse(error);
		});
};

Axios.interceptors.response.use(
	function(response) {
		return response;
	},
);

export default initApiRequest;
