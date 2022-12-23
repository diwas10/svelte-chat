import { sveltekit } from '@sveltejs/kit/vite';
import checker from 'vite-plugin-checker';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), checker({ overlay: { panelStyle: 'height:100%;' }, typescript: true })],
	base: './src',
};

export default config;
