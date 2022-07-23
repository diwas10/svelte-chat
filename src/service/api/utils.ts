import type { ApiDetailType } from './api-enums';
import type { AxiosBasicCredentials, AxiosError } from 'axios';
import type { Primitive } from './api-enums';
import TokenService from '../Token/token.service';

const getRequestHeaders = (apiDetails: ApiDetailType) => {
	const headers: { [key: string]: string } = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${TokenService.getToken()}`,
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
		isAxiosError: isAxiosError, //If Axios Error
	};

	if (response) {
		errorResponse.data = {
			...(response.data as any),
			status: response
				? response?.status >= 200 && response?.status < 400
				: false,
		}; // The server responded with a status code and data
	} else if (request) {
		errorResponse.message = 'Server could not be reached.'; // No response was received
		errorResponse.noconnection = true;
	}

	return errorResponse;
};

export { manageErrorResponse, transformRequestData, getRequestHeaders };

export function sanitizeController(
	apiDetail: ApiDetailType,
	pathVariables?: { [key: string]: Primitive | [] },
) {
	return pathVariables && Object.keys(pathVariables).length
		? {
			...apiDetail,
			controllerName: Object.entries(pathVariables).reduce(
				(acc, [key, value]) =>
					(acc = acc.replace(`{${key}}`, value.toString())),
				apiDetail.apiEndPoint,
			),
		}
		: apiDetail;
}
