import Axios from 'axios';
import type {
	AxiosBasicCredentials,
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
	CancelTokenSource,
	CancelTokenStatic
} from 'axios';
import type { ApiDetailType } from './api-enums';

interface RequestParam {
	[key: string]: any;
}

// Cancel a request using a cancel token.
const cancelToken: CancelTokenStatic = Axios.CancelToken;
const source: CancelTokenSource = cancelToken.source();

export default function performApiRequest<TResponse = any>(
	apiDetails: ApiDetailType,
	requestData?: any,
	params?: RequestParam,
	cancelSource?: CancelTokenSource
): Promise<AxiosResponse<AxiosResponse> | AxiosError> {
	const headers = getRequestHeaders(apiDetails);
	const transformedRequestData = transformRequestData(apiDetails, requestData);
	let axiosReqParams: AxiosRequestConfig = {
		baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
		url: apiDetails.controllerName,
		method: apiDetails.requestMethod,
		responseType: 'json',
		timeout: 60 * 3 * 1000,
		cancelToken: cancelSource ? cancelSource.token : source.token,
		headers: headers,
		...transformedRequestData
	};

	if (params) {
		axiosReqParams = {
			...axiosReqParams,
			params: params
		};
	}

	return Axios.request(axiosReqParams)
		.then((response: AxiosResponse) => response.data)
		.catch((error: AxiosError) => {
			return manageErrorResponse(error);
		});
}

Axios.interceptors.response.use(
	function(response) {
		return response;
	}
);

const getRequestHeaders = (apiDetails: ApiDetailType) => {
	const headers: { [key: string]: string } = {
		'Content-Type': 'application/json'
	};

	return headers;
};

interface TransformedRequestData {
	auth?: AxiosBasicCredentials;
	data: any;
}

const transformRequestData = (apiDetails: ApiDetailType, requestData: any) => {
	const transformedRequestData: TransformedRequestData = { data: requestData };
	return transformedRequestData;
};

const manageErrorResponse = (error: AxiosError) => {
	const { message, config, request, response, isAxiosError } = error;

	const errorResponse = {
		message: message, // Something happened in setting up the request that triggered an Error
		data: null,
		status: response?.status || false,
		noconnection: false,
		config: config, // Request Params Configs
		isAxiosError: isAxiosError //If Axios Error
	};

	if (response) {
		errorResponse.data = {
			...(response.data as any),
			status: response
				? response?.status >= 200 && response?.status < 400
				: false
		}; // The server responded with a status code and data
	} else if (request) {
		errorResponse.message = 'Server could not be reached.'; // No response was received
		errorResponse.noconnection = true;
	}

	return errorResponse;
};
