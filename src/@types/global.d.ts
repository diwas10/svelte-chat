declare global {
	interface ImportMetaEnv {
		VITE_MESSAGE: string;
		VITE_ENDPOINT: string;
	}

	interface ApiResponse<T = unknown> {
		data?: T
		message: string,
		status: number,
		success: boolean
	}
}

export {};
