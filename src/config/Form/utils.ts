export const isFunction = (obj: any): obj is Function => typeof obj === 'function';

export const isObject = (obj: any) => obj !== null && typeof obj === 'object';

export const setNestedObjectValues = <T>(
	object: any,
	value: any,
	visited: any = new WeakMap(),
	updatedValue: any = {},
): T => {
	for (const key of Object.keys(object)) {
		const val = object[key];
		if (isObject(val)) {
			if (!visited.get(val)) {
				visited.set(val, true);
				updatedValue[key] = Array.isArray(val) ? [] : {};
				setNestedObjectValues(val, value, visited, updatedValue[key]);
			}
		} else updatedValue[key] = value;
	}

	return updatedValue;
};
