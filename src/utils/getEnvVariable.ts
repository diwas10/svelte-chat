const getEnvVar = (variable: string) => {
	return import.meta.env[variable];
};

export { getEnvVar };
