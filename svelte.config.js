import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	compilerOptions: {},
	preprocess: preprocess({
		preprocess: { postcss: true },
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$components: path.resolve('./src/components'),
			$store: path.resolve('./src/store'),
			$service: path.resolve('./src/service'),
			$utils: path.resolve('./src/utils'),
		},
	},
};
export default config;
