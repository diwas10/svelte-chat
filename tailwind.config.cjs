/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {
			colors: {
				primary: '#1d90f4',
				dark: {
					1: '#20212a',
					2: '#282a30',
					3: '#545151',
					4: '#3d3c3f',
					5: '#313133',
					w: '#f0f0f0'
				}
			},
			maxWidth: {
				'4/5': '80%'
			}
		}
	},
	plugins: []
};
