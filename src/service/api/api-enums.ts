export type Primitive = string | boolean | number;

export enum RequestMethod {
	GET = 'GET',
	DELETE = 'DELETE',
	HEAD = 'HEAD',
	OPTIONS = 'OPTIONS',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	PURGE = 'PURGE',
	LINK = 'LINK',
	UNLINK = 'UNLINK',
}

export interface ApiDetailType {
	actionName: string;
	controllerName: string;
	requestMethod?: RequestMethod;
}


export interface ApiRequestDetail {
	requestData?: any,
	pathVariables?: { [key: string]: Primitive };
	params?: { [key: string]: Primitive };
}

export function sanitizeController(
	apiDetail: ApiDetailType,
	pathVariables?: { [key: string]: Primitive }
) {
	return pathVariables && Object.keys(pathVariables).length
		? {
			...apiDetail,
			controllerName: Object.entries(pathVariables).reduce(
				(acc, [key, value]) =>
					(acc = acc.replace(`{${key}}`, value.toString())),
				apiDetail.controllerName
			)
		}
		: apiDetail;
}


