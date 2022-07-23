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
	apiEndPoint: string;
	requestMethod?: RequestMethod;
}


export interface ApiRequestDetail {
	requestData?: any,
	pathVariables?: { [key: string]: Primitive };
	params?: { [key: string]: Primitive };
}




