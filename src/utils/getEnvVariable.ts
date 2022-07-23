const getEnvVar = (variable: keyof ImportMetaEnv) => {
	return import.meta.env[variable];
};

export { getEnvVar };
