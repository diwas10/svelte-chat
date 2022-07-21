/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {
			colors: {
				primary: '#1d90f4',
				dark: {
					1: '#2a303c',
					2: '#242933',
					3: '#1f242d',
					4: '#3d3c3f',
					5: '#313133',
					w: '#f0f0f0',
					a: '#a6adba'
				}
			},
			maxWidth: {
				'4/5': '80%'
			}
		}
	},
	plugins: []
};
